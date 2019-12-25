'use strict'

const conn = require('../dbconfig')

var Review = function Review(data) {
    this.rating = data.rating
    this.review = data.review
    this.item_id = data.item_id
    this.created_at = new Date()
    this.updated_at = new Date()
}

Review.getItemReview = (itemId, result) => {
    conn.query('select * from reviews where item_id=?',
        [itemId], (err, res) => {
            if (err) {
                console.log('error: ', err)
                result(null, err)
            } else {
                console.log('data:', res)
                result(null, res)
            }
        })
}

Review.getUserReview = (userId, result) => {
    conn.query('select * from reviews where user_id=?',
        [userId], (err, res) => {
            if (err) {
                console.log('error: ', err)
                result(null, err)
            } else {
                console.log('data:', res)
                result(null, res)
            }
        })
}

Review.createItemReview = (userId, newReview, result) => {
    const { rating, review, item_id, created_at, updated_at } = newReview
    conn.query('insert into reviews(rating, review, item_id, user_id, created_at, updated_at) values(?,?,?,?,?,?)',
        [rating, review, item_id, userId, created_at, updated_at],
        (err, res) => {
            if (err) {
                console.log('error: ', err)
                result(null, err)
            } else {
                console.log('data:', res)
                result(null, res)
            }
        })
}

Review.updateItemReview = (id, rev, result) => {
    const { rating, review, updated_at } = rev
    conn.query('update reviews set rating=?, review=?, updated_at=? where id=?',
        [rating, review, updated_at, id],
        (err, res) => {
            if (err) {
                console.log('error: ', err)
                result(null, err)
            } else {
                console.log('data:', res)
                result(null, res)
            }
        })
}

Review.deleteItemReview = (id, result) => {
    conn.query('delete from reviews where id=?', [id],
        (err, res) => {
            if (err) {
                console.log('error: ', err)
                result(null, err)
            } else {
                console.log('data:', res)
                result(null, res)
            }
        })
}

module.exports = Review