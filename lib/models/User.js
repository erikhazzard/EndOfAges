//============================================================================
//
//User.js
//  Definition for user
//
//============================================================================
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var _ = require('lodash');
var authTypes = ['facebook', 'local']; // add more auth types as we need

// ======================================
// User
// ======================================

var UserSchema = new mongoose.Schema({
    name: { 
        type: String, 
        'default': ''
    },
    email: { 
        type: String, 
        'default': '' 
    },
    username: { 
        type: String, 
        'default': '',
        unique: true
    },

    // Game info
    // ----------------------------------
    gamesPlayed: {
        type: Number,
        'default': 0
    },

    // user info
    profilePic: String,
    hashedPassword: { 
        type: String, 
        'default': ''
    },
    authToken: { 
        type: String, 
        'default': '' 
    },

    provider: { 
        type: String, 
        'default': 'local'
    },

    created: {
        type: Date, 
        'default': Date.now 
    },
    lastLogin: {
        type: Date, 
        'default': Date.now 
    },


    // ** Privilege Management **
    // Roles is an array of strings. Valid values are: `user`, `government`, and `administrator`
    // TODO: Later, roles could have embedded permissions in them.  For now, this is not necessary.
    roles: [],

    // Third party providers
    facebook: {},
    linkedin: {}
});

// Virtuals
// --------------------------------------
UserSchema.virtual('password')
    .set(function(password) {
        this._password = password;
        //TODO: use async method?, don't want to block too much
        this.hashedPassword = bcrypt.hashSync(password, 9);
    })
    .get(function() { 
        return this._password;
    });

// Validators
// --------------------------------------
UserSchema.path('name').validate(
    function(name) {
        //name must be more than 3 characters
        return name && name.length && name.length > 3;
    }, 
    'Name must be longer than 3 characters'
);

UserSchema.path('email').validate(
    // make sure email is valid
    function(email) {
        if(email.length < 2){ return false; }
        return email.match(/^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/) ? true : false;
    }, 
    'Must provide a valid email address'
);

UserSchema.path('username').validate(
    // make sure length is fine
    function(username) {
        return username && username.length && username.length > 4;
    }, 
    'Username must be greater then 4 characters'
);

UserSchema.path('username').validate( function(username, callback) {
        // make sure username is unique
        var User = mongoose.model('User');

        // Check when a new user or email field modified 
        if (this.isNew || this.isModified('username')) {
            User.find({ username : username })
                .exec(function(err, users) {
                    callback(err || users.length === 0);
                });
        } else {
            callback(true); 
        }
    }, 
    'Username already exists'
);

UserSchema.path('hashedPassword').validate( function(hashedPassword) {
        //if (authTypes.indexOf(this.provider) !== -1) { return true; }
        return this.password && this.password.length && this.password.length > 3;
    }, 
    'Password cannot be blank'
);

// Presave hook
// --------------------------------------
UserSchema.pre('save', function(next) {
    // If it's not new, continue
    if (!this.isNew) {
        return next();
    }

    // Get profile pic
    if(this.facebook && this.facebook.picture && 
        this.facebook.picture.data){

        //update profile pic
        this.profilePic = this.facebook.picture.data.url;
    }

    // It's new, validate stuff
    if ( !(this.password && this.password.length) && 
        authTypes.indexOf(this.provider) === -1 ){
        //Make sure password is valid
        next(new Error('Invalid password'));
    } else {
        next();
    }
});

// Methods
// --------------------------------------
UserSchema.methods = {
    authenticate: function(password, callback) {
        //Ensures passed in password and stored password are the same
        bcrypt.compare(password, this.hashedPassword, function(err, res){
            return callback(err, res);
        });
    }
};

// Register the schema
// --------------------------------------
mongoose.model('User', UserSchema);

module.exports = UserSchema;
