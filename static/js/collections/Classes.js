// ===========================================================================
//
//  Classes Collection
//
//      This collection contains a collection of races for the create screen,
//      the list of available races for the player
// ===========================================================================
define(
    [ 'backbone', 'marionette', 'logger', 'events', 
        'models/EntityClass',
        'models/data-entity-classes'
    ], function EntityClassCollection(
        Backbone, Marionette, logger, events,
        EntityClass,
        ENTITY_CLASSES
    ){

    var Classes = Backbone.Collection.extend({
        model: EntityClass,

        initialize: function(models, options){
            var self = this;
            logger.log('collections/Classes', 'initialize() called');

            // TODO: don't do this, get from server
            this.add(ENTITY_CLASSES);

            return this;
        }

    });

    return Classes;
});
