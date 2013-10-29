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

        // Define the app user model. Similar to user model, but a bit different
        var AppUser = Backbone.Model.extend({
            defaults: {
                username: null,
                profilePic: null,
                name: '',
                fName: '',
                lName: '',
                facebookId: '',

                personality: null,
                // will look like this:
                    //personality: {
                        //openness: 0,
                        //neuroticism: 0,
                        //extraversion: 0,
                        //conscientiousness: 0,
                        //agreeableness: 0
                    //},
                personalityHistory: [],

                // Empty Facebook ID
                facebookId: null,

                // points are used for viewing profiles, etc
                points: 10,
        
                // number of questions users have answered about this person
                numRatings: 3,
                // number of times users have viewed this profile
                views: 10,

                // this property is only ever set on the appUser app object
                isLoggedIn: false,

                // Close friends and friends will be a collection of users,
                // once friends are returned from server
                friends: null,
                // will be an object containing collections for 
                // each 'network' (friends, closeFriends, etc)

                // array of user names of viewed profiles
                viewedProfiles: []
            },
        
            url: API_URL + 'user/',

            initialize: function appUserInitialize(){
                var self = this;
                logger.log('models/AppUser',
                    'User:initialize: New app user created');

                // When model comes back from server, if there's no error
                this.on('sync', function(model, res){
                    if(!res.error && res.username){
                        logger.log('models/AppUser', 
                            'sync: no error, setting properties for model:',
                            self.cid,
                            'res:', res);

                        var newProps = {
                            error: false,
                            isLoggedIn: true
                        };

                        self.set(newProps);
                    }
                });

                // Try to fetch from server immediately. This ALSO immediately
                // tries to fetch friends
                this.fetch({
                    success: function(res){ 
                        // Check if there's an error (e.g., appUser isn't authed)
                        if(res.attributes.error){
                            logger.log('models/AppUser',
                                'fetch: appUser not logged in');
                            return false;
                        }
                        // no error, remove if there was an exisiting error
                        self.unset('error');
                        self.trigger('initialFetchFromServer');
                    },
                    error: function(){ 
                        logger.error('models/AppUser',
                            'fetch: COULD NOT GET MODEL FROM SERVER!');
                    }
                });


                return this;
            }

        });

    return AppUser;
});
