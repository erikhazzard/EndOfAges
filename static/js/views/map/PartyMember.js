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

        serializeData: function(){
            return _.extend({ self: this.model }, this.model.toJSON());
        }
    });

    return PartyMember;
});
