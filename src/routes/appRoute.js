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
        res.send('Hello World <a href="http://localhost:3000/item"> Item List</a>')
    })

    app.route('/register')
        .post(Users.register_user)

    app.route('/login')
        .post(Users.login_user)

    app.route('/user')
        .get(auth, hasRole('administrator'), Users.list_all_users)
        .post(auth, hasRole('administrator'), Users.create_user)
        .patch(auth, hasRole('customer'), Users.update_profile)

    app.route('/user/:id')
        .get(auth, hasRole('administrator'), Users.get_user_by_id)
        .patch(auth, hasRole('administrator'), Users.update_user)
        .delete(auth, hasRole('administrator'), Users.delete_user)

    app.route('/user/review')
        .get(auth, hasRole(['customer', 'administrator']), Reviews.list_user_review)

    app.route('/logout')
        .get(auth, Users.logout_user)

    app.route('/category')
        .get(Categories.list_all_category)
        .post(auth, hasRole(['administrator', 'restaurant']), Categories.create_category)

    app.route('/category/:id')
        .get(auth, hasRole(['administrator', 'restaurant']), Categories.get_category_by_id)
        .patch(auth, hasRole(['administrator', 'restaurant']), Categories.update_category)
        .delete(auth, hasRole(['administrator', 'restaurant']), Categories.delete_category)

    app.route('/restaurant')
        .get(Restaurants.list_all_restaurant)
        .post(auth, hasRole('administrator'), Restaurants.create_restaurant)

    app.route('/restaurant/:id')
        .get(Restaurants.show_restaurant)
        .patch(auth, hasRole(['administrator', 'restaurant']), Restaurants.update_restaurant)
        .delete(auth, hasRole(['administrator', 'restaurant']), Restaurants.delete_restaurant)

    app.route('/restaurant/:id/logo')
        .patch(auth, hasRole(['administrator', 'restaurant']), Restaurants.update_restaurant_logo)

    app.route('/item')
        .get(Items.list_all_item)
        .post(auth, hasRole('restaurant'), Items.create_item)

    app.route('/item/admin')
        .post(auth, hasRole('administrator'), Items.create_item_by_admin)

    app.route('/item/:id')
        .get(Items.show_item)
        .patch(auth, hasRole(['administrator', 'restaurant']), Items.update_item)
        .delete(auth, hasRole(['administrator', 'restaurant']), Items.delete_item)

    app.route('/restaurant-item')
        .get(auth, hasRole('restaurant'), Items.get_item_by_restaurant)

    app.route('/item/:id/images')
        .patch(auth, hasRole(['administrator', 'restaurant']), Items.update_item_images)

    app.route('/item/:id/review')
        .get(Reviews.list_item_review)
        .post(auth, hasRole('customer'), Reviews.add_item_review)

    app.route('/review/:id')
        .patch(auth, hasRole('customer'), Reviews.update_item_review)
        .delete(auth, hasRole('all'), Reviews.delete_item_review)

    app.route('/cart')
        .get(auth, hasRole('customer'), Carts.list_user_cart)
        .post(auth, hasRole('customer'), Carts.add_item_to_cart)
        .patch(auth, hasRole('customer'), Carts.checkout_cart)

    app.route('/cart/:id')
        .patch(auth, hasRole('customer'), Carts.update_item_in_cart)
        .delete(auth, hasRole('customer'), Carts.delete_item_in_cart)

    app.route('/check-token').post(Users.check_token)

}