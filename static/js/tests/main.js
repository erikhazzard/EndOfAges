//========================================
//Require Config (load additional libraries)
//========================================
requirejs.config({
    baseUrl: '/static/js',
    //For dev
    urlArgs: 'v='+(new Date()).getTime(),

    paths: {
        'jquery-ui': 'lib/jquery.ui',

        d3: 'lib/d3',
        async: 'lib/async.min',
    
        // We're using lodash in place of underscore
        lodash: 'lib/lodash.compat',
        
        jwerty: 'lib/jwerty.min',
        sinon: 'lib/sinon',

        backbone: 'lib/backbone',
        marionette: 'lib/marionette',
        bootstrap: 'lib/bootstrap'
    },
    shim: {
        'sinon': {
            exports: 'sinon'
        },
        'jquery-ui': {
            deps: ['jquery'], 
            exports: '$'
        },
        'd3': {
            exports: 'd3'
        },
        'lodash': {
            exports: '_'
        },

        'jwerty': {
            exports: 'jwerty'
        },

        'backbone': {
            //These script dependencies should be loaded before loading
            //backbone.js
            deps: ['lodash'], 
            //Once loaded, use the global 'Backbone' as the
            //module value.
            exports: 'Backbone'
        },
        'async': {
            exports: 'async'
        },
        'marionette' : {
            deps : ['backbone'],
            exports : 'Marionette'
        },
        'logger': {
            exports: 'logger'
        },
        'bootstrap': {
            exports: 'jquery',
            deps: ['jquery'] 
        }
    }
});
//========================================
//Setup tests
//========================================
require(['events',
        'logger',
        'require', 'lib/chai', 'lib/mocha', 'sinon'], 
        function(events, logger, require, chai, sinon){

    assert = chai.assert;
    should = chai.should();
    expect = chai.expect;

    mocha.setup('bdd');
    logger.options.logLevel = [
        'error'
        , 'collections/Entities'
        , 'views/subviews/Battle'
    ];

    //-----------------------------------
    //Tests go here
    //-----------------------------------
    require([
        'tests/collections/Entities'
        , 'tests/views/subviews/Battle'
        ], function( ){

        //Start runner
        mocha.run();
    });
});
