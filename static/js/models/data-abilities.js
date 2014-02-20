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
            effectId: 'placeHolder',
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
            description: "Virtue bolsters an ally's armor, magic resist, and maximum health",
            effectId: 'placeHolder',
            castTime: 0.5,
            timeCost: 0.5,
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

        // TODO:  Have truedamage be a side effect in the default damage func
        judgement: new Ability({
            name: 'Judgement',
            effectId: 'placeHolder',
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
            effectId: 'placeHolder',
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

        // TODO: Have true damage be a part of the damage func
        deathtouch: new Ability({
            name: 'Death Touch',
            description: "An attack that deals a true damage equal to 25% of the enemy's current health, ignoring armor and magic resist",
            effectId: 'placeHolder',
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
        }),

        // ==============================
        // 
        // Assassin
        //
        // ==============================
        stab: new Ability({
            name: 'Stab',
            description: 'A quick stabbing attack which deals a small amount of damage',
            effectId: 'placeHolder',
            castTime: 0.6,
            timeCost: 0.6,
            castDuration: 0.2,
            validTargets: ['enemy'],
            type: {'physical': 1},
            element: 'air',
            damage: 3,
            attackBonusPercent: 0.1
        }),
        backstab: new Ability({
            name: 'Backstab',
            description: 'A powerful attack which will do additional damage if the enemy has recently been stabbed',
            effectId: 'placeHolder',
            castTime: 0.6,
            timeCost: 0.6,
            castDuration: 1,
            validTargets: ['enemy'],
            type: {'physical': 1},
            element: 'air',
            damage: 7,
            attackBonusPercent: 0.2,
            effect: function effect(options){
                var self = this;
                var delay = this.getCastDuration(options);
                var amount = this.get('damage');
                var intendedTarget = options[this.get('damageTarget')];
                // TODO: make sure castDuration is always the current castDuration
                var castDuration = self.attributes.castDuration * 1000;

                new Timer(function effectDamageDelay(){
                    var healthHistory = intendedTarget.get('healthHistory');
                    var i,len;
                    var now = new Date();
                    if(healthHistory){
                        for(i=0,len=healthHistory.length;i<len;i++){
                            // only check for effects that have happened since this was cast
                            if((now - healthHistory[i].date) <= castDuration){
                                amount += 10;
                            } else {
                                // otherwise, break
                                break;
                            }
                        }
                    }
                    amount = intendedTarget.takeDamage({
                        type: self.get('type'),
                        element: self.get('element'),
                        amount: amount,
                        sourceAbility: self,
                        target: options.target,
                        source: options.source
                    });
                    if(options.callback){ options.callback(); }
                }, delay);

            }
        })

    };


    return abilities;
});
