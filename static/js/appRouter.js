//=============================================================================
// Router.js
//
// Handles routing for the game. Note that there is only a single route for
// the game itself, but there may be other routes for things like account info,
// about, etc. that are _outside_ the game
//=============================================================================
define(['backbone', 'marionette', 'logger', 'events'], 
    function(Backbone, Marionette, logger, events){

    // Router class
    var Router = Backbone.Marionette.AppRouter.extend({
        appRoutes: {
            //Main route
            "(/)": "showHome"
        }
    });

    // singleton
    var appRouter;

    function getAppRouter(options){
        // We only want to create one app router - if it's already been
        // created don't create another one
        if(appRouter !== undefined ){ return appRouter; }

        logger.log('appRouter', 'creating appRouter');

        var controller = options.controller;
        if(!controller){ 
            throw new Error('Controller must be passed in as an option');
        }

        // set new app router
        appRouter = new Router({
            controller: controller
        });

        return appRouter;
    }

    return getAppRouter;

});
