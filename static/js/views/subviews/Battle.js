// ===========================================================================
//
// Battle subview
//
//      View for a battle. Sub views contains in the Combat subfolder
//
// Battle Oveview:
//
//      This view is instaniated when a battle takes place. A battle
//      will not always happen after clicking on a map node - there may
//      be an option to not fight before this view is created.
//
//      Battles happen between the game player and a single enemy. Each player
//      has a party (a collection of entities). The player's entities are
//      managed in the Game model object's 'playerEntities' property (a 
//      collection of entity models)
//
//
// End states:
//      1. Player defeats all enemy entities
//      2. Player retreats
//      3. All of player's entities die
//      4. Player surrenders (Not always an option)
//      5. Enemy retreats
//      6. Eneemy surrenders
//
//
// View overview
// --------------------------------------
//  This view renders the battle scene and acts as a controller for the battle.
//
//
// ===========================================================================
define(
    [ 
        'd3', 'backbone', 'marionette',
        'logger', 'events'
    ], function viewBattle(
        d3, backbone, marionette, logger, events
    ){

    var BattleView = Backbone.Marionette.Layout.extend({
        template: '#template-game-battle',
        'className': 'game-battle-wrapper',

        events: {
            'click .finish-instance': 'finishInstance'
        },

        initialize: function battleViewInitialize(options){
            logger.log('views/subviews/Battle', 'initialize() called');
            
        },

        onShow: function battleOnShow(){
            // Render the scene
            logger.log('views/subviews/Battle', '1. onShow() called');
            
            // Setup svg
            var svg = d3.select('#battle');
            var wrapper = svg.append('g');

            // --------------------------
            // setup groups
            // --------------------------
            logger.log('views/subviews/Battle', '2. setting up groups');
            var background = wrapper.append('g')
                .attr({ 'class': 'background' });

            var playerEntities = wrapper.append('g')
                .attr({ 'class': 'playerEntities' });

            var enemyEntities = wrapper.append('g')
                .attr({ 'class': 'enemyEntities' });

            // --------------------------
            // setup background
            // --------------------------
            logger.log('views/subviews/Battle', '3. setting up backdrop');
            var backgroundImage = background.append('image')
                .attr({
                    'xlink:href': '/static/img/backdrops/cave.png',
                    'preserveAspectRatio': 'none',
                    'class': 'backgroundImage', x: 0, y: 0,
                    height: '100%', width: '100%'
                });

            // --------------------------
            // Draw entities
            // --------------------------
            // TODO: use sprites
            logger.log('views/subviews/Battle', '4. setting up entities');
            var entityHeight = 60;

            // draw player entities
            playerEntities.selectAll('.playerEntity')
                .data(this.model.get('playerEntities').models)
                .enter()
                    // TODO: draw sprites
                    .append('rect')
                        .attr({
                            'class': 'playerEntity entity',
                            x: 20,
                            y: function(d,i){
                                return 20 + (i * (entityHeight + 20));
                            },
                            height: entityHeight,
                            width: entityHeight
                        });

            enemyEntities.selectAll('.enemyEntity')
                .data(this.model.get('playerEntities').models)
                .enter()
                    // TODO: draw sprites
                    .append('rect')
                        .attr({
                            'class': 'enemyEntity entity',
                            // TODO: get width dynamically
                            x: 800 - entityHeight - 200,
                            y: function(d,i){
                                return 20 + (i * (entityHeight + 20));
                            },
                            height: entityHeight,
                            width: entityHeight
                        });
        },

        // ------------------------------
        //
        // User interaction
        //
        // ------------------------------
        finishInstance: function finishInstance(){
            events.trigger('node:instanceFinished');
        }

    });

    return BattleView;
});
