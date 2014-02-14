// ===========================================================================
//
//  Entity Attributes
//
//      This model manages the attributes sub model of an entity
//
// ===========================================================================
define(
    [ 'backbone', 'marionette', 'logger',
        'events', 'util/API_URL'
    ], function MapModel(
        Backbone, Marionette, logger,
        events, API_URL
    ){

    var EntityAttributes = Backbone.Model.extend({
        defaults: {
            health: 100,
            maxHealth: 100,

            //Combat stats
            //---------------------------
            // Physcial
            armor: 0,
            attack: 0,

            magicResist: 0,
            magicPower: 0,

            //Regen
            //---------------------------
            //How many points to regen per 'tick'
            regenHealth: 0,

            // element modifiers
            //---------------------------
            air: 0,
            dark: 0,
            earth: 0,
            fire: 0,
            light: 0,
            water: 0,

            //Resists
            //---------------------------
            resistAir: 0,
            resistDark: 0,
            resistEarth: 0,
            resistFire: 0,
            resistLight: 0,
            resistWater: 0,

            // Other modifiers
            // --------------------------
            //Chance to deal critical damage (for all abilities)
            chanceCritical: 0,

            //Base crit damage is 100% of normal damage. This raises that
            criticalModifier: 0,

            //Combat stats which affect above values
            //---------------------------
            //Every 100 points of multiattack means a chance to strike
            ////  opponent N number of times
            chanceMultiAttack: 0,

            //Block will absorb some % of meele attacks if shield
            chanceBlock: 0,

            //Chance to completely avoid an attack
            //  NOTE: Should avoid only a single attack. Dodge should
            //  check all multi attacks as well
            chanceDodge: 0,

            // Chance to parry (avoid) some damage
            chanceParry: 0,

            //  Chance to avoid some damage AND return part of that damage back
            //  to the attack. Must first Parry, then this is the % chance that
            //  a parry will turn into a Riposte
            chanceRiposte: 0,

            // Chance for a meele hit to do area of effect damage
            chanceAoe: 0
        }
    });

    return EntityAttributes;

});
