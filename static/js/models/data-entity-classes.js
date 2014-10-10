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
            name: 'Assassin',
            description: 'Assassins attack in bursts, combining skills to deal massive amounts of damage.',
            sprite: 'assassin',
            disabled: false
        }),

        new EntityClass({
            name: 'Ranger',
            description: 'Possesses unparalleled skill with bows and hunting, allowing them to mark enemies to enhance their attacks',
            sprite: 'ranger',
            disabled: false
        })
    ];


    return ENTITY_CLASSES;
});
