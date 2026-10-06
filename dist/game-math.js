(function(root){
  'use strict';
  const GameMath={
    dealDragonTiger(random){
      const first=Math.floor(random()*416);
      let second=Math.floor(random()*415);
      if(second>=first)second++;
      return {dragon:Math.floor((first%52)/4)+1,tiger:Math.floor((second%52)/4)+1,dragonSuit:first%4,tigerSuit:second%4};
    },
    settleDragonTiger(dragon,tiger,choice){
      if(!Number.isInteger(dragon)||!Number.isInteger(tiger)||dragon<1||dragon>13||tiger<1||tiger>13||!['dragon','tiger','tie'].includes(choice))throw new Error('Invalid Dragon Tiger round');
      const winner=dragon===tiger?'tie':dragon>tiger?'dragon':'tiger';
      return {winner,multiplier:winner===choice?(winner==='tie'?9:2):winner==='tie'?.5:0};
    }
  };
  if(typeof module!=='undefined')module.exports=GameMath;else root.GameMath=GameMath;
})(typeof window!=='undefined'?window:this);
