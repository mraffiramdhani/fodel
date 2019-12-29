'use strict'

var Review = require('../models/review')

//working as intended
module.exports.list_item_review = async (req, res) => {
    const { id } = req.params
    await Review.getItemReview(id).then((data) => {
        res.send({ status: 200, success: true, message: "Data Found", data })
    })
}

//working as intended
module.exports.list_user_review = async (req, res) => {
    const { id } = req.headers.auth_token
    await Review.getUserReview(id).then((data) => {
        res.send({ status: 200, success: true, message: "Data Found", data })
    })
}

// working as intended
module.exports.add_item_review = async (req, res) => {
    const { rating, review } = req.body
    const { id } = req.headers.auth_token
    const item_id = req.params.id
    await Review.createItemReview(id, new Review({ rating, review, item_id })).then(async (result) => {
        await Review.getItemReview(item_id).then((data) => {
            res.send({ status: 200, success: true, message: "Item Review Added Successfuly.", data })
        })
    })
}

// working as intended
module.exports.update_item_review = async (req, res) => {
    const { id } = req.params
    const userId = req.headers.auth_token.id
    await Review.updateItemReview(id, new Review(req.body), userId).then(async (result) => {
        await Review.getReviewById(id).then((data) => {
            res.send({ status: 200, success: true, message: "Item Review Updated Successfuly.", data })
        })
    }).catch((error) => {
        console.log(error)
        res.end(error)
    })
}

//working as intended
module.exports.delete_item_review = async (req, res) => {
    const { id } = req.params
    await Review.deleteItemReview(id).then((result) => {
        res.send({ status: 200, success: true, message: "Item Review Removed Successfuly.", data: {} })
    })
}