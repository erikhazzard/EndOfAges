// ===========================================================================
//
// data-races
//
//      TODO: should be loaded from server and abilities should load 
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
            description: 'Healer',
            sprite: 'cleric',
            abilities: new Abilities([
                // Basic heal
                ABILITIES.healing,
                // health and armor buff
                // ...
                // damage target and heal self
                // ...
                // res
                // ...
                ABILITIES.flamelick
            ])
        }),


        new EntityClass({
            name: 'Shadowknight',
            description: 'An experienced warrior dabbling dark with unutterable sorrows',
            sprite: 'shadowknight',
            abilities: new Abilities([
                ABILITIES.darkblade
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
            name: 'Assassin',
            description: 'Stab yo eye',
            sprite: 'assassin',
            abilities: new Abilities([
                ABILITIES.magicmissle
            ])
        })

    ];


    return ENTITY_CLASSES;
});
