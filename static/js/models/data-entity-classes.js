// ===========================================================================
//
// data-races
//
//      TODO: should be loaded from server and abilities should load 
//      TODO: Think of group of classes (DPS / Tank / Healer?)
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
            name: 'Cleric',
            description: 'Clerics focus on using light magic to aid their allies and disable their foes',
            sprite: 'cleric',
            abilities: new Abilities([
                // Basic heal
                ABILITIES.heal,
                // damage target and heal self
                ABILITIES.smite,
                // health and armor buff
                ABILITIES.virtue
                //// res
                //ABILITIES.resurrect
            ])
        }),

        new EntityClass({
            name: 'Shadowknight',
            description: 'A veteran dabbling in dark magic',
            sprite: 'shadowknight',
            abilities: new Abilities([
                // basic physical attack
                ABILITIES.darkblade,
                //// attack + dot
                //ABILITIES.darkblade,
                //// siphon abilities
                //ABILITIES.siphonstrength,
                //// aoe + taunt
                //ABILITIES.deathcloud

            ])
        }),

        new EntityClass({
            name: 'Wizard',
            description: 'Magic missle into the darkness',
            sprite: 'wizard',
            abilities: new Abilities([
                ABILITIES.minorhealing
            ])
        }),

        new EntityClass({
            name: 'Ranger',
            description: 'An archer',
            sprite: 'ranger',
            abilities: new Abilities([
                //// single target
                //ABILITIES.headshot,
                //// dot + damage
                //ABILITIES.poisonedarrow,
                //// increases damage of next spell
                //ABILITIES.aim,
                //// aoe (will increase aggro - could be bad)
                //ABILITIES.barrage
            ])
        }),

        new EntityClass({
            name: 'Assassin',
            description: 'Stab yo eye',
            sprite: 'assassin',
            abilities: new Abilities([
                ABILITIES.magicmissle
            ])
        }),


    ];


    return ENTITY_CLASSES;
});
