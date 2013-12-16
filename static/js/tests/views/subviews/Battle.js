//========================================
//Tests - Battle subview
//========================================
define([
    'events',
    'models/Game',
    'models/Battle',
    'views/subviews/Battle'
    ], function(events, Game, Battle, BattleView){
    
    var game = new Game({});
    var battle = new BattleView({ 
        gameModel: game,
        model: new Battle({
            playerEntities: game.get('playerEntities')
        })
    });
    var regionBattle = new Backbone.Marionette.Region({
        el: '#region-node-instance-wrapper'
    });
    
    describe('Battle Subview', function(){
    describe('INITIALIZE', function(){
    });

    describe('SHOW', function(){
        it('should properly setup onShow', function(done){
            // TODO: this
            //battle.on('showDone', function(){
                //done();
            //});

            //regionBattle.show(battle);

            //remove this
            done();
        });
    });
    });
});
