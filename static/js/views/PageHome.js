// ===========================================================================
//
// PageTitleScreen
// 
// ===========================================================================
define(
    [ 
        'd3', 'backbone', 'marionette',
        'logger', 'events'
    ], function viewPageHome(
        d3, backbone, marionette, 
        logger, events
    ){

    var PageHome = Backbone.Marionette.Layout.extend({
        template: '#template-page-home',
        'className': 'page-home-wrapper',
        events: {
            'click .btn-play-game': 'playGame'
        },

        initialize: function initialize(options){
            // initialize:
            logger.log('views/PageHome', 'initialize() called');
            return this;
        },
        onShow: function homeOnShow(){
            return this;
        },

        // ------------------------------
        //
        // User Interaction
        //
        // ------------------------------
        playGame: function homePlayGame(e){
            e.stopPropagation();
            e.preventDefault();
            
            // Let controller know play game was clicked
            events.trigger('appRouter:showGame');
        }
    });

    return PageHome;
});
