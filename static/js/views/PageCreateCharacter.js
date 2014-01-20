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

        // UI events
        events: {
            'click .race-list-item .item': 'raceClicked',
            'click .btn-previous': 'previousClicked',
            'click .btn-next': 'nextClicked'
        },

        initialize: function initialize(options){
            // initialize:
            logger.log('views/PageCreateCharacter', 'initialize() called');
            this.races = new Races();

            // state for the create process - race or class
            // NOTE: could use a FSM here, but this is simple enough - just two
            // possible states
            this.createState = 0;
            // possible states
            this.createStates = ['race', 'class'];

            this.listenTo(this.model, 'change:race', this.updateCharacterDisplay);
            return this;
        },

        // ------------------------------
        // UTIL
        // ------------------------------
        getSelector: function getSelector(selector){
            // takes in a selector and returns the element(s) that belong
            // to `this` $el. Uses a cache to avoid dom hits
            var sel;
            if(this._elCache === undefined){ this._elCache = {}; }

            if(this._elCache[selector]){ 
                // in cache, return it
                sel = this._elCache[selector];
            }
            else {
                // not in cache
                sel = $(selector, this.$el);
                this._elCache[selector] = sel;
            }

            return sel;
        },


        // ------------------------------
        // Close / Show
        // ------------------------------
        onBeforeClose: function onBeforeClose(){
            // get rid of the element cache
            delete this._elCache;
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
        changeState: function changeState(state){
            // Shows the corresponding race or class list
            // params: state {String} either 'next' or 'previous'
            //
            // TODO: TODO:  After figuring out what will happen, rewrite
            // this logic to handle it
            //
            //
            logger.log('views/PageCreateCharacter', 'changeState() called : %O',
                state);

            // Allow 'next' or 'previous' to change the currently selected 
            // state, either go forward or backward between states
            var targetState = this.createState;
            if(state === 'next'){ targetState += 1; }
            else if(state === 'previous'){ targetState -= 1; }

            // make sure state doesn't fall outside of state bounds
            if(targetState < 0){ targetState = 0; }
            else if(targetState > this.createStates.length - 1){ 
                targetState = this.createStates.length - 1; 
            }
            // set the state index
            this.createState = targetState;

            logger.log('views/PageCreateCharacter', 'current state: %O | %O',
                this.createState, this.createStates[this.createState]);

            // show corresponding lists, hide button states
            if(this.createStates[this.createState] === 'race'){
                // RACE
                // ----------------------
                // button
                this.getSelector('.btn-previous').addClass('blur');
                this.getSelector('.btn-next').removeClass('blur');
                this.getSelector('.btn-next').html('Next');

                // list stuff
                this.getSelector('#create-races').removeClass('list-hidden');
                this.getSelector('#create-classes').addClass('list-hidden');

            } else if(this.createStates[this.createState] === 'class'){
                // CLASS
                // ----------------------
                // button
                this.getSelector('.btn-previous').removeClass('blur');

                // if a class has already been selected, the user CAN move on
                if(this.model.get('class')){
                    this.getSelector('.btn-next').removeClass('blur');
                    this.getSelector('.btn-next').html('Finish');
                } else {
                    // otherwise, they need to select a class
                    this.getSelector('.btn-next').addClass('blur');
                }

                // list stuff
                this.getSelector('#create-races').addClass('list-hidden');
                this.getSelector('#create-classes').removeClass('list-hidden');
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
            logger.log('views/PageCreateCharacter', 'raceClicked() called');
            e.preventDefault(); e.stopPropagation();

            var cid = $(e.target).attr('data-race-cid');
            var raceModel = this.races.get(cid); 

            this.model.set({ race: raceModel });
            // can continue
            this.getSelector('.btn-next').removeClass('blur');

            return this;
        },

        // Nav / State Buttons
        previousClicked: function(e){
            e.preventDefault(); e.stopPropagation();

            logger.log('views/PageCreateCharacter', 'previousClicked() called');
            this.changeState('previous');
        },
        nextClicked: function(e){
            e.preventDefault(); e.stopPropagation();

            logger.log('views/PageCreateCharacter', 'nextClicked() called');
            this.changeState('next');
        }

    });

    return PageCreateCharacter;
});
