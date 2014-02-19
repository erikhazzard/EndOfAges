// ===========================================================================
//
// data-races
//
//      TODO: should be loaded from server and abilities should load 
//
//      TODO: difference between locked and non unlocked races(?) No, should
//      store playable races on user model
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
                attack: 4,
                armor: 2,
                magicResist: 4,
                magicPower: 4
            }
        }),
        new Race({
            name: 'Human',
            description: 'Boring',
            sprite: 'human',
            baseStats: {
                attack: 4,
                armor: 4,
                magicResist: 3,
                magicPower: 3
            }
        }),
        new Race({
            name: 'Dark Elf',
            description: 'Dark elf',
            sprite: 'darkelf',
            baseStats: {
                attack: 8,
                armor: 4,
                magicResist: 26,
                magicPower: 10
            }
        }),
        new Race({
            name: 'Mimirian',
            description: 'Boring',
            sprite: 'mimirian',
            baseStats: {
                attack: 1,
                armor: 6,
                magicResist: 5,
                magicPower: 2
            }
        })
    ];

    return RACES;
});
