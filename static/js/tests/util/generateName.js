//========================================
//
//Test for generateName function
//
//========================================
define([
        'util/generateName'
    ], function(generateName){ 

    describe('generateName()', function(){
        it('should generate a bunch of names and make sure they are valid', function(){
            var name;

            for(var i=0; i < 500; i++){
                name = generateName();
                assert(typeof name === 'string');
            }
        });
    });
});
