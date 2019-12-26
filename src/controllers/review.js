'use strict'

var Review = require('../models/review')

module.exports.list_item_review = (req, res) => {
    const { id } = req.params
    Review.getItemReview(id, (err, result) => {
        console.log('Review Controller item review index')
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

module.exports.list_user_review = (req, res) => {
    const { id } = req.headers.auth_token
    Review.getUserReview(id, (err, result) => {
        console.log('Review Controller user review index')
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

module.exports.add_item_review = (req, res) => {
    const { rating, review } = req.body
    const { id } = req.headers.auth_token
    const item_id = req.params.id
    Review.createItemReview(id, new Review({ rating, review, item_id }), (err, result) => {
        console.log('Review Controller add review to item')
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

module.exports.update_item_review = (req, res) => {
    const { id } = req.params
    Review.updateItemReview(id, new Review(req.body), (err, result) => {
        console.log('Review Controller update item review')
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

module.exports.delete_item_review = (req, res) => {
    const { id } = req.params
    Review.deleteItemReview(id, (err, result) => {
        console.log('Review Controller delete item review')
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