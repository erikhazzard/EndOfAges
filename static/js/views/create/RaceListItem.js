// ===========================================================================
//
// Race List Item
//
// ItemView for race item
//
// ===========================================================================
define(
    [ 
        'd3', 'logger', 'events'
    ], function viewRaceListItem(
        d3, logger, events
    ){

    var RaceListItem = Backbone.Marionette.ItemView.extend({
        'className': 'race-list-item',
        template: '#template-create-race-list-item',

        serializeData: function(){
            return _.extend({ cid: this.model.cid }, this.model.toJSON());
        },

        initialize: function(){
            logger.log('views/create/RaceListItem', 'initialize : model %O',
                this.model);
            return this;
        },

        onShow: function(){
            return this;
        }

    });

    return RaceListItem;
});
