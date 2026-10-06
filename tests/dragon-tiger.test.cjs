const {test}=require('node:test');
const assert=require('node:assert/strict');
const {dealDragonTiger,settleDragonTiger}=require('../dist/game-math.js');
test('all ranks and bet sides pay the stated rules',()=>{
 for(let d=1;d<=13;d++)for(let t=1;t<=13;t++)for(const choice of ['dragon','tiger','tie']){
   const result=settleDragonTiger(d,t,choice);
   const winner=d===t?'tie':d>t?'dragon':'tiger';
   assert.equal(result.winner,winner);
   assert.equal(result.multiplier,winner===choice?(winner==='tie'?9:2):winner==='tie'?.5:0);
 }
});
test('ace is low, king is high; ties half-return side bets',()=>{
 assert.equal(settleDragonTiger(1,13,'tiger').multiplier,2);
 assert.equal(settleDragonTiger(8,8,'dragon').multiplier,.5);
 assert.equal(settleDragonTiger(8,8,'tiger').multiplier,.5);
 assert.equal(settleDragonTiger(8,8,'tie').multiplier,9);
 assert.equal(settleDragonTiger(8,9,'tie').multiplier,0);
});
test('dealing samples two different physical cards in the eight-deck shoe',()=>{
 let draws=[0,0];assert.deepEqual(dealDragonTiger(()=>draws.shift()),{dragon:1,tiger:1,dragonSuit:0,tigerSuit:1});
 draws=[1-Number.EPSILON,1-Number.EPSILON];assert.deepEqual(dealDragonTiger(()=>draws.shift()),{dragon:13,tiger:13,dragonSuit:3,tigerSuit:2});
});
test('invalid rounds reject without producing payouts',()=>{
 for(const args of [[0,1,'dragon'],[14,2,'tiger'],[2.1,3,'tie'],[3,4,'bogus']])assert.throws(()=>settleDragonTiger(...args));
});
