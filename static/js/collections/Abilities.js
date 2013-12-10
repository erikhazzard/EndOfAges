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

        initialize: function(){
            logger.log('collections/Abilities', 'initialize() called');
        }
    });

    return Abilities;
});
