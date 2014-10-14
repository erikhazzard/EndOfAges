// ===========================================================================
//
// data-classes
//
//      TODO: should be loaded from server and abilities should load 
//      TODO: Think of group of classes (DPS / Tank / Healer?)
//
//      -- Classes can be generally divided into types:
//          Type: Physical and Magical
//          Elements: Earth, Wind, Water, Fire, Light, Dark
//          
//          Class could be parts of any type / element
//
//
// ===========================================================================
define(
    [ 'events', 'logger', 'models/EntityClass',
        'collections/Abilities', 'models/data-abilities'], function(
        events, logger, EntityClass,
        Abilities, ABILITIES
    ){

    var ENTITY_CLASSES = [
        new EntityClass({
            name: 'Custom',
            description: 'Think you can build an awesome class? Build your own unique combination of abilities',
            sprite: 'custom',
            disabled: false,
            abilities: []
        }),

        new EntityClass({
            name: 'Assassin',
            description: 'Assassins attack in bursts, combining skills to deal massive amounts of damage.',
            sprite: 'assassin',
            disabled: false,
            abilities: [
                // array of effectId names
                'stab', 'backstab', 'cripple', 'assassinate'
            ]
        }),

        new EntityClass({
            name: 'Ranger',
            description: "Possesses unparalleled skill with bows and hunting, allowing them to mark enemies to enhance their attacks",
            sprite: 'ranger',
            disabled: false,
            abilities: [
                // array of effectId names
                'stab', 'haste', 'cripple', 'assassinate'
            ]
        }),

        new EntityClass({
            name: 'Shadow Knight',
            description: "A knight born in darkness, using dark magic to enhance their combat skills",
            sprite: 'shadowknight',
            disabled: false,
            abilities: [
                // array of effectId names
                'darkblade', 'deathtouch', 'cripple'
            ]
        }),

        new EntityClass({
            name: 'Wizard',
            description: "",
            sprite: 'wizard',
            disabled: false,
            abilities: [
                // array of effectId names
                'magicMissle', 'flamelick', 'fireball'
            ]
        })
    ];


    return ENTITY_CLASSES;
});
