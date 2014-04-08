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
            castTime: 5.5,
            timeCost: 5.5,
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
                maxHealth: 10,

                abilities: {
                    //// 20% faster, so decrease time by 20%
                    //coolDown: -0.5,
                    //castDuration: -0.5,
                    //castTime: -0.5,
                    //timeCost: -0.5
                }
            }
        }),

        // TODO:  Have truedamage be a side effect in the default damage func
        judgement: new Ability({
            name: 'Judgement',
            effectId: 'placeHolder',
            castTime: 5,
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
                                // TODO: check for a single ability
                                // TODO: scale based on entity's attack bonus
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
        }),

        cripple: new Ability({
            name: 'Cripple',
            description: "Cripple weakens an enemy, lowering their attack and defense",
            effectId: 'placeHolder',
            castTime: 0.5,
            timeCost: 0.5,
            damage: 0,
            validTargets: ['enemy'],
            type: 'magic',
            element: 'air',

            buffDuration: 8,
            // TODO : scale effect
            buffEffects: { 
                armor: -10,
                attack: -10
            }
        }),

        assassinate: new Ability({
            name: 'Assassinate',
            description: "An attack which deals tremendous damage, having a chance to kill the enemy the lower the enemy's health is",
            effectId: 'placeHolder',
            castTime: 0.6,
            timeCost: 0.6,
            castDuration: 1,
            validTargets: ['enemy'],
            type: {'physical': 1},
            element: 'air',
            damage: 10,
            attackBonusPercent: 0.6,
            effect: function effect(options){
                var self = this;
                var delay = this.getCastDuration(options);
                var amount = this.get('damage');
                var intendedTarget = options[this.get('damageTarget')];
                // TODO: make sure castDuration is always the current castDuration
                var castDuration = self.attributes.castDuration * 1000;

                // Add the entity's health to the effect.
                // TODO: calculate entity difficultly and scale damage based on
                // it
                amount += (
                    intendedTarget.get('attributes').get('health') / (Math.random() * 4 | 0)
                );

                new Timer(function effectDamageDelay(){
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
        }),

        // ------------------------------
        // Other effects
        // ------------------------------
        freezeTime: new Ability({
            name: 'Freeze Time',
            description: "Temporarily suspends an enemy's timer. Enemies can still use abilities",
            effectId: 'placeHolder',
            castTime: 0.5,
            timeCost: 0.5,
            validTargets: ['enemy'],
            type: 'magic',
            element: 'light',

            buffDuration: 8,
            buffEffects: { 
                timerFactor: -1.0,

                abilities: {
                }
            }
        }),
        stun: new Ability({
            name: 'Stun',
            description: "Temporarily prevents an enemy from using abilities. Timer continues to tick", 
            effectId: 'placeHolder',
            castTime: 0.5,
            timeCost: 0.5,
            validTargets: ['enemy'],
            type: 'magic',
            element: 'light',

            buffDuration: 8,
            // to prevent ability usage, set the time to be greater than the
            // entitiy's max timer value. Setting to something ridiculously high
            // also accomplishes this
            buffEffects: { 
                abilities: {
                    castTime: 9999999
                }
            }
        }),
        comatose: new Ability({
            name: 'Comatose',
            description: "Temporarily prevents enemies from using abilities and gaining time. Deals damage based on enemy's timer",
            effectId: 'placeHolder',
            castTime: 0.5,
            timeCost: 0.5,
            validTargets: ['enemy'],
            type: 'magic',
            element: 'light',

            damage: 1,
            // TODO: Deal damage based on entity's timer value

            buffDuration: 8,
            // to prevent ability usage, set the time to be greater than the
            // entitiy's max timer value. Setting to something ridiculously high
            // also accomplishes this
            buffEffects: { 
                timerFactor: -1.0,
                abilities: {
                    castTime: 9999999
                }
            }
        }),
        haste: new Ability({
            name: 'Haste',
            description: "Increases your timer speed by 50%",
            effectId: 'placeHolder',
            castTime: 0.5,
            timeCost: 0.5,
            validTargets: ['player'],
            type: 'magic',
            element: 'light',

            buffDuration: 8,
            buffEffects: { 
                timerFactor: 0.5
            }
        })

    };


    return abilities;
});
