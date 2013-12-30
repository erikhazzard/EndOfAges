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
            this.wrapper = svg.append('g').attr({ 'class': 'svg-wrapper' });

            this.defs = this.wrapper.append('defs');
            this.maskPath = this.defs.append('mask')
                .attr({ id: 'map-mask' });

            // Add background layer
            this.background = this.wrapper.append('g');
            this.background.append("image")
                .attr({ 
                    'xlink:href': '/static/img/map1-dark.png',
                    'preserveAspectRatio': 'none',
                    'class': 'fog', x: 0, y: 0,
                    height: '100%', width: '100%'
                    // fill with blacked out map
                });
            // hull / visible area
            this.visibleArea = this.background.append("image")
                .attr({ 
                    'xlink:href': '/static/img/map1.png',
                    'preserveAspectRatio': 'none',
                    'class': 'visibleArea', x: 0, y: 0,
                    height: '100%', width: '100%'
                })
                .style({ 
                    // fill with full version of map
                    fill: '#336699', mask: 'url(#map-mask)'
                });

            // Add nodes
            this.map = this.wrapper.attr({ 'class': 'map' });

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

        // ------------------------------
        //
        // Draw nodes
        //
        // ------------------------------
        drawNodes: function mapDrawNodes(){
            // Draws all the nodes on the map
            var self = this;
            logger.log('views/subviews/Map', 'drawNodes() called');

            // TODO: Use different images?
            // Draw nodes
            var nodes = this.map.selectAll('.node')
                .data(this.getVisibleNodes(this.model.get('nodes')));

            // Draw circles
            nodes.enter()
                .append('circle')
                    .attr({
                        'class': function(d){
                            var cssClass = 'map-node';
                            if(d.node.get('visited')){
                                cssClass += ' node-visited';
                            }
                            if(d.node.get('isCurrentNode')){
                                cssClass += ' current-node';
                            }
                            
                            return cssClass;
                        },
                        cx: function(d){ return d.x; },
                        cy: function(d){ return d.y; },
                        r: 10
                    })
                    .on('mouseenter', this.nodeHoverStart)
                    .on('mouseleave', this.nodeHoverEnd)
                    .on('touchend', this.nodeClicked)
                    .on('click', this.nodeClicked);

            nodes.exit().remove();

            // TODO: Draw a path from ALL the visited nodes
            // TODO: draw a path to all the nextNodes
        },

        getVisibleNodes: function mapGetVisibleNodes(nodes){
            // takes in an array of nodes and returns an array of [x,y] pairs
            // 
            // TODO: get only the visible vertices
            var self = this;
            var vertices = [];

            // push the current node's neighbors
            _.each(nodes.getCurrentNode().get('nextNodes'), function(nodeIndex){
                var node = nodes.models[nodeIndex];

                vertices.push({
                    x: node.attributes.x * (self.width/800), 
                    y: node.attributes.y * (self.height/400),
                    node: node
                });
            });

            // push all visted nodes
            _.each(nodes.models, function(d){
                var x = d.attributes.x;
                var y = d.attributes.y;

                if(d.attributes.visited){
                    vertices.push({
                        x: x * (self.width/800), 
                        y: y * (self.height/400),
                        node: d
                    });
                }
            });

            return vertices;
        }, 

        // ------------------------------
        // Hide the fog for visible nodes
        // ------------------------------
        updateVisible: function mapGenerateHull(){
            // Updates the the visible area, based on nodes
            logger.log('views/subviews/Map', 
                'updateVisible() called. Updating fog of war');
            this.vertices = this.getVisibleNodes(this.model.get('nodes'));

            var filter = '';

            // only use filters if lowRes mode is not true
            if(CONFIG && !CONFIG.lowRes){
                filter = 'url(#filter-map)';
            }

            this.maskPath.selectAll('.visibleNode')
                .data(this.vertices)
                .enter()
                .append('circle')
                    .attr({
                        'class': 'visibleNode',
                        cx: function(d){ return d.x; },
                        cy: function(d){ return d.y; },
                        filter: filter,
                        r: 80
                    }).style({
                        fill: '#ffffff'   
                    });

            return this;
        }

    });

    return MapView;
});
