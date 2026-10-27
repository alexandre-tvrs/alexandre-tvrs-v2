(function(){
'use strict';
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
class Village extends DragonStudy{
 constructor(root){
  super(root);this.worldTime=0;this.holding=new Set();
  this.entries={about:document.getElementById('about-entry')};
  for(const p of window.PORTFOLIO.projects)this.entries[p.id]=document.getElementById('entry-'+p.id);
  for(const [key,el]of Object.entries(this.entries)){
   el.addEventListener('pointerenter',()=>this.holding.add(key));el.addEventListener('pointerleave',()=>this.holding.delete(key));
   el.addEventListener('focus',()=>this.holding.add(key));el.addEventListener('blur',()=>this.holding.delete(key));
   el.addEventListener('click',()=>{this.pointer.active=false;this.call=null;this.pointerUi();this.holding.delete(key)});
  }
  this.inView=true;this.viewportObserver=new IntersectionObserver(entries=>{this.inView=entries[0].isIntersecting;this.last=null},{threshold:0});this.viewportObserver.observe(root);
  this.render();
 }
 step(dt){
  this.worldTime=(this.worldTime||0)+dt;
  this.walkPeople(dt);
  if(!this.holding?.has('about'))super.step(dt);
 }
 // Ambient time continues while a character is held for clicking.
 tick(now){if(this.last!==null&&!this.paused&&this.inView!==false){const delta=Math.min((now-this.last)/1000,.05),n=Math.ceil(delta/.012);for(let i=0;i<n;i++)this.step(delta/n);const frame=Math.floor((this.worldTime||0)*30);if(frame!==this.lastDraw){this.render();this.lastDraw=frame}}this.last=now;this.raf=requestAnimationFrame(t=>this.tick(t))}
 rect(x,y,w,h,p,ch=':'){for(let j=Math.round(y);j<Math.round(y+h);j++)for(let i=Math.round(x);i<Math.round(x+w);i++)this.cell(i,j,p,ch)}
 poly(points,p){this.polygon(points.map(([x,y])=>({x:x*this.cw,y:y*this.ch})),p)}
 terrain(points,p){const baseline=this.rows*.79,factor=Math.min(1,this.cols/this.rows);this.poly(points.map(([x,y])=>[x,baseline+(y-baseline)*factor]),p)}
 river(points,p){const baseline=this.rows*.79,factor=Math.min(1,this.cols/this.rows);this.poly(points.map(([x,y])=>[x,y<baseline?baseline+(y-baseline)*factor:y]),p)}
 branch(x1,y1,x2,y2,p,ch){const n=Math.ceil(Math.hypot(x2-x1,y2-y1));for(let i=0;i<=n;i++)this.cell(Math.round(x1+(x2-x1)*i/n),Math.round(y1+(y2-y1)*i/n),p,ch)}
 ground(x){return Math.round(this.rows*.79+Math.sin(x*.047)*1.1)}
 house(x,y,width,height,variant=0){
  const w=Math.round(width),h=Math.round(height),left=Math.round(x-w/2),top=Math.round(y-h),roof=Math.max(4,Math.round(w*.33)),base=Math.round(y),mid=left+Math.floor(w/2);
  // Plinth, plaster, timber frame and stonework form one continuous facade.
  this.rect(left,base-1,w,2,27,'#');this.rect(left+1,top,w-2,h-1,variant?30:31,':');
  for(let yy=base-2;yy<base;yy++)for(let xx=left;xx<left+w;xx++)this.cell(xx,yy,(xx+yy)%3?33:29,'=');
  for(const xx of[left+1,mid,left+w-2])this.rect(xx,top,1,h,33,'|');
  const floor=top+Math.floor(h*.53);this.rect(left+1,floor,w-2,1,33,'=');this.rect(left,top,w,1,29,'=');
  if(w>17){this.branch(left+2,top+1,mid-1,floor-1,33,'/');this.branch(mid+1,top+1,left+w-3,floor-1,33,'\\');}
  this.poly([[left-2,top],[x,top-roof],[left+w+2,top]],variant?24:25);
  for(let yy=top-roof+1;yy<top;yy++)for(let xx=left-1;xx<left+w+1;xx++){const i=yy*this.cols+xx;if(this.grid[i]===(variant?24:25))this.letters[i]=((xx+yy)%2?'=':'/').charCodeAt(0)}
  this.branch(left-2,top,x,top-roof,26,'/');this.branch(x,top-roof,left+w+2,top,26,'\\');this.rect(left-2,top,w+4,1,33,'_');
  // Chimney with a cap; smoke is animated separately.
  const chimney=left+w-5;this.rect(chimney,top-roof+1,2,roof-2,33,'#');this.rect(chimney-1,top-roof,4,1,29,'=');this.chimneys.push({x:chimney,y:top-roof-1});
  // A small dormer breaks up the roof plane.
  this.poly([[mid-3,top-2],[mid,top-6],[mid+3,top-2]],30);this.branch(mid-3,top-2,mid,top-6,29,'/');this.branch(mid,top-6,mid+3,top-2,29,'\\');this.rect(mid-1,top-3,2,2,36,'+');this.cell(mid-1,top-3,35,'#');
  const window=(wx,wy)=>{this.rect(wx-1,wy-1,4,4,33,'|');this.rect(wx,wy,2,2,36,'+');this.cell(wx,wy,35,'#');this.rect(wx-1,wy+2,4,1,29,'=');this.lamps.push({x:wx,y:wy})};
  window(left+3,top+2);window(left+w-6,top+2);
  if(h>8){window(left+3,floor+2);window(left+w-6,floor+2)}
  this.rect(mid-1,base-4,3,4,34,'|');this.poly([[mid-1,base-4],[mid+.5,base-6],[mid+2,base-4]],33);this.cell(mid+1,base-2,32,'+');this.rect(mid-2,base,5,1,29,'_');
  // Porch, hanging sign and small planters read at the same cell size as Vesper.
  if(w>18){this.rect(left+w-8,base-4,7,1,25,'/');this.rect(left+w-8,base-3,1,3,33,'|');this.rect(left+w-2,base-3,1,3,33,'|');}
  this.rect(left-2,base-5,3,1,33,'_');this.rect(left-2,base-4,2,2,32,'+');
  for(const xx of[left+2,left+w-4]){this.rect(xx,base-1,2,1,36,'#');this.cell(xx,base-2,26,'*')}
 }
 tree(x,y,size){
  const h=Math.round(size),w=Math.max(3,Math.round(h*.52));this.rect(x,y-h*.6,1,h*.6,33,'|');
  for(let k=0;k<3;k++){const b=y-h*.2-k*h*.21;this.poly([[x-w*(1-k*.2),b],[x+.5,y-h-k*.1],[x+w*(1-k*.2),b]],k===2?25:24)}
  this.branch(x,y-h,x-w*.45,y-h*.5,26,'/');
 }
 buildWorld(){
  const C=this.cols,R=this.rows,u=C<100?.72:1;
  this.grid.fill(0);this.letters.fill(0);this.chimneys=[];this.lamps=[];
  // Soft terrain bands join the entire scene; the foreground stays quiet.
  this.terrain([[0,R*.63],[0,R*.57],[C*.10,R*.52],[C*.21,R*.59],[C*.34,R*.50],[C*.47,R*.61],[C*.64,R*.53],[C*.78,R*.59],[C*.91,R*.49],[C,R*.55],[C,R]],22);
  this.terrain([[0,R*.66],[C*.13,R*.61],[C*.28,R*.66],[C*.44,R*.60],[C*.59,R*.65],[C*.75,R*.61],[C*.9,R*.67],[C,R*.62],[C,R],[0,R]],23);
  this.terrain([[0,R*.77],[C*.22,R*.73],[C*.4,R*.76],[C*.61,R*.72],[C*.83,R*.75],[C,R*.71],[C,R],[0,R]],22);
  this.poly([[0,R*.85],[C*.27,R*.81],[C*.51,R*.85],[C*.72,R*.80],[C,R*.84],[C,R],[0,R]],45);
  this.poly([[0,R*.92],[C*.23,R*.89],[C*.50,R*.93],[C*.81,R*.90],[C,R*.94],[C,R],[0,R]],22);
  // Sparse glyphs keep distant hills lower in contrast than the inhabitants.
  for(let y=Math.floor(R*.55);y<R;y++)for(let x=0;x<C;x++){const i=y*C+x,p=this.grid[i];if(p===22||p===23||p===45)this.letters[i]=(x*17+y*31)%43===0?'.'.charCodeAt(0):32}
  for(let x=2;x<C-2;x+=3){const y=this.ground(x)+2+((x*7)%4);this.cell(x,y,24,',');if(x%2)this.cell(x+1,y-1,25,"'")}
  // A river runs through the same terrain, with a small crossing on the lane.
  this.river([[C*.78,R*.65],[C*.80,R*.65],[C*.81,R*.74],[C*.77,R*.82],[C*.84,R*.90],[C*.95,R],[C*.83,R],[C*.73,R*.88],[C*.72,R*.81],[C*.77,R*.73]],37);
  this.river([[C*.79,R*.67],[C*.80,R*.75],[C*.75,R*.82],[C*.78,R*.88],[C*.88,R],[C*.85,R],[C*.74,R*.88],[C*.73,R*.81],[C*.78,R*.74]],38);
  // Connected lane winds from the village square across the bridge.
  this.poly([[C*.05,R*.84],[C*.20,R*.80],[C*.43,R*.81],[C*.54,R*.78],[C*.67,R*.81],[C*.86,R*.80],[C*.97,R*.76],[C*.97,R*.78],[C*.87,R*.84],[C*.67,R*.85],[C*.55,R*.82],[C*.43,R*.85],[C*.20,R*.83],[C*.05,R*.87]],27);
  for(let x=2;x<C;x++)for(let y=Math.floor(R*.76);y<R*.88;y++){const i=y*C+x;if(this.grid[i]===27){this.letters[i]=((x+y*3)%7===0?'_':'.').charCodeAt(0);if((x*3+y)%17===0)this.grid[i]=28}}
  const houses=C<100?[[.18,.76,18,9,0],[.51,.77,21,10,1],[.84,.75,17,9,0]]:[[.20,.77,24,11,0],[.50,.79,26,12,1],[.85,.76,21,10,0]];
  for(const [x,y,w,h,v]of houses)this.house(C*x,R*y,w*u,h*u,v);
  // Bridge planks, handrail and stone abutments.
  this.rect(C*.715,R*.81,C*.115,2,32,'=');this.rect(C*.715,R*.81-2,C*.115,1,33,'_');
  for(let x=Math.round(C*.715);x<C*.83;x+=3)this.rect(x,R*.81-1,1,3,29,'|');
  this.tree(C*.065,R*.81,13*u);this.tree(C*.10,R*.77,9*u);this.tree(C*.965,R*.76,15*u);this.tree(C*.93,R*.79,10*u);
  // Wayside lamp next to the messenger's route.
  const lx=Math.round(C*.60),ly=Math.round(R*.80);this.rect(lx,ly-5,1,5,33,'|');this.rect(lx-1,ly-6,3,1,32,'=');this.rect(lx,ly-5,1,2,35,'#');this.lamps.push({x:lx,y:ly-4});
  this.worldGrid=this.grid.slice();this.worldLetters=this.letters.slice();this.worldKey=C+'x'+R;
 }
 drawWorld(){
  if(this.worldKey!==this.cols+'x'+this.rows)this.buildWorld();
  for(let i=0;i<this.grid.length;i++)if(this.worldGrid[i]){this.grid[i]=this.worldGrid[i];this.letters[i]=this.worldLetters[i]}
  const t=this.worldTime||0,C=this.cols,R=this.rows;
  for(let j=0;j<this.chimneys.length;j++){const c=this.chimneys[j];for(let k=0;k<4;k++){const phase=(t*.7+k*1.4)%6,x=Math.round(c.x+Math.sin(phase*.7+j)*1.2+phase*.4),y=Math.round(c.y-phase);this.cell(x,y,43,phase>4?'.':':')}}
  for(let j=0;j<this.lamps.length;j++){const l=this.lamps[j];this.cell(l.x,l.y,Math.sin(t*2.3+j)>-.5?35:36,'+')}
  for(let j=0;j<25;j++){const y=Math.floor(R*.69)+j,x=Math.round(C*(.784+(y/R-.75)*.30)+Math.sin(y*.8)*2);for(let k=-2;k<=2;k++){const i=y*C+x+k;if(this.worldGrid[i]===37||this.worldGrid[i]===38)this.cell(x+k,y,Math.sin(t*1.8+j+k)>.5?38:37,k%2?'~':'-')}}
  for(let j=0;j<8;j++){const x=Math.round(C*(.12+j*.105)+Math.sin(t*.4+j)*1.6),y=Math.round(R*.78+Math.sin(t*.5+j*1.7)*2);if(Math.sin(t*.8+j)>0.3)this.cell(x,y,46,'.')}
  this.citizens();this.updateEntries();
 }
 ensureWalkers(){
  const key=this.w+'x'+this.h;if(this.walkerKey===key)return;this.walkerKey=key;
  this.paths=[[.08,.79],[.20,.79],[.50,.79],[.84,.79],[.92,.80],[.94,.88],[.90,.95],[.50,.95],[.08,.95],[.06,.88],[.08,.79]].map(([x,y])=>({x:x*this.w,y:(this.w<700?(y-.79)*1.17+.755:y)*this.h}));
  this.pathLengths=[0];for(let i=1;i<this.paths.length;i++)this.pathLengths.push(this.pathLengths[i-1]+Math.hypot(this.paths[i].x-this.paths[i-1].x,this.paths[i].y-this.paths[i-1].y));this.pathTotal=this.pathLengths.at(-1);
  this.walkers=window.PORTFOLIO.projects.map((p,i)=>{const progress=i*this.pathTotal/window.PORTFOLIO.projects.length,point=this.pathPoint(progress);return{id:p.id,index:i,...point,progress,wait:0,steps:0,visits:0,face:point.segment<5?1:-1,speed:(this.w<700?14:25)*(1+(i%3)*.08)}});
 }
 pathPoint(progress){
  const distance=(progress%this.pathTotal+this.pathTotal)%this.pathTotal;let segment=0;while(segment<this.paths.length-2&&this.pathLengths[segment+1]<distance)segment++;
  const a=this.paths[segment],b=this.paths[segment+1],t=(distance-this.pathLengths[segment])/(this.pathLengths[segment+1]-this.pathLengths[segment]);return{x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t,segment};
 }
 walkPeople(dt){
  this.ensureWalkers();const modal=document.getElementById('project-dialog');
  for(const person of this.walkers){
   if(this.holding?.has(person.id)||(modal?.open&&modal.dataset.character===person.id))continue;
   if(person.wait>0){person.wait=Math.max(0,person.wait-dt);continue}
   const ahead=this.walkers[(person.index+1)%this.walkers.length],gap=(ahead.progress-person.progress+this.pathTotal)%this.pathTotal,minGap=this.pathTotal/this.walkers.length*.97;
   const stride=Math.min(person.speed*dt,Math.max(0,gap-minGap));if(stride<=0)continue;
   const next=this.pathPoint(person.progress+stride);

   const dx=next.x-person.x;if(Math.abs(dx)>.01)person.face=dx>0?1:-1;
   if(next.segment!==person.segment&&next.segment>0&&next.segment<4){person.visits++;person.wait=.7+(person.index+person.visits)%3*.55}
   person.x=next.x;person.y=next.y;person.segment=next.segment;person.progress=(person.progress+stride)%this.pathTotal;person.steps+=stride/(this.cw*1.3);
  }
 }
 citizens(){
  this.ensureWalkers();this.positions=[];
  for(const person of [...this.walkers].sort((a,b)=>a.y-b.y)){
   const i=person.index,x=Math.round(person.x/this.cw),y=Math.round(person.y/this.ch),rows=window.personRows(i,Math.floor(person.steps)),start=x-3;
   this.rect(start,y+1,7,1,27,'_');
   rows.forEach((row,j)=>{const pixels=Array.from(row);if(person.face<0)pixels.reverse();pixels.forEach((c,k)=>{const m=window.PEOPLE.palette[c];if(m){const glyph=person.face<0&&m[1]==='/'?'\\':m[1];this.cell(start+k,y-9+j,m[0],glyph)}})});
   this.positions[i]={x:(x+.5)*this.cw,y:(y-4)*this.ch};
  }
 }
 updateEntries(){if(!this.entries)return;
  const head=this.head,body=this.bonePoint(7),cx=(head.x+body.x)/2,cy=(head.y+body.y)/2;
  this.placeEntry(this.entries.about,cx,cy,Math.max(90,Math.abs(head.x-body.x)+100*this.scale),Math.max(64,80*this.scale));
  window.PORTFOLIO.projects.forEach((p,i)=>{const m=this.positions[i];this.placeEntry(this.entries[p.id],m.x,m.y,this.w<700?44:6*this.cw,Math.max(70,10*this.ch));this.entries[p.id].style.zIndex=String(10+Math.round(m.y))});
 }
 placeEntry(el,x,y,w,h){el.style.left=clamp(x,w/2,this.w-w/2)+'px';el.style.top=clamp(y,h/2,this.h-h/2)+'px';el.style.width=w+'px';el.style.height=h+'px'}

}
window.Village=Village;new Village(document.getElementById('habitat'));
})();
