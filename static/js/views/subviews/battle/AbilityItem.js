// ===========================================================================
//
// Battle - Ability Item subview
//      View for an ability list
//
//  Shows the available abilities for an entity
//
//  TODO: timerFactor (for haste / slow downs)
//
// ===========================================================================
define(
    [ 
        'd3', 'backbone', 'marionette', 'logger', 'events'
    ], function viewBattleAbility(
        d3, backbone, marionette, logger, events
    ){

    var AbilityItem = Backbone.Marionette.ItemView.extend({
        template: '#template-game-battle-ability',
        'className': 'ability-item-wrapper inactive',

        serializeData: function(){
            return _.extend({
                cid: this.model.cid,
                index: this.index
            }, this.model.toJSON());
        },

        // When this element is interaction with, use the corresponding
        // ability
        events: {
            'click': 'useAbility',
            'touchend': 'useAbility'
        },

        initialize: function battleViewInitialize(options){
            var self = this;
            logger.log('views/subviews/battle/AbilityItem', 
                'initialize() called for: ' + this.model.get('name'));

            // index is the index of this itemview in the collection
            this.index = options.index;

            // TODO: use a hotkey configuration instead of hardcoding
            //
            // TODO: This should really be handled in Battle, most likely, not
            // here...
            //
            var key = [ 'q', 'w', 'e', 'r'][this.index];
            // do the same thing, but also if user holds shift
            var keyShift = [ 'shift+q', 'shift+w', 'shift+e', 'shift+r'][this.index];

            // handle keypress
            this.listenTo(events, 'keyPress:' + key, this.useAbility);
            this.listenTo(events, 'keyPress:' + keyShift, this.useAbility);

            // handle battle related events
            this.listenTo(events, 'ability:cancel', this.cancelAbility);
            this.listenTo(events, 'ability:wasUsed', this.abilityWasUsed);

            this.listenTo(this.model, 'abilityInvalidUse', this.abilityInvalidUse);

            this.listenTo(this.model, 'abilityActive', this.setAbilityActive);
            this.listenTo(this.model, 'abilityInactive', this.setAbilityInactive);

            return this;
        },

        cancelAbility: function(options){
            // called when the user pressed 'escape' or the ability cannot
            // be used (trigged in the Battle controller view)
            this.$el.removeClass('use');
            return this;
        },

        onShow: function(){
            // add class based on targets
            if(this.model.attributes.validTargets.indexOf('enemy') > -1){
                this.$el.addClass('enemy');
            }
            if(this.model.attributes.validTargets.indexOf('player') > -1){
                this.$el.addClass('player');
            }

            this.$abilityIconOverlay = $('.ability-icon-overlay', this.$el);
            this.$abilityIconCanvas = $('.ability-icon-canvas', this.$el);
            this.abilityIconCanvasCtx = this.$abilityIconCanvas[0].getContext('2d');

            this.$el.removeClass('usable');
            this.updateIconOverlay({});
            return this;
        },

        // ------------------------------
        // timer updates
        // ------------------------------
        setAbilityActive: function(){
            this.$el.removeClass('inactive');
            this.$el.addClass('active');
            clearTimeout( this.overlayTimeout );

            // clear out any overlay immediately
            var canvas = this.$abilityIconCanvas;
            var ctx = this.abilityIconCanvasCtx;
            var maxWidth = this.$abilityIconCanvas.width();
            setTimeout(function(){requestAnimationFrame(function(){
                ctx.clearRect(0, 0, maxWidth, maxWidth);
            }); }, 20);
        },

        setAbilityInactive: function(){
            this.$el.removeClass('active');
            this.$el.addClass('inactive');
        },

        updateIconOverlay: function ( options ){
            // Updates the usable overlay for the icons
            options = options || {};
            clearTimeout( this.overlayTimeout );

            logger.log('views:subviews:battle:AbilityItem:updateIconOverlay',
            'called - updating overlay');

            var self = this;
            var $el = this.$el;
            var canvas = this.$abilityIconCanvas;
            var ctx = this.abilityIconCanvasCtx;

            var maxWidth = this.$abilityIconCanvas.width();
            var fillStyle = 'rgba(20,20,20,0.97)';

            // Draw background
            ctx.fillStyle = fillStyle;
            //ctx.fillRect(0,0,0,maxWidth);

            var i = 0;
            var timeLimit = +this.model.attributes.timeCost;

            var entityTimer = 0;
            if(window._BATTLE[options.selectedEntityGroup + 'EntityTimers']){
                entityTimer = window._BATTLE[
                    options.selectedEntityGroup + 'EntityTimers'][
                    options.selectedEntityIndex
                ];
            }

            // If the timer is >= the time limit, it means the player CAN
            // use the ability and it's already full, so do nothing
            if(entityTimer >= timeLimit){
                logger.log('views:subviews:battle:AbilityItem:updateIconOverlay:canUse',
                'playerTime exceeds ability timelimit %O', self.model);
                return false;
            }

            var start = Date.now();

            function drawOverlay(){
                // Draws the overlay over each icon

                // get time factor (e.g., haste / slows). this is gnarly.
                // we need to get the timerfactor for the
                // currently select entity. we can't really just cache it
                // because it may change during each tick (e.g., if the
                // entity gets debuffed or buffed by another entity)
                var timeFactor = 1;
                if(window._BATTLE.model.attributes &&
                    window._BATTLE.model.attributes[options.selectedEntityGroup + 'Entities']
                ){
                    timeFactor = window._BATTLE.model.attributes[
                        options.selectedEntityGroup + 'Entities'].models[
                        options.selectedEntityIndex
                        ].attributes.attributes.attributes.timerFactor;
                }

                var secs = entityTimer + (((Date.now() - start) / 1000) * timeFactor);
                secs = secs < 0 ? 0 : secs;

                var targetWidth = maxWidth * (secs / timeLimit);
                i = targetWidth;

                if(i >= maxWidth){
                    logger.log('views:subviews:battle:AbilityItem:updateIconOverlay:loaded',
                    'ability can be used %O | %O %O', self.model.attributes, i, maxWidth);
                    return false;
                }

                // clear everything
                ctx.clearRect(0, 0, maxWidth, maxWidth);

                // draw overlay
                ctx.fillStyle = fillStyle;
                ctx.fillRect(0, 0, maxWidth, maxWidth);

                // draw line
                ctx.beginPath();
                ctx.moveTo(i, 0);
                ctx.lineTo(i, maxWidth);
                ctx.lineWidth = 3;
                ctx.strokeStyle = "rgba(94, 240, 240, 1.0)";
                ctx.stroke();

                // clear visible area
                ctx.clearRect(0, 0, i, maxWidth);

                self.overlayTimeout = setTimeout( drawOverlay );
            }

            requestAnimationFrame(drawOverlay);
        },

        abilityInvalidUse: function(){
            var self = this;
            self.$abilityIconOverlay.addClass('used-invalid');
            self.$abilityIconOverlay.addClass('invalid');
            self.$el.addClass('shake shake-constant');
            setTimeout(function(){
                self.$abilityIconOverlay.removeClass('used-invalid');
                self.$el.removeClass('shake shake-constant');
            }, 140);
        },

        abilityWasUsed: function( options ){
            // reset timer bars
            this.updateIconOverlay( options );
            return this;
        },

        // ------------------------------
        //
        // Use ability
        //
        // ------------------------------
        useAbility: function(options){
            // Called when either the user clicks on the ability or presses the
            // hotkey. If the ability can't be used yet, do nothing
            // TODO: global timer? for each entity? pass in entity for this
            // ability?
            var self = this;
            logger.log('views:subviews:battle:AbilityItem:useAbility',
                'ability used! ' + this.model.get('name') +
                ' | key pressed: ' + options.key);

            self._lastUseAbilityCallTime = Date.now();

            events.trigger('ability:activated', {
                ability: this.model,

                useCallback: function(err, opts){
                    // This callback is called immediately upon ability
                    // usage. If it can be used, color it green; otherwise,
                    // color it grey
                    var canBeUsed = opts.canBeUsed;

                    // Can the ability be used? If not, add the use-invalid class
                    if(canBeUsed){
                        // CAN use
                        logger.log('views:subviews:battle:AbilityItem:useAbility:canUse',
                        'can be used, showing animation and triggering ability:wasUsed');

                        // let other abilities know an ability was used
                        // ------------
                        events.trigger('ability:wasUsed', opts);

                        // UI FEEDBACK
                        // ------------
                        if(Date.now() - self._lastUseAbilityCallTime < 140){
                            // Avoid adding / removing classes too often
                            return false;
                        }
                        self._lastUseAbilityCallTime = Date.now();

                        // update classes
                        self.$abilityIconOverlay.addClass('used-success');
                        self.$el.addClass('animated shrink');

                        setTimeout(function(){
                            self.$abilityIconOverlay.removeClass('used-success');
                            self.$el.removeClass('animated shrink');
                        }, 140);

                    } else {
                        // Can NOT be used
                        logger.log('views:subviews:battle:AbilityItem:useAbility:canNOTUse',
                        'can NOT be used, showing animation and triggering ability:wasUsed');

                        // Avoid adding / removing classes too often
                        if(Date.now() - self._lastUseAbilityCallTime < 140){
                            return false;
                        }
                        self._lastUseAbilityCallTime = Date.now();

                        self.$abilityIconOverlay.addClass('used-invalid');
                        self.$abilityIconOverlay.addClass('invalid');
                        self.$el.addClass('shake shake-constant');

                        setTimeout(function(){
                            self.$abilityIconOverlay.removeClass('used-invalid');
                            self.$el.removeClass('shake shake-constant');
                        }, 140);
                    }
                }
            });

            return this;
        }

    });

    return AbilityItem;
});
