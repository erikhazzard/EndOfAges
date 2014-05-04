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
        'views/map/PartyMembers'
    ], function viewMap(
        d3, backbone, marionette, 
        logger, events,
        Map,

        // Views
        // ------------------------------
        MapView,
        PartyMembersView
    ){

    // ----------------------------------
    //
    // Map view
    //
    // ----------------------------------
    var ContainerMap = Backbone.Marionette.Layout.extend({
        template: '#template-game-container-map',
        events: { },
        'className': 'game-map-wrapper',
        regions: {
            regionMapView:  '#region-map-map',
            regionPartyMembers:  '#region-map-party-members'
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


            // Party members
            // --------------------------
            this.viewPartyMembers = new PartyMembersView({
                collection: this.model.attributes.playerEntities
            });

            return this;
        },

        onShow: function mapViewOnShow(){
            var self = this;

            this.regionMapView.show(this.viewMap);
            this.regionPartyMembers.show(this.viewPartyMembers);
            return this;
        }
    });

    return ContainerMap;
});
