//============================================================================
//
//database.js
//  Sets up models and connects to the database
//
//============================================================================
var nconf = require('nconf');
var winston = require('winston');
var fs = require('fs');
var mongoose = require('mongoose');

//Configure db
require('../conf/configure-database.js')();

// Setup mongoose models
// --------------------------------------
var modelsPath = __dirname + '/models';
fs.readdirSync(modelsPath).forEach(function loadModels(file){
    //load all mondel files models folder
    if (~file.indexOf('.js')){
        require(modelsPath + '/' + file);
    }
});

// Connect to the database
// --------------------------------------
var db = nconf.get('db');

// Log all DB queries for local / dev
if(nconf.get('NODE_ENV') === 'local' || nconf.get('NODE_ENV') === 'dev'){
    mongoose.set('debug', true);
}

mongoose.connect(db, function(err){
    if(err){
        //but if there's an error, exit the process
        winston.error('Could not connect to mongo at ' + db + 
            '! \n\t\t\tMake sure mongo is running');
        process.exit();
    }
    winston.info('Connected to \033[1;97m\033[4;37m' +
        db + '\033[0m in environment: ' + nconf.get('NODE_ENV'));
});

module.exports = mongoose;
