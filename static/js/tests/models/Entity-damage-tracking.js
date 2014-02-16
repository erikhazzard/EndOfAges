//========================================
//
//Tests - Entity Damage Tracking functions
//
//========================================
define([
    'events',
    'models/Ability',
    'models/Entity'
], function(events, Ability, Entity){

    describe('Entity - Damage Tracking', function(){

        describe('Track when health changes', function(){
            it('should keep track of damage dealt to entity', function(){
                var entity1 = new Entity();
                var entity2 = new Entity();
                var ability = new Ability({ 
                    name: 'Test Ability',
                    element: {fire: 1},
                    type: {magic: 1}
                });

                // should have no history
                entity1.get('healthHistory').length.should.equal(0);

                // make sure it triggers a change event as well
                entity1.on('change:healthHistory', function(model, healthHistory){
                    healthHistory.length.should.equal(1);
                });

                // updat health
                entity1.get('attributes').set({
                    health: 20
                }, {
                    sourceAbility: ability, 
                    source: entity2
                });

                // should have history after updating health
                entity1.get('healthHistory').length.should.equal(1);
                assert(entity1.get('healthHistory')[0].date !== undefined);
                assert(entity1.get('healthHistory')[0].amount !== undefined);
                assert(entity1.get('healthHistory')[0].element !== undefined);
                assert(entity1.get('healthHistory')[0].type !== undefined);

            });
        });

    });
});
