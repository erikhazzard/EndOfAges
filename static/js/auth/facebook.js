// ===========================================================================
//
// facebook
//
//  returns a function which sets up a listener for the loginSuccess:facebook
//  event. This is triggered when a user auths and logs in with facebook.
//  When this happens, refetch the user model, as the user will now be
//  logged in
//
// ===========================================================================
define([ 'events', 'models/appUser-object' ], function(events, appUser){
    // When a user successfully logins with facebook, an event names
    //  'loginSuccess:facebook' is triggered. Listen for that event and re-get
    //  the user user
    
    var setupListener = function(){

        // When user logs in with facebook, the loginSuccess:facebook event
        // is triggered
        events.on('loginSuccess:facebook', function(){

            // Update the user user object since the user is logged in
            // now
            appUser.fetch({
                success: function(res){
                    // After the user has updated, trigger an event to let
                    // listeners know the user has logged in, passing in the
                    // user response object
                    appUser.trigger('loggedIn', res);
                }
            });

        });
    };

    return setupListener;
});
