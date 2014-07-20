// ===========================================================================
//
// PageTitleScreen
// 
// ===========================================================================
define(
    [ 
        'd3', 'backbone', 'marionette',
        'logger', 'events',
        'models/Entity'
    ], function viewPageHome(
        d3, backbone, marionette, 
        logger, events,
        Entity
    ){

    var PageHome = Backbone.Marionette.Layout.extend({
        template: '#template-page-home',
        'className': 'page-home-wrapper',

        events: {
        },

        initialize: function initialize(options){
            // initialize:
            logger.log('views/PageHome', 'initialize() called');

            this.model = new Entity({});

            return this;
        },
        onShow: function homeOnShow(){
            logger.log('views/PageHome', 'onShow called');
            return this;
        }

        // ------------------------------
        //
        // User Interaction
        //
        // ------------------------------
    });

    return PageHome;
});
