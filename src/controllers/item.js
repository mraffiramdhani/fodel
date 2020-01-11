'use strict'

const Item = require('../models/item'),
    Restaurant = require('../models/restaurant'),
    redis = require('../redis'),
    multer = require('../multer'),
    { response } = require('../helper/response');

module.exports.list_all_item = async (req, res) => {
    const { search, sort } = req.query
    var numRows
    var numPerPage = parseInt(req.query.perPage, 10) || 10
    var page = parseInt(req.query.page) || 1
    var numPages
    var skip = (page - 1) * numPerPage
    var pageLinks = ''
    var redisKey = `index_item_page:${page}_limit:${limit}`
    if (search) {
        var arr = []
        Object.keys(search).map((key, index) => {
            arr.push(`search[${key}]=${search[key]}`)
        })
        pageLinks += arr.join('&') + '&'
        redisKey += arr.join('_')
    }
    if (sort) {
        Object.keys(sort).map((key, index) => {
            pageLinks += `sort[${key}]=${sort[key]}&`
        })
    }
    await Item.getItemCount(search, sort).then((count) => {
        numRows = count[0].iCount
        numPages = Math.ceil(numRows / numPerPage)
    }).catch((error) => {
        return response(res, 200, false, "Error.", error)
    })
    var limit = skip + ',' + numPerPage
    return redis.get(redisKey, async (ex, data) => {
        if (data) {
            const resultJSON = JSON.parse(data);
            return response(res, 200, true, "Data Found - Redis Cache.", resultJSON)
        } else {
            const items = await Item.getAllItem(search, sort, limit)
            if (items) {
                var result = {
		    count: numRows,
                    items
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
                redis.setex(redisKey, 10, JSON.stringify(result))
                return response(res, 200, true, "Data Found - Database Query.", result)
            } else {
                return response(res, 200, false, "Data not Found.")
            }
        }
    })
}

module.exports.show_item = async (req, res) => {
    const { id } = req.params
    return redis.get(`show_item_${id}`, async (error, data) => {
        if (data) {
            const resultJSON = JSON.parse(data);
            return response(res, 200, true, "Data Found - Redis Cache.", resultJSON)
        } else {
            await Item.getItemById(id).then(async (data) => {
                if (data) {
                    redis.setex(`show_item_${id}`, 30, JSON.stringify(data[0]))
                    return response(res, 200, true, "Data Found - Database Query.", data[0])
                } else {
                    return response(res, 200, false, "Data not Found")
                }
            }).catch((error) => {
                return response(res, 200, false, "Error.", error)
            })
        }
    })
}

module.exports.get_item_by_restaurant = async (req, res) => {
    const { id } = req.auth
    const { search, sort } = req.query
    var numRows
    var numPerPage = parseInt(req.query.perPage, 10) || 10
    var page = parseInt(req.query.page) || 1
    var numPages
    var skip = (page - 1) * numPerPage
    var pageLinks = ''
    if (search) {
        var arr = []
        Object.keys(search).map((key, index) => {
            arr.push(`search[${key}]=${search[key]}`)
        })
        pageLinks += arr.join('&') + '&'
        redisKey += arr.join('_')
    }
    if (sort) {
        Object.keys(sort).map((key, index) => {
            pageLinks += `sort[${key}]=${sort[key]}&`
        })
    }
    await Restaurant.getRestaurantByUser(id).then(async (rest_id) => {
        await Item.getRestaurantItemCount(rest_id[0].id, search, sort).then((count) => {
            numRows = count[0].iCount
            numPages = Math.ceil(numRows / numPerPage)
        }).catch((error) => {
            return response(res, 200, false, "Error.", error)
        })
        var limit = skip + ',' + numPerPage
        var redisKey = `resto_item_page:${page}_limit:${limit}`
        return redis.get(redisKey, async (ex, data) => {
            if (data) {
                const resultJSON = JSON.parse(data);
                return response(res, 200, true, "Data Found - Redis Cache.", resultJSON)
            } else {
                const items = await Item.getRestaurantByItem(rest_id[0].id, search, sort, limit)
                if (items) {
                    var result = {
			count: numRows,
                        items
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
                    redis.setex(redisKey, 10, JSON.stringify(result))
                    return response(res, 200, true, "Data Found - Database Query.", result)
                } else {
                    return response(res, 200, false, "Data not Found.")
                }
            }
        })
    })
}

module.exports.create_item = async (req, res) => {
    const { id } = req.auth

    multer.uploadImages(req, res, async () => {
        if (req.fileValidationError) {
            return res.end(req.fileValidationError)
        }

        const images = []
        const files = req.files
        for (var i = 0; i < files.length; i++) {
            images.push(files[i])
        }
        req.body.image = images
        const restaurant = await Restaurant.getRestaurantByUser(id)
        req.body.restaurant_id = restaurant[0].id
        await Item.createItem(new Item(req.body)).then((data) => {
            if (data.effectedRows !== 0) {
                return response(res, 200, true, "Item Created Successfully.", data[0])
            } else {
                return response(res, 200, false, "Creating Item Failed.", data)
            }
        }).catch((error) => {
            return response(res, 200, false, "Error.", error)
        })
    })
}

module.exports.create_item_by_admin = async (req, res) => {
    multer.uploadImages(req, res, async () => {
        if (req.fileValidationError) {
            return res.end(req.fileValidationError)
        }

        const images = []
        const files = req.files
        for (var i = 0; i < files.length; i++) {
            images.push(files[i])
        }
        req.body.image = images
        console.log(req.body)
        await Item.createItem(new Item(req.body)).then((data) => {
            if (data.effectedRows !== 0) {
                return response(res, 200, true, "Item Created Successfully.", data[0])
            } else {
                return response(res, 200, false, "Creating Item Failed.", data)
            }
        }).catch((error) => {
            return response(res, 200, false, "Error.", error)
        })
    })
}

module.exports.update_item = async (req, res) => {
    const { id } = req.params
    await Item.updateItem(id, new Item(req.body)).then((data) => {
        if (data.affectedRows !== 0) {
            return response(res, 200, true, "Item Updated Successfully.", data[0])
        } else {
            return response(res, 200, false, "Updating Item Failed.", data)
        }
    }).catch((error) => {
        return response(res, 200, false, "Error.", error)
    })
}

module.exports.update_item_images = (req, res) => {
    const { id } = req.params

    multer.uploadImages(req, res, async () => {
        if (req.fileValidationError) {
            return res.end(req.fileValidationError)
        }
        const images = []
        const files = req.files
        for (var i = 0; i < files.length; i++) {
            images.push(files[i])
        }
        await Item.updatedItemImages(id, images).then(async (data) => {
            await Item.getItemById(id).then((item) => {
                if (item) {
                    return response(res, 200, true, "Item Images Updated Successfully.", item[0])
                } else {
                    return response(res, 200, false, "Updating Item Images Failed.")
                }
            }).catch((error) => {
                return response(res, 200, false, "Error.", error)
            })
        }).catch((error) => {
            return response(res, 200, false, "Error.", error)
        })
    })

}

module.exports.delete_item = async (req, res) => {
    const { id } = req.params

    await Item.deleteItem(id).then((data) => {
        return response(res, 200, true, "Item Deleted Successfully.")
    }).catch((error) => {
        return response(res, 200, false, "Error.", error)
    })
}