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
        'collections/Classes',

        'views/create/AbilityList'

    ], function viewPageCreateCharacter(
        d3, backbone, marionette, 
        logger, events,

        generateName,

        RaceList,
        Races,

        ClassList,
        Classes,

        AbilityList
    ){

    var PageCreateCharacter = Backbone.Marionette.Layout.extend({
        template: '#template-page-create-character',
        'className': 'page-create-character-wrapper',
        regions: {
            'regionRaceList': '#region-create-races',
            'regionClassList': '#region-create-classes',
            'regionAbilityList': '#region-create-abilities'
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

            // TODO: if entity already has a race or class, trigger the
            // event to show it
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
                // FINISHED
                // ----------------------
                return this.finishProcess();
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
        // ==============================
        //
        // Race
        //
        // ==============================
        raceClicked: function raceClicked(e){
            // When a race item is clicked from the race list, update the model,
            // which updates the display, then update the list to show the classes
            // Get the race model
            logger.log('views/PageCreateCharacter', 'raceClicked() called');
            e.preventDefault(); e.stopPropagation();

            // get race from clicked element
            var cid = $(e.target).attr('data-race-cid');
            return this.setRace(cid);
        },

        setRace: function(cid){
            // Called to set the race for the entity model. Updates the HTML 
            // and updates the model
            //
            // get race model
            var raceModel = this.races.get(cid); 

            // --------------------------
            // Update DOM elements
            // --------------------------
            // Generate a random name
            this.getSelector('.input-character-name', this.$el).attr({
                placeholder: generateName()
            });
            
            // add / remove active class for all other races
            this.getSelector('.races-list .item').removeClass('active');
            // (get item by race cid, so we don't need an event passed in)
            $(".item[data-race-cid='" + cid + "']", this.$el).addClass('active');

            // remove the initial blur on the main character area
            this.getSelector('#create-character-display-wrapper').removeClass('blur');

            // remove blur / disable on the next button
            this.getSelector('.btn-next').removeClass('blur');

            // Update race info
            // --------------------------
            this.getSelector('.race-name').html(raceModel.get('name'));
            this.getSelector('.race-description').html(raceModel.get('description'));


            // --------------------------
            // Update model
            // --------------------------
            // update the entity (this.model) with the race
            // update the entity sprite
            // TODO: use a more robust sprite system, allow for differences
            //   in classes 
            this.model.set({ 
                race: raceModel, 
                sprite: raceModel.get('sprite') 
            });

            return this;
        },

        // ==============================
        //
        // Update Class 
        //
        // ==============================
        classClicked: function classClicked(e){
            // Similar to race clicked, but fires when a class item is clicked
            logger.log('views/PageCreateCharacter', 'classClicked() called');
            e.preventDefault(); e.stopPropagation();
            // get race from clicked element
            var cid = $(e.target).attr('data-class-cid');

            return this.setClass(cid);
        },

        setClass: function(cid){
            // if raceCid was passed in, allow it to override the one from the
            // click event
            var classModel = this.classes.get(cid); 

            logger.log('views/PageCreateCharacter', 'classModel: %O, cid: %O',
                classModel, cid);

            // --------------------------
            // Update DOM elements
            // --------------------------
            // remove blur / disable on the next button
            this.getSelector('.btn-next').removeClass('blur');
            // add / remove active class on all other classes in the list
            this.getSelector('.class-list .item').removeClass('active');
            // add active class to the class
            $(".item[data-class-cid='" + cid + "']", this.$el).addClass('active');

            // Update abilities based on class
            // TODO: hide abilities that haven't been unlocked? 
            // ... game design task
            var abilities = classModel.get('abilities');
            this.model.set({ abilities: abilities });

            // update class html elements (TODO: View?)
            this.getSelector('.class-name').html(classModel.get('name'));
            this.getSelector('.class-description').html(classModel.get('description'));

            // update the ability list
            // --------------------------
            this.abilityListView = new AbilityList({
                collection: abilities
            });
            this.regionAbilityList.show( this.abilityListView );

            // --------------------------
            // update model
            // --------------------------
            this.model.set({ 'class' : classModel });

            return this;
        },

        // --------------------------------------------------------------------
        //
        // Finish creation
        //
        // -------------------------------------------------------------------
        finishProcess: function finishProcess(){
            // Called when the creation process is completely finished.
            //
            // TODO: show an in app prompt
            this.model.set({ 
                name: this.getSelector('.input-character-name').val() || this.getSelector('.input-character-name').attr('placeholder')

            });

            // TODO: only trigger if prompt is true
            // If done, show the game and pass in the entities
            events.trigger('controller:showGame');
            return this;
        }
    });

    return PageCreateCharacter;
});
