// ===========================================================================
//
// data-races
//
//      TODO: should be loaded from server and abilities should load 
//
// ===========================================================================
define(
    [ 'events', 'logger', 'models/Race' ], function(
        events, logger, Race
    ){

    var RACES = [
        new Race({
            name: 'Elf',
            description: 'An elf'
        }),
        new Race({
            name: 'Human',
            description: 'Boring'
        }),
        new Race({
            name: 'Mimirian',
            description: 'Boring'
        })
    ];

    return RACES;
});
