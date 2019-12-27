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
        conn.query('select * from items i limit ' + limit, (err, res, fields) => {
            if (err) reject(err)
            resolve(res)
        })
    }).then(async (data) => {
        for (var i = 0; i < data.length; i++) {
            const image = new Promise((resolve, reject) => {
                conn.query('select filename from item_images where item_id=?', [data[i].id], (err, res) => {
                    if (err) reject(err)
                    resolve(res)
                })
            })
            await image.then((result) => {
                data[i].images = result
            })
        }
        return data
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
    var { name, rating, min_price, max_price, sort, type, cat } = params

    if (sort === 'rating') sort = `(select round(AVG(rating), 1) r from reviews where reviews.item_id=i.id)`
    const fixedSort = sort ? `order by ` + sort + ' ' + type : `` || `order by updated_at asc`
    var sql = `select count(distinct id) as numRows from items i `
        + ((cat) ? `inner join item_category as ic on i.id = ic.item_id where ic.category_id in (${cat}) ${((rating || name || min_price || max_price) ? `and ` : ``)}` : ``)
        + ((rating) ? `${((!cat) ? `where ` : ``)}(select round(AVG(rating), 1) r from reviews where reviews.item_id=i.id) between ${rating - 1} and ${rating} ${((name || min_price || max_price) ? `and ` : ``)}` : ``)
        + ((name) ? `${((!cat && !rating) ? `where ` : ``)}name like '%${name}%' ${((min_price || max_price) ? `and ` : ``)}` : ``)
        + ((min_price) ? `${((!cat && !rating && !name) ? `where ` : ``)}price >= ${min_price} ${((max_price) ? `and ` : ``)}` : ``)
        + ((max_price) ? `${((!cat && !rating && !name && !min_price) ? `where ` : ``)}price <= ${max_price} ` : ``)
        + fixedSort + ` `

    // console.log(sql)
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
    }).then((item) => {
        return new Promise((resolve, reject) => {
            conn.query('select * from categories c inner join item_category ic on c.id = ic.category_id where ic.item_id=?',
                [id], (err, categories) => {
                    if (err) reject(err)
                    resolve({ item, categories })
                })
        })
    }).then((item) => {
        return new Promise((resolve, reject) => {
            conn.query('select * from item_images where item_id=?', [id], (err, images) => {
                if (err) reject(err)
                item.images = images
                resolve(item)
            })
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
    var { name, rating, min_price, max_price, sort, type, cat } = params

    if (sort === 'rating') sort = `(select round(AVG(rating), 1) r from reviews where reviews.item_id=i.id)`
    const fixedSort = sort ? `order by ` + sort + ' ' + type : `` || `order by updated_at asc`

    var sql = `select distinct i.*, (select round(AVG(rating), 1) r from reviews where reviews.item_id=i.id) rating from items i `
        + ((cat) ? `inner join item_category as ic on i.id = ic.item_id where ic.category_id in (${cat}) ${((rating || name || min_price || max_price) ? `and ` : ``)}` : ``)
        + ((rating) ? `${((!cat) ? `where ` : ``)}(select round(AVG(rating), 1) r from reviews where reviews.item_id=i.id) between ${rating - 1} and ${rating} ${((name || min_price || max_price) ? `and ` : ``)}` : ``)
        + ((name) ? `${((!cat && !rating) ? `where ` : ``)}name like '%${name}%' ${((min_price || max_price) ? `and ` : ``)}` : ``)
        + ((min_price) ? `${((!cat && !rating && !name) ? `where ` : ``)}price >= ${min_price} ${((max_price) ? `and ` : ``)}` : ``)
        + ((max_price) ? `${((!cat && !rating && !name && !min_price) ? `where ` : ``)}price <= ${max_price} ` : ``)
        + fixedSort + ` `
        + ((limit) ? `limit ` + limit : ``)

    // console.log(sql)
    return new Promise((resolve, reject) => {
        conn.query(sql, params, (err, res, fields) => {
            if (err) reject(err)
            resolve(res)
        })
    }).then(async (data) => {
        for (var i = 0; i < data.length; i++) {
            const image = new Promise((resolve, reject) => {
                conn.query('select filename from item_images where item_id=?', [data[i].id], (err, res) => {
                    if (err) reject(err)
                    resolve(res)
                })
            })
            await image.then((result) => {
                data[i].images = result
            })
        }
        return data
    })
}

Item.createItem = (newItem) => {
    const { name, price, description, image, category, restaurant_id, created_at, updated_at } = newItem

    return new Promise((resolve, reject) => {
        conn.query('insert into items(name, price, description, restaurant_id, created_at, updated_at) values(?,?,?,?,?,?)',
            [name, price, description, restaurant_id, created_at, updated_at],
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
    }).then((data) => {
        var sql = 'insert into item_images(item_id, filename) values'
        var arr_img = []
        for (var i = 0; i < image.length; i++) {
            arr_img.push(`(${data.data.insertId}, '${image[i].filename}')`)
        }
        return new Promise((resolve, reject) => {
            conn.query(sql + arr_img.join(','), (error, result) => {
                if (error) reject(error)
                resolve({ data, result })
            })
        })
    }).catch((errLog) => {
        // console.log(errLog)
        return new Error(errLog)
    })
}

Item.updateItem = (id, data) => {
    const { name, price, description, image, category, updated_at } = data

    return new Promise((resolve, reject) => {
        conn.query('update items set name=?, price=?, description=?, updated_at=? where id=?',
            [name, price, description, updated_at, id],
            (err, res, fields) => {
                if (err) reject(err)
                resolve(res)
            })
    }).then((data) => {
        const cat = category.split(',')
        var sql = `delete from item_category where item_id=${id};insert into item_category(item_id, category_id) values`
        var add_str = []
        for (var i = 0; i < cat.length; i++) {
            add_str.push(`(${id}, ${cat[i]})`)
        }
        return new Promise((resolve, reject) => {
            conn.query(sql + add_str.join(','), (error, rows) => {
                if (error) reject(error)
                resolve({ rows, data })
            })
        })
    }).then((data) => {
        var sql = `delete from item_images where item_id=${id};insert into item_images(item_id, filename) values`
        var arr_img = []
        for (var i = 0; i < image.length; i++) {
            arr_img.push(`(${id}, '${image[i].filename}')`)
        }
        return new Promise((resolve, reject) => {
            conn.query(sql + arr_img.join(','), (error, result) => {
                if (error) reject(error)
                resolve({ data, result })
            })
        })
    }).catch((errLog) => {
        return new Error(errLog)
    })
}

Item.deleteItem = (id) => {
    return new Promise((resolve, reject) => {
        conn.query('delete from item_category where item_id=?;delete from item_images where item_id=?;delete from items where id=?',
            [id, id, id],
            (err, res, fields) => {
                if (err) reject(err)
                resolve(res)
            })
    })
}

module.exports = Item