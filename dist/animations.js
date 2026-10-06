'use strict';
const ArcadeFX=(()=>{
  let frame=0,timeouts=[],flightLabel=null;
  const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
  const stop=()=>{cancelAnimationFrame(frame);timeouts.forEach(clearTimeout);timeouts=[];flightLabel=null;};
  const surface=stage=>{stage.replaceChildren();const c=document.createElement('canvas');c.width=900;c.height=520;stage.append(c);return c;};
  function flight(stage){
    stop();stage.innerHTML='<canvas width="900" height="520" aria-label="Animated flight path"></canvas><div class="flight-readout"><strong>1.00×</strong><span>FLIGHT IN PROGRESS</span></div>';
    const c=stage.querySelector('canvas'),x=c.getContext('2d');flightLabel=stage.querySelector('strong');let start=performance.now();
    function paint(now){const elapsed=(now-start)/1000,p=Math.min(.9,.15+elapsed/28),endX=70+p*760,endY=445-p*p*410;x.clearRect(0,0,900,520);x.strokeStyle='#2c4252';x.lineWidth=1;
      for(let i=1;i<9;i++){x.beginPath();x.moveTo(i*100,40);x.lineTo(i*100,465);x.stroke();}for(let i=1;i<5;i++){x.beginPath();x.moveTo(50,i*100);x.lineTo(850,i*100);x.stroke();}
      x.beginPath();x.moveTo(70,445);for(let j=0;j<=100;j++){let v=p*j/100;x.lineTo(70+v*760,445-v*v*410)}x.strokeStyle='#ff6284';x.lineWidth=5;x.shadowColor='#ff4775';x.shadowBlur=16;x.stroke();x.shadowBlur=0;x.lineTo(endX,465);x.lineTo(70,465);x.closePath();const gradient=x.createLinearGradient(0,endY,0,465);gradient.addColorStop(0,'#fb5c8240');gradient.addColorStop(1,'#fb5c8200');x.fillStyle=gradient;x.fill();
      x.save();x.translate(endX,endY+(reduced()?0:Math.sin(elapsed*3)*4));x.rotate(-.35);x.fillStyle='#ff91aa';x.font='65px sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillText('✈',0,0);x.restore();frame=requestAnimationFrame(paint);
    }frame=requestAnimationFrame(paint);
  }
  function flightValue(value){if(flightLabel)flightLabel.textContent=value.toFixed(2)+'×';}
  function plinko(stage,steps,done){stop();const c=surface(stage),x=c.getContext('2d');c.width=640;c.height=400;const path=[{x:320,y:20}];steps.forEach((s,i)=>path.push({x:path.at(-1).x+(s?18.5:-18.5),y:48+i*28}));path.push({x:path.at(-1).x,y:337});let start=performance.now();const duration=reduced()?400:2100;
    function paint(now){const t=Math.min(1,(now-start)/duration),position=t*(path.length-1),i=Math.min(path.length-2,Math.floor(position)),f=position-i,from=path[i],to=path[i+1];x.clearRect(0,0,640,400);x.fillStyle='#adbdc9';for(let r=0;r<10;r++)for(let j=0;j<r+3;j++){x.beginPath();x.arc(320+(j-(r+2)/2)*37,34+r*28,3.7,0,7);x.fill();}
      const pays=[10,3,1.5,.8,.5,.3,.5,.8,1.5,3,10];for(let j=0;j<11;j++){x.fillStyle=['#fd6a82','#f6a846','#d7e359','#afd453','#82af65','#6c9162','#82af65','#afd453','#d7e359','#f6a846','#fd6a82'][j];x.beginPath();x.roundRect(120+j*37,324,31,28,4);x.fill();x.fillStyle='#14202b';x.font='bold 10px sans-serif';x.textAlign='center';x.fillText(pays[j]+'×',135.5+j*37,342);}
      const bx=from.x+(to.x-from.x)*f,by=from.y+(to.y-from.y)*f;x.shadowBlur=18;x.shadowColor='#d7ff61';x.fillStyle='#e2ff8c';x.beginPath();x.arc(bx,by,8,0,7);x.fill();x.shadowBlur=0;if(t<1)frame=requestAnimationFrame(paint);else done();
    }frame=requestAnimationFrame(paint);
  }
  function spin(stage,id,draw){stop();stage.classList.add('is-playing');if(id==='slots'){stage.innerHTML='<div class="slot-reels">'+Array.from({length:3},(_,i)=>'<div class="reel"><div style="animation-delay:-'+i*.11+'s">7<br>◆<br>♥<br>★<br>7<br>◆<br>♥<br>★</div></div>').join('')+'</div><div class="result-sub">Reels rolling…</div>';return;}
    const c=surface(stage);c.width=640;c.height=400;draw(c,id);c.classList.add(['coin','dice'].includes(id)?'tumbling':'spinning');const caption=document.createElement('div');caption.className='spin-caption';caption.textContent=id==='coin'?'Flipping…':id==='dice'?'Rolling…':'Round in progress…';stage.append(caption);
  }
  function dealDragonTiger(cards,rank){stop();['dragon','tiger'].forEach((side,i)=>{const el=document.getElementById(side+'Card');el.classList.add('dealing');timeouts.push(setTimeout(()=>{el.classList.remove('card-back');el.classList.add('revealed');const suit=['♠','♥','♣','♦'][cards[side+'Suit']];el.innerHTML='<span>'+rank(cards[side])+'</span><span>'+suit+'</span>';if(['♥','♦'].includes(suit))el.classList.add('red');},550+i*650));});}
  return {stop,flight,flightValue,plinko,spin,dealDragonTiger};
})();
