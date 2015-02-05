// ===========================================================================
//
// All Ability List
//
// ItemView for class item
//
// ===========================================================================
define(
    [ 
        'd3', 'logger', 'events',
        'collections/Abilities'
    ], function viewAllAbilityListItem(
        d3, logger, events,
        Abilities
    ){

    var AllAbilityListItem = Backbone.Marionette.ItemView.extend({
        template: '#template-create-all-abilities-list-item',

        events: {
            'click': 'abilityClicked',
            'mouseenter': 'mouseenter', 
            'mouseleave': 'mouseleave'
        },


        serializeData: function(){
            return _.extend({ 
                cid: this.model.cid,
                sprite: this.model.attributes.sprite || null,
                disabled: false,
                data: Abilities.prototype.dataConfig
            }, this.model.toJSON());
        },

        initialize: function(){
            logger.log('AllAbilitiesListItem', 'initialize : model %O',
                this.model);
            return this;
        },

        onShow: function(){
            var self = this;

            var sprite = this.model.get('effectId');

            var classNames = 'list-item';
            // update classNames based on model spell types
            classNames += ' ' + this.model.attributes.spellTypes.join(' ');

            this.$el.attr({
                id: 'create-all-ability-' + 
                    this.model.attributes.id,
                'class': classNames
            });

            if(this.model.attributes.disabled){
                this.$el.addClass('disabled');
            }

            setTimeout(function(){requestAnimationFrame(function(){
                self._delegateDOMEvents();
            });}, 20);

            return this;
        },

        // ------------------------------
        // UI callbacks
        // ------------------------------
        abilityClicked : function abilityClicked(){
            logger.log('AllAbilitiesListItem', 'ability item clicked'); 

            events.trigger('create:page4:abilityClicked', { 
                $el: this.$el,
                model: this.model
            });

            return this;
        },

        mouseenter: function mouseenter(){
            events.trigger('create:page4:allAbilityMouseenter', { 
                $el: this.$el,
                model: this.model
            });
            return this;
        },
        mouseleave: function mouseleave(){
            events.trigger('create:page4:allAbilityMouseleave', { 
                $el: this.$el,
                model: this.model
            });
            return this;
        }

    });

    return AllAbilityListItem;
});
