// ---------------------------------------------------------------------------
// Custom Errors
// Based on HTTP status codes
// ---------------------------------------------------------------------------
module.exports = {};

// 404 errornotfound error
// --------------------------------------
var ErrorNotFound = function ErrorNotFound(message){
    this.name = 'Not Found';
    this.status = 404;
    this.message = message || this.name;
};

ErrorNotFound.prototype = new Error();
ErrorNotFound.prototype.constructor = ErrorNotFound;

module.exports.ErrorNotFound = ErrorNotFound;

// 401 unauthorized error
// --------------------------------------
var ErrorUnauthorized = function ErrorUnauthorized(message){
    this.name = 'Unauthorized';
    this.status = 401;
    this.message = message || this.name;
};

ErrorUnauthorized.prototype = new Error();
ErrorUnauthorized.prototype.constructor = ErrorUnauthorized;

module.exports.ErrorUnauthorized = ErrorUnauthorized;

// 400 bad request error
// --------------------------------------
var ErrorBadRequest = function ErrorBadRequest(message){
    this.name = 'Bad request';
    this.status = 400;
    this.message = message || this.name;
};

ErrorBadRequest.prototype = new Error();
ErrorBadRequest.prototype.constructor = ErrorBadRequest;

module.exports.ErrorBadRequest = ErrorBadRequest;

