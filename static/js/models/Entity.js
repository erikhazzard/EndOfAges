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
        'models/Ability',
        'models/data-abilities'
    ], function MapModel(
        Backbone, Marionette, logger,
        events, d3, API_URL,
        EntityAttributes,
        Abilities,
        Ability,
        ABILITIES
    ){

    var Entity = Backbone.Model.extend({
        defaults: {
            // abilities will be a collection of ability models
            abilities: null,

            // effects active on the entity (e.g., buffs or DoTs)
            activeEffects: [],

            // name of the base sprite
            sprite: 'man1',

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
                    ABILITIES.magicmissle,
                    ABILITIES.fireball,
                    ABILITIES.minorhealing
                ])
            });

            // Listen when health drops to 0 or below, trigger entity
            // death event
            this.listenTo(
                this.get('attributes'), 
                'change:health', 
                this.healthCallback);

            return this;
        },

        healthCallback: function healthCallback(model, health){
            logger.log('models/Entity', '1. healthCallback() : health ' + health);

            if(health <= 0){
                logger.log('models/Entity', '2. entity is dead!');
                this.set({ isAlive: false });
                // trigger global event to let listeners know entity died
                this.trigger('entity:died', {model: this});
            }

            return this;
        },

        // Take / Deal damage
        takeDamage: function(options){
            // TODO: document, think of structure
            logger.log('models/Entity', '1. takeDamage() : options: %O',
                options);
            // TODO: process damage based on passed in damage and type and this
            // entity's stats
            var damage = options.amount;

            // TODO: process damage
            damage = damage;

            var attrs = this.get('attributes');
            var curHealth = attrs.get('health');
            var maxHealth = attrs.get('maxHealth');
            var newHealth = curHealth - damage;

            // TODO: check if there are any buffs that protect from death

            // If the health drops below 0, the target is dead
            if(newHealth <= 0){ newHealth = 0; }
            // limit health
            if(newHealth > maxHealth){ newHealth = maxHealth; }

            // update the health
            attrs.set({ health: newHealth });
            // death event is called in the `healthCallback`, which is called
            // whenever health changes

            return damage;
        },
        
        // an ability that does healing
        takeHeal: function(options){
            // TODO: document, think of structure
            logger.log('models/Entity', '1. takeHeal() : options: %O',
                options);
            // TODO: process damage based on passed in damage and type and this
            // entity's stats
            var amount = options.amount;

            // TODO: process healing
            amount = amount;

            var attrs = this.get('attributes');
            var curHealth = attrs.get('health');
            var maxHealth = attrs.get('maxHealth');
            var newHealth = curHealth + amount;

            // TODO: check if there are any buffs that protect from death

            // If the health drops below 0, the target is dead
            if(newHealth <= 0){ newHealth = 0; }
            // limit health
            if(newHealth > maxHealth){ newHealth = maxHealth; }

            // update the health
            attrs.set({ health: newHealth });
            // death event is called in the `healthCallback`, which is called
            // whenever health changes

            return amount;
        }

    });

    return Entity;
});
