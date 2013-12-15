//============================================================================
//
// Server endpoint tests - user 
//
//  NOTE: Assumes database has seeded data
//
//============================================================================
var mocha = require('mocha');
var should = require('chai').should();
var api = require('./test-config').api;
var API_URL = require('../conf/API_URL');

// User Tests
// --------------------------------------
describe('USER', function(){
    describe('POST', function(){
        describe(API_URL + '/login', function(){
            //// Correct PW
            //// NOTE: If we implment this, right now we're using delegated
            //// auth with facbeook
            //
            //it('should login with seeded username / pw', function(done){
                //api.post(API_URL + '/login')
                    //.field('username', 'soandso')
                    //.field('password', 'soandso!pw1!')
                    //.expect('Content-Type', /json/)
                    //.expect(200, done);
            //});

            // Invalid password
            it('should NOT login with invalid pw', function(done){
                api.post(API_URL + '/login')
                    .field('username', 'soandso')
                    .field('password', 'fake')
                    .expect('Content-Type', /json/)
                    .expect(401, done);
            });

            // should logout
            describe('LOGOUT', function(){
                it('should logout', function(done){
                    api.get(API_URL + '/logout')
                        .expect(302, done);
                });
            });
        });
    });
});
