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
                page5name: $('#create-final-name')
            };

            // Setup pageturn
            this.setupPageturn();

            // Setup title page stuff
            this.setupPage1();

            return this;
        },

        // ------------------------------
        // Pageturn util
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
                    turned: function(e, page) {
                        //// Do effect on turn
                        // log : $(this).turn('view'));
                    }
                }
            });

            function pageNext(e){
                // Called to show the next page. This is state based, as
                // the user cannot see 
                logger.log('views/PageHome', 'pageNext() called');
                if(self.curStep < 3){
                    logger.log('views/PageHome', '\t showing next page');
                    e.preventDefault();
                    self.curStep++;
                    self.$pages.turn('next');
                }
            }
            function pagePrevious(e){
                logger.log('views/PageHome', 'pagePrevious() called');
                if(self.curStep > 1){
                    logger.log('views/PageHome', '\t showing previous page');
                    e.preventDefault();
                    self.$pages.turn('previous');
                    self.curStep--;
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
                if (e.keyCode==37) {
                    pagePrevious(e);
                } else if (e.keyCode==39) {
                    pageNext(e);
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

                }, baseDelay);
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


        // ==============================
        //
        // Page 2 - Race
        // 
        // ==============================
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
        // race clicked
        // ------------------------------
        raceClicked: function raceClicked (options){
            // Called when a race is clicked
            // TODO: This, show viz?
            logger.log('views/PageHome', 'raceClicked() passed options: %O',
                options);
            var self = this;

            if(this.pagesCompleted[1] !== true){
                logger.log('views/PageHome', '[x] first page incomplete, must enter name');
                return false;
            }
            
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
                logger.log('warn', 'this.$raceDescription does not exist');
                return false;
            }

            logger.log('views/PageHome', 'raceDescription: %O', this.$raceDescription);

            // update the race description div with the template
            // --------------------------
            // Show race description
            this.$raceDescription.velocity({ opacity: 0 });
            self.$raceDescription.addClass('fadeOutDown');

            setTimeout(function(){
                // update html
                self.$raceDescription.html(
                    self.templateRaceDescription({ model: options.model })
                );

                self.$raceDescription.velocity({ opacity: 1 });
                self.$raceDescription.removeClass('fadeOutDown');
                self.$raceDescription.addClass('animated fadeInDown');
            }, baseDelay / 2);
        

            return this;
        }
        
    });

    return PageHome;
});
