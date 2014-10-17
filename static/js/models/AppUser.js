// ===========================================================================
//
// App User
//
//  Model class for the app wide user object 
//
// ===========================================================================
define(
    [ 'events', 'logger', 'util/API_URL' ], function AppUserModel(
        events, logger, API_URL
    ){
        // UTIL
        // ------------------------------
        var unsetCookie = function(){
            document.cookie = 'eoagame=true' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        };
        var setCookie = function(){
            document.cookie = 'eoagame=true';
        };

        // APP USER
        // ------------------------------
        // Define the app user model. Similar to user model, but a bit different
        var AppUser = Backbone.Model.extend({
            defaults: {
                username: null,
                
                // keep track if the user has been fetched from the server
                isLoggedIn: false,

                // how many games were played?
                numGames: 0
            },
        
            url: API_URL + 'user/',

            initialize: function appUserInitialize(){
                var self = this;
                logger.log('models/AppUser', 
                    'User:initialize: New app user created');

                // When model comes back from server, if there's no error
                this.on('sync', function(model, res){
                    if(!res.error && res.username){
                        // LOGGED IN
                        // ----------
                        setCookie();
                        logger.log('models/AppUser', 
                            'sync: no error, setting properties for model: %O | res: %O',
                            self.cid,
                            res);

                        var newProps = {
                            error: false,
                            isLoggedIn: true
                        };

                        self.set(newProps);
                    } else {
                        // NOT LOGGED IN
                        // ----------
                        logger.log('models/AppUser', 'model synced, not logged in');
                        unsetCookie();
                    }
                });

                // Try to fetch from server immediately. This ALSO immediately
                // tries to fetch friends
                this.fetch({
                    success: function(res){ 
                        // Check if there's an error (e.g., appUser isn't authed)
                        //
                        if(res.attributes.error){
                            // NOT LOGGED IN
                            // ----------
                            logger.log('models/AppUser',
                                'fetch(): appUser not logged in');
                            unsetCookie();
                            self.set({isLoggedIn: false});

                            self.trigger('initialFetchFromServer');

                            return false;
                        } else {
                            // LOGGED IN
                            // ----------
                            // no error, remove if there was an exisiting error
                            setCookie();
                            self.unset('error');
                            self.set({isLoggedIn: true});

                            self.trigger('initialFetchFromServer');
                        }
                        return self;
                    },

                    error: function(){ 
                        logger.log('error:models:AppUser', 
                            'fetch(): unable to get model from server');

                        // unset cookie
                        unsetCookie();
                        //// Actual code
                        //self.set({isLoggedIn: false});

                        self.set({isLoggedIn: true});

                        self.trigger('initialFetchFromServer');

                        return self;
                    }
                });


                return this;
            }

        });

    return AppUser;
});
