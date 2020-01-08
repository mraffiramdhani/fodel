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

Item.getItemCount = (search, sort) => {
    var sql = 'select count(*) as iCount from items'
    if (search) {
        var arr = []
        Object.keys(search).map((key, index) => {
            arr.push(key + ` like '%` + search[key] + `%'`)
        })
        sql += ' WHERE ' + arr.join(' AND ')
    }
    if (sort) {
        Object.keys(sort).map((key, index) => {
            sql += ' ORDER BY ' + key + ' ' + sort[key]
        })
    }
    return new Promise((resolve, reject) => {
        conn.query(sql, (err, res) => {
            if (err) reject(err)
            resolve(res)
        })
    })
}

Item.getAllItem = (search, sort, limit) => {
    var sql = 'select * from items'
    if (search) {
        var arr = []
        Object.keys(search).map((key, index) => {
            arr.push(key + ` like '%` + search[key] + `%'`)
        })
        sql += ' WHERE ' + arr.join(' AND ')
    }
    if (sort) {
        Object.keys(sort).map((key, index) => {
            sql += ' ORDER BY ' + key + ' ' + sort[key]
        })
    }
    if (limit !== '') {
        sql += ' limit ' + limit
    }
    return new Promise((resolve, reject) => {
        conn.query(sql, (err, res, fields) => {
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
                    item[0].categories = categories
                    resolve(item)
                })
        })
    }).then((item) => {
        return new Promise((resolve, reject) => {
            conn.query('select * from item_images where item_id=?', [id], (err, images) => {
                if (err) reject(err)
                item[0].images = images
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
    }).then(async (data) => {
        for (var i = 0; i < data.length; i++) {
            const category = new Promise((resolve, reject) => {
                conn.query('select c.name  from item_category ic inner join categories c on ic.category_id=c.id where ic.item_id=?', [data[i].id], (err, res) => {
                    if (err) reject(err)
                    resolve(res)
                })
            })
            await category.then((result) => {
                data[i].category = result
            })
        }
        return data
    })
}

// Item.getItemByParams = (params, limit = null) => {
//     var { name, rating, min_price, max_price, sort, type, cat } = params

//     if (sort === 'rating') sort = `(select round(AVG(rating), 1) r from reviews where reviews.item_id=i.id)`
//     const fixedSort = sort ? `order by ` + sort + ' ' + type : `` || `order by updated_at asc`

//     var sql = `select distinct i.*, (select round(AVG(rating), 1) r from reviews where reviews.item_id=i.id) rating from items i `
//         + ((cat) ? `inner join item_category as ic on i.id = ic.item_id where ic.category_id in (${cat}) ${((rating || name || min_price || max_price) ? `and ` : ``)}` : ``)
//         + ((rating) ? `${((!cat) ? `where ` : ``)}(select round(AVG(rating), 1) r from reviews where reviews.item_id=i.id) between ${rating - 1} and ${rating} ${((name || min_price || max_price) ? `and ` : ``)}` : ``)
//         + ((name) ? `${((!cat && !rating) ? `where ` : ``)}name like '%${name}%' ${((min_price || max_price) ? `and ` : ``)}` : ``)
//         + ((min_price) ? `${((!cat && !rating && !name) ? `where ` : ``)}price >= ${min_price} ${((max_price) ? `and ` : ``)}` : ``)
//         + ((max_price) ? `${((!cat && !rating && !name && !min_price) ? `where ` : ``)}price <= ${max_price} ` : ``)
//         + fixedSort + ` `
//         + ((limit) ? `limit ` + limit : ``)

//     // console.log(sql)
//     return new Promise((resolve, reject) => {
//         conn.query(sql, params, (err, res, fields) => {
//             if (err) reject(err)
//             resolve(res)
//         })
//     }).then(async (data) => {
//         for (var i = 0; i < data.length; i++) {
//             const image = new Promise((resolve, reject) => {
//                 conn.query('select filename from item_images where item_id=?', [data[i].id], (err, res) => {
//                     if (err) reject(err)
//                     resolve(res)
//                 })
//             })
//             await image.then((result) => {
//                 data[i].images = result
//             })
//         }
//         return data
//     })
// }

Item.createItem = async (newItem) => {
    const { name, price, description, image, category, restaurant_id } = newItem

    return new Promise((resolve, reject) => {
        conn.query('insert into items(name, price, description, restaurant_id) values(?,?,?,?)',
            [name, price, description, restaurant_id],
            (err, res, fields) => {
                if (err) reject(err)
                resolve(res)
            })
    }).then((response) => {
        const cat = category.split(',')
        var sql = 'insert into item_category(item_id, category_id) values'
        var add_str = []
        for (var i = 0; i < cat.length; i++) {
            add_str.push(`(${response.insertId}, ${cat[i]})`)
        }
        return new Promise((resolve, reject) => {
            conn.query(sql + add_str.join(','), (error, resutl) => {
                if (error) reject(error)
                resolve(response)
            })
        })
    }).then((response) => {
        var sql = 'insert into item_images(item_id, filename) values'
        var arr_img = []
        for (var i = 0; i < image.length; i++) {
            arr_img.push(`(${response.insertId}, '${image[i].filename}')`)
        }
        return new Promise((resolve, reject) => {
            conn.query(sql + arr_img.join(','), (error, result) => {
                if (error) reject(error)
                resolve(response)
            })
        })
    }).then((response) => {
        return new Promise((resolve, reject) => {
            conn.query('select * from items where id=?', [response.insertId], (error, item) => {
                if (error) reject(error)
                response = item
                resolve(response)
            })
        })
    }).then((response) => {
        return new Promise((resolve, reject) => {
            conn.query('select filename from item_images where item_id=?', [response[0].id], (error, images) => {
                if (error) reject(error)
                response[0].images = images
                resolve(response)
            })
        })
    }).then((response) => {
        const cat = category.split(',')
        var sql = `select * from categories where id in (${cat})`
        return new Promise((resolve, reject) => {
            conn.query(sql, [], (error, categories) => {
                if (error) reject(error)
                response[0].categories = categories
                resolve(response)
            })
        })
    }).catch((errLog) => {
        return new Error(errLog)
    })
}

Item.updateItem = (id, data) => {
    const { name, price, description, restaurant_id, category } = data

    return new Promise((resolve, reject) => {
        conn.query('update items set name=?, price=?, description=? where id=? and restaurant_id=?',
            [name, price, description, id, restaurant_id],
            (err, res, fields) => {
                if (err) reject(err)
                resolve(res)
            })
    }).then((response) => {
        const cat = category.split(',')
        var sql = `delete from item_category where item_id=${id};insert into item_category(item_id, category_id) values`
        var add_str = []
        for (var i = 0; i < cat.length; i++) {
            add_str.push(`(${id}, ${cat[i]})`)
        }
        return new Promise((resolve, reject) => {
            conn.query(sql + add_str.join(','), (error, res) => {
                if (error) reject(error)
                resolve(res)
            })
        })
    }).then((response) => {
        var sql = 'select * from items where id=?'
        return new Promise((resolve, reject) => {
            conn.query(sql, [id], (error, res) => {
                if (error) reject(error)
                resolve(res)
            })
        })
    }).then((response) => {
        var sql = 'select filename from item_images where item_id=?'
        return new Promise((resolve, reject) => {
            conn.query(sql, [id], (error, images) => {
                if (error) reject(error)
                response[0].images = images
                resolve(response)
            })
        })
    }).then((response) => {
        const cat = category.split(',')
        var sql = `select * from categories where id in (${cat})`
        return new Promise((resolve, reject) => {
            conn.query(sql, [], (error, categories) => {
                if (error) reject(error)
                response[0].categories = categories
                resolve(response)
            })
        })
    }).catch((errLog) => {
        return new Error(errLog)
    })
}

Item.updatedItemImages = (id, data) => {
    var sql = `delete from item_images where item_id=${id};insert into item_images(item_id, filename) values`
    var arr_img = []
    for (var i = 0; i < data.length; i++) {
        arr_img.push(`(${id}, '${data[i].filename}')`)
    }
    return new Promise((resolve, reject) => {
        conn.query(sql + arr_img.join(','), (error, result) => {
            if (error) reject(error)
            resolve(result)
        })
    })
}

Item.deleteItem = (id, restaurant_id) => {
    return new Promise((resolve, reject) => {
        conn.query('delete from item_category where item_id=?;delete from item_images where item_id=?;delete from items where id=? and restaurant_id=?',
            [id, id, id, restaurant_id],
            (err, res, fields) => {
                if (err) reject(err)
                resolve(res)
            })
    })
}

module.exports = Item