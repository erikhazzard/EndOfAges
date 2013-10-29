//=============================================================================
// Controller.js
//
// Handles Controller functions the router uses
//============================================================================= 
define([
    'backbone', 'marionette', 'logger', 'events',
    'models/appUser-object',
    'views/PageHome'
    ], function(
        Backbone, Marionette, logger, events,
        appUser,

        // include views here
        PageHome
    ){

    var Controller = Backbone.Marionette.Controller.extend({
        //The controller handles the navigation logic / calling views
        
        initialize: function controllerInitialize(options){
            //ASSUMPTIONS: 
            //  regionMain parameter must be passed in, which specifies what 
            //  region to show. (NOTE: fire off events)
            var self = this;
            logger.log('Controller', 'initialize', 'controller initialized');

            _.each(options.regions, function(region, key){
                self[key] = region;
            });
            
            // When appUser logs in (from any page), take them to their home page
            appUser.on('loggedIn', function controllerUserLoggedInCallback(){
                logger.log('Controller', 'appUser:isLoggedIn', 'appUser logged in, called showUser');
                events.trigger('appRouter:showMe');

                $('body').addClass('logged-in');
            });

            return this;
        },

        // ===================================================================
        //
        // Route handlers
        //
        // ===================================================================
        showHome: function controllerShowHome(){
            // This shows the homepage for logged out appUsers. If appUser is
            // logged in when trying to access this page, it will load their
            // profile page instead. (If they log in from the homepage, the 
            // initializer catches it and redirects them to their page).
            //
            // If the appUser is already logged in when they load the site,
            // they will be redirected to the /me endpoint (set in html
            // head before anything loads)
            var self = this;
            logger.log('Controller', 'showHome() called');

            // If appUser is already logged in, redirect to self page
            if(appUser.get('isLoggedIn')){
                logger.log('Controller', 
                    'showHome(): appUser logged in, redirecting to /me');
                // directly call personal page
                return this.showMe();
            }

            // Otherwise, show the homepage
            this.currentRegion = new PageHome({});
            this.regionMain.show(this.currentRegion);

            return this;
        }

    });

    return Controller;
});
