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
