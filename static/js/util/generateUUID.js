// ===========================================================================
//
// generate a UUID. RFC4122 compliant http://www.ietf.org/rfc/rfc4122.txt
//
// ===========================================================================
define([], function generateUUID(){
    function createUUID(){
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
            /[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
        });
        return uuid;
    }
    return createUUID;
});
