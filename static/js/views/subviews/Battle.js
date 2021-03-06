// ===========================================================================
//
// Battle Controller / View
//
//  TODO: Break up view and controller logic
//  TODO: Should transitions instead use the global game timer?
//  TODO: Clean up code
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
define(
    [ 
        'd3', 'backbone', 'marionette', 'logger', 'events',
        'views/subviews/battle/AbilityList',
        'views/subviews/battle/SelectedEntityInfo',
        'views/subviews/battle/IntendedTargetInfo'
    ], function viewBattle(
        d3, backbone, marionette, logger, events,
        AbilityListView,
        SelectedEntityInfoView,
        IntendedTargetInfoView
    ){

    // Utility functions
    function getTimestamp() {
        return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
    }

    // =======================================================================
    //
    // Battle view
    //
    // =======================================================================
    var BattleView = Backbone.Marionette.Layout.extend({
        template: '#template-game-battle',
        'className': 'game-battle-wrapper',

        events: {
            // UI User input
            'click .finish-instance': 'finishInstance',
            'click .btn-pause': 'togglePause'
        },

        regions: {
            'regionSelectedEntity': '#region-battle-selected-entity-wrapper',
            'regionIntendedTarget': '#region-battle-intended-target-wrapper',
            'regionAbility': '#region-battle-ability-wrapper'
        },

        initialize: function battleViewInitialize(options){
            var self = this;
            options = options || {};
            this.gameModel = options.gameModel;

            logger.log('views/subviews/Battle', 
                '1. initialize() called. Model: %O : Game Model: %O', 
                this.model, this.gameModel); 

            // keep track of the selected entity and the current target
            this.selectedEntityIndex = undefined;
            this.selectedEntityGroup = undefined;
            this.selectedEntity = undefined;
            this.previouslySelectedEntityIndex = undefined;

            // set references for entities
            this.playerEntityModels = this.model.get('playerEntities').models;

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

            _.each([1,2,3,4,6], function(key){
                self.listenTo(events, 'keyPress:' + key, self.handleKeyUpdateSelection);
                self.listenTo(events, 'keyPress:shift+' + key, self.handleKeyUpdateSelection);
            });

            // escape pressed
            this.listenTo(events, 'keyPress:escape', this.handleKeyEscape);
            // space pressed (pause)
            this.listenTo(events, 'keyPress:space', this.togglePause);

            // --------------------------
            // Handle ability usage
            // --------------------------
            this.listenTo(events, 'ability:activated', this.handleAbilityActivated);
        
            // handle state changes
            this.listenTo(this.model, 'change:state', this.stateChange);

            // Timer / Game loop 
            // --------------------------
            // Keep track of entity times
            //  TODO: keep track of time for each entity
            this.playerEntityTimers = [ ];
            _.each(this.playerEntityModels, function(model){
                self.playerEntityTimers.push(0);
            });
            
            // used to pause or cancel timer
            this.isTimerActive = false;
        },

        onBeforeClose: function close(){
            logger.log('views/subviews/Battle', 'onBeforeClose() called');
            this.isTimerActive = false;
            return this;
        },

        // ==============================
        //
        // Timer
        //
        // ==============================
        pauseTimer: function(){
            // pauses the timer by setting isTimerActive to false.
            // After this is called, runTimer() must be called to run the
            // timer again
            this.isTimerActive = false;
        }, 

        runTimer: function battleRunTimer(){
            // This is called to kicked off the game loop for the battle.
            // Store variables the battleFrame loop function will access
            //
            // Note: This is called as one of the last actions in the onShow()
            // method
            var self = this,
                
                timerNow = null,
                timerDt = 0,
                timerLast = getTimestamp(),

                fps = 60,
                timerStep = 1 / fps,

                slow = 1, // slow factor
                slowStep = slow * timerStep,

                timerRender = this.timerRender,
                timerUpdate = this.timerUpdate;

            // store some timer refs
            this.timerFps = fps;
            this.timerStep = timerStep;

            // when runTimer is called, set the timer to be active
            this.isTimerActive = true;

            function battleFrame(){
                // This function is called each frame. Call render() to keep
                // render state up to date, call update() on a fixed time
                //
                timerNow = getTimestamp();
                // cap time if requestAnimFrame is stalled (e.g., user switches tab)
                timerDt = timerDt + Math.min(
                    1, (timerNow - timerLast) / 1000);

                while(timerDt > timerStep) {
                    // Only call update when delta is greater than the timer step
                    // to maintain constant calls
                    timerDt = timerDt - timerStep;
                    timerUpdate.call(self, timerStep);
                }

                // always call render though, so we can draw things properly
                timerRender.call(self, timerDt);
                timerLast = timerNow;


                if(self.isTimerActive){
                    requestAnimationFrame(battleFrame);
                } else {
                    return false;
                }
            }

            this.start = new Date();
            requestAnimationFrame(battleFrame);
            return this;
        },

        timerRender: function battleTimerRender(dt){
            // if we wanted to update the battle scene
        },

        timerUpdate: function battleTimerUpdate(dt){
            // Fixed update function. Called to update the timer for each
            // entity. This only increments entity timers and triggers events
            // for ability usage
            var self = this;
            _.each(['player', 'enemy'], function(entityGroup){
                _.each(self[entityGroup + 'EntityTimers'], function(val,index){
                    // increase timer
                    if( val < self.model.attributes[entityGroup + 'Entities'].models[index].attributes.timerLimit){
                        // increase the timer by the timer step - e.g., if FPS is
                        // 60, each update tick is 1/60
                        self[entityGroup + 'EntityTimers'][index] += self.timerStep;
                    }
                });
            });
            self.$timerEl.html(this.playerEntityTimers.join(' | '));

            return this;
        },

        togglePause: function pause(options){
            // This pauses all timers and animations, effectively pausing
            // the battle. When the battle is paused, abilities cannot be
            // used. 
            //
            // Players may select an entity and mouse over to target entities
            //
            var self = this;

            options = options || {};
            if(options.e){
                options.e.preventDefault();
                options.e.stopPropagation();
            }

            // Already paused, UNPAUSE
            // ----------------------
            if(this.model.get('state') === 'pause'){
                this._unpause();
            } else {
                this._pause();
            }

            return false;
        },

        _pause: function _pause(){
            // PAUSE
            // ----------------------
            logger.log('views/subviews/Battle', 
                '1. togglePause(): PAUSING');

            // Show pause message
            d3.select('#battle .pause-blocker').classed('active', true);

            // cancel target and pause
            this.cancelTarget();

            // set state
            this.model.set({
                state: 'pause',
                previousState: this.model.get('previousState')
            });
            
            // pause animations
            d3.selectAll('#battle .timer-bar').transition().duration(0);

            // stop the timer
            this.pauseTimer();
            return this;
        },

        _unpause: function _unpause(){
            // Called to pause the game state and animations
            //
            var self = this;
            logger.log('views/subviews/Battle', 
                '1. togglePause(): UNPAUSING');

            // remove blocker
            d3.select('#battle .pause-blocker').classed('active', false);

            // set state
            this.model.set({
                state: 'normal'
            });

            // resumse all animations
            var e = d3.select("#time");
            var sel = d3.selectAll('#battle .timer-bar');

            // for each selection, update transition
            _.each(sel[0], function(el){
                $el = d3.select(el);
                var entityGroup = $el.attr('data-entityGroup');
                var index = $el.attr('data-index');
                var val = self[entityGroup + 'EntityTimers'][index];

                var duration = ( 
                    self.model.get(entityGroup + 'Entities').models[index].get('timerLimit') - val
                ) * 1000;

                $el.transition().ease('linear') 
                    .duration( duration )
                    .attr({
                        'data-duration': duration,
                        'data-time': 1,
                        'width': $el.attr('data-endWidth')
                    });
            });

            // reset timer
            this.runTimer();
            return this;
        },

        // ==============================
        //
        // Model state change
        //
        // ==============================
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
            // parameters: 
            //  options: {Object} with keys:
            //      ability: {Object} ability object
            //      //TODO: Rename to activateCallback or something
            //      useCallback: {Object} callback to call after using an 
            //      ability
            //
            // When an ability is activated:
            //  1. check if ability can be used (check entity timer with passed 
            //  entity)
            //  2. switch ability state
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

            logger.log('views/subviews/Battle', 
                '1. handleAbilityActivated: %O', ability);

            // Do nothing if game is paused
            if(this.model.get('state') === 'pause'){
                logger.log('views/subviews/Battle', '2. game paused, returning');
                return false;
            }
            
            var canBeUsed = false;

            // Check usage based on timer
            var entityTime = this.playerEntityTimers[this.selectedEntityIndex];
            if(entityTime >= ability.get('castTime')){
                logger.log('views/subviews/Battle', 
                    'handleAbilityActivated  : CAN be used');
                canBeUsed = true;
            } else {
                logger.log('views/subviews/Battle', 
                    'handleAbilityActivated  : CANNOT be used');
            }

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
            // This function selects an entity based on a keypress. 
            // j / k and up / down select next or previous entity the
            // player controls, as does the 1 - 4 keys

            // disable page scrolling with up / down arrow key
            options.e.preventDefault();
            var key = options.key;
            var entityGroup = 'player';

            // TODO: Handle different functions based on state
            var targetIndex = this.selectedEntityIndex;
            if(targetIndex === undefined){ targetIndex = -1; }

            // reverse up down - down key should go down the entity list
            if(key === 'up' || key === 'k'){ targetIndex -= 1; }
            else if (key === 'down' || key === 'j'){ targetIndex += 1; }

            // if the user is trying to select an enemy 
            // (note: must be in ability mode)
            else if(key.match(/^shift\+[0-9]/)){ 
                if(this.model.get('state') === 'ability'){
                    targetIndex = +(key.replace('shift+', '')) - 1;
                    entityGroup = 'enemy';
                } else { return false; }
            }

            // If the keys are number keys, select the specific entity for the
            // player
            else if(key.match(/1|2|3|4/)){
                targetIndex = +key - 1;
            } 

            logger.log('views/subviews/Battle', 
                '1. got key press : ' + key + 
                ' : entityGroup: ' + entityGroup +
                ' : Selecting entity: ' + targetIndex);

            var entities, modelsLength;
            if(entityGroup === 'player'){
                entities = this.model.get('playerEntities');
                modelsLength = entities.models.length;
                // loop around if the end is reached
                if(targetIndex >= modelsLength){
                    targetIndex = 0;
                } else if( targetIndex < 0) {
                    targetIndex = modelsLength - 1;
                }
            } else if (entityGroup === 'enemy'){
                // If the player tries to select an entity outside of range
                //  e.g., selects entity 4 but there's only 3 entities, then
                //  select the last entity
                entities = this.model.get('enemyEntities');
                modelsLength = entities.models.length;
                if(targetIndex >= modelsLength){
                    targetIndex = modelsLength-1;
                }
            }

            // select the entity
            this.selectEntity({
                entityGroup: entityGroup,
                index: targetIndex
            });

            return this;
        },

        handleKeyEscape: function(options){
            // When escape is pressed, it should return to the
            // normal battle state
            options.e.preventDefault();

            var key = options.key;
            logger.log('views/subviews/Battle', '1. got key press : ' + key);

            //If in pause, switch back
            if(this.model.get('state') === 'pause'){
                return this.togglePause();
            }

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

        // =====================================================================
        //
        // Render / Show
        //
        // =====================================================================
        onShow: function battleOnShow(){
            // Render the scene
            var self = this;
            // TODO: remove timer el for dev
            this.$timerEl = $('.timer', this.$el);

            logger.log('views/subviews/Battle', '1. onShow() called');
            
            // Setup svg
            var svg = d3.select('#battle');
            var wrapper = svg.append('g');

            // entity props
            var entityHeight = 60;
            var entityWidth = entityHeight;

            // update models
            // --------------------------
            this.playerEntityModels = this.model.get('playerEntities').models;


            // Setup timer and time scales for each group
            // --------------------------
            _.each(['player', 'enemy'], function(entityGroup){
                // TODO: don't repeat enemy / player(?) Use a single collection(?)
                self[entityGroup + 'EntityTimers'] = [];
                self[entityGroup + 'EntityTimeScales'] = [];
                var models = self.model.get(entityGroup + 'Entities').models;

                _.each(models, function(model){
                    // setup timer for each entity
                    self[entityGroup + 'EntityTimers'].push(0);

                    // Setup scales for each entity
                    // --------------------------
                    // the scale is used to calculate the width of the timer bar
                    // the domain units is in seconds
                    self[entityGroup + 'EntityTimeScales'].push(
                        d3.scale.linear()
                            .domain([ 0, model.get('timerLimit')])
                            .range([ 0, entityWidth ])
                    );
                });
            });

            // --------------------------
            // setup groups
            // --------------------------
            logger.log('views/subviews/Battle', '2. setting up groups');
            var background = wrapper.append('g')
                .attr({ 'class': 'background' });

            // add pause block
            wrapper.append('rect')
                .attr({ 'class': 'pause-blocker', x: 0, y: 0, width: '100%', height: '100%' })
                .style({ fill: 'none' });

            var entityGroups = {
                player: wrapper.append('g')
                    .attr({ 'class': 'playerEntities' }),
                enemy: wrapper.append('g')
                    .attr({ 'class': 'enemyEntities' })
            };

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

            logger.log('views/subviews/Battle', '4. setting up entities');
            // ==========================
            //
            // Draw Player entities
            //
            // --------------------------
            // TODO: use sprites
            // TODO: text effect that comes up from entity when damaged or healed

            // TODO: Clean up code
            //
            function drawEntities(entityGroup){
                // This function is called to draw entities for a passed in
                // entity group {String} ( either 'player' or 'enemy')
                // The main difference between the two functions is the 
                // placement and model setup of the entities in each group

                // if enemy entities, place near edge of map
                // TODO: get map width
                var entityGroupX = (entityGroup === 'player' ? 20 : 400);

                // Setup the wrapper group. This is not ever directly manipulated
                var groupsWrapper = self[entityGroup + 'EntityGroupsWrapper'] = entityGroups[
                    entityGroup].selectAll('.entity-group')
                        .data(self.model.get(entityGroup + 'Entities').models)
                        .enter().append('g')
                            .attr({ 
                                'class': 'entity-group-wrapper ' + entityGroup,
                                // transform the entire group to set the entity position
                                transform: function(d,i){
                                    return "translate(" + [
                                        entityGroupX, 
                                        20 + (i * (entityHeight + 20))
                                    ] + ")";
                                }
                            });
        
                // setup the individual player groups. This group is transformed
                // left / right when a player selects an entity. All other entity
                // specific visuals are contained in this group
                var groups = self[entityGroup + 'EntityGroups'] = groupsWrapper.append('g')
                    .attr({ 'class': 'entity-group ' + entityGroup });

                // PLAYER SPRITE / image
                // --------------------------
                // TODO : Use sprites
                groups.append('rect')
                    .attr({
                        'class': entityGroup + '-entity entity',
                        height: entityHeight,
                        width: entityWidth
                    })
                    .on('click', function(d,i){ 
                        return self.selectEntity({index: i, entityGroup: entityGroup});
                    })
                    .on('touchend', function(d,i){ 
                        return self.selectEntity({index: i, entityGroup: entityGroup});
                    })
                    .on('mouseenter',function(d,i){ 
                        return self.entityHoverStart({index: i, entityGroup: entityGroup});
                    })
                    .on('mouseleave',function(d,i){ 
                        return self.entityHoverEnd({index:i, entityGroup: entityGroup});
                    });

                //timer bar group
                //===========================
                //  draw a group for each bar (frame + bar)
                var timerGroup = groups
                    .append('g').attr({ 'class': 'entity-timer ' + entityGroup });

                // frame / border (TODO: Use image)
                timerGroup.append('rect')
                    .attr({
                        'class': 'timer-bar-border',
                        x: 0,
                        y: 0,
                        width: entityWidth,
                        height: 10
                    });
        
                // actual timer bar that updates
                self[entityGroup + 'TimerBars'] = timerGroup.append('rect')
                    .attr({
                        'class': 'timer-bar ' + entityGroup,
                        x: 0,
                        y: 0,
                        width: 0,
                        height: 10
                    }); 

                return this;
            }

            // ==========================
            //
            // draw enemies
            //
            // ==========================
            drawEntities('player');
            drawEntities('enemy');

            // ==========================
            //
            // Game Loop 
            //
            // ==========================
            // Kick off the timer
            this.runTimer();

            // start the timer bar animation for each entity
            _.each(['player', 'enemy'], function(entityGroup){
                var bars = self[entityGroup + 'TimerBars'][0];

                _.each(bars, function(bar, i){
                    self.startTimerAnimation.call(self, {
                        index: i,
                        entityGroup: entityGroup
                    });
                });
            });

            // After everything is rendered, selected first entity
            this.selectPlayerEntity({index:0});

            return this;
        },

        // =====================================================================
        //
        // timer animation
        //
        // =====================================================================
        startTimerAnimation: function(options){
            // Starts (or restarts) the timer animation, transitioning the 
            // bar's width to width of the entity scale. This happens to
            // all timer bars on a per entity level
            //
            // Options: {Object}
            //  value: {Number} Value to start the count at (must be calculated 
            //      by caller based on the ability value and value left in timer
            //  index: {Number} index of entity
            //  entityGroup: {String} 'player' or 'enemy'
            //
            logger.log("views/subviews/Battle", 
                'startTimerAnimation: << started : %O', options);

            // check options
            options = options || {};
            if(options.value === undefined){ options.value = 0; }

            var entityGroup = options.entityGroup;

            if(options.index === undefined ||
                !options.entityGroup){
                logger.error("views/subviews/Battle : startTimerAnimation : " +
                    'invalid parameters passed in: %O', options);
                return false;
            }

            // get bar from passed in index
            var bar = this[entityGroup + 'TimerBars'][0][options.index];
            var d3sel = d3.select(bar);
            var models = this.model.get(options.entityGroup + 'Entities').models;

            // get widths
            // --------------------------
            var startWidth = this[options.entityGroup + 'EntityTimeScales'][options.index](options.value);
            startWidth = startWidth >= 0 ? startWidth: 0;

            // get bar width from the entity scale
            var endWidth = this[entityGroup + 'EntityTimeScales'][
                options.index].range()[1];
            endWidth = endWidth >= 0 ? endWidth : 0;

            //1. Reset bar width
            d3sel.transition()
                .ease('linear')
                .duration(0)
                .attr({ 
                    // starting bar width based on value
                    width: startWidth,
                    'data-time': 0,
                    'data-index': options.index,
                    'data-entityGroup': entityGroup
                }).each('end', function(){
                    // 2. After bar is reset, transition to specified width
                    var duration = ( 
                        models[options.index].get('timerLimit') - options.value
                    ) * 1000;

                    // keep track of duration and end width for pausing
                    // we multiply data-time by data-duration to get the
                    // time left
                    d3sel.attr({ 
                        'data-duration': duration,
                        'data-endWidth': endWidth 
                    });

                    // transition the bar width to the end of the range
                    // --------------------------
                    d3sel.transition()
                        .ease('linear')
                        .duration( duration )
                        .attr({ 
                            width: endWidth,
                            'data-time': 1
                        });
                });

            return this;
        },

        // =====================================================================
        //
        // Select Entity
        //
        // =====================================================================
        selectEntity: function(options){
            // This is a proxy function that will call the corresponding select
            // entity type function based on the passed in entityGroup
            options = options || {};

            if(options.entityGroup === 'player'){
                // Select player enemy
                return this.selectPlayerEntity(options);
            } else if(options.entityGroup === 'enemy'){
                // Select enemy entity
                return this.selectEnemyEntity(options);
            }
        },

        selectPlayerEntity: function(options){
            // This triggers when an entity is selected - meaning, whenever
            // a user selects an entity to use an ability or see more info
            // about it. 
            //
            // index: index of selected entity (matches with the order of
            //  playerEntities.models)
            options = options || {};
            var i = options.index;
            
            // STATE: normal
            var state = this.model.get('state');
            if(state === 'normal' || state === 'pause'){
                this.selectPlayerEntityStateNormal({index: options.index});

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
        selectEnemyEntity: function(options){
            options = options || {};
            var i = options.index;
            
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
                    targetIndex: i, 
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

        selectPlayerEntityStateNormal: function(options){
            // Select an entity at passed in index in the normal state
            // --------------------------
            // overview:
            //  -Get the entity model from the selection
            //  -Show the abilities for the entity
            //  -Show more info
            //  -Move the entity forward
            //
            options = options || {};
            var i = options.index;

            // if the user selected the currently active entity, do nothing
            if(i === this.previouslySelectedEntityIndex){ 
                logger.log("views/subviews/Battle", 
                    '0. entity selected: same entity selected, exiting : i : %O', i);
                return false; 
            } 

            //1. get model based on selected element
            var model = this.model.get('playerEntities').models[i];
            logger.log("views/subviews/Battle", 
                "1. entity selected: %O \n model: %O", i, model);

            // update the selected entity
            this.selectedEntityIndex = i;
            this.selectedEntityGroup = 'player';
            this.selectedEntity = model;

            // show abilities
            logger.log("views/subviews/Battle", "2. showing ability view");
            var abilityView = new AbilityListView({
                collection: model.get('abilities')
            });
            this.regionAbility.show(abilityView);

            // show entity info
            logger.log("views/subviews/Battle", "3. showing entity info");
            var entityInfoView = new SelectedEntityInfoView({ model: model });
            this.regionSelectedEntity.show(entityInfoView);

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

        entityHoverStart: function(options){
            //logger.log("views/subviews/Battle", "entity hover start: %O : %O", d,i);
            this.setIntendedTarget(options);

            return this;
        },
        entityHoverEnd: function(options){
            //logger.log("views/subviews/Battle", "entity hover end: %O : %O", d,i);
            this.clearIntendedTarget();

            return this;
        },

        // ------------------------------
        //
        // Hover - Intended Target states
        //
        // ------------------------------
        setIntendedTarget: function setIntendedTarget(options){
            logger.log("views/subviews/Battle", 
                "1. setIntendedTarget : options: %O", options);
            var model = this.model.get(options.entityGroup + 'Entities')
                .models[options.index];

            var infoView = new IntendedTargetInfoView({ model: model });
            this.regionIntendedTarget.show(infoView);

            return this;
        },

        clearIntendedTarget: function(){
            this.regionIntendedTarget.close();
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
            var targetIndex = options.targetIndex;
            var entityGroup = options.entityGroup;

            // Uses whatever the active ability is on the target
            logger.log("views/subviews/Battle", 
                "1. useAbility(): using ability: %O on %O",
                this.selectedAbility, 
                target);

            // TODO : use selected entity index for enemies
            var entityTime = this[entityGroup + 'EntityTimers'][this.selectedEntityIndex];

            // If the intended target is not in the ability's usable target 
            // group, cannot use the ability
            var validTarget = this.selectedAbility.get('validTargets');
            if(validTarget !== entityGroup && validTarget.indexOf(entityGroup) === -1){
                // Cannot use because the entity group of the intended target 
                // is not valid
                logger.log("views/subviews/Battle", 
                    "2. useAbility(): CANNOT use, invalid target");
                // don't cancel out the target, just let anyone listening know
                // the target is invalid
                events.trigger('battle:useAbility:invalidTarget');
                return false; 
            }

            // TODO: check if ability can be used
            // --------------------------
            // If the battle's timer is LESS than the castTime attribute, do 
            // nothing
            if(entityTime < this.selectedAbility.get('castTime')){
               // can NOT use
               // TODO: visual effect
                logger.log("views/subviews/Battle", 
                    "2. CANNNOT use ability! Time: %O / %O", entityTime, 
                    this.selectedAbility.get('castTime'));

            } else {
                logger.log("views/subviews/Battle", 
                    "2. USING ability! Time: %O / %O", entityTime, 
                    this.selectedAbility.get('castTime'));

                // update the timer
                // --------------------------
                this.playerEntityTimers[this.selectedEntityIndex] -= 
                    this.selectedAbility.get('timeCost');

                // reset animation
                // --------------------------
                this.startTimerAnimation({
                    index: this.selectedEntityIndex,
                    value: entityTime - this.selectedAbility.get('timeCost'),
                    entityGroup: this.selectedEntityGroup
                });

                // use ability
                // --------------------------
                // get effect function and call it
                this.selectedAbility.get('effect')({
                    target: target,
                    source: this.selectedEntity
                });

                // Reset back to normal state
                this.cancelTarget();
            }

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
