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
            this.races = new Races();

            this.listenTo(this.model, 'change:race', this.updateCharacterDisplay);
            return this;
        },

        onShow: function homeOnShow(){
            logger.log('views/PageCreateCharacter', 'onShow called');

            // show regions
            // TODO: how to handle race collection?
            this.raceListView = new RaceList({
                collection: this.races
            });

            this.regionRaceList.show(this.raceListView);
            return this;
        },

        updateCharacterDisplay: function updateCharacterDisplay(){
            // Updates the main display area whenever the race or class
            // changes. 
            // TODO: Could have a better way to handle this, e.g., view for
            // each race / class. Update after figuring out what to display
            var race = this.model.get('race');

            // RACE related
            // --------------------------
            $('.race-name', this.$el).html(race.get('name'));
            $('.race-description', this.$el).html(race.get('description'));

            return this;
        },

        // ------------------------------
        // List related functions
        // ------------------------------
        showList: function showList(list){
            // Shows the corresponding race or class list
            // params: list {String} either 'race' or 'class'
            if(list === 'class'){
                $('#create-races', this.$el).addClass('list-hidden');
                $('#create-classes', this.$el).removeClass('list-hidden');
            } else {
                // show race list
            }
            return this;
        },

        // ------------------------------
        //
        // User Interaction
        //
        // ------------------------------
        raceClicked: function raceClicked(e){
            // When a race item is clicked from the race list, update the model,
            // which updates the display, then update the list to show the classes
            // Get the race model
            e.preventDefault(); e.stopPropagation();

            var cid = $(e.target).attr('data-race-cid');
            var raceModel = this.races.get(cid); 

            this.model.set({ race: raceModel });

            // show classes
            this.showList('class');
            return this;
        }
    });

    return PageCreateCharacter;
});
