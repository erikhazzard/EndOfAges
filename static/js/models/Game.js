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

        // TODO: use a flat structure so this isn't necessary?
        ,'collections/Abilities'
        ,'models/EntityClass'
        ,'models/Race'

    ], function MapModel(
        Backbone, Marionette, logger,
        localstorage,
        events, d3, API_URL, 

        Entities, Entity,
        Map,
        appUser

        // TODO: Use a flat structure for entity so this isn't necessary
        ,Abilities
        ,EntityClass
        ,Race
    ){

    var _gameTimer;
    var _gameTimerObject = {
        timer: 0
    };

    var Game = Backbone.Model.extend({
        defaults: {
            // actual ID used on backend
            _id: '',

            // current map
            activeMap: null,

            timer: _gameTimerObject,

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
            var self = this;
            options = options || {};

            if(options.models){
                this.set({ playerEntities: new Entities(options.models) });
            }


            // TODO: Use a unique ID. FOR NOW, for dev, we're using the same ID
            this.set({ id: 'currentGame' });

            window._GAME = this;

            this.on('sync', function(r){
                logger.log('models/Game', 'sync() triggered');
            });

            // TODO: DEV ::: REMOVE THIS, CHANGE SAVE LOGIC
            this.listenTo(events, 'dev:saveGame', function(){
                logger.log('models/Game', 'dev:saveGame event received, saving');
                self.save();
            });

            return this;
        },

        /**
         * Global game timer, updated on a subsecond interval
         */
        startTimer: function () {
            if (!_gameTimer) {
                _gameTimer = setInterval(function () {
                    _gameTimerObject.timer += 0.25;
                }, 250);
            }
        },

        parse: function(res){
            // Load from JSON and turn into object
            // Need to overwrite the parse function so we can load in data
            // from the server for nested models. 
            // NOTE: Could automate this, store embedded collection / models
            // as a property and include the class
            var entities = [];

            logger.log('game:parse', 'parsing: %j', res)

            // create entity models for each entity, then add them to the
            // collection
            _.each(res.playerEntities, function(entity){
                // setup model / collections from JSON data
                // For non flat structure, we need to create objects based on
                // the data
                // TODO: don't use class, call it entityClass in model
                entity.class.abilities = new Abilities(entity.class.abilities);
                entity.class = new EntityClass(entity.class);
                entity.race = new Race(entity.race);

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
