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
                { id: '0', x: 142, y: 337, nextNodes: ['0-1'], terrain: 'plains1' },
                { id: '0-1', x: 220, y: 300, nextNodes: ['1-0', '2-0'], terrain: 'hills1' },

                { id: '1-0', x: 300, y: 288, nextNodes: ['1-1'], terrain: 'hills2' }, 
                { id: '1-1', x: 260, y: 224, nextNodes: ['1-a', '1-b'], terrain: 'marsh3' }, 
                { id: '1-a', x: 229, y: 161, nextNodes: ['1-a-1'], terrain: 'valley2' }, 
                { id: '1-a-1', x: 181, y: 182, nextNodes: ['1-a-1-a', '1-a-1-b'], terrain: 'mountains1' }, 
                { id: '1-a-1-a', x: 144, y: 141, nextNodes: [], terrain: 'mountains1' }, 
                { id: '1-a-1-b', x: 75, y: 243, nextNodes: [], terrain: 'island1' }, 

                { id: '1-b', x: 325, y: 190, nextNodes: ['1-b-1'], terrain: 'hills-river' }, 
                { id: '1-b-1', x: 351, y: 129, nextNodes: ['1-b-1-a', '1-b-1-b'], terrain: 'desert1' }, 
                { id: '1-b-1-a', x: 288, y: 100, nextNodes: [], terrain: 'oasis1' }, 
                { id: '1-b-1-b', x: 432, y: 112, nextNodes: [], terrain: 'mountains3' }, 


                { id: '2-0', x: 280, y: 370, nextNodes: ['2-1'], terrain: 'coast1' }, 
                { id: '2-1', x: 352, y: 350, nextNodes: ['2-a', '2-b'], terrain: 'coast2' }, 
                { id: '2-a', x: 342, y: 283, nextNodes: ['2-a-1'], terrain: 'plains2' }, 
                { id: '2-a-1', x: 344, y: 222, nextNodes: ['2-a-1-a', '2-a-1-b'], terrain: 'plains3' }, 
                { id: '2-a-1-a', x: 389, y: 149, nextNodes: [], terrain: 'desert3' }, 
                { id: '2-a-1-b', x: 459, y: 178, nextNodes: [], terrain: 'hills3' }, 

                { id: '2-b', x: 396, y: 321, nextNodes: ['2-a-1'], terrain: 'coast3' },
                { id: '2-b-1', x: 440, y: 245, nextNodes: ['2-b-1-a', '2-b-1-b'], terrain: 'hills3' },
                { id: '2-b-1-a', x: 579, y: 320, nextNodes: [], terrain: 'island2' },
                { id: '2-b-1-b', x: 545, y: 195, nextNodes: [], terrain: 'valley3' }

            ]
    
            // Other sets
        ]
    };

    return MAP_NODES;
});
