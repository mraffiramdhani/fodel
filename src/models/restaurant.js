'use strict'

const conn = require('../dbconfig')


var Restaurant = function Restaurant(data) {
    this.name = data.name
    this.logo = data.image
    this.longitude = data.longitude
    this.latitude = data.latitude
    this.description = data.description
    this.user_id = data.user_id
    this.created_at = new Date()
    this.updated_at = new Date()
}

Restaurant.getAllRestaurant = () => {
    return new Promise((resolve, reject) => {
        conn.query('select * from restaurants', (err, res, fields) => {
            if (err) reject(err)
            resolve(res)
        })
    })
}

Restaurant.getRestaurantById = (id) => {
    return new Promise((resolve, reject) => {
        conn.query('select * from restaurants where id=?', id, (err, res, fields) => {
            if (err) reject(err)
            resolve(res)
        })
    })
}

Restaurant.getRestaurantByUser = (userId) => {
    return new Promise((resolve, reject) => {
        conn.query('select * from restaurants where user_id=?', [userId], (err, res) => {
            if (err) reject(err)
            resolve(res)
        })
    })
}

Restaurant.createRestaurant = (newData) => {
    const { name, logo, longitude, latitude, description, user_id } = newData
    return new Promise((resolve, reject) => {
        conn.query(
            'INSERT INTO restaurants(name, logo, longitude, latitude, description, user_id) VALUES(?,?,?,?,?,?)',
            [name, logo, longitude, latitude, description, user_id],
            (err, res, fields) => {
                if (err) reject(err)
                resolve(res)
            })
    })
}

Restaurant.updateRestaurant = (id, data) => {
    return new Promise((resolve, reject) => {
        conn.query('update restaurants set ? where id=?',
            [data, id],
            (err, res, fields) => {
                if (err) reject(err)
                resolve(res)
            })
    })
}

Restaurant.deleteRestaurant = (id) => {
    return new Promise((resolve, reject) => {
        conn.query('delete from restaurants where id=?', id, (err, res, fields) => {
            if (err) reject(err)
            resolve(res)
        })
    })
}

module.exports = Restaurant