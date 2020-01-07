'use strict'

require('dotenv').config()
var User = require('../models/user')
const jwt = require('jsonwebtoken'),
    bcrypt = require('bcryptjs'),
    redis = require('../redis'),
    RevToken = require('../models/revoked_token'),
    { response } = require('../helper/response');

module.exports.list_all_users = async (req, res) => {
    const { id } = req.auth
    return redis.get('index_user', async (ex, data) => {
        if (data) {
            const resultJSON = JSON.parse(data);
            return response(res, 200, true, "Data Found - Redis Cache", resultJSON)
        } else {
            const data = await User.getAllUser(id)
            redis.setex('index_user', 60, JSON.stringify(data))
            return response(res, 200, true, "Data Found - Database Query", data)
        }
    })
}

module.exports.get_user_by_id = async (req, res) => {
    const { id } = req.params
    const data = await User.getUserById(id)
    return response(res, 200, true, "Data Found", data)
}

module.exports.register_user = async (req, res) => {
    const { name, username, password } = req.body
    const role_id = 3
    var new_user = new User({ name, username, password, role_id })

    if (!new_user.name || !new_user.username || !new_user.password) {
        response(res, 200, false, "Please provide a valid data.")
    } else {
        await User.createUser(new_user).then((result) => {
            const token = jwt.sign({ name, username, role_id }, process.env.APP_KEY)
            var put_token = new RevToken({ token })
            RevToken.putToken(put_token, (err, data) => {
                if (err) {
                    response(res, 200, false, "Error", err)
                } else {
                    response(res, 200, true, "User Created Successfully.", { token })
                }
            })
        }).catch((error) => {
            response(res, 200, false, "Error.")
        })
    }
}

module.exports.check_token = async (req, res) => {
    const { token } = req.body
    await RevToken.isRevoked(token).then((result) => {
        const auth_data = jwt.verify(token, process.env.APP_KEY)
        if (result.length === 0) {
            if (auth_data.role_id === 1) {
                response(res, 200, true, "Authorization Success.", {
                    role: 'administrator',
                    name: auth_data.name
                })
            } else if (auth_data.role_id === 2) {
                response(res, 200, true, "Authorization Success.", {
                    role: 'restaurant',
                    name: auth_data.name
                })
            } else if (auth_data.role_id === 3) {
                response(res, 200, false, "You Don't Have The Right User Privileges To Access The Content.")
            }
        } else {
            response(res, 200, false, "Session Expired. Please Log In Again.")
        }
    }).catch((error) => {
        response(res, 200, false, "Error.", error)
    })
}

module.exports.login_user = async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        response(res, 200, false, "Please provide a valid data.")
    } else {
        const user = await User.getUserByUsername(username)
        if (user.length > 0) {
            if (bcrypt.compareSync(password, user[0].password)) {
                const { id, name, role_id } = user[0]
                const token = jwt.sign({ id, name, username, role_id }, process.env.APP_KEY)
                var put_token = new RevToken({ token })
                RevToken.putToken(put_token, (err, result) => {
                    if (err) {
                        response(res, 200, false, "Error.", err)
                    } else {
                        response(res, 200, true, "User Logged In Successfully.", {
                            token
                        })
                    }
                })
            } else {
                response(res, 200, false, "Invalid Password.")
            }
        } else {
            response(res, 200, false, "User Not Found.")
        }
    }
}

module.exports.create_user = async (req, res) => {
    var new_user = new User(req.body)

    if (!new_user.name || !new_user.username || !new_user.password || !new_user.role_id) {
        response(res, 200, false, "Please provide a valid data.")
    } else {
        await User.createUser(new_user).then(async (result) => {
            await User.getUserById(result.insertId).then((data) => {
                response(res, 200, true, "User Created Successfully.", data)
            }).catch((error) => {
                response(res, 200, false, "Error.", error)
            })
        }).catch((error) => {
            response(res, 200, false, "Error.", err)
        })
    }
}

module.exports.update_user = async (req, res) => {
    var new_user = new User(req.body)
    const { id } = req.params

    if (!new_user.name || !new_user.username || !new_user.role_id) {
        response(res, 200, false, "Please provide a valid data.")
    } else {
        await User.updateUser(id, new_user).then(async (result) => {
            await User.getUserById(id).then((data) => {
                response(res, 200, true, "User Updated Successfully.", data)
            }).catch((error) => {
                response(res, 200, false, "Error.", error)
            })
        }).catch((error) => {
            response(res, 200, false, "Error.", error)
        })
    }
}

module.exports.delete_user = async (req, res) => {
    const { id } = req.params
    await User.deleteUser(id).then((result) => {
        response(res, 200, true, "User Deleted Successfully.")
    }).catch((error) => {
        response(res, 200, false, "Error.", error)
    })
}

module.exports.logout_user = (req, res) => {
    RevToken.revokeToken(req.headers['jwt_token'],
        (err, result, fields) => {
            if (err) {
                response(res, 200, false, "Error.", err)
            } else {
                response(res, 200, true, "User Logged Out Successfully.")
            }
        }
    )
}