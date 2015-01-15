/* =========================================================================
 *
 * abilities
 *  data file containing all abilities
 *  TODO: Is this used? Don't think so
 *
 *  ======================================================================== */
define(
[ 'logger', 'util/Timer' ], function( logger, Timer){
    // Here be abilities. This would be loaded in a DB and entities would
    // get abilities from server
    var abilities = {

        'magic-missile': {
            name: 'Magic Missle',
            effectId: 'magicMissle',
            castTime: 2,
            timeCost: 2,
            validTargets: ['enemy'],
            type: 'magic',
            element: {light: 0.7, fire: 0.3},
            damage: 15
        },

        'fireball': {
            name: 'Fireball',
            effectId: 'fireball',
            castTime: 4,
            timeCost: 4,
            validTargets: ['enemy'],
            type: 'magic',
            element: 'fire',
            damage: 40
        }

    };

    return abilities;
});
