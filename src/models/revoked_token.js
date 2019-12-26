'use strict'
const conn = require('../dbconfig')

var RevToken = function RevToken(data) {
    this.token = data.token
    this.is_revoked = 0
    this.created_at = new Date()
}

RevToken.putToken = (str_token) => {
    const { token, is_revoked, created_at } = str_token
    return new Promise((resolve, reject) => {
        conn.query('insert into revoked_token(token, is_revoked, created_at) values(?,?,?)',
            [token, is_revoked, created_at],
            (err, res, fields) => {
                if (err) reject(err)
                resolve(res)
            })
    })
}

RevToken.revokeToken = (str_token) => {
    return new Promise((resolve, reject) => {
        conn.query('update revoked_token set is_revoked=1 where token=?',
            str_token,
            (err, res, fields) => {
                if (err) reject(err)
                resolve(res)
            })
    })
}

module.exports = RevToken