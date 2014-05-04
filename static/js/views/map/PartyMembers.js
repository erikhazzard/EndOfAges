// ===========================================================================
//
// Party Member collection view
// 
// ===========================================================================
define(
    [ 
        'd3', 'backbone', 'marionette',
        'logger', 'events',
        'views/map/PartyMember'
    ], function(
        d3, Backbone, Marionette, 
        logger, events,
        PartyMember
    ){

    var PartyMembers = Backbone.Marionette.CompositeView.extend({
        itemView: PartyMember,
        itemViewContainer: '.members',
        template: '#template-game-map-party-members',
        id: 'map-party-wrapper'
    });

    return PartyMembers;
});
