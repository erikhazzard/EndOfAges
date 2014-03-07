//========================================
//
//Tests - Entity
//
//========================================
define([
    'logger',
    'events',
    'models/Ability',
    'models/Entity'
    ], function(logger, events, Ability, Entity){

    describe('Entity Model Buff Tests', function(){
        // ==============================
        //
        // Buffs
        //
        // ==============================
        it('should add and remove a buff, and affect stats', function(done){
            var buffEffects = { armor: 10, maxHealth: 20 };

            var ability = new Ability({
                name: 'test',
                castDuration: 0,
                timeCost: 0,
                buffEffects: buffEffects,
                buffDuration: 0.03 // last a short time
            });

            var entity = new Entity();
            var originalStats = {
                armor: entity.get('attributes').get('armor'),
                maxHealth: entity.get('attributes').get('maxHealth')
            };

            // do the buff
            ability.effect({
                target: entity,
                source: entity
            });

            // some tests for active effect change
            // NOTE: There's a small delay AFTER the activeEffects are
            // changed, so this is not the last thing to happen
            entity.on('change:activeEffects', function(model, changed, options){
                assert(options.sourceAbility !== undefined);
            });

            // make sure effect got added (small delay for castDuration 
            // timeout)
            // NOTE: use setTimeout, don't use timer library here
            setTimeout(function(){
                entity.get('activeEffects').length.should.equal(1);

                // make sure stats were increased
                entity.get('attributes').get('armor').should.equal(
                    originalStats.armor + buffEffects.armor
                );
                entity.get('attributes').get('maxHealth').should.equal(
                    originalStats.maxHealth + buffEffects.maxHealth
                );

            }, 20);

            // Finally, make sure buff is removed
            setTimeout(function(){
                // make sure stat was set to normal
                entity.get('attributes').get('armor').should.equal(
                    originalStats.armor
                );
                entity.get('attributes').get('maxHealth').should.equal(
                    originalStats.maxHealth
                );

                // TODO: sometimes it's not removed??
                entity.get('activeEffects').length.should.equal(0);

                done();
            }, ability.get('buffDuration') * 1000 * 3.7);
        });

        it('should add buffs with % stats', function(done){
            var ability = new Ability({
                name: 'test',
                cooldown: 0,
                castDuration: 0,
                timeCost: 0,
                // 20% increase in max health
                buffEffects: { maxHealth: 0.2 },
                buffDuration: 0.03 // last a short time
            });

            var entity = new Entity({ attributes: {maxHealth: 200}});

            // do the buff
            ability.effect({
                target: entity,
                source: entity
            });

            // make sure effect got added (small delay for castDuration 
            // timeout)
            // NOTE: use setTimeout, don't use timer library here
            setTimeout(function(){
                entity.get('activeEffects').length.should.equal(1);

                // make sure stats were increased
                entity.get('attributes').get('maxHealth').should.equal(240);

            }, 20);

            // Finally, make sure buff is removed
            setTimeout(function(){
                // make sure stat was set to normal
                entity.get('attributes').get('maxHealth').should.equal(200);

                // TODO: sometimes it's not removed??
                entity.get('activeEffects').length.should.equal(0);

                done();
            }, ability.get('buffDuration') * 1000 * 3.7);
        });

        // stack
        // --------------------------
        it('should not be stackable', function(done){
            var ability = new Ability({ 
                cooldown: 0, castDuration: 0, timeCost: 0,
                buffEffects: { armor: 10, maxHealth: 20 },
                buffDuration: 0.15, // last a short time
                buffCanStack: false
            });

            var entity = new Entity();
            ability.effect({ source: entity, target: entity });

            var effects = entity.attributes.activeEffects;

            setTimeout(function(){
                // using the ability should replace the existing one with a new
                // one, check the startDate 
                assert(effects.length === 1);

                var originalStart = effects[0].get('_buffStartDate').getMilliseconds();

                ability.effect({ source: entity, target: entity });

                setTimeout(function(){
                    originalStart.should.not.equal(
                        effects[0].get('_buffStartDate')
                        .getMilliseconds()
                    );
                    entity.attributes.activeEffects.length.should.equal(1);
                    done();

                }, 30);
            }, 10);
        });

        it('should be stackable (called manually)', function(){
            var ability = new Ability({ 
                cooldown: 0, castDuration: 0, timeCost: 0,
                buffEffects: { armor: 10, maxHealth: 20 },
                buffDuration: 0.03, // last a short time
                buffCanStack: true
            });

            var entity = new Entity();
            entity.addBuff(ability);
            entity.addBuff(ability);

            assert(entity.attributes.activeEffects.length === 2);
            entity.removeAllBuffs();
            assert(entity.attributes.activeEffects.length === 0);
        });

        it('should properly stack damage %', function(){
            var ability = new Ability({ 
                cooldown: 0, castDuration: 0, timeCost: 0,
                buffEffects: { maxHealth: 0.2 },
                buffDuration: 0.03, // last a short time
                buffCanStack: true
            });

            var entity = new Entity({ attributes: { maxHealth: 100 }});
            entity.addBuff(ability);
            entity.get('attributes').attributes.maxHealth.should.equal(120);
            // add again, should be stacking
            entity.addBuff(ability);
            entity.get('attributes').attributes.maxHealth.should.equal(144);
            // add again, should be stacking
            entity.addBuff(ability);
            entity.get('attributes').attributes.maxHealth.should.equal(172.8);
        });

        // REMOVE stack % damage
        // ------------------------------
        it('should properly remove stack damage % in reverse order', function(){
            var ability = new Ability({ 
                cooldown: 0, castDuration: 0, timeCost: 0,
                buffEffects: { maxHealth: 0.2 },
                buffDuration: 0.03, // last a short time
                buffCanStack: true
            });

            var entity = new Entity({ attributes: { maxHealth: 100 }});

            var buff1 = entity.addBuff(ability);
            entity.get('attributes').attributes.maxHealth.should.equal(120);
            // add again, should be stacking
            var buff2 = entity.addBuff(ability);
            entity.get('attributes').attributes.maxHealth.should.equal(144);

            // add again, should be stacking
            var buff3 = entity.addBuff(ability);
            entity.get('attributes').attributes.maxHealth.should.equal(172.8);

            // just removes the first occurence of the buff
            entity.removeBuff(buff3);
            entity.get('attributes').attributes.maxHealth.should.equal(144);

            // just removes the first occurence of the buff
            entity.removeBuff(buff2);
            entity.get('attributes').attributes.maxHealth.should.equal(120);

            entity.removeBuff(buff1);
            entity.get('attributes').attributes.maxHealth.should.equal(100);
        });
        
        it('should properly remove stack damage % in random order', function(){
            var ability = new Ability({ 
                cooldown: 0, castDuration: 0, timeCost: 0,
                buffEffects: { maxHealth: 0.2 },
                buffDuration: 0.03, // last a short time
                buffCanStack: true
            });

            var entity = new Entity({ attributes: { maxHealth: 100 }});

            var buff1 = entity.addBuff(ability);
            entity.get('attributes').attributes.maxHealth.should.equal(120);
            // add again, should be stacking
            var buff2 = entity.addBuff(ability);
            entity.get('attributes').attributes.maxHealth.should.equal(144);
            // add again, should be stacking
            var buff3 = entity.addBuff(ability);
            entity.get('attributes').attributes.maxHealth.should.equal(172.8);

            // now, we should be able to remove the buffs in a random order
            // and have the proper health amount returned
            entity.removeBuff(buff2);
            entity.get('attributes').attributes.maxHealth.should.equal(148.8);
            entity.removeBuff(buff1);
            entity.get('attributes').attributes.maxHealth.should.equal(128.8);
            // final buff, no matter the order, should return the health to the
            // starting value
            entity.removeBuff(buff3);
            entity.get('attributes').attributes.maxHealth.should.equal(100);
        });

        it('should properly remove stack damage (values) in order', function(){
            var ability = new Ability({ 
                cooldown: 0, castDuration: 0, timeCost: 0,
                buffEffects: { maxHealth: 20 },
                buffDuration: 0.03, // last a short time
                buffCanStack: true
            });

            var entity = new Entity({ attributes: { maxHealth: 100 }});

            var buff1 = entity.addBuff(ability);
            entity.get('attributes').attributes.maxHealth.should.equal(120);
            var buff2 = entity.addBuff(ability);
            entity.get('attributes').attributes.maxHealth.should.equal(140);
            var buff3 = entity.addBuff(ability);
            entity.get('attributes').attributes.maxHealth.should.equal(160);

            entity.removeBuff(buff3);
            entity.get('attributes').attributes.maxHealth.should.equal(140);
            entity.removeBuff(buff2);
            entity.get('attributes').attributes.maxHealth.should.equal(120);
            entity.removeBuff(buff1);
            entity.get('attributes').attributes.maxHealth.should.equal(100);
        });


        // stack - use ability
        // --------------------------
        it('should be stackable and remove buffs', function(done){
            var ability = new Ability({ 
                cooldown: 0, castDuration: 0, timeCost: 0,
                buffEffects: { armor: 10, maxHealth: 20 },
                buffDuration: 0.04, 
                buffCanStack: true
            });

            var entity = new Entity();
            // cast buff
            ability.effect({ source: entity, target: entity });

            setTimeout(function(){
                assert(entity.attributes.activeEffects.length === 1);
            
                // apply it again
                ability.effect({ source: entity, target: entity });

                setTimeout(function(){
                    entity.attributes.activeEffects.length.should.equal(2);

                    // first buff should have worn off
                    setTimeout(function(){
                        entity.attributes.activeEffects.length.should.equal(1);

                        // second buff should be worn off
                        setTimeout(function(){
                            assert(entity.attributes.activeEffects.length === 0);
                            done();
                        }, 55); // 15 + 20 + 20 = 55, is > than buffDuration

                    }, 20); // 15 + 15 + 20 = 50, which is > than buffDuration

                }, 15);

            }, 15);
        });

        // --------------------------
        //
        // Remove tests
        //
        // --------------------------
        it('should remove all activeEffects', function(){
            var ability = new Ability({ buffEffects: { armor: 10, maxHealth: 20 }});

            var entity = new Entity();
            entity.addBuff(ability);

            assert(entity.attributes.activeEffects.length === 1);
            entity.removeAllBuffs();
            assert(entity.attributes.activeEffects.length === 0);
        });

        it('should remove all activeEffects except permanent effects', function(){
            var ability = new Ability({ isPermanent: false, buffEffects: { armor: 10, maxHealth: 20 }});
            var ability2 = new Ability({ isPermanent: true, buffEffects: { armor: 10, maxHealth: 20 }});

            var entity = new Entity();
            entity.addBuff(ability);
            entity.addBuff(ability2);

            assert(entity.attributes.activeEffects.length === 2);
            entity.removeAllBuffs();
            // should not remove permanent effects
            assert(entity.attributes.activeEffects.length === 1);
        });

        it('should remove all activeEffects when entity dies', function(done){
            var ability = new Ability({ isPermanent: false, buffEffects: { armor: 10, maxHealth: 20 }});
            var ability2 = new Ability({ isPermanent: true, buffEffects: { armor: 10, maxHealth: 20 }});

            var entity = new Entity();
            entity.addBuff(ability);
            entity.addBuff(ability2);

            assert(entity.attributes.activeEffects.length === 2);
            entity.trigger('entity:died');
            // should not remove permanent effects
            assert(entity.attributes.activeEffects.length === 1);

            // give some time for the trigger
            setTimeout(function(){
                done();
            }, 16);
        });
    });
});
