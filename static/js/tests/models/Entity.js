//========================================
//
//Tests - Entity
//
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

        // Buffs
        // ------------------------------
        describe('Buffs tests', function(){

            it('should add and remove a buff, and affect stats', function(done){
                // TODO::::::::::::::::: This doesn't always work, might be
                // a race condition, or a timing issue. Investigate
                var buffEffects = { armor: 10, maxHealth: 20 };

                var ability = new Ability({
                    name: 'test',
                    castDuration: 0,
                    timeCost: 0,
                    buffEffects: buffEffects,
                    buffDuration: 0.03 // last a short time
                });

                var entity = new Entity();
                var originalStats = {
                    armor: entity.get('attributes').get('armor'),
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
                    assert(options.sourceAbility !== undefined);
                });

                // make sure effect got added (small delay for castDuration 
                // timeout)
                // NOTE: use setTimeout, don't use timer library here
                setTimeout(function(){
                    entity.get('activeEffects').length.should.equal(1);
                    entity.get('activeEffects')[0].cid.should.equal(ability.cid);

                    // make sure stats were increased
                    entity.get('attributes').get('armor').should.equal(
                        originalStats.armor + buffEffects.armor
                    );
                    entity.get('attributes').get('maxHealth').should.equal(
                        originalStats.maxHealth + buffEffects.maxHealth
                    );

                }, 20);

                // Finally, make sure buff is removed
                setTimeout(function(){
                    // make sure stat was set to normal
                    entity.get('attributes').get('armor').should.equal(
                        originalStats.armor
                    );
                    entity.get('attributes').get('maxHealth').should.equal(
                        originalStats.maxHealth
                    );

                    // TODO: sometimes it's not removed??
                    entity.get('activeEffects').length.should.equal(0);

                    done();
                }, ability.get('buffDuration') * 1000 * 3.7);
            });
        });
    });
});
