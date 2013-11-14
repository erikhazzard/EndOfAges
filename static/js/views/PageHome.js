// ===========================================================================
//
// PageTitleScreen
// 
// ===========================================================================
define(
    [ 
        'd3', 'backbone', 'marionette',
        'logger', 'events',

        //TODO: not here
        'models/Map',
        'views/subViews/Map'
    ], function viewPageHome(
        d3, backbone, marionette, 
        logger, events,

        Map,
        MapView
    ){

    var PageHome = Backbone.Marionette.Layout.extend({
        template: '#template-page-home',

        initialize: function initialize(options){
            // initialize:
            logger.log( 'views/PageHome', 'in initialize');

            window.M = Map;
            window.V = MapView;
            return this;
        },
        onShow: function homeOnShow(){
            return this;
        }
    });

    return PageHome;
});
