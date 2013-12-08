// ===========================================================================
//
//  Entity
//
//      This model manages an entity - a creature in the game
//
// ===========================================================================
define(
    [ 'backbone', 'marionette', 'logger',
        'events', 'd3', 'util/API_URL'
    ], function MapModel(
        Backbone, Marionette, logger,
        events, d3, API_URL
    ){

    var Entity = Backbone.Model.extend({
        defaults: {
            //User object which owns this entity
            owner: null,
            name: 'Soandso' + Math.random(),

            //Entity attributes
            //---------------------------
            health: 100,
            //power is used to cast spells and use abilities
            power: 100,

            //Stats
            //---------------------------
            strength: 10,
            agility: 10,
            dexterity: 10,
            stamina: 10,
            intelligence: 10,
            wisdom: 10,

            //Regen
            //---------------------------
            //How many points to regen per turn
            regenHealth: 1,
            regenPower: 1,

            //Combat stats
            //---------------------------
            // "Final" calculated values:
            attack: 0,
            attackSpeed: 0,

            defense: 0,

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
            chanceAoe: 0,

            //Resists
            //---------------------------
            resistAir: 0,
            resistDark: 0,
            resistEarth: 0,
            resistFire: 0,
            resistLight: 0,
            resistWater: 0,

            //Base attributes (copied over when a game starts to allow
            //  for buffs / debuffs)
            //---------------------------
            baseAttributes: {}
        },
        
        url: function getURL(){
            var url = API_URL + 'entities/' + this.get('id');
            return url;
        },

        initialize: function gameInitialize(){
            logger.log('models/Entity', 'initialize() called');

            // set base attributes
            this.setBaseAttributes();
            return this;
        },

        setBaseAttributes: function setBaseAttributes(){
            // copy over all attributes, so temporary stat boosts
            // can be tracked easier
            var baseAttributes = _.clone(this.attributes);
            // delete unnecessary keys
            delete baseAttributes.baseAttributes;
            delete baseAttributes.name;
            delete baseAttributes.id;

            this.set({baseAttributes:  baseAttributes}, {silent: true});
            this.trigger('change:baseAttributes');

            logger.log('models/Entity', 'baseAttributes changed: %O',
                baseAttributes);
            return this;
        }
    });

    return Entity;
});
