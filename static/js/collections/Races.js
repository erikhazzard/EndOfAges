// ===========================================================================
//
//  Races Collection
//
//      This collection contains a collection of races for the create screen,
//      the list of available races for the player
// ===========================================================================
define(
    [ 'backbone', 'marionette', 'logger', 'events', 
        'models/Race',
        'models/data-races'
    ], function RaceCollection(
        Backbone, Marionette, logger, events,
        Race,
        RACES
    ){

    var Races = Backbone.Collection.extend({
        model: Race,

        initialize: function(models, options){
            var self = this;
            logger.log('collections/Races', 'initialize() called');

            // TODO: don't do this, get from server
            this.add(RACES);

            return this;
        }

    });

    return Races;
});
