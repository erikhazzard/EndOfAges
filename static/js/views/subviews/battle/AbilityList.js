// ===========================================================================
//
// Battle - Ability List subview
//      View for an ability list
//
//  Shows the available abilities for an entity
//
// ===========================================================================
define(
    [ 
        'd3', 'backbone', 'marionette', 'logger', 'events',
        'views/subviews/battle/AbilityItem'
    ], function viewBattleAbility(
        d3, backbone, marionette, logger, events,
        AbilityItem
    ){

    var AbilityList = Backbone.Marionette.CollectionView.extend({
        itemView: AbilityItem,
        'className': 'ability-list-wrapper',

        itemViewOptions: function(model){
            return {index: this.collection.indexOf(model)};
        },

        initialize: function battleViewInitialize(options){
            logger.log('views/subviews/battle/AbilityList', 
            'initialize() called');

            // keep track of what entity this ability list is for
            this.entityModel = options.entityModel;

            // if an entity died when this view is rendered, update the template
            this.listenTo(this.entityModel, 'entity:died', this.entityDied);
            return this;
        },

        onShow: function(){
            if(!this.entityModel.get('isAlive')){
                this.$el.append('<div class="entity-dead"></div>');
            }

            return this;
        },

        entityDied: function entityDied(options){
            logger.log('views/subviews/battle/AbilityList', 
            'entityDied() : bluring abilities');

            this.$el.append('<div class="entity-dead"></div>');

            return this;
        }
    });

    return AbilityList;
});
