// ===========================================================================
//
//  AllAbilities Collection
//
//      Loads all abilities and creates a collectino for it
//
// ===========================================================================
define(
    [ 'backbone', 'marionette', 'logger', 'events',
        'models/data-abilities',
        'models/Ability'
    ], function AllAbilitiesCollection(
        Backbone, Marionette, logger, events,
        dataAbilities,
        Ability
    ){

    var AllAbilities = Backbone.Collection.extend({
        model: Ability,

        initialize: function(models, options){
            var self = this;

            logger.log('collections:AllAbilities', 'initialize() called with:', {
                models: models,
                options:options
            });
            options = options || {};

            if(!options.callback){
                logger.log('warn:collections:AllAbilities', 'no callback passed');
            }

            // NOTE: Fetch data from local or server
            setTimeout(function(){
                // turn data to array, and create ability objects from data
                dataAbilities = _.filter(dataAbilities, function(d){ 
                    return new Ability(d); 
                });

                // Get data (for now, use local)
                logger.log('collections:AllAbilities', 'adding data: ', {
                    data: dataAbilities
                });

                self.add( dataAbilities );

                logger.log('collections:AllAbilities', 'added! models: ', {
                    models: self.models
                });

                setTimeout(function(){
                    if(options.callback){
                        // call callback
                        return options.callback(null, self.models);
                    }
                }, 20);

            }, 30);
        }
    });

    return AllAbilities;
});
