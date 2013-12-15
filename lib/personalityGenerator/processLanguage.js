//============================================================================
// processLanguage
//    
//============================================================================
var words = require('../../data/personalityWords.json');
var _ = require('lodash');

function processLanguage(corpus){
    // processLanguage
    //  takes in a corpus of target text (e.g., all a user's statuses) and
    //  matches strings against it, then returns scores for matched attribtues
    //
    var personalityScore = {
        openness: 0,
        conscientiousness: 0,
        extraversion: 0,
        agreeableness: 0,
        neuroticism: 0
    };

    // add a space at the beginning and end of corpus to make sure we
    // get words to match ( we prefix and suffix each word with a space)
    corpus = ' ' + corpus + ' ';

    // Process 
    _.each(personalityScore, function(val, trait){
        _.each(words[trait], function(pair){
            //word is first item, score is second 
            var match = corpus.match(new RegExp(' ' + pair[0] + ' ', 'gi'));
            if(match){
                personalityScore[trait] += (pair[1] * match.length);
            }
        });
    });

    return personalityScore;
}

module.exports = processLanguage;
