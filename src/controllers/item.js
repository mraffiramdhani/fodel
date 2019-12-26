'use strict'

var Item = require('../models/item'),
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

module.exports.list_all_item = (req, res) => {
    const { name, rating, min_price, max_price, sort, type, cat } = req.query
    if (!name && !rating && !min_price && !max_price && !sort && !type && !cat) {
        Item.getAllItem((err, result, fields) => {
            console.log('Item Controller Item index')
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
    } else {
        Item.getItemByParams(req.query, (err, result) => {
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
}

module.exports.show_item = (req, res) => {
    const { id } = req.params
    Item.getItemById(id, (err, result) => {
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

module.exports.create_item = (req, res) => {
    uploads(req, res, function (err) {
        if (err) {
            return res.end('Error Upload file')
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
    uploads(req, res, function (err) {
        if (err) {
            return res.end('Error Upload file')
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