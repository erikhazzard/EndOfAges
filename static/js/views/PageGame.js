// ===========================================================================
//
// Page Game
//
//      View for the game 
//
//      This acts also as a controller for the game. It listens for and 
//      handles game related events 
//
//      TODO: allow resuming games
//      TODO: Use EoALayoutView
//
// ===========================================================================
define(
    [ 
        'd3', 'backbone', 'marionette',
        'logger', 'events',

        // Map
        'models/Map',
        'models/Battle',

        'views/subViews/Map',
        'views/subViews/Battle'

    ], function viewPageGame(
        d3, backbone, marionette, 
        logger, events,

        Map, Battle,
        MapView,
        BattleView
    ){

    var PageGame = Backbone.Marionette.Layout.extend({
        template: '#template-page-game',
        'className': 'page-game-wrapper',

        events: {
            'click .login-facebook': 'facebookLogin'
        },
        
        regions: {
            regionNodeInstance: '#region-node-instance-wrapper',
            regionMap: '#region-map'
        },

        initialize: function initialize(options){
            // initialize:
            logger.log('views/PageGame', 'initialize() called');

            // --------------------------
            // controller / game related properties
            // --------------------------
            // only one node instance may be active at a time.
            // when a node instance is active, map is disabled and
            // nothing can happen until the instance is finished or
            // abandoned
            // NOTE: activeNodeInstance is a model property, used to 
            // keep track of what node is active

            // --------------------------
            // Setup event listeners
            // --------------------------
            // when a user clicks a node on the map
            this.listenTo(events, 'map:nodeClicked', this.mapNodeClicked);

            // when an instance (battle / shop / etc.) is finished
            this.listenTo(events, 'node:instanceFinished', 
                this.nodeInstanceFinished);
            
            // --------------------------
            // Setup views
            // --------------------------
            //
            // MAP
            // TODO: get model
            this.mapModel = new Map({});
            // TODO: Get map model from game.
            this.mapModel.generateMap();

            this.model.set({ map: this.mapModel });

            this.viewMap = new MapView({
                model: this.mapModel,
                gameModel: this.model
            }); 

            return this;
        },

        onShow: function gameOnShow(){
            logger.log('views/PageGame', 'onShow() called');
            var self = this;
            // setup the map

            this.regionMap.show(this.viewMap);
            return this;
        },

        // ------------------------------
        //
        // Map - User Interaction
        //
        // ------------------------------
        mapNodeClicked: function mapNodeClicked(options){
            //
            // This function handles user clicks on map nodes. This is
            // the main function which brings up the coresponding
            // battle / shop / etc. view based on the clicked node.
            //
            // When the instance is finished, the node:instanceFinished 
            // event is fired off, which will re-show the map
            //
            // options: {Object}
            //  node: Map node object
            //
            logger.log('views/PageGame', 
                '1. mapNodeClicked() called. Options: %O',
                options);

            // If the node instance was clicked and an instance is already 
            // active, do nothing
            if(this.model.get('activeNodeInstance') !== null){
                logger.error('views/PageGame : node instance already active!');
                logger.log('views/PageGame', '2. exiting function');
                return this;
            }

            // Hide map
            logger.log('views/PageGame', '2. Hiding map');
            //this.regionMap.$el.hide();
            this.regionMap.$el.css({ height: 0 });

            // Get node type from options
            // TODO: Best place to put a mapping of node types to views?
            //
            var node = '';

            // Valid node types:
            //      battle, shop, rest, teasure, quest, etc.
            // some % chance for each node
            var rand = Math.random();
            if(rand < 1){
                node = 'battle';
            } // TODO: other types

            // create node
            logger.log('views/PageGame', '3. Creating node instance: %O',
                nodeInstance);

            var nodeInstance = null;
            
            // Setup node
            // --------------------------
            if(node === 'battle'){
                nodeInstance = new BattleView({
                    // pass in game model
                    // TODO: get model from server, pass in playerEntities
                    model: new Battle({
                        playerEntities: this.model.get('playerEntities')
                    }),
                    gameModel: this.model 
                });
            }

            // update game model
            this.model.set({
                activeNodeInstance: nodeInstance
            }, {silent: true});
            this.model.trigger('change:activeNodeInstance');

            // set the desired next node
            this.model.get('map').set({nextNode: options.node});

            // show it
            logger.log('views/PageGame', '4. Showing node instance: %O',
                nodeInstance);
            this.regionNodeInstance.show( nodeInstance );
            this.regionNodeInstance.$el.removeClass('hidden');

            //// ===============================================================
            //// DEV / ADMIN MODE:::
            //this.nodeInstanceFinished();
            //// ===============================================================

            return this;
        },

        // ------------------------------
        //
        // Node Instance - Finished
        //
        // ------------------------------
        nodeInstanceFinished: function gameNodeInstanceFinished(options){
            //
            // When the node instance is completed (or aborted), this
            // is called. It will show the map
            //
            logger.log('views/PageGame', 
                '1. nodeInstanceFinished() called. Options: %O',
                options);

            // change the currently updated node
            // clear out the active node
            this.model.set({
                activeNodeInstance: null
            }, {silent: true});
            this.model.trigger('change:activeNodeInstance');
            
            // Hide instance
            logger.log('views/PageGame', '3. Hiding node instance');
            this.regionNodeInstance.$el.addClass('hidden');
            this.regionNodeInstance.close();

            // show map
            logger.log('views/PageGame', '4. Showing map');
            //this.regionMap.$el.show();
            this.regionMap.$el.css({ height: 100 });

            // update the map's current map node
            var map = this.model.get('map');
            map.setCurrentNode(map.get('nextNode'));
        }

    });

    return PageGame;
});
