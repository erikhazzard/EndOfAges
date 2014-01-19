//=============================================================================
// Router.js
//
// Handles routing for the app
//=============================================================================
define(['backbone', 'marionette', 'logger', 'events'], 
    function(Backbone, Marionette, logger, events){

    // Router class
    var Router = Backbone.Marionette.AppRouter.extend({
        appRoutes: {
            //Main route
            "(/)": "showHome",
            "create": "showCreateCharacter",
            "game": "showGame"
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

        // setup global event handlers (allows code to trigger a page 
        // redirect without directly accessing router)
        events.on('appRouter:showGame', function(){
            logger.log('appRouter', 'appRouter:showGame event called');
            appRouter.navigate('/game', {trigger: true});
        }, this);

        // Manual app router navigation
        //  This is called to manually update the URL
        events.on('appRouter:navigate', function(options){
            logger.log('appRouter', 'navigate called: %O', options);
            options = options || {};
            if(options.trigger === undefined){ options.trigger = true; }
            if(!options.route){ throw new Error('No route passed into router'); }

            if(options.reset){
                appRouter.navigate('/', {trigger: options.trigger});
            }
            appRouter.navigate(options.route, {trigger: options.trigger});
        }, this);

        return appRouter;
    }

    return getAppRouter;

});
