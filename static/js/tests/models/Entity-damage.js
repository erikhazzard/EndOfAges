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

    describe('Entity - Damage tests', function(){
        describe('Formula for damage based on stats', function(){
            var calcFunc = Entity.prototype.calculateDamageMultiplier;

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


    });

});
