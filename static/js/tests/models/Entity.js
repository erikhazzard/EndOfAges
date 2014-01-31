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
    });
});
