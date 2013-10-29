// ============================================================================
//
// routes.js
//  Handles all the endpoints for the API
//
// ============================================================================
var nconf = require('nconf');
var winston = require('winston');
var ejs = require('ejs');
ejs.open = '{{';
ejs.close = '}}';

var templateVariables = {
    STATIC_URL: '/static/', // NOTE: could be on s3
    ENVIRONMENT: '',
    HOST_NAME: '',
    GIT_COMMIT_HASH: ''
};

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
        console.log(req.user);
        res.render('base.html', templateVariables);
    });

    // JS Unit tests
    app.get('/tests', function(req,res){
        // Unit Tests
        res.render('tests.html', templateVariables);
    });

};

module.exports = routes;
