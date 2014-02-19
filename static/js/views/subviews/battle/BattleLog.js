// ============================================================================
//
// BattleLog
//
//      Logs all battle related actions
//
// ============================================================================
define(
    [ 
        'd3', 'backbone', 'marionette', 'logger', 'events'
    ], function viewBattle(
        d3, backbone, marionette, logger, events
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
                    self.listenTo(model.get('attributes'), 'change:health', function(attrsModel, health, options){
                        // add the log
                        self.addLog.call(self, {
                            attrsModel: attrsModel, 
                            model: model,
                            health: health, 
                            options: options
                        });
                    });
                });
            });

            return this;
        },
        onShow: function(){
            this.$log = $('#battle-log', this.$el);
            return this;
        },

        addLog: function addLog(options){
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
            this.$log.append(Backbone.Marionette.TemplateCache.get('#template-game-battle-log-item')({
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
        }

        
    });
    return BattleLogView;
});
