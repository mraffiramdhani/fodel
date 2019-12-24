'use strict'

var User = require('../models/user')
const jwt = require('jsonwebtoken'),
    RevToken = require('../models/revoked_token');

module.exports.list_all_users = (req, res) => {
    User.getAllUser((err, result) => {
        console.log('User Controller List all users')
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

module.exports.register_user = (req, res) => {
    var new_user = new User(req.body)
    const { name, username, role_id } = req.body

    if (!new_user.name || !new_user.username || !new_user.password || !new_user.role_id) {
        res.status(400).send({
            error: true,
            message: "Please provide a valid data"
        })
    } else {
        User.createUser(new_user, (err, result) => {
            console.log('User Controller register user')
            if (err) {
                res.send(err)
                console.log('error', err)
                console.log('res', result)
            } else {
                const token = jwt.sign({ name, username, role_id }, process.env.APP_KEY)
                var put_token = new RevToken({ token })
                RevToken.putToken(put_token, (err, result) => {
                    if (err) {
                        res.send(err)
                        console.log('error', err)
                        console.log('res', result)
                    } else {
                        res.send({
                            success: true,
                            result,
                            token
                        })
                    }
                })
            }
        })
    }
}