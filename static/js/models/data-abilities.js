// ===========================================================================
//
// data-abilities
//
//      TODO: should be loaded from server and abilities should load on a per
//      entity level
//
// ===========================================================================
define(
    [ 'events', 'logger', 'models/Ability', 'util/Timer' ], function(
        events, logger, Ability, Timer
    ){
    // TODO: think of structure.
    // Maybe instead of damage and heal, `amount` is used, and a separate
    // attribute like `spellType` specifies if it's a Direct Damage, Heal,
    // DoT, buff, etc. type spell
    logger.log('models/data-abilities', 'Creating abilities');

    // Here be abilities. This would be loaded in a DB and entities would
    // get abilities from server
    var abilities = {
        // ------------------------------
        // Damage - Arcane
        // ------------------------------
        'magicmissle': new Ability({
            name: 'Magic Missle',
            effectId: 'magicMissle',
            castTime: 2,
            timeCost: 2,
            validTargets: ['enemy'],
            type: 'magic',
            element: {light: 0.7, fire: 0.3},
            damage: 15
        }),

        // ------------------------------
        // Damage - Fire
        // ------------------------------
        'flamelick': new Ability({
            name: 'Flamelick',
            effectId: 'flamelick',
            castTime: 3,
            timeCost: 3,
            validTargets: ['enemy'],
            type: 'magic',
            element: 'fire',
            damage: 10
        }),
        'fireball': new Ability({
            name: 'Fireball',
            effectId: 'fireball',
            castTime: 4,
            timeCost: 4,
            validTargets: ['enemy'],
            type: 'magic',
            element: 'fire',
            damage: 40
        }),

        // ------------------------------
        // Healing - Light
        // ------------------------------
        'trivialhealing': new Ability({
            name: 'Trivial Healing',
            effectId: 'trivialHealing',
            castTime: 3,
            timeCost: 3,
            validTargets: ['player'],
            type: 'magic',
            element: 'light',
            heal: 5
        }),
        'minorhealing': new Ability({
            name: 'Minor Healing',
            effectId: 'minorHealing',
            castTime: 3,
            timeCost: 3,
            validTargets: ['player'],
            type: 'magic',
            element: 'light',
            heal: 15
        }),

        // ==============================
        // 
        // Cleric
        //
        // ==============================
        heal: new Ability({
            name: 'Heal',
            effectId: 'minorHealing',
            castTime: 0.5,
            timeCost: 0.5,
            validTargets: ['player'],
            type: 'magic',
            element: 'light',
            heal: 20
        }),
        smite: new Ability({
            name: 'Smite',
            effectId: 'magicMissle',
            castTime: 1,
            timeCost: 1,
            validTargets: ['enemy'],
            type: 'magic',
            element: 'light',
            damage: 10,
            heal: 5,
            healTarget: 'source'
        }),
        virtue: new Ability({
            name: 'Virtue',
            effectId: 'minorHealing',
            castTime: 3,
            timeCost: 3,
            validTargets: ['player'],
            type: 'magic',
            element: 'light',

            heal: 10,

            buffDuration: 8,
            buffEffects: { 
                armor: 10,
                magicResist: 10,
                maxHealth: 10
            }
        }),
        judgement: new Ability({
            name: 'Judgement',
            effectId: 'magicMissle',
            castTime: 1,
            timeCost: 1,
            validTargets: ['enemy'],
            type: 'magic',
            element: 'light',
            damage: '10%',
            effect: function(options){
                // Does 10% of entity's health in damage
                var self = this;
                var delay = this.getCastDuration(options);

                new Timer(function effectDamageDelay(){
                    var target = options.target;
                    var amount = target.get('baseAttributes').get('maxHealth');
                    amount = Math.ceil(0.15 * target.get('baseAttributes').get('health'));

                    target.takeTrueDamage({
                        sourceAbility: self,
                        source: options.source,
                        target: options.target,
                        type: self.get('type'),
                        element: self.get('element'),
                        amount: amount
                    });

                }, delay);
            }
        }),

        // ==============================
        // 
        // Shadowknight
        //
        // ==============================
        darkblade: new Ability({
            name: 'Dark Blade',
            description: 'A physical attack that damages the enemy and returns a percentage of damage to you',
            effectId: 'magicMissle',
            castTime: 3,
            timeCost: 3,
            castDuration: 0.3,
            validTargets: ['enemy'],
            type: {'magic': 0.3, 'physical': 0.7},
            element: 'dark',
            damage: 9,
            heal: 5,
            healTarget: 'source'
        }),

        deathtouch: new Ability({
            name: 'Death Touch',
            description: "An attack that deals a true damage equal to 25% of the enemy's current health, ignoring armor and magic resist",
            effectId: 'magicMissle',
            castTime: 1,
            timeCost: 1,
            castDuration: 1.5,
            validTargets: ['enemy'],
            type: {'magic': 0.5, 'physical': 0.5},
            element: 'dark',
            damage: '25%',
            effect: function(options){
                // Does 10% of entity's health in damage
                var self = this;
                var delay = this.getCastDuration(options);

                new Timer(function effectDamageDelay(){
                    var target = options.target;
                    var amount = target.get('baseAttributes').get('maxHealth');
                    amount = Math.ceil(0.25 * target.get('baseAttributes').get('health'));

                    target.takeTrueDamage({
                        sourceAbility: self,
                        source: options.source,
                        target: options.target,
                        type: self.get('type'),
                        element: self.get('element'),
                        amount: amount
                    });

                }, delay);
            }
        })
    };


    return abilities;
});
