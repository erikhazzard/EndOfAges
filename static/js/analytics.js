// ===========================================================================
//
// analytics.js
//
//  analytics util function for sending analytics data to server
//
// ===========================================================================
define([
    'jquery', 'logger'
], function($, logger){
    var analytics = {};

    analytics.log = function analyticsLog( options ){
        // DO STUFF
        logger.log('analytics', 'called with', options);
        return true;
    };

    return analytics;
});
