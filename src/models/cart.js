'use strict'

const conn = require('../dbconfig')

var Cart = function Cart(cart) {
    this.item_id = cart.item_id
    this.quantity = cart.quantity
    this.description = cart.description
    this.created_at = new Date()
    this.updated_at = new Date()
}

Cart.getCartByUserId = (userId, result) => {
    conn.query('select * from carts where user_id=?', userId, (err, res, fields) => {
        if (err) {
            console.log('error: ', err)
            result(null, err)
        } else {
            console.log('data:', res)
            result(null, res)
        }
    })
}

Cart.addItemtoCart = (userId, newItem, result) => {
    const { item_id, quantity, description, created_at, updated_at } = newItem
    conn.query('insert into carts(item_id, quantity, description, user_id, created_at, updated_at) values(?,?,?,?,?,?)',
        [item_id, quantity, description, userId, created_at, updated_at],
        (err, res, fields) => {
            if (err) {
                console.log('error: ', err)
                result(null, err)
            } else {
                console.log('data:', res)
                result(null, res)
            }
        })
}

Cart.updateIteminCart = (id, item, result) => {
    const { quantity, description, updated_at } = item
    conn.query('update carts set quantity=?, description=?, updated_at=? where id=?',
        [quantity, description, updated_at, id],
        (err, res, fields) => {
            if (err) {
                console.log('error: ', err)
                result(null, err)
            } else {
                console.log('data:', res)
                result(null, res)
            }
        })
}

Cart.deleteIteminCart = (id, result) => {
    conn.query('delete from carts where id=?',
        id, (err, res, fields) => {
            if (err) {
                console.log('error: ', err)
                result(null, err)
            } else {
                console.log('data:', res)
                result(null, res)
            }
        })
}

module.exports = Cart