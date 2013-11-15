// ===========================================================================
//
// Page Game
//
//      View for the game 
//
// ===========================================================================
define(
    [ 
        'd3', 'backbone', 'marionette',
        'logger', 'events',

        // Map
        'models/Map',
        'views/subViews/Map'

    ], function viewPageGame(
        d3, backbone, marionette, 
        logger, events,

        Map, MapView
    ){

    var PageGame = Backbone.Marionette.Layout.extend({
        template: '#template-page-game',

        events: {
            'click .login-facebook': 'facebookLogin'
        },
        initialize: function initialize(options){
            // initialize:
            logger.log('views/PageGame', '%cviews/PageGame: %s',
                'initialize() called');

            return this;
        },
        onShow: function gameOnShow(){
            var self = this;
            // setup the map

            // TODO: Get map model from game.
            this.modelMap = new Map({});
            this.modelMap.generateMap();
            this.setupMap();
            return this;
        },

        // ------------------------------
        //
        // User Interaction
        //
        // ------------------------------
        setupMap: function gameSetupMap(){
            var self = this;
            logger.log('views/PageGame', '%cviews/PageGame: %s',
                'setupMap() called');

            // TODO: get model
            this.viewMap = new MapView({
                model: this.modelMap
            }); 
            self.viewMap.drawMap.call(self.viewMap);
        }

    });

    return PageGame;
});
