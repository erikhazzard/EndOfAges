//========================================
//Tests - Ability
//========================================
define([
    'events',
    'logger',
    'models/Ability',
    'collections/Abilities',
    'models/Entity'
    ], function(events, logger, Ability, Abilities, Entity){

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
            // --------------------------
            // Ability Buffs
            // --------------------------
            describe('Buffs', function(){

                it('ability buffs should affect self target', function(done){
                    var ability = new Ability({
                        castTime: 1, cooldown: 0, castDuration: 0.0001,
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
                        buffDuration: 0.05,
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
                        }, 60);
                    }, 20);
                });
                
                // ======================
                //
                // Ability buffs - abilities which modify other abilities
                //
                // ======================
                describe('ABILITY Buffs - abilities modifying other abilities', function(){
                    it('ability buffs should add and remove an ability buff', function(done){
                        var ability = new Ability({
                            name: 'Test 1',
                            castTime: 0, cooldown: 0, castDuration: 0.0001,
                            buffDuration: 0.05,
                            buffEffects: { 
                                abilities: {
                                    // decrease duration by 20%
                                    buffDuration: -0.2
                                }
                            }
                        });

                        var ability2 = new Ability({ name: 'Test 2', buffDuration: 1 });
                        var ability3 = new Ability({ name: 'Test 3', buffDuration: 1 });

                        var entity1 = new Entity({
                            abilities: new Abilities([ability, ability2, ability3])
                        });

                        // base cast time should be the same
                        ability.attributes.buffDuration.should.equal(0.05);
                        ability2.attributes.buffDuration.should.equal(1);
                        ability3.attributes.buffDuration.should.equal(1);

                        ability.attributes.activeEffects.length.should.equal(0);
                        ability2.attributes.activeEffects.length.should.equal(0);
                        ability3.attributes.activeEffects.length.should.equal(0);

                        // Apply buff
                        ability.effect({ source: entity1, target: entity1 });

                        // test adding the buff
                        setTimeout(function(){

                            ability.attributes.buffDuration.should.equal(0.04);
                            ability2.attributes.buffDuration.should.equal(0.8);
                            ability3.attributes.buffDuration.should.equal(0.8);

                            ability.attributes.activeEffects.length.should.equal(1);
                            ability2.attributes.activeEffects.length.should.equal(1);
                            ability3.attributes.activeEffects.length.should.equal(1);

                            setTimeout(function(){
                                // now, it should have worn off
                                ability.attributes.buffDuration.should.equal(0.05);
                                ability2.attributes.buffDuration.should.equal(1);
                                ability3.attributes.buffDuration.should.equal(1);

                                ability.attributes.activeEffects.length.should.equal(0);
                                ability2.attributes.activeEffects.length.should.equal(0);
                                ability3.attributes.activeEffects.length.should.equal(0);

                                done();
                            }, 70);

                        }, 16);
                    });
                });


                // ----------------------
                // STACKING test
                // ----------------------
                describe("Buff Stacking", function(){
                    // basic ability
                    it('basic buff which stack should stack and remove at once', function(done){
                        var ability = new Ability({
                            castTime: 1, cooldown: 0, castDuration: 0.0001,
                            buffDuration: 0.035,
                            buffCanStack: true,
                            buffEffects: { 
                                armor: 10,
                            }
                        });
                        var entity1 = new Entity({
                            attributes: { armor: 10 },
                            abilities: new Abilities([ability])
                        });

                        entity1.get('attributes').attributes.armor.should.equal(10);

                        // Apply buff
                        ability.effect({ source: entity1, target: entity1 });
                        ability.effect({ source: entity1, target: entity1 });
                        ability.effect({ source: entity1, target: entity1 });

                        // give it time to do the effect
                        setTimeout(function(){
                            entity1.get('attributes').attributes.armor.should.equal(40);

                            // remove it
                            setTimeout(function(){
                                entity1.get('attributes').attributes.armor.should.equal(10);
                                done();
                            }, 50);
                        }, 16);
                    });

                    describe('Ability Buffs', function(){
                        // basic ability
                        it('should stack a bunch then remove', function(done){
                            var ability = new Ability({
                                castTime: 1, cooldown: 0, castDuration: 0.0001,
                                buffDuration: 0.03,
                                buffCanStack: true,
                                buffEffects: { 
                                    abilities: {
                                        // decrease duration by 20%
                                        castTime: -0.2
                                    }
                                }
                            });
                            var ability2 = new Ability({
                                castTime: 1, cooldown: 0, castDuration: 0.0001,
                                buffDuration: 0.035,
                            });

                            var entity1 = new Entity({
                                abilities: new Abilities([ability, ability2])
                            });

                            // base cast time should be the same
                            ability.attributes.castTime.should.equal(1);

                            // Apply buff
                            ability.effect({ source: entity1, target: entity1 });
                            ability.effect({ source: entity1, target: entity1 });
                            ability.effect({ source: entity1, target: entity1 });

                            // give it time to do the effect
                            setTimeout(function(){
                                ability.attributes.castTime.should.equal(0.512);
                                ability.attributes.activeEffects.length.should.equal(3);

                                // remove it
                                setTimeout(function(){
                                    ability.attributes.castTime.should.equal(1);
                                    done();
                                }, 30);
                            }, 16);
                        });

                        it('ability buff should stack properly', function(done){
                            var ability = new Ability({
                                castTime: 1, cooldown: 0, castDuration: 0.0001,
                                buffDuration: 0.1,
                                buffCanStack: true,
                                buffEffects: { 
                                    abilities: {
                                        // decrease duration by 20%
                                        castTime: -0.2
                                    }
                                }
                            });
                            var ability2 = new Ability({
                                castTime: 1, cooldown: 0, castDuration: 0.0001,
                                buffDuration: 0.035,
                            });

                            var entity1 = new Entity({
                                abilities: new Abilities([ability, ability2])
                            });

                            // base cast time should be the same
                            ability.attributes.castTime.should.equal(1);

                            // Apply buff
                            ability.effect({ source: entity1, target: entity1 });

                            // give it time to do the effect
                            setTimeout(function(){
                                ability.attributes.castTime.should.equal(0.8);

                                // add again ( can stack )
                                ability.effect({ source: entity1, target: entity1 });

                                setTimeout(function(){
                                    // make sure it was added
                                   ability.attributes.castTime.should.equal(0.64);

                                    //make sure the first effect was removed 
                                    //  (which would add 0.2 back to the cast time)
                                    setTimeout(function(){
                                        ability.attributes.castTime.should.equal(0.84);

                                        setTimeout(function(){
                                            // and finally, ensure the second effect 
                                            // was removed, which should add .16 (the value
                                            // from the second buff, .8 - .64)
                                            ability.attributes.castTime.should.equal(1);
                                            done();
                                        }, 50);
                                    }, 50); 

                                }, 20);

                            }, 50);
                        });
                    });
                });

            });
        });


    });
});
