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
            logger.log('pageHome', 'initialize() called');

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
                        'class': 'class-image',
                        height: '60',
                        width: '60'
                    });
            }

            function removeImage( $el ){
                $('img', $el).remove();
                return;
            }

            // Selected ability handlers
            // --------------------------
            this.listenTo(this.selectedAbilities, 'add', function(model, collection){
                var $el = self.$selectedAbilitiesEls[collection.indexOf(model)];
                removeImage($el);

                $el.append(createAbilityIcon(model));
            });

            this.listenTo(this.selectedAbilities, 'remove', function(model, collection, options){
                // When an item from the collection is removed, update the
                // element states. 
                // TODO: Fix this, right now it's emptying everything to ensure 
                //  selected abilities always match
                _.each(self.$selectedAbilitiesEls, function(el){
                    removeImage(el);
                });

                // add back all the selected icons
                _.each(collection.models, function(curModel, i){
                    self.$selectedAbilitiesEls[i].append(createAbilityIcon(curModel));
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
            this.raceClicked({
                model: new Race(data.race),
                $el: $('#create-race-' + data.race.sprite)
            });

            if(self.$raceWrapper){
                self.$raceWrapper.velocity({ opacity: 1 }, { duration: 100 });
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
        onBeforeClose: function close(){
            logger.log('pageHome:onBeforeClose', 'called, cleaning up stuff');
            $('#create-book-final-start-button').off();

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
            logger.log('pageHome', 'onShow called');

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
                gradients: !$.isTouch,
                duration: 1300,
                elevation: 250,
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

            function pageNext(e){
                // Called to show the next page. This is state based, as
                // the user cannot see 
                // NOTE: Here, "step" means the set of of pages (step 1 is
                //      title / race, step 2 is templates / abilities, step 3
                //      is final)
                logger.log('pageHome:pageNext', 'curStep ' + self.curStep);

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
                        logger.log('pageHome:pageNext', 
                            'showing step 3, page 5/6...');

                        // initial setup or show of page 3 (step 4 - templates)
                        if(self.pagesCompleted[5] !== true){
                            logger.log('pageHome:pageNext', 'setting up page 5...');
                            self.setupPage5(); 

                        } else {
                            logger.log('pageHome:pageNext', 'showing page 5');
                            // Show it (don't setup)
                            self.showPage5(); 
                        }

                    }
                }
            }
            function pagePrevious(e){
                // Called to show the previous page
                logger.log('pageHome:pagePrevious', 'curStep ' + self.curStep);

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
            }

            // store functions for page turning
            this.pageNext = pageNext;
            this.pagePrevious = pagePrevious;
            
            // Turn pages on events
            // --------------------------
            $(window).bind('keydown', function(e){
                // Don't let pages go below 2 (we don't have a cover page) and
                // don't let it go above the number of pages we have
                logger.log('pageHome:pageTurn:keyPress', 
                    'key pressed : ' + e.keyCode + ' | curStep : ' + 
                    self.curStep);

                // Left Arrow
                if (e.keyCode === 37) {
                    logger.log('pageHome:pageTurn:keyPress', 'going back');
                    pagePrevious(e);

                // Right Arrow
                } else if (e.keyCode === 39) {
                    // can we go forward?
                    if(
                        (self.curStep === 1 && self.pagesCompleted[2]) || 
                        (self.curStep === 2 && self.pagesCompleted[4])
                    ){
                        logger.log('pageHome:pageTurn:keyPress', 'going forward');
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
            $('#arrow-right').click(function(e){
                logger.log('pageHome:arrowClick', 'arrow-right clicked'); 

                if(
                    // step 1 to step 2
                    (self.curStep === 1 && self.pagesCompleted[2]) || 
                    // step 2 to step 3 
                    // TODO - THIS IS FOR DEVELOPMENT, have another page
                    // REMOVE false
                    (self.curStep === 2 && self.pagesCompleted[4])
                ){
                    return pageNext(e);
                }
            });
            $('#arrow-left').click(function(e){
                logger.log('pageHome:arrowClick', 'arrow-left clicked');
                return pagePrevious(e);
            });
        },

        // ==============================
        //
        // Page 1  - Title
        // 
        // ==============================
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
                logger.log('views/PageCreateCharacter', '[x] race disabled');
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

            this.cleanupPage2();

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
            logger.log('pageHome', 'classClicked() passed options: %O',
                options);
            var self = this;

            if(!self.page3canClickClass){
                return false;
            }

            // if a disabled class was clicked, do nothing
            if(options.model.attributes.disabled){
                logger.log('views/PageCreateCharacter', '[x] class disabled');
                return this;
            }

            // show the next step icons
            self.$cachedEls.nextStepArrow.velocity({ opacity: 1 });
            self.$cachedEls.nextStepArrow.addClass('animated fadeIn');
            self.$cachedEls.nextStepArrow.removeClass('fadeOut');

            // done with class page
            this.pagesCompleted[3] = true;

            // If the same class was clicked, do nothing
            if(this._previousClassSelected === options.model.attributes.name){
                logger.log('pageHome', '[x] same class selected, doing nothing');
                return false;
            }

            // store state
            this._previousClassSelected = options.model.attributes.name;

            // remove selected class from other entity selections
            // --------------------------
            $('#region-create-classes .list-item.selected')
                .removeClass('selected');

            // add selected class to selected entity
            options.$el.addClass('selected');

            this.setupPage4();

            // --------------------------
            // Select abilities
            // --------------------------
            if(!this.$step4AbilityListItems){
                this.$step4AbilityListItems = $('#region-create-all-abilities-list .list-item');
            }
            if(!this.$step4AbilityList){
                this.$step4AbilityList = $('#region-create-all-abilities-list');
            }

            this.$step4AbilityListItems.removeClass('selected');
            // empty the currently selected abilities
            this.selectedAbilities.reset();

            self.selectedAbilities.reset();

            // select abilities from model list
            _.each(options.model.attributes.abilities, function(id){
                $('#create-all-ability-' + id).addClass('selected');

                // add model
                var ability = self.allAbilities.findWhere({
                    id: id
                });
                self.selectedAbilities.add(ability);
            });

            return this;
        },

        // =================================================================
        //
        // Page 4
        //
        // =================================================================
        setupPage4: function setupPage4 (){
            var self = this;

            if(self.page4SetupCalled){ return false; }
            self.page4SetupCalled = true;

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
                });

                el.on('mouseleave', function(){
                    // reset html
                    self.step4ResetAbilityDescription();
                });
            });

            logger.log('pageHome:setupPage4', 'setting up page 4');

            return this.showPage4();
        },

        showPage4: function showPage4 () { 
            var self = this;
            logger.log('pageHome:setupPage4', 'showing page 4');

            $('#create-abilities-header').velocity({ opacity: 1 });

            $('#create-abilities-wrapper').velocity({ opacity: 1 });
            $('#region-create-all-abilities-list').velocity({ opacity: 1 });

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

            // provide a default description if none is available in the
            // model
            var attrs = {description: '', name: ''};

            if(model && model.attributes && model.attributes.description){
                attrs = model.attributes;
            }

            if(this.$step4abilityDescription){
                this.$step4abilityDescription.html( 
                    this.$step4templateDescription( attrs )
                );
            }

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
            return this;
        }, 
        allAbilityMouseleave: function allAbilityMouseleave (options){
            this.step4ResetAbilityDescription();
            return this;
        }, 

        abilityClicked: function abilityClicked ( options ){
            logger.log('pageHome:abilityClicked', 'passed options: %O',
                options);
            var self = this;

            if(!self.page4canClickAbility){
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
                    // If there are too many abilities selected, do a shake or
                    // some other effect
                    logger.log('pageHome:abilityClicked', 
                        'too many abilities selected, cannot add another');

                } else {
                    // There is space for it, add it
                    this.selectedAbilities.add(options.model);
                    options.$el.addClass('selected');
                    this.changeToCustomClass();
                }
            } 
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

            // add event listener for final start button
            $('#create-book-final-start-button').on('click', function(){
                logger.log('pageHome', 'final start button clicked');
                self.finishCreateProcess();
            });


            return this.showPage5();
        },

        showPage5: function showPage5(){
            var self = this;

            // hide next arrow
            self.$cachedEls.nextStepArrow.addClass('animated fadeOut');

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

            dataToSet = JSON.stringify(dataToSet);

            localForage.setItem(HOME_DATA_KEY, dataToSet);

            // TODO: Clean up book, do some cool animation?

            // remove page turn 
            this.$pages.turn('disable', true);
            this.$pages.remove();

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
