// ===========================================================================
//
// Page Create Character
// 
// ===========================================================================
define(
    [ 
        'd3', 'backbone', 'marionette',
        'logger', 'events',

        'views/create/RaceList',
        'collections/Races'
    ], function viewPageCreateCharacter(
        d3, backbone, marionette, 
        logger, events,

        RaceList,
        Races
    ){

    var PageCreateCharacter = Backbone.Marionette.Layout.extend({
        template: '#template-page-create-character',
        'className': 'page-create-character-wrapper',
        regions: {
            'regionRaceList': '#region-create-races'
        },

        events: {
            'click .race-list-item .item': 'raceClicked'
        },

        initialize: function initialize(options){
            // initialize:
            logger.log('views/PageCreateCharacter', 'initialize() called');
            return this;
        },

        onShow: function homeOnShow(){
            logger.log('views/PageCreateCharacter', 'onShow called');

            // show regions
            // TODO: how to handle race collection?
            this.raceListView = new RaceList({
                collection: new Races()
            });

            this.regionRaceList.show(this.raceListView);
            return this;
        },
        // ------------------------------
        // TODO: how to handle new views?
        // ------------------------------

        // ------------------------------
        //
        // User Interaction
        //
        // ------------------------------
        raceClicked: function raceClicked(e){
            console.log(">>>>>>>>>>>>>>", e);
        }
    });

    return PageCreateCharacter;
});
