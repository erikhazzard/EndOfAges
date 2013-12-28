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

        backbone: 'lib/backbone',
        marionette: 'lib/marionette',
        bootstrap: 'lib/bootstrap'
    },
    shim: {
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
// Set everything up
//========================================
require([
    //libs
    'jquery',
    'backbone', 'marionette', 'bootstrap',

    //utils
    'logger', 
    'util/browserInfo',
    'handleKeys',

    //app
    'app', 
    'events',

    'Controller',
    'appRouter'
    ],
    function main(
        $, 
        Backbone, marionette, bootstrap,

        logger, 
        browserInfo,
        handleKeys,

        app, events,

        Controller,
        getAppRouter
    ){

    // Allows multiple modals 
    $.fn.modal.Constructor.prototype.enforceFocus = function () {};

    if(browserInfo.isIe8){
        //For IE8, don't cache AJAX queries. 
        $.ajaxSetup({ cache: false });
    }

    //INITIAL CONFIG
    //-----------------------------------
    //Configure log options (set app-wide) 
    
    ////NO logging:
    //logger.options.logLevel = false;
    
    //// log errors:
    logger.options.logLevel = [ 
        'error',
        'Controller'
        //,'views/subviews/Battle'
    ];

    //// log EVERYTHING:
    //logger.options.logLevel = true;

    //-----------------------------------
    //APP Config - Add router / controller
    //-----------------------------------
    app.addInitializer(function(options){
        // get the app controller, pass in all the regions
        var appController = new Controller({
            //pass in regions to the controller, which allows updating
            //  specific parts of the DOM
            regions: app._regionManager._regions
        });

        // There's only ever ONE app-wide router (handles URL page routing) 
        router = getAppRouter({ controller: appController });
        app.router = router;


        // When event it triggered to change page, catch it
        events.on('app:router:navigate', function(route){
            logger.log('events', 
                'app:router:navigate event received, changing page to:',
                route
            );

            app.router.navigate(route, true);
        });

        // setup handle keys
        handleKeys();

    });

    app.start();
});
