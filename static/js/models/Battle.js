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
        'models/Entity',
        'collections/Abilities',
        'models/data-abilities'
    ], function MapModel(
        Backbone, Marionette, logger,
        events, d3, API_URL,
        Entities, Entity,
        Abilities,
        ABILITIES
    ){

    var Battle = Backbone.Model.extend({
        defaults: {
            id: 0,
    
            // state can be either 'normal' or 'ability' or 'pause'
            state: 'normal',
            previousState: 'normal',

            // ability the player currently has selected
            // TODO: not sure this is the best way to handle this, how to
            // allow auto attacks? does this affect it?
            playerSelectedAbility: null,

            // NOTE: player entities are passed in
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

            // TODO: get entities from game model
            
            this.set({
                enemyEntities: new Entities([
                    new Entity({
                        sprite: 'tiger',
                        abilities: new Abilities([
                            ABILITIES.flamelick,
                            ABILITIES.trivialhealing
                        ])
                    }),
                    new Entity({
                        sprite: 'darkelf',
                        abilities: new Abilities([
                            ABILITIES.flamelick,
                            ABILITIES.trivialhealing
                        ])
                    }),
                    new Entity({
                        sprite: 'tiger',
                        abilities: new Abilities([
                            ABILITIES.flamelick,
                            ABILITIES.trivialhealing
                        ])
                    })
                ])
            }, {silent: true});
            return this;
        }
    });

    return Battle;
});
