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
            description: 'Wise and agile creatures in touch with the natural world.',
            sprite: 'elf',
            baseStats: {
                attack: 4,
                defense: 2,
                health: 10,
                // TODO: Don't use these props?
                armor: 2,
                magicResist: 4,
                magicPower: 4
            }
        }),
        new Race({
            name: 'Human',
            description: 'Well rounded jack of all trades',
            sprite: 'human',
            baseStats: {
                attack: 3,
                defense: 3,
                health: 15,

                armor: 4,
                magicResist: 3,
                magicPower: 3
            }
        }),
        new Race({
            name: 'Dark Elf',
            description: 'Agile and intelligent creatures raised in darkness',
            sprite: 'darkelf',
            baseStats: {
                attack: 4,
                defense: 2,
                health: 20,

                armor: 4,
                magicResist: 26,
                magicPower: 10
            }
        }),
        new Race({
            name: 'Mimirian',
            description: 'Strong, but slow, mountain dwelling creatures',
            sprite: 'mimirian',
            baseStats: {
                attack: 1,
                defense: 4,
                health: 20,

                armor: 6,
                magicResist: 5,
                magicPower: 2
            }
        })
    ];

    return RACES;
});
