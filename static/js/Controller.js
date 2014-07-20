//=============================================================================
// Controller.js
//
// Handles Controller functions the router uses
//
// TODO: Don't have user be logged in permanently (done for dev)
//
// TODO: Show loading message if auth cookie exists (in HTML).
//  -load game state from localstorage
//============================================================================= 
define([
    'backbone', 'marionette', 'logger', 'events', 
    'models/appUser-object',
    'models/Game',
    'models/Entity',
    'views/PageHome',
    'views/PageGame',
    'views/PageCreateCharacter',

    // TODO: remove, only for dev
    'views/DevTools'

    ], function(
        Backbone, Marionette, logger, events,
        appUser,
        Game,
        Entity,

        // include views here
        PageHome,
        PageGame,
        PageCreateCharacter,

        // TODO: remove once out of dev
        DevTools
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

            // create dev tools view
            this.regionDevTools.show(new DevTools({}));

            // config mobile
            this.setupMobile();
            this.initialUrl = window.location.pathname;


            // HANDLE Logged in functionality
            function handleLoggedIn(){
                // This is called whenever a user successfully logs in
                // Try to get an exiting game model
                //
                // !!!!!!!!!!!!!!!!!!!!!!
                // TODO: We should fetch the app user, and get the game model
                // from the app user
                // !!!!!!!!!!!!!!!!!!!!!!
                // Create a temporary game model and try to fetch it
                // TODO: fetch from server instead of localhost? 
                var tmpGameModel = new Game({ id: 'currentGame' });
                tmpGameModel.fetch({
                    success: function(res){
                        logger.log('Controller', 'Model fetched from server!');
                        // model worked, store game model reference
                        self.modelGame = tmpGameModel;
                        self.showGame();
                    }, 
                    error: function(e,r){
                        logger.log('Controller', 'Model unable to be fetched : %O, %O',
                            e,r);
                        // Model does not exist, do nothing
                        // TODO: do anything?
                    }
                });
                return false;
            }

            // Don't show any views other than the loading or login UNTIL the
            // user's login status has been fetched
            if(appUser.get('isLoggedIn') === false){
                // NOT logged in
                // ----------------------
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
                        // LOGGED IN
                        // --------------
                        handleLoggedIn();
                    } else {
                        // NOT LOGGED IN
                        // --------------
                        // TODO: do nothing(?)
                    }
                });
            } else {
                // LOGGED IN already
                // ----------------------
                // if user is already logged in, 
                logger.log('Controller', 'logged in already during controller initialize');
                handleLoggedIn();
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
            // The "home" page is the initial landing experience / create
            // character flow. It is called immediately. If the user is logged
            // in, account links should fade in, along with more race options.
            //
            var self = this;
            logger.log('Controller', 'showHome() called');

            if(!this.pageHome){
                logger.log('Controller', 'creating new pageHome view');
                this.pageHome = new PageHome({});
            }

            // Otherwise, show the homepage
            this.currentRegion = this.pageHome;
            this.regionMain.show(this.currentRegion);

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

            var playerEntityModels = [];

            if(!this.modelGame){
                // TODO: handle creating game differently, load in models
                // NOT from pageCreateCharacter. Get from GAME model
                playerEntityModels = [ this.pageCreateCharacter.model ];

                //// TODO: To load from localstorage
                var modelGame = null;
                this.modelGame = new Game({}, {
                    models: playerEntityModels
                });
            }

            // TODO: Reuse game view, don't show / hide it? Use a different
            // region?
            this.pageGame = new PageGame({
                model: this.modelGame
            });

            logger.log('Controller', 'showing game : %O, %O',
                playerEntityModels,
                this.modelGame);

            this.currentRegion = this.pageGame;
            this.regionMain.show(this.currentRegion);

            return this;
        }

    });

    return Controller;
});
