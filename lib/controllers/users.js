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

    // TODO: REMOVE - ONLY FOR DEV PURPOSES
    return res.send({
        username: 'TEST'
    });

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
