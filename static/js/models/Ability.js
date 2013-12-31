// ===========================================================================
//
//  Ability
//
//      This model manages a single ability
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

            // castDuration - measured in seconds
            // how long the spell takes to cast
            castDuration: 0.5,

            // how much power the ability costs to use
            // TODO: probably won't use power
            powerCost: 10,
        
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
            timeCost: 1,

            // validTargets specifies the entities the ability can be
            // used on. for now, only 'enemy' or 'player' are valid targets. 
            validTargets: ['enemy', 'player'],
        
            // Damage
            // --------------------------
            damage: undefined,
            // could be either 'source' or 'target', will damage the entities
            // that are either the source or target of the used ability
            damageTarget: 'target',

            // type could be either 'magic' or 'physical'
            type: 'magic',
            // TODO: allow multiple subtypes
            // subtypes are:
            //  arcane, fire, light, dark, earth, air, water, or physical (for physical)
            subType: 'fire',

            // Heal
            // --------------------------
            heal: undefined,
            // could be either 'source' or 'target', will heal the entities
            // that are either the source or target of the used ability
            healTarget: 'target',

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
            // The function body may be unique to each effect
            var self = this;
            //
            logger.log('models/Ability', 
                '>> DEFAULT ABILITY USED : this: %O, options: %O', 
                this,
                options);
            var amount = 0;
            var delay = this.get('castDuration') * 1000;
            // TODO: lower delay if the target has some sort of delay reducting
            // stats

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
                    amount = options[self.get('healTarget')].takeHeal({
                        type: self.get('type'),
                        subType: self.get('subType'),
                        amount: self.get('heal'),
                        sourceAbility: self
                    });
                    if(options.callback){ options.callback(amount); }
                }, delay);
                // note: multiply castDuration by 1000 (it's in seconds, we
                // need to get milliseconds)
            }

            // Then, handle damage effect
            if(this.get('damage')){
                setTimeout(function effectDamageDelay(){
                    amount = options[self.get('damageTarget')].takeDamage({
                        type: self.get('type'),
                        subType: self.get('subType'),
                        amount: self.get('damage'),
                        sourceAbility: self
                    });
                    if(options.callback){ options.callback(amount); }
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
