/* =========================================================================
 * Bragi (Javascript Logger)
 * ----------------------------------
 * v1.0.0
 * Distributed under MIT license
 * Author : Erik Hazzard ( http://vasir.net )
 *
 * Provides a LOGGER object which can be used to perform logging
 * Maintains a list of of all messages by log type. To log:
 *      LOGGER.log('type', 'message', param1, param2, etc...);
 *      
 *  e.g.,
 *      LOGGER.log('error', 'Woops', { some: data });
 *
 * To change logger options:
 *      LOGGER.options.logLevel = true; // Shows ALL messages (false to show none)
 *      LOGGER.options.logLevel = ['error', 'debug']; // only shows passed in types 
 *
 *   LOGGER.options.storeHistory = true or false
 *      NOTE: By default, history will be stored only for logged messages.
 *
 *      Set LOGGER.options.storeAllHistory = true; to enable storing history 
 *      for unlogged messages
 *
 *      To access history:
 *          LOGGER.history[type] to access messages by `type`
 *
 *
 * What this library does currently not support:
 *      Automatically sending the history / log messages to some server. 
 *      Currently, you'll need to take the LOGGER.history object and pipe it
 *      somwhere if you want to access the stored messages
 *
 *      TODO: For node, expose a `useEvents` option that would emit an event
 *      on true, which would allow other libraries to do stuff with the log 
 *      messages??
 * ========================================================================= */
(function(root, factory) {
    // Setup logger for the environment
    if(typeof define === 'function' && define.amd) {
        // RequireJS / AMD
        define(['exports'], function(exports) {
            root = factory(root, exports);
            return root;
        });
    } else if (typeof exports !== 'undefined') {
        // CommonJS
        factory(root, exports); 
        module.exports = factory();
    } else {
        // browser global if neither are supported
        root.logger = factory(root, {});
    }
}(this, function(root, logger) {

    // This is a bit hacky, but we need to check if this is called from a
    // command line or browser. Cheapest + fastest is to check if a global
    // window object exists
    var _isBrowser = typeof window === 'undefined' ? false : true;

    // Some nice color variations
    var COLORS, STYLES;
    var COLOR_RESET = '\033[0m';

    if(_isBrowser){
        COLORS = [
            '#3182bd',
            '#dfc27d',
            '#35978f',
            '#543005',
            '#c51b7d',
            '#c6dbef',
            '#af8dc3',
            '#7fbf7b',
            '#8c510a',
            '#f5f5f5',
            '#e9a3c9',
            '#543005',
            '#66c2a5',
            '#f6e8c3',
            '#80cdc1',
            '#878787',
            '#8c510a',
            '#80cdc1',
            '#542788',
            '#003c30',
            '#e6f598',
            '#c7eae5'
        ];
    } else {
        STYLES = {
            colors: {
                'white': '\x1B[37m',
                'grey': '\x1B[90m',
                'black': '\x1B[30m',
                'blue': '\x1B[34m',
                'cyan': '\x1B[36m',
                'green': '\x1B[32m',
                'magenta': '\x1B[35m',
                'red': '\x1B[31m',
                'yellow': '\x1B[33m'
            },
            styles: {
                'blink': '\x1B[49;5;8m',
                'underline': '\x1B[4m', 
                'bold': '\x1B[1m'
            },
            backgrounds: {
                'white': '\x1B[47m',
                'black': '\x1B[40m',
                'blue': '\x1B[44m',
                'cyan': '\x1B[46m',
                'green': '\x1B[42m',
                'magenta': '\x1B[45m',
                'red': '\x1B[41m',
                'yellow': '\x1B[43m'
            }
        };

        COLORS = [
            STYLES.colors.blue,
            STYLES.colors.green,
            STYLES.colors.magenta,
            STYLES.colors.yellow,
            STYLES.colors.cyan,
            STYLES.colors.red,

            STYLES.backgrounds.blue + STYLES.colors.black,
            STYLES.backgrounds.blue + STYLES.colors.white,
            STYLES.backgrounds.blue + STYLES.colors.magenta,

            STYLES.backgrounds.yellow + STYLES.colors.red,
            STYLES.backgrounds.yellow + STYLES.colors.black,
            STYLES.backgrounds.yellow + STYLES.colors.magenta,

            STYLES.backgrounds.white + STYLES.colors.red,
            STYLES.backgrounds.white + STYLES.colors.blue,
            STYLES.backgrounds.white + STYLES.colors.black,
            STYLES.backgrounds.white + STYLES.colors.magenta,
            STYLES.backgrounds.white + STYLES.colors.yellow,
            STYLES.backgrounds.white + STYLES.colors.cyan,

            STYLES.backgrounds.magenta+ STYLES.colors.white,
            STYLES.backgrounds.magenta + STYLES.colors.black,
            STYLES.backgrounds.magenta + STYLES.colors.blue,
            STYLES.backgrounds.magenta + STYLES.colors.green,
            STYLES.backgrounds.magenta + STYLES.colors.yellow
        ];
    }

    // Setup the logger
    var LOGGER = {};

    LOGGER.options = {
        // default options
        // Primary configuration options
        // --------------------------
        // logLevel: specifies what logs to display. Can be either:
        //      1. an {array} of log levels 
        //          e.g,. ['error', 'myLog1', 'myLog2']
        //    or 
        //
        //      2. a {Boolean} : true to see *all* log messages, false to 
        //          see *no* messages
        logLevel: true,

        // storeHistory: {Boolean} specifies wheter to save all log message 
        //      objects.  This is required to send messages to a server, 
        //      but can incur a small performance (memory) hit, depending 
        //      on the number of logs. NOTE: This will, by default, only
        //      store history for messages found in logLevel. 
        //      Set `storeAllHistory` to store *all* messages
        storeHistory: true,

        // storeAllHistory: {Boolean} specifies wheter to store history for
        // all log messages, regardless if they are logged
        storeAllHistory: false,

        // Secondary (display related) configuration options
        // --------------------------
        // showCaller: {Boolean} will automatically include the calling 
        //      function's name. Useful for tracing execution of flow
        showCaller: true,

        // showTime: {Boolean} specifies wheter to include timestamp
        showTime: true
    };

    LOGGER.history = {
        // stored log messages by log type
        // e.g.,:
        // 'logType': [ { ... message 1 ...}, { ... message 2 ... }, ... ]
    };

    LOGGER.canLog = function canLog(type){ 
        // Check the logLevels and passed in type. If the message cannot be
        // logged, return false - otherwise, return true
        var logLevel = LOGGER.options.logLevel;
        // by default, allow logging
        var canLogIt = true;

        // Don't ever log if logging is disabled
        if(logLevel === false || logLevel === null){
            canLogIt = false;
        } else if(logLevel instanceof Array){
            // if an array of log levels is set, check it
            if(logLevel.indexOf(type) > -1){
                canLogIt = true;
            }
        } else if(typeof logLevel === 'string'){
            // If a single log level is set (as a string), only allow logging
            // if the type matches the set logLevel
            if(logLevel === type){ canLogIt = true; }
            else { canLogIt = false; }
        }

        return canLogIt;
    };
    // UTIL functions
    // ----------------------------------
    LOGGER.util = {};
    LOGGER.util.darken = function darken(color){
        // Takes in a hex color {String} (e.g., '#336699') and returns a 
        // darkened value
        color = color.replace(/#/g,'');
        color = parseInt(color, 16);
        color = color - 90000;
        if(color < 0){ color = 0; }
        color = color.toString(16);
        return '#' + color;
    };
    LOGGER.util.lighten = function darken(color){
        // Takes in a hex color {String} (e.g., '#336699') and returns a 
        // lightened value
        // TODO: combine this and darken
        color = color.replace(/#/g,'');
        color = parseInt(color, 16);
        color = color + 90000;
        if(color > 16777215){
            color = 16777215;
        }
        color = color.toString(16);
        return '#' + color;
    };

    LOGGER.util.getForegroundColor = function getForegroundColor(color){
        // Takes in a hex color {String} (e.g., '#336699') and returns a 
        // darkened value
        var colors = /(\w\w)(\w\w)(\w\w)/.exec(color);
        if(!colors){ return '#000000'; }

        var red = parseInt(colors[1], 16);
        var green = parseInt(colors[2], 16);
        var blue = parseInt(colors[3], 16);

        // based on YIQ (http://en.wikipedia.org/wiki/YIQ)
        var brightness = ((red * 299) + (green * 587) + (blue * 114)) / 1000;

        if (brightness >= 128 || isNaN(brightness)) {
            return '#000000';
        } else {
            return '#ffffff';
        }
    };

    // backgroundColor
    // ----------------------------------
    // keeps track of colors being used. Uses a redundent array for quicker
    // lookup
    var _foundColors = [];
    // and which logType goes to which color
    var _colorDict = _isBrowser ? {error: '#dd4444'} : { error:  STYLES.styles.blink + STYLES.backgrounds.red + STYLES.colors.white };

    function getBackgroundColor(type){
        // Returns the background color for a passed in log type
        // TODO: if more found colors exist than the original length of the
        // COLOR array, cycle back and modify the original color
        //
        var color = '';

        // For color, get the first group
        type = type.split(':')[0];

        // if a color exists for the passed in log group, use it
        if(_colorDict[type]){ 
            return _colorDict[type];
        }

        if(_foundColors.length >= COLORS.length){
            // is the index too high? loop around if so
            color = COLORS[Math.random() * COLORS.length | 0];
            if(!_isBrowser){
                color = STYLES.styles.underline + color;
            } else {
                for(var i=0;i<Math.random() * 10 | 0;i++){
                    if(Math.random() < 0.5){
                        color = LOGGER.util.darken(color);
                    } else {
                        color = LOGGER.util.lighten(color);
                    }
                }
            }
        } else {
            // The length of the colors array is >= to the index of the color
            color = COLORS[_foundColors.length];
        }

        // update the stored color info
        _foundColors.push(color);
        _colorDict[type] = color;

        return color;
    }

    LOGGER.getFormatString = function getFormatString (type){
        var background = getBackgroundColor(type);
        var color = LOGGER.util.getForegroundColor(background);

        // Generate some formatted CSS
        var formatString = "background: " + background + ';' + 
            'color:' + color + ';' + 
            'line-height: 1.8em;' +
            'margin: 2px;' +
            'padding: 2px;' +
            'border: 2px solid rgba(0,0,0,0.5);';

        return formatString;
    };

    // LOG function
    // ----------------------------------
    LOGGER.log = function loggerLog(type, message){
        // Main logging function. Takes in two (plus n) parameters:
        //   type: {String} specifies the log level, or log type
        //
        //   message: {String} the message to log. The message must be a single
        //      string, but can have multiple objects inside using `%O`. e.g.,
        //          logger.log('test', 'some object: %O', {answer: 42});
        //
        //   all other parameters are objects or strings that will be formatted
        //   into the message
        
        // can this message be logged? If not, do nothing
        if( !LOGGER.canLog(type) ){ 
            // Can NOT be logged. If the storeAllHistory is set, we'll want
            // to save the history
            if(!LOGGER.options.storeAllHistory){
                return false;
            }
        }
        
        // get all arguments
        var extraArgs = Array.prototype.slice.call(arguments, 2);
        // remove the type from the args array, so the new args array will
        // just be an array of the message string and any formatted objects
        // to pass into it

        // Setup the log
        // ------------------------------
        var formatString = LOGGER.getFormatString(type);

        // TODO: determine if a wrong number of args was passed in, concat 
        //  string instead if so

        // Format the message
        // the final log array should look like:
        //  [ "%c `type` : `message` ", `formatString`, formatting objects ... ]
        //
        var finalLog = [];

        // Logger
        // ------------------------------
        // Include some meta info (time, function that called, etc.)
        message += '\t\t';
        if(loggerLog.caller && loggerLog.caller.name && LOGGER.options.showCaller){
            message += ' | <caller: ' + loggerLog.caller.name + '()>';
        } 
        if(LOGGER.options.showTime){
            // JSON timestamp
            message += ' | <time: ' + new Date().toJSON() + '>';
        }

        if(!_isBrowser){
            // For node, log line number and filename
        }


        // Setup final log message format, depending on if it's a browser or not
        // ------------------------------
        if(_isBrowser){
            finalLog.push(
                "%c [ " + type + " ]\t:\t" + message
            );
            finalLog.push(formatString);

        } else {
            finalLog.push(
                COLOR_RESET + "[ " + 
                (getBackgroundColor(type) + type + COLOR_RESET) + 
                " ]\t:\t" + message + 
                COLOR_RESET
            );
        }

        finalLog.push(extraArgs);

        // Finally, check if it should be added to the history
        // ------------------------------
        if(LOGGER.options.storeHistory || LOGGER.options.storeAllHistory){
            // show the history be stored? if so, store it
            LOGGER.history[type] = LOGGER.history[type] || []; //ensure existence
            LOGGER.history[type].push(finalLog);
        }

        // Log it
        // ------------------------------
        if( LOGGER.canLog(type) ){ 
            // Only output if it was specified in the log level
            console.log.apply( console, finalLog );
        }

    };

    return LOGGER;
}));
