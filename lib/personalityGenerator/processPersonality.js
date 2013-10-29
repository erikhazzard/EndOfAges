// ===========================================================================
//
// processPersonality
//
//  This takes in facebook data and outputs a Big Five personality score.
//  The current methodology uses a mix of emprical studies, results from
//  traned data sets, aggregate observations, and best guesses. After
//  we accumulate data from users, we'll be able to train our own data
//  set and make these predictions better.
//
// ===========================================================================
var _ = require('lodash');
var winston = require('winston');
var d3 = require('d3');
var fs = require('fs');
var stats = require('simple-statistics');

var processLanguage = require('./processLanguage');

function getNewPersonality(){ 
    return {
        openness: 0,
        conscientiousness: 0,
        extraversion: 0,
        agreeableness: 0,
        neuroticism: 0
    };
}

function getLanguageScores(messages, factor){
    // takes in an array of messages, turns to string,
    // and multiplies matches by a factor. Returns a 
    // personality object to use
    messages = messages.join(' ');
    var scores = processLanguage(messages);
    var tmpPersonality = getNewPersonality();
    _.each(scores, function(score, key){
        tmpPersonality[key] += (score * factor);
    });
    return tmpPersonality;
}

// utility functions
// getDays: takes in a difference between dates (in ms) and returns days
function getDays(dateDiff){  
    // takes in a difference between dates (in ms) and returns days
    return dateDiff / 1000 / 60 / 60 / 24;
}

function updatePersonality(target, source, name){
   //updates a passed in source personality with a target personality values
   //   name is the designated name to update meta with
   if(!name){ throw new Error('Name must be passed in'); }

    _.each(target, function(val, trait){
        if(trait === 'meta'){ return true; }
        if(!isNaN(val)){
            source[trait] += val;
        }
    });

    // update meta
    var meta = _.clone(target);

    if(!source.meta){ source.meta = {}; }
    source.meta[name] = meta;

    return source;
}

// --------------------------------------
// Process personality function
// --------------------------------------
function processPersonality(data){
    //-----------------------------------
    // processPersonality
    //  params: data {Object} contains either a data object from FB 
    //  OR a HTTP response object 
    //-----------------------------------
    //
    // check if a HTTP response was passed in
    if(data.req && data.res){
        data = JSON.parse(data.text);
        // If there was an error with the request, return it
        if(data.error){ return data.error; }
    }

    console.log('<<< Got data! Beginning processing...');
    var start = new Date();

    // Personality variable
    // ----------------------------------
    // Values for each property range from -100 to 100.
    // A negative value indicates the opposite of the
    // trait (e.g., negative openness means a closed
    // personality)
    // global personality
    var personality = getNewPersonality(); 

    // ----------------------------------
    // Gender
    // ----------------------------------
    // Very abstract generalizations based on gender
    (function processGender(){
        var gender = data.gender.toLowerCase();
        var tmpPersonality = getNewPersonality();

        if(gender === 'male' || gender === 'man'){
            tmpPersonality.neuroticism -= 7;
            tmpPersonality.agreeableness -= 4;
            tmpPersonality.conscientiousness -= 4;
        } else if (gender === 'female' || gender === 'woman'){
            tmpPersonality.neuroticism += 7;
            tmpPersonality.agreeableness += 4;
            tmpPersonality.conscientiousness += 4;
        }
        updatePersonality(tmpPersonality, personality, 'gender');
    })();

    // ----------------------------------
    // Work
    // ----------------------------------
    // Lots of jobs in a short amount of time: low conscientiousness,
    // higher neuroticism, low agreeableness 
    (function processJobs(){
        if(!data.work || !data.work.length){ return false; }
        var tmpPersonality = getNewPersonality();

        var jobScale = d3.scale.linear()
            .domain([0, 100, 300, 4000]);

        _.each(data.work, function(job){
            // Check for start / end
            var len = 0;

            // update personality based on job LENGTH
            if(job.start_date && job.end_date){
                // get number of days worked
                len = getDays((new Date(job.end_date) - new Date(job.start_date)));
                if(isNaN(len)){ return false; }

                // Modify personality based on job length
                // update range for conscientiousness
                jobScale.clamp(true);
                jobScale.range([-20, 0, 15, 30]);
                tmpPersonality.conscientiousness += jobScale(len);

                // update range for agreeableness
                jobScale.range([-20, 0, 5, 12]);
                tmpPersonality.agreeableness += jobScale(len);

                // update range for neuroticism (doesn't affect as much)
                jobScale.range([10, 0, -4, -7]);
                tmpPersonality.neuroticism += jobScale(len);

            }
        });

        // update personality based on NUMBER of jobs
        // ------------------------------
        var numJobs = data.work.length;
        jobScale.domain([0,2,5,10,20]);

        // extraversion 
        jobScale.clamp(true).range([-8,-4,7,5,5]);
        tmpPersonality.extraversion += (jobScale(numJobs) / 2);


        // conscientiousness
        jobScale.range([-4,-1,4,6,8]);
        tmpPersonality.conscientiousness += jobScale(numJobs);

        updatePersonality(tmpPersonality, personality, 'jobs');

    })();

    // ----------------------------------
    // Significant Other
    // ----------------------------------
    (function processSignificantOther(){
        var tmpPersonality = getNewPersonality();

        if(data.significant_other && data.significant_other.name){
            // Adds to agreeableness a little and decreases neuroticism
            tmpPersonality.neuroticism -= 15;
            tmpPersonality.agreeableness += 10;
            tmpPersonality.conscientiousness += 7;
            tmpPersonality.extraversion += 2;
            tmpPersonality.openness += 2;
        } else {
            tmpPersonality.neuroticism += 5;
            tmpPersonality.extraversion -= 5;
            tmpPersonality.conscientiousness -= 3;
        }
        updatePersonality(tmpPersonality, personality, 'significantOther');

    })();

    // Books
    // ----------------------------------
    (function processBooks(){
        var books = data.books;
        if(!books || !books.data){ return false; }
        var tmpPersonality = getNewPersonality();

        var len = books.data.length;
        if(len > 8){ len = 6; }
        tmpPersonality.openness += (len * 1.5);
        tmpPersonality.conscientiousness += (len);

        updatePersonality(tmpPersonality, personality, 'books');
    })();

    // Groups
    // ----------------------------------
    (function processGroups(){
        var groups = data.groups;
        if(!groups || !groups.data){ return false; }
        var tmpPersonality = getNewPersonality();

        tmpPersonality.extraversion += (groups.data.length / 1.5);
        tmpPersonality.conscientiousness += (groups.data.length / 3.5);

        updatePersonality(tmpPersonality, personality, 'groups');
    })();

    // Interests
    // ----------------------------------
    (function processInterests(){
        if(!data.interests || !data.interests.data){ return false; }
        var interests = data.interests.data;
        var tmpPersonality = getNewPersonality();

        // More interests, more openness
        tmpPersonality.openness += Math.round(interests.length/2);

        messages = [];

        // Certain interest categories provide more scores
        _.each(interests, function(interest){
            if(interest.name){ messages.push(interest.name); }
            if(interest.category){ messages.push(interest.category); }
        });

        // Process language
        // ------------------------------
        var languageScores = getLanguageScores(messages, 40);

        // Update personality
        // ------------------------------
        updatePersonality(languageScores, tmpPersonality, 'languageScores');
        updatePersonality(tmpPersonality, personality, 'interests');

    })();

    // Friends
    // ----------------------------------
    (function processFriends(){
        if(!data.friends || !data.friends.data){ return false; }
        // curve is negative until around 326 friends, which it then starts 
        // becoming positive (less than 326 = introversion, 
        // greater = extroversion)
        var tmpPersonality = getNewPersonality();

        var numFriends = data.friends.data.length; 
        var val = (Math.log(numFriends)) + Math.pow(2,(Math.log(numFriends / 2))) - 45;
        tmpPersonality.extraversion += val;

        updatePersonality(tmpPersonality, personality, 'friends');
    })();

    // Education
    // ----------------------------------
    (function processEducation(){
        var education = data.education;
        if(!data.education){ return false; }
        var tmpPersonality = getNewPersonality();

        _.each(education, function(item){
            var educationMod = 1;

            // If the concentration is a masters, it adds more
            if(item.degree){
                _.each(item.degree, function(degree){
                    if(degree.match(/master/gi)){
                        educationMod += 1.8;
                    }
                    if(degree.match(/doctor/gi) || degree.match(/phd/gi)){
                        educationMod += 2.5;
                    }
                });
            }

            if(item.type.match(/college/gi) || item.type.match(/graduate/gi)){
                // For each concentration, add values
                _.each(item.concentration, function(concentration){
                    if(concentration.name && concentration.name.match(/phd/gi)){
                        educationMod = 3.5;
                    }

                    tmpPersonality.conscientiousness += (3.4 * educationMod);
                    tmpPersonality.openness += (4.5 * educationMod);
                });
            }
        });

        updatePersonality(tmpPersonality, personality, 'education');
    })();

    // Posts
    // ----------------------------------
    (function processPosts(){
        var posts = data.posts;
        if(!posts || !posts.data){ return null; }
        posts = data.posts.data;

        var tmpPersonality = getNewPersonality();

        var taggedIn = 0;
        var dates = [];
        var dateHours = [];
        var dateLengths = [];

        var messages = [];

        _.each(posts, function(post){
            var type = post.type;
            var likes = (post.likes ? post.likes.data : []).length;
            var comments = (post.comments ? post.comments.data : []).length;

            // If post has a message, it's something the user wrote - so 
            // analyze the text
            if(post.message){
                messages.push(post.message);
            }
            
            if(!post.status_type) { return false; }

            if(post.status_type.match(/created/gi)){
                tmpPersonality.conscientiousness += 1.5;
            }

            if(post.status_type.match(/tagged/gi)){
                // tagged in a post - not user created
                taggedIn += 1;
            } else {
                if(post.message){
                    // Do stuff with message?
                }

                // If user was NOT tagged in a post, count likes
                // update based on likes. More likes = extraversion, 
                // less likes = introversion
                if(likes > 4){
                    tmpPersonality.extraversion += likes / 5;
                } else {
                    tmpPersonality.extraversion -= likes / 2;
                }

                if(comments > 5){
                    tmpPersonality.extraversion += comments / 4;
                } else {
                    tmpPersonality.extraversion -= comments / 3;
                }

                // If this is NOT a post the user is tagged in,
                // count it as something they submitted
                var date = new Date(post.created_time);
                dates.push(date);
                dateHours.push(date.getHours());
                if(dates.length > 1){
                    dateLengths.push(
                        getDays(
                            new Date(dates[dates.length-2]) - 
                            new Date(dates[dates.length-1])
                        )
                    );
                }
            }
        });

        // Update personality based on how many times a user was tagged
        tmpPersonality.agreeableness += (taggedIn * 1.4);
        tmpPersonality.extraversion += (taggedIn / 1.2);
        tmpPersonality.openness += (taggedIn / 3.5);

        // Process language
        // ------------------------------
        var languageScores = getLanguageScores(messages, 20);

        // Update personality
        // ------------------------------
        updatePersonality(languageScores, tmpPersonality, 'languageScores');
        updatePersonality(tmpPersonality, personality, 'posts');
    })();

    // ----------------------------------
    // Statuses
    // ----------------------------------
    (function processStatuses(){
        var statuses = data.statuses;
        if(!statuses || !statuses.data || !statuses.data.length){ return false; }
        statuses = statuses.data;

        var tmpPersonality = getNewPersonality();

        // we'll combine the message strings later for some simple language 
        // processing
        var messages = [];

        // keep track of likes / comments
        var comments = [];
        var likes = [];

        // and dates
        var dates = [];
        var dateHours = [];
        var dateLengths = [];
        
        // iterate over each status, setup vars
        _.each(statuses, function(status){
            // message string
            if(status.message){ messages.push(status.message); }

            // likes / comments
            if(status.comments && status.comments.data){ 
                comments.push(status.comments.data.length);
            }
            if(status.likes && status.likes.data){ 
                likes.push(status.likes.data.length);
            }

            // dates
            var date = new Date(status.updated_time);
            dates.push(date);
            dateHours.push(date.getHours());
            if(dates.length > 1){
                dateLengths.push(
                    getDays(
                        new Date(dates[dates.length-2]) - 
                        new Date(dates[dates.length-1])
                    )
                );
            }

        });

        // Calculate post frequency
        // ------------------------------
        var dayScore = stats.mean(dateLengths);
        var scale = d3.scale.linear()
            .domain([0,1,5,15,30,90,180,360]);

        // extraversion
        //  more frequent posts, more extraversion
        scale.range([35,10,5,-5,-10,-25,-35,-50]);
        tmpPersonality.extraversion += scale(dayScore);

        // neurotic
        //  more frequent posts, more neurotic
        scale.clamp(true).range([25,10,5,0,-3]);
        tmpPersonality.neuroticism+= scale(dayScore);

        // likes 
        // ------------------------------
        var likeAverage = stats.mean(likes);
        scale = d3.scale.linear()
            .domain([0,5,10,20,40]);

        //agreeableness
        scale.range([-20,-5,5,15,30]);
        tmpPersonality.agreeableness += (scale(likeAverage) / 2);
        tmpPersonality.neuroticism += ((scale(likeAverage) * -1) / 3);

        // how many posts DON'T have likes or comments?
        // ------------------------------
        var noLikes = statuses.length - likes.length;
        scale = d3.scale.linear()
            .domain([0,4,10,20]);

        // agreeableness
        scale.range([20,5,-10,-25]);
        tmpPersonality.agreeableness += scale(noLikes);

        // neurotic
        scale.range([-10,-2,10,20]);
        tmpPersonality.neuroticism += scale(noLikes);
        

        // Calculate the window of WHEN user creates posts
        // ------------------------------
        // get standard deviation
        //  first get average
        var avg = stats.mean(dateHours);

        // then standard deviation
        stdDev = stats.standard_deviation(dateHours);

        // higher stddev = less conscientiousness (less of a followed schedule)
        if(stdDev > 2){
            tmpPersonality.conscientiousness -= (Math.pow(1.8,stdDev) / 4);
        } else {
            tmpPersonality.conscientiousness += ((25 / stdDev) / 2);
        }

        // Process language
        // ------------------------------
        var languageScores = getLanguageScores(messages, 40);

        // Update personality
        // ------------------------------
        updatePersonality(languageScores, tmpPersonality, 'languageScores');
        updatePersonality(tmpPersonality, personality, 'statuses');

    })();


    // Photos
    // ----------------------------------
    (function processPhotos(){
        if(!data.photos || !data.photos.data){ return false; }

        var tmpPersonality = getNewPersonality();

        var photos = data.photos.data;
        var messages = [];
        var tags = [];

        var likes = [];
        var comments = [];

        _.each(photos, function(photo){
            // check for number of tags
            if(photo.tags && photo.tags.data){
                tags.push(photo.tags.data.length);
            }
            if(photo.name){ messages.push(photo.name); }
            if(photo.comments){ comments.push(photo.comments.data.length); }
            if(photo.likes ){ likes.push(photo.likes.data.length); }
        });

        // update personality
        // ------------------------------
        var scale = d3.scale.linear()
            .domain([0,2,4,6,10]);

        // based on tags
        var tagAverage = stats.mean(tags);
        scale.range([-10,4,8,12,15]);

        tmpPersonality.extraversion += scale(tagAverage) * 0.7;
        tmpPersonality.agreeableness += scale(tagAverage); 


        // based on comments / likes
        scale.domain([0,2,8,20,40,100,1000])
            .range([-10,-4,2,8,20,40]);
        tmpPersonality.agreeableness += (scale(stats.mean(likes)) * 0.7);
        tmpPersonality.agreeableness += (scale(stats.mean(comments)) * 0.3);

        // Process language
        // ------------------------------
        var languageScores = getLanguageScores(messages, 20);

        // Update personality
        // ------------------------------
        updatePersonality(languageScores, tmpPersonality, 'languageScores');
        updatePersonality(tmpPersonality, personality, 'photos');
    })();

    // ==================================
    //
    // Done!
    //
    // ==================================
    //Make sure nothing goes over -100 or 100
    _.each(personality, function(d,key){
        if(d < -100) { personality[key] = -100; }
        else if (d > 100){ personality[key] = 100; }
    });
    
    console.log('>>> Done processing in ', (new Date() - start) + ' ms');
    //console.log(JSON.stringify(personality, null, 4));
    console.log(personality);
    return personality;
}

module.exports = processPersonality;
