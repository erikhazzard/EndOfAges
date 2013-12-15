// ============================================================================
//
// configure-passport.js
// Configures passport related settings
//
//      Note: To add a new strategy, be sure to update app/models/User.js
//      `authTypes` with the new authType
//
// ============================================================================
var nconf = require('nconf');
var winston = require('winston');
var mongoose = require('mongoose');

var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var User = mongoose.model('User');

// Configure passport
// ---------------------------------------
module.exports = function configurePassport(passport){
    // serialize and deserialize session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
        User.findOne({ _id: id }, function (err, user) {
            done(err, user);
        });
    });

    // Local
    // ----------------------------------
    // use local strategy to get user auth
    passport.use(
        new LocalStrategy({
            passwordField: 'password',
            usernameField: 'username'
        }, 
        function checkUser(username, password, done){
            // Try to get user from DB based on email
            User.findOne({ username: username }, function (err, user) {
                // If there's a problem, call done
                if (err) { return done(err); }
                if (!user) { 
                    return done(null, false, { message: 'An error occured' }); 
                }
                
                // Try to auth user
                user.authenticate(password, function(err, res){
                    if(!res){
                        return done(null, false, { message: 'Invalid password' });
                    }
                    return done(null, user);
                });
            });
        }
    ));

    // Facebook
    //-----------------------------------
    passport.use(new FacebookStrategy(
        {
            // get secrets
            clientID: nconf.get('facebook:clientID'),
            clientSecret: nconf.get('facebook:secret'),
            callbackURL: nconf.get('facebook:callbackURL'),
            // fields from profile to get
            profileFields: [
                'id', 'displayName', 'photos',
                'timezone', 'email', 'emails', 'gender', 'education',
                'work', 'username', 'link',
                'first_name', 'last_name', 'name',
                'verified', 'locale'
            ]
        }, 
        function(accessToken, refreshToken, profile, done) {
            winston.debug('Facebook - passport called');

            process.nextTick(function () {
                // Try to get user based on their facebook ID
                User.findOne({ 'facebook.id': profile.id }, function (err, user) {
                    if (err) { 
                        winston.error('Error getting facebook user');
                        winston.error(err);
                        return done(err); 
                    }

                    // If the user doesn't exist yet, create one
                    if (!user) {
                        // get first photo in photo array of user
                        var photo = profile.photos[0].value
                            // get the full version
                            .replace("q.jpg", "b.jpg");

                        winston.debug('User not found, creating one');
                        user = new User({
                            name: profile.displayName, //use their FB display name
                            email: profile.emails[0].value,
                            // make the username their facebook email
                            username: 'facebook.' + profile.emails[0].value,
                            provider: 'facebook',
                            photo: photo,
                            facebook: profile._json
                        });

                        //then save it
                        user.save(function (err) {
                            if (err){ winston.error(err); }
                            winston.debug(user);
                            winston.debug('Created and saved new user');
                            return done(err, user);
                        });

                    } else {
                        winston.debug('Found existing facebook user: ' + user);
                        // Otherwise, the user exists
                        //
                        //update user's last login
                        user.lastLogin = new Date();
                        user.save(function(err){
                            if (err){ winston.error(err); }
                            return done(err, user);
                        });
                    }
                });
            });
        }
    ));
};
