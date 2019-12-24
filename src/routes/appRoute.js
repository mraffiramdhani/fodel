'use strict'
module.exports = (app) => {
    const Users = require('../controllers/user')
    const { auth } = require('../middleware')

    app.route('/').get(auth, (req, res) => {
        res.send('Hello World')
    })

    app.route('/register')
        .post(Users.register_user)

    app.route('/user')
        .get(auth, Users.list_all_users)

    // app.route('/user/register')
    //     .post(Users.createUser)

    // router.post('/register', (req, res) => {
    //     const { name, username, password } = req.body
    //     const role_id = 3
    //     const encPass = bcrypt.hashSync(password)
    //     const created_at = new Date(),
    //         updated_at = new Date();
    //     conn.execute(
    //         'INSERT INTO users(name, username, password, role_id, created_at, updated_at) VALUES(?,?,?,?,?,?)',
    //         [name, username, encPass, role_id, created_at, updated_at], (err, result, fields) => {
    //             if (err) {
    //                 res.send({
    //                     success: false,
    //                     message: err
    //                 })
    //             } else {
    //                 const auth = jwt.sign({ name, username }, process.env.APP_KEY)
    //                 res.send({
    //                     success: true,
    //                     auth
    //                 })
    //             }
    //         })
    // })

    // router.post('/login', (req, res) => {
    //     const { username, password } = req.body
    //     conn.execute('SELECT * FROM user WHERE username=?', [username], (err, result, fields) => {
    //         if (err) {
    //             res.send({
    //                 success: false,
    //                 message: err
    //             })
    //         } else if (result.length > 0) {
    //             if (bcrypt.compareSync(password, result[0].password)) {
    //                 const name = result[0].name
    //                 const auth = jwt.sign({
    //                     name, username
    //                 }, process.env.APP_KEY)
    //                 res.send({
    //                     success: true,
    //                     auth
    //                 })
    //             } else {
    //                 res.send({
    //                     success: false,
    //                     message: 'Password Incorrect'
    //                 })
    //             }
    //         } else {
    //             res.send({
    //                 success: false,
    //                 message: 'User not found.'
    //             })
    //         }
    //     })
    // })

    // router.get('/logout', auth, (req, res) => {
    //     conn.execute(
    //         'INSERT INTO revoked_token(token) VALUE(?)',
    //         [req.token],
    //         (err, result, fields) => {
    //             if (err) {
    //                 res.send({
    //                     success: false,
    //                     message: err
    //                 })
    //             } else {
    //                 res.send({
    //                     success: true,
    //                     message: "User Logged Out Successfuly"
    //                 })
    //             }
    //         }
    //     )
    // })

}