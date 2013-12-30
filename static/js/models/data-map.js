// ===========================================================================
//
// data-map
//
//     Possible list of map node locations
//     TODO: Pull from server when user loads a new map
//
// ===========================================================================
define(
    [ 'events', 'logger' ], function(
        events, logger
    ){
    // TODO: think of structure.
    var MAP_NODES = {
        // by map
        map1: [
            // First set of possible nodes
            [
                // id is the node id, x / y are the position on the map,
                // nextNodes is an array of neighboring node indicies that the 
                // player can travel to from the current node (directed edges)
                // TODO: add types based on biome type (e.g., coastal, mountain)
                { x: 255, y: 387, nextNodes: [1,2] },

                { x: 269, y: 314, nextNodes: [3,4] },
                { x: 342, y: 359, nextNodes: [5,6] },
                
                { x: 212, y: 247, nextNodes: [] },
                { x: 296, y: 233, nextNodes: [] },

                { x: 359, y: 294, nextNodes: [] },
                { x: 435, y: 343, nextNodes: [] }
            ]
    
            // Other sets
        ]
    };

    return MAP_NODES;
});
