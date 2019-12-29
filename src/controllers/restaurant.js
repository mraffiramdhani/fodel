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
                success: true,
                message: "Data Found",
                source: 'Redis Cache',
                data: resultJSON
            });
        } else {
            const data = await Restaurant.getAllRestaurant()
            redis.setex('index_restaurant', 600, JSON.stringify(data))
            return res.status(200).send({ status: 200, success: true, message: "Data Found", source: 'Database Query', data: data })
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
                success: true,
                message: "Data Found",
                dataSource: 'Redis Cache',
                data: responseJSON
            })
        } else {
            await Restaurant.getRestaurantById(id).then(async (data) => {
                await Item.getItemByRestaurant(id).then((items) => {
                    var requests = [{ restaurant: data, items }]
                    redis.setex(`show_rest_id:${id}`, 600, JSON.stringify({ requests }))
                    res.send({
                        status: 200,
                        success: true,
                        message: "Data Found",
                        dataSource: 'Database Query',
                        data: { requests }
                    })
                })
            })
        }
    })
}

// working as intended
module.exports.create_restaurant = async (req, res) => {
    multer.uploadLogo(req, res, async () => {
        if (req.fileValidationError) {
            return res.end(req.fileValidationError)
        }
        req.body.image = req.file.filename
        await Restaurant.createRestaurant(new Restaurant(req.body)).then(async (result) => {
            await Restaurant.getRestaurantById(result.insertId).then((restaurant) => {
                var requests = [{ restaurant }]
                res.send({
                    status: 200,
                    success: true,
                    message: "Restaurant Created Successfuly.",
                    data: { requests }
                })
            })
        })
    })
}

// working as intended
module.exports.update_restaurant = async (req, res) => {
    const { id } = req.params

    await Restaurant.updateRestaurant(id, req.body).then(async (result) => {
        await Restaurant.getRestaurantById(id).then((restaurant) => {
            var requests = [{ restaurant }]
            res.send({
                status: 200,
                success: true,
                message: "Restaurant Updated Successfuly.",
                data: { requests }
            })
        })
    })
}

// working as intended
module.exports.update_restaurant_logo = async (req, res) => {
    const { id } = req.params
    multer.uploadLogo(req, res, async (err) => {
        if (req.fileValidationError) {
            return res.end(req.fileValidationError)
        }
        await Restaurant.updateRestaurant(id, { logo: req.file.filename }).then(async (result) => {
            await Restaurant.getRestaurantById(id).then((restaurant) => {
                var requests = [{ restaurant }]
                res.send({
                    status: 200,
                    success: true,
                    message: "Restaurant Logo Updated Successfuly.",
                    data: { requests }
                })
            })
        })
    })
}


//working as intended
module.exports.delete_restaurant = async (req, res) => {
    const { id } = req.params
    await Restaurant.deleteRestaurant(id).then((result) => {
        res.send({
            status: 200,
            success: true,
            message: "Restaurant Removed Successfuly.",
            data: {}
        })
    })
}