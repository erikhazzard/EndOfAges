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
        'className': 'game-battle-wrapper',

        itemViewOptions: function(model){
            return {index: this.collection.indexOf(model)};
        },

        initialize: function battleViewInitialize(options){
            logger.log('views/subviews/battle/AbilityList', 
            'initialize() called');

            return this;
        }
    });

    return AbilityList;
});
