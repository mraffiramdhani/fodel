'use strict'

const Item = require('../models/item'),
    Restaurant = require('../models/restaurant'),
    redis = require('../redis'),
    multer = require('../multer');

// working as intended
module.exports.list_all_item = (req, res) => {
    const { name, rating, min_price, max_price, sort, type, cat } = req.query

    if (!name && !rating && !min_price && !max_price && !sort && !type && !cat) {
        // redis testing
        return redis.get('all_item', async (ex, data) => {
            if (data) {
                const resultJSON = JSON.parse(data);
                return res.status(200).send({
                    success: true,
                    source: 'Redis Cache',
                    data: resultJSON
                });
            } else {
                const data = await Item.getAllItem()
                redis.setex('all_item', 600, JSON.stringify({ ...data }))
                var x_data = { ...data }
                return res.status(200).send({ success: true, source: 'Database Query', data: x_data })
            }
        })
    } else {
        return redis.get(`index:${name},${rating},${min_price},${max_price},${sort},${type},${cat}`, async (ex, data) => {
            if (data) {
                const resultJSON = JSON.parse(data);
                return res.status(200).json({
                    success: true,
                    source: 'Redis Cache',
                    data: resultJSON
                });
            } else {
                const data = await Item.getItemByParams(req.query)
                redis.setex(`index:${name},${rating},${min_price},${max_price},${sort},${type},${cat}`, 600, JSON.stringify({ ...data }))
                var x_data = { ...data }
                return res.status(200).send({ success: true, source: 'Database Query', data: x_data })
            }
        })
    }
}

// working as intended
module.exports.show_item = async (req, res) => {
    const { id } = req.params
    return redis.get(`show_item_${id}`, async (error, data) => {
        if (data) {
            const resultJSON = JSON.parse(data);
            return res.status(200).json(resultJSON);
        } else {
            await Item.getItemById(id).then(async (item) => {
                await Restaurant.getRestaurantById(item[0].restaurant_id).then(async (restaurant) => {
                    await Item.getItemByRestaurant(restaurant[0].id).then((rows) => {
                        redis.setex(`show_item_${id}`, 600, JSON.stringify({ source: 'Redis Cache', item, restaurant, related: rows }))
                        return res.status(200).json({ source: 'Database query', item, restaurant, related: rows })
                    })
                })
            })
        }
    })
}

module.exports.create_item = async (req, res) => {
    multer.uploads(req, res, async () => {
        if (req.fileValidationError) {
            return res.end(req.fileValidationError)
        }
        req.body.image = req.file.filename
        await Item.createItem(new Item(req.body)).then((item) => {
            return res.json({
                success: true,
                item
            })
        })
    })
}

module.exports.update_item = async (req, res) => {
    const { id } = req.params
    multer.uploads(req, res, async () => {
        if (req.fileValidationError) {
            return res.end(req.fileValidationError)
        }
        req.body.image = req.file.filename
        await Item.updateItem(id, new Item(req.body)).then((item) => {
            return res.json({
                success: true,
                item
            })
        })
    })
}

module.exports.delete_item = async (req, res) => {
    const { id } = req.params
    await Item.deleteItem(id).then((result) => {
        res.send({
            status: true,
            data
        })
    }).catch((error) => {
        res.send(error)
    })
}