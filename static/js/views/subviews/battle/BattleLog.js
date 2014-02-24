// ============================================================================
//
// BattleLog
//
//      Logs all battle related actions
//
// ============================================================================
define(
    [ 
        'd3', 'backbone', 'marionette', 'logger', 'events',
        'util/Timer'
    ], function viewBattle(
        d3, backbone, marionette, logger, events, Timer
    ){
    // =======================================================================
    var BattleLogView = Backbone.Marionette.Layout.extend({
        // This will use the existing battle-log element
        template: '#template-game-battle-log',
        'className': 'battle-log-container',

        initialize: function battleLogViewInitialize(options){
            var self = this;
            logger.log('views/subviews/battle/BattleLog',
                'battleLog initialized');

            // --------------------------
            // Setup event listens to log
            // --------------------------
            _.each([
                this.model.get('playerEntities'),
                this.model.get('enemyEntities')
            ], function(group){
                _.each(group.models, function(model){
                    // HEALTH Changes 
                    // ------------------
                    self.listenTo(model.get('attributes'), 'change:health', function(attrsModel, health, options){
                        // add the log
                        self.addHealthLog.call(self, {
                            attrsModel: attrsModel, 
                            model: model,
                            health: health, 
                            options: options
                        });
                    });

                    // Life changes
                    // ------------------
                    self.listenTo(model, 'change:isAlive', function(attrsModel, isAlive, options){
                        // add the log after a smal delay so health callback
                        // fires first
                        new Timer( function(){ 
                            self.addDeathLog.call(self, {
                                model: model,
                                isAlive: isAlive, 
                                options: options
                            });
                        }, 300);
                    });

                    // Buff Changes 
                    // ------------------
                    self.listenTo(model, 'change:activeEffects', function(attrsModel, effects, options){
                        // add the log
                        self.addEffectLog.call(self, {
                            model: model,
                            effects: effects,
                            options: options
                        });
                    });
                });
            });

            // --------------------------
            // Also, listen for manual log messages
            // --------------------------
            this.listenTo(this.model, 'logMessage', this.addManualLog);

            return this;
        },
        onShow: function(){
            this.$log = $('#battle-log', this.$el);
            return this;
        },

        // ==============================
        //
        // Logging funcs
        //
        // ==============================
        addHealthLog: function addHealthLog(options){
            // Called whenever health changes
            //
            options = options || {};
            
            // get health change
            // --------------------------
            var healthDifference = options.health - options.attrsModel._previousAttributes.health;

            // Get target and source info
            // --------------------------
            var targetIsPlayer = true;
            var sourceIsPlayer = true;

            // determine if target and source are player models
            if(options.model.collection !== this.model.get('playerEntities')){
                targetIsPlayer = false;
            }
            if(options.options.source.collection !== this.model.get('playerEntities')){
                sourceIsPlayer = false;
            }

            // update the log
            // --------------------------
            this.$log.append(Backbone.Marionette.TemplateCache.get('#template-game-battle-log-health-item')({
                d3: d3,
                target: options.model,
                source: options.options.source,
                ability: options.options.sourceAbility,

                healthDifference: healthDifference,
                targetIsPlayer: targetIsPlayer,
                sourceIsPlayer: sourceIsPlayer
            }));

            // scroll to bottom
            this.$log[0].scrollTop = this.$log[0].scrollHeight;

            return this;
        },

        // ==============================
        //
        // Effects Log
        //
        // ==============================
        addEffectLog: function addEffectLog(options){
            // Called whenever health changes
            //
            options = options || {};
            
            // Get target and source info
            // --------------------------
            var targetIsPlayer = true;
            var sourceIsPlayer = true;

            // if there are no options given, it means the entity has died
            // and all buffs have been removed - no need to log it
            if(!options.options.source || !options.options.sourceAbility){
                return false;
            }

            // determine if target and source are player models
            if(options.model.collection !== this.model.get('playerEntities')){
                targetIsPlayer = false;
            }
            if(options.options.source.collection !== this.model.get('playerEntities')){
                sourceIsPlayer = false;
            }

            // update the log
            // --------------------------
            this.$log.append(Backbone.Marionette.TemplateCache.get('#template-game-battle-log-effect-item')({
                d3: d3,
                target: options.model,
                source: options.options.source,
                ability: options.options.sourceAbility,

                targetIsPlayer: targetIsPlayer,
                sourceIsPlayer: sourceIsPlayer,

                type: options.options.type
            }));

            // scroll to bottom
            this.$log[0].scrollTop = this.$log[0].scrollHeight;

            return this;
        },

        // ------------------------------
        // entity died / res'ed
        // ------------------------------
        addDeathLog: function addDeathLog(options){
            var message = options.message;

            // Get target and source info
            // --------------------------
            var targetIsPlayer = true;
            var sourceIsPlayer = true;

            // if there are no options given, it means the entity has died
            // and all buffs have been removed - no need to log it
            if(!options.options.source || !options.options.sourceAbility){
                return false;
            }

            // determine if target and source are player models
            if(options.model.collection !== this.model.get('playerEntities')){
                targetIsPlayer = false;
            }
            if(options.options.source.collection !== this.model.get('playerEntities')){
                sourceIsPlayer = false;
            }


            // update the log
            // --------------------------
            this.$log.append(Backbone.Marionette.TemplateCache.get('#template-game-battle-log-death-item')({
                d3: d3,
                target: options.model,
                isAlive: options.isAlive,
                source: options.options.source,
                ability: options.options.sourceAbility,

                targetIsPlayer: targetIsPlayer,
                sourceIsPlayer: sourceIsPlayer
            }));

            // scroll to bottom
            this.$log[0].scrollTop = this.$log[0].scrollHeight;

            return this;
        },

        // ------------------------------
        // Add a manual log message
        // ------------------------------
        addManualLog: function addManualLog(options){
            var message = options.message;

            // update the log
            // --------------------------
            this.$log.append(Backbone.Marionette.TemplateCache.get('#template-game-battle-log-item-manual')({
                message: message
            }));

            // scroll to bottom
            this.$log[0].scrollTop = this.$log[0].scrollHeight;
        }

        
    });
    return BattleLogView;
});
