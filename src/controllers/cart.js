'use strict'

var Cart = require('../models/cart')

module.exports.list_user_cart = (req, res) => {
    const { id } = req.headers['auth_token']

    Cart.getCartByUserId(id, (err, result) => {
        console.log('Cart Controller Cart index')
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

module.exports.add_item_to_cart = (req, res) => {
    const { id } = req.headers['auth_token']
    Cart.addItemtoCart(id, new Cart(req.body), (err, result) => {
        console.log('Cart Controller add item to user cart')
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

module.exports.update_item_in_cart = (req, res) => {
    const { id } = req.params
    Cart.updateIteminCart(id, new Cart(req.body), (err, result) => {
        console.log('Cart Controller update item in user cart')
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

module.exports.delete_item_in_cart = (req, res) => {
    const { id } = req.params
    Cart.deleteIteminCart(id, (err, result, fields) => {
        console.log('Cart Controller delete item in cart')
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