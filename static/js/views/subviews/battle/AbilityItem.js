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
        'className': 'ability-item-wrapper',

        serializeData: function(){
            return _.extend({
                cid: this.model.cid,
                index: this.index
            }, this.model.toJSON());
        },

        initialize: function battleViewInitialize(options){
            logger.log('views/subviews/battle/AbilityItem', 
                'initialize() called for: ' + this.model.get('name'));

            // index is the index of this itemview in the collection
            this.index = options.index;

            // TODO: use a hotkey configuration instead of hardcoding
            var key = [ 'q', 'w', 'e', 'r'][this.index];

            // handle keypress
            this.listenTo(events, 'keyPress:' + key, this.useAbility);

            // handle battle related events
            this.listenTo(events, 'ability:cancel', this.cancelAbility);

            return this;
        },

        cancelAbility: function(options){
            // called when the user pressed 'escape' or the ability cannot
            // be used (trigged in the Battle controller view)
            this.$el.removeClass('use');
            return this;
        },

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
                    // Todo: figure out if ability can be used
                    var canBeUsed = options.canBeUsed;

                    // Can the ability be used? If not, add the use-invalid class
                    if(!canBeUsed){
                        // Can NOT be used
                        self.$el.addClass('use-invalid');
                        self.$el.focus();
                        setTimeout(function(){
                            self.$el.removeClass('use-invalid');
                        }, 100);
                    } else {
                        // CAN use
                        // add class
                        self.$el.addClass('use');
                        self.$el.focus();
                    }
                }
            });

            return this;
        }

    });

    return AbilityItem;
});
