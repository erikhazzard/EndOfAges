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
    ], function MapModel(
        Backbone, Marionette, logger,
        events, d3, API_URL
    ){

    var Ability = Backbone.Model.extend({
        defaults: {
            name: 'Magic Missle',

            // how much power the ability costs to use
            powerCost: 10,
        
            // How long must the player wait until they can use this ability?
            // Measured in seconds
            // This SHOULD always be greater than or equal to than the timeCost
            //  (e.g., if you need to wait 3 seconds to cast it but the cost is 4
            //  seconds, you'll have negative time)
            castTime: 1,

            // How much this ability costs in time units. Normally, this
            // is the same as the cast time
            // Measured in seconds
            timeCost: 1,

            // validTargets specifies the entities the ability can be
            // used on. for now, only 'enemy' or 'player' are valid targets. 
            validTargets: ['enemy', 'player'],
        
            // TODO: how to handle AoE?

            // effect is always an object that is always in the following
            // format:
            effect: function(options){
                // options can contain the following keys:
                //
                //  target: target(s) of effect
                //      {Object} or {Array of {Objects}}, object being an entity
                //
                //  source: source of effect
                //      {Object} - an entity
                //
                // The function body will be unique to each effect
                //
                // TODO: how to call a damage / heal method? Same method?
                //      how to do AoE damage? 
                logger.log('models/Ability', 
                    '>> DEFTAUL ABILITY USED : %O', options);

                // return the amount of damage dealt
                return options.target.takeDamage({
                    type: 'combat',
                    subType: 'crushing',
                    damage: 40
                });
            },

            visualEffect: function(options){
                //TODO: figure this out...should have some way of doing an
                //effect, but should it live here?
            }
            
        },
        
        url: function getURL(){
            var url = API_URL + 'abilities/' + this.get('id');
            return url;
        },

        initialize: function gameInitialize(){
            logger.log('models/Ability', 'initialize() called');

            return this;
        }

    });

    return Ability;
});
