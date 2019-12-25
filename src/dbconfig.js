require('dotenv').config()
const mysql = require('mysql2')

const {
    DB_SERVER,
    DB_USER,
    DB_PASS,
    DB_DATABASE
} = process.env

const config = {
    host: DB_SERVER,
    user: DB_USER,
    password: DB_PASS,
    database: DB_DATABASE,
    multipleStatements: true
}

const myconn = mysql.createConnection(config)

module.exports = myconn