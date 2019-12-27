'use strict'

var Restaurant = require('../models/restaurant'),
    Item = require('../models/item'),
    redis = require('../redis'),
    multer = require('../multer');

//working as intended
module.exports.list_all_restaurant = async (req, res) => {
    return redis.get('index_restaurant', async (err, data) => {
        if (data) {
            const resultJSON = JSON.parse(data);
            return res.status(200).send({
                success: true,
                source: 'Redis Cache',
                data: resultJSON
            });
        } else {
            const data = await Restaurant.getAllRestaurant()
            redis.setex('index_restaurant', 600, JSON.stringify({ ...data }))
            var x_data = { ...data }
            return res.status(200).send({ success: true, source: 'Database Query', data: x_data })
        }
    })
}

// working as intended
module.exports.show_restaurant = async (req, res) => {
    const { id } = req.params
    await Restaurant.getRestaurantById(id).then(async (data) => {
        await Item.getItemByRestaurant(id).then((item) => {
            res.send({
                success: true,
                data,
                item
            })
        })
    })
}

// working as intended
module.exports.create_restaurant = async (req, res) => {
    multer.uploads(req, res, async () => {
        if (req.fileValidationError) {
            return res.end(req.fileValidationError)
        }
        req.body.image = req.file.filename
        await Restaurant.createRestaurant(new Restaurant(req.body)).then(async (result) => {
            await Restaurant.getRestaurantById(result.insertId).then((data) => {
                res.send({
                    success: true,
                    result,
                    data
                })
            })
        })
    })
}

// working as intended
module.exports.update_restaurant = async (req, res) => {
    const { id } = req.params

    multer.uploads(req, res, async (err) => {
        if (req.fileValidationError) {
            return res.end(req.fileValidationError)
        }
        req.body.image = req.file.filename
        await Restaurant.updateRestaurant(id, new Restaurant(req.body)).then(async (result) => {
            await Restaurant.getRestaurantById(id).then((data) => {
                res.send({ success: true, result, data })
            })
        })
    })
}

//working as intended
module.exports.delete_restaurant = async (req, res) => {
    const { id } = req.params
    await Restaurant.deleteRestaurant(id).then((result) => {
        res.send({
            success: true,
            result
        })
    })
}