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

            // Listen for changes to attributes.
            // TODO: break it out even more, have functions for each group of
            // changes
            this.listenTo(this.model.get('attributes'), 'change', this.rerender);
            this.listenTo(this.model.get('attributes'), 'change:health', this.rerenderHealth);
            this.listenTo(this.model.get('attributes'), 'change:maxHealth', this.rerenderHealth);

            // render components the first time this view renders
            //  subsequent renders happen on attribute change callbacks
            this.listenToOnce(this, 'render', this.rerenderHealth);

            return this;
        },
        onBeforeClose: function(){
            logger.log('views/subviews/battle/SelectedEntityInfo', 
                '[x] closing');
        },

        onShow: function infoOnShow(){
            var self = this;
            logger.log('views/subviews/battle/SelectedEntityInfo', 
                'onShow() called');

            // Set the fade duration for all the active effects based on their
            // duration
            // The active effect elements are in order of the activeEffects
            //  array on the entity
            _.each($('.active-effect', this.$el), function(el, i){
                var duration = self.model.attributes.activeEffects[i].get('buffDuration');

                // Don't do anything for buffs that have no duration
                if(duration < 1){ 
                    return false;
                }

                // convert to seconds
                duration *= 1000;

                // Get the time the buff was started
                var start = self.model.attributes.activeEffects[i].get('buffStartDate');
                // how much time has passed between the start and now
                var timeDiff = new Date() - start;
                // and the time left before the buff is finished
                duration = duration - timeDiff;

                // stop the existing transition
                $(el).transitionStop();

                // start a new one
                $(el).transit({
                    opacity: 0
                }, duration, 'easeInSine');
            });
            return this;
        },

        rerender: function infoRerender(){
            this.render();
            this.onShow();
            return this;
        },

        rerenderHealth: function healthRerender(){
            // Update the health
            $('.health-wrapper', this.$el).html(
                Backbone.Marionette.TemplateCache.get('#template-game-battle-selected-entity-health')(
                    this.model.toJSON()    
                )
            );

            return this;
        }
    });

    return Entity;
});
