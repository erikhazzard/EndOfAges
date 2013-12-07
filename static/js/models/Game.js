// ===========================================================================
//
//  Game
//
//      This model manages a game
//
// ===========================================================================
define(
    [ 'backbone', 'marionette', 'logger',
        'events', 'd3', 'util/API_URL'
    ], function MapModel(
        Backbone, Marionette, logger,
        events, d3, API_URL
    ){

    var Game = Backbone.Model.extend({
        defaults: {
            activeNodeInstance: null
        },

        url: function getURL(){
            var url = API_URL + 'user/game';
            return url;
        },

        initialize: function gameInitialize(){
            logger.log('models/Game', 'initialize() called');

            return this;
        }
    });

    return Game;
});
