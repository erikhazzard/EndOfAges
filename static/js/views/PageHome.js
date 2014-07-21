// ===========================================================================
//
// PageTitleScreen
// 
// ===========================================================================
define(
    [ 
        'd3', 'backbone', 'marionette',
        'logger', 'events',
        'models/Entity'
    ], function viewPageHome(
        d3, backbone, marionette, 
        logger, events,
        Entity
    ){

    var PageHome = Backbone.Marionette.Layout.extend({
        template: '#template-page-home',
        'className': 'page-home-wrapper',

        events: {
        },

        initialize: function initialize(options){
            // initialize:
            logger.log('views/PageHome', 'initialize() called');

            // Create a new entity model for character create
            this.model = new Entity({});

            return this;
        },

        onShow: function homeOnShow(){
            // When the view is rendered, set everything up
            
            var self = this;
            logger.log('views/PageHome', 'onShow called');

            // keep reference to pages
            this.$pages = $('#book-pages', this.$el);

            // remove 'hidden' pages
            $('.hidden', this.$pages).removeClass('hidden');

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
            var curPage = 1;
            self.$pages.turn({
                display: 'double',
                acceleration: true,
                page: 2,
                gradients: !$.isTouch,
                duration: 1300,
                elevation: 250,
                when: {
                    turned: function(e, page) {
                        console.log('Current view: ', $(this).turn('view'));
                    }
                }
            });
            
            $(window).bind('keydown', function(e){
                // Don't let pages go below 2 (we don't have a cover page) and
                // don't let it go above the number of pages we have
                if (e.keyCode==37) {
                    if(curPage > 1){
                        e.preventDefault();
                        self.$pages.turn('previous');
                        curPage--;
                    }
                } else if (e.keyCode==39) {
                    if(curPage < 2){
                        e.preventDefault();
                        curPage++;
                        self.$pages.turn('next');
                    }
                }
            });
        },

        // ==============================
        //
        // Page 1  - Title
        // 
        // ==============================
        setupPage1: function setupStep1(){
            // Sets up flow for the title page
            var self = this;
            var $p = $('#book-page-title p', this.$el);
            var animation = 'fadeInDown';
            var $name = $('#create-name', this.$el);
            var enteredText = false;

            $($p[0]).velocity({ opacity: 1 });
            $($p[0]).addClass('animated ' + animation);

            setTimeout(function (){

                $($p[1]).velocity({ opacity: 1 });
                $($p[1]).addClass('animated fadeInUp');

                setTimeout(function (){
                    $name.velocity({ opacity: 1 });

                    setTimeout(function(){
                        if(!enteredText){
                            $name.addClass('animated pulse infinite');
                        }
                    }, 1000);

                    // Remove the pulsating effect when user clicks input
                    $name.focus(function (){ 
                        enteredText = true;
                        $name.removeClass('pulse infinite'); 

                        setTimeout(function (){
                            self.setupPage2();
                        }, 1000);
                    });
                }, 1000);

            }, 1500);
            return this;
        },


        // ==============================
        //
        // Page 2 - Race
        // 
        // ==============================
        setupPage2: function setupPage2 (){
            var $els = $('#book-page-race .opacity-zero', this.$el);
            var animation = 'fadeInDown';
            $els.velocity({ opacity: 1 });
        }

    });

    return PageHome;
});
