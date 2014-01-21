// ===========================================================================
//
//  Game
//
//      This model manages a game
//
// ===========================================================================
define(
    [ 'backbone', 'marionette', 'logger',
        'events', 'd3', 'util/API_URL', 'util/STORAGE_PREFIX',

        'collections/Entities', 'models/Entity',
        'models/Map',
        'models/appUser-object'

    ], function MapModel(
        Backbone, Marionette, logger,
        events, d3, API_URL, STORAGE_PREFIX,

        Entities, Entity,
        Map,
        appUser
    ){

    var Game = Backbone.Model.extend({
        defaults: {
            // current map
            activeMap: null,

            // Instance of the node type (e.g., battle)
            activeNodeInstance: null,

            // the player's party
            playerEntities: null,

            // money for the current game
            gold: 0
        },

        url: function getURL(){
            var url = API_URL + 'user/game';
            return url;
        },

        initialize: function gameInitialize(attrs, options){
            logger.log('models/Game', 'initialize() called');
            options = options || {};

            if(options.models){
                this.set({ playerEntities: new Entities(options.models) });
            }

            window.G = this;
            return this;
        },

        saveLocal: function saveLocal(){
            // saves game to local storage
            if(window.localStorage){
                window.localStorage.setItem(
                    STORAGE_PREFIX + 'game',
                    JSON.stringify(this.toJSON())
                );
            }
        }
    });

    return Game;
});
