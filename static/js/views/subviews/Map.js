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

    // ----------------------------------
    // Helper functions
    // ----------------------------------
    function animatePath(path) {
        path.transition()
            .duration(1500)
            .ease('linear')
            .attrTween("stroke-dasharray", tweenDash)
            .each("end", function() { d3.select(this).call(animatePath); });
    }

    function tweenDash() {
        var l = this.getTotalLength(),
        i = d3.interpolateString("0," + l, l + "," + l);
        return function(t) { return i(t); };
    }

    // ----------------------------------
    //
    // Map view
    //
    // ----------------------------------
    var MapView = Backbone.Marionette.Layout.extend({
        CONFIG: {
            updateDuration: 1500,
            updateEase: 'cubic-in-out'
        },

        template: '#template-game-map',

        events: { },

        'className': 'game-map-wrapper',

        initialize: function mapViewInitialize(options){
            // initialize:
            var self = this;
            logger.log('views/subviews/Map', 'initialize() called');
            this.gameModel = options.gameModel;

            // set as null by default. will be populated when map is drawn
            this.nodes = null;

            // When the current node changes, update the map
            this.listenTo(this.model, 'change:currentNode', this.updateMap);


            // TODO: on node mouse over, draw line
            // TODO: NOOOO remove this, this is JUST for demo
            this.listenTo(events, 'nodeHoverOn', function(options){
                var line = function(d){
                    return d3.svg.line()([
                        [self.nodes.current.x, self.nodes.current.y],
                        [options.d.x, options.d.y]
                    ]);
                };
                self.paths.append('path')
                    .attr({
                        d: line, 
                        'class': 'to-remove destination-path-animated',
                        'filter': 'url(#filter-wavy)'
                    })
                    .call(animatePath);
            });
            this.listenTo(events, 'nodeHoverOff', function(options){
                self.paths.selectAll('.to-remove').transition()
                    .duration(0);
                self.paths.selectAll('.to-remove').remove();
            });

            return this;
        },

        onShow: function mapViewOnShow(){
            // Setup the map svg element and groups
            this.prepareMap();

            // draw / update the map
            this.updateMap();

            return this;
        },

        // ==============================
        //
        // First time setup functions
        //
        // ==============================
        prepareMap: function mapViewDrawMap(options){
            var self = this;
            logger.log('views/subviews/Map', 'prepareMap() called');

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

            // stores entity sprite on map
            // --------------------------
            // add group
            this.entitySpritesWrapper = this.wrapper.append('g')
                .attr({ 'class': 'entity-sprites-wrapper' });

            return this;
        },

        prepareEntities: function mapDrawEntities(){
            // Sets up and Draws the entities and their gorups
            var self = this;
            var entityWidth = 60;
            var entityHeight = entityWidth;

            self.entityWidth = entityWidth;
            self.entityHeight = entityHeight;

            this.entitySprites = this.entitySpritesWrapper.append('g')
                .attr({ 
                    'class': 'map-entity-sprites',
                    transform: function(){ 
                        return 'translate(' + [
                            self.nodes.current.x - self.entityWidth/2,
                            self.nodes.current.y - self.entityHeight/1.2
                        ] + ')';
                    }
                });

            // Add the party member to the map
            this.entitySprites.append('image')
                .attr({
                    'xlink:href': function(d, i){
                        // store a ref to the current node
                        return "/static/img/characters/" + 
                            self.gameModel.get('playerEntities').models[0].get('sprite') + '.gif';
                    }, 
                    width: entityWidth, height: entityHeight
                });
        },

        // ==============================
        //
        // Model change callbacks
        //
        // ==============================
        updateNodeReferences: function updateNodeReferences(){
            // Called whenever the current node changes. Updates all
            // node references
            logger.log('views/subviews/Map', '1. updateNodeReferences() called');
            this.nodes = {};

            // visited map nodes also include current node (it's visited)
            this.nodes.visited = this.getNodes({ 
                next: false, visited: true, current: true
            });

            // current will only ever be a single node
            this.nodes.current = this.getNodes({ 
                next: false, visited: false, current: true
            })[0];

            this.nodes.next = this.getNodes({ 
                next: true, visited: false, current: false
            });

            // update all the nodes
            this.nodes.all = this.nodes.visited.concat(this.nodes.next);
            logger.log('views/subviews/Map', '2. updateNodeReferences() all nodes: %O', this.nodes);

            return this;
        },

        // ==============================
        //
        // Draw nodes
        //
        // ==============================
        updateNodes: function mapDrawNodes(){
            // Draws all the nodes on the map
            // TODO: Update the function structure, this is really the main
            // draw func
            var self = this;
            logger.log('views/subviews/Map', 'updateNodes() called');

            // Draw nodes
            var nodes = this.mapNodes.selectAll('.node-wrapper')
                .data(this.nodes.all);

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
                    if(d.node.get('isCurrentNode')){ cssClass += ' node-current'; }
                    
                    return cssClass;
                }
            });

            // remove existing circles
            // TODO: do this better
            nodes.selectAll('circle').remove();

            // Add circles representing destinations
            var circles = nodes
                .append('circle')
                    .attr({
                        'class': function(d,i){
                            var cssClass = 'map-node'; 
                            if(d.node.get('visited')){ cssClass += ' node-visited'; }
                            if(d.node.get('isCurrentNode')){ cssClass += ' node-current'; }
                            
                            return cssClass;
                        },
                        cx: function(d){ return d.x; },
                        cy: function(d){ return d.y; },
                        r: 10
                    });

            // remove any removed nodes
            nodes.exit().remove();
        },

        // ------------------------------
        // Draw a paths
        // ------------------------------
        updatePaths: function(){
            var self = this;
            //  1. Draw a path based on the visited nodes path
            logger.log('views/subviews/Map', 
                'visitedNodes : %O', this.nodes.visited);

            var visited = self.model.get('visitedPath');

            // add group for visited paths if it hasn't been added yet
            if(!this.visitedPaths){
                this.visitedPaths = this.paths.append('g')
                    .attr({ 
                        'filter': 'url(#filter-wavy)'
                    });
            }

            // Add a line between the last visited node and the current
            if(visited.length >= 2){
                this.visitedPaths.append('path')
                    .attr({
                        'class': 'visited-path visited-path-dotted',
                        d: function(){
                            var coords = [];
                            // if no nodes have been visited yet, return empty array
                            if(visited.length < 2){ return ''; }

                            var previousIndex = visited[visited.length-2];
                            var currentIndex = visited[visited.length-1];
                            var previous  = self.getCoordinatesFromNode(
                                self.model.get('nodes').models[previousIndex]
                            );

                            return d3.svg.line()([ 
                                // first pair (previous node)
                                [previous.x, previous.y], 
                                [self.nodes.current.x, self.nodes.current.y]
                            ]);
                        }
                    })
                    // transition the line coming in
                    .transition().duration(this.CONFIG.updateDuration)
                        .ease(this.CONFIG.updateEase)
                        .attrTween("stroke-dasharray", tweenDash);
            }

            // --------------------------
            //
            //  2. Draw a path from the current node to the next nodes
            //
            // --------------------------
            // add paths
            line = function(d){
                return d3.svg.line()([
                    [self.nodes.current.x, self.nodes.current.y],
                    [d.x, d.y]
                ]);
            };

            // remove existing destination paths
            d3.selectAll('.destination-path').remove();

            var destinationPaths = this.paths.selectAll('.destination-path')
                .data(this.nodes.next);

            // draw the dotted path
            destinationPaths.enter().append('path');

            destinationPaths
                .attr({
                    d: line, 
                    'class': 'destination-path destination-path-dotted',
                    'filter': 'url(#filter-wavy)',
                    'stroke-dashoffset': 0
                });

            ////draw the animated path
            ////TODO: Should this antimate? If it should be, we can do this:
            //// NOTE: Be sure to cancel the animation
            _.each(destinationPaths[0], function(path){
                path = d3.select(path);
                var totalLength = path.node().getTotalLength();
                var duration = 18000 * (totalLength / 115);
                var i = 1;
                function animateNextPath(){
                    // need to check if the path was removed from the DOM.
                    // If so, remove the path and stop the animations
                    if(!path[0][0].parentNode){ path.remove(); return false; }

                    path.transition().duration(duration).ease("linear")
                        .attr("stroke-dashoffset", -totalLength * i)
                            .each('end', function(){ d3.select(this).call(animateNextPath); });
                    i += 1;
                }
                animateNextPath();
            });

            // remove old paths
            destinationPaths.exit().remove();

            return this;
        },

        // ------------------------------
        //
        // Map Node interactions
        //
        // ------------------------------
        nodeClicked: function nodeClicked(d,i){
            // CLICK event
            // callback when a node is interacted with
            // TODO: What should happen?
            logger.log('views/subviews/Map', '%s %O %O', 
                'nodeClicked:', d, i);

            // If the node is the current node OR the node has been visited,
            // do nothing
            if (d.node.get('isCurrentNode')){
                logger.log('views/subviews/Map', '[x] already visited this node');
                // TODO: do an effect
                alert("You're already heree");
            } else if(d.node.get('visited')){
                logger.log('views/subviews/Map', '[x] already visited this node');
                // TODO: do an effect
                alert('Already visted this location');
            } else {
                // Can travel to the node
                events.trigger('map:nodeClicked', {node: d.node});
            }
        },

        // HOVER events
        // --------------------------
        nodeHoverStart: function nodeHoverStart(d,i){
            logger.log('views/subviews/Map', '%s d:%O i:%O', 
                'nodeHoverStart:', d, i);

            // TODO: REMOVE !!!!!!!!!!!!!!!!
            // TODO: REMOVE !!!!!!!!!!!!!!!!
            // TODO: REMOVE !!!!!!!!!!!!!!!!
            // TODO: REMOVE !!!!!!!!!!!!!!!!
            events.trigger('nodeHoverOn', {d: d});
            // hover effect
            d3.select(this).classed('node-hover', true);
        },

        nodeHoverEnd: function nodeHoverEnd(d,i){
            logger.log('views/subviews/Map', '%s %O %O',
                'nodeHoverEnd:', d, i);
            // TODO: REMOVE !!!!!!!!!!!!!!!!
            // TODO: REMOVE !!!!!!!!!!!!!!!!
            // TODO: REMOVE !!!!!!!!!!!!!!!!
            // TODO: REMOVE !!!!!!!!!!!!!!!!
            // TODO: REMOVE !!!!!!!!!!!!!!!!
            events.trigger('nodeHoverOff', {d: d});
            d3.select(this).classed('node-hover', false);
        },

        // =====================================================================
        //
        // Update Map functions
        //
        // =====================================================================
        updateMap: function mapUpdate(){
            // Draws all nodes then updates the visible areas
            var self = this;
            logger.log('views/subviews/Map', 
                '=== 1. updateMap() called');

            // update the store node references
            this.updateNodeReferences();

            // setup entity groups if it hasn't been setup
            if(!this.entitiesSetup){
                this.prepareEntities();
                this.entitiesSetup = true;
            }


            // draw / update nodes
            this.updateNodes();
            this.updatePaths();

            // minor delay to delay SVG filter effect
            setTimeout(function(){
                self.updateVisible.call(self);
            }, 20);

            // transition the entity to the next node
            this.moveEntity();

            return this;
        },

        moveEntity: function moveEntity(){
            // Move the entity sprite to the next node. This is called whenever
            // the node instance successfully is completed
            var self = this;

            this.entitySprites.transition()
                .duration(this.CONFIG.updateDuration)
                .ease(this.CONFIG.updateEase)
                .attr({ 
                    transform: function(){ 
                        return 'translate(' + [
                            self.nodes.current.x - self.entityWidth/2,
                            self.nodes.current.y - self.entityHeight/1.2
                        ] + ')';
                    }
                });
            
            return this;
        },

        

        // =====================================================================
        //
        // Utility Functions
        //
        // =====================================================================
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
            //      next: {boolean} get the neighors of the current node
            var self = this;
            options = options || {};
            logger.log('views/subviews/Map', 
                '1. getNodes() called: %O', options);

            var nodes = this.model.get('nodes');
            var vertices = [];
            var currentNode;

            if(options.current !== false){
                currentNode = this.model.getCurrentNode();
                vertices.push( _.extend(
                    { node: currentNode },
                    self.getCoordinatesFromNode(currentNode)
                ));
            }

            // push the current node's next possible neighbors
            if(options.next !== false){
                _.each(this.model.getCurrentNode().get('nextNodes'), function(node){
                    vertices.push( _.extend(
                        { node: node },
                        self.getCoordinatesFromNode(node)
                    ));
                });
            }

            // push all visted nodes
            if(options.visited !== false){
                _.each(nodes.models, function(node){
                    if(node.attributes.visited){ 
                        if( !node.attributes.isCurrentNode ){
                            vertices.push( _.extend(
                                { node: node },
                                self.getCoordinatesFromNode(node)
                            ));
                        }
                    }
                });
            }

            return vertices;
        }, 

        getCoordinatesFromNode: function getCoordinatesFromNode(node){
            // Returns the map x/y for a passed in map node object
            var coordinates = {
                x: node.attributes.x * (this.width/this.model.get('nodeMaxWidth')), 
                y: node.attributes.y * (this.height/this.model.get('nodeMaxHeight'))
            };

            return coordinates;
        },

        // ------------------------------
        // Hide the fog for visible nodes
        // ------------------------------
        updateVisible: function mapGenerateHull(){
            // Updates the the visible area, based on nodes
            logger.log('views/subviews/Map', 
                'updateVisible() called. Updating fog of war');
            var vertices = this.nodes.all;

            var filter = '';

            // only use filters if lowRes mode is not true
            if(CONFIG && !CONFIG.lowRes){
                filter = 'url(#filter-map)';
            }

            // create a masked path to show visible nodes
            var masks = this.maskPath.selectAll('.visibleNode')
                .data(vertices);

            masks.enter()
                .append('circle')
                .style({
                    fill: '#ffffff'   
                });

            masks.attr({
                'class': 'visibleNode',
                cx: function(d){ return d.x; },
                cy: function(d){ return d.y; },
                filter: filter,
                r: function(d){ 
                    var r = 73;
                    // note: make unvisited nodes have a smaller visible
                    // radius
                    if(d.node.attributes.isCurrentNode){ } 
                    else if(d.node.attributes.visited){ r = 73; } 
                    else { r = 45; }
                    return r;
                }
            });

            masks.exit().remove();

            return this;
        }

    });

    return MapView;
});
