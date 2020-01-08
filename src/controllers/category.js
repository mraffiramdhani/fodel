'use strict'

const Category = require('../models/category'),
    redis = require('../redis'),
    { response } = require('../helper/response');

module.exports.list_all_category = (req, res) => {
    return redis.get('all_cat', async (ex, result) => {
        if (result) {
            const resultJSON = JSON.parse(result);
            return response(res, 200, true, "Data Found - Redis Cache", resultJSON)
        } else {
            const data = await Category.getAllCategories()
            if (data) {
                redis.setex('all_cat', 10, JSON.stringify(data))
                return response(res, 200, true, "Data Found - Database Query", data)
            } else {
                return response(res, 200, false, "Data not Found")
            }
        }
    })
}

module.exports.get_category_by_id = async (req, res) => {
    const { id } = req.params
    const data = await Category.getCategoryById(id)
    if (data) {
        return response(res, 200, true, "Data Found", data[0])
    } else {
        return response(res, 200, false, "Data not Found")
    }
}

module.exports.create_category = async (req, res) => {
    var new_category = new Category(req.body)

    if (!new_category.name) {
        return response(res, 200, false, "Please provide a valid data.")
    } else {
        await Category.createCategory(new_category).then(async (data) => {
            await Category.getCategoryById(data.insertId).then((data) => {
                return response(res, 200, true, "Category Created Successfully.", data[0])
            }).catch((error) => {
                return response(res, 200, false, "Error.", error)
            })
        }).catch((error) => {
            return response(res, 200, false, "Error.", error)
        })
    }
}

module.exports.update_category = async (req, res) => {
    const { id } = req.params

    await Category.updateCategory(id, new Category(req.body)).then(async (data) => {
        if (data.affectedRows === 0) {
            return response(res, 200, false, "Data not Found")
        } else {
            await Category.getCategoryById(id).then((data) => {
                return response(res, 200, true, "Category Updated Successfully.", data[0])
            }).catch((error) => {
                return response(res, 200, false, "Error.", error)
            })
        }
    }).catch((error) => {
        return response(res, 200, false, "Error.", error)
    })
}

module.exports.delete_category = async (req, res) => {
    const { id } = req.params

    await Category.deleteCategory(id).then(async (data) => {
        if (data.affectedRows === 0) {
            return response(res, 200, false, "Data not Found.")
        } else {
            return response(res, 200, true, "Category Deleted Successfully.")
        }
    })
}