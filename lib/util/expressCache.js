//============================================================================
//
//express-cache.js
//  ExpressJS cache which allows for caching GET requests and setting them 
//      using res.cache( ... ).
//
//  ASSUMPTIONS
//      * Only URLs which use res.cache() will be cached
//      * For now, only JSON responses are cached
//
//
//  TODO: write this as a NPM module
//============================================================================
var winston = require('winston');

var expressCache = function(client){
    //  Takes in a redis client object and returns a router to use with it
    var funcs = {};
    
    funcs.router = function(req, res, next){
        //This function does two things:
        //  1. Routes which call res.cache( ... ); will cache the response in
        //      redis with the key being req.url
        //  2. ALL GET requests will attempt to get a response from cache.
        //      The key is the req.url
        //
        // There are checks in place to allow graceful degradation if Redis
        //  goes down
        var url = req.url;
        // remove trailing slash if it exists
        url = url.replace(/\/$/, '');
        
        res.cache = function (msg) {
            //1. Create a res.cache function which will save to cache
            if(client.connected){
                client.set(url, JSON.stringify(msg) );
            }

            //then send it
            res.send(msg);
        };

        //Try to get a response from the cache for GET requests.
        //  The cache will only be set if a route calls req.cache(...)
        //  NOTE: For now, only JSON responses are cached 
        if(client.connected && req.method === 'GET'){
            //If the request is a GET request, let's try to get
            //  the respones from cache
            client.get(url, function(err, redisRes){
                //Two possibilities: 
                // 1. Nothing in cache (or error)
                // 2. Something in cache (then send it)
                
                if(redisRes){ 
                    // get it from cache
                    // TODO: parse it only if it's an object first
                    winston.debug('Sending request from cache for: ' + req.url);
                    res.send( JSON.parse(redisRes) );
                } else {
                    //No response from redis, so continue on
                    next();
                }
            });
        } else {
            //For non GET requests, we don't want to cache anything
            next();
        }
    };

    return funcs;
};

module.exports = expressCache;

