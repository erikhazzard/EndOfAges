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
        'lib/noise'
    ], function MapModel(
        Backbone, Marionette, logger,
        events,
        d3,
        API_URL,
        Noise
    ){

        // This model defines a target map (non the app map)
        var Map = Backbone.Model.extend({
            defaults: {
                // array of objects, as:
                // { x: 0, y: 0, nodeId: xyz }
                nodes: [],
                // array of nodes user has visited
                visited: [],
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

            tempNodes: [],

            initialize: function mapInitialize(){
                var self = this;

                return this;
            },

            generateMap: function mapGeneraterMap(){
                // Generate nodes and background. This will live on the server
                var len = 14 + Math.abs(Math.round(d3.random.normal(3, 1.5)()));
                var nodes = [];
                this.tempNodes = [];

                // randomly generate some nodes
                for(var i=0; i<len; i++){
                    nodes.push(this.generateNode(i));
                }

                // Normalize positions so we get a more even distribution
                var maxX = _.max(nodes, function(d){ return d.x; });
                var maxY = _.max(nodes, function(d){ return d.y; });

                // add the difference so it extends to 1
                _.each(nodes, function(node){
                    node.x += (1 - maxX.x);
                    node.y += (1 - maxY.y);
                });

                this.set({ nodes: nodes }, {silent: true});
                this.trigger('change');
                return this;
            },

            generateNode: function(i){
                // generates a node. for each node, needs to check that it's not
                // near an existing node
                var self = this;
                var rand = d3.random.normal(0.5, 0.3);
                var simplex = new Noise.Simplex();

                function getNum(x,y){
                    var val = Math.abs(simplex.noise(x,y,i));
                    //val = Math.random();
                    if(val > 1){ val = Math.random(); }
                    if(val < 0.05){ val = Math.random(); }
                    return val;
                }
                
                function getNode(i){
                    var node = {
                        //x: getNum(),
                        //y: getNum(),
                        x: getNum(i,i*1000),
                        y: getNum(i*1000,i),
                        nodeId: i 
                    };
                    return node;
                }

                // Ensure that nodes aren't too close together
                var node;
                var distance = 1;
                var furthestDist = 0;
                var iterations = 1;
                while(true){
                    distance = 1;
                    furthestDist = 0;
                    node = getNode(i * iterations);
                    if(self.tempNodes.length > 1){
                        _.each(self.tempNodes, function(tempNode){
                            var tmpDist = Math.sqrt(Math.pow(
                                tempNode.x - node.x, 2) + Math.pow(
                                tempNode.y - node.y, 2));
                            if(tmpDist < distance){ distance = tmpDist; }
                        });
                        if(distance > 0.18){
                            break;
                        }
                    } else {
                        break;
                    }
                    iterations += 1;
                }

                this.tempNodes.push(node);
                return node;
            }

        });
        return Map;
});
