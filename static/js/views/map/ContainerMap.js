// ===========================================================================
//
// Page Map
//
//      Containing view for the map page
//
// ===========================================================================
define(
    [ 
        'd3', 'backbone', 'marionette',
        'logger', 'events',
        'models/Map',
        'views/map/Map',
        'views/map/PartyMembers',
        'views/map/EntityInfo'
    ], function viewMap(
        d3, backbone, marionette, 
        logger, events,
        Map,

        // Views
        // ------------------------------
        MapView,
        PartyMembersView,
        EntityInfoView
    ){

    // ----------------------------------
    //
    // Map view
    //
    // ----------------------------------
    var ContainerMap = Backbone.Marionette.Layout.extend({
        template: '#template-game-container-map',
        events: { 
            'click #map-wrapper': 'mapWrapperClick'
        },

        'className': 'game-map-wrapper',
        regions: {
            regionMapView:  '#region-map-map',
            regionPartyMembers:  '#region-map-party-members',
            regionEntityInfo: '#region-map-entity-info'
        },

        initialize: function mapViewInitialize(options){
            // initialize:
            var self = this;

            // MAP - map itself
            // --------------------------
            // TODO: get model
            this.mapModel = new Map({});
            // TODO: Get map model from game.
            this.mapModel.generateMap();

            this.model.set({ map: this.mapModel });

            this.viewMap = new MapView({
                model: this.mapModel,
                gameModel: this.model
            }); 

            // Map interaction events
            this.listenTo(events, 'map:showEntityInfo', this.showEntityInfo);

            // Party members
            // --------------------------
            this.viewPartyMembers = new PartyMembersView({
                collection: this.model.attributes.playerEntities
            });

            this.entityInfoView = new EntityInfoView({});
            logger.log('views/map/ContainerMap',
                'Player entities: %O', 
                this.model.attributes.playerEntities);

            // Handle escape key to close entity info
            // --------------------------
            this.listenTo(events, 'keyPress:escape', this.keyEscapePressed);
            return this;
        },

        onShow: function mapViewOnShow(){
            var self = this;

            this.regionMapView.show(this.viewMap);
            this.regionPartyMembers.show(this.viewPartyMembers);
            return this;
        },

        // ==============================
        // Interaction callbacks
        // ==============================
        showEntityInfo: function mapShowEntityInfo(options){
            // Called when an entity from the player list on the left side is 
            // clicked
            logger.log('views/map/ContainerMap',
                'showEntityInfo() called : %O', options);
            var self = this;

            // If the same entity was selected, do nothing
            if(this.entityInfoView.model && this.entityInfoView.model === options.entity){

            } else {
                // Different entity was selected
                this.entityInfoView.model = options.entity;

                self.regionEntityInfo.show(self.entityInfoView);
                $('.member-inner', this.regionEntityInfo.$el).addClass('hidden');

                setTimeout(function(){
                    $('.member-inner', self.regionEntityInfo.$el).removeClass('hidden');
                }, 150);
            }

            // Show the entity info div
            if(this.regionEntityInfo.$el){
                this.regionEntityInfo.$el.removeClass('off-screen');

                // add the box shadow after the shown animation
                setTimeout(function(){
                    self.regionEntityInfo.$el.addClass('box-shadow');
                    // duration matches css time
                }, 300);
            }

            return this;
        },

        hideEntityInfo: function hideEntityInfo(){
            $('#map-wrapper').off('click', this.hideEntityInfo);
            this.regionEntityInfo.$el.removeClass('box-shadow');
            this.regionEntityInfo.$el.addClass('off-screen');
            return this;
        },

        // Map wrapper interaction
        mapWrapperClick: function mapWrapperClick(){
            // if the map wrapper was clicked and the entity info window is
            // open, close the entity info
            if(!this.regionEntityInfo.$el.hasClass('off-screen')){
                return this.hideEntityInfo();
            } else {
                return this;
            }
        },

        // ------------------------------
        // Keyboard shortcuts
        // ------------------------------
        keyEscapePressed: function(options){
            if(!this.regionEntityInfo.$el.hasClass('off-screen')){
                if(options.e){ options.e.preventDefault(); }
                return this.hideEntityInfo();
            }
        }

    });

    return ContainerMap;
});
