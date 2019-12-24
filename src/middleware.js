const jwt = require('jsonwebtoken'),
    conn = require('./dbconfig');

const auth = (req, res, next) => {
    if (req.headers['authorization'] && req.headers['authorization'].startsWith('Bearer')) {
        const jwt_token = req.headers['authorization'].substr(7)
        req.token = jwt_token
        conn.execute('SELECT token FROM revoked_token WHERE token = ? AND is_revoked=1', [jwt_token], (err, result, fields) => {
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
                        req.auth = auth_data
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

module.exports = { auth }