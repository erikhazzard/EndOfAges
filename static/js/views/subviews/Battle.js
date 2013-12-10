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
        'd3', 'backbone', 'marionette', 'logger', 'events',
        'views/subviews/battle/AbilityList'
    ], function viewBattle(
        d3, backbone, marionette, logger, events,
        AbilityListView
    ){

    var BattleView = Backbone.Marionette.Layout.extend({
        template: '#template-game-battle',
        'className': 'game-battle-wrapper',

        events: {
            'click .finish-instance': 'finishInstance'
        },

        regions: {
            'regionAbility': '#region-battle-ability-wrapper'
        },

        initialize: function battleViewInitialize(options){
            logger.log('views/subviews/Battle', 'initialize() called'); 
            // keep track of the selected entity and the current target
            this.selectedEntity = null;
            // target should reset whenever entity changes
            //  should be able to select own entities with 1 - n keys,
            //      target with shift + n 
            //  if target is null when an ability is attempted to be used,
            //      user must select a target for the ability
            this.target = null;
        },

        onShow: function battleOnShow(){
            // Render the scene
            var self = this;
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
            //
            // Draw Player entities
            //
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
                        })
                        .on('click', function(d,i){ return self.entitySelected(d,i); })
                        .on('touchend', function(d,i){ return self.entitySelected(d,i); })
                        .on('mouseenter',function(d,i){ return self.entityHoverStart(d,i); })
                        .on('mouseleave',function(d,i){ return self.entityHoverEnd(d,i); });

            // draw enemies
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

        // entity interaction events
        entitySelected: function(d,i){
            // This triggers when an entity is selected - meaning, whenever
            // a user selects an entity to use an ability or see more info
            // about it. When this happens:
            //  -Get the entity model from the selection
            //  -Show the abilities for the entity
            //  -Show more info
            //  -Move the entity forward
            //
            //1. get model based on selected element
            var model = this.model.get('playerEntities').models[i];
            logger.log("views/subviews/Battle", 
                "1. entity selected: %O : %O \n model: %O", d,i, model);
            
            //2. show abilities
            logger.log("views/subviews/Battle",
                "2. showing ability view");
            var abilityView = new AbilityListView({
                collection: model.get('abilities')
            });
            this.regionAbility.show(abilityView);


            // 3. Move entity forward a bit


            return this;
        },
        entityHoverStart: function(d,i){
            //logger.log("views/subviews/Battle", 
                //"entity hover start: %O : %O", d,i);

            return this;
        },
        entityHoverEnd: function(d,i){
            //logger.log("views/subviews/Battle", 
                //"entity hover end: %O : %O", d,i);

            return this;
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
