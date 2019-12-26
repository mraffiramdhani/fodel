'use strict'

var Item = require('../models/item'),
    Restaurant = require('../models/restaurant'),
    redis = require('../redis'),
    multer = require('../multer');

module.exports.list_all_item = (req, res) => {
    const { name, rating, min_price, max_price, sort, type, cat } = req.query

    if (!name && !rating && !min_price && !max_price && !sort && !type && !cat) {
        // redis testing
        return redis.get('all_item_index', (ex, data) => {
            if (data) {
                const resultJSON = JSON.parse(data);
                return res.status(200).json(resultJSON);
            } else {
                Item.getAllItem((err, result, fields) => {
                    console.log('Item Controller Item index')
                    if (err) {
                        res.send(err)
                        console.log('error', err)
                        console.log('res', result)
                    } else {
                        // set redis key without expire time
                        redis.set('all_item_index', JSON.stringify({ source: 'Redis Cache', ...result, }))
                        return res.status(200).json({ source: 'Database query', ...result, });
                    }
                })
            }
        })
    } else {
        return redis.get(`index:${name},${rating},${min_price},${max_price},${sort},${type},${cat}`, (ex, data) => {
            if (data) {
                const resultJSON = JSON.parse(data);
                return res.status(200).json(resultJSON);
            } else {
                Item.getItemByParams(req.query, (err, result) => {
                    if (err) {
                        res.send(err)
                        console.log('error', err)
                        console.log('res', result)
                    } else {
                        redis.setex(`index:${name},${rating},${min_price},${max_price},${sort},${type},${cat}`,
                            3600,
                            JSON.stringify({ source: 'Redis Cache', ...result, }))
                        return res.status(200).json({ source: 'Database query', ...result, });
                    }
                })
            }
        })
    }
}

module.exports.show_item = (req, res) => {
    const { id } = req.params
    Item.getItemById(id, (err, result) => {
        if (err) {
            res.send(err)
            console.log('error', err)
            console.log('res', result)
        } else {
            Restaurant.getRestaurantById(result[0].restaurant_id, (e, r) => {
                if (e) {
                    res.send(e)
                    console.log('error', e)
                    console.log('res', r)
                } else {
                    Item.getItemByRestaurant(result[0].restaurant_id, (error, rows) => {
                        if (error) {
                            res.send(error)
                            console.log('error', error)
                            console.log('res', rows)
                        } else {
                            res.send({
                                success: true,
                                result,
                                restaurant: r,
                                showcase: rows
                            })
                        }
                    })
                }
            })
        }
    })
}

module.exports.create_item = (req, res) => {
    multer.uploads(req, res, function (err) {
        if (req.fileValidationError) {
            return res.end(req.fileValidationError)
        }
        req.body.image = req.file.filename
        Item.createItem(new Item(req.body), (err, result) => {
            console.log('Item Controller create Item')
            if (err) {
                res.send(err)
                console.log('error', err)
                console.log('res', result)
            } else {
                res.send({
                    success: true,
                    result
                })
            }
        })
    })
}

module.exports.update_item = (req, res) => {
    const { id } = req.params
    multer.uploads(req, res, function (err) {
        if (req.fileValidationError) {
            return res.end(req.fileValidationError)
        }
        req.body.image = req.file.filename
        Item.updateItem(id, new Item(req.body), (err, result, fields) => {
            console.log('Item Controller update Item')
            if (err) {
                res.send(err)
                console.log('error', err)
                console.log('res', result)
            } else {
                res.send({
                    success: true,
                    result
                })
            }
        })
    })
}

module.exports.delete_item = (req, res) => {
    const { id } = req.params
    Item.deleteItem(id, (err, result, fields) => {
        console.log('Item Controller delete Item')
        if (err) {
            res.send(err)
            console.log('error', err)
            console.log('res', result)
        } else {
            res.send({
                success: true,
                result
            })
        }
    })
}