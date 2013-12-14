// ===========================================================================
//
// Battle Controller / View
//
//  TODO: Break up view and controller logic
//
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
// "Game" Loop
//      This battle controller contains a game loop, used to keep track of when
//      abilities can be used, buffs expire, etc. All abilities and timers
//      are express to the player in terms of seconds
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
// States:
//  There are two states: "normal" and "ability".
//      1. Normal (default): Player is able to select an entity and
//      decide what ability to use.
//      2. Targetting: After selecting an ability to use, player selects
//      the entity they want to use the ability on
//
//
// View overview
// --------------------------------------
//  This view renders the battle scene and acts as a controller for the battle.
//
//
// ===========================================================================


//// scratch:
//function getTimestamp() {
    //return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
//}

//function frame() {
    //now = getTimestamp();
    //// cap time if requestAnimFrame is stalled (e.g., user switches tab)
    //dt = dt + Math.min(1, (now - last) / 1000);
    //while(dt > step) {
        //dt = dt - step;
        //update(step);
    //}
    //render(dt);
    //last = now;
    //requestAnimationFrame(frame);
//}


//var now,
    //dt = 0,
    //last = timestamp(),
    //step = 1/60;

//function update(dt){
    //console.log(">>>> update", dt);
//}

//function render(dt){
    //console.log(">>>> render", dt);
//}




define(
    [ 
        'd3', 'backbone', 'marionette', 'logger', 'events',
        'views/subviews/battle/AbilityList',
        'views/subviews/battle/Entity'
    ], function viewBattle(
        d3, backbone, marionette, logger, events,
        AbilityListView,
        EntityInfoView
    ){

    var BattleView = Backbone.Marionette.Layout.extend({
        template: '#template-game-battle',
        'className': 'game-battle-wrapper',

        events: {
            // UI User input
            'click .finish-instance': 'finishInstance'
        },

        regions: {
            'regionEntity': '#region-battle-entity-wrapper',
            'regionAbility': '#region-battle-ability-wrapper'
        },

        initialize: function battleViewInitialize(options){
            options = options || {};
            this.gameModel = options.gameModel;

            logger.log('views/subviews/Battle', 
                '1. initialize() called. Model: %O : Game Model: %O', 
                this.model, this.gameModel); 
            // keep track of the selected entity and the current target
            this.selectedEntityIndex = undefined;
            this.selectedEntity = undefined;
            this.previouslySelectedEntityIndex = undefined;

            // target should reset whenever entity changes
            //  should be able to select own entities with 1 - n keys,
            //      target with shift + n 
            //  if target is null when an ability is attempted to be used,
            //      user must select a target for the ability
            this.selectedTarget = undefined;

            // keep track of the currently selected / active ability, used 
            // when in ability mode
            this.selectedAbility = null;

            // --------------------------
            // Handle user input - shortcut keys
            // --------------------------
            // Pressing up or down will cycle through the entities
            this.listenTo(events, 'keyPress:up', this.handleKeyUpdateSelection);
            this.listenTo(events, 'keyPress:k', this.handleKeyUpdateSelection);
            this.listenTo(events, 'keyPress:down', this.handleKeyUpdateSelection);
            this.listenTo(events, 'keyPress:j', this.handleKeyUpdateSelection);

            this.listenTo(events, 'keyPress:escape', this.handleKeyEscape);

            // --------------------------
            // Handle ability usage
            // --------------------------
            this.listenTo(events, 'ability:activated', this.handleAbilityActivated);
        
            // handle state changes
            this.listenTo(this.model, 'change:state', this.stateChange);

            // DEV: TODO: REMOVE
            $('.state', this.$el).html(this.model.get('state'));
        },

        // ------------------------------
        // Model state change
        // ------------------------------
        stateChange: function(model,state){
            // Called when the model state changes
            logger.log('views/subviews/Battle', 
                '1. stateChange(): model state changed to: ' + state);

            // TODO: do stuff based on state change
            if(state === 'normal'){
                // From ability to normal
                
            } else if (state === 'ability'){
                // From ability to normal
            }

            // DEV: TODO: REMOVE
            $('.state', this.$el).html(state);
        },

        // ------------------------------
        // Ability use handler
        // ------------------------------
        handleAbilityActivated: function(options){
            // This function sets the model's state to either 'ability' or
            // 'normal' (by means of calling cancelTarget())
            //
            // When an ability is activated, switch to ability state
            //
            //  NOTE: Actual checking for ability effect usage is checked in
            //  useAbility.
            //
            // This function is an event handler which is called when
            // an ability is attempted to be used. There are multiple
            // things that can happen:
            //
            // 1. Previously was in a normal state, player uses ability for
            // the first time to activate an ability
            // 2. Player has an ability active already, but has NOT selected
            // a target. Player has tried to use the same ability
            // 3. Player has an ability active already, but has NOT selected
            // a target. Player has tried to use a different ability
            //
            var ability = options.ability;
            var useCallback = options.useCallback;
            
            //// If the same ability was attempted to be used, do nothing
            //var canBeUsed = Math.random() < 0.5 ? true : false;
            var canBeUsed = true;

            logger.log('views/subviews/Battle', 
                '1. handleAbilityActivated: %O : canBeUsed: %O', ability, canBeUsed);

            // Toggle ability on / off
            // --------------------------
            // if the same ability was used, 'toggle' it by setting canBeUsed
            // to false
            if(this.selectedAbility === options.ability){
                canBeUsed = false;
                ability = null;
            }

            // Remove existing target
            // --------------------------
            this.cancelTarget();

            // Use ability if it can be used
            // --------------------------
            if(canBeUsed){
                // The ability CAN be used

                // Set the selected ability
                this.selectedAbility = ability;

                // change the state to ability. Now, when the user clicks on
                // an entity, the ability will be used
                this.model.set({ state: 'ability' });

                // highlight the possible targets (whatever group)
                // TODO: Highlight group of possible targets based on ability
                // options.ability.get('validTargets') bla bla bla
            } 

            // call the useCallback
            if(useCallback){ useCallback(null, {canBeUsed: canBeUsed}); }

            return this;
        },

        // ------------------------------
        //
        // User input - Shortcut keys
        //
        // ------------------------------
        handleKeyUpdateSelection: function(options){
            // disable scrolling with up / down arrow key
            options.e.preventDefault();
            var key = options.key;

            // TODO: Handle different functions based on state
            var targetIndex = this.selectedEntityIndex;
            if(targetIndex === undefined){ targetIndex = -1; }

            // reverse up down - down key should go down the entity list
            if(key === 'up' || key === 'k'){ targetIndex -= 1; }
            else if (key === 'down' || key === 'j'){ targetIndex += 1; }

            var entities = this.model.get('playerEntities');
            if(this.model.get('state') === 'ability'){
                entities = this.model.get('enemyEntities');
            }
            var modelsLength = entities.models.length;

            // loop around if the end is reached
            if(targetIndex >= modelsLength){
                targetIndex = 0;
            } else if( targetIndex < 0) {
                targetIndex = modelsLength - 1;
            }
            logger.log('views/subviews/Battle', 
                '1. got key press : ' + key + 
                ' : Selecting entity: ' + targetIndex);

            // select the entity
            this.selectPlayerEntity(targetIndex);

            return this;
        },

        handleKeyEscape: function(options){
            // When escape is pressed, it should return to the
            // normal battle state
            options.e.preventDefault();
            var key = options.key;

            logger.log('views/subviews/Battle', '1. got key press : ' + key);

            this.cancelTarget();
            return this;
        },

        cancelTarget: function(){
            // return to default state
            logger.log('views/subviews/Battle', '1. cancelTarget, changing state');

            this.selectedAbility = null;
            events.trigger('ability:cancel');
            this.model.set({
                state: 'normal'
            });
            return this;
        },

        // ---------------------------------------------------------------------
        //
        // Render / Show
        //
        // ---------------------------------------------------------------------
        onShow: function battleOnShow(){
            // Render the scene
            var self = this;
            logger.log('views/subviews/Battle', '1. onShow() called');
            
            // Setup svg
            var svg = d3.select('#battle');
            var wrapper = svg.append('g');

            // entity props
            var entityHeight = 60;
            var entityWidth = entityHeight;

            // Setup scales for each entity
            // --------------------------
            // TODO: Is this the best way todo this?
            this.playerEntityTimeScales= [];
            _.each(this.model.get('playerEntities').models, function(model){
                self.playerEntityTimeScales.push(
                    d3.scale.linear()
                    .domain([ 0, model.get('timerLimit')])
                    .range([ 0, entityWidth ])
                );
            });


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
            // TODO: text effect that comes up from entity when damaged or healed
            logger.log('views/subviews/Battle', '4. setting up entities');
            var playerModels = this.model.get('playerEntities').models;

            // Setup the wrapper group. This is not ever directly manipulated
            this.playerEntityGroupsWrapper = playerEntities.selectAll('.entity-group')
                .data(playerModels)
                .enter().append('g')
                    .attr({ 
                        'class': 'entity-group-wrapper' ,
                        // transform the entire group to set the entity position
                        transform: function(d,i){
                            return "translate(" + [
                                20, 
                                20 + (i * (entityHeight + 20))
                            ] + ")";
                        }
                    });
    
            // setup the individual player groups. This group is transformed
            // left / right when a player selects an entity. All other entity
            // specific visuals are contained in this group
            this.playerEntityGroups = this.playerEntityGroupsWrapper.append('g')
                .attr({ 'class': 'entity-group' });

            // PLAYER SPRITE / image
            // --------------------------
            this.playerEntityEls = this.playerEntityGroups
                // TODO : Use sprites
                .append('rect')
                    .attr({
                        'class': 'player-entity entity',
                        height: entityHeight,
                        width: entityWidth
                    })
                    .on('click', function(d,i){ return self.selectPlayerEntity(i); })
                    .on('touchend', function(d,i){ return self.selectPlayerEntity(i); })
                    .on('mouseenter',function(d,i){ return self.entityHoverStart(i, 'player'); })
                    .on('mouseleave',function(d,i){ return self.entityHoverEnd(i, 'player'); });

            //timer bar group
            //===========================
            //  draw a group for each bar (frame + bar)
            var playerTimerGroups = this.playerEntityGroups
                .append('g').attr({ 'class': 'entity-timer' });

            // frame / border (TODO: Use image)
            playerTimerGroups.append('rect')
                .attr({
                    'class': 'timer-bar-border',
                    x: 0,
                    y: 0,
                    width: entityWidth,
                    height: 10
                });
    
            // actual timer bar that updates
            this.playerTimerBars = playerTimerGroups.append('rect')
                .attr({
                    'class': 'timer-bar',
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 10
                });

            // timer animation
            // --------------------------
            // start the timer bar animation for each entity
            _.each(this.playerTimerBars[0], function(bar, i){
                self.startTimerAnimation.call(self, {
                    index: i,
                    entityGroup: 'player'
                });
            });

            // ==========================
            //
            // draw enemies
            //
            // ==========================
            this.enemyEntitiesEls = enemyEntities.selectAll('.enemy-entity')
                .data(this.model.get('enemyEntities').models)
                .enter()
                    // TODO: draw sprites
                    .append('rect')
                        .attr({
                            'class': 'enemy-entity entity',
                            // TODO: get width dynamically
                            x: 800 - entityWidth - 200,
                            y: function(d,i){
                                return 20 + (i * (entityHeight + 20));
                            },
                            height: entityHeight,
                            width: entityWidth
                        })
                        .on('click', function(d,i){ return self.selectEnemyEntity(i); })
                        .on('touchend', function(d,i){ return self.selectEnemyEntity(i); })
                        .on('mouseenter',function(d,i){ return self.entityHoverStart(i, 'enemy'); })
                        .on('mouseleave',function(d,i){ return self.entityHoverEnd(i, 'enemy'); });

            // After everything is rendered, selected first entity
            this.selectPlayerEntity(0);

            return this;
        },

        // =====================================================================
        //
        // timer animation
        //
        // =====================================================================
        startTimerAnimation: function(options){
            // Starts (or restarts) the timer animation, transitioning the 
            // bar's width to width of the entity scale.
            //
            logger.log("views/subviews/Battle", 
                'startTimerAnimation: << started : %O', options);

            // check options
            options = options || {};
            if(options.value === undefined){ options.value = 0; }

            if(options.index === undefined ||
                !options.entityGroup){
                logger.error("views/subviews/Battle : startTimerAnimation : " +
                    'invalid parameters passed in: %O', options);
                return false;
            }

            // get bar from passed in index
            var bar = this.playerTimerBars[0][options.index];
            var d3sel = d3.select(bar);

            // get bar width from the entity scale
            var width = this.playerEntityTimeScales[
                options.index].range()[1];
            var models = this.model.get(options.entityGroup + 'Entities').models;

            //1. Reset bar width
            d3sel.transition()
                .ease('linear')
                .duration(0)
                .attr({ 
                    // starting bar width based on value
                    width: (d3sel.attr('width') - this[options.entityGroup + 'EntityTimeScales'][
                        options.index](options.value))
                }).each('end', function(){
                    // 2. After bar is reset, transition to specified width
                    //
                    // timerLimit is measured in 1/60 seconds, so convert
                    // to MS
                    var duration = ( (models[options.index].get('timerLimit') - 
                        options.value) / 60 ) * 1000;

                    // transition the bar width to the end of the range
                    // --------------------------
                    d3sel.transition()
                        .ease('linear')
                        .duration( duration )
                        .attr({ width: width });
                });

            return this;
        },

        // =====================================================================
        //
        // Select Entity
        //
        // =====================================================================
        selectPlayerEntity: function(i){
            // This triggers when an entity is selected - meaning, whenever
            // a user selects an entity to use an ability or see more info
            // about it. 
            // this context: this current Battle model
            // i: index of selected entity (matches with the order of
            // playerEntities.models)
            
            // STATE: normal
            if(this.model.get('state') === 'normal'){
                this.selectPlayerEntityStateNormal(i);

            } else if(this.model.get('state') === 'ability'){
                // call the general select entity function to set the ability's
                // target and use the ability
                var target = this.selectTarget(i, 
                    this.model.get('playerEntities').models);

                // then, use the ability
                // TODO: think of call structure
                this.useAbility({
                    target: target, 
                    index: i, 
                    entityGroup: 'player'
                });
            }

            return this;
        },

        // select Enemy entity
        selectEnemyEntity: function(i){
            if(this.model.get('state') === 'normal'){
                // TODO: show more info on enemy?
            } else if(this.model.get('state') === 'ability'){
                // call the general select entity function to set the ability's
                // target and use the ability
                var target = this.selectTarget(i, 
                    this.model.get('enemyEntities').models);

                // then, use the ability
                this.useAbility({
                    target: target,
                    index: i, 
                    entityGroup: 'enemy'
                });
            }

            return this;
        },

        // ------------------------------
        //
        // Select entity by state 
        //
        // ------------------------------
        selectTarget: function(i, models){
            // Sets the target based on the selected index in the model
            logger.log("views/subviews/Battle", 
                '1. selectTarget : i: %O : model : %O', i, models[i]);
            var model = models[i];

            // TODO: update svg elements
            //
            //
            this.selectedTarget = model;

            return this.selectedTarget;
        },

        selectPlayerEntityStateNormal: function(i){
            // Select an entity at passed in index in the normal state
            // --------------------------
            // overview:
            //  -Get the entity model from the selection
            //  -Show the abilities for the entity
            //  -Show more info
            //  -Move the entity forward
            //
            // if the user selected the currently active entity, do nothing
            if(i === this.previouslySelectedEntityIndex){ 
                logger.log("views/subviews/Battle", 
                    '0. entity selected: same entity selected, exiting');
                return false; 
            } 

            //1. get model based on selected element
            var model = this.model.get('playerEntities').models[i];
            logger.log("views/subviews/Battle", 
                "1. entity selected: %O \n model: %O", i, model);

            // update the selected entity
            this.selectedEntityIndex = i;
            this.selectedEntity = model;

            // show abilities
            logger.log("views/subviews/Battle", "2. showing ability view");
            var abilityView = new AbilityListView({
                collection: model.get('abilities')
            });
            this.regionAbility.show(abilityView);

            // show entity info
            logger.log("views/subviews/Battle", "3. showing entity info");
            var entityInfoView = new EntityInfoView({ model: model });
            this.regionEntity.show(entityInfoView);

            // move entity group forward
            logger.log("views/subviews/Battle", "4. moving entity");
            var d3selection = d3.select(this.playerEntityGroups[0][i]);
            d3selection
                .transition()
                .attr({ transform: 'translate(100)' });

            // move back previously selected entity
            if(this.previouslySelectedEntityIndex !== undefined){
                d3.select(this.playerEntityGroups[0][
                this.previouslySelectedEntityIndex])
                    .transition()
                    .attr({ transform: ''});
            }

            // update the previously selected entity
            this.previouslySelectedEntityIndex = i;

            return this;
        },

        entityHoverStart: function(i, entityGroup){
            //logger.log("views/subviews/Battle", 
                //"entity hover start: %O : %O", d,i);

            return this;
        },
        entityHoverEnd: function(i, entityGroup){
            //logger.log("views/subviews/Battle", 
                //"entity hover end: %O : %O", d,i);

            return this;
        },

        // ==============================
        //
        // Use ability
        //
        // ==============================
        useAbility: function(options){
            // TODO: think of call structure
            options = options || {};

            var target = options.target;
            var i = options.index;
            var entityGroup = options.entityGroup;

            // TODO: check if ability can be used
            // If the battle's timer is LESS than the castTime attribute, do 
            // nothing
            //
            //
            // Uses whatever the active ability is on the target
            logger.log("views/subviews/Battle", 
                "1. useAbility(): using ability: %O on %O",
                this.selectedAbility, 
                target);

            // reset the timer
            // TODO: different between entity index and enemy
            this.startTimerAnimation({
                index: this.selectedEntityIndex,
                value: this.selectedAbility.get('timeCost'),
                entityGroup: entityGroup
            });

            // TODO: use ability
            this.selectedAbility.get('effect')({
                target: target,
                source: this.selectedEntity
            });

            // Reset back to normal state
            this.cancelTarget();

            return this;
        },

        // ==============================
        //
        // User UI interaction
        //
        // ==============================
        finishInstance: function finishInstance(){
            events.trigger('node:instanceFinished');
        }

    });

    return BattleView;
});
