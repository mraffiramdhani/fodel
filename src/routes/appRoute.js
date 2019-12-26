'use strict'

module.exports = (app) => {
    const Users = require('../controllers/user'),
        Categories = require('../controllers/category'),
        Restaurants = require('../controllers/restaurant'),
        Items = require('../controllers/item'),
        Carts = require('../controllers/cart'),
        Reviews = require('../controllers/review');
    const { auth, hasRole } = require('../middleware')

    app.route('/').get(auth, (req, res) => {
        res.send(app.client)
    })

    app.route('/register')
        .post(Users.register_user)

    app.route('/login')
        .post(Users.login_user)

    app.route('/user')
        .get(auth, hasRole('administrator'), Users.list_all_users)
        .post(auth, hasRole('administrator'), Users.create_user)

    app.route('/user/review')
        .get(auth, hasRole(['customer', 'administrator']), Reviews.list_user_review)

    app.route('/logout')
        .get(auth, Users.logout_user)

    app.route('/category')
        .get(auth, hasRole(['administrator', 'restaurant']), Categories.list_all_category)
        .post(auth, hasRole(['administrator', 'restaurant']), Categories.create_category)

    app.route('/category/:id')
        .patch(auth, hasRole(['administrator', 'restaurant']), Categories.update_category)
        .delete(auth, hasRole(['administrator', 'restaurant']), Categories.delete_category)

    app.route('/restaurant')
        .get(auth, Restaurants.list_all_restaurant)
        .post(auth, Restaurants.create_restaurant)

    app.route('/restaurant/:id')
        .get(auth, Restaurants.show_restaurant)
        .patch(auth, Restaurants.update_restaurant)
        .delete(auth, Restaurants.delete_restaurant)

    app.route('/item')
        .get(auth, Items.list_all_item)
        .post(auth, hasRole(['administrator', 'restaurant']), Items.create_item)

    app.route('/item/:id')
        .get(auth, Items.show_item)
        .patch(auth, hasRole(['administrator', 'restaurant']), Items.update_item)
        .delete(auth, hasRole(['administrator', 'restaurant']), Items.delete_item)

    app.route('/item/:id/review')
        .get(auth, Reviews.list_item_review)
        .post(auth, Reviews.add_item_review)

    app.route('/review/:id')
        .patch(auth, Reviews.update_item_review)
        .delete(auth, Reviews.delete_item_review)

    app.route('/cart')
        .get(auth, hasRole('customer'), Carts.list_user_cart)
        .post(auth, hasRole('customer'), Carts.add_item_to_cart)

    app.route('/cart/:id')
        .patch(auth, hasRole('customer'), Carts.update_item_in_cart)
        .delete(auth, hasRole('customer'), Carts.delete_item_in_cart)

}