//----------------------------------------------------------------------------
//Logger library
//    author: Erik Hazzard
//
//Provides a LOGGER object which can be used to perform client side logging
//    Maintains a list of of all messages by log type. To log:
//            LOGGER.log('type', 'message', param1, param2, etc...);
//
//    e.g.,
//            LOGGER.log('error', 'Woops', { some: data });
//
//    To change logger options:
//            LOGGER.options.logLevel = 'all' // ( or true ) - Shows ALL messages
//            LOGGER.options.logLevel = ['error', 'debug'] // only shows the types 
//                                                                                                             passed in
//
//            LOGGER.options.storeHistory = true | false
//    To access history:
//            LOGGER.history[type] to access messages by type
//----------------------------------------------------------------------------
define([], function() {
    var LOGGER;

    LOGGER = {};
    LOGGER.options = {
        logLevel: 'all',
        storeHistory: false
    };
    LOGGER.history = {};
    LOGGER.can_log = function(type) {
        var logLevel, return_value;

        return_value = false;
        logLevel = LOGGER.options.logLevel;
        if (logLevel === 'all' || logLevel === true) {
            return_value = true;
        } else if (logLevel instanceof Array) {
            if (logLevel.indexOf(type) > -1) {
                return_value = true;
            }
        } else if (logLevel === null || logLevel === void 0 || logLevel === 'none' || logLevel === false) {
            return_value = false;
        } else {
            if (logLevel === type) {
                return_value = true;
            }
        }
        return return_value;
    };
    LOGGER.log = function(type) {
        var args, cur_date, logHistory;

        args = Array.prototype.slice.call(arguments);
        if ((type == null) || arguments.length === 1) {
            type = 'debug';
            args.splice(0, 0, 'debug');
        }
        if (!LOGGER.can_log(type)) {
            return false;
        }
        cur_date = new Date();
        args.push({
            'Date': cur_date,
            'Milliseconds': cur_date.getMilliseconds(),
            'Time': cur_date.getTime()
        });

        if(LOGGER.options.storeHistory){
                logHistory = LOGGER.history;
                logHistory[type] = logHistory[type] || [];
                logHistory[type].push(args);
        }
        if (window && window.console) {
            console.log(Array.prototype.slice.call(args));
        }
        return true;
    };
    LOGGER.options.log_types = ['debug', 'error', 'info', 'warn'];
    LOGGER.options.setup_log_types = function() {
        var log_type, _i, _len, _ref, _results;

        LOGGER.log('logger', 'setup_log_types()', 'Called setup log types!');
        _ref = LOGGER.options.log_types;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            log_type = _ref[_i];
            _results.push((function(log_type) {
                LOGGER[log_type] = function() {
                    var args;

                    args = Array.prototype.slice.call(arguments);
                    args.splice(0, 0, log_type);
                    return LOGGER.log.apply(null, args);
                };
                return LOGGER[log_type];
            })(log_type));
        }
        return _results;
    };
    LOGGER.options.setup_log_types();
    if (window) {
        if (window.console && LOGGER.options) {
            if (LOGGER.options.logLevel === 'none' || LOGGER.options.logLevel === null) {
                console.log = function() {
                    return {};
                };
            }
        }
        if (!window.console) {
            window.console = {
                log: function() {
                    return {};
                }
            };
        }
        window.onerror = function(msg, url, line) {
            LOGGER.error(msg, url, line);
            return false;
        };
    }
    return LOGGER;
});
