// ===========================================================================
//
// getSelector
//
//  Returns a function views can use to get and cache DOM selectors.
//  TODO: extend Marionette's view classes to have this, along with delete
//  the cache when the view is closed
//
// ===========================================================================
define([ 'backbone', 'marionette'], function(
        Backbone, Marionette
    ){
    
        Backbone.Marionette.Layout.prototype.getSelector = function getSelector(selector){
            // takes in a selector and returns the element(s) that belong
            // to `this` $el. Uses a cache to avoid dom hits
            var sel;
            if(this._elCache === undefined){ this._elCache = {}; }

            if(this._elCache[selector]){ 
                // in cache, return it
                sel = this._elCache[selector];
            }
            else {
                // not in cache
                sel = $(selector, this.$el);
                this._elCache[selector] = sel;
            }

            return sel;
        };


        return this;
});
