//============================================================================
//
//configure-redis.js
//  Configures redis related settings
//
//============================================================================
var nconf = require('nconf');
var winston = require('winston');

module.exports = function configureRedis(){
    nconf.add('redis', {
        'type': 'literal',
        //redis
        'redis': { 
            'host': 'localhost',
            'port': 6379
        }
    });
};
