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
        'className': 'ability-item',

        serializeData: function(){
            return _.extend({
                cid: this.model.cid,
                index: this.index
            }, this.model.toJSON());
        },

        initialize: function battleViewInitialize(options){
            logger.log('views/subviews/battle/AbilityItem', 
                'initialize() called for: ' + this.model.get('name') + 
                ' model: %O', this.model);

            // index is the index of this itemview in the collection
            this.index = options.index;

            // TODO: use a hotkey configuration instead of hardcoding
            var key = [ 'q', 'w', 'e', 'r'][this.index];

            // handle keypress
            this.listenTo(events, 'keyPress:' + key, this.useAbility);
            return this;
        },

        useAbility: function(key){
            // Called when either the user clicks on the ability or presses the 
            // hotkey. If the ability can't be used yet, do nothing
            // TODO: global timer? for each entity? pass in entity for this
            // ability?
            var self = this;
            logger.log('views/subviews/battle/AbilityItem', 
                'ability used! ' + this.model.get('name') + 
                ' | key pressed: ' + key);
            

            var canBeUsed = true;

            // Can the ability be used? If not, add the use-invalid class
            if(!canBeUsed){
                // Can NOT be used
                this.$el.addClass('use-invalid');
                this.$el.focus();
                setTimeout(function(){
                    self.$el.removeClass('use-invalid');
                }, 100);
            } else {
                // CAN use
                // add class
                this.$el.addClass('use');
                this.$el.focus();
                setTimeout(function(){
                    self.$el.removeClass('use');
                }, 100);

                // reset timer

                // perform effect
            }

            return this;
        }

    });

    return AbilityItem;
});
