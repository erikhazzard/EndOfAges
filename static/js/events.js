// ===========================================================================
//
// Global event aggregator
//
//  Provides the global event aggregator so all modules have access to events
//
// ===========================================================================
define(['backbone', 'marionette'],function(Backbone, Marionette){
    var events = new Backbone.Wreqr.EventAggregator();
    // store a global reference to the event aggregator
    window.EVENTS = events;

    return events;
});
