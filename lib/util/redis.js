// Utility functions for redis related functionality
module.exports = {};
var redisClient = require('../redis-client');

var deleteKeys = function deleteKeys(keys, callback){
    // delete all the keys previously returned
    redisClient.del(keys, function(err, delRes){
        // NOTE: This may return an err when no keys exist. We can
        //  ignore it, because often keys won't exist
        callback(null, delRes); 
    });
};

module.exports.deleteKeys = deleteKeys;
