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

        this.hasBeenDrawn = false;

        return this;
    }

    RaceViz.prototype.update = function update (){
        // Draws or updates the chart based on the data
        logger.log('RaceViz', 'drawing chart : data : ', {
            data: this.PROPS.data
        });

        // prepare data
        var data = [
            ['Health', this.PROPS.data.health],
            ['Attack', this.PROPS.data.attack],
            ['Defense', this.PROPS.data.defense]
        ];

        // setup scales
        var maxWidth = 300;
        this.healthScale = d3.scale.linear()
            .domain([ 0, 100 ])
            .range([ 0, maxWidth ]);
        this.attackDefenseScale = d3.scale.linear()
            .domain([ 0, 20 ])
            .range([ 0, maxWidth ]);

        // 1. Draw
        // ------------------------------
        // Setup groups
        var groups = this.chart.selectAll('g')
            .data(data)
            .enter()
                .append('g')
                .attr({ 
                    'class': 'propWrapper',
                    transform: function translate(d,i){
                        return 'translate(' + [
                            0, 40 * i
                        ] + ')';
                    }
                });

        // Setup outlines
        var rectOutlines = this.chart.selectAll('.outline')
            .data(data)
            .enter()
                .append('rect')
                .attr({
                    'class': 'outline',
                    width: maxWidth,
                    height: 30,
                    x: 0,
                    y: 0
                });

        // Setup fills
        var rectFills = this.chart.selectAll('.bar')
            .data(data);

        rectFills
            .enter()
                .append('rect')
                .attr({
                    'class': 'bar',
                    height: 30,
                    x: 0,
                    y: 0
                });

        // 2. Update
        // ------------------------------
        rectFills 
            .attr({
                'class': function setupClassName(d,i){
                    return 'bar ' + d[0];
                },
                width: function setupWidth (d,i){
                    return Math.random() * 200;
                }
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
