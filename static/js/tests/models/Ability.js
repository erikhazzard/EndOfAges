//========================================
//Tests - Ability
//========================================
define([
    'events',
    'models/Ability',
    'models/Entity'
    ], function(events, Ability, Entity){

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
    });
});
