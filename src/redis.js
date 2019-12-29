const redis = require('redis')

var port = process.env.REDIS_PORT || 6379;
var host = process.env.REDIS_HOST || '127.0.0.1';

module.exports = redis.createClient(port, host);