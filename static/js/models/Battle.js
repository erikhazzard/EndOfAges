// ===========================================================================
//
//  Battle
//
//      This model manages an individual battle.
//      Used to keep track of state, battle stats, etc.
//
// ===========================================================================
define(
    [ 'backbone', 'marionette', 'logger',
        'events', 'd3', 'util/API_URL',
        'collections/Entities',
        'models/Entity',
        'collections/Abilities',
        'models/data-abilities'
    ], function MapModel(
        Backbone, Marionette, logger,
        events, d3, API_URL,
        Entities, Entity,
        Abilities,
        ABILITIES
    ){

    var Battle = Backbone.Model.extend({
        defaults: {
            id: 0,
    
            // state can be either 'normal' or 'ability' or 'pause'
            state: 'normal',
            previousState: 'normal',

            // ability the player currently has selected
            // TODO: not sure this is the best way to handle this, how to
            // allow auto attacks? does this affect it?
            playerSelectedAbility: null,

            // NOTE: player entities are passed in
            playerEntities: [],
            enemyEntities: [],
            
            //TODO: keep track of stats

            // TODO: rewards
            // These properties are set when model is created or pulled from
            // server, won't change
            rewardGold: 10,
            rewardExp: 10,

            // Item chances
            // NOTE: item chances change based on the encounter
            rewardItemChances: {
                common: 0.2,
                uncommon: 0.05,
                teasured: 0.01,
                legendary: 0.001,
                epic: 0.00001
            }
        },

        url: function getURL(){
            var url = API_URL + 'battle/' + this.get('id');
            return url;
        },

        initialize: function gameInitialize(options){
            logger.log('models/Battle', 'initialize() called');

            // TODO: get entities from game model
            
            var entities = [];
            var abilities = [];
            var i = 0;

            if(!options.enemyEntities){
                // generate random enemy entities
                entities.push(this.getRandomEntity());
                while(i<3) {
                    if(Math.random() < 0.5){
                        entities.push(this.getRandomEntity()); 
                    }
                    i++;
                }

                this.set({
                    enemyEntities: new Entities(entities)
                }, {silent: true});
            }

            // TODO: get reward stats
            return this;
        },


        getRandomEntity: function getRandomEntity(){
            // Returns a randomly generate enemy entity
            // TODO: make this more smarted, depending on player levels, etc.
            var abilities = [];
            var entity;
            var sprites = ['tiger','man1', 'darkelf'];

            if(Math.random() < 0.8){
                abilities.push(ABILITIES.flamelick);
            }
            if(Math.random() < 0.6){
                abilities.push(ABILITIES.trivialhealing);
            }
            if(Math.random() < 0.2){
                abilities.push(ABILITIES.magicmissle);
            }
            if(Math.random() < 0.05){
                abilities.push(ABILITIES.magicmissle);
            }

            // generate new entity
            entity = new Entity({
                sprite: sprites[ 
                    Math.random() * sprites.length | 0],
                abilities: new Abilities(abilities)
            });

            return entity;
        }
    });

    return Battle;
});
