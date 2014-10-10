// ===========================================================================
//
// Classes List
//
// Collection for races in the create screen
//
// ===========================================================================
define(
    [ 
        'd3', 'logger', 'events', 
        'views/create/ClassListItem'
    ], function viewClassListCollection(
        d3, logger, events,
        ClassListItem
    ){

    var ClassListCollection = Backbone.Marionette.CollectionView.extend({
        'className': 'classes-list',

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
