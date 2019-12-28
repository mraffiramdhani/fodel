'use strict'

var Cart = require('../models/cart')

// working as intended
module.exports.list_user_cart = async (req, res) => {
    const { id } = req.headers.auth_token

    await Cart.getCartByUserId(id)
        .then((data) => {
            if (data.requests.length > 0) {
                res.send({
                    status: 200,
                    success: true,
                    message: "Cart Data Found.",
                    data
                })
            } else {
                res.send({
                    status: 200,
                    success: true,
                    message: "Cart Data not Found.",
                    data
                })
            }
        }).catch((error) => {
            res.json({ success: false, message: error, data: {} })
        })
}

// working as intended
module.exports.add_item_to_cart = async (req, res) => {
    const { id } = req.headers.auth_token

    await Cart.addItemtoCart(id, new Cart(req.body)).then(async () => {
        await Cart.getCartByUserId(id).then((data) => {
            res.send({
                status: 200,
                success: true,
                message: "Item Added to Cart.",
                data
            })
        })
    })
}

//working as intended
module.exports.update_item_in_cart = async (req, res) => {
    const { id } = req.params
    const userId = req.headers.auth_token.id

    await Cart.updateIteminCart(id, userId, new Cart(req.body)).then(async () => {
        await Cart.getCartByUserId(userId).then((data) => {
            res.send({
                status: 200,
                success: true,
                message: "Cart Item Updated Successfuly.",
                data
            })
        })
    })
}

//working as intended
module.exports.delete_item_in_cart = async (req, res) => {
    const { id } = req.params
    const userId = req.headers.auth_token.id

    await Cart.deleteIteminCart(id).then(async () => {
        await Cart.getCartByUserId(userId).then((data) => {
            res.send({
                status: 200,
                success: true,
                message: "Item Cart Removed Successfuly.",
                data
            })
        })
    })
}