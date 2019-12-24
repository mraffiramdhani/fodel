'use strict'

const conn = require('../dbconfig')

var Item = function Item(item) {
    this.name = item.name
    this.price = item.price
    this.description = item.description
    this.image = null
    this.category_id = item.category_id
    this.restaurant_id = item.restaurant_id
    this.created_at = new Date()
    this.updated_at = new Date()
}

Item.getAllItem = (result) => {
    conn.query('select * from items', (err, res, fields) => {
        if (err) {
            console.log('error: ', err)
            result(null, err)
        } else {
            console.log('data:', res)
            result(null, res)
        }
    })
}

Item.getItemById = (id, result) => {
    conn.query('select * from items where id=?', id, (err, res, fields) => {
        if (err) {
            console.log('error: ', err)
            result(null, err)
        } else {
            console.log('data:', res)
            result(null, res)
        }
    })
}

Item.createItem = (newItem, result) => {
    const { name, price, description, image, category_id, restaurant_id, created_at, updated_at } = newItem
    conn.query('insert into items(name, price, description, image, category_id, restaurant_id) values(?,?,?,?,?,?)',
        [name, price, description, image, category_id, restaurant_id, created_at, updated_at],
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

Item.updateItem = (id, data, result) => {
    const { name, price, description, image, category_id, updated_at } = data
    conn.query('update items set name=?, price=?, description=?, image=?, category_id=?, updated_at=? where id=?',
        [name, price, description, image, category_id, updated_at, id],
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

Item.deleteItem = (id, result) => {
    conn.query('delete from items where id=?', id, (err, res, fields) => {
        if (err) {
            console.log('error: ', err)
            result(null, err)
        } else {
            console.log('data:', res)
            result(null, res)
        }
    })
}

module.exports = Item