// ===========================================================================
//
//  Map
//
//      This model manages a map
//
// ===========================================================================
define(
    [ 'backbone', 'marionette', 'logger',
        'events',
        'd3',
        'util/API_URL',
        'models/data-map',
        'lib/noise',
        'models/MapNode',
        'collections/MapNodes'
    ], function MapModel(
        Backbone, Marionette, logger,
        events,
        d3,
        API_URL,
        MAP_NODES,
        Noise,
        MapNode,
        MapNodes
    ){

        // This model defines a target map (non the app map)
        var Map = Backbone.Model.extend({
            defaults: {
                // collection of node objects
                nodes: null,
                // an array of node model index
                visitedPath: [],

                background: '',
                mapId: null,

                // the width / height the nodes are scaled to
                //  Used by the view to scale the map. I don't consider
                //  these view properties because they're data associated with
                //  the position of the nodes on a map - the view can intrepret
                //  these units however its wishes (e.g., in pixels, scaled
                //  to the actual map's width / height)
                nodeMaxWidth: 800,
                nodeMaxHeight: 400,

                // next desired node
                nextNode: null
            },
        
            url: function getURL(){
                var url = API_URL + 'maps/generate';
                if(this.get('mapId')){
                    url = API_URL + 'maps/' + this.get('mapId');
                }
                return url;
            },

            initialize: function mapInitialize(){
                var self = this;

                return this;
            },

            generateMap: function mapGeneraterMap(){
                // Generate nodes and background. This will live on the server
                
                // get nodes from map data
                // TODO: different set of nodes
                var nodes = MAP_NODES.map1[0];
                // first node is always visted (it's the current node)
                nodes[0].visited = true;
                nodes[0].isCurrentNode = true;

                // create a collection of map nodes and store it
                this.set({ nodes: new MapNodes(nodes) }, {silent: true});
                this.setCurrentNode(this.get('nodes').models[0], {silent:true});
                this.trigger('change');

                return this;
            },

            // Node related
            setCurrentNode: function setCurrentNode(node, options){
                options = options || {};
                // unset current node
                logger.log('models/Map', 
                    'setCurrentNode() called with node %O', node);

                // update the visited path first (so changes to currentNode will
                // know about the visible path)
                this.updateVisitedPath(node);

                // update current node
                this.getCurrentNode().set({ isCurrentNode: false }, {silent:!!options.silent}); 

                // set current node
                node.set({ isCurrentNode: true, visited: true });
                if(!options.silent){
                    this.trigger('change:currentNode', {model: node});
                }
            },

            getCurrentNode: function getCurrentNode(){
                // returns the currently active node model
                var i=0;
                var currentNode = null;
                var models = this.get('nodes').models;

                for(i=0;i<models.length;i++){
                    currentNode = models[i];
                    if(currentNode.get('isCurrentNode')){ break; }
                }

                logger.log('models/Map', 
                    'getCurrentNode() got node %O', currentNode);

                return currentNode;
            },

            updateVisitedPath: function updateVisitedPath(node, options){
                options = options || {};
                this.attributes.visitedPath.push(
                    this.get('nodes').indexOf(node)
                );
               
                if(!!options.silent){
                    this.trigger('change');
                    this.trigger('change:visitedPath');
                }
                return this;
            }

        });
        return Map;
});
