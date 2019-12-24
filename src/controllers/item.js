'use strict'

var Item = require('../models/item')

module.exports.list_all_item = (req, res) => {
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
}

module.exports.create_item = (req, res) => {
    var new_item = new Item(req.body)

    // if (!new_category.name) {
    //     res.status(400).send({
    //         error: true,
    //         message: "Please provide a valid data"
    //     })
    // } else {
    Item.createItem(new_item, (err, result) => {
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
}
// }

module.exports.update_item = (req, res) => {
    const { id } = req.params
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