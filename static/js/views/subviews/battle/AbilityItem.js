// ===========================================================================
//
// Battle - Ability Item subview
//      View for an ability list
//
//  Shows the available abilities for an entity
//
// ===========================================================================
define(
    [ 
        'd3', 'backbone', 'marionette', 'logger', 'events'
    ], function viewBattleAbility(
        d3, backbone, marionette, logger, events
    ){

    var AbilityItem = Backbone.Marionette.ItemView.extend({
        template: '#template-game-battle-ability',
        'className': 'ability-item-wrapper inactive',

        serializeData: function(){
            return _.extend({
                cid: this.model.cid,
                index: this.index
            }, this.model.toJSON());
        },

        // When this element is interaction with, use the corresponding
        // ability
        events: {
            'click': 'useAbility',
            'touchend': 'useAbility'
        },

        initialize: function battleViewInitialize(options){
            var self = this;
            logger.log('views/subviews/battle/AbilityItem', 
                'initialize() called for: ' + this.model.get('name'));

            // index is the index of this itemview in the collection
            this.index = options.index;

            // TODO: use a hotkey configuration instead of hardcoding
            //
            // TODO: This should really be handled in Battle, most likely, not
            // here...
            //
            var key = [ 'q', 'w', 'e', 'r'][this.index];
            // do the same thing, but also if user holds shift
            var keyShift = [ 'shift+q', 'shift+w', 'shift+e', 'shift+r'][this.index];

            // handle keypress
            this.listenTo(events, 'keyPress:' + key, this.useAbility);
            this.listenTo(events, 'keyPress:' + keyShift, this.useAbility);

            // handle battle related events
            this.listenTo(events, 'ability:cancel', this.cancelAbility);

            this.listenTo(this.model, 'abilityActive', this.setAbilityActive);
            this.listenTo(this.model, 'abilityInactive', this.setAbilityInactive);

            return this;
        },

        cancelAbility: function(options){
            // called when the user pressed 'escape' or the ability cannot
            // be used (trigged in the Battle controller view)
            this.$el.removeClass('use');
            return this;
        },

        onShow: function(){
            // add class based on targets
            if(this.model.attributes.validTargets.indexOf('enemy') > -1){
                this.$el.addClass('enemy');
            }
            if(this.model.attributes.validTargets.indexOf('player') > -1){
                this.$el.addClass('player');
            }

            this.$abilityIconOverlay = $('.ability-icon-overlay', this.$el);
            this.$abilityIconCanvas = $('.ability-icon-canvas', this.$el);

            return this;
        },

        // ------------------------------
        // timer updates
        // ------------------------------
        setAbilityActive: function(){
            this.$el.removeClass('inactive');
            this.$el.addClass('active');
        },
        setAbilityInactive: function(){
            this.$el.removeClass('active');
            this.$el.addClass('inactive');
        },

        // ------------------------------
        // Use ability
        // ------------------------------
        useAbility: function(options){
            // Called when either the user clicks on the ability or presses the 
            // hotkey. If the ability can't be used yet, do nothing
            // TODO: global timer? for each entity? pass in entity for this
            // ability?
            var self = this;
            logger.log('views/subviews/battle/AbilityItem', 
                'ability used! ' + this.model.get('name') + 
                ' | key pressed: ' + options.key);
            

            events.trigger('ability:activated', {
                ability: this.model,

                useCallback: function(err, options){
                    // This callback is called immediately upon ability
                    // usage. If it can be used, color it green; otherwise,
                    // color it grey
                    var canBeUsed = options.canBeUsed;

                    // Can the ability be used? If not, add the use-invalid class
                    if(canBeUsed){
                        // CAN use
                        self.$abilityIconOverlay.addClass('used-success');
                        setTimeout(function(){
                            self.$abilityIconOverlay.removeClass('used-success');
                        },140);

                    } else {
                        // Can NOT be used
                        self.$abilityIconOverlay.addClass('used-invalid');
                        self.$abilityIconOverlay.addClass('invalid');
                        self.$el.addClass('shake shake-constant');
                        setTimeout(function(){
                            self.$abilityIconOverlay.removeClass('used-invalid');
                            self.$el.removeClass('shake shake-constant');
                        },140);
                    }
                }
            });

            return this;
        }

    });

    return AbilityItem;
});
