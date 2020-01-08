'use strict'

var Restaurant = require('../models/restaurant'),
    User = require('../models/user'),
    Item = require('../models/item'),
    redis = require('../redis'),
    multer = require('../multer'),
    { response } = require('../helper/response');


module.exports.list_all_restaurant = async (req, res) => {
    const { search, sort } = req.query
    var pageLinks = process.env.APP_URI.concat('restaurant?')
    if (search) {
        var arr = []
        Object.keys(search).map((key, index) => {
            arr.push(`search[${key}]=${search[key]}`)
        })
        pageLinks += arr.join('&') + '&'
    }
    if (sort) {
        Object.keys(sort).map((key, index) => {
            pageLinks += `sort[${key}]=${sort[key]}&`
        })
    }
    var numRows
    var numPerPage = parseInt(req.query.perPage, 10) || 10
    var page = parseInt(req.query.page) || 1
    var numPages
    var skip = (page - 1) * numPerPage
    await Restaurant.getRestaurantCount(search, sort).then((count) => {
        numRows = count[0].rCount
        numPages = Math.ceil(numRows / numPerPage)
    }).catch((error) => {
        return response(res, 200, false, "Error.", error)
    })
    var limit = skip + ',' + numPerPage
    return redis.get(`index_restaurant_page:${page}_limit:${limit}`, async (err, data) => {
        if (data) {
            const resultJSON = JSON.parse(data);
            return response(res, 200, true, "Data Found - Redis Cache.", resultJSON)
        } else {
            const restaurants = await Restaurant.getAllRestaurant(search, sort, limit).then(async (data) => {
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
            if (restaurants) {
                var result = {
                    restaurants
                }
                if (page <= numPages) {
                    result.pagination = {
                        current: page,
                        perPage: numPerPage,
                        prev: page > 1 ? page - 1 : undefined,
                        next: page < numPages ? page + 1 : undefined,
                        prevLink: page > 1 ? encodeURI(pageLinks.concat(`page=${page - 1}&perPage=${numPerPage}`)) : undefined,
                        nextLink: page < numPages ? encodeURI(pageLinks.concat(`page=${page + 1}&perPage=${numPerPage}`)) : undefined
                    }
                } else result.pagination = {
                    err: 'queried page ' + page + ' is >= to maximum page number ' + numPages
                }
                redis.setex(`index_restaurant_page:${page}_limit:${limit}`, 10, JSON.stringify(result))
                return response(res, 200, true, "Data Found - Database Query.", result)
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
                    if (restaurant) {
                        return response(res, 200, true, "Restaurant Created Successfully.", restaurant[0])
                    } else {
                        return response(res, 200, false, "Data not Found.")
                    }
                }).catch((error) => {
                    return response(res, 200, false, "Error.", error)
                })
            }).catch((error) => {
                return response(res, 200, false, "Error.", error)
            })
        }).catch((error) => {
            return response(res, 200, false, "Error.", error)
        })
    })
}


module.exports.update_restaurant = async (req, res) => {
    const { id } = req.params

    await Restaurant.updateRestaurant(id, req.body).then(async (result) => {
        await Restaurant.getRestaurantById(id).then((restaurant) => {
            if (restaurant) {
                return response(res, 200, true, "Restaurant Updated Successfully.", restaurant[0])
            } else {
                return response(res, 200, false, "Data not Found.")
            }
        }).catch((error) => {
            return response(res, 200, false, "Error.", error)
        })
    }).catch((error) => {
        return response(res, 200, false, "Error.", error)
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
                if (restaurant) {
                    return response(res, 200, true, "Restaurant Logo Updated Successfully.", restaurant[0])
                } else {
                    return response(res, 200, false, "Data not Found.")
                }
            }).catch((error) => {
                return response(res, 200, false, "Error.", error)
            })
        }).catch((error) => {
            return response(res, 200, false, "Error.", error)
        })
    })
}

module.exports.delete_restaurant = async (req, res) => {
    const { id } = req.params
    await Restaurant.deleteRestaurant(id).then((result) => {
        if (result.affectedRows !== 0) {
            return response(res, 200, true, "Restaurant Deleted Successfully.")
        } else {
            return response(res, 200, false, "Deleting Restaurant Failed")
        }
    }).catch((error) => {
        return response(res, 200, false, "Error.", error)
    })
}