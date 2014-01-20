// ===========================================================================
//
// Race
//
//  Model for a race (used in create process)
//
// ===========================================================================
define(
    [ 'events', 'logger', 'util/API_URL' ], function ModelRace(
        events, logger, API_URL
    ){

        // Define the app user model. Similar to user model, but a bit different
        var Race = Backbone.Model.extend({
            defaults: {
                name: 'Race',
                description: 'Some test',
                sprite: 'race',
                baseStats: {
                    // todo: more...
                    agility: 10
                }
            },

            initialize: function appUserInitialize(){
                var self = this;
                logger.log('models/Race', 
                    'initialize: New race object created');

                return this;
            }

        });

    return Race;
});
