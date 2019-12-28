'use strict'

module.exports = (app) => {
    const Users = require('../controllers/user'),
        Categories = require('../controllers/category'),
        Restaurants = require('../controllers/restaurant'),
        Items = require('../controllers/item'),
        Carts = require('../controllers/cart'),
        Reviews = require('../controllers/review');
    const { auth, hasRole } = require('../middleware')

    app.route('/').get((req, res) => {
        res.send('Hello World')
    })

    app.route('/register')
        .post(Users.register_user)

    app.route('/login')
        .post(Users.login_user)

    app.route('/user')
        .get(auth, hasRole('administrator'), Users.list_all_users)
        .post(auth, hasRole('administrator'), Users.create_user)

    app.route('/user/:id')
        .patch(auth, hasRole(['customer', 'administrator']), Users.update_user)
        .delete(auth, hasRole('administrator'), Users.delete_user)

    app.route('/user/review')
        .get(auth, hasRole(['customer', 'administrator']), Reviews.list_user_review)

    app.route('/logout')
        .get(auth, Users.logout_user)

    app.route('/category')
        .get(Categories.list_all_category)
        .post(auth, hasRole(['administrator', 'restaurant']), Categories.create_category)

    app.route('/category/:id')
        .patch(auth, hasRole(['administrator', 'restaurant']), Categories.update_category)
        .delete(auth, hasRole(['administrator', 'restaurant']), Categories.delete_category)

    app.route('/restaurant')
        .get(Restaurants.list_all_restaurant)
        .post(auth, hasRole('administrator'), Restaurants.create_restaurant)

    app.route('/restaurant/:id')
        .get(Restaurants.show_restaurant)
        .patch(auth, hasRole('administrator'), Restaurants.update_restaurant)
        .delete(auth, hasRole('administrator'), Restaurants.delete_restaurant)

    app.route('/item')
        .get(Items.list_all_item)
        .post(auth, hasRole(['administrator', 'restaurant']), Items.create_item)

    app.route('/item/:id')
        .get(Items.show_item)
        .patch(auth, hasRole(['administrator', 'restaurant']), Items.update_item)
        .delete(auth, hasRole(['administrator', 'restaurant']), Items.delete_item)

    app.route('/item/:id/review')
        .get(Reviews.list_item_review)
        .post(auth, hasRole('customer'), Reviews.add_item_review)

    app.route('/review/:id')
        .patch(auth, hasRole('all'), Reviews.update_item_review)
        .delete(auth, hasRole('all'), Reviews.delete_item_review)

    app.route('/cart')
        .get(auth, hasRole('customer'), Carts.list_user_cart)
        .post(auth, hasRole('customer'), Carts.add_item_to_cart)

    app.route('/cart/:id')
        .patch(auth, hasRole('customer'), Carts.update_item_in_cart)
        .delete(auth, hasRole('customer'), Carts.delete_item_in_cart)

}