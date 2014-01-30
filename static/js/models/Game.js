// ===========================================================================
//
//  Game
//
//      This model manages a game
//      TODO: restructure, use a flat structure
//
// ===========================================================================
define(
    [ 'backbone', 'marionette', 'logger',
        'localstorage',
        'events', 'd3', 'util/API_URL', 

        'collections/Entities', 'models/Entity',
        'models/Map',
        'models/appUser-object'

    ], function MapModel(
        Backbone, Marionette, logger,
        localstorage,
        events, d3, API_URL, 

        Entities, Entity,
        Map,
        appUser
    ){

    var Game = Backbone.Model.extend({
        defaults: {
            // actual ID used on backend
            _id: '',

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


            // TODO: Use a unique ID. FOR NOW, for dev, we're using the same ID
            this.set({ id: 'currentGame' });

            window._GAME = this;

            this.on('sync', function(r){
                console.log('SYNCED', r);
            });

            return this;
        },

        parse: function(res){
            // Need to overwrite the parse function so we can load in data
            // from the server for nested models. 
            // NOTE: Could automate this, store embedded collection / models
            // as a property and include the class
            var entities = [];

            // create entity models for each entity, then add them to the
            // collection
            _.each(res.playerEntities, function(entity){
                entities.push(new Entity(entity));
            });

            // create the collection, pass in the entity models
            res.playerEntities = new Entities(entities);

            // TODO: Add map, add node
            //
            // NOTE: if other collections or models are defined on the game,
            // we need to add them here
            return res;
        },

        localStorage: new Backbone.LocalStorage("gameModel")
    });

    return Game;
});
