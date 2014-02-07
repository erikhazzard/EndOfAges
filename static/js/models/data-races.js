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
                attackPower: 13,
                armor: 10,
                magicResist: 15,
                abilityPower: 13
            }
        }),
        new Race({
            name: 'Human',
            description: 'Boring',
            sprite: 'human',
            baseStats: {
                attackPower: 12,
                armor: 12,
                magicResist: 12,
                abilityPower: 12
            }
        }),
        new Race({
            name: 'Mimirian',
            description: 'Boring',
            sprite: 'mimirian',
            baseStats: {
                attackPower: 10,
                armor: 18,
                magicResist: 18,
                abilityPower: 12
            }
        })
    ];

    return RACES;
});
