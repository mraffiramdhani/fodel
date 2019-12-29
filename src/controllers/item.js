'use strict'

const Item = require('../models/item'),
    Restaurant = require('../models/restaurant'),
    redis = require('../redis'),
    multer = require('../multer');

module.exports.list_all_item = async (req, res) => {
    const { name, rating, min_price, max_price, sort, type, cat } = req.query
    var numRows
    var numPerPage = parseInt(req.query.max_item, 10) || 10
    var page = parseInt(req.query.page) || 0
    var numPages
    var skip = page * numPerPage

    if (!name && !rating && !min_price && !max_price && !sort && !type && !cat) {
        await Item.getNumRows().then((results) => {
            numRows = results[0].numRows
            numPages = Math.ceil(numRows / numPerPage)
        })

        var limit = skip + ',' + numPerPage
        return redis.get(`all_item_page:${page}_limit:${numPerPage}`, async (ex, data) => {
            if (data) {
                const responseJSON = JSON.parse(data);
                return res.status(200).send({
                    status: 200,
                    success: true,
                    message: 'Data Found',
                    dataSource: 'Redis Cache',
                    data: responseJSON
                });
            } else {
                await Item.getAllItem(limit).then((items) => {
                    var requests = [{ items }]
                    var responsePayload = { requests }
                    if (page < numPages) {
                        responsePayload.pagination = {
                            current: page + 1,
                            perPage: numPerPage,
                            prev: page + 1 > 1 ? page : undefined,
                            next: page + 1 < numPages - 1 ? page + 2 : undefined
                        }
                    } else responsePayload.pagination = {
                        err: 'queried page ' + page + ' is >= to maximum page number ' + numPages
                    }
                    redis.setex(`all_item_page:${page}_limit:${numPerPage}`, 600, JSON.stringify({ ...responsePayload }))
                    var x_data = { ...responsePayload }
                    return res.status(200).send({ status: 200, success: true, message: 'Data Found', dataSource: 'Database query', data: x_data })
                }).catch(function (err) {
                    console.error(err);
                    res.json({ err: err });
                })
            }
        })
    } else {
        await Item.getNumRowsParam(req.query).then((results) => {
            numRows = results[0].numRows
            numPages = Math.ceil(numRows / numPerPage)
        })

        var limit = numRows >= 10 ? skip + ',' + numPerPage : null
        return redis.get(`search_item:${name},${rating},${min_price},${max_price},${sort},${type},${cat}_page:${page}_limit:${limit}`, async (ex, data) => {
            if (data) {
                const responseJSON = JSON.parse(data);
                return res.status(200).json({
                    status: 200,
                    success: true,
                    message: 'Data Found',
                    dataSource: 'Redis Cache',
                    data: responseJSON
                });
            } else {
                await Item.getItemByParams(req.query, limit).then((items) => {
                    var requests = [{ items }]
                    var responsePayload = { requests }
                    if (page < numPages) {
                        responsePayload.pagination = {
                            current: page + 1,
                            perPage: numPerPage,
                            prev: page + 1 > 1 ? page : undefined,
                            next: page + 1 < numPages ? page + 2 : undefined
                        }
                    } else responsePayload.pagination = {
                        err: 'queried page ' + page + ' is >= to maximum page number ' + numPages
                    }
                    redis.setex(`search_item:${name},${rating},${min_price},${max_price},${sort},${type},${cat}_page:${page}_limit:${limit}`, 600, JSON.stringify({ ...responsePayload }))
                    var x_data = { ...responsePayload }
                    return res.status(200).send({ status: 200, success: true, message: 'Data Found', dataSource: 'Database query', data: x_data })
                }).catch(function (err) {
                    console.error(err);
                    res.json({ err: err });
                })
            }
        })
    }
}

module.exports.show_item = async (req, res) => {
    const { id } = req.params
    return redis.get(`shsow_item_${id}`, async (error, data) => {
        if (data) {
            const resultJSON = JSON.parse(data);
            return res.status(200).json(resultJSON);
        } else {
            await Item.getItemById(id).then(async (data) => {
                await Restaurant.getRestaurantById(data.requests[0].item[0].restaurant_id).then(async (restaurant) => {
                    var cat = []
                    for (var i = 0; i < data.requests[0].item[0].categories.length; i++) {
                        cat.push(data.requests[0].item[0].categories[i].category_id)
                    }
                    await Item.getItemByParams({ cat: cat.join(','), sort: "rating", type: "desc" }).then((rows) => {
                        var arr_req = data.related
                        arr_req.push({ restaurant })
                        arr_req.push({ showcase: rows })

                        // console.log(data)
                        redis.setex(`show_item_${id}`, 600, JSON.stringify({ status: 200, success: true, message: 'Data Found', dataSource: 'Redis Cache', data }))
                        return res.status(200).json({ status: 200, success: true, message: 'Data Found', dataSource: 'Database query', data })
                    })
                })
            })
        }
    })
}

module.exports.create_item = async (req, res) => {
    req.body.restaurant_id = req.headers.auth_token.id
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
        await Item.createItem(new Item(req.body)).then((data) => {
            return res.json({
                status: 200,
                success: true,
                message: "Item Created Successfuly.",
                data
            })
        })
    })
}

// working asn intended
module.exports.update_item = async (req, res) => {
    const { id } = req.params
    req.body.restaurant_id = req.headers.auth_token.id
    await Item.updateItem(id, new Item(req.body)).then((data) => {
        return res.json({
            status: 200,
            success: true,
            message: "Item Updated Successfuly.",
            data
        })
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
            await Item.getItemById(id).then((requests) => {
                return res.json({
                    status: 200,
                    success: true,
                    message: "Item Images Updated Successfuly.",
                    data: requests
                })
            })
        })
    })

}

// working as intended
module.exports.delete_item = async (req, res) => {
    const { id } = req.params
    const user_id = req.headers.auth_token.id

    await Item.deleteItem(id, user_id).then((data) => {
        res.send({
            status: 200,
            success: true,
            message: "Item Removed Successfuly.",
            data
        })
    }).catch((error) => {
        res.send(error)
    })
}