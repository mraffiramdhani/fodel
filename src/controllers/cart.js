'use strict'

var Cart = require('../models/cart')

// working as intended
module.exports.list_user_cart = async (req, res) => {
    const { id } = req.headers.auth_token

    const data = await Cart.getCartByUserId(id)
    res.send({
        success: true,
        data
    })
}

// working as intended
module.exports.add_item_to_cart = async (req, res) => {
    const { id } = req.headers.auth_token

    const response = await Cart.addItemtoCart(id, new Cart(req.body))
    const data = await Cart.getCartByUserId(id)
    res.send({
        success: true,
        response,
        data
    })
}

//working as intended
module.exports.update_item_in_cart = async (req, res) => {
    const { id } = req.params
    const userId = req.headers.auth_token.id

    const response = await Cart.updateIteminCart(id, new Cart(req.body))
    const data = await Cart.getCartByUserId(userId)
    res.send({
        status: true,
        response,
        data
    })
}

//working as intended
module.exports.delete_item_in_cart = async (req, res) => {
    const { id } = req.params
    const userId = req.headers.auth_token.id

    const response = await Cart.deleteIteminCart(id)
    const data = await Cart.getCartByUserId(userId)
    res.send({
        status: true,
        response,
        data
    })
}