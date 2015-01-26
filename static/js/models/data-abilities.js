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
    logger.log('models/data-abilities', 'Creating abilities');

    // Here be abilities. This would be loaded in a DB and entities would
    // get abilities from server
    var abilities = [

        // ==============================
        // 
        // Assassin
        //
        // ==============================
        {
            name: 'Stab',
            id: 'stab',
            spellTypes: ['damage'],
            description: 'A quick stabbing attack which deals a small amount of damage',
            effectId: 'placeHolder',
            sprite: 'stab',
            castTime: 0.6,
            timeCost: 0.6,
            castDuration: 0.2,
            validTargets: ['enemy'],
            type: {'physical': 1},
            element: 'air',
            damage: 3,
            attackBonusPercent: 0.1
        },
        {
            name: 'Backstab',
            id: 'backstab',
            spellTypes: ['damage'],
            description: 'A powerful attack which will do additional damage based on previous attacks',
            effectId: 'placeHolder',
            sprite: 'backstab',
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
                                amount += 5;
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
        },
        {
            name: 'Suspend',
            id: 'suspend',
            spellTypes: ['debuff'],
            description: "Temporarily prevents a single enemy's timer from regenerating",
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
        },
        {
            name: 'Cripple',
            id: 'cripple',
            spellTypes: ['debuff'],
            description: "Cripple weakens an enemy, lowering their attack and defense",
            effectId: 'placeHolder',
            sprite: 'cripple',
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
        },

        {
            name: 'Assassinate',
            id: 'assassinate',
            spellTypes: ['damage'],
            description: "An attack which deals tremendous damage, having a chance to kill the enemy the lower the enemy's health is",
            effectId: 'placeHolder',
            sprite: 'assassinate',
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
        },

        {
            name: 'Haste',
            id: 'haste',
            spellTypes: ['buff'],
            description: "Increases your timer speed by 20%",
            effectId: 'placeHolder',
            castTime: 0.5,
            timeCost: 0.5,
            validTargets: ['player'],
            type: 'magic',
            element: 'light',

            buffDuration: 8,
            buffEffects: { 
                timerFactor: 0.2
            }
        },

        // ------------------------------
        // Healing - Light
        // ------------------------------
        {
            name: 'Minor Healing',
            id: 'minorHealing',
            spellTypes: ['heal'],
            effectId: 'minorHealing',
            castTime: 3,
            description: "A quick ability that restores a minor amount of health",
            timeCost: 3,
            validTargets: ['player'],
            type: 'magic',
            element: 'light',
            heal: 15
        },
        {
            name: 'Heal',
            id: 'heal',
            description: "This ability provides a greater degree of healing at the expense of a longer usage time",
            spellTypes: ['heal'],
            effectId: 'heal',
            castTime: 5.5,
            timeCost: 5.5,
            validTargets: ['player'],
            type: 'magic',
            element: 'light',
            heal: 20
        },
        // ==============================
        // 
        // Shadowknight
        //
        // ==============================
        {
            name: 'Dark Blade',
            id: 'darkblade',
            spellTypes: ['damage'],
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
        },

        // TODO: Have true damage be a part of the damage func
        {
            name: 'Death Touch',
            id: 'deathtouch',
            spellTypes: ['damage'],
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
        },
        // ------------------------------
        // Damage - Spells
        // ------------------------------
        {
            name: 'Magic Shield',
            id: 'magicshield',
            spellTypes: ['buff'],
            effectId: 'magicshield',
            description: "A shield of magic which increases your armor, magic resistence, and maximum health",
            castTime: 2,
            timeCost: 2,
            validTargets: ['player'],
            type: 'magic',
            element: 'light',
            
            heal: 5,

            buffDuration: 5,

            buffEffects: { 
                armor: 10,
                magicResist: 10,
                maxHealth: 10
            }
        },
        {
            name: 'Fire Comet',
            id: 'firecomet',
            spellTypes: ['damage'],
            description: "A magical comet of fire reigns down on a single enemy, dleaing massive fire damage",
            effectId: 'firecomet',
            castTime: 5,
            timeCost: 5,
            validTargets: ['enemy'],
            type: 'magic',
            element: 'fire',
            damage: 50
        },
        {
            name: 'Ice Spear',
            id: 'icespear',
            spellTypes: ['damage'],
            effectId: 'icespear',
            description: "A quick direct damage spell which deals water damage to a single enemy",
            castTime: 5,
            timeCost: 5,
            validTargets: ['enemy'],
            type: 'magic',
            element: 'fire',
            damage: 50
        },

        // ==============================
        // 
        // Cleric
        //
        // ==============================
        {
            name: 'Smite',
            id: 'smite',
            spellTypes: ['damage', 'heal'],
            description: "Using the force of divine power, you smite your foes with the element of light, damaging them while healing yourself to a small degree.",
            effectId: 'placeHolder',
            castTime: 1,
            timeCost: 1,
            validTargets: ['enemy'],
            type: 'magic',
            element: 'light',
            damage: 10,
            heal: 3,
            healTarget: 'source'
        },
        {
            name: 'Virtue',
            id: 'virtue',
            spellTypes: ['buff', 'heal'],
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
        },

        // TODO:  Have truedamage be a side effect in the default damage func
        {
            name: 'Judgement',
            id: 'judgement',
            spellTypes: ['damage'],
            effectId: 'placeHolder',
            description: "At the expense of a long casting time, this ability decreases your enemy's health by 10%",
            castTime: 6,
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
        },



        // ------------------------------
        // Other effects
        // ------------------------------
        {
            name: 'Stun',
            id: 'stun',
            spellTypes: ['debuff'],
            description: "Temporarily prevents an enemy from using abilities",
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
        },
        {
            name: 'Comatose',
            id: 'comatose',
            spellTypes: ['debuff'],
            description: "Temporarily prevents enemies from using abilities and regenerating time",
            effectId: 'placeHolder',
            castTime: 0.5,
            timeCost: 0.5,
            validTargets: ['enemy'],
            type: 'magic',
            element: 'light',

            damage: 1,

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
        }
    ];


    return abilities;
});
