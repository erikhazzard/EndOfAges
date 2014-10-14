// ===========================================================================
//
// Ability List Item
//
// ItemView for ability item
//
// ===========================================================================
define(
    [ 
        'd3', 'logger', 'events'
    ], function viewAbilityListItem(
        d3, logger, events
    ){

    var AbilityListItem = Backbone.Marionette.ItemView.extend({
        'className': 'list-item',
        template: '#template-create-all-abilities-list-item',

        serializeData: function(){
            return _.extend({ cid: this.model.cid, disabled: false }, this.model.toJSON());
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
