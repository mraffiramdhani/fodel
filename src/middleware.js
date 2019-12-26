const jwt = require('jsonwebtoken'),
    conn = require('./dbconfig');

const auth = (req, res, next) => {
    if (req.headers['authorization'] && req.headers['authorization'].startsWith('Bearer')) {
        const jwt_token = req.headers['authorization'].substr(7)
        req.headers['jwt_token'] = jwt_token
        conn.execute('select token from revoked_token where token=? and is_revoked=1', [jwt_token], (err, result, fields) => {
            if (err) {
                res.send({
                    success: false,
                    message: err
                })
            } else {
                if (result.length > 0) {
                    res.send({
                        success: false,
                        message: "Session Expired. Please Log In Again"
                    })
                } else {
                    try {
                        const auth_data = jwt.verify(jwt_token, process.env.APP_KEY)
                        // req.auth = auth_data
                        req.headers.auth_token = auth_data
                        next()
                    } catch (e) {
                        res.send({
                            success: false,
                            message: e
                        })
                    }
                }
            }
        })
    } else {
        res.send({
            success: false,
            message: "You must be login first"
        })
    }
}

const hasRole = function HasRole(roles) {
    return (req, res, next) => {
        const { role_id } = req.headers.auth_token
        conn.execute('select * from roles where id=?', [role_id], (err, result) => {
            if (err) {
                res.send({
                    success: false,
                    message: "Access Denied. Error : " + err
                })
            } else if (result.length > 0) {
                if (Array.isArray(roles)) {
                    var checked = false
                    var is_auth = false
                    while (!checked) {
                        var count = 0
                        for (var i = 0; i < roles.length; i++) {
                            if (roles[i] == result[0].name) {
                                checked = true
                                is_auth = true
                            } else {
                                count++
                            }
                        }
                        if (count == roles.length) {
                            checked = true
                        }
                    }
                    if (is_auth) {
                        next()
                    } else {
                        res.send({
                            success: false,
                            message: "Access Denied. User Role Unidentified"
                        })
                    }
                } else if (typeof roles == 'string' && roles.toLowerCase() == result[0].name) {
                    next()
                } else {
                    res.send({
                        success: false,
                        message: "Access Denied. User Role Unidentified"
                    })
                }
            }
        })
    }
}

module.exports = { auth, hasRole }