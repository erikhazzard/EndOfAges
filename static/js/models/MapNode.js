// ===========================================================================
//
//  MapNode
//
//      A model for an individual map node
//
// ===========================================================================
define(
    [ 'backbone', 'logger',
        'events', 'd3', 'util/API_URL'
    ], function MapModel(
        Backbone, logger,
        events, API_URL
    ){

    var MapNode = Backbone.Model.extend({
        defaults: {
            x: 0,
            y: 0,

            // array of node indicies
            nextNodes: [],

            // if the user has visited the node yet
            visited: false,
            isCurrentNode: false,

            biome: 'cave'
        },

        url: function getURL(){
            var url = API_URL + 'map/node/' + this.cid;
            return url;
        },

        initialize: function gameInitialize(){
            logger.log('models/Node', 'initialize() called');
            return this;
        }
    });

    return MapNode;
});
