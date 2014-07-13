// ===========================================================================
//
// Entity Info
//
//  View for Entity Info      
//
// ===========================================================================
define(
    [ 
        'd3', 'backbone', 'marionette',
        'logger', 'events'
    ], function viewMap(
        d3, backbone, marionette, 
        logger, events
    ){

    var EntityInfo = Backbone.Marionette.Layout.extend({
        template: '#template-game-map-entity-info',
        events: { },
        id: 'map-entity-info',

        serializeData: function(){
            return { model: this.model };

            return _.extend({
                model: this.model
            }, this.model.toJSON());
        },

        initialize: function entityInfoInit(options){
            logger.log('views/map/EntityInfo', 'initialize() called');
            return this;
        },

        onShow: function entityInfoShow(options){
            logger.log('views/map/EntityInfo', 'onShow() called');
            return this;
        }
    });

    return EntityInfo;
});
