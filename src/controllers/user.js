'use strict'

require('dotenv').config()
var User = require('../models/user')
const jwt = require('jsonwebtoken'),
    bcrypt = require('bcryptjs'),
    redis = require('../redis'),
    RevToken = require('../models/revoked_token');

// working as intended
module.exports.list_all_users = async (req, res) => {
    const { id } = req.auth
    return redis.get('index_user', async (ex, data) => {
        if (data) {
            const resultJSON = JSON.parse(data);
            return res.status(200).send({
                status: 200,
                success: true,
                message: 'Data Found',
                dataSource: 'Redis Cache',
                data: resultJSON
            });
        } else {
            const data = await User.getAllUser(id)
            redis.setex('index_user', 600, JSON.stringify(data))
            return res.status(200).send({ status: 200, success: true, message: 'Data Found', dataSource: 'Database Query', data })
        }
    })
}

module.exports.get_user_by_id = async (req, res) => {
    const { id } = req.params
    const data = await User.getUserById(id)
    return res.status(200).send({ status: 200, success: true, message: "Data Found", data })
}

//working as intended
module.exports.register_user = async (req, res) => {
    const { name, username, password } = req.body
    const role_id = 3 //assuming that new registered user are all customer
    var new_user = new User({ name, username, password, role_id })

    if (!new_user.name || !new_user.username || !new_user.password) {
        res.status(400).send({
            error: true,
            message: "Please provide a valid data."
        })
    } else {
        await User.createUser(new_user).then((result) => {
            const token = jwt.sign({ name, username, role_id }, process.env.APP_KEY)
            var put_token = new RevToken({ token })
            RevToken.putToken(put_token, (err, data) => {
                if (err) {
                    res.send(err)
                    console.log('error', err)
                    console.log('res', data)
                } else {
                    res.send({
                        status: 200,
                        success: true,
                        message: "User Registered Successfuly.",
                        data: {},
                        token
                    })
                }
            })
        }).catch((error) => {
            console.log(error)
            res.send({
                success: false,
                error
            })
        })
    }
}

module.exports.check_token = async (req, res) => {
    const { token } = req.body
    await RevToken.isRevoked(token).then((result) => {
        const auth_data = jwt.verify(token, process.env.APP_KEY)
        if (result.length === 0) {
            if (auth_data.role_id === 1) {
                res.status(200).send({
                    success: true,
                    role: 'administrator',
                    name: auth_data.name
                })
            } else if (auth_data.role_id === 2) {
                res.status(200).send({
                    success: true,
                    role: 'restaurant',
                    name: auth_data.name
                })
            } else if (auth_data.role_id === 3) {
                res.status(200).send({
                    success: false,
                    message: "You Don't Have The Right User Privileges To Access The Content."
                })
            }
        } else {
            res.status(200).send({
                success: false,
                message: "Session Expired. Please Log In Again."
            })
        }
    })
}

module.exports.login_user = async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        res.status(400).send({
            error: true,
            message: "Please provide a valid data"
        })
    } else {
        const user = await User.getUserByUsername(username)
        if (user.length > 0) {
            console.log('User Controller login user - username verified')
            if (bcrypt.compareSync(password, user[0].password)) {
                console.log('User Controller login user - password verified')
                const { id, name, role_id } = user[0]
                const token = jwt.sign({ id, name, username, role_id }, process.env.APP_KEY)
                var put_token = new RevToken({ token })
                RevToken.putToken(put_token, (err, result) => {
                    if (err) {
                        res.send(err)
                    } else {
                        res.send({
                            status: 200,
                            success: true,
                            message: "User Logged In Successfuly.",
                            token
                        })
                    }
                })
            } else {
                res.send({
                    success: false,
                    message: 'Invalid Password.'
                })
            }
        } else {
            res.send({
                success: false,
                message: 'User not found.'
            })
        }
    }
}

//working as intended
module.exports.create_user = async (req, res) => {
    var new_user = new User(req.body)

    if (!new_user.name || !new_user.username || !new_user.password || !new_user.role_id) {
        res.status(400).send({
            error: true,
            message: "Please provide a valid data"
        })
    } else {
        await User.createUser(new_user).then(async (result) => {
            await User.getUserById(result.insertId).then((data) => {
                res.send({ status: 200, success: true, message: "User Created Successfuly.", data: { requests: data } })
            })
        }).catch((error) => {
            console.log(error)
            res.send({
                success: false,
                error
            })
        })
    }
}

//working as intended
module.exports.update_user = async (req, res) => {
    var new_user = new User(req.body)
    const { id } = req.params

    if (!new_user.name || !new_user.username || !new_user.role_id) {
        res.status(400).send({
            error: true,
            message: "Please provide a valid data"
        })
    } else {
        await User.updateUser(id, new_user).then(async (result) => {
            await User.getUserById(id).then((data) => {
                res.send({ status: 200, success: true, message: "User Updated Successfuly.", data: { requests: data } })
            })
        })
    }
}

module.exports.delete_user = async (req, res) => {
    const { id } = req.params
    await User.deleteUser(id).then((result) => {
        res.send({
            status: 200,
            success: true,
            message: "User Removed Successfuly.",
            data: {}
        })
    }).catch((error) => {
        console.log(error)
        res.send({
            success: false,
            error
        })
    })
}

module.exports.logout_user = (req, res) => {
    RevToken.revokeToken(req.headers['jwt_token'],
        (err, result, fields) => {
            if (err) {
                res.send({
                    success: false,
                    message: err
                })
            } else {
                res.send({
                    status: 200,
                    success: true,
                    message: "User Logged Out Successfuly",
                    data: {}
                })
            }
        }
    )
}