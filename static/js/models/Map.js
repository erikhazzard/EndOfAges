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

                background: '',
                mapId: null
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
                this.trigger('change');
                return this;
            }

        });
        return Map;
});
