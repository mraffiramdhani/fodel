'use strict'

const Category = require('../models/category'),
    redis = require('../redis');

module.exports.list_all_category = (req, res) => {
    return redis.get('all_cat', async (ex, result) => {
        if (result) {
            const resultJSON = JSON.parse(result);
            return res.status(200).json(resultJSON);
        } else {
            const data = await Category.getAllCategories()
            redis.setex('all_cat', 30, JSON.stringify({ status: 200, success: true, message: "Data Found", source: 'Redis Cache', data }))
            return res.status(200).json({ status: 200, success: true, message: "Data Found", source: 'Database query', data })
        }
    })
}

module.exports.get_category_by_id = async (req, res) => {
	const {id} = req.params
	const data = await Category.getCategoryById(id)
	return res.status(200).json({status:200,success:true,message:"Data Found",data})
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
        await Category.createCategory(new_category).then(async () => {
            await Category.getAllCategories().then((data) => {
                res.send({
                    status: 200,
                    success: true,
                    message: "Category Created Successfuly.",
                    data
                })
            })
        })
    }
}

//working as intended
module.exports.update_category = async (req, res) => {
    const { id } = req.params

    await Category.updateCategory(id, new Category(req.body)).then(async () => {
        await Category.getAllCategories().then((data) => {
            res.send({
                status: 200,
                success: true,
                message: "Category Updated Successfuly.",
                data
            })
        })
    })
}

// working as intended
module.exports.delete_category = async (req, res) => {
    const { id } = req.params

    await Category.deleteCategory(id).then(async () => {
        await Category.getAllCategories().then((data) => {
            res.send({
                status: 200,
                success: true,
                message: "Category Removed Successfuly.",
                data
            })
        })
    })
}