'use strict'
const conn = require('../dbconfig')

var Category = function Category(category) {
    this.name = category.name
}

Category.getAllCategories = () => {
    return new Promise((resolve, reject) => {
        conn.query('select * from categories', (err, res, fields) => {
            if (err) reject(err)
            resolve({ requests: res })
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