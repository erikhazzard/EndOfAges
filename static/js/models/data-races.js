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
                attack: 13,
                armor: 10,
                magicResist: 15,
                magicPower: 13
            }
        }),
        new Race({
            name: 'Human',
            description: 'Boring',
            sprite: 'human',
            baseStats: {
                attack: 12,
                armor: 12,
                magicResist: 12,
                magicPower: 12
            }
        }),
        new Race({
            name: 'Dark Elf',
            description: 'Dark elf',
            sprite: 'darkelf',
            baseStats: {
                attack: 13,
                armor: 10,
                magicResist: 15,
                magicPower: 13
            }
        }),
        new Race({
            name: 'Mimirian',
            description: 'Boring',
            sprite: 'mimirian',
            baseStats: {
                attack: 10,
                armor: 18,
                magicResist: 18,
                magicPower: 12
            }
        })
    ];

    return RACES;
});
