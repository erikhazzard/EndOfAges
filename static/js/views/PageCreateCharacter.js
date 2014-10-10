// ===========================================================================
//
// Page Create Character
//  
//  TODO: Whenever sprite changes, update the element
//  DEPRECATED XXXXXXXXXXXXXXXXXXXXXX
// 
// ===========================================================================
define(
    [ 
        'd3', 'backbone', 'marionette',
        'views/EoALayoutView',
        'logger', 'events',

        'util/generateName',

        'views/create/RaceList',
        'collections/Races',

        'models/Ability',
        'collections/Abilities',

        'views/create/AllAbilitiesList',
        'views/create/AbilityList',

        'data/abilities'

    ], function viewPageCreateCharacter(
        d3, Backbone, Marionette, 
        EoALayoutView,
        logger, events,

        generateName,

        RaceList,
        Races,

        Ability,
        Abilities,

        AllAbilitiesList,
        AbilityList,

        dataAbilities
    ){

    var PageCreateCharacter = EoALayoutView.extend({
        template: '#template-page-create-character',
        'className': 'page-create-character-wrapper',
        regions: {
            'regionRaceList': '#region-create-races',
            'regionAllAbilitiesList': '#region-create-all-abilities',
            'regionAbilityList': '#region-create-abilities'
        },

        // UI events
        events: {
            'click .race-list-item .item': 'raceClicked',
            'touchend .race-list-item .item': 'raceClicked',

            'click .btn-previous': 'previousClicked',
            'touchend .btn-previous': 'previousClicked',
            'click .btn-next': 'nextClicked',
            'touchend.btn-next': 'nextClicked',

            // generate name
            'click .btn-generate-name': 'generateNewName',
            'touchend .btn-generate-name': 'generateNewName'
        },

        // ------------------------------
        // init
        // ------------------------------
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

            // Listen for key presses to navigate through class / race list
            this.listenTo(events, 'keyPress:enter', this.handleKeyEnter);
            this.listenTo(events, 'keyPress:backspace', this.handleKeyBackspace);
            this.listenTo(events, 'keyPress:escape', this.handleKeyBackspace);
            this.listenTo(events, 'keyPress:up', this.handleKeyUpUp);
            this.listenTo(events, 'keyPress:down', this.handleKeyUpDown);

            // TODO: if entity already has a race or class, trigger the
            // event to show it
            return this;
        },

        // ------------------------------
        // Key handlers
        // ------------------------------
        handleKeyEnter: function(){
            logger.log('views/PageCreateCharacter', 'handleKeyEnter() called');
            this.changeState('next');
        },
        handleKeyBackspace: function(){
            logger.log('views/PageCreateCharacter', 'handleKeyBackspace() called');
            this.changeState('previous');
        },

        handleKeyUpUp: function(){
            logger.log('views/PageCreateCharacter', 'handleKeyUpUp() called');
            // TODO : cycle through current list
        },
        handleKeyUpDown: function(){
            logger.log('views/PageCreateCharacter', 'handleKeyUpDown() called');
            // TODO : cycle through current list
        },

        // ------------------------------
        //
        // Show
        //
        // ------------------------------
        onShow: function homeOnShow(){
            logger.log('views/PageCreateCharacter', 'onShow called');

            // remove existing el cache
            delete this._elCache;

            // Generate a random name
            this.getSelector('.input-character-name').attr({
                placeholder: generateName()
            });

            // show regions
            // TODO: how to handle race collection?
            this.raceListView = new RaceList({
                collection: this.races
            });

            // Create ability objects for each ability item
            var allAbilities = new Abilities();

            _.each(dataAbilities, function createAbility (ability, key){
                allAbilities.add(new Ability(ability));
            });

            // keep a reference to the collection
            this.allAbilities = allAbilities;

            logger.log('views/PageCreateCharacter', 
                'abilities : %O', allAbilities);

            this.allAbilitiesListView = new AllAbilitiesList({
                collection: allAbilities
            });

            this.regionRaceList.show(this.raceListView);
            this.regionAllAbilitiesList.show(this.allAbilitiesListView);

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

            // Ensure the next state can be gone to
            if(state === 'next'){
                // ensure a race was picked
                if(this.createState === 0 && !this.model.get('race')){
                    alert('pick a race');
                    return false;
                }

                // ensure a class was picked
                if(this.createState === 1 && !this.model.get('abilities')){
                    alert('pick abilities');
                    return false;
                }
            }


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
            this.getSelector('.input-character-name').val(
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

            // if a disabled race was clicked, do nothing
            if($(e.target).hasClass('disabled')){
                logger.log('views/PageCreateCharacter', '[x] race disabled');
                return this;
            }

            return this.setRace(cid);
        },

        setRace: function(cid){
            // Called to set the race for the entity model. Updates the HTML 
            // and updates the model
            //
            // get race model
            var self = this;
            var raceModel = this.races.get(cid); 

            // --------------------------
            // Update DOM elements
            // --------------------------
            // Generate a random name
            this.getSelector('.input-character-name').attr({
                placeholder: generateName()
            });
            
            // add / remove active class for all other races
            this.getSelector('.races-list .item').removeClass('active');
            // (get item by race cid, so we don't need an event passed in)
            $(".item[data-race-cid='" + cid + "']").addClass('active');

            // remove the initial blur on the main character area
            this.getSelector('#create-character-display-wrapper').removeClass('blur');

            // remove blur / disable on the next button
            this.getSelector('.btn-next').removeClass('blur');

            // Update race info
            // --------------------------
            self.getSelector('.race-info-wrapper').empty().append(
                Backbone.Marionette.TemplateCache.get('#template-create-race-info')({
                    race: raceModel
                })
            );

            // update race viz
            // TODO: Don't empty / append, have a view and call update on it
            this.getSelector('.race-viz-wrapper').empty().append(
                Backbone.Marionette.TemplateCache.get('#template-create-race-viz')({
                    stats: raceModel.get('baseStats')
                })
            );

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
            }, { silent: true });
            this.model.trigger('change:race');
            this.model.trigger('change:sprite');

            logger.log('views/PageCreateCharacter', 'finished setting race to %O',
                raceModel);
            return this;
        },

        // ==============================
        //
        // Update Abilities
        //
        // ==============================
        abilityListItemClicked: function abilityListItemClicked(e){
            // Similar to race clicked, but fires when a class item is clicked
            logger.log('views/PageCreateCharacter', 'abilityListItemClicked() called');
            e.preventDefault(); e.stopPropagation();
            // get race from clicked element
            var cid = $(e.target).attr('data-ability-cid');

            return this.abilityClickedFromList(cid);
        },

        abilityClickedFromList: function(cid){
            // Called when an ability from the ability list was clicked
            //  When clicked, add the ability to the entity's ability collection
            //  if it doesn't exist already
            //
            var abilityModel = this.allAbilities.get(cid); 

            logger.log('views/PageCreateCharacter', 'abilityModel: %O, cid: %O',
                abilityModel, cid);

            // --------------------------
            // Update DOM elements
            // --------------------------
            // remove blur / disable on the next button
            this.getSelector('.btn-next').removeClass('blur');
            // add / remove active class on all other classes in the list
            this.getSelector('.class-list .item').removeClass('active');
            // add active class to the class
            $(".item[data-class-cid='" + cid + "']").addClass('active');

            // Create new abilities collection and add selected ability
            // TODO: store this - don't recreate every time
            if(!this.entityAbilities){  
                this.entityAbilities = new Abilities();
            }
            var abilities = this.entityAbilities;
            abilities.add(abilityModel);

            // update the ability list
            // --------------------------
            // ability wrapper starts out hidden until a class is selected
            this.getSelector('.abilities-wrapper').removeClass('hidden');

            this.abilityListView = new AbilityList({
                collection: abilities
            });
            this.regionAbilityList.show( this.abilityListView );

            // --------------------------
            // update model
            // --------------------------
            // TODO: TODO: !!!!!!!!!!! Think about this : should entity
            // get a class passed in, or just the abilities? here, class
            // is passed in, and entity model gets abilities from it
            this.model.set({ 'abilities' : abilities }, { silent: true });
            this.model.trigger('change:abilities');
            logger.log('views/PageCreateCharacter', 'model updated : %O',
                this.model);

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
            logger.log('views/PageCreateCharacter', 'Finished! : %O',
                this.model);

            // TODO: only trigger if prompt is true
            // If done, show the game and pass in the entities
            events.trigger('controller:showGame');
            return this;
        }
    });

    return PageCreateCharacter;
});
