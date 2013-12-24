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
            // TODO: Should this be here?
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
            baseAttributes: {},

            // AI Related
            // --------------------------
            // list of enemies and their aggro. Key is entity ID, value is
            // aggro value
            aggroList: {},
            
            // ability the entity desires to use. Is handled by the AI
            // function, may change before using (e.g., if health changes)
            desiredAbility: null,

            // desired target is the intended target to use the ability on
            desiredTarget: null
           
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
                    ABILITIES.minorhealing,
                    ABILITIES.fireball
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
        },

        // ------------------------------
        // AI 
        // TODO: Don't put this here
        // ------------------------------
        getAbilityAI: function getAbilityAI(){
            // selects an ability based on health, enemy health, etc
            var models = this.attributes.abilities.models;
            var ability = models[ (Math.random() * models.length)|0 ];

            // if entity health is dropped below, use a healing spell
            if(this.get('attributes').get('health') < 20){
                ability = models[1];
            }

            this.set({'desiredAbility': ability});
            return ability;
        }, 

        handleAI: function handleAI(time, battle){
            // TODO: yuck don't put this here. How to handle battle context?
            //
            //
            // called each tick to control AI
            // Note: using this.attributes instead of this.get() for performance
            
            // Select ability to use if one isn't already selected
            var ability = this.attributes.desiredAbility;
            var models = null;
            var i = 0;
            var target = null;
            var targetIndex, targetGroup;

            if(!ability){
                // No ability already chosen? Select one at random
                // TODO: don't do it randomly
                ability = this.getAbilityAI();
            }

            // Use the ability
            if(time >= ability.attributes.castTime){
                // ----------------------
                // 1. make sure ability is still the right one
                // ----------------------
                this.getAbilityAI();
                ability = this.attributes.desiredAbility;

                // make sure the ability can be cast
                if(time < ability.attributes.castTime){
                    return false;
                }

                // ----------------------
                // 2. set desired target
                // ----------------------

                // TODO: target based on ability
                // (don't target enemy for healing spells)
               
                if(ability.attributes.damage){
                    // 1: Target enemy
                    // TODO: get target based on aggro
                    models = battle.get('playerEntities').models;
                    while(true){
                        // TODO: go down aggro list instead of randomly selecting
                        target = models[Math.random() * models.length | 0]; 
                        // TODO: some % chance to randomly select

                        // Check if entity is dead or untargettable
                        if(target.get('isAlive')){
                            found = true;
                            break;
                        }

                        // make sure to avoid endless loop
                        i++;
                        if(i > 10){ break; }
                    }
                    targetIndex = battle.get('playerEntities').indexOf(target), 
                    targetGroup = 'player';

                } else if (ability.attributes.heal){
                    // Target self group
                    models = battle.get('enemyEntities').models;
                    while(true){
                        // TODO: go down aggro list instead of randomly selecting
                        target = models[Math.random() * models.length | 0]; 
                        // TODO: some % chance to randomly select

                        // Check if entity is dead or untargettable
                        // TODO: target selection for heals
                        //  should target guy with lowest health
                        if(target.get('isAlive') && 
                            target.get('attributes').get('health') < 
                            target.get('attributes').get('maxHealth')){
                            found = true;
                            break;
                        }

                        // make sure to avoid endless loop
                        i++;
                        if(i > 10){ break; }
                    }
                    targetIndex = battle.get('enemyEntities').indexOf(target), 
                    targetGroup = 'enemy';

                }

                // ----------------------
                // 2. trigger event to use ability
                // ----------------------
                // TODO: make sure this isn't used over and over
                events.trigger('useAbility', {
                    target: target,
                    targetIndex: targetIndex,
                    entityGroup: targetGroup,

                    sourceEntityIndex: battle.get('enemyEntities').indexOf(this),
                    sourceEntityGroup: 'enemy',
                    ability: ability
                });

                // clear out desirect ability
                this.set('desiredAbility', null);
            }

            return this;
        }

    });

    return Entity;
});
