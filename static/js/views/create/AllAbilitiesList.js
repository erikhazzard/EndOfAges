// ===========================================================================
//
// Class List
//
// Collection for classes in the create screen
//
// ===========================================================================
define(
    [ 
        'd3', 'logger', 'events', 
        'views/create/AllAbilitiesListItem'
    ], function viewClassListCollection(
        d3, logger, events,
        ClassListItem
    ){

    var ClassListCollection = Backbone.Marionette.CollectionView.extend({
        'className': 'class-list',

        itemView: ClassListItem,

        initialize: function(options){
            logger.log(
                'views/create/ClassList.js', 
                'collectionView initialized : %O', options);
            this.itemView = ClassListItem;
            return this;
        }
    });

    return ClassListCollection;
});
