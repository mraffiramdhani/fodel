'use strict'

const conn = require('../dbconfig')


var Restaurant = function Restaurant(data) {
    this.name = data.name
    this.logo = null // for test only
    this.longitude = data.longitude
    this.latitude = data.latitude
    this.description = data.description
    this.user_id = data.user_id
    this.created_at = new Date()
    this.updated_at = new Date()
}

Restaurant.getAllRestaurant = (result) => {
    conn.query('select * from restaurants', (err, res, fields) => {
        if (err) {
            console.log('error: ', err)
            result(null, err)
        } else {
            console.log('data:', res)
            result(null, res)
        }
    })
}

Restaurant.getRestaurantById = (id, result) => {
    conn.query('select * from restaurants where id=?', id, (err, res, fields) => {
        if (err) {
            console.log('error: ', err)
            result(null, err)
        } else {
            console.log('data:', res)
            result(null, res)
        }
    })
}

Restaurant.createRestaurant = (newData, result) => {
    const { name, logo, longitude, latitude, description, user_id, created_at, updated_at } = newData
    conn.query(
        'INSERT INTO restaurants(name, logo, longitude, latitude, description, user_id, created_at, updated_at) VALUES(?,?,?,?,?,?,?,?)',
        [name, logo, longitude, latitude, description, user_id, created_at, updated_at],
        (err, res, fields) => {
            if (err) {
                console.log('error: ', err)
                result(null, err)
            } else {
                console.log('data:', res)
                result(null, res)
            }
        })
}

Restaurant.updateRestaurant = (id, data, result) => {
    const { name, logo, longitude, latitude, description, user_id, updated_at } = data
    conn.query('update restaurants set name=?, logo=?, longitude=?, latitude=?, description=?, user_id=?, updated_at=? where id=?',
        [name, logo, longitude, latitude, description, user_id, updated_at, id],
        (err, res, fields) => {
            if (err) {
                console.log('error: ', err)
                result(null, err)
            } else {
                console.log('data:', res)
                result(null, res)
            }
        })
}

Restaurant.deleteRestaurant = (id, result) => {
    conn.query('delete from restaurants where id=?', id, (err, res, fields) => {
        if (err) {
            console.log('error: ', err)
            result(null, err)
        } else {
            console.log('data:', res)
            result(null, res)
        }
    })
}

module.exports = Restaurant