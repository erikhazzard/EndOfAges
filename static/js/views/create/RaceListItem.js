// ===========================================================================
//
// Race List Item
//
// ItemView for race item
//
// ===========================================================================
define(
    [ 
        'd3', 'logger', 'events'
    ], function viewRaceListItem(
        d3, logger, events
    ){

    var RaceListItem = Backbone.Marionette.ItemView.extend({
        'className': 'race-list-item',
        template: '#template-create-race-list-item',

        events: {
            'click': 'raceClicked'
        },

        serializeData: function(){
            return _.extend({ cid: this.model.cid }, this.model.toJSON());
        },

        initialize: function(){
            logger.log('views/create/RaceListItem', 'initialize : model %O',
                this.model);
            return this;
        },

        onShow: function(){
            var self = this;
            logger.log('views/create/RaceListItem', '\t onShow() called');

            if(this.model.attributes.disabled){
                this.$el.addClass('disabled');
            }
            this.$el.attr({
                id: 'create-race-' + 
                    this.model.attributes.sprite
            });

            // Redelegate events on a timeout. 
            // TODO : Why doesn't this work without the timeout? It seems
            // that maybe the elements haven't been rendered to the DOM yet
            setTimeout(function(){
                self._delegateDOMEvents();
            }, 1000);
            return this;
        },

        raceClicked: function raceClicked (){
            logger.log('views/create/RaceListItem', 'race clicked: %O', 
                this.model);

            events.trigger('create:page2:raceClicked', { 
                $el: this.$el,
                model: this.model
            });
            return this;
        }

    });

    return RaceListItem;
});
