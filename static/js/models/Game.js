// ===========================================================================
//
//  Game
//
//      This model manages a game
//
// ===========================================================================
define(
    [ 'backbone', 'marionette', 'logger',
        'events', 'd3', 'util/API_URL',

        'collections/Entities', 'models/Entity'
    ], function MapModel(
        Backbone, Marionette, logger,
        events, d3, API_URL,

        Entities, Entity
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

        initialize: function gameInitialize(){
            logger.log('models/Game', 'initialize() called');

            // TODO: setup entities
            this.set({
                playerEntities: new Entities([
                    new Entity({}),
                    new Entity({}),
                    new Entity({}),
                    new Entity({})
                ])
            }, {silent: true});
            this.trigger('change:playerEntities');

            return this;
        }
    });

    return Game;
});
