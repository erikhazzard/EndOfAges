// ===========================================================================
//
// Page Create Character
// 
// ===========================================================================
define(
    [ 
        'd3', 'backbone', 'marionette',
        'logger', 'events',

        'util/generateName',

        'views/create/RaceList',
        'collections/Races',

        'views/create/ClassList',
        'collections/Classes'

    ], function viewPageCreateCharacter(
        d3, backbone, marionette, 
        logger, events,

        generateName,

        RaceList,
        Races,

        ClassList,
        Classes
    ){

    var PageCreateCharacter = Backbone.Marionette.Layout.extend({
        template: '#template-page-create-character',
        'className': 'page-create-character-wrapper',
        regions: {
            'regionRaceList': '#region-create-races',
            'regionClassList': '#region-create-classes'
        },

        // UI events
        events: {
            'click .race-list-item .item': 'raceClicked',
            'click .class-list-item .item': 'classClicked',

            'click .btn-previous': 'previousClicked',
            'click .btn-next': 'nextClicked',

            // generate name
            'click .btn-generate-name': 'generateNewName'
        },

        initialize: function initialize(options){
            // initialize:
            logger.log('views/PageCreateCharacter', 'initialize() called');
            this.races = new Races();
            this.classes = new Classes();

            // state for the create process - race or class
            // NOTE: could use a FSM here, but this is simple enough - just two
            // possible states
            this.createState = 0;
            // possible states
            this.createStates = ['race', 'class'];

            // keep track of the first race click
            this._firstRaceClick = true;

            this.listenTo(this.model, 'change:race', this.updateCharacterDisplay);
            this.listenTo(this.model, 'change:class', this.updateCharacterDisplay);
            return this;
        },

        // ------------------------------
        //
        // UTIL
        //
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
        //
        // Close / Show
        //
        // ------------------------------
        onBeforeClose: function onBeforeClose(){
            // get rid of the element cache
            delete this._elCache;
            return this;
        },

        onShow: function homeOnShow(){
            logger.log('views/PageCreateCharacter', 'onShow called');

            // remove existing el cache
            delete this._elCache;

            // Generate a random name
            this.getSelector('.input-character-name', this.$el).attr({
                placeholder: generateName()
            });

            // show regions
            // TODO: how to handle race collection?
            this.raceListView = new RaceList({
                collection: this.races
            });
            this.classListView = new ClassList({
                collection: this.classes
            });

            this.regionRaceList.show(this.raceListView);
            this.regionClassList.show(this.classListView);

            return this;
        },

        // ------------------------------
        //
        // Update / Rerender elements
        //
        // ------------------------------
        updateCharacterDisplay: function updateCharacterDisplay(){
            // Updates the main display area whenever the race or class
            // changes. 
            //
            // TODO: Could have a better way to handle this, e.g., view for
            // each race / class. Update after figuring out what to display
            var race = this.model.get('race');
            var entityClass = this.model.get('class');

            // RACE related
            // --------------------------
            this.getSelector('.race-name').html(race.get('name'));
            this.getSelector('.race-description').html(race.get('description'));

            // race charts
            // TODO: show bar charts
            this.getSelector('.race-viz-wrapper').html(
                JSON.stringify(race.get('baseStats'))
            );

            // CLASS related
            // --------------------------
            if(entityClass){
                this.getSelector('.class-name').html(entityClass.get('name'));
                this.getSelector('.class-description').html(entityClass.get('description'));
            }

            return this;
        },

        // ------------------------------
        //
        // State Functions
        //
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

            // Check for FINISH state
            if(targetState > this.createStates.length - 1){ 
                // TODO: show an in app prompt
                // If done, show the game and pass in the entities
                events.trigger('controller:showGame');

                targetState = this.createStates.length - 1; 
            }

            // set the state index
            this.createState = targetState;

            logger.log('views/PageCreateCharacter', 'current state: %O | %O',
                this.createState, this.createStates[this.createState]);

            // show corresponding lists, hide button states
            if(this.createStates[this.createState] === 'race'){
                // ----------------------
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
                // ----------------------
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
        // Nav / State Buttons
        // ------------------------------
        previousClicked: function previousClicked(e){
            e.preventDefault(); e.stopPropagation();

            logger.log('views/PageCreateCharacter', 'previousClicked() called');
            this.changeState('previous');
        },
        nextClicked: function nextClicked(e){
            e.preventDefault(); e.stopPropagation();

            logger.log('views/PageCreateCharacter', 'nextClicked() called');
            this.changeState('next');
        },

        generateNewName: function generateNewName(){
            // Generate a random name
            this.getSelector('.input-character-name', this.$el).val(
                generateName()
            );

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

            // get race from clicked element
            var cid = $(e.target).attr('data-race-cid');
            var raceModel = this.races.get(cid); 

            // update the entity sprite
            // TODO: use a more robust sprite system, allow for differences
            //   in classes 
            this.model.set({ sprite: raceModel.get('sprite') });

            // Generate a random name
            this.getSelector('.input-character-name', this.$el).attr({
                placeholder: generateName()
            });

            // add / remove active class on list item
            this.getSelector('.races-list .item').removeClass('active');
            $(e.target).addClass('active');

            // update model
            this.model.set({ race: raceModel });

            // remove blur / disable on the next button
            this.getSelector('.btn-next').removeClass('blur');

            // remove the initial blur on the main character area
            this.getSelector('#create-character-display-wrapper').removeClass('blur');

            // Go to the next state (select class) automatically the FIRST
            // time the race is selected
            if(this._firstRaceClick){ 
                //this.changeState('next'); 
                this._firstRaceClick = false;
            }

            return this;
        },

        classClicked: function classClicked(e){
            // Similar to race clicked, but fires when a class item is clicked
            logger.log('views/PageCreateCharacter', 'classClicked() called');
            e.preventDefault(); e.stopPropagation();

            // get race from clicked element
            var cid = $(e.target).attr('data-class-cid');
            var classModel = this.classes.get(cid); 

            // add / remove active class on list item
            this.getSelector('.class-list .item').removeClass('active');
            $(e.target).addClass('active');

            // update model
            this.model.set({ 'class' : classModel });

            // remove blur / disable on the next button
            this.getSelector('.btn-next').removeClass('blur');

            // Update abilities based on class
            // TODO: hide abilities that haven't been unlocked? 
            // ... game design task
            var abilities = classModel.get('abilities');
            this.model.set({ abilities: abilities });

            // TODO: view for abilities. use a region
            this.getSelector('.abilities-wrapper').html(
                JSON.stringify(abilities)
            );

            return this;
        }
    });

    return PageCreateCharacter;
});
