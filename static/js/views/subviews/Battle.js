// ===========================================================================
//
// Battle Controller / View
//
//  TODO: Break up view and controller logic
//  TODO: Should transitions instead use the global game timer?
//  TODO: Clean up code
//  TODO: PAUSE FUNCTIONALITY
//      -Should be able to select an ability when not in pause mode,
//      pause, unpause, then use it (cannot now)
//      -Should be able to select an ability in pause mode
//      -Abilities should have a way to trigger remember action and trigger
//      afterwards (BIG)
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
// Win condition:
//      When all enemy entities are dead. 
//      Anytime an entity dies, the entity:died event is triggered. When all
//      entities in a group die, the 'entityGroup:defeated' event is triggered
//      (from the entity group collection), passing in the group
//
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
            // Ability use callback
            // --------------------------
            // TODO: Better way to handle this? Have in own controller
            this.listenTo(events, 'useAbility', this.useAbility);

            // --------------------------
            // Handle user input - shortcut keys
            // --------------------------
            // Pressing up or down will cycle through the entities
            this.listenTo(events, 'keyPress:up', this.handleKeyUpdateSelection);
            this.listenTo(events, 'keyPress:k', this.handleKeyUpdateSelection);
            this.listenTo(events, 'keyPress:down', this.handleKeyUpdateSelection);
            this.listenTo(events, 'keyPress:j', this.handleKeyUpdateSelection);

            // do something on left / right key ?
            // TODO: this?
            this.listenTo(events, 'keyPress:left', function(options){
                options.e.preventDefault();
            });
            this.listenTo(events, 'keyPress:right', function(options){
                options.e.preventDefault();
            });

            _.each([1,2,3,4,6], function eachKey(key){
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
            // used to pause or cancel timer
            this.isTimerActive = false;

            // NOTE: death listeners are setup in onShow
            
            return this;
        },

        onBeforeClose: function close(){
            logger.log('views/subviews/Battle', 'onBeforeClose() called');
            this.isTimerActive = false;
            return this;
        },

        // ------------------------------
        // Death related
        // ------------------------------
        enemyGroupDied: function enemyGroupDied(options){
            // When the entire enemy group has died, you win

            // stop timer
            this.isTimerActive = false;

            console.log(">>>>>>>>>>>>>>>> entity group died ", options);
            alert("so win.");
            return this;
        },
        playerGroupDied: function playerGroupDied(options){
            // When the entire enemy group has died, you win

            // stop timer
            this.isTimerActive = false;

            console.log(">>>>>>>>>>>>>>>> entity group died ", options);
            alert("so lose.");
            return this;
        },

        setupDeathListeners: function battleSetupDeathListeners(){
            // Note: This is called in onShow, after all entities are ready
            //
            // This sets up death listeners for each entity, along with
            // the entire group defeat listener
            var self = this;

            _.each(['player', 'enemy'], function eachModelSetup(group){
                // For each model, listen for an individual death
                var collection = self.model.get(group + 'Entities');
                
                _.each(collection.models, function(model){
                    self.listenTo( model, 'entity:died', self.entityDied);
                });

                // For the entire collection, listen when the group is defeated
                // (this is either a win or lose state)
                self.listenTo(
                    collection,
                    'entityGroup:defeated', 
                    self[group + 'GroupDied']);
            });
        },

        // ==============================
        //
        // Timer
        //
        // ==============================
        pauseTimer: function pauseTimer(){
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

        // TIMER UPDATE
        // ------------------------------
        timerUpdate: function battleTimerUpdate(dt){
            // Update each entity's timer. This is the main update function
            // TODO: do DoT effects? other time based effects?
            //
            // Fixed update function. Called to update the timer for each
            // entity. This only increments entity timers and triggers events
            // for ability usage
            //
            var self = this;

            // 1. Update timers
            _.each(['player', 'enemy'], function timerEachGroup(entityGroup){
                var models = self.model.attributes[entityGroup + 'Entities'].models;

                // For each model in each group, increase the timer
                _.each(self[entityGroup + 'EntityTimers'], function timerEachEntityTimer(val,index){
                    var model = models[index];

                    if(!model.attributes.isAlive){
                        // DEAD
                        // --------------
                        // if entity is dead, do nothing
                        self[entityGroup + 'EntityTimers'][index] = 0;

                    } else {
                        // ALIVE
                        // --------------
                        // increase timer
                        if( val < model.attributes.timerLimit){
                            // increase the timer by the timer step - e.g., if FPS is
                            // 60, each update tick is 1/60
                            self[entityGroup + 'EntityTimers'][index] += self.timerStep;
                        }
                        if ( val < 0){
                            self[entityGroup + 'EntityTimers'][index] = 0;
                        }

                        if(entityGroup === 'player'){
                            // PLAYER 
                            // ----------
                            // check abilities use timers for UI
                            // - Selected Entity - UI
                            if(model === self.selectedEntity){
                                // on the selected ability list view, call checkTimer
                                // which will update the ability list item ui
                                self.currentAbilityListView.checkTimer(
                                    self[entityGroup + 'EntityTimers'][index]);
                            }

                            // If auto attack is enabled, let AI decide behavior
                        } else {
                            // ENEMY
                            // ----------
                            // AI for enemy
                            // TODO: don't do the battle AI logic in the model
                            // Pass in the current time
                            model.handleAI(
                                // time
                                self[entityGroup + 'EntityTimers'][index],
                                // battle model
                                self.model
                            );
                        }

                    }
                });
            });


            // 3. Update info views
            this.$selectedEntityInfoTimer.html(
                this.playerEntityTimers[this.selectedEntityIndex]
            );

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
            _.each(sel[0], function unpauseEachSelection(el){
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
        stateChange: function stateChange(model,state){
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
        handleAbilityActivated: function handleAbilityActivated(options){
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
        handleKeyUpdateSelection: function handleKeyUpdateSelection(options){
            // This function selects an entity based on a keypress. 
            // j / k and up / down select next or previous entity the
            // player controls, as does the 1 - 4 keys
            //
            // To select an enemy : use keys 1 - n
            // To select a player entity : use keys shift + 1 - n

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
            else if(key.match(/^shift\+[0-9]+/)){ 
                // If the keys are number keys, select the specific entity 
                // for the player
                targetIndex = +(key.replace('shift+', '')) - 1;
            }
            else if(key.match(/[0-9]+/)){
                // if the user is trying to select an enemy 
                // (note: must be in ability mode)
                if(this.model.get('state') === 'ability'){
                    targetIndex = +key - 1;
                    entityGroup = 'enemy';
                } else { 
                    // when the user is not in ability mode, do nothing when
                    // 1 - n key is pressed
                    return false;
                }
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

        handleKeyEscape: function handleKeyEscape(options){
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

        cancelTarget: function cancelTarget(){
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
            this.entityHeight = entityHeight;
            this.entityWidth = entityWidth;

            // update models
            // --------------------------
            this.playerEntityModels = this.model.get('playerEntities').models;

            // --------------------------
            // Handle entity death
            // --------------------------
            this.setupDeathListeners();

            // Setup timer and time scales for each group
            // --------------------------
            _.each(['player', 'enemy'], function setupTimers(entityGroup){
                // TODO: don't repeat enemy / player(?) Use a single collection(?)
                self[entityGroup + 'EntityTimers'] = [];
                self[entityGroup + 'EntityTimeScales'] = [];
                var models = self.model.get(entityGroup + 'Entities').models;

                _.each(models, function timerEachModel(model){
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
            // ==========================
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
                                transform: function groupsWrapperTransform(d,i){
                                    return "translate(" + [
                                        entityGroupX, 
                                        40 + (i * (entityHeight + entityHeight ))
                                    ] + ")";
                                }
                            })
                            .on('click', function entityClicked(d,i){ 
                                return self.selectEntity({index: i, entityGroup: entityGroup});
                            })
                            .on('touchend', function entityTouchEnd(d,i){ 
                                return self.selectEntity({index: i, entityGroup: entityGroup});
                            })
                            .on('mouseenter',function entityMouseEnter(d,i){ 
                                return self.entityHoverStart({index: i, entityGroup: entityGroup});
                            })
                            .on('mouseleave',function entityMouseLeave(d,i){ 
                                return self.entityHoverEnd({index:i, entityGroup: entityGroup});
                            });

                // Append an invisible rect for interaction
                //  this is a large rect behind the sprites that allows the user
                //  to click / tap it
                groupsWrapper.append('rect')
                    .attr({
                        opacity: 0,
                        x: -entityWidth, y: -15,
                        width: entityWidth + 150,
                        height: entityHeight + 25
                    });
        
                // setup the individual player groups. This group is transformed
                // left / right when a player selects an entity. All other entity
                // specific visuals are contained in this group
                var groups = self[entityGroup + 'EntityGroups'] = groupsWrapper.append('g')
                    .attr({ 'class': 'entity-group ' + entityGroup });

                // --------------------------
                // PLAYER SPRITE / image
                // --------------------------
                // TODO : figure out better way to handle sprites
                self[entityGroup + 'EntitySprites'] = groups.append('image')
                    .attr({
                        'class': entityGroup + '-entity entity',
                        'transform': function(d,i){
                            var transform = '';
                            if(entityGroup === 'enemy'){
                                transform = 'translate(' + [
                                    entityWidth, 0
                                ] + ') scale(-1 1)';
                            }
                            return transform;
                        },
                        'xlink:href': function(d, i){
                            return "/static/img/characters/" + 
                                d.attributes.sprite + '.gif';
                        }, 
                        height: entityHeight,
                        width: entityWidth
                    })

                // ----------------------
                // Health Bars
                // ----------------------
                // Draw bars
                var healthGroups = groups.append('g')
                    .attr({ 'class': 'battle-entity-health ' + entityGroup });

                var healthBarHeight = 10;
                // frame / border (TODO: Use image)
                healthGroups.append('rect')
                    .attr({
                        'class': 'health-bar-border ' + entityGroup,
                        x: 0,
                        y: entityHeight + 5,
                        width: entityWidth,
                        height: healthBarHeight
                    });
        
                // actual health bar that updates
                healthGroups.append('rect')
                    .attr({
                        'class': 'health-bar ' + entityGroup,
                        x: 0,
                        y: entityHeight + 5,
                        height: healthBarHeight,
                        width: function healthSetWidth(d, i){
                            var model = self.model.get(
                                entityGroup + 'Entities').models[i];
                            var maxHealth = model.get('attributes')
                                .get('maxHealth');
                            var health = model.get('attributes').get('health');
                            var d3this = d3.select(this);

                            var healthScale = d3.scale.linear()
                                .domain([0, maxHealth])
                                .range([0, entityWidth])
                                .clamp(true);
                    
                            // when health changes, update width of health bar
                            self.listenTo(model.get('attributes'), 
                                'change:health',
                                function updateHealth(returnedModel, health){
                                    // called when health updates
                                    // NOTE: if the entity is dead, don't
                                    // update the bar
                                    if(model.get('isAlive')){
                                        d3this.transition().attr({
                                            width: healthScale(health)
                                        });
                                    } else {
                                        // entity is dead, make sure health
                                        // is at 0 and cancel existing transitions
                                        d3this.transition().duration(0).attr({
                                            width: healthScale(0)
                                        });
                                    }
                            });

                            // set current width based on model health
                            return healthScale(health);
                        }
                    }); 

                // ----------------------
                // timer bar group
                // ----------------------
                //  draw a group for each bar (frame + bar)
                var timerGroup = groups
                    .append('g').attr({ 
                        'class': 'entity-timer ' + entityGroup,
                        'transform': 'translate(0, -10)'
                    });

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

                // ----------------------
                // Damage Text animation
                // ----------------------
                // There can be multiple text elements at once, anytime health
                // changes create a floating text element for it
                self[entityGroup + 'EntityDamageTextGroups'] = groups.append('g');

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
            _.each(['player', 'enemy'], function startTimers(entityGroup){
                var bars = self[entityGroup + 'TimerBars'][0];

                _.each(bars, function eachTimerBar(bar, i){
                    self.startTimerAnimation.call(self, {
                        index: i,
                        entityGroup: entityGroup
                    });
                });
            });

            // After everything is rendered, select first living entity
            var firstAliveEntity = 0;
            var i = 0;
            var models = this.model.get('playerEntities').models;
            while(i < models.length){
                if(models[i].get('isAlive')){ 
                    firstAliveEntity = i;
                    break;
                }
                i++;
            }
            logger.log("views/subviews/Battle", 
                "selected first living entity: index: " + i);

            // select first living player
            this.selectPlayerEntity({index:firstAliveEntity});


            // --------------------------
            // show damage text whenever entitiy's health changes
            // --------------------------
            _.each(['player', 'enemy'], function healthGroup(entityGroup){
                var models = self.model.get(entityGroup + 'Entities').models;
                _.each(models, function setupHealthCallback(model, index){
                    self.listenTo(
                        model.get('attributes'), 
                        'change:health', 
                        // model changes get passed in the model and the
                        // changed attribute value
                        function callShowText(model, health){
                            return self.showTextEffectOnHealthChange.call(
                                self, {
                                    model: model,
                                    health: health,
                                    index: index,
                                    entityGroup: entityGroup
                                }
                            );
                        });
                });
            });
            window.z = this;

            return this;
        },

        showTextEffectOnHealthChange: function showTextEffect(options){
            // This is called whenever any entity's health is changed.
            // The text will be styled based on the difference
            options = options || {};
            logger.log("views/subviews/Battle", 
                "1. showTextEffectOnHealthChange() : options: %O",
                options); 
            var self = this;
            var model = options.model;
            var index = options.index;
            var entityGroup = options.entityGroup;
            var difference = options.health - model._previousAttributes.health;

            // This is called whenever any entity's health is modified
            var $damageText = d3.select(
                self[entityGroup + 'EntityDamageTextGroups'][0][index]
            ).append('text')
                .attr({
                    'class': 'entity-group-text ' + entityGroup,
                    // position it based on positive / negative health change
                    x: difference < 0 ? -25 : 25
                });

            // first, start text at bottom of entity and set text
            //  will have either 'positive damage' or 'negative damage' classes
            $damageText.classed((difference < 0 ? 'negative' : 'positive') + ' damage', true);

            $damageText
                .attr({ 
                    y: self.entityHeight - 10, 
                    opacity: 0.2 
                })
                .text((difference < 0 ? '' : '+') + difference);

            // then, fade in text and float it up
            $damageText.transition()
                .duration(200)
                .attr({ 
                    y: -10,
                    opacity: 1 
                })
                .each('end', function(){
                    // when that's done, fade it out
                    $damageText.transition().delay(300)
                        .duration(300)
                        .attr({  opacity: 0 });
                });
        },

        // =====================================================================
        //
        // timer animation
        //
        // =====================================================================
        startTimerAnimation: function startTimerAnimation(options){
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
                '1. startTimerAnimation: << started : %O', options);

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
            var targetModel = models[options.index];

            if(!targetModel.get('isAlive')){ 
                logger.log("views/subviews/Battle", 
                    "2. target model is not alive, not starting animation");
                return false;
            }

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
                }).each('end', function startTimerAnimationTransitionEnd(){
                    // 2. After bar is reset, transition to specified width
                    var duration = ( 
                        targetModel.get('timerLimit') - options.value
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
        selectEntity: function selectEntity(options){
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

        selectPlayerEntity: function selectPlayerEntity(options){
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
                    targetIndex: i, 
                    entityGroup: 'player'
                });
            }

            return this;
        },

        // select Enemy entity
        selectEnemyEntity: function selectEnemyEntity(options){
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
        selectTarget: function selectTarget(i, models){
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

        selectPlayerEntityStateNormal: function selectPlayerStateNormal(options){
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

            // show abilities for this entity. Create new AbilityList view
            // --------------------------
            logger.log("views/subviews/Battle", "2. showing ability view");
            var abilityListView = new AbilityListView({
                collection: model.get('abilities'),
                entityModel: model
            });
            // store ref to ability list view so we can show active abilities
            this.currentAbilityListView = abilityListView;
            this.regionAbility.show(abilityListView);

            // show entity info
            logger.log("views/subviews/Battle", "3. showing entity info");
            var entityInfoView = new SelectedEntityInfoView({ model: model });
            this.regionSelectedEntity.show(entityInfoView);
            
            // update info view el for timer updates
            this.$selectedEntityInfoTimer = $('.timer', entityInfoView.$el);

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

        entityHoverStart: function entityHoverStart(options){
            //logger.log("views/subviews/Battle", "entity hover start: %O : %O", d,i);
            this.setIntendedTarget(options);

            return this;
        },
        entityHoverEnd: function entityHoverEnd(options){
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
            // Sets the intended target. The intended target specifies which
            // entity the spell could be cast on. 
            // Options: 
            //      entityGroup: {string} 'player' or 'enemy'
            //      index: {number} index of entity in entity group
            //
            this.intendedTarget = {
                index: options.index,
                entityGroup: options.entityGroup
            };

            logger.log("views/subviews/Battle", 
                "1. setIntendedTarget : options: %O", options);

            var model = this.model.get(options.entityGroup + 'Entities')
                .models[options.index];
            var infoView = new IntendedTargetInfoView({ model: model });
            this.regionIntendedTarget.show(infoView);

            return this;
        },

        clearIntendedTarget: function clearIntendedTarget(){
            // Clears out the intended target info window
            logger.log("views/subviews/Battle", 
                "1. clearIntendedTarget : previous target: %O", 
                this.intendedTarget);

            this.regionIntendedTarget.close();
            this.intendedTarget = null;

            return this;
        },

        // ==============================
        //
        // Use ability
        //
        // ==============================
        useAbility: function battleUseAbility(options){
            // TODO: think of call structure
            // TODO: Move forward entity when ability is used
            options = options || {};
            var self = this;

            // TARGET
            var target = options.target;
            var targetEntityGroup = options.entityGroup;
            var targetIndex = options.targetIndex;

            // SOURCE 
            // By default, is the selected entity
            //
            // set the source entity index ( the entity using the ability )
            //
            // NOTE: if no source was passed in, assume the source is from the
            // player
            var playerUsedAbility = false;

            var sourceEntityIndex = options.sourceEntityIndex;
            if(sourceEntityIndex === undefined){
                sourceEntityIndex = this.selectedEntityIndex;
                playerUsedAbility = true;
            }
            var sourceEntityGroup = options.sourceEntityGroup;
            if(sourceEntityGroup === undefined){
                sourceEntityGroup = this.selectedEntityGroup;
            }
            var sourceEntity = this.model.get(sourceEntityGroup + 'Entities')
                .models[sourceEntityIndex];

            // ABILITY
            // get selected ability from passed in ability
            var selectedAbility = options.ability;
            if(selectedAbility === undefined){
                selectedAbility = this.selectedAbility;
            }

            // --------------------------
            // Use the ability
            // --------------------------
            // Uses whatever the active ability is on the target
            logger.log("views/subviews/Battle", 
                "1. useAbility(): using ability: %O on %O",
                selectedAbility, 
                target);

            // check that selected ability is an ability
            if(!selectedAbility){
                logger.log("views/subviews/Battle", 
                    "x. useAbility(): CANNOT use, invalid ability");
                return false;
            }

            // TODO : use selected entity index for enemies
            var entityTime = this[sourceEntityGroup + 'EntityTimers'][
                sourceEntityIndex];

            // If the intended target is not in the ability's usable target 
            // group, cannot use the ability
            var validTarget = selectedAbility.get('validTargets');

            // check that target is valid (either enemy or player)
            if( (validTarget !== targetEntityGroup && validTarget.indexOf(targetEntityGroup) === -1) ||
                // check if target is dead
                ( !target.get('isAlive') && validTarget.indexOf('dead') === -1 )
            ){
                //
                // Cannot use because the entity group of the intended target 
                // is not valid
                logger.log("views/subviews/Battle", 
                    "x. useAbility(): CANNOT use, invalid target");
                // don't cancel out the target, just let anyone listening know
                // the target is invalid
                events.trigger('battle:useAbility:invalidTarget', {
                    ability: selectedAbility    
                });

                return false; 
            }


            // If the battle's timer is LESS than the castTime attribute, do 
            // nothing
            if(entityTime < selectedAbility.get('castTime')){
                // >>>> CAN NOT use (timer not met)
                // TODO: visual spell effect
                // TODO: multiple targets 
                logger.log("views/subviews/Battle", 
                    "2. CANNNOT use ability! Time: %O / %O", entityTime, 
                    selectedAbility.get('castTime'));

                return false;

            } else {
               // >>>> CAN use (timer met)
                logger.log("views/subviews/Battle", 
                    "2. USING ability! Time: %O / %O", entityTime, 
                    selectedAbility.get('castTime'));

                // update the timer
                // --------------------------
                this[sourceEntityGroup + 'EntityTimers'][sourceEntityIndex] -= 
                    selectedAbility.get('timeCost');

                // --------------------------
                // reset animation
                // --------------------------
                this.startTimerAnimation({
                    index: sourceEntityIndex,
                    value: entityTime - selectedAbility.get('timeCost'),
                    entityGroup: sourceEntityGroup
                });
                
                // --------------------------
                // use ability
                // --------------------------
                // get effect function and call it
                // TODO: multiple targets 
                var healthChange = selectedAbility.effect({
                    target: target,
                    source: sourceEntity
                });

                // TODO: do a spell effect
                // --------------------------

                // Do an effect on entity
                // --------------------------

                // only move the entity if it's not selected by the player
                if(this.selectedEntity !== sourceEntity){
                    // Move the SOURCE entity to the left / right, indiciating
                    // the entity used an ability
                    d3.select(this[sourceEntityGroup + 'EntityGroups'][0][sourceEntityIndex])
                        .transition()
                        .attr({ transform: 'translate(' + [
                                (sourceEntityGroup === 'enemy' ? -100 : 100), 
                                0] + ')' })
                            .transition()
                                .attr({ transform: 'translate(0 0)' });

                }

                // Do a movement event on the TARGET entity
                d3.select(this[targetEntityGroup + 'EntitySprites'][0][targetIndex])
                    .attr({
                        // wiggle the entity left / right or up / down depending
                        // if the ability has negative or positive damage
                        x: healthChange < 0 ? -30 : 0,
                        y: healthChange > 0 ? -20 : 0
                    })
                        .transition()
                        .duration(500)
                        .ease('elastic')
                        .attr({
                            x: 0, y: 0
                        });

                // --------------------------
                // Reset back to normal state
                // --------------------------
                if(playerUsedAbility){
                    this.cancelTarget();
                }
            }

            return this;
        },

        // ==============================
        // 
        // Entity death 
        //
        // ==============================
        entityDied: function battleEntityDied(options){
            // Called when an entity dies
            // options: {Object} consisting of 
            //  model: {Object} entity object
            var self = this;

            logger.log("views/subviews/Battle", 
                "1. entityDied() : options: %O", options);

            
            // Reset timer animation
            // Get index
            var index;
            var group = '';

            // cancel target
            this.cancelTarget();

            // get the index and entity group so we can do some animation
            _.each(['player', 'enemy'], function deathGroup(entityGroup){
                var tmpIndex = self.model.get(entityGroup + 'Entities').indexOf(options.model);
                if(tmpIndex !== -1){
                    index = tmpIndex;
                    group = entityGroup;
                }
            });

            // Stop transition, reset timer width to 0
            // stop bars
            d3.select(this[group + 'TimerBars'][0][index])
                .transition()
                .duration(100)
                .attr({ width: 0 });

            // flip entity
            d3.select(this[group + 'EntitySprites'][0][index])
                .transition()
                .duration(500)
                .delay(200)
                .attr({
                    transform: function(){
                        console.log("<><><>");
                        var transform = '';
                        transform = 'translate(' + [
                            0, self.entityHeight ] + 
                            ') scale(' + [
                                1, -1
                            ] + ')';

                        if(group === 'enemy'){
                            transform = 'translate(' + [
                                self.entityWidth, self.entityHeight ] + 
                                ') scale(' + [
                                    -1, -1
                                ] + ')';
                        }
                        return transform;
                    },
                    opacity: 0.7
                });

            return this;
        },

        // ------------------------------
        // TODO: Revive entity
        // ------------------------------

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
