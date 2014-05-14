// ===========================================================================
//
// Battle - Entity info subview
//      Entity battle related info (health, magic, timer, etc) 
//
// ===========================================================================
define(
    [ 
        'd3', 'backbone', 'marionette', 'logger', 'events'
    ], function viewBattleAbility(
        d3, backbone, marionette, logger, events
    ){

    var Entity = Backbone.Marionette.Layout.extend({
        template: '#template-game-battle-intended-target-info',
        'className': 'intendedTargetInfoWrapper',

        initialize: function(){
            logger.log('views/subviews/battle/IntendedTaretInfo', 
                'initialize called');

            this.listenTo(this.model.get('attributes'), 'change:health', this.rerender);
            return this;
        },

        onShow: function(){
            return this;
        },

        rerender: function(){
            this.render();
            this.onShow();
            return this;
        }
    });

    return Entity;
});
