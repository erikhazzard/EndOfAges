var ErrorUnauthorized = require('./Errors').ErrorUnauthorized; 

module.exports.requireAuth = function requireAuth(req, res, next) {
    // If user is logged in, req.user will exist
    if(req.user) {
        next();
    } else {
        // If user isn't logged in, show error
        res.send(new ErrorUnauthorized('Must be logged in'), 401);
    }
};

module.exports.requireAdmin = function requireAuth(req, res, next) {
    // Require a user be logged in AND be an admin
    if(req.user && req.user.roles && req.user.roles.indexOf('administrator') > -1) {
        next();
    } else {
        // If user isn't logged in, show error
        res.send(new ErrorUnauthorized('Must be an administrator'), 401);
    }
};
