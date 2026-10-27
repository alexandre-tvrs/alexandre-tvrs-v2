(function(global){
'use strict';
const TAU=Math.PI*2,clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),mix=(a,b,t)=>a+(b-a)*t;
const PAINT=[' ',';',':','+','*','#','=',':','/','.',':','+','/',' ','@','*',':','+',',','*','.', '+'];
class DragonStudy{
 constructor(root){
  this.root=root;this.pre=root.querySelector('pre');this.pointer={x:0,y:0,active:false};this.call=null;this.time=0;this.clock=0;this.last=null;this.lastDraw=-1;this.heading=0;this.facing=1;this.speed=45;this.nodes=[];this.history=[];this.spark=[];this.reaction='roaming';
  this.reduce=matchMedia('(prefers-reduced-motion: reduce)');this.paused=this.reduce.matches;
  this.resize();this.observer=new ResizeObserver(()=>this.resize());this.observer.observe(root);
  root.addEventListener('pointermove',e=>{const bounds=this.root.getBoundingClientRect();this.pointer.x=e.clientX-bounds.left;this.pointer.y=e.clientY-bounds.top;this.pointer.active=true;this.pointerUi()});
  root.addEventListener('pointerleave',()=>{this.pointer.active=false;this.pointerUi()});
  root.addEventListener('pointerdown',e=>{if(e.target.closest('button,a'))return;const bounds=this.root.getBoundingClientRect();this.pointer.x=e.clientX-bounds.left;this.pointer.y=e.clientY-bounds.top;this.call={x:this.pointer.x,y:this.pointer.y,until:this.time+5};const b=document.getElementById('beacon');b.style.left=this.pointer.x+'px';b.style.top=this.pointer.y+'px';b.classList.remove('calling');void b.offsetWidth;b.classList.add('calling');this.pointer.active=true;this.pointerUi()});
  this.pauseButton=document.getElementById('pause');this.pauseButton.onclick=()=>{this.paused=!this.paused;this.updatePause()};this.updatePause();
  this.reduce.addEventListener('change',e=>{if(e.matches){this.paused=true;this.updatePause()}});
  document.addEventListener('visibilitychange',()=>{cancelAnimationFrame(this.raf);this.last=null;if(!document.hidden)this.raf=requestAnimationFrame(t=>this.tick(t))});
  if(matchMedia('(pointer: coarse)').matches)document.getElementById('instruction').textContent='Tap the sky to call the dragon.';
  this.render();this.raf=requestAnimationFrame(t=>this.tick(t));
 }
 updatePause(){this.pauseButton.textContent=this.paused?'[ > ]':'[ || ]';this.pauseButton.setAttribute('aria-pressed',String(this.paused));this.pauseButton.setAttribute('aria-label',this.paused?'Resume animation':'Pause animation')}
 pointerUi(){const a=document.getElementById('cursor-aura');a.style.left=this.pointer.x+'px';a.style.top=this.pointer.y+'px';a.style.opacity=this.pointer.active?'1':'0'}
 resize(){
  const width=this.root.clientWidth,height=this.root.clientHeight;if((!width||!height)&&this.w)return;this.w=width||window.innerWidth||1280;this.h=height||window.innerHeight||720;this.scale=Math.min(1.22,this.w/(this.w<600?780:950),this.h/650);this.cw=this.w<600?6:9;this.ch=this.w<600?7:10;
  this.cols=Math.ceil(this.w/this.cw);this.rows=Math.ceil(this.h/this.ch);this.grid=new Uint8Array(this.cols*this.rows);this.letters=new Uint8Array(this.grid.length);
  const font=this.w<600?7:9,probe=document.createElement('span');probe.textContent='0000000000';probe.style.cssText='position:absolute;visibility:hidden;white-space:pre;font:'+font+'px Consolas,Menlo,Monaco,"Courier New",monospace';this.root.append(probe);const advance=probe.getBoundingClientRect().width/10;probe.remove();
  this.root.style.setProperty('--cw',this.cw+'px');this.root.style.setProperty('--ch',this.ch+'px');this.root.style.setProperty('--font',font+'px');this.root.style.setProperty('--tracking',(this.cw-advance)+'px');
  this.flightRatio=this.h>this.w*1.45?.54:.43;this.head={x:this.w*.64,y:this.h*this.flightRatio};this.heading=0;this.speed=44*this.scale;this.history=[];
  for(let i=0;i<700;i++)this.history.push({x:this.head.x-i*1.5*this.scale,y:this.head.y});this.sampleSpine();
 }
 sampleSpine(){
  const spacing=11*this.scale;this.nodes=[{...this.head}];let distance=0,index=0;
  for(let i=1;i<29;i++){const target=i*spacing;while(index<this.history.length-1){const a=this.history[index],b=this.history[index+1],len=Math.hypot(a.x-b.x,a.y-b.y);if(distance+len>=target){const u=(target-distance)/(len||1);this.nodes.push({x:mix(a.x,b.x,u),y:mix(a.y,b.y,u)});break}distance+=len;index++}if(this.nodes.length<=i)this.nodes.push({...this.history[this.history.length-1]})}
 }
 step(dt){
  this.time+=dt;const s=this.scale,margin=Math.min(this.w*.43,305*s+30),lo=margin,hi=this.w-margin;
  let target={x:mix(lo,hi,.5+.5*Math.sin(this.time/10+.9)),y:this.h*(this.flightRatio-.01)+Math.sin(this.time/14)*this.h*(this.flightRatio>.5?.045:.09)};let desiredSpeed=54*s;this.reaction='roaming';
  const p=this.call&&this.call.until>this.time?this.call:this.pointer.active?this.pointer:null;
  if(p){const dx=p.x-this.head.x,dy=p.y-this.head.y,dist=Math.hypot(dx,dy),range=Math.max(190,270*s);
   if(this.call&&this.call.until>this.time||dist<range){const close=dist<75*s+25;this.reaction=close?'giving-space':'curious';const nx=dx/(dist||1),ny=dy/(dist||1);target=close?{x:this.head.x-nx*160*s,y:this.head.y-ny*120*s}:{x:p.x-nx*75*s,y:p.y-ny*75*s};desiredSpeed=(close?68:78)*s;}
  }
  const safe=Math.min(this.w*.42,210*s+25),top=this.flightRatio>.5?this.h*.45:Math.min(this.h*.37,230*s+35),bottom=this.h*(this.flightRatio>.5?.66:.60);const left=safe,right=this.w-safe;target.x=clamp(target.x,left,right);target.y=clamp(target.y,top,bottom);
  let desired=Math.atan2(target.y-this.head.y,target.x-this.head.x),diff=Math.atan2(Math.sin(desired-this.heading),Math.cos(desired-this.heading));
  // Broad turns keep the articulated body from folding onto itself.
  const rate=this.w<600?.62:.72;this.heading+=clamp(diff,-rate*dt,rate*dt);this.speed=mix(this.speed,desiredSpeed,Math.min(1,dt*1.5));
  this.head.x+=Math.cos(this.heading)*this.speed*dt;this.head.y+=Math.sin(this.heading)*this.speed*dt;
  // Steer away from the screen before reaching the hard boundary.
  if(this.head.x<left+30*s||this.head.x>right-30*s||this.head.y<top+10*s||this.head.y>bottom-10*s){const back=Math.atan2(this.h*this.flightRatio-this.head.y,(left+right)*.5-this.head.x);this.heading+=clamp(Math.atan2(Math.sin(back-this.heading),Math.cos(back-this.heading)),-dt*1.2,dt*1.2)}
  this.head.x=clamp(this.head.x,left,right);this.head.y=clamp(this.head.y,top,bottom);
  this.history.unshift({...this.head});let length=0;for(let i=1;i<this.history.length;i++){length+=Math.hypot(this.history[i].x-this.history[i-1].x,this.history[i].y-this.history[i-1].y);if(length>380*s){this.history.length=i+1;break}}
  this.sampleSpine();if(Math.cos(this.heading)>.18)this.facing=1;else if(Math.cos(this.heading)<-.18)this.facing=-1;
 }
 cell(x,y,p,ch){if(x<0||y<0||x>=this.cols||y>=this.rows)return;const i=y*this.cols+x;this.grid[i]=p;this.letters[i]=ch?ch.charCodeAt(0):0}
 ellipse(cx,cy,rx,ry,p){const xa=Math.floor((cx-rx)/this.cw),xb=Math.ceil((cx+rx)/this.cw),ya=Math.floor((cy-ry)/this.ch),yb=Math.ceil((cy+ry)/this.ch);for(let y=ya;y<=yb;y++)for(let x=xa;x<=xb;x++)if(((x+.5)*this.cw-cx)**2/(rx*rx)+((y+.5)*this.ch-cy)**2/(ry*ry)<=1)this.cell(x,y,p)}
 polygon(points,p){const ymin=Math.max(0,Math.floor(Math.min(...points.map(v=>v.y))/this.ch)),ymax=Math.min(this.rows-1,Math.ceil(Math.max(...points.map(v=>v.y))/this.ch));for(let y=ymin;y<=ymax;y++){const scan=(y+.5)*this.ch,hits=[];for(let i=0,j=points.length-1;i<points.length;j=i++){const a=points[i],b=points[j];if((a.y>scan)!==(b.y>scan))hits.push(a.x+(scan-a.y)*(b.x-a.x)/(b.y-a.y))}hits.sort((a,b)=>a-b);for(let i=0;i<hits.length;i+=2)for(let x=Math.ceil(hits[i]/this.cw-.5);x<=Math.floor(hits[i+1]/this.cw-.5);x++)this.cell(x,y,p)}}
 line(a,b,p,width=1){const n=Math.max(1,Math.ceil(Math.hypot(b.x-a.x,b.y-a.y)/Math.min(this.cw,this.ch)));for(let i=0;i<=n;i++){const t=i/n,cx=Math.floor(mix(a.x,b.x,t)/this.cw),cy=Math.floor(mix(a.y,b.y,t)/this.ch);for(let yy=-width+1;yy<width;yy++)for(let xx=-width+1;xx<width;xx++)this.cell(cx+xx,cy+yy,p)}}
 bonePoint(i){const p=this.nodes[i],s=this.scale;return{x:p.x,y:p.y+(i<15?Math.sin(i/15*Math.PI)*28:0)*s+Math.sin(this.time*3.2-i*.3)*(i>14?2+(i-14)*1.35:2)*s}}
 wing(far=false){
  const s=this.scale,dx=this.nodes[4].x-this.nodes[10].x,dy=this.nodes[4].y-this.nodes[10].y,f=dx/(Math.hypot(dx,dy)||1),t=this.time*3.15+(far?.32:0),lift=Math.sin(t),base=this.bonePoint(7),sh={x:base.x+(far?16:0)*s*f,y:base.y-(far?12:5)*s},q=(x,y)=>({x:sh.x+x*s*f,y:sh.y+y*s});
  const elbow=q(-30,-31-22*lift),wrist=q(-65,-77-47*lift),a=q(-155,-155-100*lift),b=q(-151,-57-65*lift),c=q(-110,1-35*lift),end=q(-49,15);
  const notch=(u,v)=>({x:(u.x+v.x)*.29+wrist.x*.42,y:(u.y+v.y)*.29+wrist.y*.42});
  const shape=[sh,elbow,wrist,a,notch(a,b),b,notch(b,c),c,end];this.polygon(shape,far?9:10);
  if(!far){this.polygon([sh,wrist,a,notch(a,b),b],11);this.polygon([wrist,b,notch(b,c),c,end],2)}
  this.line(sh,elbow,far?16:5);this.line(elbow,wrist,far?16:5);for(const tip of[a,b,c,end])this.line(wrist,tip,far?16:12);
  this.polygon([wrist,q(-66,-91-47*lift),q(-56,-78-47*lift)],far?7:8);
 }
 legs(far=false){const s=this.scale,f=this.facing;for(const [index,offset]of[[6,0],[13,.8]]){const a=this.bonePoint(index),x=a.x+(far?9:-3)*s*f,y=a.y+13*s,step=Math.sin(this.time*3.15+offset)*3*s;const b={x:x-11*s*f,y:y+21*s+step},c={x:x+12*s*f,y:y+26*s+step};this.line({x,y},b,far?1:3,2);this.line(b,c,far?2:5);for(let j=0;j<3;j++)this.line({x:c.x-j*5*s*f,y:c.y},{x:c.x+(5-j*5)*s*f,y:c.y+7*s},far?7:6)}}
 body(){const s=this.scale;for(let i=28;i>0;i--)this.line(this.bonePoint(i),this.bonePoint(i-1),i>19?4:2);for(let i=28;i>=0;i--){const p=this.bonePoint(i),r=(i<4?9+i*2.3:i<10?24-(i-6)**2*.3:i<16?22-(i-10)*2.2:Math.max(1.4,10-(i-16)*.73))*s;this.ellipse(p.x,p.y,r*1.3,r,2);this.ellipse(p.x,p.y-r*.18,r*1.15,r*.72,3);this.ellipse(p.x,p.y+r*.47,r*.88,r*.32,i<15?5:4);if(i%2===0&&i<21){const h=(i<14?11:7)*s;this.polygon([{x:p.x-6*s,y:p.y-r*.6},{x:p.x+3*s,y:p.y-r-h},{x:p.x+8*s,y:p.y-r*.5}],i<5?8:4)}if(i%3===0&&i>3&&i<17)this.line({x:p.x-r*.5,y:p.y+r*.55},{x:p.x+r*.4,y:p.y+r*.6},6)}const tip=this.bonePoint(28),prev=this.bonePoint(26),dx=tip.x-prev.x,dy=tip.y-prev.y,len=Math.hypot(dx,dy)||1,nx=-dy/len,ny=dx/len;this.polygon([{x:tip.x+dx*.4,y:tip.y+dy*.4},{x:tip.x+nx*10*s,y:tip.y+ny*10*s},{x:tip.x-dx*.8,y:tip.y-dy*.8},{x:tip.x-nx*10*s,y:tip.y-ny*10*s}],4)}
 headArt(){const s=this.scale,f=Math.tanh(Math.cos(this.heading)*5),head=this.bonePoint(0),tilt=Math.sin(this.heading)*.22,q=(x,y)=>({x:head.x+(x*Math.cos(tilt)-y*Math.sin(tilt))*s*f,y:head.y+(x*Math.sin(tilt)+y*Math.cos(tilt))*s});
  this.polygon([q(-12,-7),q(-5,-22),q(15,-26),q(28,-17),q(43,-12),q(58,-11),q(65,-3),q(60,9),q(35,11),q(22,18),q(4,16),q(-9,8)],3);
  this.polygon([q(3,-20),q(19,-21),q(32,-10),q(59,-8),q(60,-2),q(27,-2),q(13,6),q(-2,1)],4);
  this.polygon([q(13,8),q(35,5),q(60,7),q(54,15),q(29,15),q(14,21),q(-1,12)],5);
  this.line(q(27,6),q(59,6),13);this.line(q(57,-4),q(60,-3),13);
  this.polygon([q(-5,-17),q(-25,-45),q(-11,-36),q(7,-19)],8);this.polygon([q(9,-22),q(3,-45),q(15,-38),q(20,-21)],6);
  this.polygon([q(-6,0),q(-31,-14),q(-23,4),q(-13,12)],4);
  const eye=q(19,-9);this.ellipse(eye.x,eye.y,6*s,5*s,13);this.cell(Math.floor(eye.x/this.cw),Math.floor(eye.y/this.ch),this.reaction==='roaming'?14:15,'@');
  this.line(q(12,-17),q(25,-14),6);this.line(q(34,11),q(34,17),6);this.cell(Math.floor(eye.x/this.cw),Math.floor(eye.y/this.ch),this.reaction==='roaming'?14:15,'@');
 }
 render(){
  this.grid.fill(0);this.letters.fill(0);
  for(let i=0;i<27;i++){const x=(i*137.31+this.time*(i%2?.4:-.35))%this.w,y=this.h*(.12+((i*37)%67)/100);this.cell(Math.floor((x+this.w)%this.w/this.cw),Math.floor(y/this.ch),20,i%5===0?'+':'.')}
  if(this.drawWorld)this.drawWorld();
  this.wing(true);this.legs(true);this.body();this.wing(false);this.legs(false);this.headArt();
  const output=[];for(let y=0;y<this.rows;y++){let line='',run='',kind=-1;for(let x=0;x<this.cols;x++){const i=y*this.cols+x,p=this.grid[i];if(p!==kind){if(run)line+=kind>0?'<span class="p'+kind+'">'+run+'</span>':run;run='';kind=p}let ch=this.letters[i]?String.fromCharCode(this.letters[i]):PAINT[p]||':';if(ch==='&')ch='&amp;';else if(ch==='<')ch='&lt;';else if(ch==='>')ch='&gt;';run+=ch}if(run)line+=kind>0?'<span class="p'+kind+'">'+run+'</span>':run.trimEnd();output.push(line)}
  this.pre.innerHTML=output.join('\n');this.root.dataset.reaction=this.reaction;this.root.dataset.frame=String(Math.floor(this.time*30));
 }
 tick(now){if(this.last!==null&&!this.paused){const delta=Math.min((now-this.last)/1000,.05),n=Math.ceil(delta/.012);for(let i=0;i<n;i++)this.step(delta/n);const frame=Math.floor(this.time*30);if(frame!==this.lastDraw){this.render();this.lastDraw=frame}}this.last=now;this.raf=requestAnimationFrame(t=>this.tick(t))}
}
global.DragonStudy=DragonStudy;
})(globalThis);
