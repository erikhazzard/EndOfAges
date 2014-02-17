//========================================
//
//Tests - Entity Damage functions
//
//========================================
define([
    'events',
    'models/Ability',
    'models/Entity'
    ], function(events, Ability, Entity){

    var calcFunc = Entity.prototype.calculateDamageMultiplier;


    describe('Entity - Damage tests', function(){
        describe('Formula for damage based on stats', function(){
            it('should be a 50% reduction at 100 resist for armor for 100% physical damage', function(){
                var mult = calcFunc(1, 100);
                mult.should.equal(0.5);
            });
            it('should be a 50% increase at 100 resist for armor for 100% physical damage', function(){
                var mult = calcFunc(1, -100);
                mult.should.equal(1.5);
            }); 
            it('should return 1 when no resist', function(){
                var mult = calcFunc(1, 0);
                mult.should.equal(1);
            });
            it('should return 1 when no resist', function(){
                var mult = calcFunc(1, 0);
                mult.should.equal(1);
            });
            it('should return proper values for various tests', function(){
                // scaled factor
                calcFunc(0.5, 120).should.equal(0.625);
                calcFunc(0.5, -120).should.equal(1.375);
            });
        });
            
        describe('Entity with no armor or magic resist', function(){
            // test starting stats
            var entity = new Entity();
            var entity2 = new Entity();

            it('should take damage from a magic ability', function(){
                var startingHealth = entity.get('attributes').get('health');
                var amt = 20;

                entity.takeDamage({
                    sourceAbility: new Ability({ type: {magic: 1}}),
                    source: entity2,
                    amount: amt
                });

                entity.get('attributes').get('health').should.equal((startingHealth - amt));
            });

            it('should take damage from a physcial ability', function(){
                var startingHealth = entity.get('attributes').get('health');
                var amt = 20;

                entity.takeDamage({
                    sourceAbility: new Ability({ type: {physical: 1}}),
                    source: entity2,
                    amount: amt
                });

                entity.get('attributes').get('health').should.equal((startingHealth - amt));
            });

            it('should take damage from a mixed ability', function(){
                var startingHealth = entity.get('attributes').get('health');
                var amt = 20;

                entity.takeDamage({
                    sourceAbility: new Ability({ type: {physical: 0.5, magic: 0.5}}),
                    source: entity2,
                    amount: amt
                });

                entity.get('attributes').get('health').should.equal((startingHealth - amt));
            });
        });


        // ------------------------------
        // Basic tests of just armor and MR
        // ------------------------------
        describe('Entity WITH armor and / or magic resist', function(){
            _.each([ 'armor', 'magicResist' ], function(resist){
                var entity = new Entity();
                _.each([ [20,100,1],[50,50,1],[50,50,0.5], [100, 80, 1] ], function(d){
                    var amt = d[0];
                    var resistValue = d[1];
                    var factor = d[2];
                    // get multiplier (pass in type and armor value)
                    var multiplier = calcFunc(factor, resistValue);
                    var dmg =  (amt * multiplier) * factor;
                    var targetAttrs = {};
                    targetAttrs[resist] = resistValue;

                    it('should take ' + dmg + ' damage (base of ' + amt + ') from ' + 
                    (factor * 100) + '% ' + resist + ' attack with ' + resistValue + 
                    ' ' + resist, function(){
                        var entity = new Entity({ attributes: targetAttrs });
                        var entity2 = new Entity();

                        var startingHealth = entity.get('attributes').get('health');

                        var dmgType = {};
                        if(resist === 'armor'){ 
                            dmgType.physical = factor;
                        } else if (resist === 'magicResist'){
                            dmgType.magic = factor;
                        }

                        entity.takeDamage({
                            sourceAbility: new Ability({ type: dmgType}),
                            source: entity2,
                            amount: amt
                        });

                        // need to multiply it all by the factor, since the types
                        // should always add up to equal 100% ( if factor is 0.5,
                        // amt * multiplier is only half of the damage that would be
                        // applied)
                        entity.get('attributes').get('health').should.equal(
                            Math.round(startingHealth - dmg)
                        );
                    });
                });
            });
        });

        // ------------------------------
        // attack / spellpower with armor / mr
        // ------------------------------
        describe('Entity with attack / magic power', function(){
            _.each(['attack', 'magicPower'], function(type){
                it(type + ' ::: should take extra damage when other entity has more attack', function(){
                    var attrs = {};
                    attrs[type] = 20;

                    var entity = new Entity({ });
                    var entity2 = new Entity({ attributes: attrs });

                    var startingHealth = entity.get('attributes').get('health');
                    var amt = 20;
                    var abilityType = {};
                    if(type === 'attack'){ abilityType.physical = 1; }
                    else { abilityType.magic = 1; }

                    entity.takeDamage({
                        sourceAbility: new Ability({ type: abilityType }),
                        source: entity2,
                        amount: amt
                    });

                    // when armor is at 0, the attack should just add damage based
                    // on whatever the attack value is
                    entity.get('attributes').get('health').should.equal((startingHealth - amt ));
                });
            });

            describe("Ability with bonuses", function(){
                _.each(['attack', 'magicPower'], function(type){
                    it(type + ' ::: should take extra damage when ability bonuses are 100%', function(){
                        var attrs = {};
                        attrs[type] = 20;

                        var entity = new Entity({ });
                        var entity2 = new Entity({ attributes: attrs });

                        var startingHealth = entity.get('attributes').get('health');
                        var amt = 20;
                        var abilityType = {};

                        if(type === 'attack'){ abilityType.physical = 1; }
                        else { abilityType.magic = 1; }

                        entity.takeDamage({
                            sourceAbility: new Ability({ 
                                type: abilityType,
                                attackBonusPercent: 1,
                                magicPowerBonusPercent: 1
                            }),
                            source: entity2,
                            amount: amt
                        });

                        // when armor is at 0, the attack should just add damage based
                        // on whatever the attack value is
                        entity.get('attributes').get('health').should.equal((startingHealth - amt ) - 20);
                    });
                });

                _.each(['attack', 'magicPower'], function(type){
                    it(type + ' ::: should take extra damage when ability bonuses are 50%', function(){
                        var attrs = {};
                        attrs[type] = 20;

                        var entity = new Entity({ });
                        var entity2 = new Entity({ attributes: attrs });

                        var startingHealth = entity.get('attributes').get('health');
                        var amt = 20;
                        var abilityType = {};

                        if(type === 'attack'){ abilityType.physical = 1; }
                        else { abilityType.magic = 1; }

                        entity.takeDamage({
                            sourceAbility: new Ability({ 
                                type: abilityType,
                                attackBonusPercent: 0.5,
                                magicPowerBonusPercent: 0.5
                            }),
                            source: entity2,
                            amount: amt
                        });

                        // when armor is at 0, the attack should just add damage based
                        // on whatever the attack value is
                        entity.get('attributes').get('health').should.equal((startingHealth - amt ) - 10);
                    });
                });
            });

            // ------------------------------
            // mixed types
            // ------------------------------
            it('should correctly return values when ability is mixed', function(){
                var entity = new Entity({ 
                    attributes: {health: 100}
                });
                var entity2 = new Entity({ attributes: {
                    attack: 10, magicPower: 10
                }});

                var amt = 20;

                entity.takeDamage({
                    sourceAbility: new Ability({ type: {
                        magic: 0.5, physical: 0.5
                    }}),
                    source: entity2,
                    amount: amt
                });

                // when armor is at 0, the attack should just add damage based
                // on whatever the attack value is
                entity.get('attributes').get('health').should.equal(80);

                // should subtract another 30 (takes into account rounding)
                entity.takeDamage({
                    sourceAbility: new Ability({ type: {
                        magic: 0.2, physical: 0.8
                    }}),
                    source: entity2,
                    amount: amt
                });

                entity.get('attributes').get('health').should.equal(60);
            });

            // ------------------------------
            // armor and defense
            // ------------------------------
            it('should work for mixed type and armor and mr', function(){
                var entity = new Entity({ 
                    attributes: {
                        armor: 10,
                        magicResist: 10,
                        health: 100
                    }
                });
                var entity2 = new Entity({ attributes: {
                    attack: 10, magicPower: 10
                }});

                var amt = 20;

                entity.takeDamage({
                    sourceAbility: new Ability({ type: {
                        magic: 0.5, physical: 0.5
                    }}),
                    source: entity2,
                    amount: amt
                });

                // when armor is at 0, the attack should just add damage based
                // on whatever the attack value is
                entity.get('attributes').get('health').should.equal(81);
            });
            
            it('should work for physical type and armor', function(){
                var entity = new Entity({ 
                    attributes: {
                        armor: 20,
                        magicResist: 10,
                        health: 100
                    }
                });
                var entity2 = new Entity({ attributes: {
                    attack: 20, 
                    magicPower: 90 // should do nothing here
                }});

                var amt = 20;

                entity.takeDamage({
                    sourceAbility: new Ability({ type: {
                        physical: 1
                    }}),
                    source: entity2,
                    amount: amt
                });

                // when armor is at 0, the attack should just add damage based
                // on whatever the attack value is
                entity.get('attributes').get('health').should.equal(83);
            });
        });
        
        // ------------------------------
        // Death
        // ------------------------------
        describe('Entity death', function(){
            it('should kill entity when health drops below 0', function(){
                var entity1 = new Entity();
                var entity2 = new Entity();
                var ability = new Ability();

                // update health
                entity1.get('attributes').set({
                    health: -10
                }, { 
                    sourceAbility: ability, 
                    source: entity2
                });

                entity1.get('isAlive').should.equal(false);
                entity1.get('deaths').should.equal(1);
                entity2.get('kills').should.equal(1);

            });
        });
    });

});
