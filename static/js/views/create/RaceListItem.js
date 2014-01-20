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

        serializeData: function(){
            return _.extend({ cid: this.model.cid }, this.model.toJSON());
        },

        initialize: function(){
            logger.log('views/create/RaceListItem', 'initialize : model %O',
                this.model);
            return this;
        },

        onShow: function(){
            var sprite = this.model.get('sprite');

            var sel = d3.select($('.race-sprite', this.$el)[0]);
            sel = sel.append('image')
                .attr({
                    'xlink:href': function(d, i){
                        return "/static/img/characters/" + 
                            sprite + '.gif';
                    },
                    width: 50,
                    height: 50
                });


            //// TODO: handle sprite loading 
            //// NOTE: to use sticker...
            //var sel = d3.select($('.race-sprite', this.$el)[0]);
            //var $character = d3.sticker('#race-' + this.model.get('sprite'));
            //$character = $character(sel);

            return this;
        }

    });

    return RaceListItem;
});
