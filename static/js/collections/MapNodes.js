// ===========================================================================
//
//  MapNodes
//
//      This collection contains MapNodes
//
// ===========================================================================
define(
    [ 'backbone', 'logger', 'events', 
        'models/MapNode'
    ], function MapNodesCollection(
        Backbone, logger, events, 
        MapNode
    ){

    var MapNodes = Backbone.Collection.extend({
        model: MapNode,

        initialize: function(models, options){
            var self = this;
            logger.log('collections/MapNodes', 'initialize() called');

            // store the entity group ('player' or 'enemy')
            options = options || {};

            return this;
        },

        getCurrentNode: function getCurrentNode(){
            // returns the currently active node model
            var i=0;
            var len = this.models.length;
            var currentNode = null;

            for(i=0;i<len;i++){
                currentNode = this.models[i];
                if(currentNode.get('isCurrentNode')){ break; }
            }

            return currentNode;
        }
    });

    return MapNodes;
});
