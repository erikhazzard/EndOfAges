//=============================================================================
// Controller.js
//
// Handles Controller functions the router uses
//============================================================================= 
define([
    'backbone', 'marionette', 'logger', 'events',
    'models/appUser-object',
    'models/Game',
    'views/PageHome',
    'views/PageGame'
    ], function(
        Backbone, Marionette, logger, events,
        appUser,
        Game,

        // include views here
        PageHome,
        PageGame
    ){

    // console color
    var Controller = Backbone.Marionette.Controller.extend({
        //The controller handles the navigation logic / calling views
        
        initialize: function controllerInitialize(options){
            //ASSUMPTIONS: 
            //  regionMain parameter must be passed in, which specifies what 
            //  region to show. (NOTE: fire off events)
            var self = this;
            logger.log('Controller', 'initialize() called');

            _.each(options.regions, function(region, key){
                self[key] = region;
            });
            
            return this;
        },

        setupMobile: function setupMobile(){
            // Mobile related functionality
             $(window)    
                  .bind('orientationchange', function(){
                       if (window.orientation % 180 === 0){
                           $(document.body).css("-webkit-transform-origin", "")
                               .css("-webkit-transform", "");               
                       } 
                       else {                   
                           if ( window.orientation > 0) { //clockwise
                             $(document.body).css("-webkit-transform-origin", "200px 190px")
                               .css("-webkit-transform",  "rotate(-90deg)");  
                           }
                           else {
                             $(document.body).css("-webkit-transform-origin", "280px 190px")
                               .css("-webkit-transform",  "rotate(90deg)"); 
                           }
                       }
                   })
                  .trigger('orientationchange'); 

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

            // Otherwise, show the homepage
            this.currentRegion = new PageHome({});
            this.regionMain.show(this.currentRegion);

            return this;
        },

        // ------------------------------
        // Game
        // ------------------------------
        showGame: function controllerShowGame(){
            logger.log('Controller', 'showGame() called');

            // get game model from server(?)
            this.currentRegion = new PageGame({
                model: new Game({})
            });
            this.regionMain.show(this.currentRegion);

            return this;
        }

    });

    return Controller;
});
