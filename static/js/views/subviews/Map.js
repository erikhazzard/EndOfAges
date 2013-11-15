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
    ], function viewPageHome(
        d3, backbone, marionette, 
        logger, events,
        Map
    ){

    var MapView = Backbone.Marionette.Layout.extend({
        template: '#template-page-home',

        events: { },

        initialize: function mapViewInitialize(options){
            // initialize:
            logger.log('views/PageMap', '%cviews/PageMap: %s',
                'initialize() called');

            return this;
        },

        onShow: function mapViewOnShow(){
            return this;
        },

        // Map generation
        // ------------------------------
        drawMap: function mapViewGenerateMap(){
            var self = this;
            logger.log('views/subView/Map', '%cviews/subView/Map: %s',
                'drawMap() called');

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
                    'xlink:href': '/static/img/space-dark.png',
                    'preserveAspectRatio': 'none',
                    'class': 'fog', x: 0, y: 0,
                    height: height, width: width
                    // fill with blacked out map
                });
            // hull / visible area
            this.visibleArea = this.background.append("image")
                .attr({ 
                    'xlink:href': '/static/img/space.png',
                    'preserveAspectRatio': 'none',
                    'class': 'visibleArea', x: 0, y: 0,
                    height: height, width: width
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
            var self = this;
            logger.log('views/subView/Map', '%cviews/subView/Map: %s',
                'updateMap() called');

            this.drawNodes();
            setTimeout(function(){
                self.updateVisible.call(self);
            }, 20);

            return this;
        },

        drawNodes: function mapDrawNodes(){
            var self = this;
            logger.log('views/subView/Map', '%cviews/subView/Map: %s',
                'drawNodes() called');

            function nodeClicked(d,i){
                // callback when a node is interacted with
                // TODO: What should happen?
                logger.log('views/subViews/Map', 'node clicked', d, i);
            }

            // TODO: Use different images?
            var nodes = this.map.selectAll('.node')
                .data(this.model.get('nodes'))
                .enter()
                .append('circle')
                    .attr({
                        'class': 'node',
                        cx: function(d){
                            return d.x * self.width;
                        },
                        cy: function(d){
                            return d.y * self.height;
                        },
                        r: 10
                    })
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
            logger.log('views/subView/Map', '%cviews/subView/Map: %s',
                'updateVisible() called. Updating fog of war');
            this.vertices = this.getVertices(this.model.get('nodes'));
            this.maskPath.selectAll('.visibleNode')
                .data(this.vertices)
                .enter()
                .append('circle')
                    .attr({
                        'class': 'visibleNode',
                        cx: function(d){ return d[0]; },
                        cy: function(d){ return d[1]; },
                        filter: 'url(#map-filter)',
                        r: 80
                    }).style({
                        fill: '#ffffff'   
                    });

            return this;
        }

    });

    return MapView;
});
