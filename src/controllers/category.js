'use strict'

const Category = require('../models/category'),
    redis = require('../redis');

// working as intended
module.exports.list_all_category = (req, res) => {
    return redis.get('all_cat', async (ex, result) => {
        if (result) {
            const resultJSON = JSON.parse(result);
            return res.status(200).json(resultJSON);
        } else {
            const newData = await Category.getAllCategories()
            redis.setex('all_cat', 600, JSON.stringify({ status: 200, message: "OK", source: 'Redis Cache', data: newData, }))
            return res.status(200).json({ status: 200, message: "OK", source: 'Database query', data: newData, })
        }
    })
}

// working as intended
module.exports.create_category = async (req, res) => {
    var new_category = new Category(req.body)

    if (!new_category.name) {
        res.status(400).send({
            error: true,
            message: "Please provide a valid data"
        })
    } else {
        const result = await Category.createCategory(new_category)
        result.categories = await Category.getAllCategories()
        res.send({
            status: 200,
            message: "OK",
            result
        })
    }
}

//working as intended
module.exports.update_category = async (req, res) => {
    const { id } = req.params

    const result = await Category.updateCategory(id, new Category(req.body))
    const data = await Category.getAllCategories()
    res.send({
        status: 200,
        message: "OK",
        success: true,
        result,
        data
    })
}

// working as intended
module.exports.delete_category = async (req, res) => {
    const { id } = req.params

    const response = await Category.deleteCategory(id)
    const data = await Category.getAllCategories()
    res.send({
        status: true,
        response,
        data
    })
}