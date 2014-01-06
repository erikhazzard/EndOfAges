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

            this.on('change:nodes', this.updateNextNodesLinks);

            return this;
        },

        updateNextNodesLinks: function updateNextNodesLinks(){
            // Sets the nextNodes array to an array of node objects
            // Original form is an array of node IDs, but we want to link
            // objects
            var self = this;

            // go through each map node, then each map node's next nodes
            _.each(this.models, function(node){
                var nextNodeObjects = [];
                _.each(node.get('nextNodes'), function(nextNodeId){
                    // NOTE: id is not the CID, but just an ID string the
                    // nodes use to reference each other
                    nextNodeObjects.push(self.findWhere({id: nextNodeId}));
                });
                node.set({ nextNodes: nextNodeObjects }, {silent: true});
            });

            return this;
        }
    });

    return MapNodes;
});
