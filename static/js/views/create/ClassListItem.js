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
        'className': 'list-item',
        template: '#template-create-class-list-item',

        events: {
            'click': 'classClicked'
        },

        serializeData: function(){
            return _.extend({ cid: this.model.cid }, this.model.toJSON());
        },

        initialize: function(){
            logger.log('views/create/ClassListItem', 'initialize : model %O',
                this.model);
            return this;
        },

        onShow: function(){
            var self = this;
            logger.log('views/create/ClassListItem', '\t onShow() called');

            if(this.model.attributes.disabled){
                this.$el.addClass('disabled');
            }

            // Redelegate events on a timeout. 
            // TODO : Why doesn't this work without the timeout? It seems
            // that maybe the elements haven't been rendered to the DOM yet
            setTimeout(function(){
                self._delegateDOMEvents();
            }, 1000);
            return this;
        },

        classClicked: function classClicked (){
            logger.log('views/create/ClassListItem', 'class clicked: %O', 
                this.model);

            events.trigger('create:page3:classClicked', { 
                $el: this.$el,
                model: this.model
            });
            return this;
        }

    });

    return ClassListItem;
});
