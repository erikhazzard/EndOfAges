// ===========================================================================
//
// Party Member Container
//  
//  Party memebr side container view on the map
// 
// ===========================================================================
define(
    [ 
        'd3', 'backbone', 'marionette',
        'views/EoALayoutView',
        'logger', 'events'
    ], function viewPartyMemberContainer(
        d3, Backbone, Marionette, 
        EoALayoutView,
        logger, events
    ){

    var PageCreateCharacter = EoALayoutView.extend({
    });

    return PartyMemberContainer;
});
