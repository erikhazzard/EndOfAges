// ===========================================================================
//
// AllAbility List
//
// Collection for classes in the create screen
//
// ===========================================================================
define(
    [ 
        'd3', 'logger', 'events', 
        'views/create/AllAbilitiesListItem'
    ], function viewAllAbilityListCollection(
        d3, logger, events,
        AllAbilityListItem
    ){

    var AllAbilityListCollection = Backbone.Marionette.CollectionView.extend({
        'className': 'all-ability-list',

        itemView: AllAbilityListItem,

        initialize: function(options){
            logger.log(
                'views/create/AllAbilityList.js', 
                'collectionView initialized : %O', options);
            this.itemView = AllAbilityListItem;
            return this;
        }
    });

    return AllAbilityListCollection;
});
