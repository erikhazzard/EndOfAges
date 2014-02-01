// ===========================================================================
//
// Timer
//
//      -Returns a {String} of the root URL for the API. For instance,
//          '/api/'
//
// ===========================================================================
define(['util/generateUUID'], function TIMER(generateUUID){
    // TODO: Store all timers globally so we can pause / unpause them all
    //
    // Timer class to enable pause / resume. Uses setTimeout
    //
    function Timer(callback, delay) {
        // takes in a callback {Function} and a delay {Number} (same signature
        // as setTimeout)
        var self = this;
        var start;
        var remaining = delay;
        var timerId;

        this._id = generateUUID();

        // note : we need to store also a unique ID that won't be changed when
        // the timer is cleared in pause()

        // wrap the callback to remove the timer from the list when it's finished
        var wrappedCallback = function wrappedCallback(){
            // remove timer
            delete Timer._timers[self._id];

            // call original callback
            return callback();
        };

        // Methods
        // ------------------------------
        this.pause = function TimerPause() {
            // pause the timer by clearing the original timer and keeping track
            // of the remaining time
            window.clearTimeout(timerId);

            remaining -= new Date() - start;

            return this;
        };

        this.resume = function TimerResume() {
            // resume (or start) the timer, passing in the callback and however
            // much time is remaning (in the case of the initial call, remaining
            // will equal the delay)
            start = new Date();

            timerId = window.setTimeout(wrappedCallback, remaining);
            
            // Keep track of timers 
            Timer._timers[this._id] = this;

            return this;
        };

        // start the timer when initiall called
        this.resume();

        return this;
    }

    // Timer class props
    // ------------------------------
    // Keep track of all timers
    Timer._timers = {};
    Timer.pauseAll = function pauseAll(){
        // Pause all timers
        _.each(Timer._timers, function(timer, key){ timer.pause(); });
        return Timer;
    };

    Timer.resumeAll = function resumeAll(){
        // Resumse all timers
        console.log(" CALLED", Timer._timers);
        _.each(Timer._timers, function(timer, key){ timer.resume(); });
        return Timer;
    };

    return Timer;
});
