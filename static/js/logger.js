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
define(['d3'], function(d3) {
    var LOGGER;

    // generate some color scales, give a wide range of unique colors
    var colorScales = [
        d3.scale.category20c(),
        d3.scale.category20b(),
        d3.scale.category20(),
        d3.scale.category10()
    ];

    // values of found colors, to check for same colors
    var foundColors = [];
    // key : value of colors so we don't generate new colors
    // for each key
    var colorDict = {};

    var getColor = function loggerGetColor(target){
        // generates or returns a color used by a target key
        var i=0;
        var color = '';
        if(colorDict[target]){ return colorDict[target]; }

        while(i<colorScales.length){
            color = colorScales[i](target);

            // did NOT find the color, update the objects and break loop
            if(foundColors.indexOf(color) === -1){
                foundColors.push(color);
                colorDict[target] = color;
                break;
            } 

            i += 1;
        }

        return color;
    };

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
            //console.log(Array.prototype.slice.call(args));
            // add a spacer between each arg
            var len = args.length;
            var newArgs = Array.prototype.slice.call(args);

            // Don't show first argument if second argument has formatting
            if(newArgs[1] && newArgs[1].indexOf('%c') !== -1){
                var shifted = newArgs.shift();
                // if the string is a formatted string, format date
                newArgs[0] += ' <time:%O>';

                // If the second argument is NOT a color format string,
                // create one
                if(newArgs[1].match(/[a-z ]+:[a-z ]+;/) === null){
                    var background = getColor(shifted);
                    var color = d3.rgb(background);
                    var border = color.darker();

                    // make the text bright or light depending on how
                    // dark or light it already is
                    if(color.r + color.g + color.b < 378){
                        color = color.brighter().brighter().brighter().brighter().brighter();
                    } else { 
                        color = color.darker().darker().darker().darker().darker();
                    }

                    // format string
                    var formatString = "background: " + background + ';' + 
                        'color:' + color + ';' + 
                        'border: 2px solid ' + border + ';';

                    newArgs.splice(1, 0, formatString);
                    console.log.apply(console, newArgs);
                }
            } else {
                // no special formatting, just call it normally
                console.log(args);
            }
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
