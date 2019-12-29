<h1 align="center">Fodel - Food Delivery App RESTfull API</h1>



Fodel is a Food Delivery RESTful API. Built with NodeJs using the ExpressJs Framework.
Express.js is a web application framework for Node.js. [More about Express](https://en.wikipedia.org/wiki/Express.js)
## Built With
[![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v.12.14-green.svg?style=rounded-square)](https://nodejs.org/)

## Requirements
1. <a href="https://nodejs.org/en/download/">Node JS</a>
2. <a href="https://www.getpostman.com/">Postman</a> or <a href="https://insomnia.rest/">Insomnia</a>
3. Web Server (ex. localhost)

## How to run the app ?
1. Clone this repository to your local directory (e.g: ~/dev/javascript/fodel)
2. Open the directory in CMD or Terminal
3. Type `npm install`
4. Make new file a called **.env**, set up first [here](#set-up-env-file)
5. Turn on Web Server and MySQL (can using Third-party tool like xampp, etc.)
6. Create a database with the name **fodel**, and Import file [fodel.sql](fodel.sql) to **phpmyadmin** or simply use [knex](#knex.js)
7. Open Postman (or Insomnia) desktop application or Chrome web app extension that has installed before
8. Choose HTTP Method and enter request url.(ex. localhost:3000/item)
9. You can see all the end point [here](#end-point)

## Set up .env file
Open .env file on your favorite code editor, and copy paste this code below :
```
APP_PORT=3000
APP_URI=http://localhost:3000/
APP_KEY=y0u12_4pp_k3y

DB_SERVER=localhost
DB_USER=root
DB_PASS=secret
DB_DATABASE=fodel

REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```

## Knex.js
Knex.js is a "batteries included" SQL query builder for Postgres, MSSQL, MySQL, MariaDB, SQLite3, Oracle, and Amazon Redshift designed to be flexible, portable, and fun to use. It features both traditional node style callbacks as well as a promise interface for cleaner async flow control, a stream interface, full featured query and schema builders, transaction support (with savepoints), connection pooling and standardized responses between different query clients and dialects.

Open the directory on Terminal and Type commands below :
```
$ node_modules/.bin/knex migrate:latest
$ node_modules/.bin/knex seed:run
```

## End Point
**1. GET**
* `/`
* `/user`
* `/user/review`
* `/logout`
* `/category`
* `/restaurant`
* `/restaurant/:id` (Get Restaurant by ID)
* `/item`
* `/item/:id` (Get Item by ID)
* `/item/:id/review` (Get Item Review by ID)
* `/cart`


**2. POST**
* `/register`
    * ``` { "name": "John Doe", "username": "john_doe", "password": "s3cr3t_k3y" } ```

* `/login`
    * ``` { "username": "john_doe", "password": "s3cr3t_k3y" } ```

* `/user`
    * ``` { "name": "John Doe", "username": "john_doe", "password": "s3cr3t_k3y", "role_id": 1 } ```

* `/category`
    * ``` { "name": "Cake" } ```

* `/restaurant`
    * ``` { "name": "Joe's Pizza", "logo": "img.png", "longitude": -120.01280, "latitude": 11.109129, "description": "Lorem Ipsum Dolor Sit Amet", "user_id": 3 } ```

* `/item`
    * ``` { "name": "Macaronni and Cheese Pizza", "price": 12000 , "description": "Lorem Ipsum Dolor Sit Amet", "image": "img.png", "category": 1,2,3, "restaurant_id": 1 } ```

* `/item/:id/review`
    * ``` { "rating": 4, "review": "Lorem Ipsum." } ```

* `/cart`
    * ``` { "item_id": 1, "quantity": 3, "description": "Lorem Ipsum." } ```

**3. PATCH**
* `/user/:id` (Update User by id)
   * ``` { "name": "John Doe", "username": "john_doe", "password": "s3cr3t_k3y", "role_id": 1 } ```

* `/category/:id` (Update Category by id)
   * ``` { "name": "Category8" } ```

* `/restaurant/:id` (Update Restaurant by id)
   * ``` { "name": "Joe's Pizza", "longitude": -120.01280, "latitude": 11.109129, "description": "Lorem Ipsum Dolor Sit Amet", "user_id": 3 } ```

* `/restaurant/:id/logo` (Update Restaurant Logo by id)
   * ``` { "logo": "img.png" } ```

* `/item/:id` (Update Item by id)
   * ``` { "name": "Macaronni and Cheese Pizza", "price": 12000 , "description": "Lorem Ipsum Dolor Sit Amet", "category": 1,2,3 } ```

* `/item/:id/images` (Update Item images by id)
   * ``` { "image": [image] } ```

* `/review/:id` (Update Review by id)
   * ``` { "rating": 4, "review": "Lorem Ipsum." } ```

* `/cart/:id` (Update Cart by id)
   * ``` { "quantity": 3, "description": "Lorem Ipsum." } ```

**4. DELETE**
* `/user/:id` (Delete User by id)
* `/category/:id` (Delete Category by id)
* `/restaurant/:id` (Delete Restaurant by id)
* `/item/:id` (Delete Item by id)
* `/review/:id` (Delete Review by id)
* `/cart/:id` (Delete Cart by id)
