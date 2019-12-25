'use strict'

var Restaurant = require('../models/restaurant'),
    multer = require('multer'),
    path = require('path');

const storage = multer.diskStorage({
    destination: path.join(__dirname + './../../public/images/'),
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() +
            path.extname(file.originalname));
    }
});

var uploads = multer({ storage: storage }).single('image')

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

module.exports.create_restaurant = (req, res) => {
    var new_restaurant = new Restaurant(req.body)

    Restaurant.createRestaurant(new_restaurant, (err, result, fields) => {
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
}

module.exports.update_restaurant = (req, res) => {
    const { id } = req.params
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