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

            // effects active on the entity (e.g., buffs or DoTs)
            activeEffects: [],

            // entity can be either alive or dead (can be revived with spell)
            isAlive: true,

            //User object which owns this entity
            owner: null,
            name: 'Soandso' + Math.random(),

            // Timer properties
            //---------------------------
            // timer is measured in seconds
            timerLimit: 10,

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
                name: 'Soandso' + Math.random(),
                attributes: new EntityAttributes(),
                baseAttributes: new EntityAttributes()
            }, {silent: true});


            // Setup entity abilities
            this.set({
                // TODO: DEV: remove random maxTimer
                //timerLimit: 60 * (Math.random() * 20 | 0),
                // TODO: get from server
                abilities: new Abilities([
                    new Ability(),
                    new Ability({ name: 'Spirit of Wolf'}),
                    new Ability({ name: 'Fireball'}),
                    new Ability({ name: 'Clarity'})
                ])
            });

            return this;
        },

        // Take / Deal damage
        takeDamage: function(options){
            // TODO: document, think of structure
            logger.log('models/Entity', '1. takeDamage() : options: %O',
                options);
            var damage = 0;

            // TODO: process damage based on passed in damage and type and this
            // entity's stats
            damage = options.damage;

            var attrs = this.get('attributes');
            var curHealth = attrs.get('health');
            var newHealth = curHealth - damage;

            // TODO: check if there are any buffs that protect from death

            // If the health drops below 0, the target is dead
            if(newHealth <= 0){ newHealth = 0; }

            // update the health
            attrs.set({ health: newHealth });

            // if health falls below 0, kill entity
            if(newHealth <= 0){
                this.set({ isAlive: false });
                // trigger global event to let listeners know entity died
                events.trigger('entity:died', {model: this});
            }

            return this;
        }

    });

    return Entity;
});
