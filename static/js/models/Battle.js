// ===========================================================================
//
//  Battle
//
//      This model manages an individual battle.
//      Used to keep track of state, battle stats, etc.
//
// ===========================================================================
define(
    [ 'backbone', 'marionette', 'logger',
        'events', 'd3', 'util/API_URL',
        'collections/Entities',
        'models/Entity'
    ], function MapModel(
        Backbone, Marionette, logger,
        events, d3, API_URL,
        Entities, Entity
    ){

    var Battle = Backbone.Model.extend({
        defaults: {
            id: 0,
    
            // state can be either 'normal' or 'targetting'
            state: 'normal',

            playerEntities: [],
            enemyEntities: []
            
            //TODO: keep track of stats
        },

        url: function getURL(){
            var url = API_URL + 'battle/' + this.get('id');
            return url;
        },

        initialize: function gameInitialize(){
            logger.log('models/Battle', 'initialize() called');

            this.set({
                enemyEntities: new Entities([
                    new Entity({}),
                    new Entity({}),
                    new Entity({})
                ])
            }, {silent: true});
            return this;
        }
    });

    return Battle;
});
