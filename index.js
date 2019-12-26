// import express, cors, body-parser, dotenv
require('dotenv').config()
const express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    responseTime = require('response-time'),
    port = process.env.APP_PORT;

// assign express instance to app variable
const app = express();

// assign express middleware (body-parser)
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(cors())
app.use(responseTime())

// define app port
app.listen(port, () => {
    console.log('App Listen on Port ' + port)
});

var routes = user = require('./src/routes/appRoute')
routes(app)