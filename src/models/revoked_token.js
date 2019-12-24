'use strict'
const conn = require('../dbconfig')

var RevToken = function RevToken(data) {
    this.token = data.token
    this.is_revoked = 0
    this.created_at = new Date()
}

// RevToken.getRevokedToken = (token, result) => {
//     conn.query('select token from revoked_token where token=? and is_revoked=1', [token], (err, res, fields) => {
//         if (err) {
//             console.log('error: ', err)
//             result(null, err)
//         } else {
//             console.log('token', res)
//             result(null, res)
//         }
//     })
// }

RevToken.putToken = (str_token, result) => {
    const { token, is_revoked, created_at } = str_token
    conn.query('insert into revoked_token(token, is_revoked, created_at) values(?,?,?)',
        [token, is_revoked, created_at],
        (err, res, fields) => {
            if (err) {
                console.log('error: ', err)
                result(null, err)
            } else {
                console.log('token', res)
                result(null, res)
            }
        })
}

RevToken.revokeToken = (str_token, result) => {
    conn.query('update revoked_token set is_revoked=1 where token=?',
        str_token,
        (err, res, fields) => {
            if (err) {
                console.log('error: ', err)
                result(null, err)
            } else {
                console.log('token', res)
                result(null, res)
            }
        })
}

module.exports = RevToken