// ===========================================================================
//
// PageTitleScreen
// 
// ===========================================================================
define(
    [ 
        'd3', 'backbone', 'marionette',
        'logger', 'events',
        'async',
        'models/Entity',
        'views/create/RaceList',
        'collections/Races'
    ], function viewPageHome(
        d3, backbone, marionette, 
        logger, events,
        async,
        Entity,
        RaceList,
        Races
    ){

    // CONFIG
    // ----------------------------------
    var baseDelay = 1000;

    // View 
    // ----------------------------------
    var PageHome = Backbone.Marionette.Layout.extend({
        template: '#template-page-home',
        'className': 'page-home-wrapper',

        'regions': {
            'regionRaceList': '#region-create-races'
        },

        events: {
        },

        initialize: function initialize(options){
            // initialize:
            logger.log('views/PageHome', 'initialize() called');

            // Create a new entity model for character create
            this.model = new Entity({});

            // Setup races and collection
            this.races = new Races();
            this.raceListView = new RaceList({
                collection: this.races
            });

            // When race is clicked, continue on to the next step
            this.listenTo(events, 'create:page2:raceClicked', this.raceClicked);

            return this;
        },

        onShow: function homeOnShow(){
            // When the view is rendered, set everything up
            
            var self = this;
            logger.log('views/PageHome', 'onShow called');

            // setup races
            this.regionRaceList.show(this.raceListView);

            // keep reference to pages
            this.$pages = $('#book-pages', this.$el);

            // remove 'hidden' pages
            $('.hidden', this.$pages).removeClass('hidden');

            // Setup templates
            this.templateRaceDescription = _.template($('#template-create-race-description').html());

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
                        logger.log('views/PageHome:pageTurn', 
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
                logger.log('views/PageHome:pageNext', 'curStep ' + self.curStep);

                if(self.curStep < 3){
                    logger.log('views/PageHome', '\t showing next page');
                    e.preventDefault();
                    self.curStep++;
                    self.$pages.turn('next');

                    // Templates / abilities
                    if(self.curStep === 2){
                        logger.log('views/PageHome:pageNext', 
                            'showing page 3...');

                        // initial setup or show of page 3 (step 4 - templates)
                        if(self.pagesCompleted[3] !== true){
                            logger.log('views/PageHome:pageNext', 'setting up page 3...');
                            self.setupPage3(); 

                        } else {
                            logger.log('views/PageHome:pageNext', 'showing page 3');
                            // Show it (don't setup)
                            self.showPage3(); 
                        }
                    }

                }
            }
            function pagePrevious(e){
                // Called to show the previous page
                logger.log('views/PageHome:pagePrevious', 'curStep ' + self.curStep);

                if(self.curStep > 1){
                    logger.log('views/PageHome', '\t showing previous page');
                    e.preventDefault();
                    self.$pages.turn('previous');
                    self.curStep--;

                    // Step 1 is the first set of pages (title and race)
                    if(self.curStep === 1){
                        logger.log('views/PageHome:pagePrevious', 
                            'showing page 2...');

                        self.showPage2();
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
                logger.log('views/PageHome:pageTurn:keyPress', 
                    'key pressed : ' + e.keyCode);

                if (e.keyCode==37) {
                    logger.log('views/PageHome:pageTurn:keyPress', 'going back');
                    pagePrevious(e);

                } else if (e.keyCode==39) {
                    // can we go forward?
                    if(
                        (this.curStep === 1 && this.pagesCompleted[2]) || 
                        (this.curStep === 2 && this.pagesCompleted[4])
                    ){
                        logger.log('views/PageHome:pageTurn:keyPress', 'going forward');
                        pageNext(e);

                    } else {
                        logger.log('views/PageHome:pageTurn:keyPress', '[x] cannot go forward');
                    }
                }
            });

            // arrows
            $('#arrow-right').click(function(e){
                logger.log('views/PageHome', 'arrow-right clicked');
                return pageNext(e);
            });
            $('#arrow-left').click(pagePrevious);
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
            logger.log('views/PageHome', 'setupPage1() called');

            var self = this;
            var $paragraph = $('#book-page-title p', this.$el);
            var $paragraphName = $($paragraph[1]);

            var animation = 'fadeInDown';
            var $name = $('#create-name');
            var enteredText = false;

            $($paragraph[0]).velocity({ opacity: 1 });
            $($paragraph[0]).addClass('animated ' + animation);

            // --------------------------
            // Fade in text
            // --------------------------
            $('#create-title-intro-text').wordWriter({
                finalCss: { opacity: 0.8 },

                callback: function writerCallback(wasCancelled){
                    // Called when all words have been faded, or when the
                    // user clicks on text
                    logger.log('views/PageHome', 
                        '\t finished showing words, was cancelled? : %O',
                        wasCancelled);

                    $paragraphName.velocity({ opacity: 1 });
                    $paragraphName.addClass('animated fadeInUp');

                    // Show the name input box
                    setTimeout(function showName(){
                        $name.addClass('animated fadeInLeft');
                        $name.velocity({ opacity: 1 });
                        $name.attr('placeholder', '');

                        // Fade in "name text"
                        async.eachSeries(['N','a','m','e'], 
                        function(i, cb){
                            $name.attr(
                                'placeholder', 
                                $name.attr('placeholder') + i
                            );

                            setTimeout(function(){
                                cb();
                            }, baseDelay * 0.8);
                        }, function allDone (){ 
                            logger.log('views/PageHome', '\t\t pulsating name : entetedText: %O',
                                enteredText);

                            if(!enteredText){
                                $name.removeClass();
                                setTimeout(function(){
                                    logger.log('views/PageHome', '\t\t adding pulsate : %O');
                                    $name.addClass('animated pulse infinite');
                                }, 500);
                            }
                        });

                    }, baseDelay / 2);
                }
            });


            // Remove the pulsating effect when user clicks input
            $name.focus(function (){ 
                logger.log('views/PageHome', '\t name focused');

                enteredText = true;
                $name.removeClass('pulse infinite'); 

                setTimeout(function showPage2(){
                    // DONE, Show page 2
                    $name.removeClass('pulse infinite'); 
                    logger.log('views/PageHome', 
                        '\t setupPage1: calling setupPage2...');
                    self.setupPage2();

                }, baseDelay * 0.7);
            });

            $name.on('input change', function(e){
                // After input has been changed, user can continue to the
                // second page (race selection)
                var name = $(this).val();
                if(!name || name.length < 1){
                    name = self.model.generateName();
                }
                self.model.set({ name: name });
                self.$cachedEls.page5name.html(name);
            });

            return this;
        },


        // ===================================================================
        //
        // Page 2 - Race
        // 
        // ===================================================================
        setupPage2: function setupPage2 (){
            var self = this;
            logger.log('views/PageHome', 'setupPage2() called');

            this.pagesCompleted[1] = true;

            var animation = 'fadeInDown';
            var $raceHeader = $('#race-header');
            var $raceWrapper = $('#create-race-wrapper');

            $raceHeader.velocity({ opacity: 1 });
            $raceHeader.addClass('animated fadeInDown');

            // then show the seletion
            setTimeout(function(){
                $raceWrapper.velocity({ opacity: 1 });
                $raceWrapper.addClass('animated fadeInUp');
            }, baseDelay * 1.2);

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
            logger.log('views/PageHome', 'raceClicked() passed options: %O',
                options);
            var self = this;

            if(this.pagesCompleted[1] !== true){
                logger.log('views/PageHome', '[x] first page incomplete, must enter name');
                return false;
            }

            // done with race page
            this.pagesCompleted[2] = true;

            // Show the right arrow
            this.$cachedEls.nextStepArrow.velocity({ opacity: 1 });
            this.$cachedEls.nextStepArrow.addClass('animated fadeIn');
            
            // If the same race was clicked, do nothing
            if(this._previousRaceSelected === options.model.attributes.name){
                logger.log('views/PageHome', '[x] same race selected, doing nothing');
                return false;
            }

            // store state
            this._previousRaceSelected = options.model.attributes.name;

            // remove selected class from other entity selections
            $('#region-create-races .race-list-item.selected')
                .removeClass('selected');

            // add selected class to selected entity
            options.$el.addClass('selected');

            this.$raceDescription = this.$raceDescription || $('#race-description');
            if(!this.$raceDescription){ 
                logger.log('error', 'this.$raceDescription does not exist');
                return false;
            }

            logger.log('views/PageHome', 'raceDescription: %O', this.$raceDescription);

            // update the race description div with the template
            // --------------------------
            // Show race description
            this.$raceDescription.velocity({ opacity: 0 });
            //self.$raceDescription.addClass('fadeOutDown');
            self.$raceDescription.addClass('fadeOut');

            // update the HTML below the race info
            setTimeout(function(){
                self.$raceDescription.html(
                    self.templateRaceDescription({ model: options.model })
                );

                self.$raceDescription.velocity({ opacity: 1 });
                //self.$raceDescription.removeClass('fadeOutDown');
                self.$raceDescription.removeClass('fadeOut');
                self.$raceDescription.addClass('animated fadeIn');
            }, baseDelay / 2);

            // Pulsate arrow
            // --------------------------
            // clear existing timeout
            clearTimeout(this.page2arrowPulseTimeout);

            this.page2arrowPulseTimeout = setTimeout(function() {
                $('.arrow', self.$cachedEls.nextStepArrow).addClass('pulse infinite');
            }, baseDelay * 3); 

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
        setupPage3: function setupPage3 (){
            // This is called *initially* to set up the third page. Once setup
            // it is not called again
            var self = this;
            logger.log('views/PageHome:setupPage3', 'setupPage3() (templates) called');

            if(this.pagesCompleted[3]){ 
                logger.log('views/PageHome:setupPage3', 
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
                logger.log('views/PageHome:setupPage3', 'showing previous step arrow');
                self.$cachedEls.previousStepArrow.velocity({ opacity: 1 });
                self.$cachedEls.previousStepArrow.removeClass('fadeOut');
                self.$cachedEls.previousStepArrow.addClass('fadeIn');
            }, baseDelay * 2);

            return this;
        },


        showPage3: function showPage3 (){
            // This is called whenever player goes from page 3 back to page 2
            var self = this;
            logger.log('views/PageHome:setupPage3', 'showPage3() (race) called');

            clearTimeout(this.page2arrowPulseTimeout);
            clearTimeout(this.page3arrowPulseTimeout);

            // hide the right arrow ONLY if the player hasn't selected their
            // abilities
            if(this.pagesCompleted[4] !== 4){ 
                self.$cachedEls.nextStepArrow.addClass('fadeOut');
            }

            // show the previous arrow 
            self.$cachedEls.previousStepArrow.velocity({ opacity: 1 });
            self.$cachedEls.previousStepArrow.removeClass('fadeOut fadeOutRight');
            self.$cachedEls.previousStepArrow.addClass('fadeIn');
            return this;
        }

    });

    return PageHome;
});
