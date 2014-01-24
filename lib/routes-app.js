// ============================================================================
//
// routes.js
//  Handles all the endpoints for the API
//
// ============================================================================
var exec = require('child_process').exec;
var os = require('os');

var nconf = require('nconf');
var winston = require('winston');
var _ = require('lodash');

var ejs = require('ejs');
ejs.open = '{{';
ejs.close = '}}';

var env = nconf.get('NODE_ENV');
var TEMPLATE_VARIABLES = {
    STATIC_URL: '/static/', // NOTE: could be on s3
    ENVIRONMENT: env,
    HOST_NAME: os.hostname(),
    GIT_COMMIT_HASH: ''
};

// get git hash
exec('git rev-parse HEAD', { cwd: __dirname }, function (err, stdout, stderr) {
    var hash = stdout.split('\n').join('');
    TEMPLATE_VARIABLES.GIT_COMMIT_HASH = hash;
});

// **Routes**
// --------------------------------------
var routes = function(app){

    var renderPage = function(req, res){
        // Helper function to render page
        // Renders the main base.html page (single page app, we only
        // have one page)
        // TODO: Takes in params and bootstrap data
    };

    // Routes
    // ----------------------------------
    app.get('/', function(req, res){
        res.render('base.html', _.extend({
            page: 'home'
        }, TEMPLATE_VARIABLES));
    });

    app.get('/game', function(req, res){
        res.render('base.html', _.extend({
            page: 'game'
        }, TEMPLATE_VARIABLES));
    });

    app.get('/create', function(req, res){
        res.render('base.html', _.extend({
            page: 'create'
        }, TEMPLATE_VARIABLES));
    });

    // JS Unit tests
    app.get('/tests', function(req,res){
        // Unit Tests
        res.render('tests.html', _.extend({
            page: 'tests'
        }, TEMPLATE_VARIABLES));
    });

};

module.exports = routes;
