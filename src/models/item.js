'use strict'

const conn = require('../dbconfig')

var Item = function Item(item) {
    this.name = item.name
    this.price = item.price
    this.description = item.description
    this.image = item.image
    this.category = item.category
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

Item.getItemByParams = (params, result) => {
    const { name, rating, min_price, max_price, sort, type, cat } = params
    // i call this dynamic searching algoritm
    var sql = `select i.*, (select round(AVG(rating), 1) r from reviews where reviews.item_id=i.id) rating from items i `
        + ((cat) ? `inner join item_category as ic on i.id = ic.item_id where ic.category_id in (${cat}) ${((rating || name || min_price || max_price) ? `and ` : ``)}` : `where `)
        + ((rating) ? `(select round(AVG(rating), 1) r from reviews where reviews.item_id=i.id) between ${rating - 1} and ${rating} ${((name || min_price || max_price) ? `and ` : ``)}` : ``)
        + ((name) ? `name like '%${name}%' ${((min_price || max_price) ? `and ` : ``)}` : ``)
        + ((min_price) ? `price >= ${min_price} ${((max_price) ? `and ` : ``)}` : ``)
        + ((max_price) ? `price <= ${max_price} ` : ``)
        + ((sort) ? `order by ${sort} ${((type) ? `${type}` : ``)}` : ``)

    console.log(sql)
    conn.query(sql,
        params,
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

Item.createItem = (newItem, result) => {
    const { name, price, description, image, category, restaurant_id, created_at, updated_at } = newItem

    conn.query('insert into items(name, price, description, image, restaurant_id) values(?,?,?,?,?)',
        [name, price, description, image, restaurant_id, created_at, updated_at],
        (err, res, fields) => {
            if (err) {
                console.log('error: ', err)
                result(null, err)
            } else {
                console.log('data:', res)
                const cat = category.split(',')
                var sql = 'insert into item_category(item_id, category_id) values'
                var add_str = []
                for (var i = 0; i < cat.length; i++) {
                    add_str.push(`(${res.insertId}, ${cat[i]})`)
                }
                conn.query(sql + add_str.join(','), (error, rows) => {
                    if (error) {
                        console.log('error: ', error)
                        result(null, error)
                    } else {
                        console.log('data:', rows)
                        result(null, { rows, res })
                    }
                })
            }
        })
}

Item.updateItem = (id, data, result) => {
    const { name, price, description, image, category, updated_at } = data
    conn.query('update items set name=?, price=?, description=?, image=?, updated_at=? where id=?',
        [name, price, description, image, updated_at, id],
        (err, res, fields) => {
            if (err) {
                console.log('error: ', err)
                result(null, err)
            } else {
                console.log('data:', res)
                const cat = category.split(',')
                var sql = `delete from item_category where item_id=${id};insert into item_category(item_id, category_id) values`
                console.log(sql)
                var add_str = []
                for (var i = 0; i < cat.length; i++) {
                    add_str.push(`(${id}, ${cat[i]})`)
                }
                conn.query(sql + add_str.join(','), (error, rows) => {
                    if (error) {
                        console.log('error: ', error)
                        result(null, error)
                    } else {
                        console.log('data:', rows)
                        result(null, { rows, res })
                    }
                })
            }
        })
}

Item.deleteItem = (id, result) => {
    conn.query('delete from item_category where item_id=?;delete from items where id=?',
        [id, id],
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

module.exports = Item