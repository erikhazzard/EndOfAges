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
        lodash: 'lib/lodash.min',
        
        jwerty: 'lib/jwerty.min',
        sinon: 'lib/sinon',

        backbone: 'lib/backbone',
        localstorage: 'lib/backbone.localstorage',
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
        'util/d3plugins', // always load d3 plugins, extends d3 object
        'logger',
        'require', 'lib/chai', 'lib/mocha', 'sinon'], 
        function(events, d3plugins, logger, require, chai, sinon){

    assert = chai.assert;
    should = chai.should();
    expect = chai.expect;

    mocha.setup('bdd');
    logger.options.logLevel = [
        'error'
        //,'models/Entity'
        //,'models/Ability'
        ,'tests/models/Entity-buffs'
    ];

    //-----------------------------------
    //Tests go here
    //-----------------------------------
    require([
        'tests/collections/Entities'
        , 'tests/models/Entity'
        , 'tests/models/Entity-damage'
        , 'tests/models/Entity-buffs'
        , 'tests/models/Entity-damage-tracking'
        , 'tests/models/Ability'
        , 'tests/views/subviews/Battle'
        , 'tests/util/generateName'
        , 'tests/util/Timer'
        ], function( ){

        //Start runner
        mocha.run();
    });
});
