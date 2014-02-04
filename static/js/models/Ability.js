// ===========================================================================
//
//  Ability
//
//      This model manages a single ability
//
//      TODO: Add an ability rating - a sort of 'score' for how powerful the
//      ability is(?)
//
//      TODO: Allow abilities to be modified (e.g., lower cast time) ( OR, just
//      have some modifier on the entity )
//
// ===========================================================================
define(
    [ 'backbone', 'marionette', 'logger',
        'events', 'd3', 'util/API_URL'
    ], function AbilityModel(
        Backbone, Marionette, logger,
        events, d3, API_URL
    ){

    var Ability = Backbone.Model.extend({
        defaults: {
            name: 'Magic Missle',
            // ID of the effect element
            effectId: null,
            description: 'Textual description of effect',

            // castDuration - measured in seconds
            // how long the spell takes to cast - how long between the source
            // entity using the spell and the target entity receiving the effect
            castDuration: 0.5,

            // how much power the ability costs to use
            // TODO: probably won't use power?  Think on this
            powerCost: 10, 

            // Damage Over Time (DOT) properties
            // ticks: number of times to do the effect
            ticks: 0,
            // time between each tick
            tickDuration: 1,
        
            // How long must the player wait until they can use this ability
            // This SHOULD always be greater than or equal to than the timeCost
            //  (e.g., if you need to wait 3 seconds to cast it but the cost is 4
            //  seconds, you'll have negative time)
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

            // validTargets specifies the entities the ability can be
            // used on. for now, only 'enemy' or 'player' are valid targets. 
            validTargets: ['enemy'],
        
            // type / subtype
            // --------------------------
            // type could be either 'magic' or 'physical'
            type: 'magic',
            // TODO: allow multiple subtypes and percentages for sub types
            // subtypes are:
            //  arcane, fire, light, dark, earth, air, water, or physical (for physical)
            subType: 'fire',

            // Damage
            // --------------------------
            damage: undefined,
            // could be either 'source' or 'target', will damage the entities
            // that are either the source or target of the used ability
            damageTarget: 'target',

            // Heal
            // --------------------------
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
            // can be either 'target' (allows player to target an entity,
            //  including self) or 'self' (only works on self)
            buffTarget: 'target',

            visualEffect: function(options){
                //TODO: figure this out...should have some way of doing an
                //effect, but should it live here?
            }
            
        },

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
            var amount = 0;

            // note: multiply castDuration by 1000 (it's in seconds, we
            // need to get milliseconds)
            // TODO: lower delay if the target has some sort of delay reducting
            // stats
            var delay = this.get('castDuration') * 1000;


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
            if(this.get('heal')){
                setTimeout(function effectHealDelay(){
                    function takeHeal(){
                        amount = options[self.get('healTarget')].takeHeal({
                            type: self.get('type'),
                            subType: self.get('subType'),
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
                            setTimeout( takeHeal,
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
                setTimeout(function effectDamageDelay(){
                    function takeDamage(){
                        amount = options[self.get('damageTarget')].takeDamage({
                            type: self.get('type'),
                            subType: self.get('subType'),
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
                            setTimeout( takeDamage,
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

                setTimeout(function effectBuff(){

                    // Add the effect
                    var currentStats = options[self.get('buffTarget')].get(
                        'attributes').attributes;

                    // TODO::::: Should the logic be handled there instead of
                    // here? If in entity model, a lot of default logic
                    // has to be handled there. If it's in the ability, can
                    // customzie / tailor it more
                    // TODO: stacking?
                    //
                    // ADD Buff
                    // ------------------
                    // add it to the buff list
                    options[self.get('buffTarget')].addBuff(self);
                    var updatedStats = {};

                    // update based on effects
                    _.each(self.get('buffEffects'), function(val, key){
                        updatedStats[key] = currentStats[key] + val;
                    });
    
                    // update the stats
                    options[self.get('buffTarget')].get('attributes').set(
                        updatedStats
                    );

                    // Remove it after the duration
                    // ------------------
                    setTimeout(function removeBuff(){
                        // remove effect
                        options[self.get('buffTarget')].removeBuff(self);

                        // remove the stats
                        var currentStats = options[self.get('buffTarget')].get(
                            'attributes').attributes;
                        var updatedStats = {};

                        // update based on effects
                        _.each(self.get('buffEffects'), function(val, key){
                            updatedStats[key] = currentStats[key] - val;
                        });
        
                        // update the stats
                        options[self.get('buffTarget')].get('attributes').set(
                            updatedStats
                        );

                        if(options.callback){ options.callback(); }

                    // TODO: Allow the buffDuration to be modified by the
                    // entity's properties.
                    }, self.get('buffDuration') * 1000);
                    
                }, delay);

            }

            return amount;
        },
        
        url: function getURL(){
            var url = API_URL + 'abilities/' + this.get('id');
            return url;
        },

        initialize: function gameInitialize(options){
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
                }, { silent: false });
            }

            // if the model is updated and a new effect attribute is set,
            // update the effect method
            this.on('change:effect', function(model, effect){
                this.effect = effect;
            });

            return this;
        }

    });

    return Ability;
});
