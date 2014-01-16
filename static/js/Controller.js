//=============================================================================
// Controller.js
//
// Handles Controller functions the router uses
//============================================================================= 
define([
    'backbone', 'marionette', 'logger', 'events',
    'models/appUser-object',
    'models/Game',
    'models/Entity',
    'views/PageHome',
    'views/PageGame',
    'views/PageCreateCharacter'
    ], function(
        Backbone, Marionette, logger, events,
        appUser,
        Game,
        Entity,

        // include views here
        PageHome,
        PageGame,
        PageCreateCharacter
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

            this.setupMobile();
            
            return this;
        },

        setupMobile: function setupMobile(){
            // Mobile related functionality
            //
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

            if(!this.pageHome){
                logger.log('Controller', 'creating new pageHome view');
            }
            // Otherwise, show the homepage
            this.pageHome = new PageHome({});
            this.currentRegion = this.pageHome;
            this.regionMain.show(this.currentRegion);

            return this;
        },

        // ------------------------------
        //
        // Character Create
        //
        // ------------------------------
        showCreateCharacter: function controllerShowCreateCharacter(){
            logger.log('Controller', 'showCreateCharacter() called');

            // TODO: Reuse game view, don't show / hide it? Use a different
            // region?
            this.pageCreateCharacter = new PageCreateCharacter({
                // Hmm, model should be an empty entity?
                model: new Entity({})
            });

            this.regionMain.show(this.pageCreateCharacter);

            return this;
        },

        // ------------------------------
        //
        // Game
        //
        // ------------------------------
        showGame: function controllerShowGame(){
            logger.log('Controller', 'showGame() called');

            // get game model from server(?)
            if(!this.pageGame){
                logger.log('Controller', 'creating new pageGame view');
            }

            // TODO: Reuse game view, don't show / hide it? Use a different
            // region?
            this.pageGame = new PageGame({
                model: new Game({})
            });
            this.currentRegion = this.pageGame;
            this.regionMain.show(this.currentRegion);

            return this;
        }

    });

    return Controller;
});
