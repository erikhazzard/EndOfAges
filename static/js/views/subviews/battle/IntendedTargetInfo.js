// ===========================================================================
//
// Battle - Entity info subview
//      Entity battle related info (health, magic, timer, etc) 
//
// ===========================================================================
define(
    [ 
        'd3', 'backbone', 'marionette', 'logger', 'events'
    ], function viewBattleAbility(
        d3, backbone, marionette, logger, events
    ){

    var Entity = Backbone.Marionette.Layout.extend({
        template: '#template-game-battle-intended-target-info',
        'className': 'intendedTargetInfoWrapper',

        initialize: function(){
            logger.log('views/subviews/battle/IntendedTaretInfo', 
                'initialize called');

            this.listenTo(this.model.get('attributes'), 'change', this.render);
            this.listenTo(this.model.get('baseAttributes'), 'change', this.render);
            return this;
        }
    });

    return Entity;
});
