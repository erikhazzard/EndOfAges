//========================================
//Tests - Entities Collection
//========================================
define([
    'events',
    'models/Ability',
    'models/Entity'
    ], function(events, Ability, Entity){

    describe('Entity Model Tests', function(){
        describe('INITIALIZE', function(){
            
            // test starting stats
            var entity = new Entity();
            it('should have starting stats', function(){
                assert(entity.get('name') !== undefined);
            });

        });

        // Basic damage tests
        // ------------------------------
        describe('Take damage tests', function(){
            it('should take damage', function(){
                var entity = new Entity();
                var entity2 = new Entity();

                var startingHealth = entity.get('attributes').get('health');
                var amt = 20;

                entity.takeDamage({
                    sourceAbility: null,
                    source: entity2,
                    amount: amt
                });

                entity.get('attributes').get('health').should.equal((startingHealth - amt));
            });
        });


        // Buffs
        // ------------------------------
        describe('Buffs tests', function(){
            it('should add and remove a buff', function(done){
                var buffEffects = { strength: 10, maxHealth: 20 };

                var ability = new Ability({
                    name: 'test',
                    castDuration: 0,
                    timeCost: 0,
                    buffEffects: buffEffects,
                    buffDuration: 0.03 // only last 100 ms
                });

                var entity = new Entity();
                var originalStats = {
                    strength: entity.get('attributes').get('strength'),
                    maxHealth: entity.get('attributes').get('maxHealth')
                };

                // do the buff
                ability.effect({
                    target: entity,
                    source: entity
                });

                // some tests for active effect change
                // NOTE: There's a small delay AFTER the activeEffects are
                // changed, so this is not the last thing to happen
                entity.on('change:activeEffects', function(model, changed, options){
                    assert(options.ability !== undefined);
                });

                // make sure effect got added (small delay for castDuration 
                // timeout)
                // NOTE: use setTimeout, don't use timer library here
                setTimeout(function(){
                    entity.get('activeEffects').length.should.equal(1);
                    entity.get('activeEffects')[0].should.equal(ability.cid);

                    // make sure stats were increased
                    entity.get('attributes').get('strength').should.equal(
                        originalStats.strength + buffEffects.strength
                    );
                    entity.get('attributes').get('maxHealth').should.equal(
                        originalStats.maxHealth + buffEffects.maxHealth
                    );

                }, 7);

                // Finally, make sure buff is removed
                setTimeout(function(){
                    entity.get('activeEffects').length.should.equal(0);
                    entity.get('activeEffects').length.should.equal(0);

                    // make sure stat was set to normal
                    entity.get('attributes').get('strength').should.equal(
                        originalStats.strength 
                    );
                    entity.get('attributes').get('maxHealth').should.equal(
                        originalStats.maxHealth
                    );

                    done();
                }, ability.get('buffDuration') * 1000 * 1.8);
            });
        });
    });
});
