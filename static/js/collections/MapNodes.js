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

        // desired node
        // TODO: should desired / current node info be stored here??
        nextNode: null,

        initialize: function(models, options){
            var self = this;
            logger.log('collections/MapNodes', 'initialize() called');

            // store the entity group ('player' or 'enemy')
            options = options || {};

            return this;
        },

        // TODO: should current node be a property of the collection instead of
        // by model?
        setCurrentNode: function setCurrentNode(node){
            // unset current node
            logger.log('collections/MapNodes', 
                'setCurrentNode() called with node %O', node);

            this.getCurrentNode().set({ isCurrentNode: false }, {silent:true}); 
            // set current node
            node.set({ isCurrentNode: true, visited: true });
            events.trigger('change:currentNode', {model: node});
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
