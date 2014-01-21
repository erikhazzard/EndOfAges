// ===========================================================================
//
// EntityClass
//
//  Model for a race (used in create process)
//
// ===========================================================================
define(
    [ 'events', 'logger', 'util/API_URL' ], function ModelEntityClass(
        events, logger, API_URL
    ){

        // Define the app user model. Similar to user model, but a bit different
        var EntityClass = Backbone.Model.extend({
            defaults: {
                name: '',
                description: '',
                sprite: '',
                baseStats: {
                    // todo: more...
                    agility: 10
                }
            },

            initialize: function appUserInitialize(){
                var self = this;
                logger.log('models/EntityClass', 
                    'initialize: New entity class object created');

                return this;
            }

        });

    return EntityClass;
});
