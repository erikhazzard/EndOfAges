//============================================================================
//
//configure-app.js
//  Configures express app related settings
//
//============================================================================
var nconf = require('nconf');
var express = require('express');
var winston = require('winston');
var redisClient = require('../lib/redis-client');
var passport = require('../lib/app-passport');
var flash = require('connect-flash');

//Setup redis store and cache
var RedisStore = require('connect-redis')(express);
var expressCache = require('../lib/util/expressCache')(redisClient);

//---------------------------------------
//Configure the app
//---------------------------------------
module.exports = function configureApp(app){
    //Set defaults (used if not set in file, environment, or command line)
    nconf.add('app', {
        'type': 'literal',
        'app': { 
            'port': 8000,
            'allowedDomains': '*',

            'cookie': {
                'maxAge': 86400000, //one year
                'key': 'sessId',
                'secret': 'it5mzxA@Of7o%v2rehVL(o5zOrkw177mb*3wv9e!wHlp~HdE4G'
            }
        }
    });

    //Server config
    //-----------------------------------
    //we use EJS for template rendering
    app.set('views', __dirname + '/../templates');
    app.engine('html', require('ejs').__express);

    // Configure port to run on
    app.set('port', nconf.get('app:port'));

    //Enable reverse proxy (nginx)
    app.enable('trust proxy');

    // don't expose server info
    app.disable('x-powered-by');

    // Static file serve (NOTE: When deployed, NGinx handles this)
    app.use('/static', express.static(__dirname + '/../static'));

    //// ** Setup middleware **
    //// -----------------------------------
    
    //app.use(function(req, res, next) {
        //// Block requests if server is too busy
        //if(toobusy()){
            //res.send(503, 'Server too busy, please try again.');
        //}else{
            //next();
        //} 
    //});

    app.use(function(req, res, next){
        // Enable CORs support
        res.header('Access-Control-Allow-Origin', nconf.get('app:allowedDomains'));
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    });

    var env = nconf.get('NODE_ENV');
    if(env === 'develop' || 
        env === 'local' || 
        env === 'localhost' ){
        // Set some config options based on environment
        app.set('showStackError', true);
        app.use(express.logger('dev'));
        app.locals.pretty = true;
    }

    app.use(express.compress({
        // compress responses
        filter: function (req, res) {
            return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
        },
        level: 9
    }));
    app.use(express.favicon());

    // Session / cookie related
    // -----------------------------------
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());

    app.use(express.session({
        secret: nconf.get('app:cookie:secret'),
        cookie: { 
            maxAge: nconf.get('app:cookie:maxAge')
        },
        store: new RedisStore({ 
            host: nconf.get('redis:host'),
            port: nconf.get('redis:port'),
            ttl: 60 * 60 * 24 * 14, //2 weeks, in seconds
            client: redisClient
        })
    }));

    // setup passport
    app.use(passport.initialize());
    app.use(passport.session());

    // connect flash 
    app.use(flash());

    // Handle routes
    // -----------------------------------
    // First, use our cache preprocessor
    app.use(expressCache.router);

    // Then use the routes for this app
    app.use(app.router);

    // Then, handle missing pages
    app.use(function handleError(req, res, next){
        // Invalid route
        winston.error('Invalid page requested: ' + req.url);
        res.status(404);

        if(req.accepts('json')){
            return res.send({ error: 'Not Found' });
        }
        if(req.accepts('html')){
            return res.render('404.html', {url: req.url});
        }

    });

    // Finally, handle any errors
    // -----------------------------------
    app.use(function handleError(err, req, res, next){
        //Other errors - e.g., item not found
        winston.error('Error with request: ' + req.url);
        winston.error(err);
        var status = err.status || 500;
        res.status(status);

        if(req.accepts('json')){
            return res.send({ error: err+'' });
        }
        if(req.accepts('html')){
            return res.render(status + '.html', {error: err});
        }
    });
};
