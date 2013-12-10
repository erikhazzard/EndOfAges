// ===========================================================================
//
//  Entity
//
//      This model manages an entity - a creature in the game
//
// ===========================================================================
define(
    [ 'backbone', 'marionette', 'logger',
        'events', 'd3', 'util/API_URL',
        'models/EntityAttributes',
        'collections/Abilities',
        'models/Ability'
    ], function MapModel(
        Backbone, Marionette, logger,
        events, d3, API_URL,
        EntityAttributes,
        Abilities,
        Ability
    ){

    var Entity = Backbone.Model.extend({
        defaults: {
            // abilities will be a collection of ability models
            abilities: null,

            //User object which owns this entity
            owner: null,
            name: 'Soandso' + Math.random(),

            //---------------------------
            //Entity attributes
            //---------------------------
            // Attributes include everything from health to attack damage, etc.
            // Anything combat related
            attributes: {},

            //Base attributes (copied over when a game starts to allow
            //  for buffs / debuffs)
            //---------------------------
            baseAttributes: {}
        },
        
        url: function getURL(){
            var url = API_URL + 'entities/' + this.get('id');
            return url;
        },

        initialize: function gameInitialize(){
            logger.log('models/Entity', 'initialize() called');

            // TODO: get attributes from server
            // set attributes and base attributes from server
            this.set({
                attributes: new EntityAttributes(),
                baseAttributes: new EntityAttributes()
            }, {silent: true});

            // Setup entity abilities
            this.set({
                abilities: new Abilities([
                    new Ability(),
                    new Ability({ name: 'Spirit of Wolf ' + Math.random()})
                ])
            });

            return this;
        }

    });

    return Entity;
});
