'use strict'

var Restaurant = require('../models/restaurant'),
    User = require('../models/user'),
    Item = require('../models/item'),
    redis = require('../redis'),
    multer = require('../multer'),
    { response } = require('../helper/response');


module.exports.list_all_restaurant = async (req, res) => {
    return redis.get('index_restaurant', async (err, data) => {
        if (data) {
            const resultJSON = JSON.parse(data);
            return response(res, 200, true, "Data Found - Redis Cache.", resultJSON)
        } else {
            const data = await Restaurant.getAllRestaurant().then(async (data) => {
                if (data.length === 0) {
                    return response(res, 200, false, "Data not Found.")
                } else {
                    for (var i = 0; i < data.length; i++) {
                        await User.getUserById(data[i].user_id).then((user) => {
                            data[i].owner = user[0].name
                        }).catch((error) => {
                            return response(res, 200, false, "Error.", error)
                        })
                    }
                }
                return data
            }).catch((error) => {
                return response(res, 200, false, "Error.", error)
            })
            if (data) {
                redis.setex('index_restaurant', 10, JSON.stringify(data))
                return response(res, 200, true, "Data Found - Database Query.", data)
            } else {
                return response(res, 200, false, "Data not Found.")
            }
        }
    })
}

module.exports.show_restaurant = async (req, res) => {
    const { id } = req.params
    return redis.get(`show_rest_id:${id}`, async (ex, data) => {
        if (data) {
            const responseJSON = JSON.parse(data)
            return response(res, 200, true, "Data Found - Redis Cache.", responseJSON)
        } else {
            await Restaurant.getRestaurantById(id).then(async (data) => {
                if (data.length !== 0) {
                    await User.getUserById(data[0].user_id).then((user) => {
                        if (user.length !== 0) {
                            data[0].owner = user[0].name
                            redis.setex(`show_rest_id:${id}`, 30, JSON.stringify(data[0]))
                            return response(res, 200, true, "Data Found - Database Query.", data[0])
                        } else {
                            return response(res, 200, false, "Data not Found.")
                        }
                    }).catch((error) => {
                        return response(res, 200, false, "Error.", error)
                    })
                } else {
                    return response(res, 200, false, "Data not Found.")
                }
            }).catch((error) => {
                return response(res, 200, false, "Error.", error)
            })
        }
    })
}


module.exports.create_restaurant = async (req, res) => {
    multer.uploadLogo(req, res, async () => {
        if (req.fileValidationError) {
            return res.end(req.fileValidationError)
        }
        req.body.image = req.file.filename
        await Restaurant.createRestaurant(new Restaurant(req.body)).then(async (result) => {
            await User.updateUser(req.body.user_id, { role_id: 2 }).then(async (data) => {
                await Restaurant.getRestaurantById(result.insertId).then((restaurant) => {
                    var requests = [{ restaurant }]
                    res.send({
                        status: 200,
                        success: true,
                        message: "Restaurant Created Successfuly.",
                        data: { requests }
                    })
                }).catch((error) => {
                    res.send({
                        success: false,
                        error,
                        message: 'error level 3'
                    })
                })
            }).catch((error) => {
                res.send({
                    success: false,
                    error,
                    message: 'error level 2'
                })
            })
        }).catch((error) => {
            res.send({
                success: false,
                error,
                message: 'error level 1'
            })
        })
    })
}


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