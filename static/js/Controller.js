//=============================================================================
// Controller.js
//
// Handles Controller functions the router uses
//
// TODO: Don't have user be logged in permanently (done for dev)
//============================================================================= 
define([
    'backbone', 'marionette', 'logger', 'events', 'util/STORAGE_PREFIX',
    'models/appUser-object',
    'models/Game',
    'models/Entity',
    'views/PageHome',
    'views/PageGame',
    'views/PageCreateCharacter'
    ], function(
        Backbone, Marionette, logger, events, STORAGE_PREFIX,
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

            // keep trak of regions
            _.each(options.regions, function(region, key){
                self[key] = region;
            });

            // config mobile
            this.setupMobile();

            this.initialUrl = window.location.pathname;

            // Don't show any views other than the loading or login UNTIL the
            // user's login status has been fetched
            if(appUser.get('isLoggedIn') === false){
                // Note: it's possible the appUser may have been fetched before
                // this is called - in that case, do nothing
                logger.log('Controller', 'not logged in');

                appUser.on('initialFetchFromServer', function controllerUserFetched(){
                    var loggedIn = appUser.get('isLoggedIn');

                    logger.log('Controller', 
                        'fetched app user : loggedIn: %O',
                        loggedIn);

                    // If user is logged in, show the called route
                    if(loggedIn){
                        //// TODO: get game from user
                        //self.showGame({});

                    } else {
                        //// User not logged in. Check localstorage
                        ////  TODO:
                        ////  If game model is setup, show the game
                        //self.showGame({});
                    }
                });
            } else {
                // if user is already logged in, 
                logger.log('Controller', 'logged in');
                //// TODO: use localstorage
                ////
                // self.showGame({});
            }

            // Listen for controller events to show different pages
            // --------------------------
            // NOTE: We're NOT using the appRouter for this, because we don't
            // want routes - we want the game state to be stored outside of URLs
            this.listenTo(events, 'controller:showCreateCharacter', this.showCreateCharacter);
            this.listenTo(events, 'controller:showGame', this.showGame);
            this.listenTo(events, 'controller:showHome', this.showHome);

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

            if(!appUser.get('isLoggedIn')){ 
                logger.log('Controller', 'not logged in, returning false');
                return false;
            }

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
        showGame: function controllerShowGame(options){
            options = options || {};

            logger.log('Controller', 'showGame() called');

            if(!appUser.get('isLoggedIn')){ 
                logger.log('Controller', 'not logged in, returning false');
                return false;
            }

            // get game model from server(?)
            if(!this.pageGame){
                logger.log('Controller', 'creating new pageGame view');
            }

            var gameModel = null;
            gameModel = new Game({}, {
                models: [this.pageCreateCharacter.model]
            });

            //// TODO: use localstorage if exist
            //if(options.useLocalStorage && 
                //window.localStorage.getItem(STORAGE_PREFIX + 'game')){

                //gameModel = JSON.parse(
                    //window.localStorage.getItem(STORAGE_PREFIX + 'game')
                //);
            //}


            // TODO: Reuse game view, don't show / hide it? Use a different
            // region?
            this.pageGame = new PageGame({
                model: gameModel
            });

            this.currentRegion = this.pageGame;
            this.regionMain.show(this.currentRegion);

            return this;
        }

    });

    return Controller;
});
