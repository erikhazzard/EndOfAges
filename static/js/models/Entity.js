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
            activeEffects: [ 
                // Will look like:
                // { type: magic, subtype: fire, effect: function(){ ... }, duration: n }
                // TODO: some sort ofDetrimental property to determine if it's
            ],

            // the entity's race
            // tracks effects / stats, bonuses from / against races, etc.
            // TODO: favorite / known races, give bonuses based on it
            race: null,

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
            //
            // TODO: pass in values?
            // Starting values based on the entity's race / class
            attributes: {},

            //Base attributes (copied over when a game starts to allow
            //  for buffs / debuffs)
            //---------------------------
            baseAttributes: {},

            // AI Related
            // --------------------------
            aiDelay: 0,

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

        initialize: function entityInitialize(options, opts){
            logger.log('models/Entity', 'initialize() called');
            options = options || {};

            // TODO: get attributes from server
            // set attributes and base attributes from server
            this.set({
                name: 'Soandso' + Math.random(),
                attributes: new EntityAttributes(),
                baseAttributes: new EntityAttributes()
            }, {silent: true});

            // TODO: allow setting just some entity attribute attributes

            // TODO: get AIdelay from server
            this.set({ aiDelay: Math.random() * 2.5 });

            // Setup entity abilities
            if(!options.abilities){
                // TODO: get from server
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
            }

            // Listen when health drops to 0 or below, trigger entity
            // death event
            this.listenTo(
                this.get('attributes'), 
                'change:health', 
                this.healthChanged);

            return this;
        },

        getScore: function getScore(){
            // TODO: get a combat score for this entity based on abilities
            // and states
        },

        addBuff: function addBuff(ability){
            // Takes in an ability and adds the buff effect
            //
            var effects = this.get('activeEffects');

            // store the attributes
            effects.push(ability.toJSON());

            this.set({ effects: effects });

            return this;
        },
        removeBuff: function removeBuff(ability){
            // Remove effect
            var effects = this.get('activeEffects');

            // remove the targeted ability
            for(var i=0, len=effects.length; i<len; i++){
                if(effects[i].cid === ability.attributes.cid){
                    // remove the item at current index
                    logger.log('models/Entity', 'removeBuff(): Found ability ' +
                        '%O  at index ' + i + ' effect : %O', 
                        ability, effects[i]);

                    effects.splice(i,1);
                    break;
                }
            }

            this.set({ effects: effects });

            return this;
        },


        // ===================================================================
        //
        // Take damage / heal functions
        //
        // ===================================================================
        healthChanged: function healthChanged(model, health, options){
            // Called whenever the entity's health changes. Takes in the
            // changed model (the attributes), the health amount, and an options
            // object that contains the `sourceAbility` that triggered the health
            // change
            logger.log('models/Entity', 
                '1. healthChanged() : health ' + health + ' options: %O',
                options);

            if(health <= 0){
                logger.log('models/Entity', '2. entity is dead!');
                this.set({ isAlive: false });
                // trigger global event to let listeners know entity died
                this.trigger('entity:died', {model: this});
            }

            return this;
        },

        // ------------------------------
        // TODO: Combine takeDamage and takeHeal
        //
        // Take / Deal damage
        // ------------------------------
        takeDamage: function(options){
            // TODO: document, think of structure
            logger.log('models/Entity', '1. takeDamage() : options: %O',
                options);

            // if entity is dead, do nothing
            if(!this.get('isAlive')){ 
                logger.log('models/Entity', '[x] entity is dead');
                return false; 
            }

            // TODO: process damage based on passed in damage and type and this
            // entity's stats
            var sourceAbility = options.sourceAbility;
            var damage = options.amount * -1;

            // TODO: process damage

            // update attributes
            var attrs = this.get('attributes');
            var curHealth = attrs.get('health');
            var maxHealth = attrs.get('maxHealth');
            var newHealth = curHealth + damage;

            // TODO: check if there are any buffs that protect from death

            // If the health drops below 0, the target is dead
            if(newHealth <= 0){ newHealth = 0; }
            // limit health
            if(newHealth > maxHealth){ newHealth = maxHealth; }

            // update the health
            //  pass in the ability that caused the damage
            attrs.set({ health: newHealth }, { 
                sourceAbility: sourceAbility,
                source: options.source
            });

            // NOTE:
            // death event is called in the `healthChanged`, which is called
            // whenever health changes
            logger.log('models/Entity', 'amount received : %O', damage);

            return damage;
        },
        
        takeHeal: function(options){
            // This is called by an abilty that does healing
            // TODO: document, think of structure
            logger.log('models/Entity', '1. takeHeal() : options: %O',
                options);

            // if entity is dead, do nothing
            if(!this.get('isAlive')){ 
                logger.log('models/Entity', '[x] entity is dead');
                return false; 
            }

            // TODO: process damage based on passed in damage and type and this
            // entity's stats
            var sourceAbility = options.sourceAbility;
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
            //  pass in the ability that healed the entity
            attrs.set({ health: newHealth }, {
                sourceAbility: sourceAbility,
                source: options.source
            });

            return amount;
        },

        // ==============================
        //
        // AI 
        //
        // TODO: Don't put this here
        // ==============================
        getAbilityAI: function getAbilityAI(time){
            // selects an ability based on health, enemy health, etc
            var models = this.attributes.abilities.models;

            // TODO: select ability based on health / timer / etc.
            var ability = models[ (Math.random() * models.length)|0 ];

            this.set({'desiredAbility': ability});

            return ability;
        }, 

        handleAI: function handleAI(time, battle){
            // TODO: don't put this here. How to handle battle context?
            // TODO: this is ugly, rework this, updates battle AI, use aggrolist
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
            var targets, model, len;

            if(!ability){
                // No ability already chosen? Select one at random
                // TODO: don't do it randomly
                ability = this.getAbilityAI(time);
            }

            // Use the ability
            if(ability && time >= ability.attributes.castTime && 
                // TODO: handle AI delay differently?
                // aiDelay is how long to delay using an ability
                time >= (ability.attributes.castTime + this.attributes.aiDelay)
            ){
                // ----------------------
                // 1. make sure ability is still the right one
                // ----------------------
                // get the ability to use (it might change between selecting
                // the ability the first time and when the entity can cast it)
                // TODO: this might get screwy with the aiDelay...
                this.getAbilityAI(time);
                ability = this.attributes.desiredAbility;

                // make sure the ability can be cast
                if(time < ability.attributes.castTime){
                    return false;
                }

                // ----------------------
                // 2. set desired target
                // ----------------------

                // TODO: target based on ability
                // TODO: Use validTargets instead of checking damage or heal type
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
                    // TODO: Target self group
                    models = battle.get('enemyEntities').models;
                    // TODO: instead of agro list, use a healing list
                    //  entities that have the lowest health should be healed
                    //  first
                    targets = [];

                    for(i=0,len=models.length;i<len;i++){
                        model = models[i];

                        // Check if entity is dead or untargettable
                        if(model.get('isAlive') && 
                            model.get('attributes').get('health') < 
                            model.get('attributes').get('maxHealth')){
                            targets.push({
                                health: model.get('attributes').get('health'),
                                index: i
                            });
                        }
                    }
                    // sort by lowest health
                    targets = _.sortBy(targets, 'health');

                    // if there are no targets to heal, then return false so
                    // a new ability can be selected
                    if(targets.length === 0){ return false; }

                    // set the target as the first entity in the heal list
                    target = models[targets[0].index];

                    // set the target index and group
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
