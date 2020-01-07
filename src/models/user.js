'use strict'
const conn = require('../dbconfig')
const bcrypt = require('bcryptjs')

var User = function User(user) {
    this.name = user.name
    this.username = user.username
    this.password = user.password
    this.role_id = user.role_id
    this.created_at = new Date()
    this.updated_at = new Date()
}

User.getAllUser = (userId) => {
    return new Promise((resolve, reject) => {
        conn.query('select * from users where id != ?', [userId], (err, res, fields) => {
            if (err) reject(err)
            resolve(res)
        })
    })
}

User.getUserById = (id) => {
    return new Promise((resolve, reject) => {
        conn.query('select * from users where id=?', id, (err, res, fields) => {
            if (err) reject(err)
            resolve(res)
        })
    })
}

User.getUserByUsername = (username) => {
    return new Promise((resolve, reject) => {
        conn.query('select * from users where username=?', username, (err, res, fields) => {
            if (err) reject(err)
            resolve(res)
        })
    })
}

User.getUserByRole = (role_id) => {
    return new Promise((resolve, reject) => {
        conn.query('select * from users where role_id=?', role_id, (err, res) => {
            if (err) reject(err)
            resolve(res)
        })
    })
}

User.createUser = (newUser) => {
    const { name, username, password, role_id, created_at, updated_at } = newUser
    const encPass = bcrypt.hashSync(password)
    return new Promise((resolve, reject) => {
        conn.query(
            'INSERT INTO users(name, username, password, role_id, created_at, updated_at) VALUES(?,?,?,?,?,?)',
            [name, username, encPass, role_id, created_at, updated_at],
            (err, res, fields) => {
                if (err) reject(err)
                resolve(res)
            })
    })
}

User.updateUser = (id, user) => {
    if (user.password) {
        const encPass = bcrypt.hashSync(user.password)
        user.password = encPass
    }
    return new Promise((resolve, reject) => {
        conn.query('update users set ? where id=?',
            [user, id],
            (err, res) => {
                if (err) reject(err)
                resolve(res)
            })
    })
}

User.deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        conn.query('delete from users where id=?', id, (err, res) => {
            if (err) reject(err)
            resolve(res)
        })
    })
}

module.exports = User