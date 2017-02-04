// ===========================================================================
//
// PageHome
//      Main homepage - handles character creation
//
// TODO: Metrics on play time, etc. Every 30(?) seconds, ping server
// with stats
//
// ===========================================================================
define(
    [ 
        'd3', 'backbone', 'marionette',
        'analytics',
        'logger', 'events',
        'async',
        'models/Entity',

        // races
        'views/create/RaceList',
        'collections/Races',
        'models/Race',
        'views/create/RaceViz',

        // classes
        'views/create/ClassList',
        'collections/Classes',

        // abilities
        'views/create/AllAbilitiesList',
        'collections/Abilities',
        'collections/AllAbilities',

        'localForage',

    ], function viewPageHome(
        d3, backbone, marionette, 
        analytics,
        logger, events,
        async,
        Entity,
        RaceList,
        Races,
        Race,
        RaceViz,

        ClassList,
        Classes,

        AllAbilityList,
        Abilities,
        AllAbilities,

        localForage
    ){

    // CONFIG
    // ----------------------------------
    var ORIGINAL_BASE_DELAY = 1000;
    var baseDelay = ORIGINAL_BASE_DELAY;

    var HOME_DATA_KEY = 'game:createCharacter:initialState';

    // total number of abilities user can have
    var MAX_ABILITIES = 4;
    var START_DATE; // set when page is initialized

    // View 
    // ----------------------------------
    var PageHome = Backbone.Marionette.Layout.extend({
        template: '#template-page-home',
        'className': 'page-home-wrapper',

        'regions': {
            'regionRaceList': '#region-create-races',
            'regionClassList': '#region-create-classes',
            'regionAllAbilitiesList': '#region-create-all-abilities-list'
        },

        events: {
        },

        initialize: function initialize(options){
            // initialize:
            var self = this;

            //// XXXXXXXXXXXXXXXXXXXXXXXXXX
            //// XXXXXXXXXXXXXXXXXXXXXXXXXX
            //// XXXXXXXXXXXXXXXXXXXXXXXXXX
            //// XXXXXXXXXXXXXXXXXXXXXXXXXX
            //// XXXXXXXXXXXXXXXXXXXXXXXXXX
            //// XXXXXXXXXXXXXXXXXXXXXXXXXX
            //// XXXXXXXXXXXXXXXXXXXXXXXXXX
            //// XXXXXXXXXXXXXXXXXXXXXXXXXX
            //// ==========================
            //// TODO: REMOVE THIS : DEV 
            //// SKIP CREATE
            //// ==========================
            //return localForage.getItem('game:createCharacter:initialState', function(d){ 
                //EVENTS.trigger('controller:showGame', {dataToCreateGameModel: JSON.parse(d) }); 
            //});
            //// XXXXXXXXXXXXXXXXXXXXXXXXXX
            //// XXXXXXXXXXXXXXXXXXXXXXXXXX
            //// XXXXXXXXXXXXXXXXXXXXXXXXXX
            //// XXXXXXXXXXXXXXXXXXXXXXXXXX
            //// XXXXXXXXXXXXXXXXXXXXXXXXXX
            //// XXXXXXXXXXXXXXXXXXXXXXXXXX
            //// XXXXXXXXXXXXXXXXXXXXXXXXXX
            //// XXXXXXXXXXXXXXXXXXXXXXXXXX
            //// XXXXXXXXXXXXXXXXXXXXXXXXXX
            //// XXXXXXXXXXXXXXXXXXXXXXXXXX

            logger.log('pageHome', 'initialize() called');
            START_DATE = new Date();

            analytics.log({
                type: 'create',
                step: 0,
                message: 'initailize called',
                page: 'pageHome',
                time: START_DATE
            });

            // Create a new entity model for character create
            this.model = new Entity({});
            // no name by default
            this.model.attributes.name = null;

            // loaded from localstore
            this.initialData = options.initialData || null;

            // Setup races and collection
            this.races = new Races();
            this.raceListView = new RaceList({
                collection: this.races
            });

            // templates (classes)
            this.classes = new Classes();
            this.classListView = new ClassList({
                collection: this.classes
            });

            // all abilities collection and list
            this.allAbilitiesListView = {};

            this.allAbilities = new AllAbilities([], {
                callback: function(err, collection){
                    self.allAbilitiesListView = new AllAbilityList({
                        collection: self.allAbilities
                    });

                    logger.log('pageHome:setupAllAbilities', 
                    'callback called, set up allAbilitiesListView', {
                        list: self.allAbilitiesListView
                    });


                    // setup *abilities* here, so they will be setup by the time
                    // the abilities page fades in
                    setTimeout(function(){requestAnimationFrame(function(){
                        self.regionAllAbilitiesList.show(self.allAbilitiesListView);

                        requestAnimationFrame(function(){
                            logger.log('pageHome:setupAllAbilities',
                                'allAbilitiesListView is setup!');

                            self.isAbilitiesListSetup = true;

                            if(self.callbackAfterAbilityListSetup){
                                self.callbackAfterAbilityListSetup();
                            }
                        });
                    });}, 105);
                }
            });

            // --------------------------
            // Page - list click callbacks
            // --------------------------
            this.listenTo(events, 'create:page2:raceClicked', this.raceClicked);
            this.listenTo(events, 'create:page3:classClicked', this.classClicked);
            this.listenTo(events, 'create:page4:abilityClicked', this.abilityClicked);

            this.listenTo(events, 'create:page4:allAbilityMouseenter', this.allAbilityMouseenter);
            this.listenTo(events, 'create:page4:allAbilityMouseleave', this.allAbilityMouseleave);

            // --------------------------
            // final data page template
            // --------------------------
            this.finalDataPageTemplate = _.template(
                $('#template-create-final-data-page').html()
            );

            // --------------------------
            // keep track of selected abilities 
            // --------------------------
            this.selectedAbilities = new Abilities();

            // UTILITY
            // --------------------------
            // TODO: This should all be cleaned up and optimized
            function createAbilityIcon( model ){
                // returns an element
                return $('<img />')
                    .attr({
                        src:'/static/img/abilities/' + model.attributes.id + '.svg',
                        'class': 'ability-icon',
                        height: '60',
                        width: '60'
                    });
            }

            function removeImage( $el ){
                $('img', $el).remove();
                $el.addClass('empty-skill');
                return;
            }

            // Selected ability handlers
            // --------------------------
            this.listenTo(this.selectedAbilities, 'add', function(model, collection){
                var $el = self.$selectedAbilitiesEls[collection.indexOf(model)];
                removeImage($el);

                $el.removeClass('empty-skill');
                $el.append(createAbilityIcon(model));
            });

            this.listenTo(this.selectedAbilities, 'remove', function(model, collection, options){
                // When an item from the collection is removed, update the
                // element states. 
                // TODO: Fix this, right now it's emptying everything to ensure 
                //  selected abilities always match
                _.each(self.$selectedAbilitiesEls, function(el,i){
                    removeImage(el);
                });

                // add back all the selected icons
                _.each(collection.models, function(curModel, i){
                    self.$selectedAbilitiesEls[i].append(createAbilityIcon(curModel));
                    self.$selectedAbilitiesEls[i].removeClass('empty-skill');
                });

            });

            this.listenTo(this.selectedAbilities, 'reset', function(model, collection, options){
                _.each(self.$selectedAbilitiesEls, function(el){
                    removeImage(el);
                });
            });


            // Local Forage - fetching data
            // --------------------------

            // NOTE: If this is initialized with state data (i.e., the user
            // already created their character), skip all the intro stuff
            // and allow player to just change things
            if(this.initialData){
                // TODO: Fill in selections and skip steps
                this.setupInitialDataAndSkip( this.initialData );

            } else {
                localForage.getItem(HOME_DATA_KEY, 
                function loadedLocalData(stateData){
                    logger.log('pageHome:loadLocalData', 
                        'loaded data from local store: ', {
                            data: stateData
                    });

                    // turn to object and call setup initial data
                    self.setupInitialDataAndSkip( JSON.parse(stateData) );
                });
            }

            // ============================
            // TODO: DEV: SKIP BOOK
            // ============================

            return this;
        },
        
        // ==============================
        //
        //  initial data setup - skip everything
        //
        // ==============================
        setupInitialDataAndSkip: function( data ){
            var self = this;
            logger.log('pageHome:setupInitialDataAndSkip', 
                'called - filling in data and skipping steps', {
                    data: data
                });

            if(!data){
                logger.log('pageHome:setupInitialDataAndSkip', '[x] no data');
                return false;
            }

            // set delay / animations to immediate
            ORIGINAL_BASE_DELAY = 1;
            baseDelay = 1;
            
            // set pages completed based on data
            if(data.name){
                this.pagesCompleted[1] = true;

                // TODO: cancel all animations and immediately allow player to 
                // continue
                $('#create-name').val(data.name);
            }

            // setup model
            this.model.set({
                name: data.name
            });

            // trigger click events
            if(data.race){
                this.raceClicked({
                    model: new Race(data.race),
                    $el: $('#create-race-' + data.race.sprite)
                });

                if(self.$raceWrapper){
                    self.$raceWrapper.velocity({ opacity: 1 }, { duration: 100 });
                }
            }

            // set selected class and abilities
            // --------------------------
            if(data.className){
                $('#' + data.className).addClass('selected');
            }

            this.initialData = data;

            self.step1WriterCallback();
            self.page1Writer.trigger('finish');
            self.setupPage2();

            logger.log('pageHome:setupInitialDataAndSkip', 
                'finished setting up initial data');

            // TODO: cancel any animations in progress? 
            return this;
        },

        // ==============================
        //
        // cleanup
        //
        // ==============================
        onBeforeClose: function onBeforeClose(){
            logger.log('pageHome:onBeforeClose', 'called, cleaning up stuff');

            // ensure we unbind everything
            $('#create-book-final-start-button').off();
            $('#create-name').off();
            $('#arrow-right').off();
            $('#arrow-left').off();
            _.each(this.$selectedAbilitiesEls, function(el, i){ el.off(); });

            $('#create-abilities-filter-wrapper .label-filter').off();

            $(window).unbind();

            return this;
        },

        // ------------------------------
        //
        // onShow
        //
        // ------------------------------
        onShow: function homeOnShow(){
            // When the view is rendered, set everything up
            var self = this;
            logger.log('pageHome:onShow', 'onShow called');

            this.$bookWrapper = $('#book-wrapper');

            if(!this.raceListView || !this.regionRaceList){
                logger.log('error:pageHome:onShow', 'no race list region exists');
                return false;
            }

            // setup races
            this.regionRaceList.show(this.raceListView);
            this.regionClassList.show(this.classListView);

            // keep reference to pages
            this.$pages = $('#book-pages', this.$el);

            // remove 'hidden' pages
            $('.hidden', this.$pages).removeClass('hidden');

            // Setup templates
            // --------------------------
            this.templateRaceDescription = _.template($('#template-create-race-description').html());
            this.templateRaceVisualization = _.template($('#template-create-race-description').html());

            // Seutp global "skip" behavior to allow skipping all the fade ins
            // TODO: 
            this.pagesCompleted = {
                1: false, // title page
                2: false, // race page
                3: false, // templates
                4: false, // abilities
                5: false, // overview of character
                6: false // final page - play
            };

            // Setup cached els
            this.$cachedEls = {
                nextStepArrow: $('#arrow-right'),
                previousStepArrow: $('#arrow-left'),
                page5name: $('#create-final-name')
            };

            // Setup pageturn
            this.setupPageturn();

            // Setup title page stuff
            this.setupPage1();

            return this;
        },

        // ------------------------------
        //
        // Pageturn util
        //
        // ------------------------------
        setupPageturn: function setupPageturn(){
            // Initializes the pageTurn animation library
            // TODO: Use https://github.com/codrops/BookBlock instead of turn.js
            //
            var self = this;
            this.curStep = 1;

            self.$pages.turn({
                display: 'double',
                acceleration: true,
                page: 2,
                //gradients: !$.isTouch,
                gradients: false,
                duration: 600,
                elevation: 100,

                when: {
                    // ------------------
                    //
                    // CALLBACK When page is turned
                    //
                    // ------------------
                    turned: function(e, page) {
                        logger.log('pageHome:pageTurn', 
                            'finished turning page : %O : %O', 
                            e, page);
                    }
                }
            });

            //disable page peel
            self.$pages.bind('start', 
                function (event, pageObject, corner){
                    if (corner == 'tl' || corner == 'tr' || corner == 'bl' || corner == 'br'){
                        event.preventDefault();
                    } 
                }
            );

            self.$pages.turn('disable', true);

            function pageNext(e){
                // Called to show the next page. This is state based, as
                // the user cannot see 
                // NOTE: Here, "step" means the set of of pages (step 1 is
                //      title / race, step 2 is templates / abilities, step 3
                //      is final)

                logger.log('pageHome:pageNext', 'curStep ' + self.curStep);

                self.$pages.turn('disable', false);

                // set the book wrapper's class
                self.setBookWrapperStep(self.curStep+1);

                if(self.curStep < 4){
                    logger.log('pageHome', '\t showing next page');
                    e.preventDefault();
                    self.curStep++;
                    self.$pages.turn('next');

                    // Templates / abilities
                    if(self.curStep === 2){
                        logger.log('pageHome:pageNext', 
                            'showing page 3...');

                        // initial setup or show of page 3 (step 4 - templates)
                        if(self.pagesCompleted[3] !== true){
                            logger.log('pageHome:pageNext', 'setting up page 3...');
                            self.setupPage3(); 

                        } else {
                            logger.log('pageHome:pageNext', 'showing page 3');
                            // Show it (don't setup)
                            self.showPage3(); 
                        }

                    } else if(self.curStep === 3){
                        // GO TO LAST STEP
                        logger.log('pageHome:pageNext', 
                            'showing step 3, page 5/6...');

                        // initial setup or show of page 3 (step 4 - templates)
                        if(self.pagesCompleted[5] !== true){
                            logger.log('pageHome:pageNext', 'setting up page 5');
                            self.setupPage5(); 
                        } else {
                            logger.log('pageHome:pageNext', 'showing page 5');
                            // Show it (don't setup)
                            self.showPage5(); 
                        }

                    }
                }

                // disable animation
                self.$pages.turn('disable', true);
            }

            function pagePrevious(e){
                // Called to show the previous page
                logger.log('pageHome:pagePrevious', 'curStep ' + self.curStep);

                self.$pages.turn('disable', false);
                // set the book wrapper's class
                self.setBookWrapperStep(self.curStep-1);
                
                if(self.curStep > 1){
                    logger.log('pageHome', '\t showing previous page');
                    e.preventDefault();
                    self.$pages.turn('previous');
                    self.curStep--;

                    // Step 1 is the first set of pages (title and race)
                    if(self.curStep === 1){
                        logger.log('pageHome:pagePrevious', 
                            'showing step 1...');

                        self.showPage2();

                    } else if(self.curStep === 2){
                        logger.log('pageHome:pagePrevious', 
                            'showing step 2...');

                        self.showPage3();
                    }
                }

                // disable again
                self.$pages.turn('disable', true);
            }



            // store functions for page turning
            this.pageNext = pageNext;
            this.pagePrevious = pagePrevious;
            
            // Turn pages on events
            // --------------------------
            $(window).bind('keydown', function(e){
                // Don't let pages go below 2 (we don't have a cover page) and
                // don't let it go above the number of pages we have
                //
                // NOTE: This is really hacky, should be same logic as
                // right / left arrow click
                logger.log('pageHome:pageTurn:keyPress', 
                    'key pressed : ' + e.keyCode + ' | curStep : ' + 
                    self.curStep);

                var now = new Date();

                // Left Arrow
                if (e.keyCode === 37) {
                    logger.log('pageHome:pageTurn:keyPress', 'going back');
                    if(self.curStep > 1){
                        analytics.log({
                            message: 'left key pressed! ' + 
                                'step : ' + self.curStep + ' to ' + (self.curStep - 1),
                            type: 'create:changeStep',
                            from: self.curStep, 
                            step: self.curStep,
                            to: self.curStep-1,
                            method: 'keyPress',
                            delta: (now - START_DATE) / 1000,
                            date: now
                        });
                        pagePrevious(e);
                    } else {
                        logger.log('pageHome:pageTurn:keyPress', 
                            'cannot go back');
                    }

                // Right Arrow
                } else if (e.keyCode === 39) {
                    // can we go forward?
                    if(
                        (self.curStep === 1 && self.pagesCompleted[2]) || 
                        (self.curStep === 2 && self.pagesCompleted[4])
                    ){
                        logger.log('pageHome:pageTurn:keyPress', 'going forward');

                        // only go to next page if models are set up
                        if(self.curStep === 2 && 
                        self.selectedAbilities.models && 
                        self.selectedAbilities.models.length < 4){
                            logger.log('pageHome:pageNext', '[x] cannot continue, no selected models');
                            self.handleInvalidAbilitySelection();
                            return false;
                        }

                        analytics.log({
                            message: 'right key pressed! ' + 
                                'step : ' + self.curStep + ' to ' + (self.curStep + 1),
                            type: 'create:changeStep',
                            from: self.curStep, 
                            to: self.curStep+1,
                            method: 'keyPress',
                            delta: (now - START_DATE) / 1000,
                            date: now
                        });

                        pageNext(e);

                    } else {
                        logger.log('pageHome:pageTurn:keyPress', '[x] cannot go forward');
                    }

                // Escape or enter
                } else if (e.keyCode === 27 || e.keyCode === 13){
                    // ------------------
                    // Skip all the transition stuff
                    // ------------------
                    logger.log('pageHome:pageTurn:keyPress', 
                        'enter or escape pressed, skipping transitions');

                    // are we on step 1?
                    if(self.curStep === 1 && self.pagesCompleted[1] === false){
                        // finish step 1
                        baseDelay = 1;

                        analytics.log({
                            type: 'create:skipIntro', 
                            message: (e.keyCode === 27 ? 'escape' : 'enter') +
                                ' key pressed on step 1', 
                            delta: (now - START_DATE) / 1000,
                            step: self.curStep,
                            date: now
                        });

                        self.step1DidPressEscape = true;
                        self.step1WriterCallback();
                        self.page1Writer.trigger('finish');
                        self.setupPage2();

                        setTimeout(function(){ 
                            baseDelay = ORIGINAL_BASE_DELAY; 
                        }, ORIGINAL_BASE_DELAY * 0.2);
                    }
                }
            });

            // arrows
            var $arrowRight = $('#arrow-right');
            $arrowRight.click(function(e){
                logger.log('pageHome:arrowClick', 'arrow-right clicked'); 
                var now = new Date();

                // if the arrow is NOT visible, do nothing
                if($arrowRight.hasClass('fadeOut') || $arrowRight.css('opacity') < 0.01){
                    logger.log('pageHome:arrowClick', 'clicked but arrow is hidden');
                    return false;
                }

                analytics.log({
                    message: 'arrow-right button clicked! ' + 
                        'step : ' + self.curStep + ' to ' + (self.curStep + 1),
                    type: 'create:changeStep',
                    from: self.curStep, 
                    step: self.curStep,
                    to: self.curStep+1,
                    method: 'click',
                    delta: (now - START_DATE) / 1000,
                    date: now
                });

                if(
                    // step 1 to step 2
                    (self.curStep === 1 && self.pagesCompleted[2]) || 
                    // step 2 to step 3 
                    // TODO - THIS IS FOR DEVELOPMENT, have another page
                    // REMOVE false
                    (self.curStep === 2 && self.pagesCompleted[4])
                ){
                    // only go to next page if models are set up
                    if(self.curStep === 2 && 
                    self.selectedAbilities.models && 
                    self.selectedAbilities.models.length < 4){
                        logger.log('pageHome:pageNext', '[x] cannot continue, no selected models');
                        self.handleInvalidAbilitySelection();
                        return false;
                    }

                    return pageNext(e);
                }

            });

            var $arrowLeft = $('#arrow-left');
            $arrowLeft.click(function(e){
                if($arrowLeft.hasClass('fadeOut') || $arrowLeft.css('opacity') < 0.01){
                    logger.log('pageHome:arrowClick', 'clicked but arrow is hidden');
                    return false;
                }

                var now = new Date();
                analytics.log({
                    message: 'arrow-left button clicked! ' + 
                        'step : ' + self.curStep + ' to ' + (self.curStep - 1),
                    type: 'create:changeStep',
                    from: self.curStep, 
                    step: self.curStep,
                    to: self.curStep-1,
                    method: 'click',
                    delta: (now - START_DATE) / 1000,
                    date: now
                });
                logger.log('pageHome:arrowClick', 'arrow-left clicked');
                return pagePrevious(e);
            });
        },

        setBookWrapperStep: function setBookWrapperStep ( step ){
            // remove other step classes
            this.$bookWrapper.removeClass('step-1 step-2 step-3');
            this.$bookWrapper.addClass('step-' + step);
            return this;
        },

        // ===================================================================
        //
        // Page 1  - Title
        // 
        // ===================================================================
        setupPage1: function setupStep1(){
            // Sets up flow for the title page
            //
            // TODO: Think of best on board flow. Fade in word by word?
            // TODO: When mouse over bottom left, should the name text
            // fade in automatically instead of waiting for the user to read
            // the text?
            logger.log('pageHome:setupPage1', 'called. baseDelay: ' + baseDelay);

            var self = this;
            var $paragraph = $('#book-page-title p', this.$el);
            var $paragraphName = $('#name-input-wrapper');

            var animation = 'fadeInDown';
            var $name = $('#create-name');
            var enteredText = false;

            $($paragraph[0]).velocity({ opacity: 1 });
            $($paragraph[0]).addClass('animated ' + animation);
        
            // Setup writer callback
            self.step1WriterCallbackCalled = false;

            self.step1WriterCallback = function writerCallback(wasCancelled){
                // Called when all words have been faded, or when the
                // user clicks on text
                logger.log('pageHome', 
                    '\t finished showing words, was cancelled? : %O',
                    wasCancelled);

                // if already called, do nothing
                if(self.step1WriterCallbackCalled){ 
                    logger.log('pageHome', 
                        '\t\t step1WriterCallbackCalled is TRUE. should return');
                }
                // TODO: it only seems to show up the second time this is
                // called. why?
                
                self.step1WriterCallbackCalled = true;

                requestAnimationFrame(function(){
                    $paragraphName.velocity({ opacity: 1 });
                    $paragraphName.addClass('animated fadeInUp');
                });

                setTimeout(function(){
                    $paragraphName.removeClass('animated fadeInUp');
                }, 1000);

                // Show the name input box
                if(self.step1nameTimeout){
                    clearTimeout(self.step1nameTimeout);
                }
                
                self.step1nameTimeout = setTimeout(function showName(){
                    logger.log('pageHome', 
                        '\t\t showName() called, showing input...');

                    $name.velocity({ opacity: 1 });
                    $name.attr('placeholder', 'Name');

                    // if they skipped through the intro, don't do anything to
                    // the name input
                    if(!self.step1DidPressEscape){
                        $name.addClass('animated fadeInLeft');
                        $name.attr('placeholder', '');

                        // don't fuck with the placeholder if the name is already set
                        // from initial data
                        if(!self.model.attributes.name){
                            // Fade in "name text"
                            async.eachSeries(['N','Na','Nam','Name'], 
                            function(val, cb){
                                $name.attr('placeholder', val);

                                setTimeout(function(){
                                    cb();
                                }, baseDelay * 0.8);
                            }, function allDone (){ 
                                logger.log('pageHome', '\t\t pulsating name : entetedText: %O',
                                    enteredText);

                                // remove fade in left class to prevent it triggering later
                                $name.removeClass('fadeInLeft');

                                //// No longer pulsating
                                if(!enteredText){
                                    $name.removeClass();
                                    self.step1$namePulse = setTimeout(function(){
                                        logger.log('pageHome', '\t\t adding pulsate : %O');
                                        $name.addClass('animated-subtle pulse-subtle infinite');
                                    }, baseDelay * 1.8);
                                }
                            });
                        } else {
                            // setup page 2 (if it hasn't been setup yet)
                            // the username already exists at this point
                            self.setupPage2();
                        }
                    }

                }, baseDelay / 2);
            };

            // --------------------------
            // Fade in text
            // --------------------------
            self.page1Writer = $('#create-title-intro-text').wordWriter({
                finalCss: { opacity: 0.8 },

                callback: self.step1WriterCallback
            });

            // Remove the pulsating effect when user clicks input
            $name.focus(function (){ 
                logger.log('pageHome', '\t name focused');

                var now = new Date();
                analytics.log({
                    message: 'name input box focused',
                    type: 'create:nameFocus',
                    step: self.curStep,
                    delta: (now - START_DATE) / 1000,
                    date: now
                });
                //// No longer pulsating
                clearTimeout(self.step1$namePulse);
                $name.removeClass('pulse-subtle infinite'); 

                if(self.pagesCompleted[1] === true){
                    logger.log('pageHome', '\t [x] already setup page2');
                    return false;
                }

                enteredText = true;

                setTimeout(function showPage2(){
                    // DONE, Show page 2
                    $name.removeClass('pulse-subtle infinite'); 
                    logger.log('pageHome', 
                        '\t setupPage1: calling setupPage2...');
                    self.setupPage2();

                }, baseDelay * 0.7);
            });

            $name.on('input change', function(e){
                // After input has been changed, user can continue to the
                // second page (race selection)
                logger.log('pageHome:setupPage1:nameChange', 
                    'input change event triggered on name');

                var name = $(this).val();
                if(!name || name.length < 1){
                    name = self.model.generateName();
                }
                self.model.set({ name: name });
                self.$cachedEls.page5name.html(name);
            });

            // if the username already exists, set up next page
            if(self.model.attributes.name){
                logger.log('pageHome:setupPage1', 'model has name: ' +
                    self.model.attributes.name + ' | finishing step 1...');
                self.step1WriterCallback();
                self.page1Writer.trigger('finish');
                self.setupPage2();
            }

            // remove the animated fade class
            setTimeout(function(){
                $($paragraph[0]).removeClass('animated ' + animation);
            },900);

            return this;
        },

        // ===================================================================
        //
        // Page 2 - Race
        // 
        // ===================================================================
        setupPage2: function setupPage2 (){
            var self = this;

            if(self.page2SetupCalled){ return false; }
            self.page2SetupCalled = true;

            logger.log('pageHome', 'setupPage2() called');

            this.pagesCompleted[1] = true;

            var animation = 'fadeInDown';
            var $raceHeader = $('#create-race-header');
            var $raceWrapper = $('#create-race-wrapper');
            self.$raceHeader = $raceHeader;
            self.$raceWrapper = $raceWrapper;

            $raceHeader.velocity({ opacity: 1 });
            $raceHeader.addClass('animated fadeInDown');

            // then show the selection
            if(ORIGINAL_BASE_DELAY > 1){
                setTimeout(function(){
                    logger.log('pageHome:setupPage2', 'setup page 2 with delay');

                    $raceWrapper.velocity({ opacity: 1 });
                    $raceWrapper.addClass('animated fadeInUp');
                }, baseDelay * 0.8);
            } else {
                logger.log('pageHome:setupPage2', 'setup page 2 with no delay');
                $raceWrapper.velocity({ opacity: 1 }, { duration: 100 });
            }

            // remove the animated classes so page switches don't re-trigger
            // transitions
            setTimeout(function removeAnimatedClasses(){
                $raceWrapper.removeClass();
                $raceHeader.removeClass();
            }, baseDelay * 5);

            return this;
        },

        // ------------------------------
        //
        // race clicked
        //
        // ------------------------------
        raceClicked: function raceClicked (options){
            // Called when a race is clicked. Show the race description,
            // and allow user to progress to next step
            //
            logger.log('pageHome', 'raceClicked() passed options: %O',
                options);
            var self = this;

            // if a disabled race was clicked, do nothing
            if(options.model.attributes.disabled){
                logger.log('pageHome', '[x] race disabled');
                $('.item', options.$el).addClass('shake shake-constant');
                setTimeout(function(){
                    $('.item', options.$el).removeClass('shake shake-constant');
                }, 200);

                return this;
            }

            if(this.pagesCompleted[1] !== true){
                logger.log('pageHome', '[x] first page incomplete, must enter name');
                return false;
            }

            // done with race page
            this.pagesCompleted[2] = true;

            // Show the right arrow
            setTimeout(function(){
                requestAnimationFrame(function(){
                    self.$cachedEls.nextStepArrow.velocity({ opacity: 1 });
                    self.$cachedEls.nextStepArrow.addClass('animated fadeIn');
                });
            }, ORIGINAL_BASE_DELAY * 0.04);
            
            // If the same race was clicked, do nothing
            if(this._previousRaceSelected === options.model.attributes.name){
                logger.log('pageHome', '[x] same race selected, doing nothing');
                return false;
            }

            // ==========================
            // Update description and race viz, allow going to next page,
            // pulsate arrow
            // ==========================
            this.model.set({ race: options.model });
            
            // --------------------------
            // Race Visualization
            // --------------------------
            // Only do this once (if no previous race was selected)
            if(!this.raceViz){
                this.$raceViz = this.$raceViz || $('#home-race-visualization');

                // setup viz object
                this.raceViz = new RaceViz( this.$raceViz );
                
                setTimeout(function(){
                    self.$raceViz.addClass('animated fadeIn');

                    requestAnimationFrame(function(){
                        self.raceViz
                            .data(options.model.attributes)
                            .update();
                    });

                    // remove fadeIn class when the animation is over
                    setTimeout(function(){
                        self.$raceViz.css({ opacity: 1 });
                        self.$raceViz.removeClass('fadeIn');
                    }, ORIGINAL_BASE_DELAY * 0.8);
                }, ORIGINAL_BASE_DELAY * 0.2);
                
            } else {
                // otherwise, update the data
                requestAnimationFrame(function(){
                    self.raceViz
                        .data(options.model.attributes)
                        .update();
                });
            }

            // store state
            this._previousRaceSelected = options.model.attributes.name;

            // remove selected class from other entity selections
            // --------------------------
            $('#region-create-races .race-list-item.selected')
                .removeClass('selected');

            // add selected class to selected entity
            options.$el.addClass('selected');

            // Race description
            // --------------------------
            this.$raceDescription = this.$raceDescription || $('#home-race-description');
            if(!this.$raceDescription){ 
                logger.log('error', 'this.$raceDescription does not exist');
                return false;
            }

            logger.log('pageHome', 'raceDescription: %O', this.$raceDescription);

            requestAnimationFrame(function(){
                // Show race description
                self.$raceDescription.velocity({ opacity: 0 });
                self.$raceDescription.addClass('fadeOut');
            });

            clearTimeout(this.raceDescriptionFadeIn);
            clearTimeout(this.raceDescriptionFadeIn2);

            // update the HTML below the race info
            // --------------------------
            this.raceDescriptionFadeIn = setTimeout(function(){
                // update the race description div with the template
                requestAnimationFrame(function(){
                    self.$raceDescription.html(
                        self.templateRaceDescription({ model: options.model })
                    );

                    self.$raceDescription.velocity({ opacity: 1 });
                    self.$raceDescription.css({ opacity: 1 });
                    //self.$raceDescription.removeClass('fadeOutDown');
                    
                    self.$raceDescription.removeClass('fadeOut');
                    self.$raceDescription.addClass('animated fadeIn');
                });

            }, baseDelay / 5);

            // --------------------------
            // Pulsate arrow
            // --------------------------
            // clear existing timeout
            clearTimeout(self.page2arrowPulseTimeout);
            // remove pulse class when race is clicked
            $('.arrow', self.$cachedEls.nextStepArrow).removeClass('pulse infinite');

            this.page2arrowPulseTimeout = setTimeout(function() {
                $('.arrow', self.$cachedEls.nextStepArrow).addClass('pulse infinite');
            }, baseDelay * 4); 

            return this;
        },

        // ------------------------------
        // SHOW Page 2 
        //      Called when page turns to page 2
        // ------------------------------
        showPage2: function showPage2(){
            var self = this;

            self.$cachedEls.nextStepArrow.removeClass('fadeOut');
            self.$cachedEls.nextStepArrow.addClass('fadeIn');

            self.$cachedEls.previousStepArrow.removeClass('fadeIn');
            self.$cachedEls.previousStepArrow.addClass('animated fadeOut');
            return this;
        },

        // ===================================================================
        //
        // Page 3 - Templates
        // 
        // ===================================================================
        cleanupPage2: function cleanupPage2(){
            // Removes any classes that would trigger reanimataions from page2
            this.$raceDescription.removeClass('fadeIn');
            return this;
        },

        setupPage3: function setupPage3 (){
            // This is called *initially* to set up the third page. Once setup
            // it is not called again
            var self = this;

            this.cleanupPage2();

            logger.log('pageHome:setupPage3', 'setupPage3() (templates) called');

            if(this.pagesCompleted[3]){ 
                logger.log('pageHome:setupPage3', 
                    '[x] third page complete already, returning');
                return this;
            }

            this.pagesCompleted[3] = true;

            // remove existing arrow pulsate
            clearTimeout(this.page2arrowPulseTimeout);
            clearTimeout(this.page3arrowPulseTimeout);
            $('.arrow', self.$cachedEls.nextStepArrow).removeClass('pulse infinite');

            // hide the right arrow
            self.$cachedEls.nextStepArrow.addClass('fadeOut');
            
            // show the previous arrow after a delay
            setTimeout(function(){
                logger.log('pageHome:setupPage3', 'showing previous step arrow');
                self.$cachedEls.previousStepArrow.velocity({ opacity: 1 });
                self.$cachedEls.previousStepArrow.removeClass('fadeOut');
                self.$cachedEls.previousStepArrow.addClass('fadeIn');
            }, baseDelay / 3 | 0);

            // setup the fade ins
            var $classWrapper = $('#create-classes-wrapper');
            var $rCreateClasses = $('#region-create-classes');

            function finishWordWriter(){
                // When the text has come in, show the lists

                // Show classes when done
                $rCreateClasses.velocity({ opacity: 1 });
                $rCreateClasses.addClass('animated fadeInTop');
                $rCreateClasses.removeClass('opacity-zero');

                // SHOW SELECTED ABILITIES
                setTimeout(function(){requestAnimationFrame(function(){
                    $('#create-selected-abilities-wrapper').addClass('visible');
                });}, ORIGINAL_BASE_DELAY * 0.5);

                // if there is existing data, set the initial selection
                if(self.initialData && self.initialData.className){
                    setTimeout(function(){
                        requestAnimationFrame(function setupInitialClassData(){
                            $('#' + self.initialData.className).click();

                            // set selected abilities (if custom)
                            // NOTE: this is ugly and hacky.
                            if(self.initialData.className === 'create-race-custom'){

                                // manually select abilities 
                                setTimeout(function(){requestAnimationFrame(function(){
                                    _.each(self.initialData.abilities, function(ability){
                                        $('#create-all-ability-' + ability.id).click();
                                    });
                                });}, 20);
                            }
                        });
                    }, 380);
                }
            }

            // then show the selection
            setTimeout(function(){
                $classWrapper.velocity({ opacity: 1 });

                setTimeout(function(){requestAnimationFrame(function(){
                    $('#create-classes-description').removeClass('opacity-zero');

                    if(ORIGINAL_BASE_DELAY > 10){
                        $('#create-classes-description').wordWriter({
                            finalCss: { opacity: 0.8 },
                            callback: finishWordWriter 
                        });
                    } else {
                        finishWordWriter();
                    }

                    self.page3canClickClass = true;
                });}, baseDelay * 0.2);

            }, baseDelay * 0.8);

            // remove the animated classes so page switches don't re-trigger
            // transitions
            setTimeout(function removeAnimatedClasses(){
                $classWrapper.removeClass();
                $rCreateClasses.removeClass('animated fadeIn fadeInTop opacity-zero');
            }, baseDelay * 5);


            return this;
        },

        showPage3: function showPage3 (){
            // This is called whenever player goes from page 2 to page 3
            var self = this;
            logger.log('pageHome:setupPage3', 'showPage3() (classes) called: ', {
                page3Complete: this.pagesCompleted[3]
            });

            clearTimeout(this.page2arrowPulseTimeout);
            clearTimeout(this.page3arrowPulseTimeout);

            // hide the right arrow ONLY if the player hasn't selected their
            // abilities
            if(this.pagesCompleted[3] !== true){ 
                self.$cachedEls.nextStepArrow.addClass('fadeOut');
            } else {
                // player has already selected their abilities at this point,
                // so show the next arrow step
                self.$cachedEls.nextStepArrow.removeClass('fadeOut');
            }

            // show the previous arrow 
            self.$cachedEls.previousStepArrow.velocity({ opacity: 1 });
            self.$cachedEls.previousStepArrow.removeClass('fadeOut fadeOutRight');
            self.$cachedEls.previousStepArrow.addClass('fadeIn');
            return this;
        },

        classClicked: function classClicked (options){
            // when clicking on a calling / class, show the ability list
            logger.log('pageHome:classClicked', 'classClicked() passed options: %O',
                options);
            var self = this;

            if(!self.page3canClickClass){
                return false;
            }

            // if a disabled class was clicked, do nothing
            if(options.model.attributes.disabled){
                logger.log('pageHome:classClicked', '[x] class disabled');
                return this;
            }

            // ensure no reclicks - is set to true once we're all done here
            self.page3canClickClass = false;

            // done with class page
            self.pagesCompleted[3] = true;

            // If the same class was clicked, do nothing
            if(self._previousClassSelected === options.model.attributes.name){
                logger.log('pageHome:classClicked', '[x] same class selected, doing nothing');
                self.page3canClickClass = true;
                return false;
            }

            // store state
            self._previousClassSelected = options.model.attributes.name;

            // remove selected class from other entity selections
            // --------------------------
            $('#region-create-classes .list-item.selected')
                .removeClass('selected');

            // add selected class to selected entity
            options.$el.addClass('selected');

            // doo all the side effects after the next animation frame
            requestAnimationFrame(function(){

                self.page3canClickClass = true;

                // show the next step icons
                self.$cachedEls.nextStepArrow.velocity({ opacity: 1 });
                self.$cachedEls.nextStepArrow.addClass('animated fadeIn');
                self.$cachedEls.nextStepArrow.removeClass('fadeOut');

                self.setupPage4();

                // --------------------------
                // Select abilities
                // --------------------------
                if(!self.$step4AbilityListItems){
                    self.$step4AbilityListItems = $('#region-create-all-abilities-list .list-item');
                }
                if(!self.$step4AbilityList){
                    self.$step4AbilityList = $('#region-create-all-abilities-list');
                }

                self.$step4AbilityListItems.removeClass('selected');
                // empty the currently selected abilities
                self.selectedAbilities.reset();

                // select abilities from model list
                requestAnimationFrame(function(){
                    _.each(options.model.attributes.abilities, function(id){
                        requestAnimationFrame(function(){
                            $('#create-all-ability-' + id).addClass('selected');

                            // add model
                            var ability = self.allAbilities.findWhere({
                                id: id
                            });
                            self.selectedAbilities.add(ability);
                        });
                    });
                });

            });

            return self;
        },

        // =================================================================
        //
        // Page 4
        //
        // =================================================================
        setupPage4: function setupPage4 (){
            var self = this;

            if(self.page4SetupCalled){
                // Only call once
                logger.log('pageHome:setupPage4:called:returning', 
                    '[x] setting up page 4 called, but was already called. returning');
                return false;
            }

            logger.log('pageHome:setupPage4', 'setting up page 4');
            self.page4SetupCalled = true;

            // setup selected ability elements ( on the left page )
            this.$selectedAbilitiesEls = [
                $('#create-selected-abilities-1'),
                $('#create-selected-abilities-2'),
                $('#create-selected-abilities-3'),
                $('#create-selected-abilities-4')
            ];

            // change description when mousing over ability
            this.$step4templateDescription =
                _.template($('#template-create-abilities-item-info').html());
            this.$step4abilityDescription = $('#create-all-abilities-description');

            // when user mouses over item, update description
            _.each(this.$selectedAbilitiesEls, function(el, i){
                el.on('mouseenter', function(){
                    self.step4UpdateDescription(self.selectedAbilities.models[i]);
                    if(self.selectedAbilities.models[i]){
                        $(el).addClass('hover');
                    }
                });

                el.on('mouseleave', function(){
                    // reset html
                    self.step4ResetAbilityDescription();
                    $(el).removeClass('hover');
                });

                el.on('click', function(){
                    // remove selected ability
                    if(self.selectedAbilities.models[i]){
                        self.abilityClicked({
                            $el: $('#create-all-ability-' + self.selectedAbilities.models[i].id),
                            model: self.selectedAbilities.models[i]
                        });

                        $(el).removeClass('hover');
                    }
                });
            });

            // Setup filter icons
            var $filters = $('#create-abilities-filter-wrapper .label-filter');

            // all filters are active by default
            this.abilitiesFilterActive = {};
            this.$abilitiesListItemsByType = {};

            //NOTE: all ability items are rendered by now
            _.each($filters, function(el, i){
                var curSpellType = $(el).attr('data');

                self.abilitiesFilterActive[curSpellType] = true;
                self.$abilitiesListItemsByType[curSpellType] = $('#region-create-all-abilities-list .' + curSpellType);
            });

            // Add click behaviour to toggle which abilities are shown
            // --------------------------
            $filters.on('click', function(el, i){
                logger.log('pageHome:pageAbilities:filter:clicked', 
                    'filter clicked: %o', el);

                // note: must use parent() since the child element that got 
                // clicked takes up the entire DOM element
                var $parent = $(el.target).parent();
                
                var clickedSpellType = $parent.attr('data');
                $parent.toggleClass('inactive');

                self.abilitiesFilterActive[clickedSpellType] = !self.abilitiesFilterActive[clickedSpellType];

                // Show / hide based on selected filters. Hide all that match, 
                // then show all that match
                _.each(self.abilitiesFilterActive, function(isActive, type){
                    if(!isActive){
                        self.$abilitiesListItemsByType[type]
                            .addClass('hide-from-list');
                    }
                });
                _.each(self.abilitiesFilterActive, function(isActive, type){
                    if(isActive){
                        self.$abilitiesListItemsByType[type]
                            .removeClass('hide-from-list');
                    }
                });
            });

            // Add hover behavior to show info about filter
            // --------------------------
            $filters.on('mouseenter', function(el, i){
                var $parent = $(el.target).parent();
                var spellType = $parent.attr('data');
                $parent.addClass('hover');

                self.$step4abilityDescription.html(
                    $('#template-create-abilities-filter-info-' + spellType).html()
                );
            });
            $filters.on('mouseleave', function(el, i){
                var $parent = $(el.target).parent();
                var spellType = $parent.attr('data');
                $parent.removeClass('hover');

                self.$step4abilityDescription.empty();
            });

            return this.showPage4();
        },

        showPage4: function showPage4 () { 
            var self = this;
            logger.log('pageHome:setupPage4', 'showing page 4');

            $('#create-abilities-header').velocity({ opacity: 1 });

            $('#create-abilities-wrapper').velocity({ opacity: 1 });
            $('#region-create-all-abilities-list').velocity({ opacity: 1 });

            setTimeout(function(){requestAnimationFrame(function(){
                $('#region-create-all-abilities-list').removeClass('opacity-zero');
                $('#create-abilities-wrapper').removeClass('opacity-zero');
            });}, 100);

            self.page4canClickAbility = true;

            // TODO: set this after all abilities selected
            this.pagesCompleted[4] = true;

            return this;
        },

        // ------------------------------
        // Step 4 - UTILITY
        // ------------------------------
        step4UpdateDescription: function(model){
            // Updates the description based on passed in model
            // TODO: Flesh this out
            var self = this;

            logger.log('pageHome:step4UpdateDescription', 
            'called with model', {
                model: model
            });

            // do it after a small delay so we don't mess up other hover effects
            requestAnimationFrame(function(){
                // provide a default description if none is available in the
                // model
                var attrs = {
                    description: '', name: '',
                    id: '', castTime: '',
                    data: Abilities.prototype.dataConfig
                };

                if(model && model.attributes && model.attributes.description){
                    attrs = model.attributes;
                }

                attrs.data = Abilities.prototype.dataConfig;

                if(self.$step4abilityDescription){
                    self.$step4abilityDescription.html( 
                        self.$step4templateDescription( attrs )
                    );

                    // TODO: Could add in d3 stuff here
                }

            });

            return this;
        },

        step4ResetAbilityDescription: function ste4ResetHtml(){
            // Called on mouseleave of selected abilities or ability list items
            if(this.$step4abilityDescription){
                this.$step4abilityDescription.html(''); 
            }
            return this;
        },


        changeToCustomClass: function changeToCustomClass(){
            // Select new ability, change class to "Custom"
            $('#region-create-classes .selected').removeClass('selected');
            $('#create-race-custom').addClass('selected');

            // store state
            this._previousClassSelected = 'Custom';
        },

        // ------------------------------
        // All ability callbacks
        // ------------------------------
        allAbilityMouseenter: function allAbilityMouseenter (options){
            this.step4UpdateDescription(options.model);

            // TODO: If we want to add a class on hover do it here but also
            // remove it on fiter buttons and selected ability icons
            if(this.$step4AbilityListItems){
                this.$step4AbilityListItems.removeClass('description-shown');
                $('#create-all-ability-' + options.model.id).addClass('description-shown');
            }
            return this;
        }, 

        allAbilityMouseleave: function allAbilityMouseleave (options){
            // TODO: QUESTION: Should we do nothing on mouseleave?
            return this;

            this.step4ResetAbilityDescription();
            return this;
        }, 

        abilityClicked: function abilityClicked ( options ){
            logger.log('pageHome:abilityClicked', 'passed options: %O',
                options);
            var self = this;

            if(!self.page4canClickAbility){
                logger.log('pageHome:abilityClicked', '[x] cannot click, returning false');
                return false;
            }

            // is the ability already selected?
            if(this.selectedAbilities.indexOf(options.model) > -1){
                // Yes, the model was selected. Remove it
                this.selectedAbilities.remove(options.model);
                options.$el.removeClass('selected');
                this.changeToCustomClass();

            } else {
                // no, the model was NOT selected. Add it IF there is enough
                // room in the selected abilities array
                if(this.selectedAbilities.models.length >= MAX_ABILITIES){
                    // If there are too many abilities selected, do a shake
                    logger.log('pageHome:abilityClicked', 
                        'too many abilities selected, cannot add another');

                    // add an indicator that the player has too many skills selected
                    self.$abilitySelectedSkillsH3 = self.$abilitySelectedSkillsH3 || $('#selected-skills-h3');
                    self.$abilitySelectedSkillsH3.addClass('flash');
                    $('#create-selected-abilities-wrapper').addClass('shake shake-constant');

                    //// shake ability (NOTE: Fucks up other els that have filters
                    $('.item', options.$el).addClass('shake shake-constant');

                    setTimeout(function(){requestAnimationFrame(function(){
                        self.$abilitySelectedSkillsH3.removeClass('flash');

                        //// adjust clicked ability
                        $('.item', options.$el).removeClass('shake shake-constant');

                        $('#create-selected-abilities-wrapper').removeClass('shake shake-constant');
                    });}, 220);

                } else {
                    // There is space for it, add it
                    this.selectedAbilities.add(options.model);
                    options.$el.addClass('selected');
                    this.changeToCustomClass();
                }
            } 
        },

        handleInvalidAbilitySelection: function handleInvalidAbilitySelection(){
            // called when not enough abilities are selected and you try to
            // go to the next page
            logger.log('pageHome:handleInvalidAbilitySelection', 
                'called');
            
            // TODO: MAJOR: This....make it look better
            self.$abilitySelectedSkillsH3 = self.$abilitySelectedSkillsH3 || $('#selected-skills-h3');
            self.$abilitySelectedSkillsH3.addClass('flash'); 

            // TODO: shake hotkeys that don't have an ability
            $('#create-selected-abilities-wrapper .empty-skill')
                .addClass('shake shake-constant');

            setTimeout(function(){
                self.$abilitySelectedSkillsH3.removeClass('flash');
                $('#create-selected-abilities-wrapper .empty-skill')
                    .removeClass('shake shake-constant');
                $('#create-selected-abilities-wrapper .create-selected-abilities-item')
                    .removeClass('shake shake-constant');
            }, 210);
        
            return this;
        },

        // ==============================
        //
        // Page 5 - Final steps, confirm
        //
        // ==============================
        setupPage5: function setupPage4(){
            logger.log('pageHome:setupPage5', 'setting up page 5');
            var self = this;

            if(self.page5SetupCalled){ return false; }
            self.page5SetupCalled = true;

            // if name hasn't been set yet, set it.
            if(!this.model.attributes.name){
                this.model.set({name: this.model.generateName()});
                $('#create-name').val(this.model.attributes.name);
            }

            return this.showPage5();
        },

        showPage5: function showPage5(){
            var self = this;
            logger.log('pageHome:showPage5', 'showing page 5', {
                selectedAbilityModels: this.selectedAbilities.models
            });

            // hide next arrow
            self.$cachedEls.nextStepArrow.addClass('animated fadeOut');

            if(this.selectedAbilities.models){
                logger.log('pageHome:showPage5', 
                    'setting model with selected abilities');
                this.model.set({
                    abilities: new Abilities(
                        this.selectedAbilities.models
                    )
                });
            }

            // setup final variables
            // update template
            if(!this.$finalDataWrapper){
                this.$finalDataWrapper = $('#create-final-data-wrapper');
            }
            var $finalDataWrapper = this.$finalDataWrapper;

            $finalDataWrapper.html(this.finalDataPageTemplate(
                _.extend(this.model.attributes, {
                    selectedAbilities: this.selectedAbilities.models,
                    className: $('#region-create-classes .selected .list-item-name')
                        .html().trim()
                })
            ));

            function finishShowingFinalData(){
                // called after the final data stuff has been filled in
                $('#create-book-page-final-confirm').addClass('animated fadeIn');
                setTimeout(function(){
                    $('#create-book-page-final-confirm').removeClass('opacity-zero');
                }, 200);
            }
            
            // Show everything
            if(!this.initialData && this.pagesCompleted[5] !== true){
                // If it HASN'T been shown yet, fade it in
                $finalDataWrapper.removeClass('opacity-zero');
                finishShowingFinalData();

            } else {
                // Already been completed, show things immediately
                $finalDataWrapper.removeClass('opacity-zero');
                finishShowingFinalData();
            }

            // Finish create process when continue is clicked....
            // add event listener for final start button
            $('#create-book-final-start-button').off();
            $('#create-book-final-start-button').on('click', function(){
                logger.log('pageHome', 'final start button clicked');
                self.finishCreateProcess();
            });


            // set immediately, no further action required
            this.pagesCompleted[5] = true;

            return this;
        },

        // ==============================
        //
        // ALL FINISHED
        // 
        // ==============================
        finishCreateProcess: function finishCreateProcess(){
            // Called when the creation process is completely finished.
            //
            // TODO: show an in app prompt
            var self = this;
            logger.log('pageHome', 'Finished! : %O',
                this.model);

            // setup model with abilities
            // TODO: ensure things aren't stuck around in memory
            this.model.set({
                abilities: new Abilities(
                    this.selectedAbilities.models
                )
            });

            // STORE data
            // TODO: store a clone of this entity model. 
            // currently, only save change properties. it's a bit hacky
            var dataToSet = {
                name: this.model.attributes.name,
                race: this.model.attributes.race,
                className: $('#region-create-classes .selected').attr('id'),
                abilities: this.selectedAbilities.toJSON()
            };
            logger.log('pageHome', 'setting local data: ', {
                data: dataToSet
            });

            var now = new Date();
            analytics.log({
                message: 'finish create process',
                type: 'create:finish',
                step: self.curStep,
                delta: (now - START_DATE) / 1000,
                date: now,
                entity: dataToSet
            });

            // Setup the data locally
            dataToSet = JSON.stringify(dataToSet);
            localForage.setItem(HOME_DATA_KEY, dataToSet);

            // remove page turn 
            this.$pages.turn('disable', true);
            this.$pages.turn('destroy').remove();

            // TODO: Clean up book, do some cool animation?


            // TODO: only trigger if prompt is true
            // If done, show the game and pass in the entities
            requestAnimationFrame(function(){
                events.trigger('controller:showGame');
            });
            return this;
        }

    });

    return PageHome;
});
