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
                // TODO: Store nextNodes ref differently
                // id is the node id, x / y are the position on the map,
                // nextNodes is an array of neighboring node indicies that the 
                // player can travel to from the current node (directed edges)
                // TODO: add types based on biome type (e.g., coastal, mountain)
                { id: '0', x: 132, y: 337, nextNodes: ['1'] },

                { id: '1', x: 217, y: 306, nextNodes: ['2','3'] },

                { id: '2', x: 272, y: 279, nextNodes: ['4'] }, 
                { id: '3', x: 272, y: 337, nextNodes: [] }, 

                { id: '4', x: 252, y: 229, nextNodes: [] } 

            ]
    
            // Other sets
        ]
    };

    return MAP_NODES;
});
