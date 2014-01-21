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
            sprite: 'elf',
            baseStats: {
                agility: 19,
                strength: 12,
                wisdom: 17,
                intelligence: 12
            }
        }),
        new Race({
            name: 'Human',
            description: 'Boring',
            sprite: 'human',
            baseStats: {
                agility: 15,
                strength: 15,
                wisdom: 15,
                intelligence: 15
            }
        }),
        new Race({
            name: 'Mimirian',
            description: 'Boring',
            sprite: 'mimirian',
            baseStats: {
                agility: 11,
                strength: 17,
                wisdom: 16,
                intelligence: 16
            }
        })
    ];

    return RACES;
});
