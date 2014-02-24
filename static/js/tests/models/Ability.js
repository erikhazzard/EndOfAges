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

            describe('Buffs', function(){
                it('should increase or decrease ability casting time for an entity', function(done){
                    var ability = new Ability({
                        damage: 2,
                        cooldown: 0.03
                    });
                    var entity1 = new Entity();
                    var entity2 = new Entity();

                    done();
                });
            });
        });


    });
});
