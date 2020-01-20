'use strict'

var Cart = require('../models/cart')
const {response} = require('../helper/response')

module.exports.list_user_cart = async (req, res) => {
    const { id } = req.auth

    await Cart.getCartByUserId(id)
        .then((data) => {
            if (data.length > 0) {
                response(res, 200, true, "Cart Data Found.", data)
            } else {
                response(res, 200, true, "Cart is Empty. Let's Go Foond Hunting.", data)
            }
        }).catch((error) => {
            response(res, 200, false, error)
        })
}

module.exports.add_item_to_cart = async (req, res) => {
    const { id } = req.auth

    await Cart.addItemtoCart(id, new Cart(req.body)).then(async () => {
        await Cart.getCartByUserId(id).then((data) => {
            response(res, 200, true, "Item Added to Cart.", data)
        })
    })
}

module.exports.update_item_in_cart = async (req, res) => {
    const { id } = req.params
    var userId = req.auth.id

    await Cart.updateIteminCart(id, userId, new Cart(req.body)).then(async () => {
        await Cart.getCartByUserId(userId).then((data) => {
            response(res, 200, true, "Cart Item Updated Successfuly.", data)
        })
    })
}

module.exports.delete_item_in_cart = async (req, res) => {
    const { id } = req.params
    var userId = req.auth.id

    await Cart.deleteIteminCart(id).then(async () => {
        await Cart.getCartByUserId(userId).then((data) => {
            response(res, 200, true, "Item Cart Removed Successfuly.", data)
        })
    })
}

module.exports.checkout_cart = async (req, res) => {
    const { id } = req.auth

    await Cart.checkoutCart(id).then((data) => {
        response(res, 200, true, "Checkout Successfull.")
    })
}