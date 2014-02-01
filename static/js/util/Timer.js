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

        // how much time remains for this timer
        this.remaining = delay;

        // note : we need to store also a unique ID that won't be changed when
        // the timer is cleared in pause()
        this._id = generateUUID();

        // wrap the callback to remove the timer from the list when it's finished
        this.callback = function wrappedCallback(){
            // remove timer
            delete Timer._timers[self._id];

            // call original callback
            return callback();
        };

        // start the timer when initiall called
        this.resume();
    }

    // Object Methods
    // ------------------------------
    Timer.prototype.pause = function TimerPause() {
        // pause the timer by clearing the original timer and keeping track
        // of the remaining time
        window.clearTimeout(this.timerId);

        this.remaining -= new Date() - this.start;

        return this;
    };

    Timer.prototype.resume = function TimerResume() {
        // resume (or start) the timer, passing in the callback and however
        // much time is remaning (in the case of the initial call, remaining
        // will equal the delay)
        this.start = new Date();

        // store the ID setTimeout returns so we can clear it in pause
        this.timerId = window.setTimeout(this.callback, this.remaining);
        
        // Keep track of timers 
        Timer._timers[this._id] = this;

        return this;
    };

    // Timer class properties and methods
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
        _.each(Timer._timers, function(timer, key){ timer.resume(); });
        return Timer;
    };

    return Timer;
});
