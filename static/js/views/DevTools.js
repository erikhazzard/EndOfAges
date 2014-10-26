// ===========================================================================
//
// DevTools
//
//  Admin / Dev utilities
// 
// ===========================================================================
define(
    [ 
        'd3', 'backbone', 'marionette',
        'logger', 'events',
        'localForage',
    ], function viewPageHome(
        d3, backbone, marionette, 
        logger, events,
        localForage
    ){

    var DevTools = Backbone.Marionette.Layout.extend({
        template: '#template-dev-tools',

        //hidden by default
        'className': 'dev-tools-wrapper hidden',

        events: {
            'click .btn-save': 'save',
            'click .btn-clear-save': 'clearSave'
        },

        initialize: function initialize(options){
            // initialize:
            logger.log('views/DevTools', 'initialize() called');

            // show / hide dev panel
            this.listenTo(events, 'keyPress:shift+i', this.togglePanel);
            return this;
        },

        save: function(){
            // Save the game
            logger.log('views/DevTools', 'save(): triggering save');
            events.trigger('dev:saveGame');
        },
        clearSave: function(){
            // clear the saved game 
            // NOTE: only clears local storage
            logger.log('views/DevTools', 'clearSave(): removing items from localstorage');
            while(window.localStorage.length){
                window.localStorage.removeItem(localStorage.key(0));
            }
            logger.log('views/DevTools', 'all done: %O', window.localStorage);

            localForage.clear();
            return this;
        },

        // ------------------------------
        //
        // User Interaction
        //
        // ------------------------------
        togglePanel: function(e){
            this.$el.toggleClass('hidden');
            return this;
        }
    });

    return DevTools;
});
