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
    });
});
