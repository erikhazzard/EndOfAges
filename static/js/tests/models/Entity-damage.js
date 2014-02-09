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


        describe('Entity WITH armor and / or magic resist', function(){
            _.each([ [20,100,1],[50,50,1],[50,50,0.5] ], function(d){
                var amt = d[0];
                var armor = d[1];
                var factor = d[2];

                it('should take damage (base of ' + amt + ') from ' + 
                (factor * 100) + '% physical attack with ' + armor + 
                ' armor', function(){
                    var entity = new Entity({ attributes: { armor: armor }});
                    var entity2 = new Entity();

                    var startingHealth = entity.get('attributes').get('health');

                    // get multiplier (pass in type and armor value)
                    var multiplier = calcFunc(factor, armor);

                    entity.takeDamage({
                        sourceAbility: new Ability({ type: {physical: factor}}),
                        source: entity2,
                        amount: amt
                    });

                    // need to multiply it all by the factor, since the types
                    // should always add up to equal 100% ( if factor is 0.5,
                    // amt * multiplier is only half of the damage that would be
                    // applied)
                    entity.get('attributes').get('health').should.equal(
                        startingHealth - (amt * multiplier) * factor
                    );
                });
            });
        });

    });

});
