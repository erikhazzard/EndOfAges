// ===========================================================================
//
// Class List Item
//
// ItemView for class item
//
// ===========================================================================
define(
    [ 
        'd3', 'logger', 'events'
    ], function viewClassListItem(
        d3, logger, events
    ){

    var ClassListItem = Backbone.Marionette.ItemView.extend({
        'className': 'class-list-item',
        template: '#template-create-class-list-item',

        serializeData: function(){
            return _.extend({ cid: this.model.cid }, this.model.toJSON());
        },

        initialize: function(){
            logger.log('views/create/ClassListItem', 'initialize : model %O',
                this.model);
            return this;
        },

        onShow: function(){
            var sprite = this.model.get('effectId');
            var sel = $('.class-sprite', this.$el);
            sel.attr({ 'src' : "/static/img/classes/" + sprite + '.svg' });

            return this;
        }

    });

    return ClassListItem;
});
