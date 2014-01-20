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
            description: 'An elf',
            sprite: 'elf'
        }),
        new Race({
            name: 'Human',
            description: 'Boring',
            sprite: 'human'
        }),
        new Race({
            name: 'Mimirian',
            description: 'Boring',
            sprite: 'mimirian'
        })
    ];

    return RACES;
});
