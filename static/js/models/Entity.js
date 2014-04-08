// ===========================================================================
//
//  Entity
//
//      This model manages an entity - a creature in the game
//
//      TODO: Rename attributes to something else, rethink how to store them
//
// ===========================================================================
define(
    [ 'backbone', 'marionette', 'logger',
        'events', 'd3', 'util/API_URL',
        'models/EntityAttributes',
        'collections/Abilities',
        'models/Ability',
        'util/generateName'
    ], function MapModel(
        Backbone, Marionette, logger,
        events, d3, API_URL,
        EntityAttributes,
        Abilities,
        Ability,
        generateName
    ){

    var Entity = Backbone.Model.extend({
        defaults: function(){
            return {
                // abilities will be a collection of ability models
                // NOTE: these abilities are mutable, can be changed based on
                // buffs
                abilities: null,

                // effects active on the entity (e.g., buffs or DoTs)
                activeEffects: [ 
                    // Will look like:
                    // { type: magic, subtype: fire, effect: function(){ ... }, duration: n }
                    // TODO: some sort ofDetrimental property to determine if it's
                ],

                // an array of objects that is updated whenever the entity's health
                // changes
                healthHistory: [],

                // the entity's race
                // tracks effects / stats, bonuses from / against races, etc.
                // TODO: favorite / known races, give bonuses based on it
                race: null,

                // name of the base sprite
                // TODO: Should this be here?
                sprite: 'man1', 

                // entity can be either alive or dead (can be revived with spell)
                isAlive: true,

                // generate a name
                name: generateName(),

                // ==========================
                // Stats
                // ==========================
                kills: 0,
                deaths: 0,

                // ==========================
                // Entity attributes
                // ==========================
                // TODO: Make flat structure. Copy over attributes at beginning
                //
                // Attributes include everything from health to attack damage, etc.
                // Anything combat related
                //
                // TODO: pass in values?
                // Starting values based on the entity's race / class
                // Note: Timer properties are set in attributes
                attributes: {},

                //Base attributes (copied over when a game starts to allow
                //  for buffs / debuffs)
                //---------------------------
                baseAttributes: {},

                // ==========================
                // AI Related
                //
                // TODO: AI Should be handled OUTSIDE of this model
                // ==========================
                // // TODO: set to null for real game
                aiDelay: 5,

                // list of enemies and their aggro. Key is entity ID, value is
                // aggro value
                aggroList: {},
                
                // ability the entity desires to use. Is handled by the AI
                // function, may change before using (e.g., if health changes)
                desiredAbility: null,

                // desired target is the intended target to use the ability on
                desiredTarget: null
            };
        },
        
        url: function getURL(){
            var url = API_URL + 'entities/' + this.get('id');
            return url;
        },

        initialize: function entityInitialize(options, opts){
            logger.log('models/Entity', 'initialize() called');
            options = options || {};
            var self = this;

            // TODO: get attributes from server
            // set attributes and base attributes from server
            this.set({
                name: generateName(),
                attributes: new EntityAttributes(options.attributes || {})
            }, {silent: true});

            // set base attributes from attributes
            this.set({ baseAttributes: this.get('attributes') },
                {silent: true});

            // TODO: allow setting just some entity attribute attributes

            // TODO: get AIdelay from server
            // TODO: Don't set this for a player
            if(this.attributes.aiDelay === null){
                this.set({ aiDelay: Math.random() * 3 });
            }

            // --------------------------
            // SET ABILITIES FROM CLASS
            // --------------------------
            if(this.get('class')){
                this.set({ abilities: this.get('class').get('abilities') }, { silent: true });
            } else {
                // If entity has no class yet (e.g., character create screen),
                // change abilities when class changes
                this.listenTo(this, 'change:class', function(){
                    self.set({ abilities: self.get('class').get('abilities') });
                });
            }

            // --------------------------
            // Set stats from race
            // --------------------------
            // TODO: ::::::::::::: think more about this, should race ever change?
            // Could have the create screen only change race when process is finished
            if(this.get('race')){
                this.set({ 
                    sprite: this.get('race').get('sprite'),
                    attributes: new EntityAttributes(this.get('race').get('baseStats'))
                });
                this.set({ baseAttributes: this.get('attributes') });

            } else {
                // Entity has no race yet (e.g., create)
                // TODO: ::::::::::: Don't always listen on this - allow
                // race to change (e.g., spell effect) without clearing out
                // stats
                this.listenTo(this, 'change:race', function(){
                    // attributes changed, need to reset listeners
                    self.stopListening(self.get('attributes'));

                    self.set({ 
                        sprite: self.get('race').get('sprite'),
                        attributes: new EntityAttributes(self.get('race').get('baseStats'))
                    });

                    // listen to attributes
                    self.listenTo(
                        self.get('attributes'), 
                        'change:health', 
                        self.healthChanged);

                    // set base attributes from attributes
                    self.set({ baseAttributes: self.get('attributes') });
                });
            }

            // Listen when health drops to 0 or below, trigger entity
            // death event
            // --------------------------
            this.listenTo(
                this.get('attributes'), 
                'change:health', 
                this.healthChanged);

            // When entity dies, remove all buffs
            this.listenTo(
                this,
                'entity:died',
                this.removeAllBuffs);

            return this;
        },

        resetAfterBattle: function resetAfterBattle(){
            // Called after a battle, reset stats to base stats 
            // Also, removes buffs, etc.
            // TODO: This.
            // NOTE: Should be called after the node is finished. Need to
            // update EXP, reset attributes, remove buffs, etc.
            //
            // reset health and other attributes
            this.get('attributes').set(
                this.get('baseAttributes').attributes
            );

            // get rid of the health history
            this.set({ healthHistory: [] });

            // Remove non permanent buffs
            this.removeAllBuffs();
            //
            return this;
        },

        // ==============================
        // TODO: calculate score / difficultly
        // ==============================
        getScore: function getScore(){
            // TODO: get a combat score for this entity based on abilities
            // and states
        },

        // ==============================
        // Buff related
        // ==============================
        hasBuffByName: function hasBuffByName(ability){
            // takes in an ability and returns if the entity already has the
            // buff. NOTE: Use the ability NAME, not an ID. The reason for this 
            // is so that abilities that aren't stackable can't be stacked
            var effects = this.get('activeEffects');
            var i=0, len = effects.length;
            var entityHasBuff = false;

            // find the buff; if it exists, break out of the loop
            for(i=0; i<len; i++){
                if(effects[i].name === ability.name){ 
                    entityHasBuff = true;
                    break;
                }
            }

            logger.log('models/Entity', 'hasBuffByName called : %O', entityHasBuff);
            return entityHasBuff;
        },

        addBuff: function addBuff(ability, source){
            // Takes in an ability and adds the buff effect
            //  TODO: Document How it works
            //
            //
            var self = this;
            logger.log('models/Entity', 'addBuff(): called %O', ability);

            // Add it
            // --------------------------
            var effects = this.get('activeEffects');

            var abilityBuffInstance = ability;

            // Make a copy of the ability if it is stackable, so we can add or
            // remove instances of it
            // if the buff can stack, we need a unique instance of it
            if(ability.attributes.buffCanStack){
                abilityBuffInstance = new Ability( 
                    _.extend({}, ability.attributes) 
                );
            }

            // add to the effecst array
            effects.push(abilityBuffInstance);

            // Update the entity's stats
            // --------------------------
            var updatedStats = {}; // new attributes to set
            // Keep track of the differences between the new value and the old
            // value, used for removing the effect and tracking changes
            var statDifferences = {}; 

            // Add the effect
            var currentStats = this.get('attributes').attributes;

            _.each(abilityBuffInstance.get('buffEffects'), function(val, key){
                if(key !== 'abilities'){
                    // check for % or absolute value
                    if(val > -1 && val < 1){
                        // a percentage
                        updatedStats[key] = currentStats[key] + (currentStats[key] * val);
                    } else {
                        // a whole number
                        updatedStats[key] = currentStats[key] + val;
                    }

                    // keep track of differences
                    statDifferences[key] = updatedStats[key] - currentStats[key];
                }
            });

            // update this model's attributes stats
            this.get('attributes').set(updatedStats);

            // store the updated differences for removal and tracking
            abilityBuffInstance.set({statDifferences: statDifferences}, { silent: true });

            // --------------------------
            // TODO :::::::: Track the stat difference 
            // --------------------------

            // update activeEffects and stats
            this.set({ activeEffects: effects }, {silent: true});
            this.trigger('change:activeEffects', this, abilityBuffInstance.cid, {
                sourceAbility: abilityBuffInstance,
                source: source,
                target: this,
                type: 'add'
            });

            // return the cloned ability
            return abilityBuffInstance;
        },

        removeBuff: function removeBuff(abilityBuffInstance, source){
            // Remove buff effect
            //
            //  Takes in a abilityBuffInstance (the ability instance returned 
            //  in addBuff) and a source entity.
            //      Note: If the ability is NOT stackable, the 
            //      abilityBuffInstance will just be the actual ability object
            //
            //  If found, will remove the effects from the entity
            //
            logger.log('models/Entity', 'removeBuff(): called %O', abilityBuffInstance);
            var effects = this.get('activeEffects');
            var foundAbility = null;

            // remove the FIRST occurence of the targeted ability
            //      abilities are added in order of cast time, so the first
            //      one found is the oldest ability
            for(var i=0, len = effects.length; i<len; i++){
                if(effects[i].cid === abilityBuffInstance.cid){
                    foundAbility = effects.splice(i, 1)[0];
                    break;
                }
            }

            // Update the entity's stats
            // --------------------------
            // Reset the stats with the found ability
            if(foundAbility){
                var updatedStats = {};
                var statDifferences = foundAbility.attributes.statDifferences;

                // Add the effect
                var currentStats = this.get('attributes').attributes;

                _.each(statDifferences, function(difference, key){
                    updatedStats[key] = currentStats[key] - difference;
                });
                this.get('attributes').set(updatedStats);
            }


            logger.log('models/Entity', 'removeBuff(): found it? : %O', !!foundAbility);

            this.set({ activeEffects: effects }, {silent: true});
            this.trigger('change:activeEffects', this, abilityBuffInstance.cid, {
                sourceAbility: abilityBuffInstance,
                source: source,
                target: this,
                type: 'remove'
            });
            return this;
        },

        removeAllBuffs: function removeAllBuffs(){
            // Remove all buffs except class specific buffs
            var activeEffects = this.get('activeEffects');

            // only keep isPermanent buffs
            activeEffects = _.filter(activeEffects, function(effect){
                if(effect.attributes.isPermanent){ return true; }
                else { return false; }
            });

            this.set({ activeEffects: activeEffects });
            return this;
        },

        // ==============================
        //
        // Track damage
        //
        // ==============================
        trackDamage: function(options){
            // Takes in options (same as from healthChange, along with
            // model and health). Keep track of difference in health, along
            // with some data about the change
            //
            // TODO: track damage breakdown
            //
            var healthHistory = this.get('healthHistory');

            var difference = null;

            // check for health / model, and check for source and sourceAbility
            //  These should almost always exist, but this allows an entity 
            //  taking damage from a non entity source
            if(options.health && options.model){
                difference = options.health - options.model._previousAttributes.health;
            }
            var source = options.source || {cid: -1, get: function(){}};
            var sourceAbility = options.sourceAbility || {cid: -1, get: function(){}};

            // add a new history item to beginning of history array
            // update it (NOTE: it's an array, so it's updating in place without
            // triggering a change event)
            healthHistory.unshift({
                element: sourceAbility.get('element'),
                type: sourceAbility.get('type'),
                date: new Date(),
                abilityName: sourceAbility.get('name'),
                entityCID: source.cid,
                entityName: source.get('name'),
                amount: difference
            });

            this.trigger('change:healthHistory', this, this.get('healthHistory'));

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
            //
            // TODO: Track all damage
            // TODO: for res spels, trigger isAlive change, pass in sourceAbility
            // and source
            logger.log('models/Entity', 
                '1. healthChanged() : health ' + health + ' options: %O',
                options);

            // Track damage dealt
            this.trackDamage(_.extend({ model: model, health: health }, options));

            // Check for entity death
            if(health <= 0){
                logger.log('models/Entity', '2. entity is dead!');
                this.set({ isAlive: false }, { 
                    source: options.source,
                    sourceAbility: options.sourceAbility
                });
                
                // TODO: check to see if there is a prevent death buff? Or
                // should it go in take damage?

                // trigger global event to let listeners know entity died
                // TODO:  just listen for change:isAlive, don't need this
                this.trigger('entity:died', {model: this, source: options.source});

                // update number of deaths and kills for the entities
                this.set({
                    deaths: this.get('deaths') + 1
                });
                if(options.source){
                    options.source.set({
                        kills: options.source.get('kills') + 1
                    });
                }
            }

            return this;
        },

        // ------------------------------
        // FORMULA - Damage Multiplier
        // ------------------------------
        calculateDamageMultiplier: function calculateDamageMultiplier(factor, resist){
            // take in a factor (0 to 1) and a resist value (e.g., the entity
            // armor or magic resist or elemental resist value).
            //
            // Same formula for armor and resists
            //
            // Returns the multiplier, a number to multiply the original damage
            // by
            var multiplier;

            if(resist >= 0){
                multiplier = 100 / (100 + (factor * resist) );
            } else {
                multiplier = 2 - (100 / (100 - (factor * resist) ));
            }

            return multiplier;
        },


        // ==============================
        //
        // Take / Deal damage
        //
        // ==============================
        // TODO: Combine takeDamage and takeHeal

        takeDamage: function(options){
            // This function is a helper function for the entity to take damage
            // Alternatively, the ability may manually have the entity take
            // damage (for instance, an ability might do 10% of the entity's
            // health in damage)
            //
            // parameters:
            //  options: {Object} with keys:
            //      sourceAbility: {Ability} ability object
            //      source: {Entity} entity object
            //      amount: {Number} amount of damage to do (is positive)
            //
            logger.log('models/Entity', '1. takeDamage() : options: %O',
                options);

            // if entity is dead, do nothing
            if(!this.get('isAlive')){ 
                logger.log('models/Entity', '[x] entity is dead');
                return false; 
            }

            var attrs = this.get('attributes');

            // TODO: process damage based on passed in damage and type and this
            // entity's stats
            var sourceAbility = options.sourceAbility;
            var sourceEntity = options.source;

            var type = sourceAbility.get('type');
            var element = sourceAbility.get('element');
            var damage = Math.abs(options.amount) * -1;
            var armor = attrs.get('armor');
            var magicResist = attrs.get('magicResist');

            // update attributes
            var curHealth = attrs.get('health');
            var maxHealth = attrs.get('maxHealth');

            // --------------------------
            //
            // process damage
            //
            // --------------------------
            // Get modifier for armor and magic resist
            // update damage with mod
            var moddedDamage = 0,
                physicalDamage, magicDamage;

            // get physical damage and magic damage bonuses based on the source
            // entity's stats
            //
            // functionality is: get base damage, add additional damage based
            // on the source entity's attributes * the % of the physical or magic
            // type
            var bonusDmgFromPhysical = 0;
            var bonusDmgFromMagic = 0;

            // TODO: TRACK DAMAGE

            // Get damage reduction from stats
            if(type.physical){
                // 1. Calculate damage from base damage plus the source's 
                // attack power. Scale the source's bonus attack damage by
                // the % of the type of attack
                //
                // TODO: RENAME - bonusDmgFrom___ is actually just damage
                // TODO: Track how much damage is taken vs. absorbed
                bonusDmgFromPhysical = -1 * (Math.abs(damage) + 
                    // bonus damage
                    (sourceEntity.get('attributes').get('attack') * sourceAbility.attributes.attackBonusPercent)
                );

                // 2. get actual total physical damage done based on armor and damge from source's attack
                physicalDamage = this.calculateDamageMultiplier(type.physical, armor) * (bonusDmgFromPhysical * type.physical);
                // update the moddedDamage 
                moddedDamage += physicalDamage;
            }
            if(type.magic){
                // same as above
                bonusDmgFromMagic = -1 * (Math.abs(damage) + 
                    // bonus
                    (sourceEntity.get('attributes').get('magicPower') * sourceAbility.attributes.magicPowerBonusPercent)
                );

                magicDamage = this.calculateDamageMultiplier(type.magic, magicResist) * (bonusDmgFromMagic * type.magic);
                moddedDamage += magicDamage;
            }

            // TODO: Get value of damage increase from source entity's stats
            // TODO: Get elemental boosts

            // Update the damage to be the calculated modified damage
            damage = moddedDamage;

            // round damage
            damage = Math.round(damage);

            // if damage is POSITIVE, set it to 0
            // (this could happen if entity has negative stats)
            if(damage > 0){ damage = 0; }

            // --------------------------
            // update health
            // --------------------------
            var newHealth = curHealth + damage;

            // TODO: check if there are any buffs that protect from death?

            // If the health drops below 0, the target is dead
            if(newHealth <= 0){ newHealth = 0; }
            // limit health
            if(newHealth > maxHealth){ newHealth = maxHealth; }

            //  -------------------------
            // update the health
            //  pass in the ability that caused the damage
            //  -------------------------
            //  NOTE: if an ability overrides this function, it still must
            //  called the following to update health
            attrs.set({ health: newHealth }, { silent: true });
            
            // we want to manually trigger it, because we want to capture
            // the change in health even if there is not change (e.g., doing
            // 0 damage should still trigger everything)
            attrs.trigger(
                'change:health',
                attrs, attrs.get('health'),
                { 
                    sourceAbility: sourceAbility, 
                    source: options.source
                    // TODO: Pass in damage breakdown
                }
            );

            // NOTE:
            // death event is called in the `healthChanged`, which is called
            // whenever health changes
            logger.log('models/Entity', 'amount received : %O', damage);

            return damage;
        },

        takeTrueDamage: function takeTrueDamage(options){
            // Takes damage, ignoring armor and magic resist. 
            // TODO: Should it not ignore elements?
            var damage = Math.abs(options.amount); 
            damage = Math.round(damage);

            var attrs = this.get('attributes');
            var curHealth = attrs.get('health');

            var newHealth = curHealth - damage;
            
            // TODO: track damage
            //
            //  -------------------------
            // update the health
            //  -------------------------
            attrs.set({ health: newHealth }, { 
                sourceAbility: options.sourceAbility,
                source: options.source
            });

            return damage;
        },
        
        // ------------------------------
        //
        // Heal
        //
        // ------------------------------
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
            attrs.set({ health: newHealth }, {silent: true});
            attrs.trigger(
                'change:health',
                attrs, attrs.get('health'),
                { sourceAbility: sourceAbility, source: options.source }
            );

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
            // TODO: Inherit AI from classes (healer, warrior, etc)
            // TODO: make AI work for players too
            //
            // Params: 
            //  time: {Number} in seconds
            //  battle: {Battle Model}
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
