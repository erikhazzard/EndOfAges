/* =========================================================================
 *
 * word-writer
 *      Library for taking in an element and making words and letters appear as
 *      if by writing them
 *
 * author: Erik Hazzard
 *
 * ========================================================================= */
(function wordWriter ( $ ){

    $.fn.wordWriter = function ( options ){
        // This function takes in an `element` object and configuration `options`.
        // It turns all the text inside of an element to span elements and then 
        // fades them in word by word or letter by letter
        options = options || {};

        // Config based on options
        var callback = options.callback || function callback(err, res){ console.log('Done'); };
        var speedFactor = options.speedFactor || 0.8;
        var fadeInCss = options.fadeInCss || { opacity: 1 };
        var finalCss = options.finalCss || { opacity: 0.5 };

        var element = this;

        var text = element.html();
        
        var _timeouts = [];

        // First, clean up the text a lil bit
        text = text.trim();
        text = text
            .replace(/\n/g, '')
            .replace(/  +/g, ' ');
        
        // then split on words
        var words = text.split(' ');

        // empty the passed element's content
        element.empty();

        // setup a document fragment to append nodes to
        var $writerWrapper = $('<div class="writer-wrapper"></div>');
        var $wordEl;
        var startCssProps = { opacity: 0 };

        var velocityOptionsFadeIn = { duration: 800 * speedFactor }; 

        var velocityOptionsFinal = { delay: 2000 * speedFactor, duration: 5000 * speedFactor};

        var timeoutDelay = 0;

        var _stopAnimations = false;

        var curWord;
        var punctuationRegexLongDelay = new RegExp('[.!?]', 'i');
        var punctuationRegexShortDelay = new RegExp('[-,;:"]', 'i');

        // Fade in individual word
        function fadeInWord ( el ){
            if(_stopAnimations){ return false; }

            el.velocity(fadeInCss, velocityOptionsFadeIn)
                .velocity(finalCss, velocityOptionsFinal);
        }

        // Add a span class to wrap each word
        for(var i=0, len=words.length; i<len; i++){
            curWord = words[i];

            $wordEl = $('<span class="writer-word"></span>')
                .css(startCssProps)
                .html(curWord);

            // append the el
            $writerWrapper.append( $wordEl );

            // fade in the text
            // ------------------------------
            _timeouts.push(
                setTimeout(fadeInWord.bind(this, $wordEl), timeoutDelay)
            );

            // increment the timeout delay porportionally to the word length
            // ------------------------------
            timeoutDelay = timeoutDelay + (((curWord.length * 7) * 6) * speedFactor);

            // test for punctuation (make the *next* word slower)
            if(punctuationRegexLongDelay.test(curWord)){
                timeoutDelay += (550 * speedFactor);
            } else if(punctuationRegexShortDelay.test(curWord)){
                timeoutDelay += (250 * speedFactor);
            }

            if(i >= len-1){
                setTimeout(callback, timeoutDelay);
            }
        }

        // then append all the content
        element.append($writerWrapper);

        // Instant show
        // ------------------------------
        if(!options.disableInstant){
            // instantly animate everything
            element.click(function (){
                _stopAnimations = true;

                // clear all timeouts
                for(var i=0,len=_timeouts.length; i<len; i++){
                    clearTimeout(_timeouts[i]);
                }

                // add callback 
                velocityOptionsFadeIn.complete = callback;

                $('.writer-word')
                    .velocity('stop')
                    .velocity('stop')
                    .velocity(fadeInCss, velocityOptionsFadeIn);
            });
        }
    };

}( $ ));
