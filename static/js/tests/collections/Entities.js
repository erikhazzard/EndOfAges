//========================================
//Tests - Entities Collection
//========================================
define([
    'events',
    'models/Entity',
    'collections/Entities'
    ], function(events, Entity, Entities){

    describe('Entities Collection', function(){
    describe('INITIALIZE', function(){
        
        var entities = new Entities([
            new Entity({}),
            new Entity({})
        ], { group: 'player' });
        it('should have two entities', function(){
            entities.models.length.should.equal(2);
        });
    });

    // Check for group defeat
    describe('Entity death', function(){
        it('should call entityGroup:defeated when all entities die', function(done){
            var entities = new Entities([
                new Entity({}),
                new Entity({})
            ], { group: 'player' });

            entities.listenTo(entities, 'entityGroup:defeated', function(options){
                // if it called it, we're good
                true.should.equal.true;
                done();
            });

            // kill the entities
            _.each(entities.models, function(model){
                model.get('attributes').set({'health': 0});
            });
        });
    });
    });
});
