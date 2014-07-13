// ===========================================================================
//
// server.js
//
//      Entry point to start and run the server - both API and App 
//
// ===========================================================================
// Use cluster
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

numCPUs = 1;

// Listen for dying workers
cluster.on('exit', function (worker) {
    // Replace the dead worker,
    // we're not sentimental
    console.log('Worker ' + worker.id + ' died');
    cluster.fork();
});


if(cluster.isMaster){
    // Create 4 processes
    for(var i = 0; i < numCPUs; i++ ){
        cluster.fork();
    }
} else {
    // ---------------------------------------
    // Logic for each process
    // ---------------------------------------
    
    // Imports
    // ---------------------------------------
    // Configure app variables
    var nconf = require('nconf');
    require('./conf/configure')();

    //  Configure logger
    var winston = require('winston');
    require('./conf/configure-winston')();

    // Setup Redis 
    var redisClient = require('./lib/redis-client');

    // Setup mongo
    var db = require('./lib/database');

    // Setup app
    // ---------------------------------------
    // Get the express app (handles its own config)
    var app = require('./lib/app');

    // Start it up
    var server = app.listen(app.get('port'));

    // Let the server log know we've connected
    // NOTE: Use console log in this case *only* because we always want this
    // message to show
    console.log('Server started in environment: ' +
        '\033[1;97m\033[4;37m' + nconf.get('NODE_ENV') + '\033[0m');
    console.log('Running on port: ' + app.get('port'));

    // Catch and shut down errors 
    // ---------------------------------------
    // Catch the sigint to close the server
    var closeEverything = function(err) {
        winston.warn('Shutting down...do androids dream of electric sheep?');

        if(err){
            // if there are errors, show them
            winston.error(err);
            winston.error(err.stack);
        }

        // kill any database connections
        db.connection.close();
        // close the express app
        server.close();
        // finally, kill the process
        process.exit();
    };

    // when `SIGINT` event is recieved (user closes the app), shut down everything
    process.on('SIGINT', closeEverything);
    process.on('uncaughtException', closeEverything);
}
