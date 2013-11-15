// ===========================================================================
//
// app.js
//
//      -Returns a Marionette app object.  The app object is a sort of
//      composite for our application.  There are a few things of note here:
//          -We use events for communication between independent 
//          components. We can us: event.trigger( ... ) and event.on( ... )
//
// ===========================================================================
define([ 
        'jquery', 'backbone', 'marionette',

        'logger', 'events',

        'models/appUser-object',
        'auth/facebook'
    ], function(
        $, Backbone, Marionette,

        logger, events,

        appUser,
        authFacebook
    ){

    // Create the app instance
    var app = new Backbone.Marionette.Application();

    // store a global ref to it (not used in our code, used for debugging)
    window.APP = app;

    //-----------------------------------
    //App - Region setup
    //-----------------------------------
    //NOTE: Router / controller is setup in main.js
    
    app.addInitializer(function(options){
        //Setup the main region
        var regionMain = new Backbone.Marionette.Region({
            el: '#region-main'
        });
        var regionFriends = new Backbone.Marionette.Region({
            el: '#region-friends'
        });

        // user login / profile
        var regionAuth = new Backbone.Marionette.Region({
            el: '#region-auth'
        });
        app.addRegions({
            'regionMain': regionMain,
            'regionFriends': regionFriends,
            'regionAuth': regionAuth
        });

        //Set the user of the app to be the (logged in) user
        app.user = appUser;
        
        // set up call back when user auths with facebook. When user
        // auths with facebook, the app user model should be refetched
        authFacebook();
    });

    //-----------------------------------
    //Finished
    //-----------------------------------
    app.on('initialize:after', function(options){
        logger.log('app', '%capp: %s',
            'app-main.js: Finished initialization of app');

        if(Backbone.history){
            //start history to enable bookmarkable URLs
            //TODO: use non hash tagged urls
            Backbone.history.start({ pushState: true });
        }

        //For all links, use pushstate
        $(document).on('click', 'a', function(e) {
            var $el = $(this);
            e = e || window.event;

            // we need to catch all internal links and pass them to the router
            var fragment = Backbone.history.getFragment($(this).attr('href'));
            var matched = _.any(Backbone.history.handlers, function(handler) {
                return handler.route.test(fragment);
            });
            if (matched) {
                // found a matched link, send it to the router
                e.preventDefault();
                Backbone.history.navigate(fragment, { trigger: true });
            }

            // otherwise, continue with event
            return e;

        });

        $(window).on('popstate', function(e) {
            app.router.navigate(location.pathname.substr(1), true);
        }); 
    });

    return app;
});
