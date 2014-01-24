// ===========================================================================
//
// Ability List
//
// Collection for classes in the create screen
//
// ===========================================================================
define(
    [ 
        'd3', 'logger', 'events', 
        'views/create/AbilityListItem'
    ], function viewAbilityListCollection(
        d3, logger, events,
        AbilityListItem
    ){

    var AbilityListCollection = Backbone.Marionette.CollectionView.extend({
        'className': 'ability-list',

        itemView: AbilityListItem,

        initialize: function(options){
            logger.log(
                'views/create/AbilityList.js', 
                'collectionView initialized : %O', options);
            this.itemView = AbilityListItem;
            return this;
        }
    });

    return AbilityListCollection;
});
