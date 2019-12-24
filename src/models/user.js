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

User.getAllUser = (result) => {
    conn.query('select * from users', (err, res, fields) => {
        if (err) {
            console.log('error: ', err)
            result(null, err)
        } else {
            console.log('users:', res)
            result(null, res)
        }
    })
}

User.getUserById = (userId, result) => {
    conn.query('select * from users where id=?', userId, (err, res, fields) => {
        if (err) {
            console.log('error: ', err)
            result(null, err)
        } else {
            console.log('users:', res)
            result(null, res)
        }
    })
}

User.createUser = (newUser, result) => {
    const { name, username, password, role_id, created_at, updated_at } = newUser
    const encPass = bcrypt.hashSync(password)
    conn.query(
        'INSERT INTO users(name, username, password, role_id, created_at, updated_at) VALUES(?,?,?,?,?,?)',
        [name, username, encPass, role_id, created_at, updated_at],
        (err, res, fields) => {
            if (err) {
                console.log('error: ', err)
                result(null, err)
            } else {
                console.log('users:', res)
                result(null, res)
            }
        })
}

User.updateById = (id, user, result) => {
    conn.query('update users set name=?, username=?, password=?, role_id=?, updated_at=? where id=?',
        [id, user],
        (req, res) => {
            if (err) {
                console.log('error: ', err)
                result(null, err)
            } else {
                console.log('users:', res)
                result(null, res)
            }
        })
}

User.deleteUser = (id, result) => {
    conn.query('delete from users where id=?', id, (req, res) => {
        if (err) {
            console.log('error: ', err)
            result(null, err)
        } else {
            console.log('users:', res)
            result(null, res)
        }
    })
}

module.exports = User