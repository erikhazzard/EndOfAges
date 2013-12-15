//============================================================================
//
// Server endpoint tests - base
//
//============================================================================
var mocha = require('mocha');
var should = require('chai').should();
var api = require('./test-config').api;

//---------------------------------------
//Base tests
//---------------------------------------
describe('/ping endpoint', function(){
    it('should return response', function(done){
        api.get('/ping')
            .expect(200, done);
    });
});
