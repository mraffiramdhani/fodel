require('dotenv').config()
const router = require('express').Router(),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcryptjs'),
    conn = require('../dbconfig'),
    { auth } = require('../middleware');

module.exports = router