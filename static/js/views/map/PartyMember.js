// ===========================================================================
//
// Party Member item view
//  
//  Party memebr item view
// 
// ===========================================================================
define(
    [ 
        'd3', 'backbone', 'marionette',
        'logger', 'events'
    ], function(
        d3, Backbone, Marionette, 
        logger, events
    ){

    var PartyMember = Backbone.Marionette.ItemView.extend({
        tagName: 'div',
        template: '#template-game-map-party-member',
        events: {
            'click': 'memberClicked'
        },
        serializeData: function(){
            return _.extend({ self: this.model }, this.model.toJSON());
        },

        memberClicked: function memberClicked(e){
            logger.log('views/map/PartyMember',
                'Party member wrapper clicked : %O | model: %O',
                this, this.model);

            return this;
        }

    });

    return PartyMember;
});
