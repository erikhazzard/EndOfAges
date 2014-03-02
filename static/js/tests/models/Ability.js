//========================================
//Tests - Ability
//========================================
define([
    'events',
    'models/Ability',
    'collections/Abilities',
    'models/Entity'
    ], function(events, Ability, Abilities, Entity){

    describe('Ability Model Tests', function(){
        describe('INITIALIZE', function(){
            it('should properly setup magic and element from string', function(){
                var ability = new Ability({
                    type: 'magic',
                    element: 'fire'
                });

                ability.attributes.type.should.deep.equal({'magic':1}); 
                ability.attributes.element.should.deep.equal({'fire':1}); 
            });
            it('should properly setup magic and element from object', function(){
                var ability = new Ability({
                    type: {magic: 1},
                    element: {fire: 1}
                });

                ability.attributes.type.should.deep.equal({magic:1}); 
                ability.attributes.element.should.deep.equal({fire:1}); 
            });
        });

        describe('USAGE', function(){
            it('should have and use a cooldown timer properly', function(done){
                var ability = new Ability({
                    damage: 2,
                    cooldown: 0.03
                });
                var entity1 = new Entity();
                var entity2 = new Entity();

                ability.canBeUsed().should.be.true;
                ability.effect({ source: entity1, target: entity2 });
                ability.canBeUsed().should.be.false;

                // make sure the effect has no effect if cooldown not met
                ability.effect({ source: entity1, target: entity2 }).should.equal(false);

                setTimeout(function(){
                    ability.canBeUsed().should.true;
                    done();
                }, 60);

            });

            describe('Buffs', function(done){
                it('ability buffs should affect self target', function(done){
                    var ability = new Ability({
                        castTime: 1,
                        cooldown: 0,
                        castDuration: 0.0001,
                        buffDuration: 1,
                        buffEffects: { 
                            armor: 10,
                            abilities: {
                                // 20% faster, so decrease time by 20%
                                castTime: -0.2,
                                timeCost: -0.2
                            }
                        }
                    });
                    var ability2 = new Ability({
                        castTime: 1
                    });

                    var entity1 = new Entity({
                        abilities: new Abilities([ability, ability2])
                    });

                    // base cast time should be the same
                    ability.attributes.castTime.should.equal(1);
                    ability2.attributes.castTime.should.equal(1);

                    // Apply buff
                    ability.effect({ source: entity1, target: entity1 });

                    // give it time to do the effect
                    setTimeout(function(){
                        ability.attributes.castTime.should.equal(0.8);
                        ability2.attributes.castTime.should.equal(0.8);
                        done();
                    }, 30);
                });

                it('should affect other target', function(done){
                    var ability = new Ability({
                        cooldown: 0,
                        castTime: 1,
                        castDuration: 0.0001,
                        buffDuration: 1,
                        buffEffects: { 
                            armor: 10,
                            abilities: {
                                // 20% faster, so decrease time by 20%
                                castTime: -0.2,
                                timeCost: -0.2
                            }
                        }
                    });
                    var ability2 = new Ability({
                        castTime: 1
                    });
                    var enemyAbility = new Ability({ castTime: 1 });
                    var enemyAbility2 = new Ability({ castTime: 2 });

                    var entity1 = new Entity({
                        abilities: new Abilities([ability, ability2])
                    });
                    var entity2 = new Entity({
                        abilities: new Abilities([enemyAbility, enemyAbility2])
                    });

                    // base cast time should be the same
                    ability.attributes.castTime.should.equal(1);
                    ability2.attributes.castTime.should.equal(1);
                    enemyAbility.attributes.castTime.should.equal(1);
                    enemyAbility2.attributes.castTime.should.equal(2);

                    // Apply buff
                    ability.effect({ source: entity1, target: entity2 });

                    // give it time to do the effect
                    setTimeout(function(){
                        // player abilities should be unaffected
                        ability.attributes.castTime.should.equal(1);
                        ability2.attributes.castTime.should.equal(1);
                        // enemy ability should be affected
                        enemyAbility.attributes.castTime.should.equal(0.8);
                        enemyAbility2.attributes.castTime.should.equal(1.6);
                        done();
                    }, 30);
                });


                // Removal
                it('should be removed', function(done){
                    var ability = new Ability({
                        castTime: 1,
                        castDuration: 0.0001,
                        buffDuration: 0.1,
                        cooldown: 0,
                        buffEffects: { 
                            armor: 10,
                            abilities: {
                                // 20% faster, so decrease time by 20%
                                castTime: -0.2,
                                timeCost: -0.2
                            }
                        }
                    });
                    var ability2 = new Ability({
                        castTime: 1
                    });
                    var enemyAbility = new Ability({
                        castTime: 1
                    });

                    var entity1 = new Entity({
                        abilities: new Abilities([ability, ability2])
                    });
                    var entity2 = new Entity({
                        abilities: new Abilities([enemyAbility])
                    });

                    // base cast time should be the same
                    ability.attributes.castTime.should.equal(1);
                    ability2.attributes.castTime.should.equal(1);

                    // Apply buff to self
                    ability.effect({ source: entity1, target: entity1 });
                    // also, apply it to enemy 
                    ability.effect({ source: entity1, target: entity2 });

                    // give it time to do the effect
                    setTimeout(function(){
                        // player abilities should be affected
                        ability.attributes.castTime.should.equal(0.8);
                        ability2.attributes.castTime.should.equal(0.8);
            
                        console.log( enemyAbility.attributes.castTime );

                        // enemy ability should be affected
                        enemyAbility.attributes.castTime.should.equal(0.8);

                        // and time to be removed
                        setTimeout(function(){
                            // should set all back to normal
                            ability.attributes.castTime.should.equal(1);
                            ability2.attributes.castTime.should.equal(1);
                            enemyAbility.attributes.castTime.should.equal(1);
                            done();
                        }, 150);
                    }, 30);
                });

                // STACKING test
                // ----------------------

            });
        });


    });
});
