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

Item.getAllItem = (limit) => {
    return new Promise((resolve, reject) => {
        conn.query('select * from items limit ' + limit, (err, res, fields) => {
            if (err) reject(err)
            resolve(res)
        })
    })
}

Item.getNumRows = () => {
    return new Promise((resolve, reject) => {
        conn.query('select count(*) as numRows from items', (err, res) => {
            if (err) reject(err)
            resolve(res)
        })
    })
}

Item.getNumRowsParam = (params) => {
    const { name, rating, min_price, max_price, sort, type, cat } = params

    const fixedSort = `updated_at asc` || sort + ' ' + type
    var sql = `select count(distinct id) as numRows from items i `
        + ((cat) ? `inner join item_category as ic on i.id = ic.item_id where ic.category_id in (${cat}) ${((rating || name || min_price || max_price) ? `and ` : ``)}` : ``)
        + ((rating) ? `${((!cat) ? `where ` : ``)}(select round(AVG(rating), 1) r from reviews where reviews.item_id=i.id) between ${rating - 1} and ${rating} ${((name || min_price || max_price) ? `and ` : ``)}` : ``)
        + ((name) ? `${((!cat && !rating) ? `where ` : ``)}name like '%${name}%' ${((min_price || max_price) ? `and ` : ``)}` : ``)
        + ((min_price) ? `${((!cat && !rating && !name) ? `where ` : ``)}price >= ${min_price} ${((max_price) ? `and ` : ``)}` : ``)
        + ((max_price) ? `${((!cat && !rating && !name && !min_price) ? `where ` : ``)}price <= ${max_price} ` : ``)
        + `order by ${fixedSort}`

    console.log(sql)
    return new Promise((resolve, reject) => {
        conn.query(sql, params, (err, res, fields) => {
            if (err) reject(err)
            resolve(res)
        })
    })
}

Item.getItemById = (id) => {
    return new Promise((resolve, reject) => {
        conn.query('select * from items where id=?', id, (err, res, fields) => {
            if (err) reject(err)
            resolve(res)
        })
    })
}

Item.getItemByRestaurant = (id) => {
    return new Promise((resolve, reject) => {
        conn.query('select * from items where restaurant_id=?', id, (err, res, fields) => {
            if (err) reject(err)
            resolve(res)
        })
    })
}

Item.getItemByParams = (params, limit = null) => {
    const { name, rating, min_price, max_price, sort, type, cat } = params

    const fixedSort = `updated_at asc` || sort + ' ' + type

    var sql = `select distinct i.*, (select round(AVG(rating), 1) r from reviews where reviews.item_id=i.id) rating from items i `
        + ((cat) ? `inner join item_category as ic on i.id = ic.item_id where ic.category_id in (${cat}) ${((rating || name || min_price || max_price) ? `and ` : ``)}` : ``)
        + ((rating) ? `${((!cat) ? `where ` : ``)}(select round(AVG(rating), 1) r from reviews where reviews.item_id=i.id) between ${rating - 1} and ${rating} ${((name || min_price || max_price) ? `and ` : ``)}` : ``)
        + ((name) ? `${((!cat && !rating) ? `where ` : ``)}name like '%${name}%' ${((min_price || max_price) ? `and ` : ``)}` : ``)
        + ((min_price) ? `${((!cat && !rating && !name) ? `where ` : ``)}price >= ${min_price} ${((max_price) ? `and ` : ``)}` : ``)
        + ((max_price) ? `${((!cat && !rating && !name && !min_price) ? `where ` : ``)}price <= ${max_price} ` : ``)
        + `order by ${fixedSort} `
        + ((limit) ? `limit ` + limit : ``)

    console.log(sql)
    return new Promise((resolve, reject) => {
        conn.query(sql, params, (err, res, fields) => {
            if (err) reject(err)
            resolve(res)
        })
    })
}

Item.createItem = (newItem) => {
    const { name, price, description, image, category, restaurant_id, created_at, updated_at } = newItem

    return new Promise((resolve, reject) => {
        conn.query('insert into items(name, price, description, image, restaurant_id, created_at, updated_at) values(?,?,?,?,?,?,?)',
            [name, price, description, image, restaurant_id, created_at, updated_at],
            (err, res, fields) => {
                if (err) reject(err)
                resolve(res)
            })
    }).then((data) => {
        const cat = category.split(',')
        var sql = 'insert into item_category(item_id, category_id) values'
        var add_str = []
        for (var i = 0; i < cat.length; i++) {
            add_str.push(`(${data.insertId}, ${cat[i]})`)
        }
        return new Promise((resolve, reject) => {
            conn.query(sql + add_str.join(','), (error, rows) => {
                if (error) reject(error)
                resolve({ rows, data })
            })
        })
    }).catch((errLog) => {
        console.log(errLog)
        return new Error(errLog)
    })
}

Item.updateItem = (id, data) => {
    const { name, price, description, image, category, updated_at } = data

    return new Promise((resolve, reject) => {
        conn.query('update items set name=?, price=?, description=?, image=?, updated_at=? where id=?',
            [name, price, description, image, updated_at, id],
            (err, res, fields) => {
                if (err) reject(err)
                resolve(res)
            })
    }).then((item) => {
        const cat = category.split(',')
        var sql = `delete from item_category where item_id=${id};insert into item_category(item_id, category_id) values`
        var add_str = []
        for (var i = 0; i < cat.length; i++) {
            add_str.push(`(${id}, ${cat[i]})`)
        }
        return new Promise((resolve, reject) => {
            conn.query(sql + add_str.join(','), (error, rows) => {
                if (error) reject(error)
                resolve({ rows, item })
            })
        })
    }).catch((errLog) => {
        return new Error(errLog)
    })
}

Item.deleteItem = (id) => {
    return new Promise((resolve, reject) => {
        conn.query('delete from item_category where item_id=?;delete from items where id=?',
            [id, id],
            (err, res, fields) => {
                if (err) reject(err)
                resolve(res)
            })
    })
}

module.exports = Item