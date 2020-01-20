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
    const { search, sort } = req.query
    var numRows
    var numPerPage = parseInt(req.query.perPage, 10) || 10
    var page = parseInt(req.query.page) || 1
    var numPages
    var skip = (page - 1) * numPerPage
    var pageLinks = ''
    var redisKey = `index_user_page:${page}_limit:${limit}`
    if (search) {
        var arr = []
        Object.keys(search).map((key, index) => {
            arr.push(`search[${key}]=${search[key]}`)
        })
        pageLinks += arr.join('&') + '&'
        redisKey += arr.join('_')
    }
    if (sort) {
        Object.keys(sort).map((key, index) => {
            pageLinks += `sort[${key}]=${sort[key]}&`
        })
    }
    await User.getUserCount(id, search, sort).then((count) => {
        numRows = count[0].uCount
        numPages = Math.ceil(numRows / numPerPage)
    }).catch((error) => {
        return response(res, 200, false, "Error.", error)
    })
    var limit = skip + ',' + numPerPage
    return redis.get(redisKey, async (ex, data) => {
        if (data) {
            const resultJSON = JSON.parse(data);
            return response(res, 200, true, "Data Found - Redis Cache", resultJSON)
        } else {
            const users = await User.getAllUser(id, search, sort, limit)
            if (users) {
                users.forEach(function (v) { delete v.password });
                var result = {
                    users
                }
                if (page <= numPages) {
                    result.pagination = {
                        current: page,
                        perPage: numPerPage,
                        prev: page > 1 ? page - 1 : undefined,
                        next: page < numPages ? page + 1 : undefined,
                        prevLink: page > 1 ? encodeURI(pageLinks.concat(`page=${page - 1}&perPage=${numPerPage}`)) : undefined,
                        nextLink: page < numPages ? encodeURI(pageLinks.concat(`page=${page + 1}&perPage=${numPerPage}`)) : undefined
                    }
                } else result.pagination = {
                    err: 'queried page ' + page + ' is >= to maximum page number ' + numPages
                }
                redis.setex(redisKey, 10, JSON.stringify(result))
                return response(res, 200, true, "Data Found - Database Query", result)
            } else {
                return response(res, 200, false, "Data not Found")
            }
        }
    })
}

module.exports.get_user_by_id = async (req, res) => {
    const { id } = req.params
    const data = await User.getUserById(id)
    if (data) {
        return response(res, 200, true, "Data Found", data[0])
    } else {
        return response(res, 200, false, "Data not Found")
    }
}

module.exports.register_user = async (req, res) => {
    const { name, username, password } = req.body
    const role_id = 3
    var new_user = new User({ name, username, password, role_id })

    if (!new_user.name || !new_user.username || !new_user.password) {
        return response(res, 200, false, "Please provide a valid data.")
    } else {
        await User.createUser(new_user).then((result) => {
            const token = jwt.sign({ name, username, role_id }, process.env.APP_KEY)
            var put_token = new RevToken({ token })
            RevToken.putToken(put_token, (err, data) => {
                if (err) {
                    return response(res, 200, false, "Error", err)
                } else {
                    return response(res, 200, true, "User Created Successfully.", { token, name, username })
                }
            })
        }).catch((error) => {
            return response(res, 200, false, "Error.")
        })
    }
}

module.exports.check_token = async (req, res) => {
    const { token } = req.body
    await RevToken.isRevoked(token).then((result) => {
        const auth_data = jwt.verify(token, process.env.APP_KEY)
        if (result.length === 0) {
            if (auth_data.role_id === 1) {
                return response(res, 200, true, "Authorization Success.", {
                    role: 'administrator',
                    name: auth_data.name
                })
            } else if (auth_data.role_id === 2) {
                return response(res, 200, true, "Authorization Success.", {
                    role: 'restaurant',
                    name: auth_data.name
                })
            } else if (auth_data.role_id === 3) {
                return response(res, 200, false, "You Don't Have The Right User Privileges To Access The Content.")
            }
        } else {
            return response(res, 200, false, "Session Expired. Please Log In Again.")
        }
    }).catch((error) => {
        return response(res, 200, false, "Error.", error)
    })
}

module.exports.login_user = async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        return response(res, 200, false, "Please provide a valid data.")
    } else {
        const user = await User.getUserByUsername(username)
        if (user.length > 0) {
            if (bcrypt.compareSync(password, user[0].password)) {
                const { id, name, role_id } = user[0]
                const token = jwt.sign({ id: user[0].id, name, username, role_id }, process.env.APP_KEY)
                var put_token = new RevToken({ token })
                var role = ''
                if (role_id === 1) {
                    role = "administrator"
                } else if (role_id === 2) {
                    role = "restaurant"
                } else if (role_id === 3) {
                    role = "customer"
                }
                RevToken.putToken(put_token, (err, result) => {
                    if (err) {
                        return response(res, 200, false, "Error.", err)
                    } else {
                        return response(res, 200, true, "User Logged In Successfully.", {
                            token, name, role, username
                        })
                    }
                })
            } else {
                return response(res, 200, false, "Invalid Password.")
            }
        } else {
            return response(res, 200, false, "User Not Found.")
        }
    }
}

module.exports.create_user = async (req, res) => {
    var new_user = new User(req.body)

    if (!new_user.name || !new_user.username || !new_user.password || !new_user.role_id) {
        return response(res, 200, false, "Please provide a valid data.")
    } else {
        await User.createUser(new_user).then(async (result) => {
            await User.getUserById(result.insertId).then((data) => {
                return response(res, 200, true, "User Created Successfully.", data[0])
            }).catch((error) => {
                return response(res, 200, false, "Error.", error)
            })
        }).catch((error) => {
            return response(res, 200, false, "Error.", error)
        })
    }
}

module.exports.update_user = async (req, res) => {
    var new_user = new User(req.body)
    const id = req.params.id || req.auth.id

    if (!new_user.name || !new_user.username || !new_user.role_id) {
        return response(res, 200, false, "Please provide a valid data.")
    } else {
        await User.updateUser(id, new_user).then(async (data) => {
            if (data.affectedRows === 0) {
                return response(res, 200, false, "Data not Found.")
            } else {
                await User.getUserById(id).then((data) => {
                    return response(res, 200, true, "User Updated Successfully.", data[0])
                }).catch((error) => {
                    return response(res, 200, false, "Error.", error)
                })
            }
        }).catch((error) => {
            return response(res, 200, false, "Error.", error)
        })
    }
}

module.exports.update_profile = async (req, res) => {
    var new_user = new User(req.body)
    const id = req.auth.id

    if (!new_user.name || !new_user.username) {
        return response(res, 200, false, "Please provide a valid data.")
    } else {
        await User.updateUser(id, new_user).then(async (data) => {
            if (data.affectedRows === 0) {
                return response(res, 200, false, "Data not Found.")
            } else {
                await User.getUserById(id).then((data) => {
                    return response(res, 200, true, "User Updated Successfully.", { name: data[0].name, username: data[0].username })
                }).catch((error) => {
                    return response(res, 200, false, "Error.", error)
                })
            }
        }).catch((error) => {
            return response(res, 200, false, "Error.", error)
        })
    }
}


module.exports.delete_user = async (req, res) => {
    const { id } = req.params
    await User.deleteUser(id).then((data) => {
        if (data.affectedRows === 0) {
            return response(res, 200, false, "Data not Found.")
        } else {
            return response(res, 200, true, "User Deleted Successfully.")
        }
    }).catch((error) => {
        return response(res, 200, false, "Error.", error)
    })
}

module.exports.logout_user = (req, res) => {
    RevToken.revokeToken(req.headers['jwt_token'],
        (err, result, fields) => {
            if (err) {
                return response(res, 200, false, "Error.", err)
            } else {
                return response(res, 200, true, "User Logged Out Successfully.")
            }
        }
    )
}