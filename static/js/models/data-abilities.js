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
    // TODO: think of structure.
    // Maybe instead of damage and heal, `amount` is used, and a separate
    // attribute like `spellType` specifies if it's a Direct Damage, Heal,
    // DoT, buff, etc. type spell

    // Here be abilities. This would be loaded in a DB and entities would
    // get abilities from server
    var abilities = {
        'fireball': new Ability({
            name: 'Fireball',
            castTime: 4,
            timeCost: 4,
            powerCost: 8,
            validTargets: ['enemy', 'player'],
            type: 'magic',
            subType: 'fire',
            damage: 40
        }),
        'magicmissle': new Ability({
            name: 'Magic Missle',
            castTime: 2,
            timeCost: 2,
            powerCost: 4,
            validTargets: ['enemy', 'player'],
            type: 'magic',
            subType: 'arcane',
            damage: 20,
            heal: 10,
            healTarget: 'source'
        }),
        'minorhealing': new Ability({
            name: 'Minor Healing',
            castTime: 3,
            timeCost: 3,
            powerCost: 3,
            validTargets: ['enemy', 'player'],
            type: 'magic',
            subType: 'light',
            heal: 15
        }),

        'flamelick': new Ability({
            name: 'Flamelick',
            castTime: 3,
            timeCost: 3,
            powerCost: 4,
            validTargets: ['enemy', 'player'],
            type: 'magic',
            subType: 'fire',
            damage: 10
        }),
        'trivialhealing': new Ability({
            name: 'Trivial Healing',
            castTime: 3,
            timeCost: 3,
            powerCost: 1,
            validTargets: ['enemy', 'player'],
            type: 'magic',
            subType: 'light',
            heal: 5
        })
    };


    return abilities;
});
