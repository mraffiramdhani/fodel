'use strict'
module.exports = (app) => {
    const Users = require('../controllers/user'),
        Categories = require('../controllers/category'),
        Restaurants = require('../controllers/restaurant'),
        Items = require('../controllers/item'),
        Carts = require('../controllers/cart');
    const { auth, hasRole } = require('../middleware')

    app.route('/').get(auth, (req, res) => {
        res.send('Hello World')
    })

    app.route('/register')
        .post(Users.register_user)

    app.route('/login')
        .post(Users.login_user)

    app.route('/user')
        .get(auth, hasRole('administrator'), Users.list_all_users)

    app.route('/logout')
        .get(auth, Users.logout_user)

    app.route('/category')
        .get(auth, hasRole(['administrator', 'restaurant']), Categories.list_all_category)
        .post(auth, hasRole(['administrator', 'restaurant']), Categories.create_category)

    app.route('/category/:id')
        .patch(auth, Categories.update_category)
        .delete(auth, Categories.delete_category)

    app.route('/restaurant')
        .get(auth, Restaurants.list_all_restaurant)
        .post(auth, Restaurants.create_restaurant)

    app.route('/restaurant/:id')
        .patch(auth, Restaurants.update_restaurant)
        .delete(auth, Restaurants.delete_restaurant)

    app.route('/item')
        .get(auth, Items.list_all_item)
        .post(auth, Items.create_item)

    app.route('/item/:id')
        .patch(auth, Items.update_item)
        .delete(auth, Items.delete_item)

    app.route('/cart')
        .get(auth, Carts.list_user_cart)
        .post(auth, Carts.add_item_to_cart)

    app.route('/cart/:id')
        .patch(auth, Carts.update_item_in_cart)
        .delete(auth, Carts.delete_item_in_cart)

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