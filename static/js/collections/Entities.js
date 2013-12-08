// ===========================================================================
//
//  Entities Collection
//
//      This collection contains entities - i.e., it is the members in
//      a player's (or enemy's) party 
//
// ===========================================================================
define(
    [ 'backbone', 'marionette', 'logger', 'events', 'async',
        'models/Entity'
    ], function EntitiesCollection(
        Backbone, Marionette, logger, events, async,
        Entity
    ){

    var Entities = Backbone.Collection.extend({
        model: Entity,

        initialize: function(){
            logger.log('collections/Entities', 'initialize() called');
        }
    });

    return Entities;
});
