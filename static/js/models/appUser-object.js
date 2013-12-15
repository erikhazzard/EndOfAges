// ===========================================================================
//
// appUser-object
//
//      returns a Profile object
//
// ===========================================================================
define(
    [ 'events', 'logger', 'models/AppUser' ], function(
        events, logger, AppUser
    ){
    // Create the new app appUser object
    // NOTE: when model is created, it will immediately try to fetch
    // from server
    var appUser = new AppUser();

    return appUser;
});
