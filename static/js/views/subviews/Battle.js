// ===========================================================================
//
// Battle subview
//
//      View for a battle. Sub views contains in the Combat subfolder
//
// ===========================================================================
define(
    [ 
        'd3', 'backbone', 'marionette',
        'logger', 'events'
    ], function viewBattle(
        d3, backbone, marionette, logger, events
    ){

    var BattleView = Backbone.Marionette.Layout.extend({
        template: '#template-game-battle',
        'className': 'game-battle-wrapper',

        events: {
            'click .finish-instance': 'finishInstance'
        },

        initialize: function battleViewInitialize(options){
            logger.log('views/subviews/Battle', 'initialize() called');
        },


        // ------------------------------
        //
        // User interaction
        //
        // ------------------------------
        finishInstance: function finishInstance(){
            events.trigger('node:instanceFinished');
        }

    });

    return BattleView;
});
