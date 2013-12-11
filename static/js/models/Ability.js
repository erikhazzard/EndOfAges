// ===========================================================================
//
//  Ability
//
//      This model manages a single ability
//
// ===========================================================================
define(
    [ 'backbone', 'marionette', 'logger',
        'events', 'd3', 'util/API_URL'
    ], function MapModel(
        Backbone, Marionette, logger,
        events, d3, API_URL
    ){

    var Ability = Backbone.Model.extend({
        defaults: {
            name: 'Magic Missle',

            // how much power the ability costs to use
            powerCost: 10,
        
            // castTime in seconds
            castTime: 4,

            // validTargets specifies the entities the ability can be
            // used on. for now, only 'enemy' or 'player' are valid targets. 
            validTargets: 'enemy',
        
            // TODO: how to handle AoE?

            // effect is always an object that is always in the following
            // format:
            effect: function(options){
                // options can contain the following keys:
                //
                //  target: target(s) of effect
                //      {Object} or {Array of {Objects}}, object being an entity
                //
                //  source: source of effect
                //      {Object} - an entity
                //
                // The function body will be unique to each effect
                //
                // TODO: how to call a damage / heal method? Same method?
                //      how to do AoE damage? 
            },

            visualEffect: function(options){
                //TODO: figure this out...should have some way of doing an
                //effect, but should it live here?
            }
            
        },
        
        url: function getURL(){
            var url = API_URL + 'abilities/' + this.get('id');
            return url;
        },

        initialize: function gameInitialize(){
            logger.log('models/Ability', 'initialize() called');

            return this;
        }

    });

    return Ability;
});
