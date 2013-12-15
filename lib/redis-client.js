//============================================================================
//
//redis-client.js
//  returns a client object connected to redis
//
//============================================================================
var nconf = require('nconf');
var redis = require('redis');
var winston = require('winston');

//---------------------------------------
//Setup redis client
//---------------------------------------
//Configure it. Note: This only sets defaults if nothing has been set in
//  config files
require('../conf/configure-redis')();

//Create client
var redisClient = redis.createClient(
    nconf.get('redis:port'), 
    nconf.get('redis:host')
); 

redisClient.on('error', function(err) {
    //catch redis errors so server doesn't blow up
    winston.error('Redis client error:' + err);
});

//export the client
module.exports = redisClient;
