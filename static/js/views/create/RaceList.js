// ===========================================================================
//
// Races List
//
// Collection for races in the create screen
//
// ===========================================================================
define(
    [ 
        'd3', 'logger', 'events', 
        'views/create/RaceListItem'
    ], function viewRaceListCollection(
        d3, logger, events,
        RaceListItem
    ){

    var RaceListCollection = Backbone.Marionette.CollectionView.extend({
        'className': 'races-list',

        itemView: RaceListItem,

        initialize: function(options){
            logger.log(
                'views/create/RaceList.js', 
                'collectionView initialized : %O', options);
            this.itemView = RaceListItem;

            return this;
        }
    });

    return RaceListCollection;
});
