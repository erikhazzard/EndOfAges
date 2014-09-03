/* =========================================================================
 *
 * RaceViz
 *      Visualization function for the race in the create screen
 *
 * ========================================================================= */
// Renders a visualization of stats to the passed in element
define([ 'd3', 'logger', 'events' ], 
function viewRaceViz( d3, logger, events){

    function RaceViz ( $el ){
        logger.log('RaceViz', 'initialized raceViz chart object');

        this.chart = d3.select($el[0]).append('svg')
            .attr({
                width: '100%',
                height: '100%'
            })
            .append('g')
                .attr({ 'class': 'create-race-viz-chart' });

        // data properties
        this.PROPS = {
            data: null
        };


        // prepare data
        this.chartData = null;

        this.hasBeenDrawn = false;

        return this;
    }

    RaceViz.prototype.update = function update (){
        // Draws or updates the chart based on the data
        var self = this;
        logger.log('RaceViz', 'drawing chart : data : ', {
            data: this.PROPS.data
        });

        // prepare data
        var data = [
            {key: 'Health', value: this.PROPS.data.baseStats.health},
            {key: 'Attack', value: this.PROPS.data.baseStats.attack},
            {key: 'Defense', value: this.PROPS.data.baseStats.defense},
        ];

        // setup scales
        var maxWidth = 330;
        var startX = 90;

        maxWidth = maxWidth - startX;

        this.healthScale = d3.scale.linear()
            .domain([ 0, 100 ])
            .range([ 0, maxWidth ]);
        this.attackDefenseScale = d3.scale.linear()
            .domain([ 0, 10 ])
            .range([ 0, maxWidth ]);

        // 1. Draw
        // ------------------------------
        // Setup groups
        var groups = this.chart.selectAll('.propWrapper')
            // specify a key function to control how data
            // is joined to elements - use the `key` key
            .data(data, function(d){ return d.key; });

        groups
            .enter()
                .append('g')
                .attr({ 
                    'class': 'propWrapper',
                    transform: function translate(d,i){
                        return 'translate(' + [
                            0, 2 + (40 * i)
                        ] + ')';
                    }
                });

        // Setup outlines
        var rectOutlines = groups.selectAll('.outline')
            .data(function(d,i){ return [d]; });

        rectOutlines
            .enter()
                .append('rect')
                .attr({
                    'class': 'outline',
                    filter: 'url(#filter-wavy)',
                    width: maxWidth,
                    height: 30,
                    x: startX,
                    y: 0
                });

        // Setup fills
        var rectFills = groups.selectAll('.bar')
            .data(function(d,i){ return [d]; });

        rectFills
            .enter()
                .append('rect')
                .attr({
                    'class': 'bar',
                    height: 28,
                    x: startX+1,
                    y: 1
                });

        // 2. Update
        // ------------------------------
        rectFills 
            .transition()
            .delay(150)
            .duration(600)
            .attr({
                'class': function setupClassName(d,i){
                    logger.log('RaceViz', '...', d);
                    return 'bar ' + d.key;
                },
                filter: 'url(#filter-wavy)',
                width: function setupWidth (d,i){
                    if(d.key.toLowerCase() === 'health'){
                        return self.healthScale(d.value) - 1;
                    } else {
                        return self.attackDefenseScale(d.value) - 1;
                    }
                }
            });

        // Text
        // ------------------------------
        var labels = groups.selectAll('.label')
            .data(function(d,i){ return [d]; });
        
        labels
            .enter()
            .append('text')
            .attr({
                'class': 'label',
                x: 0,
                y: 24
            })
            .text(function(d,i){
                return d.key;
            });
        

        return this;
    };

    // =====================================================================
    //
    // Getter / Setters (reusable charts paradigm)
    //
    // =====================================================================
    RaceViz.prototype.getterSetter = function helper(key){
        // Getter / setter helper funciton. Takes in a key for the
        // PROPS obj and returns a getter / setter func which accesses
        // the passed in key
        return function getSetterHelperRet(value){
            // getter
            if(arguments.length === 0){ return this.PROPS[key]; }
            // setter
            this.PROPS[key] = value;
            return this;
        };
    };
    
    //setup getter / setters
    RaceViz.prototype.data = RaceViz.prototype.getterSetter('data');

    return RaceViz;
});
