'use strict'

var Category = require('../models/category')

module.exports.list_all_category = async (req, res) => {
    const data = await Category.getAllCategories()
    res.send({
        status: true,
        data
    })
}

module.exports.create_category = async (req, res) => {
    var new_category = new Category(req.body)

    if (!new_category.name) {
        res.status(400).send({
            error: true,
            message: "Please provide a valid data"
        })
    } else {
        const data = await Category.createCategory(new_category)
        res.send({
            status: true,
            data
        })
    }
}

module.exports.update_category = async (req, res) => {
    const { id } = req.params

    const data = await Category.updateCategory(id, new Category(req.body))
    res.send({
        status: true,
        data
    })
}

module.exports.delete_category = async (req, res) => {
    const { id } = req.params

    const data = await Category.deleteCategory(id)
    res.send({
        status: true,
        data
    })
}