// import express, cors, body-parser, dotenv
require('dotenv').config()
const express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    { auth } = require('./src/middleware'),
    user = require('./src/routes/user'),
    port = process.env.APP_PORT;

// assign express instance to app variable
const app = express();

// assign express middleware (body-parser)
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(cors())

// define app routes
app.use('/user', user)
app.get('/', (req, res) => {
    res.send('Hello World')
});

// define app port
app.listen(port, () => {
    console.log('App Listen on Port ' + port)
});