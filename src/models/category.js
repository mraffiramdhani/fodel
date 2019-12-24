'use strict'
const conn = require('../dbconfig')

var Category = function Category(category) {
    this.name = category.name
}

Category.getAllCategories = (result) => {
    conn.query('select * from categories', (err, res, fields) => {
        if (err) {
            console.log('error: ', err)
            result(null, err)
        } else {
            console.log('data:', res)
            result(null, res)
        }
    })
}

Category.createCategory = (newCat, result) => {
    const { name } = newCat
    conn.query('insert into categories set name=?', name, (err, res, fields) => {
        if (err) {
            console.log('error: ', err)
            result(null, err)
        } else {
            console.log('data:', res)
            result(null, res)
        }
    })
}

Category.updateCategory = (id, updCat, result) => {
    const { name } = updCat
    conn.query('update categories set name=? where id=?', [name, id], (err, res, fields) => {
        if (err) {
            console.log('error: ', err)
            result(null, err)
        } else {
            console.log('data:', res)
            result(null, res)
        }
    })
}

Category.deleteCategory = (id, result) => {
    conn.query('delete from categories where id=?', id, (err, res, fields) => {
        if (err) {
            console.log('error: ', err)
            result(null, err)
        } else {
            console.log('data:', res)
            result(null, res)
        }
    })
}

module.exports = Category