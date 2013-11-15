// ===========================================================================
//
// Page Home
//
//      View for the home 
//
// ===========================================================================
define(
    [ 
        'd3', 'backbone', 'marionette',
        'logger', 'events',

        // Map
        'models/Map',
        'views/subViews/Map'

    ], function viewPageHome(
        d3, backbone, marionette, 
        logger, events,

        Map, MapView
    ){

    var PageHome = Backbone.Marionette.Layout.extend({
        template: '#template-page-home',

        events: {
            'click .login-facebook': 'facebookLogin'
        },
        initialize: function initialize(options){
            // initialize:
            logger.log('views/PageHome', 'in initialize');

            return this;
        },
        onShow: function homeOnShow(){
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
