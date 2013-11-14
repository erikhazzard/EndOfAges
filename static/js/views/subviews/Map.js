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
            logger.log('views/PageMap', 'in initialize');

            return this;
        },

        onShow: function mapViewOnShow(){
            return this;
        },

        // Map generation
        // ------------------------------
        drawMap: function mapViewGenerateMap(){
            var self = this;

            // d3 used to draw map
            var svg = d3.select('#map');
            // empty existing map
            svg.select('.svg-wrapper').remove();

            var width = svg.attr('width'); 
            this.width = width;
            var height = svg.attr('height'); 
            this.height = height;

            // setup wrapper and elements
            this.wrapper = svg.append('g').attr({ 'class': 'svg-wrapper' });

            this.defs = this.wrapper.append('defs');
            this.maskPath = this.defs.append('mask')
                .attr({ id: 'map-mask' });

            // Add background layer
            this.background = this.wrapper.append('g');
            this.background.append("rect")
                .attr({ 
                    'class': 'fog', x: 0, y: 0,
                    height: height, width: width
                });
            // hull / visible area
            this.visibleArea = this.background.append("rect")
                .attr({ 
                    'class': 'visibleArea', x: 0, y: 0,
                    height: width, width: width
                })
                .style({ 
                    fill: '#336699', mask: 'url(#map-mask)'
                });

            // Add nodes
            var map = this.wrapper.attr({ 'class': 'map' });
            var nodes = map.selectAll('.node')
                .data(this.model.get('nodes'))
                .enter()
                .append('circle')
                    .attr({
                        cx: function(d){
                            return d.x * width;
                        },
                        cy: function(d){
                            return d.y * height;
                        },
                        r: 5
                    });
            this.vertices = this.getVertices(this.model.get('nodes'));
            return this;
        },

        getVertices: function mapGetVerticies(nodes){
            // takes in an array of nodes and returns an array of
            // [x,y] pairs
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

        updateHull: function mapGenerateHull(){
            // Updates the convex hull, the visible area, based on nodes
            this.maskPath.selectAll('.visibleNode')
                .data(this.vertices)
                .enter()
                .append('circle')
                    .attr({
                        'class': 'visibleNode',
                        cx: function(d){ return d[0]; },
                        cy: function(d){ return d[1]; },
                        filter: 'url(#map-filter)',
                        r: 50
                    }).style({
                        fill: '#ffffff'   
                    });

            return this;
        }

    });

    return MapView;
});
