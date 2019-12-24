'use strict'

var Category = require('../models/category')

module.exports.list_all_category = (req, res) => {
    Category.getAllCategories((err, result, fields) => {
        console.log('Category Controller Category index')
        if (err) {
            res.send(err)
            console.log('error', err)
            console.log('res', result)
        } else {
            res.send({
                success: true,
                result
            })
        }
    })
}

module.exports.create_category = (req, res) => {
    var new_category = new Category(req.body)

    if (!new_category.name) {
        res.status(400).send({
            error: true,
            message: "Please provide a valid data"
        })
    } else {
        Category.createCategory(new_category, (err, result) => {
            console.log('Category Controller create category')
            if (err) {
                res.send(err)
                console.log('error', err)
                console.log('res', result)
            } else {
                res.send({
                    success: true,
                    result
                })
            }
        })
    }
}

module.exports.update_category = (req, res) => {
    const cat_id = req.params.id
    Category.updateCategory(cat_id, req.body.name, (err, result, fields) => {
        console.log('Category Controller update category')
        if (err) {
            res.send(err)
            console.log('error', err)
            console.log('res', result)
        } else {
            res.send({
                success: true,
                result
            })
        }
    })
}

module.exports.delete_category = (req, res) => {
    const cat_id = req.params.id
    Category.deleteCategory(id, (err, result, fields) => {
        console.log('Category Controller update category')
        if (err) {
            res.send(err)
            console.log('error', err)
            console.log('res', result)
        } else {
            res.send({
                success: true,
                result
            })
        }
    })
}