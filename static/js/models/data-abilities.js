// ===========================================================================
//
// data-abilities
//
//      TODO: should be loaded from server and abilities should load on a per
//      entity level
//
// ===========================================================================
define(
    [ 'events', 'logger', 'models/Ability' ], function(
        events, logger, Ability
    ){
    // Here be abilities. This would be loaded in a DB and entities would
    // get abilities from server
    var abilities = {
        'fireball': new Ability({
            castTime: 4,
            timeCost: 4,
            powerCost: 8,
            validTargets: ['enemy'],
            type: 'magic',
            subType: 'fire',
            damage: 40
        }),
        'magicmissle': new Ability({
            castTime: 2,
            timeCost: 2,
            powerCost: 4,
            validTargets: ['enemy'],
            type: 'magic',
            subType: 'arcane',
            damage: 20
        })
    };


    return abilities;
});
