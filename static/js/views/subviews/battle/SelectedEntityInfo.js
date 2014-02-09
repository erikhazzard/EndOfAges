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
        template: '#template-game-battle-selected-entity-info',
        'className': 'selectedEntityInfoWrapper',

        initialize: function(){
            logger.log('views/subviews/battle/SelectedEntityInfo', 
                'initialize called');

            this.listenTo(this.model.get('attributes'), 'change', this.rerender);

            return this;
        },
        onBeforeClose: function(){
            logger.log('views/subviews/battle/SelectedEntityInfo', 
                '[x] closing');
        },

        onShow: function infoOnShow(){
            logger.log('views/subviews/battle/SelectedEntityInfo', 
                'onShow() called');

            this.$timerNode = $('.timer', this.$el)[0];
            return this;
        },

        rerender: function infoRerender(){
            this.render();
            this.onShow();
            return this;
        },

        updateTimer: function infoUpdateTimer(time){
            // called by the battle controller, the current game time is
            // passed in
            //
            return this;

            // TODO: DOM updates too slow
            var current = Math.round(time * 100) / 100;

            // don't update DOM if value is same
            if(current !== this.last){
                this.$timerNode.innerHTML = this.last;
                this.last = current;
            }
            return this;
        }
    });

    return Entity;
});
