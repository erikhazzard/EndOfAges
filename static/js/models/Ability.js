// ===========================================================================
//
//  Ability
//
//      This model manages a single ability
//
//      TODO: Add an ability rating - a sort of 'score' for how powerful the
//      ability is(?)
//
//      TODO::::::::::: Implement buff effect tracking, similar to entity's 
//      method
//
// ===========================================================================
define(
    [ 'backbone', 'marionette', 'logger',
        'events', 'd3', 'util/API_URL',
        'util/Timer',
        'util/generateUUID'
    ], function AbilityModel(
        Backbone, Marionette, logger,
        events, d3, API_URL,
        Timer,
        generateUUID
    ){

    var Ability = Backbone.Model.extend({
        defaults: function(){
            return {
                name: 'Magic Missle',

                // ID used to identify the ability as well as the name of the
                // icon file
                id: 'magic-missle',

                // spell type (for labels)
                spellTypes: [], // or heal, debuff, buff, util, etc

                // Keep track of buffs / effects that affect the ability object
                activeEffects: [],

                // ID of the effect element
                effectId: 'placeHolder',
                // sprite for icon itself
                sprite: '',

                description: 'PLACEHOLDER TEXT :::::::::::',

                // How long must the player wait until they can use this ability
                // This SHOULD always be greater than or equal to than the timeCost
                //  (e.g., if you need to wait 3 seconds to cast it but the cost is 4
                //  seconds, you'll have negative time)
                //
                //  This property determines if the entity can cast the spell or
                //  not. If the castTime is >= the current tick counter,
                //  entity can cast
                //
                // Measured in seconds
                castTime: 1,
                // How much this ability costs in time units. Normally, this
                // is the same as the cast time. THIS property is subtracted from
                // the entity's timer.
                // This may be lower than the cast time (e,g., if a spell takes a
                // while to cast but doesn't take down the timer much - maybe not
                // as powerful a spell)
                //
                // Measured in seconds
                timeCost: null, // By default, will be set to castTime

                // castDuration - measured in seconds
                // how long the spell takes to cast - how long between the source
                // entity using the spell and the target entity receiving the effect
                castDuration: 0.5,

                // How long (in seconds) the user must wait before using the
                // ability again
                cooldown: 0.1,

                // validTargets specifies the entities the ability can be
                // used on. for now, only 'enemy' or 'player' are valid targets. 
                validTargets: ['enemy'],
            
                // type / subtype
                // --------------------------
                // type could be either 'magic' or 'physical'
                //  Can be either a {string}, representing 100% of the type, or
                //  an object with keys consisting of the types (e.g., 
                //      {physical: 0.7, magic: 0.3}
                //
                type: { magic: 1 },
                // This is also valid: (will be transformed to an object)
                // type: 'magic', 

                // TODO: allow multiple subtypes and percentages for sub types
                //
                // subtypes are:
                //  none (e.g., purely physical), fire, light, dark, earth, air, water
                //  Can be either a {string}, representing 100% of the element, or
                //  an object with keys consisting of the element types along
                //  with a number that combined will add to 1.0
                element: {fire: 1},
                // This is also valid: (will be transformed to an object)
                // element: 'fire'

                // Bonus from entity's attack and / or magicPower
                //  (e.g., an ability may do 10 base damage + 50% of entity's attack)
                // --------------------------
                // values are from 0 to 1
                attackBonusPercent: 0,
                magicPowerBonusPercent: 0,

                // Damage
                // --------------------------
                // Base damage
                damage: undefined,
                // could be either 'source' or 'target', will damage the entities
                // that are either the source or target of the used ability
                damageTarget: 'target',

                // DOT
                // ----------------------
                // Damage Over Time (DOT) properties
                // ticks: number of times to do the effect
                ticks: 0,
                // time between each tick (seconds)
                tickDuration: 1,

                // Heal
                // --------------------------
                // Base Heal
                heal: undefined,
                // could be either 'source' or 'target', will heal the entities
                // that are either the source or target of the used ability
                //      (source would be a self heal, target heals other)
                healTarget: 'target',

                // Buffs
                // --------------------------
                // This is an example static buff. Will temporarily boost an 
                // entity's stats for the passed in duration
                buffEffects: null, // Will look like { strength : -10, agility: 10 }
                buffDuration: null, // in seconds

                buffCanStack: false, // can this buff stack with itself?

                // used to keep track of start date of NON stackable buffs
                _buffStartDate: null, 

                // can be either 'target' (allows player to target an entity,
                //  including self) or 'self' (only works on self)
                buffTarget: 'target',

                visualEffect: function(options){
                    //TODO: figure this out...should have some way of doing an
                    //effect, but should it live here?
                },

                // Meta
                // --------------------------
                // meta is an arbitrary object containing various properties,
                // e.g., used for sorting abilities in character create
                meta: {},

                // keep track of last cast time (for cooldown)
                _lastUseTime: null
            };
        },
        
        url: function getURL(){
            var url = API_URL + 'abilities/' + this.get('id');
            return url;
        },

        initialize: function gameInitialize(options){
            // TODO: Restructure, get abilities from server.
            // TODO: Allow ability to be modified. Store base stats(?) e.g., 
            //  duration, cast time, etc.
            //
            var self = this;
            options = options || {};
            logger.log('models/Ability', 
                'initialize() called : attributes: %O : options: %O',
                this.attributes, options);

            // if an effect attributes was passed in, updat the method
            if(options.effect){ this.effect = options.effect; }

            // set timeCost if it is not passed in
            if(this.attributes.timeCost === null){
                this.set({
                    timeCost: this.get('castTime')
                }, { silent: true });
            }


            // set type and element
            var newType={}; 
            if(typeof this.attributes.type === 'string'){
                newType[this.attributes.type] = 1;
                this.set({ type: newType }, {silent: true});
            }
            
            var newElement={}; 
            if(typeof this.attributes.element === 'string'){
                newElement[this.attributes.element] = 1;
                this.set({ element: newElement }, {silent: true});
            }

            // if the model is updated and a new effect attribute is set,
            // update the effect method
            this.on('change:effect', function(model, effect){
                this.effect = effect;
            });

            return this;
        },

        getCastDuration: function getDelay(options){
            // returns, in seconds, the delay before ability should take effect
            // TODO: lower delay if the target has some sort of delay reducting
            // stats
            //
            return this.get('castDuration') * 1000;
        },

        canBeUsed: function canBeUsed(){
            // returns a {boolean} indicating if the ability can be used
            var canUse = true;

            if(this.get('cooldown')){
                // If there's a cooldown, and the difference between now and
                // the _lastUseTime is less than the cooldown, it cannot be
                // used yet
                if(new Date() - this.get('_lastUseTime') < (this.get('cooldown') * 1000)){
                    canUse = false;
                }
            } 

            return canUse;
        },

        // ------------------------------
        // Default ability effect (NOTE: can be overriden for custom abilities)
        // ------------------------------
        effect: function(options){
            // NOTE: This is the default effect function. If no effect attribute
            // is passed into the model, , it will use this function, which 
            // calculates damage based on model attributes. This function can 
            // be overriden
            //
            // TODO: Does it need to be? How to handle DoT? Buffs?
            // 
            // options can contain the following keys:
            //
            //  target: target(s) of effect
            //      {Object} or {Array of {Objects}}, object being an entity
            //
            //  source: source of effect
            //      {Object} - an entity
            //
            //  callback: optional callback {Function} 
            //      NOTE: This is the default effect method, so in this case
            //      the callback will be called after each damage / health /
            //      buff section. 
            //
            // The function body may be unique to each effect
            var self = this;

            logger.log('models/Ability', 
                '>> DEFAULT ABILITY USED : this: %O, options: %O', 
                this,
                options);

            // Check if ability can be used
            if(!this.canBeUsed()){
                logger.log('models/Ability', 'cannot cast, cooldown not yet met');
                return false;
            }

            // note: multiply castDuration by 1000 (it's in seconds, we
            // need to get milliseconds)
            var delay = this.getCastDuration(options);

            // keep track of when spell was last cast. Do it immediately (don't
            // wait for the delay before setting time)
            this.set({ _lastUseTime: new Date() });

            // TODO : restructure, break functionality up

            // --------------------------
            // Heal
            // --------------------------
            // TODO: To damage or heal multiple targets, just call it on the passed
            // in targets
            //
            // NOTE: Handle heal effect first
            //
            // NOTE: The takeHeal / takeDamage methods on the target entity
            // should be called on a delay, the delay being the `castDuration`.
            // If a spell takes 2 seconds to cast, the effect shouldn't occur
            // until 2 seconds after it was activated
            //
            // TODO: How to precent takeHeal() or takeDamage from doing anything
            // if the ability is interuppted? Set some property on this model?
            // Check property in the takeXX() function?
            // 
            // TODO: should heal WITH buffeffects still happen? Or should
            // the buff effect itself manage a heal. For now, handle healing
            // in the buff itself (not here, so check that buffEffects is null)
            if(this.get('heal') && !this.get('buffEffects')){
                new Timer(function effectHealDelay(){
                    function takeHeal(){
                        options[self.get('healTarget')].takeHeal({
                            type: self.get('type'),
                            element: self.get('element'),
                            amount: self.get('heal'),
                            sourceAbility: self,
                            target: options.target,
                            source: options.source
                        });
                    }
                    takeHeal();

                    // Setup for DoTs
                    var curTick = 0;
                    if(self.get('ticks')){
                        while(curTick < self.get('ticks')){
                            new Timer( takeHeal,
                                (self.get('tickDuration') * 1000) * (curTick + 1) 
                            );
                            curTick += 1;
                        }
                    }

                    if(options.callback){ options.callback(); }
                }, delay);
            }

            // --------------------------
            // Damage
            // --------------------------
            if(this.get('damage')){
                new Timer(function effectDamageDelay(){
                    function takeDamage(){
                        options[self.get('damageTarget')].takeDamage({
                            type: self.get('type'),
                            element: self.get('element'),
                            amount: self.get('damage'),
                            sourceAbility: self,
                            target: options.target,
                            source: options.source
                        });
                    }
                    takeDamage();

                    // Setup for DoTs
                    var curTick = 0;
                    if(self.get('ticks')){
                        while(curTick < self.get('ticks')){
                            new Timer( takeDamage,
                                (self.get('tickDuration') * 1000) * (curTick + 1) 
                            );
                            curTick += 1;
                        }
                    }

                    if(options.callback){ options.callback(); }
                }, delay);
            }

            // --------------------------
            // Buffs
            // --------------------------
            if(this.get('buffEffects')){

                new Timer(function effectBuff(){
                    // TODO::::: Should the logic be handled there instead of
                    // here? If in entity model, a lot of default logic
                    // has to be handled there. If it's in the ability, can
                    // customzie / tailor it more
                    var targetEntity = options[self.get('buffTarget')];
                    // should the buff timer be reset? This will only be true
                    // if this ability does NOT stack AND is already active
                    var resetTimer = false;

                    if(!self.get('buffCanStack')){
                        // If the buff cannot stack with itself, then check
                        // to see if the effect already exists
                        //
                        if(targetEntity.hasBuffByName(self)){
                            logger.log('models/Ability', 
                                '[x] buff already exists %O : removing and re-adding', self);
                            // remove the buff so we can re-apply it
                            self.removeBuffEffect.call(self, targetEntity, options.source);

                            // remove all ability buff effects
                            if(self.attributes.buffEffects && 
                            self.attributes.buffEffects.abilities && 
                            targetEntity.get('abilities')){
                                logger.log('models/Ability', 'removing all ability buff effects from non-stackable buff');
                                // remove existing ability buff modifiers 
                                _.each(targetEntity.get('abilities').models, function(ability){
                                    // pass in this ability so other abilities can have
                                    // their properties modified 
                                    _.each(ability.get('activeEffects'), function(abilityBuffEffect){
                                        ability.removeBuff.call(
                                            ability,
                                            abilityBuffEffect,
                                            options.source
                                        );
                                    });
                                });
                            }

                            resetTimer = true;
                        }

                        // set the time the buff was applied
                        self.set({ _buffStartDate: new Date() }, { silent: true });
                    }

                    // Check for heals
                    // ------------------
                    if(self.get('heal')){
                        function takeHeal(){
                            options[self.get('healTarget')].takeHeal({
                                type: self.get('type'),
                                element: self.get('element'),
                                amount: self.get('heal'),
                                sourceAbility: self,
                                target: options.target,
                                source: options.source
                            });
                        }
                        takeHeal();
                    }
                    // ------------------
                    // TODO: Check for damage?
                    // ------------------


                    // ------------------
                    // ADD Buff
                    // ------------------
                    // add it to the buff list
                    logger.log('models/Ability', 'adding buff %O', self);

                    // add the buff, which returns a clone of the ability object
                    //  we need to do this so we can track unique stackable
                    //  buff effects and remove the correct buff
                    var buffInstance = targetEntity.addBuff(self, options.source);


                    // Keep track of buff effects on the ability itself
                    var abilityBuffInstances = [];

                    // Add buff /debuff effect to the ability if the buffeffects
                    // contain abilities properties
                    if(self.attributes.buffEffects && 
                    self.attributes.buffEffects.abilities && 
                    targetEntity.get('abilities')){
                        // call addBuff for each of the target entity's abilities
                        _.each(targetEntity.get('abilities').models, function(ability){
                            // pass in this ability so other abilities can have
                            // their properties modified 
                            abilityBuffInstances.push({
                                instance: ability.addBuff.call(ability, self, targetEntity, options.source),
                                ability: ability,
                                targetEntity: targetEntity,
                                source: options.source
                            }); 
                        });
                    }


                    // ------------------
                    // REMOVE Buff
                    // ------------------
                    // TODO: Allow the buffDuration to be modified by the
                    // entity's properties.
                    var buffDuration = self.get('buffDuration') * 1000;

                    if(self._buffCancelTimer && resetTimer){
                        self._buffCancelTimer.pause();
                        self._buffCancelTimer.remaining = buffDuration;
                        self._buffCancelTimer.resume();
                    } else { 
                        // cancel timer does not yet exist, create it
                        self._buffCancelTimer = new Timer(function buffCancelTimer(){
                            // remove effect
                            logger.log('models/Ability', 'removing buff');
                            
                            // if entity is dead, do nothing
                            if(!targetEntity.get('isAlive')){ 
                                logger.log('models/Ability', 
                                    'tried to remove buff, but entity is dead %O',
                                    self);
                                return false; 
                            }

                            // remove the buff
                            self.removeBuffEffect.call(self, 
                                targetEntity, 
                                options.source,
                                buffInstance
                            );

                            // remove each buff instance from the ability
                            _.each(abilityBuffInstances, function removeAbiltiyBuffInstance(options){
                                // remove it
                                options.ability.removeBuff.call(
                                    options.ability, // context
                                    options.instance, // buff instance
                                    options.source // source 
                                );
                            });

                            // remove references
                            abilityBuffInstances.length = 0;

                            if(options.callback){ options.callback(); }

                        }, buffDuration);
                    }
                    
                }, delay);

            }

            // NOTE: this function makes async calls, don't rely on the return
            // value for anything
            return this;
        },

        // ==============================
        // Buff helpers
        // ==============================
        removeBuffEffect: function removeBuffEffect(targetEntity, source, buffInstance){
            // Reset the stats to the pre buff values
            var self = this;

            // if no buff instance was passed in, it means the ability can NOT 
            // stack, so no need to create a unique ID for it
            buffInstance = buffInstance || this;

            //remove buff from entity
            targetEntity.removeBuff.call(targetEntity, buffInstance, source);

            return this;
        },

        // ==============================
        //
        // Buff related
        //
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

            logger.log('models/Ability', 'hasBuffByName called : %O', entityHasBuff);
            return entityHasBuff;
        },

        addBuff: function addBuff(sourceAbility, targetEntity, source){
            // Modifies *this* ability's properties based on the properties 
            // defined in `abilities` in `buffEffects` of the passed in ability
            //
            // Takes in a target entity and source entity
            //
            //
            // TODO: Modify based on entity stats?
            //
            var self = this;
            logger.log('models/Ability', 'addBuff(): called : source :%O, this: %O', 
                sourceAbility, this);

            // Add it
            // --------------------------
            var effects = this.get('activeEffects');

            // Clone the passed in ability
            // NOTE: Use a basic backbone model; we only need to keep track of
            // property values, don't need the overhead of all the other methods
            //
            // Futhermore, it shouldn't be thought of as an actual Ability object,
            // it's essentially just a property store to keep track of stat
            // differences
            var abilityBuffInstance = new Backbone.Model( 
                _.extend({}, sourceAbility.attributes) 
            );
            // remove the activeEffects on the instance to avoid recursion
            abilityBuffInstance.set({ activeEffects: null }, { silent: true });

            // if the buff cannot stack, the cid should be the same as original
            if(!sourceAbility.attributes.buffCanStack){
                abilityBuffInstance.cid = sourceAbility.cid;
            }

            // add to the effects array
            effects.push(abilityBuffInstance);
            
            // Update the entity's stats
            // --------------------------
            var updatedStats = {}; // new attributes to set
            // Keep track of the differences between the new value and the old
            // value, used for removing the effect and tracking changes
            var statDifferences = {}; 

            // Add the effect
            var currentStats = this.attributes;

            // stats to affect
            var abilityEffects = abilityBuffInstance.attributes.buffEffects.abilities;

            _.each(abilityEffects, function(val, key){
                // ignore buffEffects key, just as a safety catch
                if(key === 'buffEffects'){ return false; }

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
            });

            // update this ability's properties based on the changes described
            // in the passed in ability
            this.set(updatedStats);

            // store the updated differences for removal and tracking
            // (note: this object is pushed to the effects array, so the 
            // reference is updated)
            abilityBuffInstance.set({statDifferences: statDifferences}, { silent: true });

            // update activeEffects and stats
            this.set({ activeEffects: effects }, {silent: true});
            this.trigger('change:activeEffects', this, abilityBuffInstance.cid, {
                sourceAbility: sourceAbility,
                source: source,
                target: targetEntity,
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
            logger.log('models/Ability', 'removeBuff(): called %O', abilityBuffInstance);
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
                var currentStats = this.attributes;

                _.each(statDifferences, function(difference, key){
                    updatedStats[key] = currentStats[key] - difference;
                });
                this.set(updatedStats);
            }


            logger.log('models/Ability', 'removeBuff(): found it? : %O', !!foundAbility);

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
        }

    });

    return Ability;
});
