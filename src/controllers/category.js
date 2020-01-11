'use strict'

const Category = require('../models/category'),
    redis = require('../redis'),
    { response } = require('../helper/response');

module.exports.list_all_category = async (req, res) => {
    const { search, sort } = req.query
    var numRows
    var numPerPage = parseInt(req.query.perPage, 10) || 10
    var page = parseInt(req.query.page) || 1
    var numPages
    var skip = (page - 1) * numPerPage
    var pageLinks = ''
    var limit = skip + ',' + numPerPage
    var redisKey = `index_category_page:${page}_limit:${limit}`
    if (search) {
        var arr = []
        Object.keys(search).map((key, index) => {
            arr.push(`search[${key}]=${search[key]}`)
        })
        pageLinks += arr.join('&') + '&'
        redisKey += arr.join('_')
    }
    if (sort) {
        Object.keys(sort).map((key, index) => {
            pageLinks += `sort[${key}]=${sort[key]}&`
        })
    }
    await Category.getCategoryCount(search, sort).then((count) => {
        numRows = count[0].cCount
        numPages = Math.ceil(numRows / numPerPage)
    }).catch((error) => {
        return response(res, 200, false, "Error.", error)
    })
    return redis.get(redisKey, async (ex, result) => {
        if (result) {
            const resultJSON = JSON.parse(result);
            return response(res, 200, true, "Data Found - Redis Cache", resultJSON)
        } else {
            const categories = await Category.getAllCategories(search, sort, limit)
            if (categories) {
                var result = {
                    categories
                }
                if (page <= numPages) {
                    result.pagination = {
                        current: page,
                        perPage: numPerPage,
                        prev: page > 1 ? page - 1 : undefined,
                        next: page < numPages ? page + 1 : undefined,
                        prevLink: page > 1 ? encodeURI(pageLinks.concat(`page=${page - 1}&perPage=${numPerPage}`)) : undefined,
                        nextLink: page < numPages ? encodeURI(pageLinks.concat(`page=${page + 1}&perPage=${numPerPage}`)) : undefined
                    }
                } else result.pagination = {
                    err: 'queried page ' + page + ' is >= to maximum page number ' + numPages
                }
                redis.setex(redisKey, 10, JSON.stringify(result))
                return response(res, 200, true, "Data Found - Database Query", result)
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