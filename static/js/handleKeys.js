//============================================================================
//
// Keyboard handling
//
//  Uses jwerty to listen for key presses, fires corresponding key press events
//  other app components listen for
//============================================================================
define([ 
        'events', 'logger', 'jwerty'
    ], function(
        events, logger, jwerty
    ) {
        var keys = [
            'up',
            'down',
            'left',
            'right',
            'space',
            'escape',
            'enter',
            'q','w','e','r',
            'backspace',
            'shift+up',
            'shift+down'
        ];

        var handleKeys = function handleKeys(){
            _.each(keys, function(key){
                //Site wide binding
                jwerty.key(key, function(e){
                    //If user is pressing keys in an input element, don't
                    //  trigger event
                    var tag = e.target.tagName.toLowerCase();

                    if(tag !== 'input' && tag !== 'textarea'){
                        if(key === 'backspace'){
                            //don't reload page
                            e.preventDefault();
                        }
                        events.trigger('keyPress:' + key, {
                            key: key,
                            e: e
                        });
                    }

                    //return the event
                    return e;
                });
            });

            logger.log('handleKeys', 'setup key handlers with jwerty');
            return this;
        };

        return handleKeys;
});
