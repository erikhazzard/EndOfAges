// ===========================================================================
//
// insertData
//  inserts data into the quint database. Called from `make seed`
//  NOTE: This doesn't delete existing data; it only inserts data. You'll need
//  to run `make clear` or `make seed` to clear data ahead of time
//
// ===========================================================================
// Imports
var _ = require('lodash');
var async = require('async');
var nconf = require('nconf');
require('../../conf/configure')();

var winston = require('winston');
require('../../conf/configure-winston')();
var db = require('../../lib/database');

//// data
//require('../../lib/models/Model');
//var ModelTarget = db.model('Model');

// NOTE: for now, there's no seed data
return process.exit();

// --------------------------------------
// Setup save queue
// --------------------------------------
var itemsSaved = 0;
var queue = async.queue(function saveModel(model, callback){
    model.save(function(err, res){
        if(err){ winston.error('Could not save! ' + err); process.exit(); }
        itemsSaved += 1;
        callback(err, res);
    });
}, 1);

queue.empty = function(err,res){
    // NOTE: empty will get called before the last item is saved sometimes...
    setTimeout(function(){
        if(itemsSaved === questions.length){
            winston.info('Finished! Inserted ' + questions.length + ' items');
            process.exit();
        }
    }, 1000);
};

// --------------------------------------
// Setup data
// --------------------------------------
//var data = []; // read from file
//_.each(data, function(datum){
    //// Create a question model for each question
    //var model = new Model(datum);
    //queue.push(model);
//});
