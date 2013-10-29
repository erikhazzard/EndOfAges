//----------------------------------------------------------------------------
//
//server.js
//
//  The main API and app server object. Express runs the server, and provides
//      routes for API functionality
//
//----------------------------------------------------------------------------
//Express setup
var winston = require('winston');
var express = require('express');
var passport = require('./app-passport');

var app = express();

//---------------------------------------
//Configuration
//  Configure the app by passing it into the config function
//---------------------------------------
require('../conf/configure-app.js')(app);

//---------------------------------------
// Routes - api, app, and admin
//---------------------------------------
require('./routes-api')(app);
require('./routes-app')(app);
//require('./routes-admin')(app);

module.exports = app;
