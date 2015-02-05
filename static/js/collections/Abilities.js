// ===========================================================================
//
//  Abilities Collection
//
//      This collection is a list of ability models an entity has
//
// ===========================================================================
define(
    [ 'backbone', 'marionette', 'logger', 'events',
        'models/Ability'
    ], function AbilitiesCollection(
        Backbone, Marionette, logger, events,
        Ability
    ){

    var Abilities = Backbone.Collection.extend({
        model: Ability,

        // DATA config
        dataConfig : {
            maxCastTime: 6,
            maxTimeCost: 6,
            maxDamage: 40,
            maxHeal: 40
        },

        initialize: function(models, options){
            logger.log('collections:Abilities', 'initialize() called with:', {
                models: models,
                options:options
            });
            options = options || {};
        }
    });

    return Abilities;
});
