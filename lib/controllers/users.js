// ============================================================================
//
// users.js
//  Controller for user 
//  
// ============================================================================
var mongoose = require('mongoose');
var nconf = require('nconf');
var _ = require('lodash');
var User = mongoose.model('User');
var winston = require('winston');
var processPersonality = require('../personalityGenerator/processPersonality');

// Routes
// ---------------------------------------
module.exports.fetchUser = function(req, res, next, id){
    // Load user from DB (Only admins)
    try{
        findQuery = { _id: new mongoose.Types.ObjectId(id) };
    } catch(err){ 
        findQuery = { username: id };
    }

    User.findOne(findQuery, { '__v': 0, hashedPassword: 0 })
        .setOptions({ 
            lean: req.method === 'GET' ? true: false 
        })
        .exec(function (err, user) {
            //Check for errors or non existent user 
            if(err){ return next(err); }
            if(!user){ 
                winston.warn('User not found!');
                return next(new Error('User not found')); 
            }
            winston.debug('User found! ', user);

            //store the user in the req
            req.fetchedUser = user;

            //continue to next route
            next();
        });
};

// Auth / Session related
// ---------------------------------------
exports.facebookAuthCallback = function (req, res, next) {
    res.render('loginSuccess.html');
};
exports.session = function (req, res) {
    winston.debug('Logged in as ', req.user);
    res.redirect('/');
};

// Login / Logout
// --------------------------------------
exports.login = function (req, res) {
    res.render('login.html', {
        facebookAppId: nconf.get('facebook:clientID'),
        scope: nconf.get('facebook:scope')
    });
};

exports.logout = function (req, res) {
    req.logout();
    res.redirect('/');
};

// USER Routers
// ---------------------------------------
exports.showMe = function (req, res) {
    // Show the logged in user. If they're not logged in, show an error
    var user = req.user;
    if(!user){
        user = { error: 'Not logged in' }; 
    }
    res.send(user);
};

exports.showUser = function (req, res) {
    // Shows a target user
    var user = req.fetchedUser;
    if(!user){
        user = { error: 'Could not find user' }; 
    }
    res.send(user);
};


exports.fetchUsers = function (req, res) {
    //Show subset of users
    // Get all users
    User.find({}, {hashedPassword: 0, '__v': 0})
        // TODO: Pagination
        .limit(400)
        .setOptions({ 
            lean: req.method === 'GET' ? true: false 
        })
        .exec(function (err, users) {
            //Check for errors or non existent user 
            if(err){ return next(err); }
            if(!users){ return next(new Error('User not found')); }

            //store the user in the req
            res.send(users);
        });
};

exports.create = function (req, res) {
    //  Create a new user from the request params
    var user = new User(req.body);

    //use the local provider (not facebook - we created it locally)
    user.provider = 'local';

    //Save user model
    user.save(function (err) {
        if (err){
            return res.send(err);
        } else {
            return res.send(user);
        }
    });
};

// ===========================================================================
//
// Personality routes
//
// ===========================================================================
exports.generatePersonalityFromFacebook = function(req, res){
        // Set up request URL
        var token = 'CAACEdEose0cBAJSpEWTxmqYNkX1UL48HXDQdqHhz7j958kE9A8WjRdy3jtVg4k6wJt1kbBOFmoIjWd2mUZAb8edf1WgEztwC4VG4CP3XQrPiny9gTXEY56L8vK3nKZBhzzZB5rjg03cZCDYdv458OZCXF4gVykANTmCD9EZBfyRZBocTmemUymPsX2I8KoenxMZD';

        // get token from user
        if(req.body.token){ token = req.body.token; }

        // Some fields are not accessible for friends depending on their 
        // permissions (e.g., a friend's friendlist is often not visible)
        var fields = 'id,name,interests,education,work,significant_other,books,groups,posts,photos,gender,statuses';

        // If this is for your own profile, we can view friends list
        //fields += ',friends.limit(900000)';


        // TODO: User photos and posts as main fields

        var userId = 5236553; // erik
        //userId = 33413469; // alisen

        //userId = 5201084; // ian
        //
        //userId = 620793652; //jeremy
        //userId = 1067580059; // nikita
        //
        //userId = 548686028; // nils
        //userId = 1072412132; // diana (nil's gf)

        //userId = 36607744; // drew

        var url = 'https://graph.facebook.com/' + userId + '?fields=' + fields + '&method=GET&format=json&suppress_http_code=1&access_token=' + token;
        console.log('>>>', url);

        // Make request to facebook
        request.get( url )
            .send({})
            .set('Content-Type', 'application/x-www-form-urlencoded' )
            .end( function(response){
                var personality = processPersonality(response); 
                // return original request
                res.send({ name: JSON.parse(response.text).name, personality: personality });
            });
};
 
