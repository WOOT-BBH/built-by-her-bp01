'use strict';
const LESSON = document.body.dataset.lesson;
const KEY = `bbh-${LESSON.toLowerCase().replace('-','')}-v${document.body.dataset.version}`;
let fields = [];
const status = document.getElementById('save-status');
let state = {}, dirty = false, storageAvailable = true;
const RELEASE = document.body.dataset.release;
const STRANDS_KEY = KEY + '-strands';
let strandBook;
try { state = JSON.parse(localStorage.getItem(KEY)) || {}; } catch { storageAvailable = false; }
if (typeof state !== 'object' || Array.isArray(state)) state = {};
try { strandBook=JSON.parse(localStorage.getItem(STRANDS_KEY)); } catch {}
if(!strandBook || !Array.isArray(strandBook.items) || !strandBook.items.length) strandBook={active:0,items:[{name:'My business',answers:state}]};
if(!Number.isInteger(strandBook.active)||!strandBook.items[strandBook.active])strandBook.active=0;
state=strandBook.items[strandBook.active].answers||{};
function persistDraft(){
 strandBook.items[strandBook.active].answers=state;
 localStorage.setItem(STRANDS_KEY,JSON.stringify(strandBook));
}

const ideaActivity = document.getElementById('add-idea').closest('.activity');
const ideaTemplate = ideaActivity.querySelector('fieldset').cloneNode(true);
let ideaCount = Math.max(1, Number(state._ideaCount) || 1);
Object.keys(state).forEach(key => {
 const match = /^idea(\d+)-/.exec(key);
 if (match && typeof state[key] === 'string' && state[key].trim()) ideaCount = Math.max(ideaCount, Number(match[1]));
});
ideaCount = Math.min(ideaCount, 1000);
ideaActivity.querySelectorAll('fieldset').forEach(row => row.remove());
function appendIdea(number) {
 const row = ideaTemplate.cloneNode(true);
 row.querySelector('legend').textContent = 'Working idea ' + number;
 row.querySelectorAll('[id], [for], [data-save]').forEach(el => {
  ['id','for','data-save'].forEach(attr => { if(el.hasAttribute(attr)) el.setAttribute(attr, el.getAttribute(attr).replace(/^idea1-/, 'idea'+number+'-')); });
 });
 row.querySelectorAll('textarea').forEach(el => { el.value = ''; });
 document.getElementById('add-idea').before(row);
 return row;
}
for (let n=1;n<=ideaCount;n++) appendIdea(n);
fields = [...document.querySelectorAll('[data-save]')];
fields.forEach(field => { field.value = typeof state[field.dataset.save] === 'string' ? state[field.dataset.save] : ''; });
function storageMessage(){status.textContent=storageAvailable?'Temporary draft on this browser only. Export your PDF to keep your work.':'This browser cannot retain a draft. Keep this page open and export your PDF before leaving.';}
function update(){
 document.getElementById('definition-preview').textContent=document.getElementById('definition').value.trim()||'Your sentence will appear here.';
 const value=id=>document.getElementById(id).value.trim();
 document.getElementById('test-summary').closest('.summary-card').hidden = !['test-action','test-assumption','test-evidence','test-date'].some(id=>value(id));
 document.getElementById('test-summary').textContent=`In the next 30 days, I will ${value('test-action')||'[action]'} to test ${value('test-assumption')||'[assumption]'}. I will look for ${value('test-evidence')||'[evidence]'} by ${value('test-date')||'[date]'}.`;
 const deadline=value('test-date'),today=new Date();today.setHours(0,0,0,0);const max=new Date(today);max.setDate(max.getDate()+30);
 document.getElementById('date-guidance').textContent=deadline&&(new Date(deadline+'T00:00:00')<today||new Date(deadline+'T00:00:00')>max)?'The lesson asks for a test within the next 30 days. Check your deadline.':'';
}
document.addEventListener('input',event=>{
 const field=event.target;
 if(!field.matches('[data-save]'))return;
 state[field.dataset.save]=field.value;dirty=true;
 try{persistDraft();storageAvailable=true;}catch{storageAvailable=false;}
 storageMessage();update();
});
let helpIndex=0;
function setupHelp(root){root.querySelectorAll('.help').forEach(help=>{
 const i=helpIndex++;
 const button=help.querySelector('button'),tip=help.querySelector('.tip');tip.id=`guidance-${i}`;button.setAttribute('aria-describedby',tip.id);
 button.addEventListener('click',()=>{help.classList.remove('suppressed');const open=help.classList.toggle('open');button.setAttribute('aria-expanded',String(open));});
 help.addEventListener('keydown',e=>{if(e.key==='Escape'){help.classList.remove('open');help.classList.add('suppressed');button.setAttribute('aria-expanded','false');}});
 help.addEventListener('mouseleave',()=>help.classList.remove('suppressed'));
});}
setupHelp(document);
document.getElementById('add-idea').addEventListener('click',()=>{
 const row=appendIdea(++ideaCount);setupHelp(row);
 fields=[...document.querySelectorAll('[data-save]')];
 state._ideaCount=ideaCount;dirty=true;
 try{persistDraft();storageAvailable=true;}catch{storageAvailable=false;}
 storageMessage();document.getElementById('idea-status').textContent='Working idea '+ideaCount+' added. Add only as many as you need.';
 row.querySelector('textarea').focus();
});
document.querySelectorAll('.copy').forEach(button=>button.addEventListener('click',async()=>{
 try{await navigator.clipboard.writeText([...button.parentElement.querySelectorAll('p')].map(p=>p.textContent).join('\n\n'));button.textContent='Copied';}
 catch{button.textContent='Select the prompt text and copy it';}
}));
function paragraph(text,cls){const p=document.createElement('p');p.textContent=text;if(cls)p.className=cls;return p;}
function buildPrint(){
 update();
 const out=document.getElementById('print-workbook');out.replaceChildren();
 out.append(document.querySelector('.topbar img').cloneNode());
 const h=document.createElement('h1');h.textContent=document.querySelector('h1').textContent;out.append(h);
 out.append(paragraph('Built By Her · Module 1 · Business Planning · BP-01 · Version '+RELEASE,'print-meta'));
 out.append(paragraph('Business strand: '+strandBook.items[strandBook.active].name));
 out.append(paragraph('Export prepared: '+new Date().toLocaleDateString('en-GB')+' · Full lesson and completed workbook','print-meta'));
 document.querySelectorAll('main > section.panel:not(.export)').forEach(section=>{
  const clone=section.cloneNode(true);
  clone.dataset.section=section.id;
  clone.querySelectorAll('[data-save]').forEach(field=>{
   const live=document.getElementById(field.id);
   field.replaceWith(paragraph(live.value.trim()||'Not yet completed','print-answer'));
  });
  clone.querySelectorAll('.help').forEach(help=>{
   const tip=help.querySelector('.tip');
   help.replaceWith(paragraph('Guidance: '+tip.textContent,'print-guidance'));
  });
  clone.querySelectorAll('details').forEach(detail=>detail.open=true);
  clone.querySelectorAll('.strand-tools,button,#idea-status,#date-guidance').forEach(el=>el.remove());
  const plan=clone.querySelector('#plan-summary');
  if(plan){
   const values=['test-action','test-assumption','test-evidence','test-date'].map(id=>document.getElementById(id).value.trim());
   if(!values.some(Boolean))plan.remove();
   else {
    plan.hidden=false;
    plan.querySelector('h4').textContent=values.every(Boolean)?'Your completed plan':'Your plan so far';
    plan.querySelector('p').textContent='In the next 30 days, I will '+(values[0]||'(action not yet completed)')+' to test '+(values[1]||'(assumption not yet completed)')+'. I will look for '+(values[2]||'(evidence not yet completed)')+' by '+(values[3]||'(date not yet completed)')+'.';
   }
  }
  clone.querySelectorAll('[id]').forEach(el=>el.removeAttribute('id'));
  clone.removeAttribute('id');
  clone.querySelectorAll('label').forEach(el=>el.removeAttribute('for'));
  out.append(clone);
 });
}
window.addEventListener('beforeprint',buildPrint);
document.getElementById('export-pdf').addEventListener('click',()=>{
 buildPrint();document.getElementById('export-status').textContent='Choose Save as PDF in the print window. Opening or closing that window does not confirm a file has been saved. Check your saved PDF before leaving.';window.print();
});
window.addEventListener('beforeunload',e=>{if(dirty){e.preventDefault();e.returnValue='';}});
document.getElementById('reset').addEventListener('click',()=>{
 if(!confirm('Have you exported your PDF? This clears answers for the selected business strand only.'))return;
 try{localStorage.removeItem(KEY);}catch{}
 fields.forEach(f=>f.value='');ideaActivity.querySelectorAll('fieldset').forEach((row,i)=>{if(i>0)row.remove();});ideaCount=1;fields=[...document.querySelectorAll('[data-save]')];document.getElementById('idea-status').textContent='One idea is enough to start.';state={};try{persistDraft();}catch{storageAvailable=false;}dirty=false;update();storageMessage();document.getElementById('export-status').textContent='Current draft cleared.';
});
// Older answers are deliberately not mapped into questions with different meanings.
try{
 const old=JSON.parse(localStorage.getItem('bbh-bp01-v1'));
 if(old&&typeof old==='object'&&Object.values(old).some(Boolean)){
 const box=document.getElementById('legacy');box.hidden=false;box.append(paragraph('An older lesson draft is on this browser. It has been preserved separately because the questions have changed.'));
 const button=document.createElement('button');button.type='button';button.textContent='Download older answers';button.className='secondary';
 button.addEventListener('click',()=>{const blob=new Blob([Object.entries(old).map(([k,v])=>k+'\n'+v).join('\n\n')],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(blob);const link=document.createElement('a');link.href=url;link.download='BP-01-older-answers.txt';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});box.append(button);
 }
}catch{}
storageMessage();update();


function renderStrands(){
 const select=document.getElementById('strand-select');select.replaceChildren();
 strandBook.items.forEach((strand,i)=>{const opt=document.createElement('option');opt.value=i;opt.textContent=strand.name;select.append(opt);});
 select.value=strandBook.active;
 document.getElementById('strand-name').value=strandBook.items[strandBook.active].name;
}
function restoreStrand(){
 state=strandBook.items[strandBook.active].answers||{};
 ideaActivity.querySelectorAll('fieldset').forEach(row=>row.remove());
 ideaCount=Math.max(1,Number(state._ideaCount)||1);
 Object.keys(state).forEach(key=>{const match=/^idea(\d+)-/.exec(key);if(match&&typeof state[key]==='string'&&state[key].trim())ideaCount=Math.max(ideaCount,Number(match[1]));});
 for(let n=1;n<=ideaCount;n++){const row=appendIdea(n);setupHelp(row);}
 fields=[...document.querySelectorAll('[data-save]')];
 fields.forEach(field=>field.value=typeof state[field.dataset.save]==='string'?state[field.dataset.save]:'');
 document.getElementById('idea-status').textContent='Add only as many ideas as you need.';
 renderStrands();update();storageMessage();
}
document.getElementById('strand-select').addEventListener('change',event=>{
 strandBook.items[strandBook.active].answers=state;
 strandBook.active=Number(event.target.value);restoreStrand();
 try{persistDraft();}catch{storageAvailable=false;}storageMessage();
 document.getElementById('strand-status').textContent='Showing '+strandBook.items[strandBook.active].name+'.';
});
document.getElementById('strand-name').addEventListener('input',event=>{
 strandBook.items[strandBook.active].name=event.target.value.trim()||'Untitled strand';
 document.getElementById('strand-select').selectedOptions[0].textContent=strandBook.items[strandBook.active].name;
 dirty=true;try{persistDraft();}catch{storageAvailable=false;}storageMessage();
});
document.getElementById('add-strand').addEventListener('click',()=>{
 strandBook.items[strandBook.active].answers=state;
 strandBook.items.push({name:'Business strand '+(strandBook.items.length+1),answers:{}});
 strandBook.active=strandBook.items.length-1;restoreStrand();dirty=true;
 try{persistDraft();}catch{storageAvailable=false;}storageMessage();
 document.getElementById('strand-status').textContent='New workbook added. Your other strand’s answers are preserved. Give this strand a name.';
 document.getElementById('strand-name').focus();document.getElementById('strand-name').select();
});
renderStrands();
