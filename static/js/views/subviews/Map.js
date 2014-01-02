// ===========================================================================
//
// Map subview
//
//      View for the map
//
//  TODO: listen for node finish event, update current node in map model
// ===========================================================================
define(
    [ 
        'd3', 'backbone', 'marionette',
        'logger', 'events',
        'Models/Map'
    ], function viewMap(
        d3, backbone, marionette, 
        logger, events,
        Map
    ){

    var MapView = Backbone.Marionette.Layout.extend({
        template: '#template-game-map',

        events: { },

        'className': 'game-map-wrapper',

        initialize: function mapViewInitialize(options){
            // initialize:
            logger.log('views/subviews/Map', 'initialize() called');
            this.gameModel = options.gameModel;

            return this;
        },

        onShow: function mapViewOnShow(){
            this.drawMap();
            return this;
        },

        // Map generation
        // ------------------------------
        drawMap: function mapViewGenerateMap(){
            var self = this;
            logger.log('views/subviews/Map', 'drawMap() called');

            // d3 used to draw map
            var svg = d3.select('#map');
            // empty existing map
            svg.select('.svg-wrapper').remove();

            var width = $('#map').width();
            this.width = width;
            var height = $('#map').height();
            this.height = height;

            // setup wrapper and elements
            this.wrapper = svg.append('g').attr({ 'class': 'svg-wrapper map' });

            this.defs = this.wrapper.append('defs');
            this.maskPath = this.defs.append('mask')
                .attr({ id: 'map-mask' });

            // Add background layer
            // TODO: use difference background image
            this.background = this.wrapper.append('g').attr({'class': 'background'});
            this.background.append("image")
                .attr({ 
                    // TODO: use difference background image
                    'xlink:href': '/static/img/maps/map1-dark.jpg',
                    'preserveAspectRatio': 'none',
                    'class': 'fog', x: 0, y: 0,
                    height: '100%', width: '100%'
                    // fill with blacked out map
                });

            // hull / visible area
            this.visibleArea = this.background.append("image")
                .attr({ 
                    // TODO: use difference background image
                    'xlink:href': '/static/img/maps/map1.jpg',
                    'preserveAspectRatio': 'none',
                    'class': 'visibleArea', x: 0, y: 0,
                    height: '100%', width: '100%'
                })
                .style({ 
                    // fill with full version of map
                    fill: '#336699', mask: 'url(#map-mask)'
                });

            // draw paths under nodes
            this.paths = this.wrapper.append('g')
                .attr({ 'class': 'map-paths' });

            // Add nodes
            this.mapNodes = this.wrapper.append('g')
                .attr({ 'class': 'map-nodes' });

            // Draw nodes
            // Delay execution since the filters is a time consuming process
            setTimeout(function mapDelayUpdateMap(){
                self.updateMap.call(self);
            }, 20);

            return this;
        },

        // ------------------------------
        //
        // Update Map
        //
        // ------------------------------
        updateMap: function mapUpdate(){
            // Draws all nodes then updates the visible areas
            var self = this;
            logger.log('views/subviews/Map', 'updateMap() called');

            this.drawNodes();

            // minor delay to delay SVG filter effect
            setTimeout(function(){
                self.updateVisible.call(self);
            }, 20);

            return this;
        },

        
        // ------------------------------
        // Map Node interactions
        // ------------------------------
        nodeClicked: function nodeClicked(d,i){
            // CLICK event
            // callback when a node is interacted with
            // TODO: What should happen?
            logger.log('views/subviews/Map', '%s %O %O', 
                'nodeClicked:', d, i);

            // If the node is the current node OR the node has been visited,
            // do nothing
            if(d.node.get('isCurrentNode') || d.node.get('visited')){
                logger.log('views/subviews/Map', '[x] already visited this node');
                // TODO: do an effect
                alert('Already visted this location');

            } else {
                // Can travel to the node
                events.trigger('map:nodeClicked', {node: d, map: self.model});
            }
        },

        // HOVER events
        // --------------------------
        nodeHoverStart: function nodeHoverStart(d,i){
            logger.log('views/subviews/Map', '%s d:%O i:%O', 
                'nodeHoverStart:', d, i);

            // hover effect
            d3.select(this).classed('node-hover', true);
        },

        nodeHoverEnd: function nodeHoverEnd(d,i){
            logger.log('views/subviews/Map', '%s %O %O',
                'nodeHoverEnd:', d, i);
            d3.select(this).classed('node-hover', false);
        },

        // ==============================
        //
        // Draw nodes
        //
        // ==============================
        drawNodes: function mapDrawNodes(){
            // Draws all the nodes on the map
            // TODO: Update the function structure, this is really the main
            // draw func
            var self = this;
            logger.log('views/subviews/Map', 'drawNodes() called');

            // remove existing current node wrapper
            this.mapNodes.select('.node-wrapper.current-node').remove();

            // Draw nodes
            var nodes = this.mapNodes.selectAll('.node-wrapper')
                .data(this.getNodes());

            // Draw circles
            nodes.enter().append('g')
                .on('mouseenter', this.nodeHoverStart)
                .on('mouseleave', this.nodeHoverEnd)
                .on('touchend', this.nodeClicked)
                .on('click', this.nodeClicked);

            // add class names to the node wrapper
            nodes.attr({ 
                'class': function(d,i){
                    var cssClass = 'node-wrapper';

                    if(d.node.get('visited')){ cssClass += ' node-visited'; }
                    if(d.node.get('isCurrentNode')){ cssClass += ' current-node'; }
                    
                    return cssClass;
                }
            });

            // Add circles representing destinations
            var circles = nodes
                .append('circle')
                    .attr({
                        'class': function(d,i){
                            var cssClass = 'map-node'; 
                            if(d.node.get('visited')){ cssClass += ' node-visited'; }
                            if(d.node.get('isCurrentNode')){ cssClass += ' current-node'; }
                            
                            return cssClass;
                        },
                        cx: function(d){ return d.x; },
                        cy: function(d){ return d.y; },
                        r: 10
                    });

            // Lastly, add the first party member's sprite to the map's current node
            var entityWidth = 60;
            var entityHeight = entityWidth;

            var currentNode = null;
            this.mapNodes.select('.node-wrapper.current-node').append('image')
                .attr({
                    'xlink:href': function(d, i){
                        // store a ref to the current node
                        currentNode = d;

                        return "/static/img/characters/" + 
                            self.gameModel.get('playerEntities').models[0].get('sprite') + '.gif';
                    }, 
                    x: function(d){ return d.x - entityWidth/2; },
                    y: function(d){ return d.y - entityHeight/1.2; },
                    width: entityWidth, height: entityHeight
                });

            // remove any removed nodes
            nodes.exit().remove();

            // Draw a paths
            // --------------------------
            // We need to:
            //  1. Draw a path based on the visited nodes path
            //
            //  2. Draw a path from the current node to the next nodes
            var nextNodes = this.getNodes({ 
                nextNodes: true, visited: false, current: false
            });

            var destinationPaths = this.paths.selectAll('.destination-path')
                .data(nextNodes);

            // add paths
            var lineDestination = d3.svg.line().tension(0).interpolate("cardinal-open");

            destinationPaths.enter().append('path')
                .attr({
                    d: function(d){
                        return lineDestination([
                            [currentNode.x, currentNode.y],
                            [ 
                                currentNode.x + 4, 
                                currentNode.y - 30
                            ],
                            [d.x, d.y]
                        ]);
                    },
                    'class': 'destination-path'
                });

            // remove old paths
            destinationPaths.exit().remove();


            return this;
        },

        getNodes: function mapGetNodes(options){
            // This function will get (a subset) of nodes from the map's
            // node list, process them, and return them. For processing, it
            // transforms the x/y of the node into the actual x/y map coordinates
            //
            // options: {object} optional, describes what subset of nodes to get
            //
            //      all these options default to `true`
            //
            //      visited: {boolean} get nodes that have been visited 
            //      current: {boolean} get the current node
            //      nextNodes: {boolean} get the neighors of the current node
            // 
            // TODO: get only the visible vertices
            // TODO: get connected nodes to travel to
            var self = this;
            options = options || {};
            var nodes = this.model.get('nodes');

            var vertices = [];

            var currentNode;

            if(options.current !== false){
                currentNode = nodes.getCurrentNode();
                vertices.push({
                    x: currentNode.attributes.x * (self.width/800), 
                    y: currentNode.attributes.y * (self.height/400),
                    node: currentNode
                });
            }

            // push the current node's next possible neighbors
            if(options.getNextNodes !== false){

                _.each(nodes.getCurrentNode().get('nextNodes'), function(nodeIndex){
                    var node = nodes.models[nodeIndex];

                    vertices.push({
                        x: node.attributes.x * (self.width/800), 
                        y: node.attributes.y * (self.height/400),
                        node: node
                    });
                });
            }

            // push all visted nodes
            if(options.visited !== false){
                _.each(nodes.models, function(d){
                    var x = d.attributes.x;
                    var y = d.attributes.y;

                    if(d.attributes.visited && !d.attributes.isCurrentNode){
                        vertices.push({
                            x: x * (self.width/800), 
                            y: y * (self.height/400),
                            node: d
                        });
                    }
                });
            }

            return vertices;
        }, 

        // ------------------------------
        // Hide the fog for visible nodes
        // ------------------------------
        updateVisible: function mapGenerateHull(){
            // Updates the the visible area, based on nodes
            logger.log('views/subviews/Map', 
                'updateVisible() called. Updating fog of war');
            this.vertices = this.getNodes();

            var filter = '';

            // only use filters if lowRes mode is not true
            if(CONFIG && !CONFIG.lowRes){
                filter = 'url(#filter-map)';
            }

            // create a masked path to show visible nodes
            this.maskPath.selectAll('.visibleNode')
                .data(this.vertices)
                .enter()
                .append('circle')
                    .attr({
                        'class': 'visibleNode',
                        cx: function(d){ return d.x; },
                        cy: function(d){ return d.y; },
                        filter: filter,
                        r: function(d){ 
                            var r = 88;
                            // note: make unvisited nodes have a smaller visible
                            // radius
                            if(!d.node.attributes.visited){
                                r = 45;
                            }
                            return r;
                        }
                    }).style({
                        fill: '#ffffff'   
                    });

            return this;
        }

    });

    return MapView;
});
