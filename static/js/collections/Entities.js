// ===========================================================================
//
//  Entities Collection
//
//      This collection contains entities - i.e., it is the members in
//      a player's or enemy's party 
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

        initialize: function(models, options){
            var self = this;
            logger.log('collections/Entities', 'initialize() called');

            // store the entity group ('player' or 'enemy')
            options = options || {};
            if(options.group){
                this.group = options.group;
            }

            // When an entity dies, listen for the event
            _.each(models, function(model){
                self.listenTo(model, 'entity:died', self.entityDied);
            });
        },

        entityDied: function(options){
            // This is called whenever an individual entity in the collection
            // dies. If all entities have died, trigger the corresponding event
            var self = this;
            logger.log('collections/Entities', 
                '1. entityDied() called');

            // if all the entities are dead, trigger event
            var numDead = 0;
            _.each(this.models, function(model){
                if(!model.get('isAlive')){
                    numDead += 1;
                }
            });

            if(numDead === this.models.length){
                logger.log('collections/Entities', 
                '2. All entities are dead. triggering entityGroup:defeated');

                this.trigger('entityGroup:defeated', { collection: this });
            }

            return this;
        }
    });

    return Entities;
});
