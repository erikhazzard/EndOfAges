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
        'models/Ability',
        'models/data-abilities'
        // TODO : remove this, get from server
        ,'models/data-races'
    ], function MapModel(
        Backbone, Marionette, logger,
        events, d3, API_URL,
        Entities, Entity,

        Abilities,
        Ability,
        dataAbilities,
        RACES
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

            // TODO: :::::::::::::::: 
            // Randomize enemies better, get enemies from server!
            if(!options.enemyEntities){
                // generate random enemy entities
                entities.push(this.getRandomEntity());

                // DEV : Manually add a number of entities
                entities.push(this.getRandomEntity());

                // Add more enemies
                // TODO: For dev, only add one for now.
                if(false){
                    while(i<3) {
                        if(Math.random() < (1/(i+3))){
                            entities.push(this.getRandomEntity()); 
                        }
                        i++;
                    }
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
            // TODO: make this more smarter, depending on player levels, etc.
            var entity;
            var abilities = new Abilities();

            //// LEGIT Abilities
            //abilities.add([
                //new Ability(dataAbilities[1]),
                //new Ability(dataAbilities[3]),
                //new Ability(dataAbilities[7])
            //]);
            
            //// suspend
            abilities.add([
                new Ability(dataAbilities[2])
            ]);

            // generate new entity
            entity = new Entity({
                //// FOR ALL : 
                //TODO: set abilities
                abilities: abilities,
                race: RACES[Math.random() * RACES.length | 0]
            });
            // gimp stats. TODO: Scale based on encounter
            entity.get('attributes').set({
                armor: Math.random() * -40,
                attack: Math.random() * -80,
                magicResist:  Math.random() * -20,
                magicPower: Math.random() * -20
            });

            return entity;
        }
    });

    return Battle;
});
