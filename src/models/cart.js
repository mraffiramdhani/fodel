'use strict'

const conn = require('../dbconfig')

var Cart = function Cart(cart) {
    this.item_id = cart.item_id
    this.quantity = cart.quantity
    this.description = cart.description
    this.created_at = new Date()
    this.updated_at = new Date()
}

Cart.getCartByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        conn.query('select * from carts where user_id=?', userId, (err, res, fields) => {
            if (err) reject(err)
            resolve(res)
        })
    }).then(async (data) => {
        for (var i = 0; i < data.length; i++) {
            const image = new Promise((resolve, reject) => {
                conn.query('select filename from item_images where item_id=?', [data[i].item_id], (err, res) => {
                    if (err) reject(err)
                    resolve(res)
                })
            })
            await image.then((result) => {
                data[i].images = result
            })
        }
        return data
    }).then(async (data) => {
        for (var i = 0; i < data.length; i++) {
            const item = new Promise((resolve, reject) => {
                conn.query('select * from items where id=?', [data[i].item_id], (err, res) => {
                    if (err) reject(err)
                    resolve(res)
                })
            })
            await item.then((result) => {
                data[i].detail = result
            })
        }
        return data
    })
}

Cart.addItemtoCart = (userId, newItem) => {
    const { item_id, quantity, description, created_at, updated_at } = newItem

    return new Promise((resolve, reject) => {
        conn.query('insert into carts(item_id, quantity, description, user_id, created_at, updated_at) values(?,?,?,?,?,?)',
            [item_id, quantity, description, userId, created_at, updated_at],
            (err, res, fields) => {
                if (err) reject(err)
                resolve(res)
            })
    })
}

Cart.updateIteminCart = (id, userId, item) => {
    const { quantity, description, updated_at } = item

    return new Promise((resolve, reject) => {
        conn.query('update carts set quantity=?, description=?, updated_at=? where id=? and user_id=?',
            [quantity, description, updated_at, id, userId],
            (err, res, fields) => {
                if (err) reject(err)
                resolve(res)
            })
    })
}

Cart.deleteIteminCart = (id) => {
    return new Promise((resolve, reject) => {
        conn.query('delete from carts where id=?',
            id, (err, res, fields) => {
                if (err) reject(err)
                resolve(res)
            })
    })
}

Cart.checkoutCart = (id) => {
    return new Promise((resolve, reject) => {
        conn.query('update carts set is_complete=1, updated_at=? where user_id=?',
            [new Date(), id],
            (err, res) => {
                if (err) reject(err)
                resolve(res)
            })
    })
}

module.exports = Cart