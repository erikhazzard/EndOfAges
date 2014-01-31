//========================================
//
// Timer util tests
//
//========================================
define([
        'util/Timer'
    ], function(Timer){ 

    describe('Timer', function(){
        it('should have a working pause() and resume()', function(done){
            var start = new Date();

            // when this function finishes, the test is over
            //
            // 1. Define timer func and start it
            var timer = new Timer(function(){
                // 4. when the timer finishes, make sure some time elapsed and
                // finish the test
                var finish = new Date();
                var elapsed = finish - start;

                // must take AT LEAST 80 ms (30ms + 50ms)
                assert(elapsed >= 80);
                // give an extra 20ms of room for other parallel tests
                assert(elapsed <= 100);

                done();
            }, 30); // after 30 ms, call it (but we'll be pausing)


            // 2. immediately pause it
            timer.pause();

            // 3. after a delay, resume the timer
            // after 50 ms, resume timer. total time elapsed should be ~80ms
            setTimeout(function(){
                timer.resume();
            }, 50); 
        });
    });
});
