'use strict'

const Item = require('../models/item'),
    Restaurant = require('../models/restaurant'),
    redis = require('../redis'),
    multer = require('../multer');

// working as intended
module.exports.list_all_item = async (req, res) => {
    const { name, rating, min_price, max_price, sort, type, cat } = req.query
    var numRows, queryPagination
    var numPerPage = parseInt(req.query.npp, 10) || 10
    var page = parseInt(req.query.page) || 0
    var numPages
    var skip = page * numPerPage

    if (!name && !rating && !min_price && !max_price && !sort && !type && !cat) {
        await Item.getNumRows().then((results) => {
            numRows = results[0].numRows
            numPages = Math.ceil(numRows / numPerPage)
            console.log('number of all items:', numRows);
        })

        var limit = skip + ',' + numPerPage
        return redis.get(`all_item_page:${page}_limit:${numPerPage}`, async (ex, data) => {
            if (data) {
                const resultJSON = JSON.parse(data);
                return res.status(200).send({
                    success: true,
                    source: 'Redis Cache',
                    data: resultJSON
                });
            } else {
                await Item.getAllItem(limit).then((results) => {
                    var responsePayload = {
                        results
                    }
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
                    return res.status(200).send({ success: true, source: 'Database Query', data: x_data })
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
            console.log('number of indexed items:', numRows);
            console.log('number of indexed pages:', numPages);
        })

        var limit = numRows >= 10 ? skip + ',' + numPerPage : null
        return redis.get(`search_item:${name},${rating},${min_price},${max_price},${sort},${type},${cat}_page:${page}_limit:${limit}`, async (ex, data) => {
            if (data) {
                const resultJSON = JSON.parse(data);
                return res.status(200).json({
                    success: true,
                    source: 'Redis Cache',
                    data: resultJSON
                });
            } else {
                await Item.getItemByParams(req.query, limit).then((results) => {
                    var responsePayload = {
                        results
                    }
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
                    return res.status(200).send({ success: true, source: 'Database Query', data: x_data })
                }).catch(function (err) {
                    console.error(err);
                    res.json({ err: err });
                })
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

// working asn intended
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

// working asn intended
module.exports.update_item = async (req, res) => {
    const { id } = req.params
    multer.uploads(req, res, async () => {
        if (req.fileValidationError) {
            return res.end(req.fileValidationError)
        }
        req.body.image = req.file.filename
        await Item.updateItem(id, new Item(req.body)).then((data) => {
            return res.json({
                success: true,
                data
            })
        })
    })
}

// working as intended
module.exports.delete_item = async (req, res) => {
    const { id } = req.params
    await Item.deleteItem(id).then((data) => {
        res.send({
            status: true,
            data
        })
    }).catch((error) => {
        res.send(error)
    })
}