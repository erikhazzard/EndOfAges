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
                it('should increase or decrease ability casting time for an entity', function(done){
                    var ability = new Ability({
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

                    // TODO: buffEffects should affect ALL abilities
                    //
                    var entity1 = new Entity({
                        abilities: new Abilities([ability, ability2])
                    });

                    // base cast time should be the same
                    ability.attributes.castTime.should.equal(1);
                    ability2.attributes.castTime.should.equal(1);

                    // Apply buff
                    // >>>>>>
                    ability.effect({ source: entity1, target: entity1 });

                    // give it time to do the effect
                    setTimeout(function(){
                        ability.attributes.castTime.should.equal(0.8);
                        ability2.attributes.castTime.should.equal(0.8);
                        done();
                    }, 30);
                });
            });
        });


    });
});
