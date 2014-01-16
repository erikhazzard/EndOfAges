// ===========================================================================
//
// Page Create Character
// 
// ===========================================================================
define(
    [ 
        'd3', 'backbone', 'marionette',
        'logger', 'events'
    ], function viewPageCreateCharacter(
        d3, backbone, marionette, 
        logger, events
    ){

    var PageCreateCharacter = Backbone.Marionette.Layout.extend({
        template: '#template-page-create-character',
        'className': 'page-create-character-wrapper',

        initialize: function initialize(options){
            // initialize:
            logger.log('views/PageCreateCharacter', 'initialize() called');
            return this;
        },
        onShow: function homeOnShow(){
            logger.log('views/PageCreateCharacter', 'onShow called');
            return this;
        }
        // ------------------------------
        // TODO: how to handle new views?
        // ------------------------------

        // ------------------------------
        //
        // User Interaction
        //
        // ------------------------------
    });

    return PageCreateCharacter;
});
