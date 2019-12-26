'use strict'

var Restaurant = require('../models/restaurant'),
    Item = require('../models/item'),
    multer = require('../multer');

module.exports.list_all_restaurant = (req, res) => {
    Restaurant.getAllRestaurant((err, result, fields) => {
        console.log('Restaurant Controller Restaurant index')
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

module.exports.show_restaurant = (req, res) => {
    const { id } = req.params
    Restaurant.getRestaurantById(id, (err, result) => {
        if (err) {
            res.send(err)
            console.log('error', err)
            console.log('res', result)
        } else {
            Item.getItemByRestaurant(id, (error, rows) => {
                if (error) {
                    res.send(error)
                    console.log('error', error)
                    console.log('res', rows)
                } else {
                    res.send({
                        success: true,
                        result,
                        item: rows
                    })
                }
            })
        }
    })
}

module.exports.create_restaurant = (req, res) => {
    multer.uploads(req, res, function (err) {
        if (req.fileValidationError) {
            return res.end(req.fileValidationError)
        }

        req.body.image = req.file.filename
        Restaurant.createRestaurant(new Restaurant(req.body), (err, result, fields) => {
            console.log('Restaurant Controller create restaurant')
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

module.exports.update_restaurant = (req, res) => {
    const { id } = req.params

    multer.uploads(req, res, function (err) {
        if (req.fileValidationError) {
            return res.end(req.fileValidationError)
        }
        req.body.image = req.file.filename
        Restaurant.updateRestaurant(id, new Restaurant(req.body), (err, result, fields) => {
            console.log('Restaurant Controller update restaurant')
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

module.exports.delete_restaurant = (req, res) => {
    const { id } = req.params
    Restaurant.deleteRestaurant(id, (err, result, fields) => {
        console.log('Restaurant controller delete restaurant')
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