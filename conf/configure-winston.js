//============================================================================
//
//configure-winston.js
//  Configures winston related settings
//
//============================================================================
var nconf = require('nconf');
var winston = require('winston');

module.exports = function configureWinston(){
    //get level based on environment
    var env = nconf.get('NODE_ENV');

    var logLevel = {
        'local': 'debug',
        'develop': 'debug',
        'staging': 'warn',
        'production': 'warn'
    }[env] || 'info';

    //Replace the default console transport
    winston.remove(winston.transports.Console);
    winston.add(winston.transports.Console, {
        level: logLevel,
        timestamp: true,
        colorize: true
    });

    //For production, we could log to a file, email, SNS, SMS, etc
    if(env === 'test' || env === 'production' || env === 'staging'){
        winston.add(winston.transports.File, { 
            filename: __dirname + '/../log/log.log',
            level: 'warn'
        });
    }
};
