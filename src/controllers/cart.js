'use strict'

var Cart = require('../models/cart')

module.exports.list_user_cart = async (req, res) => {
    const { id } = req.headers['auth_token']

    const data = await Cart.getCartByUserId(id)
    res.send({
        success: true,
        data
    })
}

module.exports.add_item_to_cart = async (req, res) => {
    const { id } = req.headers['auth_token']

    const data = await Cart.addItemtoCart(id, new Cart(req.body))
    res.send({
        success: true,
        data
    })
}

module.exports.update_item_in_cart = async (req, res) => {
    const { id } = req.params

    const data = await Cart.updateIteminCart(id, new Cart(req.body))
    res.send({
        status: true,
        data
    })
}

module.exports.delete_item_in_cart = async (req, res) => {
    const { id } = req.params

    const data = await Cart.deleteIteminCart(id)
    res.send({
        status: true,
        data
    })
}