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
            "(/)": "showHome"
        }
    });

    // singleton
    var appRouter;

    function getAppRouter(options){
        // We only want to create one app router - if it's already been
        // created don't create another one
        if(appRouter === undefined ){
            logger.log('appRouter', 'Creating app router!');

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
            events.on('appRouter:showHome', function(){
                appRouter.navigate('/', {trigger: true});
            }, this);

            events.on('appRouter:showMe', function(){
                appRouter.navigate('/me', {trigger: true});
            }, this);
        }

        return appRouter;
    }

    return getAppRouter;

});
