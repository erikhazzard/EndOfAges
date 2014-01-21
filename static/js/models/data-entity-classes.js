// ===========================================================================
//
// data-races
//
//      TODO: should be loaded from server and abilities should load 
//
// ===========================================================================
define(
    [ 'events', 'logger', 'models/EntityClass' ], function(
        events, logger, EntityClass
    ){

    var ENTITY_CLASSES = [
        new EntityClass({
            name: 'Shadowknight',
            description: 'An experienced warrior dabbling dark with unutterable sorrows',
            sprite: 'shadowknight'
        }),

        new EntityClass({
            name: 'Wizard',
            description: 'Magic missle into the darkness',
            sprite: 'wizard'
        }),

        new EntityClass({
            name: 'Assassin',
            description: 'Stab yo eye',
            sprite: 'assassin'
        }),

        new EntityClass({
            name: 'Ranger',
            description: 'Pew pew with my bow',
            sprite: 'ranger'
        })

    ];


    return ENTITY_CLASSES;
});
