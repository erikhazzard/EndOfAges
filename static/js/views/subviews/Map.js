// ===========================================================================
//
// Map subview
//
//      View for the map
//
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
        // Update Map
        // ------------------------------
        updateMap: function mapUpdate(){
            // Draws all nodes then updates the visible areas
            var self = this;
            logger.log('views/subviews/Map', 'updateMap() called');

            this.drawNodes();
            setTimeout(function(){
                self.updateVisible.call(self);
            }, 20);

            return this;
        },

        drawNodes: function mapDrawNodes(){
            // Draws all the nodes on the map
            var self = this;
            logger.log('views/subviews/Map', 'drawNodes() called');

            // CLICK event
            // --------------------------
            function nodeClicked(d,i){
                // callback when a node is interacted with
                // TODO: What should happen?
                logger.log('views/subviews/Map', '%s %O %O', 
                    'nodeClicked:', d, i);
                events.trigger('map:nodeClicked', {node: d, map: self.model});
            }

            // HOVER events
            // --------------------------
            function nodeHoverStart(d,i){
                logger.log('views/subviews/Map', '%s d:%O i:%O', 
                    'nodeHoverStart:', d, i);

                // hover effect
                d3.select(this).attr({
                    'xlink:href':'#icon-tower-hover'
                });
            }
            function nodeHoverEnd(d,i){
                logger.log('views/subviews/Map', '%s %O %O',
                    'nodeHoverEnd:', d, i);
                // dehover
                d3.select(this).attr({
                    'xlink:href':'#icon-tower'
                });
            }

            // TODO: Use different images?
            // Draw nodes
            var nodes = this.map.selectAll('.node')
                .data(this.model.get('nodes'))
                .enter()

                // Draw circles
                ////.append('circle')
                    ////.attr({
                        ////'class': 'node',
                        ////cx: function(d){
                            ////return d.x * self.width;
                        ////},
                        ////cy: function(d){
                            ////return d.y * self.height;
                        ////},
                        ////r: 10
                    ////})

                // Use an existing icon
                .append('use')
                    .attr({
                        'class': 'node',
                        'xlink:href':'#icon-tower',
                        x: function(d){
                            return (d.x * self.width) - 20;
                        },
                        y: function(d){
                            return (d.y * self.height) - 20;
                        }
                    })
                    .on('mouseenter', nodeHoverStart)
                    .on('mouseleave', nodeHoverEnd)

                    .on('touchend', nodeClicked)
                    .on('click', nodeClicked);
        },

        getVertices: function mapGetVerticies(nodes){
            // takes in an array of nodes and returns an array of
            // [x,y] pairs
            // TODO: get only the visible vertices
            var self = this;
            var vertices = [];

            _.each(nodes, function(d){
                var x = d.x;
                var y = d.y;

                //if(Math.random() < 0.4){
                    vertices.push([ x * self.width, y * self.height ]);
                //}
            });

            return vertices;
        }, 

        updateVisible: function mapGenerateHull(){
            // Updates the the visible area, based on nodes
            logger.log('views/subviews/Map', 
                'updateVisible() called. Updating fog of war');
            this.vertices = this.getVertices(this.model.get('nodes'));

            // only use filters if lowRes mode is not true
            var filter = '';
            if(CONFIG && !CONFIG.lowRes){
                filter = 'url(#map-filter)';
            }

            this.maskPath.selectAll('.visibleNode')
                .data(this.vertices)
                .enter()
                .append('circle')
                    .attr({
                        'class': 'visibleNode',
                        cx: function(d){ return d[0]; },
                        cy: function(d){ return d[1]; },
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
