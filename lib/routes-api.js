// ============================================================================
//
// routes.js
//  Handles all the endpoints for the API
//
// ============================================================================
var nconf = require('nconf');
var winston = require('winston');
var passport = require('./app-passport');
var API_PREFIX = require('../conf/API_URL');
var request = require( 'superagent' ); 

var controllerUsers = require('./controllers/users');

// Errors
var ErrorUnauthorized = require('./util/Errors').ErrorUnauthorized;

// UTIL
var requireAuth = require('./util/expressMiddleware').requireAuth; 
var requireAdmin = require('./util/expressMiddleware').requireAdmin; 

// --------------------------------------
// **Routes**
// --------------------------------------
var routes = function(app){
    // ----------------------------------
    // Monitoring route
    // ----------------------------------
    app.get('/ping', function(req, res){
        res.send('pong');
    });
    app.get('/nginx_status_health_check', function(req, res){
        res.send('pong');
    });

    /* TODO: Don't use a local server, use a remove server for all routes
     
    // ----------------------------------
    // User Routes
    // -----------------------------------
    app.param('userId', controllerUsers.fetchUser);
    app.get(API_PREFIX + '/user', controllerUsers.showMe);
    app.get(API_PREFIX + '/users/:userId', requireAdmin, controllerUsers.showUser);

    app.get(API_PREFIX + '/users', requireAdmin, controllerUsers.fetchUsers);
    app.post(API_PREFIX + '/users', requireAdmin, controllerUsers.create);

    // ----------------------------------
    // AUTH Routes
    // -----------------------------------
    // LOCAL auth route
    app.get(API_PREFIX + '/login', controllerUsers.login);
    app.get(API_PREFIX + '/logout', controllerUsers.logout);
    
    app.post(API_PREFIX + '/login', function(req, res, next) {
        // NOTE: To login, POST to this endpoint with username and password
        passport.authenticate('local', function(err, user, info) {
            if (err) { 
                winston.err('Error in login route!');
                winston.err(err);
                return next(err); 
            }
            if (!user) { 
                winston.warn('Login attempt, Invalid user: ' + user);
                winston.warn(info);
                return res.send({
                    error: 'Invalid username or password'
                }, 401);
            }

            // Looks like we're good! Login the request
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                return res.send({
                    username: user.username,
                    email: user.email
                });
            });
        })(req, res, next);
    });
    
    // FACEBOOK Auth routes
    // ----------------------------------
    // GET /auth/facebook
    //   Use passport.authenticate() as route middleware to authenticate the
    //   request.  The first step in Facebook authentication will involve
    //   redirecting the user to facebook.com.  After authorization, Facebook will
    //   redirect the user back to this application at /auth/facebook/callback
    app.get(API_PREFIX + '/auth/facebook',
        passport.authenticate('facebook', {
            display: 'popup',
            scope: nconf.get('facebook:scope'),
            failureRedirect: API_PREFIX + '/login'
        }), function(res, req){ 
            // callback not called, this route is redirected to facebook
        });

    // GET /auth/facebook/callback
    //   Use passport.authenticate() as route middleware to authenticate the
    //   request.  If authentication fails, the user will be redirected back to 
    //   the login page.  Otherwise, the primary route function function will 
    //   be called
    app.get(API_PREFIX + '/auth/facebook/callback', 
        passport.authenticate('facebook', {
            failureRedirect: API_PREFIX + '/login'
        }), 
        controllerUsers.facebookAuthCallback);
    */
};

module.exports = routes;
