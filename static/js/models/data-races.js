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
                power: 4,
                defense: 2,
                health: 70,

                // TODO: Don't use these props?
                armor: 2,
                magicResist: 4,
                magicPower: 4
            }
        }),
        new Race({
            name: 'Human',

            description: "Well rounded creatures with moderate attack and defense bonuses",
            specialDescription: "Receives a <span class='positive'>+10%</span> experience bonus",
            specialDescription: "<span class='positive'>+10%</span> damage bonus and <span class='negative'>-10%</span> health",
            
            sprite: 'human',
            baseStats: {
                power: 4,
                defense: 4,
                health: 75,

                armor: 4,
                magicResist: 3,
                magicPower: 3
            }
        }),
        new Race({
            name: 'Dark Elf',
            description: 'Agile and intelligent creatures raised in darkness',
            sprite: 'darkelf',
            specialDescription: 'Has a {5%} bonus to something',
            baseStats: {
                power: 5,
                defense: 2,
                health: 60,

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
                power: 1,
                defense: 5,
                health: 90,

                armor: 6,
                magicResist: 5,
                magicPower: 2
            }
        })
    ];

    return RACES;
});
