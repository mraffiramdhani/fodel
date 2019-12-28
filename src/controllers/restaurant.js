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
                status: 200,
                message: "OK",
                success: true,
                source: 'Redis Cache',
                data: resultJSON
            });
        } else {
            const data = await Restaurant.getAllRestaurant()
            redis.setex('index_restaurant', 600, JSON.stringify(data))
            return res.status(200).send({ status: 200, message: "OK", success: true, source: 'Database Query', data: data })
        }
    })
}

// working as intended
module.exports.show_restaurant = async (req, res) => {
    const { id } = req.params
    return redis.get(`show_rest_id:${id}`, async (ex, data) => {
        if (data) {
            const responseJSON = JSON.parse(data)
            return res.send({
                status: 200,
                message: "OK",
                success: true,
                dataSource: 'Redis Cache',
                data: responseJSON
            })
        } else {
            await Restaurant.getRestaurantById(id).then(async (data) => {
                await Item.getItemByRestaurant(id).then((items) => {
                    data[0].items = items
                    redis.setex(`show_rest_id:${id}`, 600, JSON.stringify(data))
                    res.send({
                        status: 200,
                        message: "OK",
                        success: true,
                        dataSource: 'Database Query',
                        data
                    })
                })
            })
        }
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