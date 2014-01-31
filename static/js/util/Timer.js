// ===========================================================================
//
// Timer
//
//      -Returns a {String} of the root URL for the API. For instance,
//          '/api/'
//
// ===========================================================================
define([], function TIMER(){
    // TODO: Store all timers globally so we can pause / unpause them all
    //
    // Timer class to enable pause / resume. Uses setTimeout
    //
    function Timer(callback, delay) {
        // takes in a callback {Function} and a delay {Number} (same signature
        // as setTimeout)
        var start;
        var remaining = delay;
        var timerId;

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
            timerId = window.setTimeout(callback, remaining);
            return this;
        };

        // start the timer when initiall called
        this.resume();
        return this;
    }

    return Timer;
});
