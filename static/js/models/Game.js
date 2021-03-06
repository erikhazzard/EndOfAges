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
            activeNodeInstance: null,

            // the player's party
            playerEntities: null
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
