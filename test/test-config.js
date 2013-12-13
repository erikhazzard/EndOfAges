// ===========================================================================
//
// test config
//  configs test parameters
//
// ===========================================================================
var nconf = require('nconf');
require('conf/configure')();

var winston = require('winston');
require('conf/configure-winston')();

// Setup mongo
var db = require('lib/database');

//Use port 8010 for the test server
var request = require('supertest');

var app = require('../lib/app');
var api = request(app);
module.exports.api = api;
