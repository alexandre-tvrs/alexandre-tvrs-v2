(function(){
'use strict';
const data=window.PORTFOLIO,esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
// The same nine character sprites are used in the village and project index.
window.PEOPLE={
 palette:{h:[40,'='],l:[41,'+'],s:[42,':'],b:[33,'|'],g:[8,'#'],a:[6,'/'],w:[15,'*'],r:[4,'+'],d:[2,':']},
 sprites:[
  ['   l   ','  hhh  ','   ss  ','  hhl  ','  hlhg ','  hhhg ','  hhh  ','   bb  ','  b  b ','  b  b '],
  ['  hhh  ',' hhhhh ','  sws  ','  hhl w','  hlh g','  hhhgg','  hhh  ','  b b  ','  b b  ',' bb bb '],
  ['  g g  ',' ggggg ','  ss   ','  dd   ','  dlaaa','  dlaaa','  ddd  ','  b b  ','  b b  ',' bb bb '],
  ['  ggg  ',' ggggg ','  ss   ','  dld b','  dddgb','  ddd  ','  bbb  ','  b b  ',' b   b ',' bb  bb'],
  ['  hhh  ','  hhh  ','  ss   ','  rraaa','  rraaa','  rraaa','  rrr  ','  b b  ','  b b  ',' bb bb '],
  ['  ggg  ',' ggggg ','  ss   ','  dd   ','  dlaaa','  dlaaa','  ddd  ','  b b  ','  b b  ',' bb bb '],
  ['  ll   ',' llllg ','  ss   ','  hhl  ','  hlgg ','  hggg ','  hhg  ','  b b  ',' b   b ',' bb  bb'],
  ['   l  w','  hhh b',' hhhhhb','   ss b','  hhl b','  hhlgb','  hhh b',' hhhhhb','  b b b',' bb bbb'],
  ['  ddd  ',' ddddd ','  ss  g','  rrr b','  rrlgb','  rrr  ','  bbb  ','  b b  ','  b b  ',' bb bb ']
 ]};
window.personRows=(index,frame=0)=>{const rows=window.PEOPLE.sprites[index].slice();if(frame%2===1){rows[8]='  b b  ';rows[9]=' bb bb '}return rows};
const avatar=i=>'<pre class="person-art" aria-hidden="true">'+window.personRows(i).map(row=>Array.from(row).map(c=>{const p=window.PEOPLE.palette[c];return '<span class="pixel '+(p?'p'+p[0]:'empty')+'">'+(p?esc(p[1]):' ')+'</span>'}).join('')).join('\n')+'</pre>';
document.getElementById('identity-dragon').innerHTML=window.DRAGON_PORTRAIT;
document.getElementById('projects-list').innerHTML=data.projects.map((p,i)=>'<article class="project '+(i===0?'featured':'')+'" id="project-'+p.id+'" tabindex="-1" aria-labelledby="title-'+p.id+'"><div class="project-person"><span class="project-number">'+String(i+1).padStart(2,'0')+'</span>'+avatar(i)+'<span>'+esc(p.person)+'</span></div><div class="project-content"><div class="project-meta"><span>'+esc(p.kind)+'</span><span>'+esc(p.year)+(p.archived?' · Archived':'')+'</span></div><h3 id="title-'+p.id+'">'+esc(p.name)+'</h3><p>'+esc(p.description)+'</p>'+(p.detail?'<p>'+esc(p.detail)+'</p>':'')+(p.points?'<ul class="project-results">'+p.points.map(t=>'<li>'+esc(t)+'</li>').join('')+'</ul>':'')+'<ul class="tags" aria-label="Technologies">'+p.tags.map(t=>'<li>'+esc(t)+'</li>').join('')+'</ul></div><div class="project-links">'+p.links.map(([label,url])=>'<a class="text-link" href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">'+esc(label)+' ↗</a>').join('')+'<button class="project-open" type="button" data-project="'+p.id+'" aria-label="View details for '+esc(p.name)+'">View details +</button></div></article>').join('');
document.getElementById('about-text').innerHTML=data.about.map(p=>'<p>'+esc(p)+'</p>').join('');
document.getElementById('stack-list').innerHTML=[data.stack[3],data.stack[1],data.stack[0],data.stack[2],data.stack[5],data.stack[4]].map((s,i)=>'<div class="stack-group"><span class="stack-index">0'+(i+1)+'</span><h4>'+esc(s.name)+'</h4><ul>'+s.core.map(t=>'<li class="core">'+esc(t)+'</li>').join('')+s.other.map(t=>'<li>'+esc(t)+'</li>').join('')+'</ul></div>').join('');
document.getElementById('career-list').innerHTML=data.career.map(c=>'<article class="career-item"><div class="career-date">'+esc(c.date)+'</div><div><h3>'+esc(c.role)+'</h3><p class="career-company">'+esc(c.company)+' <span>/ '+esc(c.place)+'</span></p><p>'+esc(c.text)+'</p>'+(c.points.length?'<ul>'+c.points.map(t=>'<li>'+esc(t)+'</li>').join('')+'</ul>':'')+(c.engagements||[]).map(e=>'<section class="engagement"><div class="engagement-heading"><h4>'+esc(e.name)+'</h4><span>'+esc(e.date)+'</span></div><p>'+esc(e.text)+'</p><ul>'+e.points.map(t=>'<li>'+esc(t)+'</li>').join('')+'</ul></section>').join('')+'</div></article>').join('');
document.getElementById('service-list').innerHTML=[data.services[1],data.services[3],data.services[0],data.services[2]].map(([name,text],i)=>'<div class="service"><span>0'+(i+1)+'</span><div><h3>'+esc(name)+'</h3><p>'+esc(text)+'</p></div></div>').join('');
document.getElementById('people-entries').innerHTML=data.projects.map((p,i)=>'<button class="character person-entry" id="entry-'+p.id+'" type="button" data-project="'+p.id+'" aria-label="'+esc(p.person)+' — open '+esc(p.name)+'"><span class="character-label">'+esc(p.name)+' ↗</span></button>').join('');
// Native anchors keep content accessible through direct routes.
const modal=document.getElementById('project-dialog');let opener=null;
window.openPortfolioStory=(key,source)=>{
 opener=source||document.activeElement;const p=data.projects.find(p=>p.id===key),index=data.projects.indexOf(p);
 document.getElementById('dialog-avatar').innerHTML=p?avatar(index):window.DRAGON_PORTRAIT;
 document.getElementById('dialog-eyebrow').textContent=p?p.person+' / '+p.kind:'The Dragon / About me';
 document.getElementById('dialog-title').textContent=p?p.name:data.name;
 document.getElementById('dialog-copy').innerHTML=(p?[p.description,...(p.detail?[p.detail]:[]),...(p.points||[])]:data.about).map(t=>'<p>'+esc(t)+'</p>').join('');
 document.getElementById('dialog-tags').innerHTML=(p?p.tags:['Machine Learning','Computer Vision','Software Engineering','São Paulo']).map(t=>'<li>'+esc(t)+'</li>').join('');
 document.getElementById('dialog-links').innerHTML=p?p.links.map(([label,url])=>'<a class="text-link" href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">'+esc(label)+' ↗</a>').join(''):'<a class="text-link" href="#/about">Explore my background and skills ↗</a><a class="text-link" href="#/contact">Get in touch ↗</a>';
 modal.dataset.character=key;modal.showModal();document.getElementById('modal-close').focus();
};
document.addEventListener('click',e=>{const project=e.target.closest('[data-project]');if(project)window.openPortfolioStory(project.dataset.project,project);if(e.target.closest('#about-entry'))window.openPortfolioStory('about',document.getElementById('about-entry'))});
document.getElementById('modal-close').addEventListener('click',()=>modal.close());
modal.addEventListener('click',e=>{if(e.target===modal){const b=modal.getBoundingClientRect();if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom)modal.close()}});
modal.addEventListener('close',()=>{modal.dataset.character='';opener?.focus({preventScroll:true})});
const routes=['village','projects','about','experience','datadev','contact'];
const moreMenu=document.getElementById('mobile-more-menu'),moreButton=document.getElementById('mobile-more');
moreMenu.addEventListener('toggle',()=>moreButton.setAttribute('aria-expanded',String(moreMenu.matches(':popover-open'))));
matchMedia('(min-width: 701px)').addEventListener('change',e=>{if(e.matches&&moreMenu.matches(':popover-open'))moreMenu.hidePopover()});
function route(){
 let name=location.hash.replace(/^#\/?/,'').split('/')[0]||'village';const aliases={vila:'village',projetos:'projects',sobre:'about',carreira:'experience',arquitetura:'village',architecture:'village',contato:'contact'};if(aliases[name]){name=aliases[name];history.replaceState(null,'','#/'+name)}if(!routes.includes(name))name='village';
 if(modal.open)modal.close();document.body.dataset.route=name;
 if(moreMenu.matches(':popover-open'))moreMenu.hidePopover();
 moreButton.classList.toggle('active',['datadev','contact'].includes(name));
 for(const section of document.querySelectorAll('.route-page'))section.hidden=section.dataset.route!==name;
 document.querySelector('footer').hidden=name==='village';
 for(const link of document.querySelectorAll('nav a')){if(link.hash==='#/'+name)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current')}
 document.title=(name==='village'?'Alexandre Tavares · Machine Learning & Software':({projects:'Projects',about:'About me',experience:'Experience',datadev:'DATA&DEV',contact:'Contact'}[name]+' · Alexandre Tavares'));
 window.scrollTo({top:0,behavior:'instant'});
 if(name!=='village'){const section=document.querySelector('[data-route="'+name+'"].route-page');section.setAttribute('tabindex','-1');section.focus({preventScroll:true})}
}
window.addEventListener('hashchange',route);route();
})();
