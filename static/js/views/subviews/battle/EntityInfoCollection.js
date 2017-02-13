// ===========================================================================
//
// Player Entity Info collection view
// 
// ===========================================================================
define(
    [ 
        'd3', 'backbone', 'marionette',
        'logger', 'events',
        'views/subviews/battle/PlayerEntityInfo'
    ], function(
        d3, Backbone, Marionette, 
        logger, events,
        PlayerEntityInfo
    ){

    var PlayerEntitiesInfo = Backbone.Marionette.CompositeView.extend({
        itemView: PlayerEntityInfo,
        itemViewContainer: '.members',
        template: '#template-game-battle-player-entities',
        id: 'map-party-wrapper',

        initialize: function(){
            logger.log('views/subviews/battle/EntityInfoCollection',
                'PlayerEntitiesInfo collection initialized: %O | collection: %O',
                this,
                this.collection);

            return this;
        },
        
        setSelectedEntityView: function setSelectedEntityView(model){
            logger.log('views/subviews/battle/EntityInfoCollection:setSelectedEntityView', 'called', model);
            // Called whenever the selected entity changes. Takes in a model
            // and adds a class to the corresponding view
            $('.entity-selected', this.$el).removeClass('entity-selected');

            // update the set model view
            $(this.children.findByModelCid(model.cid).$el).addClass('entity-selected');

            return this;
        }
    });

    return PlayerEntitiesInfo;
});
