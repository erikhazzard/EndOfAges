// ===========================================================================
//
// browser detect
//
//  -Returns an object containing browser info
//
// ===========================================================================
define( [ ], function(){
    //Get the current campaign
    //  (NOTE: get from URL when set up, e.g.:
    //  var campaign = window.location.host.split('.')[0]
    var browserInfo = {
        isIe8: $('html').hasClass('ie8')
    };

    return browserInfo;
});
