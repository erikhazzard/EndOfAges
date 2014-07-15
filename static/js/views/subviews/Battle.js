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
        'util/Timer',
        'views/subviews/battle/AbilityList',
        'views/subviews/battle/EntityInfoCollection',
        'views/subviews/battle/IntendedTargetInfo',
        'views/subviews/battle/BattleLog'
    ], function viewBattle(
        d3, backbone, marionette, logger, events,
        Timer,
        AbilityListView,
        EntityInfoCollectionView,
        IntendedTargetInfoView,
        BattleLogView
    ){

    // Utility functions
    function timestampFunc() {
        return window.performance && window.performance.now ? window.performance.now : new Date().getTime;
    }

    function shakeBattle(intensity) {
        // Helper function to  shake the battle element
        //  Takes in: 
        //      intensity: {Number} shake intensity, amount of pixels to shake 
        //          the svg.  Around 200 would be a good upper limit
        intensity = intensity || 40;
        var duration = 45;

        $('#battle')
            .transit({
                left: -intensity, top: intensity, duration: duration
            })
            .transit({
                left: intensity, top: -intensity, duration: duration
            })

            // end
            .transit({
                left: 0, top: 0, duration: duration
            });


        return this;
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
            'regionPlayerEntities': '#region-battle-player-entities-info',
            'regionIntendedTarget': '#region-battle-intended-target-wrapper',
            'regionAbility': '#region-battle-ability-wrapper',
            'regionBattleLog': '#region-battle-log-wrapper'
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

            // --------------------------
            // Ability use callback
            // --------------------------
            // TODO: Better way to handle this? Have in own controller
            this.listenTo(events, 'useAbility', this.useAbility);

            // ==========================
            // entity player info views (left sidebar) clicked
            // ==========================
            this.listenTo(events, 'playerEntityInfo:clicked', this.setSelectedEntity);


            // ==========================
            // Handle user input - shortcut keys
            // ==========================
            // Handle keys for changing target
            // --------------------------
            this.listenTo(events, 'keyPress:up', this.handleKeyUpdateTarget);
            this.listenTo(events, 'keyPress:k', this.handleKeyUpdateTarget);
            this.listenTo(events, 'keyPress:down', this.handleKeyUpdateTarget);
            this.listenTo(events, 'keyPress:j', this.handleKeyUpdateTarget);

            // do something on left / right key ?
            // TODO: this?
            this.listenTo(events, 'keyPress:left', function(options){
                options.e.preventDefault();
                return self.handleKeyUpdateTarget.call(self, options);
            });
            this.listenTo(events, 'keyPress:right', function(options){
                options.e.preventDefault();
                return self.handleKeyUpdateTarget.call(self, options);
            });

            // Handle keys for changing active entity
            // --------------------------
            this.listenTo(events, 'keyPress:tab', this.handleKeyChangeSelectedEntity);
            this.listenTo(events, 'keyPress:shift+tab', this.handleKeyChangeSelectedEntity);
            _.each([1,2,3,4,6,7,8,9], function eachKey(key){
                // NOTE: these also set the active key pressed button
                self.listenTo(events, 'keyPress:' + key, self.handleKeyChangeSelectedEntity);
                self.listenTo(events, 'keyPress:shift+' + key, self.handleKeyChangeSelectedEntity);
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
            this.listenTo(this.model, 'change:selectedAbility', this.selectedAbilityChange);

            // ==========================
            // Scroll input
            // ==========================
            // use this in favor of function.prototype.bind for larger browser
            // support
            this.handleMouseWheelProxy = function(e){
                self.handleMouseWheel(e);
            };
            $(window).on('mousewheel', this.handleMouseWheelProxy);

            // Timer / Game loop 
            // --------------------------
            // used to pause or cancel timer
            this.isTimerActive = false;

            // NOTE: death listeners are setup in onShow
            
            // ==========================
            // Window focus events
            // ==========================
            this.listenTo(events, 'document:hide', this._pause);
            this.listenTo(events, 'document:show', this._unpause);

            // ==========================
            // Battle log Subview
            // ==========================
            this.battleLogView = new BattleLogView({
                model: this.model
            });

            return this;
        },

        onBeforeClose: function close(){
            // Called when the view is closed. Unbind global window / doc events
            var self = this;
            logger.log('views/subviews/Battle', 'onBeforeClose() called');

            // remove mouse wheel listener
            $(window).off('mousewheel', this.handleMouseWheelProxy);
            this.isTimerActive = false;
            return this;
        },

        // ==============================
        //
        // Win / Loss State
        //
        // ==============================
        enemyGroupDied: function enemyGroupDied(options){
            // When the entire enemy group has died, you win

            // stop timer
            this.isTimerActive = false;

            var reward = {
                gold: this.model.get('rewardGold'),
                exp: this.model.get('rewardExp')
            };

            console.log("so win." + JSON.stringify(reward));
            alert("You win");
            return this;
        },
        playerGroupDied: function playerGroupDied(options){
            // When the entire enemy group has died, you win

            // stop timer
            this.isTimerActive = false;

            console.log(">>>>>>>>>>>>>>>> entity group died ", options);
            alert("You lose");
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
                
                _.each(collection.models, function deathListener(model){
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
        runTimer: function battleRunTimer(){
            // TODO: ::: Can we put the timer in a web worker?
            //
            // This is called to kicked off the game loop for the battle.
            // Store variables the battleFrame loop function will access
            //
            // Note: This is called as one of the last actions in the onShow()
            // method
            var self = this,
                
                timerNow = null,
                timerDt = 0,
                timerLast = (window.performance && window.performance.now ? window.performance.now() : new Date().getTime()),

                fps = 60,
                timerStep = 1 / fps,

                slow = 1, // slow factor
                slowStep = slow * timerStep,

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
                timerNow = (window.performance && window.performance.now ? window.performance.now() : new Date().getTime());
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
                timerLast = timerNow;


                if(self.isTimerActive){
                    requestAnimationFrame(battleFrame);
                } else {
                    return false;
                }
            }

            // TODO: Restart any setTimeouts on ability effects

            // start the game loop
            this.start = new Date();
            requestAnimationFrame(battleFrame);
            return this;
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

            // TODO:::: Should timer logic live in entity?
            // TODO: Handle rendering in separate func, not using d3?
            //
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
                        if( val < model.attributes.attributes.attributes.timerLimit){
                            // increase the timer by the timer step - e.g., if FPS is
                            // 60, each update tick is 1/60
                            self[entityGroup + 'EntityTimers'][index] += (
                                self.timerStep * model.attributes.attributes.attributes.timerFactor
                            );
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

                            // TODO:
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

            return this;
        },


        // ------------------------------
        //
        // PAUSE 
        //
        // ------------------------------
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
            this.$pauseBlocker.classed('active', true);

            // pause all timers
            Timer.pauseAll();

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
            // pauses the timer by setting isTimerActive to false.
            // After this is called, runTimer() must be called to run the
            // timer again
            this.isTimerActive = false;

            return this;
        },

        _unpause: function _unpause(){
            // Called to pause the game state and animations
            //
            var self = this;
            logger.log('views/subviews/Battle', 
                '1. togglePause(): UNPAUSING');

            // resume all timers
            Timer.resumeAll();

            // remove blocker
            this.$pauseBlocker.classed('active', false);

            // set state
            this.model.set({
                state: 'normal'
            });

            // resumse all animations
            var e = d3.select("#time");
            var sel = d3.selectAll('#battle .timer-bar');

            // for each selection, update transition
            // TODO: pull this into a function, call for each entity
            _.each(sel[0], function unpauseEachSelection(el){
                $el = d3.select(el);
                var entityGroup = $el.attr('data-entityGroup');
                var index = $el.attr('data-index');
                var targetModel = self.model.get(entityGroup + 'Entities').models[index];

                // if entity is dead, don't start timer
                if(!self.model.get(entityGroup + 'Entities').models[index].get('isAlive')){
                    return false;
                }

                // Otherwise, resume the timer
                var val = self[entityGroup + 'EntityTimers'][index];

                var duration = ( 
                    (targetModel.attributes.attributes.attributes.timerLimit - val) /
                    (targetModel.attributes.attributes.attributes.timerFactor)
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
        // Battle Model Changes
        //
        // ==============================
        selectedAbilityChange: function selectedAbilityChange(model, ability){
            // When the player's selected ability changes, change the SVG wrapper
            logger.log('views/subviews/Battle', 
                '1. abilityChange(): ability changed to %O', ability);
            var type = '';
            var validTargets = ''; 

            if(ability){
                // TODO: more damage types? DOTs?
                if(ability.get('damage')){ type = 'selected-ability-damage'; }
                else if(ability.get('heal')){ type = 'selected-ability-heal'; }

                // get valid targets
                validTargets = ability.get('validTargets');
                if(validTargets.join){ 
                    validTargets = validTargets.join(' selected-ability-');
                }
                validTargets = 'selected-ability-' + validTargets;
            }

            // remove classes
            // TODO: if more types, add them here
            this.$wrapper.classed(
                'selected-ability-damage selected-ability-heal selected-ability-enemy selected-ability-player',
                false);

            if(type){ this.$wrapper.classed(type, true); }
            if(validTargets){ this.$wrapper.classed(validTargets, true); }

            return this;
        },

        stateChange: function stateChange(model,state){
            // Called when the model state changes
            var self = this;
            logger.log('views/subviews/Battle', 
                '1. stateChange(): model state changed to: ' + state);

            // remove all classes
            this.$wrapper.classed('state-normal state-ability', false);

            // remove shown indicators
            _.each(['player', 'enemy'], function(entityGroup){
                self[entityGroup + 'KeyIndicators'].classed('hidden', true);
                self[entityGroup + 'AlternativeKeyIndicators'].classed('hidden', true);
            });

            // TODO: do stuff based on state change
            if(state === 'normal'){
                // From ability to normal
                this.$wrapper.classed('state-normal', true);
                
            } else if (state === 'ability'){
                // From ability to normal
                this.$wrapper.classed('state-ability', true);
                
                // ----------------------
                // change the indicator keys based on selected ability
                // ----------------------
                var validTargets = [];
                if(this.model.get('selectedAbility')){
                    validTargets = this.model.get('selectedAbility').get('validTargets');
                }
                // show the key indicators for the corresponding targets
                if(validTargets){
                    // primary keys
                    if(validTargets[0] === 'enemy'){
                        self.enemyKeyIndicators.classed('hidden', false);
                    } else if(validTargets[0] === 'player'){
                        self.playerKeyIndicators.classed('hidden', false);
                    }

                    //alternative keys
                    if(validTargets[1] === 'enemy'){
                        self.enemyAlternativeKeyIndicators.classed('hidden', false);
                    } else if(validTargets[1] === 'player'){
                        self.playerAlternativeKeyIndicators.classed('hidden', false);
                    }
                }

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
                logger.log('views/subviews/Battle', 
                    '[x] game paused, returning');
                return false;
            }

            // If there is no selected target, cannot use the ability
            if(!this.selectedTarget){
                logger.log('views/subviews/Battle', 
                    '[x] cannot use ability, no selected target');
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
                    'handleAbilityActivated  : CANNOT be used : %O : %O',
                    entityTime, ability.get('castTime'));
            }

            // store desired target
            var desiredTarget = this.selectedEntity.attributes.desiredTarget;

            // Use ability if it can be used
            // --------------------------
            if(canBeUsed && desiredTarget && desiredTarget.model){
                logger.log('views/subviews/Battle', 
                    '\t ability CAN be used and DOES have a target');
                this.model.set({selectedAbility: ability},{silent:false});
                this.useAbility({
                    target: desiredTarget.model,
                    targetIndex: desiredTarget.index, 
                    entityGroup: desiredTarget.group
                });

            } else if (canBeUsed) {
                // The ability CAN be used
                logger.log('views/subviews/Battle', 
                    '\t ability CAN be used, setting selected ability. NO target');

                // Set the selected ability
                this.model.set({selectedAbility: ability},{silent:false});

                // change the state to ability. Now, when the user clicks on
                // an entity, the ability will be used
                this.model.set({ state: 'ability' });

                // highlight the possible targets (whatever group)
                // TODO: Highlight group of possible targets based on ability
                // options.ability.get('validTargets') bla bla bla
            } else {
                logger.log('views/subviews/Battle', 
                    '\t ability can NOT be used');
            }

            // call the useCallback
            if(useCallback){ useCallback(null, {canBeUsed: canBeUsed}); }

            return this;
        },

        // ==============================
        //
        // User input - Shortcut keys
        //
        // ==============================
        handleKeyUpdateTarget: function handleKeyUpdateTarget(options){
            // This function selects an entity based on a keypress. 
            // j / k and up / down select next or previous entity the
            // player controls, as does the 1 - 4 keys
            //
            // To select an enemy : use keys 1 - n
            // To select a player entity : use keys shift + 1 - n
            //
            // Updates the target for the selected (active) entity
            //
            // TODO: Handle changing the selected entity
            var self = this;
            logger.log('views/subviews/Battle', 
                'handleKeyUpdateTarget() called : %O', options);

            // disable page scrolling with up / down arrow key
            if(options.e){
                options.e.preventDefault();
            }

            var key = options.key;

            // If user has an ability selected, only targetting allowed is
            // using 1 - n, shift + 1 - n, and clicking / selecting an entity
            if(this.model.get('state') === 'ability' &&
                key.match(/[0-9]+/) === null){
                logger.log('views/subviews/Battle', 
                    '\t [x] in ability mode and a key other than 1 - n or shift + 1 -n was pressed');
                return false;
            }

            // set default group
            var entities, modelsLength;

            // TODO: If NOT in `targetting` state, pressing up or down should
            // change the selected entity
            // get index for selected entity
            var targetIndex = -1;
            var targetGroup = 'player';

            if(this.selectedEntity.attributes.desiredTarget){
                targetIndex = this.selectedEntity.attributes.desiredTarget.index;
                targetGroup = this.selectedEntity.attributes.desiredTarget.group;
            }

            logger.log('views/subviews/Battle', 
                '\t selectedEntity : %O ( %O ) | targetIndex : %O | targetGroup : %O', 
                this.selectedEntity,
                this.selectedEntity.attributes.desiredTarget,
                targetIndex, targetGroup);

            // store reference to the valid targets of the selectedAbility
            var abilityTargets = [];
            if(this.model.get('selectedAbility')){
                abilityTargets = this.model.get('selectedAbility').get('validTargets');
            }

            // reverse up down - down key should go down the entity list
            if(key === 'up' || key === 'k'){ targetIndex -= 1; }
            else if (key === 'down' || key === 'j'){ targetIndex += 1; }
            else if(key.match(/^shift\+[0-9]+/)){ 
                // Key shift + 1 -n
                // ----------------------
                // set the key being pressed to the number
                targetIndex = +(key.replace('shift+', '')) - 1;

                // If the keys are number keys, select the specific entity 
                // for the player
                // TODO: Have shift + n target alternate (i.e., whatever
                // the secondary target is)
                if(abilityTargets && abilityTargets[1] === 'enemy'){
                    targetGroup = 'enemy';
                }
            }
            else if(key.match(/[0-9]+/)){
                // Key 1 - n 
                // ----------------------
                // set the key being pressed to the number

                if(this.model.get('state') === 'ability'){
                    // When in ability mode, using the 1 - n keys will select
                    // either an enemy or player entity
                    targetIndex = +key - 1;

                    // if the first type of valid target is an enemy, have
                    // the 1-n keys target the enemy. Otherwise, it will target
                    // the player entities
                    if(abilityTargets && abilityTargets[0] === 'enemy'){
                        targetGroup = 'enemy';
                    } 
                } else { 
                    // when the user is not in ability mode, do nothing when
                    // 1 - n key is pressed
                    logger.log('views/subviews/Battle', 
                        '\t [x] 1-n key pressed not in ability mode, returning');
                    return false;
                }
            } else if (key.match(/left/)){
                // For left / right keys, switch groups
                targetGroup = 'player';
            } else if (key.match(/right/)){
                targetGroup = 'enemy';
            }

            // ensure target index stays inside of the bounds
            if(targetGroup === 'player'){
                entities = this.model.get('playerEntities');
                modelsLength = entities.models.length;

                //// loop around if the end is reached
                //if(targetIndex >= modelsLength){
                    //targetIndex = 0;
                //} else if( targetIndex < 0) {
                    //targetIndex = 0;
                //}
                
                // do not loop around
                if(targetIndex >= modelsLength){
                    targetIndex = modelsLength-1;
                } else if ( targetIndex < 0){
                    targetIndex = 0;
                }

            } else if (targetGroup === 'enemy'){
                // If the player tries to select an entity outside of range
                //  e.g., selects entity 4 but there's only 3 entities, then
                //  select the last entity
                entities = this.model.get('enemyEntities');
                modelsLength = entities.models.length;

                // don't loop around
                if(targetIndex >= modelsLength){
                    targetIndex = modelsLength-1;
                } else if ( targetIndex < 0){
                    targetIndex = 0;
                }
            }

            // --------------------------
            // 2. Got target entity, select it
            // --------------------------
            logger.log('views/subviews/Battle', 
                ' got key press : ' + key + 
                ' : entityGroup: ' + targetGroup +
                ' : Selecting entity: ' + targetIndex);

            // select the entity
            this.selectEntity({
                entityGroup: targetGroup,
                index: targetIndex
            });

            return this;
        },

        handleKeyChangeSelectedEntity: function handleKeyChangeSelectedEntity(options){
            // Changes the currently selected entity. Can either tab (or shift
            // tab) to cycle through entities, or press the number keys
            logger.log('views/subviews/Battle',
                'handleKeyChangeSelectedEntity(): called with %O', options);

            // prevent default key behavior 
            if(options.e){ options.e.preventDefault(); }
            var key = options.key;

            var numPlayerEntities = this.model.get('playerEntities').models.length;
            var curIndex = this.selectedEntityIndex;
            var newIndex = 0;

            // update the currently selected entity
            if(key === 'tab'){
                // tab goes down the list
                newIndex = curIndex + 1;

                // loop around
                if(newIndex >= numPlayerEntities){ 
                    newIndex = 0;
                }
            } else if(key === 'shift+tab'){
                // tab goes down the list
                newIndex = curIndex - 1;

                // loop around
                if(newIndex < 0){
                    newIndex = numPlayerEntities - 1;
                }
            } else if(key.match(/[0123456789]/)){
                // get index from key, start at 1 (not 0), so subtract 1 to
                // the new index
                newIndex = parseInt(key,10) - 1;

                if(newIndex < 0){
                    newIndex = 0;
                } else if(newIndex >= numPlayerEntities){
                    // outside of bounds, get last entity
                    newIndex = numPlayerEntities - 1;
                }

            }

            // Update selected entity by index
            // --------------------------
            this.setSelectedEntity({index: newIndex});

            // update the target based on the selected entity's target
            var entityDesiredTarget = this.selectedEntity.get('desiredTarget');

            logger.log('views/subviews/Battle', 
                'updated selected entity: %O | desiredTarget for new entity : %O',
                this.selectedEntity, entityDesiredTarget);

            // update the currently selected target based on the selected entity
            if(entityDesiredTarget){
                this.selectTarget(
                    entityDesiredTarget.group, 
                    entityDesiredTarget.index
                );
            } else {
                // no valid target
                this.selectTarget(null, null);
            }

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

        // ------------------------------
        // mouse scroll event
        // ------------------------------
        handleMouseWheel: function(e){
            // When the mousewheel is scrolled, determine if it's up or down,
            // then select the player's entity above or below the current one
            // stop scrolling on the page
            if(!this.$battleWrapper.is(':hover')){ 
                return false;
            }

            if(e){
                e.preventDefault();
            }

            var direction = 'up';
            if(e.originalEvent.wheelDelta < 0){
                direction = 'down';
            }

            this.handleKeyUpdateTarget({key: direction});
            return this;
        },

        // ------------------------------
        // Cancel target
        // ------------------------------
        cancelTarget: function cancelTarget(){
            // removes any selected targets, return to default state
            logger.log('views/subviews/Battle', 
                'cancelTarget() called, changing state');

            // clear out selected ability
            this.model.set({selectedAbility: null}, {silent:false});

            // cancel ability usage
            events.trigger('ability:cancel');

            if(this.selectedEntity && 
            this.selectedEntity.attributes.desiredTarget){
                // update the selected entity's target
                this.selectedEntity.set({ desiredTarget: null }, {silent: true});
                this.selectedEntity.trigger('change:desiredTarget', 
                    this.selectedEntity, null);
            }

            // clear the selected target
            this.selectTarget(null);

            // set the battle state to normal
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
            logger.log('views/subviews/Battle', '1. onShow() called');
            var self = this;

            // TODO: remove timer el for dev
            this.$timerEl = $('.timer', this.$el);

            // show the battle log
            this.regionBattleLog.show(this.battleLogView);

            this.$battleWrapper = $('#battle-wrapper');
            
            // Setup svg
            var svg = d3.select('#battle');
            this.$svg = svg;

            var wrapper = svg.append('g');
            this.$wrapper = wrapper;

            // entity props
            var entityHeight = 60;
            var entityWidth = entityHeight;
            this.entityHeight = entityHeight;
            this.entityWidth = entityWidth;

            // update models
            // --------------------------
            this.playerEntityModels = this.model.get('playerEntities').models;

            // Show player entities info
            logger.log("views/subviews/Battle", "\t showing player entity info");
            this.entityInfoCollectionView = new EntityInfoCollectionView({
                collection: this.model.get('playerEntities')
            });
            this.regionPlayerEntities.show(this.entityInfoCollectionView);

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
                            .domain([ 0, model.attributes.attributes.attributes.timerLimit])
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
            this.$pauseBlocker = wrapper.append('rect')
                .attr({ 'class': 'pause-blocker', x: 0, y: 0, width: '100%', height: '100%' })
                .style({ fill: 'none' });

            // damage / heal effect flash
            this.$healthEffectBlocker = wrapper.append('rect')
                .attr({ 'class': 'health-blocker', x: 0, y: 0, 
                    width: '100%', height: '100%' })
                .style({ fill: 'none', opacity: 0 });

            this.$deathEffectBlocker = wrapper.append('rect')
                .attr({ 'class': 'health-blocker', x: 0, y: 0, 
                    width: '100%', height: '100%' })
                .style({ fill: 'none', opacity: 0 });

            // setup groups for entities
            var entityGroups = {
                player: wrapper.append('g')
                    .attr({ 'class': 'player-entities' }),
                enemy: wrapper.append('g')
                    .attr({ 'class': 'enemy-entities' })
            };

            // Spell effect group - spell effects are appended here
            this.$abilityEffects = wrapper.append('g')
                .attr({ 'class': 'ability-effects' });

            // --------------------------
            // setup background
            // --------------------------
            logger.log('views/subviews/Battle', '3. setting up backdrop');
            // TODO: use different background images
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

                
                // Setup the wrapper group
                // ----------------------
                // Whenever interaction happens with it, select or hover the 
                // entity
                function entityClickedInteraction(d,i){
                    // if the 
                    return self.selectEntity({index: i, entityGroup: entityGroup});
                }

                // configure num of entities per row
                var numEntitiesPerRow = 4;

                var groupsWrapper = self[entityGroup + 'EntityGroupsWrapper'] = entityGroups[
                    entityGroup].selectAll('.entity-group')
                        .data(self.model.get(entityGroup + 'Entities').models)
                        .enter().append('g')
                            .attr({ 
                                'class': 'entity-group-wrapper ' + entityGroup,

                                // transform the entire group to set the entity position
                                transform: function groupsWrapperTransform(d,i){

                                    // position entiy wrapper
                                    // TODO: place near edge of map, don't
                                    // hardcode 740 
                                    // if enemy entities, place near edge of map
                                    var entityGroupX = (entityGroup === 'player' ? 40 : 740);
                                    var entityGroupY = 40 + 
                                        (i * (entityHeight + entityHeight ));

                                    // Give it a little randomness
                                    if(entityGroup === 'enemy'){
                                        entityGroupX += (20 - Math.random() * 40);
                                    }

                                    // wrap enemies around
                                    if(entityGroup === 'enemy' && i >= numEntitiesPerRow){
                                        entityGroupX -= ( 100 * Math.floor(((i+1)-0.001)/numEntitiesPerRow));

                                        entityGroupY = 40 + 
                                            ( i % numEntitiesPerRow ) *
                                            (entityHeight + entityHeight );
                                    }
                                    
                                    return "translate(" + [
                                        entityGroupX, 
                                        entityGroupY
                                    ] + ")";
                                }
                            })
                            .on('click', entityClickedInteraction)
                            .on('touchstart', entityClickedInteraction)
                            .on('mouseenter',function entityMouseEnter(d,i){ 
                                // TODO: fix this when ability changes
                                d3.select(this).classed('entity-hover', true);
                                return self.entityHoverStart({index: i, entityGroup: entityGroup});
                            })
                            .on('mouseleave',function entityMouseLeave(d,i){ 
                                d3.select(this).classed('entity-hover', false);

                                return self.entityHoverEnd({index:i, entityGroup: entityGroup});
                            });

                // Append an invisible rect for interaction
                // ----------------------
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

                // ----------------------
                // Targetting Ring
                // ----------------------
                self[entityGroup + 'EntityTargetRings'] = groups.append('ellipse')
                    .attr({
                        'class': entityGroup + '-target-indicator target-indicator',
                        cy: entityHeight/1.2,
                        cx: entityWidth/1.9,
                        ry: 15,
                        rx: entityWidth/1.5
                    });

                // --------------------------
                // PLAYER SPRITE / image
                // --------------------------
                // TODO : figure out better way to handle sprites
                // TODO: dont use image, use clone / sticker?
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
                    });

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
                                function updateHealth(returnedModel, health, changeOptions){
                                    // called when health updates
                                    // NOTE: if the entity is dead, don't
                                    // update the bar
                                    if(model.get('isAlive')){
                                        d3this.transition()
                                            .attr({
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

                // selection key
                // ----------------------
                // Shows the key to select the entity. The keys should match
                // the index of the entity displayed. Showing / hiding the
                // group is handled in the game logic when the state changes
                //
                // regular key
                // ----------------------
                self[entityGroup + 'KeyIndicators'] = groups.append('g')
                    .attr({
                        'class': entityGroup + '-key-indicator key-indicator hidden'
                    });

                // add background circle
                self[entityGroup + 'KeyIndicators'].append('circle')
                    .attr({
                        cy: Math.round(entityHeight/1.2) - 10,
                        cx: Math.round(entityWidth/1.9) + 38,
                        r: 20
                    });
                // add text
                self[entityGroup + 'KeyIndicators'].append('text')
                    .attr({
                        y: Math.round(entityHeight/1.2) + 2,
                        x: Math.round(entityWidth/1.9) + 31
                    }).text(function(d,i){ return i + 1; });

                // alternative key
                // ----------------------
                self[entityGroup + 'AlternativeKeyIndicators'] = groups.append('g')
                    .attr({
                        'class': 'alternative-' + entityGroup + '-key-indicator alternative-key-indicator hidden'
                    });

                // add background circle
                self[entityGroup + 'AlternativeKeyIndicators'].append('circle')
                    .attr({
                        cy: Math.round(entityHeight/1.2) - 10,
                        cx: Math.round(entityWidth/1.9) + 38,
                        r: 20
                    });
                // add text
                self[entityGroup + 'AlternativeKeyIndicators'].append('text')
                    .attr({
                        y: Math.round(entityHeight/1.2) + 2,
                        x: Math.round(entityWidth/1.9) + 31
                    }).text(function(d,i){ return 'Shift + ' + (i + 1); });

                // ----------------------
                // Damage Text animation
                // ----------------------
                // There can be multiple text elements at once, anytime health
                // changes create a floating text element for it
                self[entityGroup + 'EntityDamageTextGroups'] = groups.append('g')
                    .attr({ 'class': 'text-group-wrapper' });

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
            this.setSelectedEntity({index: firstAliveEntity});

            // --------------------------
            // Event Listeners
            // --------------------------
            _.each(['player', 'enemy'], function healthGroup(entityGroup){
                var models = self.model.get(entityGroup + 'Entities').models;
                _.each(models, function setupHealthCallback(model, index){
                    // show damage text whenever entitiy's health changes
                    // ----------------------
                    self.listenTo(
                        model.get('attributes'), 
                        'change:health', 
                        // model changes get passed in the model and the
                        // changed attribute value
                        function callShowText(attrModel, health, changeOptions){
                            return self.showEffectOnHealthChange.call(
                                self, {
                                    entityModel: model,
                                    model: attrModel,
                                    health: health,
                                    index: index,
                                    entityGroup: entityGroup,
                                    changeOptions: changeOptions
                                }
                            );
                        }
                    );

                    self.listenTo(
                        model,
                        'change:activeEffects', 
                        // model changes get passed in the model and the
                        // changed attribute value
                        function callUpdateEffects(entityModel, effects, changeOptions){
                            return self.showEffectOnActiveEffectChange.call(
                                self, {
                                    entityModel: entityModel,
                                    effects: effects,
                                    index: index,
                                    entityGroup: entityGroup,
                                    changeOptions: changeOptions
                                }
                            );
                        }
                    );
                });
            });

            return this;
        },

        // ------------------------------
        //
        // Buff effect
        //
        // ------------------------------
        showEffectOnActiveEffectChange: function showEffectChange(options){
            console.log("active effect change : ", options);
            return this;
        },

        // ------------------------------
        //
        // Text effect
        //
        // ------------------------------
        showEffectOnHealthChange: function showTextEffect(options){
            // This is called whenever any entity's health is changed.
            // Text will appear, along with the screen flashing
            //
            // The text will be styled based on the difference
            //
            // options:
            //      model: {Object} the `attributes` model of the entity model
            options = options || {};
            logger.log("views/subviews/Battle", 
                "1. showEffectOnHealthChange() : options: %O",
                options); 

            var self = this;
            var model = options.model; // attribute model (health / stats / etc)
            var entityModel = options.entityModel;
            var index = options.index;
            var entityGroup = options.entityGroup;
            var difference = options.health - model._previousAttributes.health;

            var shakeScale = d3.scale.linear()
                .domain([ 0, entityModel.get('attributes').get('maxHealth')])
                .range([ 3, 24 ]);
                        

            // shake the battle container
            // --------------------------
            if(difference < 0){
                // shake a lot if self is hit
                if(entityGroup === 'player'){
                    shakeBattle(Math.ceil(shakeScale(-difference)));
                } else {
                    shakeBattle(Math.ceil(shakeScale(-difference) / 3));
                }
            }

            // Show flash
            // --------------------------
            // Show a red flash whenever the player takes damage
            var fill = '';
            var opacity = '';

            if(entityGroup === 'player'){
                if(difference < 0){ 
                    // If damage is done, flash the screen red
                    fill = '#dd0000';
                    opacity = d3.scale.linear()
                        .domain([ 0, -model.attributes.maxHealth ])
                        .range([ 0.2, 0.9 ])
                        (difference);

                } else { 
                    // if entity is healed, flash the screen green
                    fill = '#22dd22';
                    opacity = d3.scale.linear()
                        .domain([ 0, model.attributes.maxHealth ])
                        .range([ 0.1, 0.8 ])
                        (difference);
                }
                
                // do the flash
                this.$healthEffectBlocker.transition().ease('elastic')
                    .style({ fill: fill, opacity: opacity })
                    .transition()
                    .ease('elastic')
                        .style({ fill: '', opacity: 0 });
            }

            // --------------------------
            // Wiggle 
            // --------------------------
            // Do a wiggle event on the entity
            var intensityDamageScale = d3.scale.linear()
                .domain([ 0, -model.attributes.maxHealth * 0.9])
                .range([ -20, -80 ]);
            var intensityHealScale = d3.scale.linear()
                .domain([ 0, model.attributes.maxHealth ])
                .range([ -10, -40 ]);

            if(entityModel.get('isAlive')){
                // initiate the wiggle 
                d3.select(self[entityGroup + 'EntitySprites'][0][index])
                    .attr({
                        // wiggle the entity left / right or up / down depending
                        // if the ability has negative or positive damage
                        x: difference < 0 ? intensityDamageScale(difference) : 0,
                        y: difference > 0 ? intensityHealScale(difference) : 0
                    })
                    .transition()
                    .duration(520)
                    .ease('elastic')
                        .attr({
                            x: 0, y: 0
                        });
            }

            // Show text
            // --------------------------
            // This is called whenever any entity's health is modified
            var textXScale = d3.scale.linear()
                .domain([ 0, entityModel.get('attributes').get('maxHealth') / 5 ])
                .range([ 0, 40 ])
                .clamp(true);

            var textX = textXScale(Math.round(Math.abs(difference)));

            if(difference < 0){ textX = textX * -1; }

            var $damageText = d3.select(
                self[entityGroup + 'EntityDamageTextGroups'][0][index]
            ).append('text')
                .attr({
                    'class': 'entity-group-text ' + entityGroup,
                    // position it based on positive / negative health change
                    //  randomize position just a little bit so text doesn't
                    //  overlap
                    x: textX
                });

            // first, start text at bottom of entity and set text
            //  will have either 'positive damage' or 'negative damage' classes
            var dmgClass = 'neutral damage';
            if(difference < 0){
                dmgClass = 'negative damage';
            } else if(difference > 0){
                dmgClass = 'positive damage';
            }
            $damageText.classed(dmgClass, true);

            $damageText
                .attr({ 
                    y: self.entityHeight - 10,
                    opacity: 0.3
                })
                .text((difference < 1 ? '' : '+') + difference);


            // then, fade in text and float it up and out
            $damageText.transition().ease('cubic-in').duration(160)
                    .attr({ 
                        y: -15, 
                        x: textX < 0 ? textX - 20 : textX + 20,
                        opacity: 1
                    })
                    // reached the apex
                    .transition().ease('cubic-out').duration(420)
                        .attr({  
                            y: 0, 
                            x: textX < 0 ? textX - 50 : textX + 50,
                            opacity: 1
                        })
                        .transition().ease('cubic-in').duration(270)
                            .attr({
                                y: 40, 
                                'font-size': 0,
                                opacity: 0
                            })
                            // remove the element when it's over
                            .each('end', function(){
                                d3.select(this).remove();
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
                    // must divide by the timerFactor
                    var duration = (
                        (targetModel.attributes.attributes.attributes.timerLimit - options.value) / 
                        targetModel.attributes.attributes.attributes.timerFactor) * 1000;

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
        updateSVGTargetDisplay: function updateSVGTargetDisplay(group, index){
            // Called whenever the selectedEntity's desired target changes, will
            // update the target ring
            //
            logger.log("views/subviews/Battle", 
                'updateSVGTargetDisplay() called : %O', arguments);

            // turn off all selected entities
            d3.select('#battle .entity-selected')
                .classed('entity-selected', false);

            if(group){
                // target the entity, if group was passed in
                d3.select(this[group + 'EntityGroupsWrapper'][0][index])
                    .classed('entity-selected', true);
            }

            return this;
        },

        selectEntity: function selectEntity(options){
            // This is a proxy function that will call the corresponding select
            // entity type function based on the passed in entityGroup
            options = options || {};
            logger.log("views/subviews/Battle", 'selectEntity() called with options : %O', options);

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
            logger.log("views/subviews/Battle", 
                'selectPlayerEntity : selecting (or using an ability) on an entity controlled by the player. options : %O',
                options);
            options = options || {};
            var i = options.index;
            
            var target = this.selectTarget('player', i);

            if(!target){
                logger.warn("views/subviews/Battle : selectPlayerEntity() : no target entity %O", target);
                return false;
            }

            // STATE: normal
            var state = this.model.get('state');
            var desiredTarget = {
                model: target,
                index: i,
                group: 'player'
            };

            if(state === 'normal' || state === 'pause'){
                logger.log("views/subviews/Battle", '\t setting entity target');

                if(this.selectedEntity){
                    // if there's a selected entity, update the desired target
                    // update the selected entity's target
                    this.selectedEntity.set({ 
                        desiredTarget: desiredTarget
                    }, { silent: true });

                    // manually trigger the change since we're updating a model
                    this.selectedEntity.trigger('change:desiredTarget', 
                        this.selectedEntity, desiredTarget);
                }

                // TODO: Handle this differently..don't always set the
                // selected entity, ONLY do this if they press up / down
                // or j / k OR double click on an entity
                // TODO: THIS ? REMOVE?
                //this.setSelectedEntity({index: options.index});

            } else if(this.model.get('state') === 'ability'){
                // then, use the ability
                // TODO: think of call structure
                logger.log("views/subviews/Battle", '\t using ability');
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
            // This is called when the user clicks on or otherwise targets an
            // entity. If the `ability` state is active, use the ability selected
            // otherwise, set the entity's target
            //
            options = options || {};
            var i = options.index;
            logger.log("views/subviews/Battle", 
                'selectEnemyEntity called with options : %O', options);
            
            var target = this.selectTarget('enemy', i);

            if(!target){
                logger.warn("views/subviews/Battle : selectEnemyEntity() : no target entity %O", target);
                return false;
            }

            // store desiredTarget info
            var desiredTarget = {
                model: target, index: i, group: 'enemy'
            };
            
            if(this.model.get('state') === 'normal'){
                // TODO: show more info on enemy?
                logger.log("views/subviews/Battle", 'setting entity target');
                // set desired target info
                //
                // TODO: index and group should NOT be stored in here,
                // should have a util function to get index and group FROM
                // a target
                this.selectedEntity.set({ 
                    desiredTarget: desiredTarget
                }, { silent: true });

                // manually trigger the change event
                this.selectedEntity.trigger('change:desiredTarget',
                    this.selectedEntity, desiredTarget);

            } else if(this.model.get('state') === 'ability'){
                // call the general select entity function to set the ability's
                // target and use the ability
                logger.log("views/subviews/Battle", 
                    'using ability on target %O', target);

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
        selectTarget: function selectTarget(group, i){
            // Sets the target based on the selected index in the model
            logger.log("views/subviews/Battle", 
                '1. selectTarget : group %O | i %O', group, i);

            var model = null;
            if(group){
                model = this.model.get(group + 'Entities').models[i];
            }

            // TODO: Update selectTarget when selectedEntity changes
            //  (in setSelectedEntity)
            this.selectedTarget = model;
            logger.log("views/subviews/Battle", '\t selected target: %O', this.selectedTarget);

            // update svg elements
            this.updateSVGTargetDisplay(group, i);

            // TODO: restructure, prettify
            // update the target window
            if(group && (i !== undefined)){
                logger.log("views/subviews/Battle", 
                    '\t updating current target view : %O | %O', i, group);
                this.setIntendedTarget({
                    index: i,
                    entityGroup: group
                });
            } else {
                logger.log("views/subviews/Battle", '\t clearing current target view');
                this.clearIntendedTarget();
            }

            return this.selectedTarget;
        },

        setSelectedEntity: function setSelectedEntity(options){
            // Select an entity at passed in index in the normal state
            // --------------------------
            // overview:
            //  -Get the entity model from the selection
            //  -Show the abilities for the entity
            //  -Show more info
            //  -Move the entity forward
            //
            options = options || {};
            logger.log("views/subviews/Battle", 'setSelectedEntity() called');
            var i = options.index;

            // if the user selected the currently active entity, do nothing
            if(i === this.previouslySelectedEntityIndex){ 
                logger.log("views/subviews/Battle", 
                    '\t 0. entity selected: same entity selected, exiting : i : %O', i);
                return false; 
            } 

            //1. get model based on selected element
            var model = this.model.get('playerEntities').models[i];
            logger.log("views/subviews/Battle", 
                "\t 1. entity selected: %O \n model: %O", i, model);

            // update the selected entity
            this.selectedEntityIndex = i;
            this.selectedEntityGroup = 'player';
            this.selectedEntity = model;

            // upet the active player entity view
            this.entityInfoCollectionView.setSelectedEntityView(model);

            // show abilities for this entity. Create new AbilityList view
            // --------------------------
            logger.log("views/subviews/Battle", "\t 2. showing ability view");
            var abilityListView = new AbilityListView({
                collection: model.get('abilities'),
                entityModel: model
            });
            // store ref to ability list view so we can show active abilities
            this.currentAbilityListView = abilityListView;
            this.regionAbility.show(abilityListView);

            // move entity group forward
            logger.log("views/subviews/Battle", "\t 3. moving entity");
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

            // Update the visible target
            // --------------------------
            if(model.attributes.desiredTarget){
                logger.log("views/subviews/Battle", "\t updated selected target");
                this.selectTarget(
                    model.attributes.desiredTarget.group,
                    model.attributes.desiredTarget.index
                );
            }

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

            // TODO: don't create new views, use a single view and just rerender
            // TODO: don't create new views, reuse them(?)
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

            if(this.selectedEntity && this.selectedEntity.attributes.desiredTarget){
                var infoView = new IntendedTargetInfoView({ 
                    model: this.selectedEntity.attributes.desiredTarget.model
                });
                this.regionIntendedTarget.show(infoView);
            }   
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
            // TODO: Split out the visible stuff and the logic parts. most of 
            // this function is logic that could live elsewhere
            options = options || {};
            var self = this;

            // TARGET
            var target = options.target;
            var targetEntityGroup = options.entityGroup;
            var targetEntityIndex = options.targetIndex;

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
            // get selected ability from the user's selected ability
            var selectedAbility = options.ability;

            if(selectedAbility === undefined){
                selectedAbility = this.model.get('selectedAbility');
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

            // if the AI used the ability, the validTargets should be switched
            //  (to an enemy, the 'enemy' is the player, and 'player' is the AI)
            var invalidTarget = false;

            // if the PLAYER used the ability, check for valid target.
            //  The handleAI() logic will handle valid target checks for enemies
            if(playerUsedAbility){
                invalidTarget = (validTarget !== targetEntityGroup && 
                    validTarget.indexOf(targetEntityGroup) === -1);
            } 

            // check that target is valid (either enemy or player)
            if( invalidTarget ||
                // check if target is dead
                ( !target.get('isAlive') && validTarget.indexOf('dead') === -1 )
            ){
                //
                // Cannot use because the entity group of the intended target 
                // is not valid
                logger.log("views/subviews/Battle", 
                    "x. useAbility(): CANNOT use, invalid target | target %O",
                    target);
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

                // trigger ability usage on entiy model
                sourceEntity.trigger('ability:use', {
                    target: target,
                    ability: selectedAbility
                });

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
                selectedAbility.effect({
                    target: target,
                    source: sourceEntity
                });

                //// --------------------------
                //// Reset back to normal state
                //// --------------------------
                //// NOTE: need this if we don't have target first usage
                //if(playerUsedAbility){
                    //this.cancelTarget();
                //}

                // TODO: do a spell effect (always do it, even if entity is
                // dead)
                // --------------------------
                // TODO: put this in a separate method
                //
                // effect needs a source and a target. each spell can have
                // its own custom effect. 
                // TODO: put this in model? model hold data, so it doesn't seem
                // like view logic should be there, but placing it there
                // would encapsulate all ability logic / effects which the
                // view could call
                // TODO: a spell may have multiple effect icons

                if(selectedAbility.attributes.effectId){
                    // update the bounding rect
                    this.wrapperBoundingRect = this.$svg.node().getBoundingClientRect();

                    // get the position of the entity sprite.
                    //  We need to do this so we can tell the effect where to go
                    //  TODO: We could just have the effect go to the entity's
                    //  starting location instead - would be slightly faster
                    var sourceRect = d3.select(this[sourceEntityGroup + 'EntitySprites'][0][sourceEntityIndex])
                        .node()
                        .getBoundingClientRect();
                    var targetRect = d3.select(this[targetEntityGroup + 'EntitySprites'][0][targetEntityIndex])
                        .node()
                        .getBoundingClientRect();

                    // get position relative to the battle svg they are contained in
                    var targetPos = {};
                    var sourcePos = {};

                    // set the position based on the source / target bounding
                    // rects and update the position
                    _.each([[targetRect, targetPos], [sourceRect, sourcePos]],
                        function(item){
                        //item[0] is the bounding rect, item[1] is relative position
                        item[1].top = item[0].top - self.wrapperBoundingRect.top;
                        item[1].bottom = item[0].bottom - self.wrapperBoundingRect.top;
                        item[1].left = item[0].left - self.wrapperBoundingRect.left;
                        item[1].right = item[0].right - self.wrapperBoundingRect.left;
                    });

                    // TODO: rotate / flip effect based on source and target
                    // if target and source are same group, flip the effect up or
                    // down?
                    var scaleAmount = '';
                    if(sourceEntityGroup === 'enemy'){
                        scaleAmount = 'scale(-1 1)';
                    }

                    // draw effect from target to source
                    // TODO: Make this a function outside of this scope, pass 
                    // in selected ability and entities. 
                    // Then, this allows us to just listen for a health change
                    // or whatever other event and trigger it
                    //
                    // get a copy of the svg effect
                    //  all effects should be wrapped in a svg element with id of
                    //  `effect-spellName`, and the wrapper should have no attributes
                    function renderEffect(){
                        var $effect = d3.sticker('#effect-' + selectedAbility.attributes.effectId);
                        // append it the ability effects group
                        $effect = $effect(self.$abilityEffects);

                        var effectClass = '';

                        // Set effect class based on the element
                        // --------------
                        // TODO: Use a gradient for multiple effects
                        var highestElement = { value: 0, element: '' };

                        _.each(selectedAbility.attributes.element, function(val,key){
                            if(highestElement.value < val){ 
                                highestElement.value = val; 
                                highestElement.element = key;
                            }
                        });

                        effectClass = highestElement.element;

                        // Render the effect
                        // --------------
                        // start in the middle of the source
                        $effect.attr({
                            'class': $effect.attr('class') + ' ' + effectClass,
                            // set start position immediately
                            transform: 'translate(' + [
                                // get midpoints
                                sourcePos.left + ((sourcePos.right - sourcePos.left) / 2), 
                                sourcePos.top + ((sourcePos.bottom - sourcePos.top) / 2)
                                ] + ') ' + scaleAmount

                        })
                            // then travel to the target
                            .transition()
                            .ease('cubic-in')
                            .duration(selectedAbility.attributes.castDuration * 1000) 
                            .attr({
                                transform: 'translate(' + [
                                    // send to edge of either enemy or player
                                    targetEntityGroup === 'enemy' ? targetPos.left - 20 : targetPos.right + 20,
                                    // get midpoints
                                    targetPos.top + ((targetPos.bottom - targetPos.top) / 2)
                                    ] + ') ' + scaleAmount
                            })
                            .each('end', function(){
                                // remove the effect
                                // NOTE: the entity wiggle will happen in the 
                                // change:health callback
                                d3.select(this).remove();
                            });
                    }

                    // do the effect
                    renderEffect();

                    // TODO: Don't do this here - listen for change or use ability
                    // event, some sort of event where we can render it without
                    // relying on ticks existing
                    var curTick = 0;
                    if(selectedAbility.attributes.ticks){
                        while(curTick < selectedAbility.attributes.ticks){
                            new Timer(
                                renderEffect,
                                (selectedAbility.attributes.tickDuration * 1000) * (curTick + 1)
                            );
                            curTick += 1;
                        }
                    }
                }


                // Move the entity that used the ability forward
                // --------------------------
                // only move the entity if it's not selected by the player
                if(this.selectedEntity !== sourceEntity && sourceEntity.get('isAlive')){
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
            // TODO : pass in index and whatnot
            //
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

            // Flash screen
            // --------------------------
            if(group === 'player'){
                // Only flash for player entity deaths
                this.$deathEffectBlocker.transition()
                    .ease('elastic')
                    .style({ fill: '#dd0000', opacity: 1 })
                    .transition()
                    .ease('linear')
                        .style({ fill: '', opacity: 0 });
            } else {
                // TODO: play a sound or show some effect when enemy dies
            }

            // update timer / sprites
            // --------------------------
            // Stop transition, reset timer width to 0
            // stop bars
            d3.select(this[group + 'TimerBars'][0][index])
                .transition()
                .duration(100)
                .attr({ width: 0 });

            // flip entity
            d3.select(this[group + 'EntitySprites'][0][index])
                .transition()
                // NOTE: TODO: should have a small delay. NOTE: If another
                // transition happens after this, this may get cancelled out
                // (e.g., if in useAbility() a transitions occurs it would
                // cancel this one)
                .delay(100)
                .duration(500)
                .attr({
                    transform: function(){
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
