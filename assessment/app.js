'use strict';
const D=BBH_DATA,E=BBH_ENGINE,KEY='bbh-assessment-v2',app=document.getElementById('app');
const STAGES={idea:'Exploring an idea',launch:'Preparing to launch',trading:'Trading and establishing the business',established:'Running an established business'};
const OFFERS={service:'Services',product:'Products, including digital products',both:'Both products and services',unsure:'Still deciding'};
const GOALS={clarity:'Clarify my idea and direction',customers:'Find and serve the right customers',money:'Improve pricing and business money',running:'Make the business easier to run',direction:'Choose what comes next',protection:'Check setup and protection'};
const PRESSURES={none:'No particular immediate pressure',cash:'Cash coming in or payments due',capacity:'Workload and available capacity',setup:'Unresolved setup or protection questions'};
let state={schema:2,view:'welcome',section:1,profile:{name:'',stage:'',offer:'',goal:'',urgent:'none'},answers:{},action:'',review:'',note:''};
let storageOK=true;
try{const saved=JSON.parse(localStorage.getItem(KEY)||'null');if(saved&&saved.schema===2){
 if(saved.profile&&typeof saved.profile==='object')for(const key of Object.keys(state.profile))if(typeof saved.profile[key]==='string')state.profile[key]=saved.profile[key].slice(0,100);
 if(saved.answers&&typeof saved.answers==='object')D.questions.forEach(q=>{if(E.LABELS[saved.answers[q.id]])state.answers[q.id]=saved.answers[q.id];});
 ['action','review','note'].forEach(k=>{if(typeof saved[k]==='string')state[k]=saved[k].slice(0,3000);});
 state.section=Math.max(1,Math.min(12,Number(saved.section)||1));
 if(['welcome','profile','questions','results'].includes(saved.view))state.view=saved.view;
 if(!STAGES[state.profile.stage]||!OFFERS[state.profile.offer]||!GOALS[state.profile.goal])state.view='welcome';
}}catch{storageOK=false;}
function save(){try{localStorage.setItem(KEY,JSON.stringify(state));storageOK=true;}catch{storageOK=false;}document.getElementById('storage-status').textContent=storageOK?'Temporary draft saved in this browser only. Download your plan to keep it.':'This browser cannot save a draft. You can keep working here; download your plan before leaving.';}
function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function button(id,label,secondary=false){return `<button id="${id}" class="${secondary?'secondary':''}">${label}</button>`;}
function on(id,fn,event='click'){document.getElementById(id)?.addEventListener(event,fn);}
function go(view){state.view=view;save();render();app.focus();window.scrollTo({top:0,behavior:'instant'});}
function external(url,label,cls=''){return `<a class="${cls}" href="${esc(url)}" target="_blank" rel="noopener">${esc(label)} <span aria-hidden="true">↗</span></a>`;}
function render(){if(state.view==='welcome')welcome();else if(state.view==='profile')profile();else if(state.view==='questions')questions();else results();save();}
function welcome(){const r=E.analyse(D,state);app.innerHTML=`<div class="hero"><p class="eyebrow">Built By Her · Inside the Womeniverse™</p><h1>Built By Her Assessment</h1><p class="lede">A clearer picture of your business.<br>A useful place to start.</p><p>You do not have to work through the whole course in order. Tell us what is in place, what is still taking shape and where you would welcome some help. We will turn that into your personal learning plan.</p></div><div class="steps"><div><b>01 · Reflect</b>Review the areas that matter to your business.</div><div><b>02 · Find your focus</b>See your first three priorities and why they were suggested.</div><div><b>03 · Take one step</b>Download your plan and open the relevant lessons.</div></div><section class="panel"><h2>Start where you are</h2><p>Up to 78 short statements across the 12 course modules. Allow around 15 minutes, or pause and return in this browser.</p><p>This is a self-reflection tool, not a test, a judgement of your ability or a check that your business meets legal requirements. Staying small, simplifying and choosing “not now” are valid outcomes.</p><div class="legend"><span>In place</span><span>In progress</span><span>Not started</span><span>Need help</span><span>Not relevant now</span></div><div class="actions">${button('begin',r.answered?'Continue my assessment':'Start my assessment')}${r.answered?button('oldplan','See my plan so far',true):''}</div></section><div class="notice"><strong>Keep a copy of your plan.</strong><p>Your answers stay in this browser and are not sent to WOOT or saved to your course account. A temporary draft may be lost if you change devices or clear browser data. Download your PDF before leaving.</p></div>`;
 on('begin',()=>go('profile'));on('oldplan',()=>go('results'));
}
function options(values,current,placeholder){return (placeholder?'<option value="">Choose one</option>':'')+Object.entries(values).map(([v,t])=>`<option value="${v}" ${v===current?'selected':''}>${esc(t)}</option>`).join('');}
function profile(){app.innerHTML=`<p class="eyebrow">Before you start</p><h1>Make this about your business.</h1><p class="lede">Your stage and focus help us put the useful work first. You can change them later.</p><form id="profile-form" class="panel"><div class="field"><label for="name">First name or business name <span class="quiet">(optional)</span></label><input id="name" maxlength="80" autocomplete="off" value="${esc(state.profile.name)}"></div><div class="grid"><div class="field"><label for="stage">Where are you now?</label><select id="stage" required>${options(STAGES,state.profile.stage,true)}</select></div><div class="field"><label for="offer">What do you sell or plan to sell?</label><select id="offer" required>${options(OFFERS,state.profile.offer,true)}</select></div></div><div class="field"><label for="goal">What would help most at the moment?</label><select id="goal" required>${options(GOALS,state.profile.goal,true)}</select></div><div class="field"><label for="urgent">Is anything putting immediate pressure on the business?</label><select id="urgent">${options(PRESSURES,state.profile.urgent)}</select><p class="quiet">This moves relevant gaps up your plan. If something needs immediate specialist help, do not wait to complete a lesson.</p></div><div class="actions"><button type="submit">Continue to the assessment</button><button type="button" class="secondary" id="home">Back</button></div></form><p class="quiet">The assessment does not assume a particular legal structure, a website, staff, funding or a need to use AI. Use “not relevant now” when an area does not fit.</p>`;
 ['name','stage','offer','goal','urgent'].forEach(k=>on(k,e=>{state.profile[k]=e.target.value;save();},k==='name'?'input':'change'));
 on('profile-form',e=>{e.preventDefault();go('questions');},'submit');on('home',()=>go('welcome'));
}
function questions(){const r=E.analyse(D,state),m=D.modules[state.section-1],qs=D.questions.filter(q=>q.module===m.id);const active=qs.filter(q=>E.applicable(q,state.profile));const answered=active.filter(q=>E.LABELS[state.answers[q.id]]).length;
 app.innerHTML=`<div class="progress-label"><span id="progress-text">${r.answered} of ${r.total} answered</span><span>Module ${m.id} of 12</span></div><progress id="progress" max="${r.total}" value="${r.answered}" aria-label="Assessment questions answered"></progress><nav class="module-nav" aria-label="Choose a module">${D.modules.map(x=>{const a=r.active.filter(q=>q.module===x.id);return `<button data-section="${x.id}" class="${a.every(q=>E.LABELS[state.answers[q.id]])?'complete':''}" aria-label="Module ${x.id}: ${esc(x.title)}" ${x.id===m.id?'aria-current="step"':''}>${x.id}</button>`;}).join('')}</nav><p class="eyebrow">Module ${m.id}</p><h1>${esc(m.title)}</h1><p>Think about your business as it is now. “In place” means this is useful and working for you. “Need help” means you want support, not that you have failed.</p><p class="quiet">Choose “not relevant now” to leave an area out of your priorities. If you are unsure whether something applies, choose “need help”. You can leave a question unanswered and review it later.</p><section class="panel" aria-label="Module ${m.id} questions">${qs.map(q=>{if(!E.applicable(q,state.profile))return `<div class="excluded"><strong>${esc(q.statement)}</strong><br><span class="quiet">Not included because you selected ${esc(OFFERS[state.profile.offer].toLowerCase())}. Change your business details if needed.</span></div>`;return `<fieldset id="${q.id}"><legend>${q.lesson}. ${esc(q.statement)}</legend><div class="choices">${Object.entries(E.LABELS).map(([v,l])=>`<label class="choice"><input type="radio" name="${q.id}" value="${v}" ${state.answers[q.id]===v?'checked':''}><span>${l}</span></label>`).join('')}</div><details class="question-help"><summary>What does this cover?</summary><p>${esc(q.title)} ${esc(q.outcome)}</p></details></fieldset>`;}).join('')}</section><p id="module-count" class="quiet">${answered} of ${active.length} answered in this module.</p><div class="actions">${button('previous',m.id===1?'Business details':'Previous module',true)}${button('next',m.id===12?'Build my learning plan':'Next module')}${m.id<12?button('plan','See my plan so far',true):''}</div><p class="quiet">You can move between modules freely. Unanswered items are shown as unanswered, never treated as gaps.</p>`;
 app.querySelectorAll('[data-section]').forEach(b=>b.onclick=()=>{state.section=Number(b.dataset.section);go('questions');});
 app.querySelectorAll('input[type=radio]').forEach(i=>i.onchange=()=>{state.answers[i.name]=i.value;save();const updated=E.analyse(D,state);document.getElementById('progress').value=updated.answered;document.getElementById('progress-text').textContent=`${updated.answered} of ${updated.total} answered`;document.getElementById('module-count').textContent=`${active.filter(q=>E.LABELS[state.answers[q.id]]).length} of ${active.length} answered in this module.`;});
 on('previous',()=>{if(m.id===1)go('profile');else{state.section--;go('questions');}});on('next',()=>{if(m.id===12)go('results');else{state.section++;go('questions');}});on('plan',()=>go('results'));
}
function card(q,i){return `<article class="plan-card ${i<3?'first':''}"><div class="rank">${i+1}</div><div><p class="eyebrow">Module ${q.module} · Lesson ${q.lesson} · ${esc(D.modules[q.module-1].title)}</p><h3>${esc(q.title)}</h3><p><span class="badge">${E.LABELS[q.answer]}</span></p><p class="reason">${esc(q.reason)}</p><p><strong>You’ll work towards:</strong> ${esc(q.outcome)}</p>${external(q.url,q.circle?'Open this lesson':'Open the lesson workbook','button secondary small')}${!q.circle?'<p class="quiet">This workbook is available directly while its Circle lesson entry is being added.</p>':''}</div></article>`;}
function results(){const r=E.analyse(D,state);const name=state.profile.name.trim();app.innerHTML=`<p class="eyebrow">${r.partial?'Your plan so far':'Your personal learning plan'}</p><h1>${name?esc(name)+', your':'Your'} next useful steps.</h1><p class="lede">${r.ordered.length?'Start with one of the first three priorities. The rest is here when you need it.':'There are no learning gaps marked in your answers so far.'}</p><p>${esc(STAGES[state.profile.stage]||'Business stage not selected')} · ${esc(GOALS[state.profile.goal]||'Focus not selected')}</p>${r.partial?`<div class="notice"><strong>This is a partial plan.</strong><p>${r.counts.unanswered} questions are still unanswered. Recommendations use only the gaps you have reported, so the order may change as you answer more.</p>${button('missing','Return to unanswered questions',true)}</div>`:''}<div class="metrics"><div class="metric"><strong>${r.counts.done}</strong><span>In place</span></div><div class="metric"><strong>${r.counts.progress}</strong><span>In progress</span></div><div class="metric"><strong>${r.counts.help}</strong><span>Want support</span></div><div class="metric"><strong>${r.counts.start}</strong><span>Not started</span></div></div><p class="quiet">${r.counts.na} marked not relevant now. These are excluded from priorities. This is a learning snapshot, not a business score or a certificate of readiness.</p><div class="actions">${button('download','Download my learning plan PDF')}${button('edit','Review my answers',true)}${button('details','Change business details',true)}</div><p id="export-status" class="quiet" role="status">Download your plan to keep it. Lesson links open in your browser and may require your Womeniverse login.</p><details class="method"><summary>How your priorities were chosen</summary><p>We use the gaps you marked “need help”, “not started” or “in progress”. Immediate pressures come first, followed by protection and essential-records gaps for launch or trading, early foundations for an idea or launch, then your chosen focus and other gaps.</p><p>Within these groups, requests for help come first, then work not started, then work in progress. Where another reported gap is useful preparation, it can move immediately before the related lesson. These are suggested steps, not compulsory prerequisites. You can open any lesson directly.</p><p>“In place”, “not relevant now” and unanswered items do not become recommendations. Product and service pricing are tailored to your selected offer type. We do not infer business success, legal compliance or your confidence from a score.</p></details><section><p class="eyebrow">Start here</p><h2>${r.ordered.length?(r.ordered.length===1?'Your first priority':'Your first '+Math.min(3,r.ordered.length)+' priorities'):'Choose what is useful next'}</h2>${r.ordered.slice(0,3).map(card).join('')}${!r.ordered.length?`<div class="panel"><p>${r.counts.done?'You have marked some areas as in place. Keep what is working and revisit the assessment when your situation changes.':'Review any unanswered or deferred areas when they become relevant.'} You do not need to invent more work for yourself.</p>${external('https://www.womenofourtime.uk/c/founders-toolkit','Browse the BBH Toolkit','button secondary')}</div>`:''}</section>${r.ordered.length>3?`<div class="full-list"><details><summary>Your remaining ${r.ordered.length-3} priorities, in order</summary><p>There is no deadline to complete this list. Reassess when your needs change.</p>${r.ordered.slice(3).map((q,i)=>card(q,i+3)).join('')}</details></div>`:''}<section class="panel"><p class="eyebrow">Make it manageable</p><h2>Choose one next step.</h2><p>Set a pace that works with your life. These notes will be included in your PDF.</p><div class="field"><label for="action">What will you work on first?</label><textarea id="action" maxlength="2000" placeholder="One lesson, one question or one small action…">${esc(state.action)}</textarea></div><div class="grid"><div class="field"><label for="review">When would you like to review your plan? <span class="quiet">(optional)</span></label><input type="date" id="review" value="${esc(state.review)}"></div><div class="field"><label for="note">What time or support will you need? <span class="quiet">(optional)</span></label><textarea id="note" maxlength="2000">${esc(state.note)}</textarea></div></div></section><details class="method"><summary>Your snapshot across all 12 modules</summary><div class="module-summary">${r.modules.map(m=>`<div><strong>${m.id}. ${esc(m.title)}</strong>${Object.entries(m.counts).map(([k,n])=>`${n} ${E.LABELS[k]||'Unanswered'}`).join(' · ')}</div>`).join('')}</div></details><details class="method"><summary>Your full answer record</summary>${D.modules.map(m=>`<h3>${m.id}. ${esc(m.title)}</h3>${D.questions.filter(q=>q.module===m.id).map(q=>`<div class="record-row"><span>${q.lesson}. ${esc(q.statement)}</span><span>${E.applicable(q,state.profile)?(E.LABELS[state.answers[q.id]]||'Unanswered'):'Not included for offer type'}</span></div>`).join('')}`).join('')}</details><div class="notice teal"><strong>You do not have to work it all out alone.</strong><p>If you have marked “need help”, use the lesson to identify one clear question. ${external('https://www.womenofourtime.uk/women-of-our-time-support-hub','Explore the WOOT Support Hub')} for support options.</p><p class="quiet">Learning activities can help you prepare. They do not replace legal, tax, financial or other specialist advice.</p></div><div class="actions">${button('download-bottom','Download my learning plan PDF')}${button('print','Print / save as PDF',true)}${button('reset','Start a fresh assessment',true)}</div>`;
 on('download',downloadPDF);on('download-bottom',downloadPDF);on('print',printPlan);on('edit',()=>go('questions'));on('details',()=>go('profile'));on('missing',()=>{const q=r.active.find(q=>!E.LABELS[state.answers[q.id]]);state.section=q?q.module:1;go('questions');});
 ['action','review','note'].forEach(k=>on(k,e=>{state[k]=e.target.value;save();},'input'));on('reset',reset);
}
function reset(){const d=document.createElement('dialog');d.innerHTML=`<h2>Start again?</h2><p>This clears only this assessment’s temporary draft. Download your current plan first if you want to keep it.</p><div class="actions"><button id="cancel-reset" class="secondary">Keep my answers</button><button id="confirm-reset">Clear and start again</button></div>`;document.body.append(d);d.showModal();on('cancel-reset',()=>{d.close();d.remove();});on('confirm-reset',()=>{state={schema:2,view:'welcome',section:1,profile:{name:'',stage:'',offer:'',goal:'',urgent:'none'},answers:{},action:'',review:'',note:''};d.close();d.remove();go('welcome');});d.addEventListener('cancel',()=>d.remove());}
function report(){const r=E.analyse(D,state);return {r,date:new Intl.DateTimeFormat('en-GB',{dateStyle:'long',timeZone:'Europe/London'}).format(new Date()),title:r.partial?'Personal learning plan so far':'Personal learning plan'};}
function pdfClean(s){return String(s??'').replace(/[‘’]/g,"'").replace(/[“”]/g,'"').replace(/[–—]/g,'-').replace(/↗/g,'').replace(/…/g,'...').replace(/[^\x20-\u024f\u2000-\u206f\u20ac\n]/g,'');}
function createPDF(logo){
 const {r,date,title}=report(), doc=new window.jspdf.jsPDF({unit:'mm',format:'a4',compress:true});
 const navy='#1A3F59',teal='#238F8D',orange='#C4421B',purple='#8B3F92',ink='#21313F',grey='#536771',line='#D9E5E7',pale='#F6FAFA',white='#FFFFFF';
 const shades=[navy,teal,orange,purple], M=15,W=180;
 let section='',y=0;
 doc.setProperties({title:'Built By Her Assessment | Personal learning plan'});
 for(const style of ['normal','bold']){
   doc.addFileToVFS('BBH-'+style+'.ttf',window.BBH_FONTS[style]);
   doc.addFont('BBH-'+style+'.ttf','BBH',style);
 }
 function font(size,bold,color){doc.setFont('BBH',bold?'bold':'normal');doc.setFontSize(size);doc.setTextColor(color);}
 function label(s,x,base,size=9,bold=false,color=ink,align='left'){
   font(size,bold,color);doc.text(pdfClean(s),x,base,{align});
 }
 function wrap(s,width,size,bold=false){font(size,bold,ink);return doc.splitTextToSize(pdfClean(s),width);}
 function box(x,top,w,h,fill,stroke=fill,radius=3){
   doc.setDrawColor(stroke);doc.setFillColor(fill);doc.setLineWidth(.3);
   doc.roundedRect(x,top,w,h,radius,radius,'FD');
 }
 function brand(w,top){
   if(logo)doc.addImage(logo,'PNG',M,top,w,w*276/900,'BBH','FAST');
   else label('BUILT BY HER',M,top+9,18,true,navy);
 }
 function newPage(){
   doc.addPage();brand(48,7);label(section,195,16,12,true,navy,'right');
   doc.setDrawColor(line);doc.line(M,26,195,26);y=33;
 }
 function room(height){if(y+height>278)newPage();}
 function paragraph(s,size=9){
   for(const row of wrap(s,W-6,size)){room(5);label(row,M+2,y+4,size);y+=5;}y+=2;
 }
 function band(s){box(M,y,W,10,navy);label(s,M+4,y+6.7,9,true,white);y+=13;}
 function hyperlink(s,x,base,url){font(9,true,teal);doc.textWithLink(s,x,base,{url});}
 brand(76,9);label('Built By Her Assessment',M,43,20,true,navy);
 const meta=[state.profile.name,date].filter(Boolean).join(' · ');
 label(meta,M,50,meta.length>85?7:9,false,grey);doc.setDrawColor(line);doc.line(M,54,195,54);
 box(M,59,W,35,navy);label('YOUR BUSINESS PROFILE',21,68,8,true,white);
 label(STAGES[state.profile.stage]||'Your business',21,77,13,true,white);
 label(GOALS[state.profile.goal]||'Choose your focus when ready',21,85,9,false,white);
 box(148,67,40,12,orange);label(r.partial?'Partial plan':'Personal plan',168,74.8,9,true,white,'center');
 label(r.answered+' / '+r.total+' answered',168,85,8,false,white,'center');
 [['IN PLACE',r.counts.done,navy],['NEED HELP',r.counts.help,orange],['NOT STARTED',r.counts.start,purple]].forEach(([key,value,c],i)=>{
   const x=M+61*i;box(x,100,58,23,white,line);label(key,x+4,108,7,true,grey);label(String(value),x+4,118,16,true,c);
 });
 label('Your module snapshot',M,133,12,true,navy);
 label('Bars show how many relevant answers you marked in place.',M,139,8,false,grey);
 r.modules.forEach((m,i)=>{
   const x=M+(i>=6?94:0),base=147+(i%6)*8.1,c=m.counts;
   const total=Object.values(c).reduce((a,b)=>a+b,0)-(c.na||0)-(c.unanswered||0);
   const pct=total?Math.round(100*(c.done||0)/total):null;
   label(m.id+'. '+m.title,x,base,7.4,false,ink);
   label(pct===null?'N/A':pct+'%',x+85,base,7.4,true,grey,'right');
   box(x,base+1.5,85,2,'#E8F1F1','#E8F1F1',1);
   if(pct)box(x,base+1.5,85*pct/100,2,shades[i%4],shades[i%4],1);
 });
 box(M,198,W,38,'#FFF7F3','#F1C8B8');label('WHAT TO FOCUS ON NOW',21,206,9,true,orange);
 const first=r.ordered[0];
 if(first){
   const rows=wrap(first.title,167,12,true);rows.forEach((s,i)=>label(s,21,214+i*5,12,true,navy));
   hyperlink('Open '+(first.circle?'lesson':'workbook')+'  '+first.module+'.'+first.lesson,21,230,first.url);
 }else label('Revisit your answers when your priorities change.',21,219,11,true,navy);
 label('WHAT TO DO NEXT',M,246,9,true,teal);
 const steps=first?['Start with the focus above. Open the lesson and choose one activity.','Record one action and the support or time you need.','Use the ranked lessons on the following pages when you are ready.']:['Review your module snapshot.','Revisit any unanswered or deferred areas when they become relevant.','Keep this plan and return when your business changes.'];
 steps.forEach((s,i)=>{const base=254+i*7;doc.setFillColor(teal);doc.circle(18,base-1,2.6,'F');label(String(i+1),18,base,7,true,white,'center');label(s,24,base,8.5);});
 label(r.counts.progress+' in progress   ·   '+r.counts.na+' not relevant now   ·   '+r.counts.unanswered+' unanswered',M,278,8,false,grey);
 section='Your personal learning plan';newPage();band(title);
 paragraph([OFFERS[state.profile.offer],PRESSURES[state.profile.urgent]].filter(Boolean).join('  ·  '));
 if(r.partial)paragraph('Partial plan. Recommendations use the answers you have given so far.');
 paragraph('Your plan puts immediate pressures first, then relevant protection, foundations and your chosen focus. A preparatory lesson can appear before the lesson it supports.');
 hyperlink('Open the BBH Toolkit',M+2,y+4,'https://www.womenofourtime.uk/c/founders-toolkit');y+=11;
 for(const [i,q] of r.ordered.entries()){
   const head=wrap(q.title,158,10,true),body=wrap(q.reason,165,8.5),out=wrap(q.outcome,165,8.5);
   const height=23+4.4*head.length+3.8*(body.length+out.length);
   room(height+3);box(M,y,W,height,pale,line);doc.setFillColor(teal);doc.circle(22,y+7,4,'F');
   label(String(i+1),22,y+8,8,true,white,'center');label('MODULE '+q.module+'  ·  LESSON '+q.lesson+'  ·  '+E.LABELS[q.answer].toUpperCase(),30,y+7,7,true,teal);
   let base=y+14;
   for(const row of head){label(row,21,base,10,true,navy);base+=4.4;}
   base+=1;for(const row of body){label(row,21,base,8.5);base+=3.8;}
   base+=1;for(const row of out){label(row,21,base,8.5);base+=3.8;}
   hyperlink(q.circle?'Open this lesson':'Open the lesson workbook',21,base+3,q.url);y+=height+3;
 }
 if(!first)paragraph('You have no learning gaps marked in your answers so far.');
 room(27);band('Your next step');paragraph(state.action||'Choose one lesson or one small action.');paragraph('Review date: '+(state.review||'Not set'));paragraph('Time or support: '+(state.note||'Not added'));
 room(11);hyperlink('Explore the WOOT Support Hub',M+2,y+4,'https://www.womenofourtime.uk/women-of-our-time-support-hub');
 section='Your full answers';newPage();
 const badge={done:teal,progress:purple,help:orange,start:navy,na:grey};
 for(const m of D.modules){
   const heading='Module '+m.id+' · '+m.title;room(32);band(heading);
   for(const q of D.questions.filter(q=>q.module===m.id)){
     const rows=wrap(q.statement,131,8.6),h=Math.max(11,rows.length*4+4);
     if(y+h>278){newPage();band(heading+' (continued)');}
     box(M,y,W,h,pale,line,2);rows.forEach((s,i)=>label(s,19,y+5.5+i*4,8.6));
     const applicable=E.applicable(q,state.profile),key=applicable?state.answers[q.id]:null;
     const status=applicable?(E.LABELS[key]||'Unanswered'):'Outside offer type';
     box(154,y+h/2-3.5,38,7,badge[key]||grey,badge[key]||grey,3);
     label(status,173,y+h/2+1.1,7.5,true,white,'center');y+=h+2;
   }
   y+=3;
 }
 const pages=doc.getNumberOfPages();
 for(let i=1;i<=pages;i++){doc.setPage(i);doc.setDrawColor(line);doc.line(M,283,195,283);label('Built By Her · Inside the Womeniverse™',M,289,7,false,grey);label(i+' / '+pages,195,289,7,false,grey,'right');}
 return doc;
}
async function brandedReport(){
 const response=await fetch('logo.png');if(!response.ok)throw Error('Logo unavailable');
 return createPDF(new Uint8Array(await response.arrayBuffer()));
}
async function downloadPDF(){
 const el=document.getElementById('export-status');
 try{const doc=await brandedReport();doc.save('Built-By-Her-Learning-Plan-'+new Date().toISOString().slice(0,10)+'.pdf');el.textContent='Your branded PDF is ready. Check your Downloads or open the print copy below.';}
 catch{el.textContent='Your report could not load. Keep this page open and retry when connected.';}
}
async function printPlan(){
 const el=document.getElementById('export-status');
 const preview=window.open('about:blank','_blank');
 if(preview)preview.opener=null;
 try{
   const doc=await brandedReport(),url=URL.createObjectURL(doc.output('blob'));
   const link=document.createElement('a');link.href=url;link.target='_blank';link.rel='noopener';link.textContent='Open your branded PDF';
   el.replaceChildren(link,document.createTextNode(' and use its print control. Choose one page per sheet to match the original layout.'));
   if(preview&&!preview.closed)preview.location.replace(url);else el.scrollIntoView({block:'center'});
   window.addEventListener('pagehide',()=>URL.revokeObjectURL(url),{once:true});
 }catch{if(preview)preview.close();el.textContent='Your print copy could not load. Keep this page open and retry when connected.';}
}
render();
