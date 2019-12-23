const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    if (req.headers['authorization'] && req.headers['authorization'].startsWith('Bearer')) {
        const jwt_token = req.headers['authorization'].substr(7)
        try {
            const str_auth = jwt.verify(jwt_token, process.env.APP_KEY)
            req.auth = str_auth
            next()
        } catch (e) {
            res.send({
                success: false,
                message: e
            })
        }
    } else {
        res.send({
            success: false,
            message: "You must be login first"
        })
    }
}

module.exports = { auth }