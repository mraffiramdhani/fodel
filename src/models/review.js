'use strict'

const conn = require('../dbconfig')

var Review = function Review(data) {
    this.rating = data.rating
    this.review = data.review
    this.item_id = data.item_id
    this.created_at = new Date()
    this.updated_at = new Date()
}

Review.getItemReview = (itemId) => {
    return new Promise((resolve, reject) => {
        conn.query('select * from reviews where item_id=?',
            [itemId], (err, res) => {
                if (err) reject(err)
                resolve(res)
            })
    })
}

Review.getUserReview = (userId) => {
    return new Promise((resolve, reject) => {
        conn.query('select * from reviews where user_id=?',
            [userId], (err, res) => {
                if (err) reject(err)
                resolve(res)
            })
    })
}

Review.getReviewById = (id) => {
    return new Promise((resolve, reject) => {
        conn.query('select * from reviews where id=?', [id], (err, res) => {
            if (err) reject(err)
            resolve(res)
        })
    })
}

Review.createItemReview = (userId, newReview) => {
    const { rating, review, item_id, created_at, updated_at } = newReview
    return new Promise((resolve, reject) => {
        conn.query('insert into reviews(rating, review, item_id, user_id, created_at, updated_at) values(?,?,?,?,?,?)',
            [rating, review, item_id, userId, created_at, updated_at],
            (err, res) => {
                if (err) reject(err)
                resolve(res)
            })
    })
}

Review.updateItemReview = (id, rev) => {
    const { rating, review, updated_at } = rev
    return new Promise((resolve, reject) => {
        conn.query('update reviews set rating=?, review=?, updated_at=? where id=?',
            [rating, review, updated_at, id],
            (err, res) => {
                if (err) reject(err)
                resolve(res)
            })
    })
}

Review.deleteItemReview = (id) => {
    return new Promise((resolve, reject) => {
        conn.query('delete from reviews where id=?', [id],
            (err, res) => {
                if (err) reject(err)
                resolve(res)
            })
    })
}

module.exports = Review