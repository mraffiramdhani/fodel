'use strict'
const conn = require('../dbconfig')

var Category = function Category(category) {
    this.name = category.name
}

Category.getCategoryCount = (search, sort) => {
    var sql = 'select count(*) as cCount from categories'
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

Category.getAllCategories = (search, sort, limit) => {
    var sql = 'select * from categories'
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
    })
}

Category.getCategoryById = (id) => {
    return new Promise((resolve, reject) => {
        conn.query('select * from categories where id = ?', [id], (err, res) => {
            if (err) reject(err)
            resolve(res)
        })
    })
}

Category.createCategory = (newCat) => {
    const { name } = newCat

    return new Promise((resolve, reject) => {
        conn.query('insert into categories set name=?', name, (err, res, fields) => {
            if (err) reject(err)
            resolve(res)
        })
    })
}

Category.updateCategory = (id, updCat) => {
    const { name } = updCat

    return new Promise((resolve, reject) => {
        conn.query('update categories set name=? where id=?', [name, id], (err, res, fields) => {
            if (err) reject(err)
            resolve(res)
        })
    })
}

Category.deleteCategory = (id) => {
    return new Promise((resolve, reject) => {
        conn.query('delete from categories where id=?', id, (err, res, fields) => {
            if (err) reject(err)
            resolve(res)
        })
    })
}

module.exports = Category