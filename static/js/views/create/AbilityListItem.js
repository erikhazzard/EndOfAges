// ===========================================================================
//
// Ability List Item
//
// ItemView for ability item
//
// ===========================================================================
define(
    [ 
        'd3', 'logger', 'events',
        'collections/Abilities'
    ], function viewAbilityListItem(
        d3, logger, events,
        Abilities
    ){

    var AbilityListItem = Backbone.Marionette.ItemView.extend({
        'className': 'list-item',
        template: '#template-create-all-abilities-list-item',

        serializeData: function(){
            return _.extend({ 
                cid: this.model.cid, 
                disabled: false,
                data: Abilities.prototype.dataConfig
            }, 
            this.model.toJSON());
        },

        initialize: function(){
            logger.log('views/create/AbilityListItem', 'initialize : model %O',
                this.model);
            return this;
        },

        onShow: function(){
            return this;
        }

    });

    return AbilityListItem;
});
