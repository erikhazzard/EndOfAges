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
            abilities: new Abilities([
                //// Basic damage attack
                ABILITIES.stab,
                
                //// if an ability was recently used, deal extra damage
                ABILITIES.backstab,

                //// significantly reduces enemy's armor for a short period
                ABILITIES.cripple,

                //// some sort of ult
                ////  Chance to instantly kill mob. Chance scales based on 
                ////  enemy's health
                ABILITIES.assassinate
            ])
        })
    ];


    return ENTITY_CLASSES;
});
