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

fields = [...document.querySelectorAll('[data-save]')];
fields.forEach(field => { field.value = typeof state[field.dataset.save] === 'string' ? state[field.dataset.save] : ''; });
function storageMessage(){status.textContent=storageAvailable?'Temporary draft on this browser only. Export your PDF to keep your work.':'This browser cannot retain a draft. Keep this page open and export your PDF before leaving.';}
function update(){}
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
 out.append(paragraph('Built By Her · Module 4 · Brand and Messaging · BM-06 · Version '+RELEASE,'print-meta'));
 out.append(paragraph('Workbook: '+strandBook.items[strandBook.active].name));
 out.append(paragraph('Export prepared: '+new Date().toLocaleDateString('en-GB')+' · Full lesson and completed workbook','print-meta'));
 document.querySelectorAll('main > section.panel:not(.export)').forEach(section=>{
  const clone=section.cloneNode(true);
  clone.dataset.section=section.id;
  clone.querySelectorAll('[data-save]').forEach(field=>{
   const live=document.getElementById(field.id);
   if(live.value.length>900 || live.value.split('\n').length>12)field.closest('.field')?.classList.add('long-answer');
   field.replaceWith(paragraph(live.value.trim()||'Not yet completed','print-answer'));
  });
  clone.querySelectorAll('.help').forEach(help=>{
   const tip=help.querySelector('.tip');
   help.replaceWith(paragraph('Guidance: '+tip.textContent,'print-guidance'));
  });
  clone.querySelectorAll('details').forEach(detail=>detail.open=true);
  clone.querySelectorAll('.strand-tools,button,#idea-status,#date-guidance').forEach(el=>el.remove());
  clone.querySelectorAll('[id]').forEach(el=>el.removeAttribute('id'));
  clone.removeAttribute('id');
  clone.querySelectorAll('label').forEach(el=>el.removeAttribute('for'));
  out.append(clone);
 });
}
window.addEventListener('beforeprint',buildPrint);
document.getElementById('export-pdf').addEventListener('click',()=>{
 printMode='full';buildPrint();document.getElementById('export-status').textContent='Choose Save as PDF in the print window. Opening or closing that window does not confirm a file has been saved. Check your saved PDF before leaving.';window.print();
});
window.addEventListener('beforeunload',e=>{if(dirty){e.preventDefault();e.returnValue='';}});
document.getElementById('reset').addEventListener('click',()=>{
 if(!confirm('Have you exported your PDF? This clears answers for the selected workbook only.'))return;
 try{localStorage.removeItem(KEY);}catch{}
 fields.forEach(f=>f.value='');state={};try{persistDraft();}catch{storageAvailable=false;}dirty=false;update();storageMessage();document.getElementById('export-status').textContent='Current draft cleared.';
});
storageMessage();update();


function renderStrands(){
 const select=document.getElementById('strand-select');select.replaceChildren();
 strandBook.items.forEach((strand,i)=>{const opt=document.createElement('option');opt.value=i;opt.textContent=strand.name;select.append(opt);});
 select.value=strandBook.active;
 document.getElementById('strand-name').value=strandBook.items[strandBook.active].name;
}
function restoreStrand(){
 state=strandBook.items[strandBook.active].answers||{};
 fields=[...document.querySelectorAll('[data-save]')];
 fields.forEach(field=>field.value=typeof state[field.dataset.save]==='string'?state[field.dataset.save]:'');

 renderStrands();update();storageMessage();
}
document.getElementById('strand-select').addEventListener('change',event=>{
 strandBook.items[strandBook.active].answers=state;
 strandBook.active=Number(event.target.value);restoreStrand();
 try{persistDraft();}catch{storageAvailable=false;}storageMessage();
 document.getElementById('strand-status').textContent='Showing '+strandBook.items[strandBook.active].name+'.';
});
document.getElementById('strand-name').addEventListener('input',event=>{
 strandBook.items[strandBook.active].name=event.target.value.trim()||'Untitled workbook';
 document.getElementById('strand-select').selectedOptions[0].textContent=strandBook.items[strandBook.active].name;
 dirty=true;try{persistDraft();}catch{storageAvailable=false;}storageMessage();
});
document.getElementById('add-strand').addEventListener('click',()=>{
 strandBook.items[strandBook.active].answers=state;
 strandBook.items.push({name:'Workbook '+(strandBook.items.length+1),answers:{}});
 strandBook.active=strandBook.items.length-1;restoreStrand();dirty=true;
 try{persistDraft();}catch{storageAvailable=false;}storageMessage();
 document.getElementById('strand-status').textContent='New workbook added. Your other workbook’s answers are preserved. Give this workbook a name.';
 document.getElementById('strand-name').focus();document.getElementById('strand-name').select();
});
renderStrands();

function buildStatement(){
 const out=document.getElementById('print-workbook');out.replaceChildren();
 out.append(document.querySelector('.topbar img').cloneNode());
 const h=document.createElement('h1');h.className='statement-title';h.textContent='My brand consistency reference';out.append(h);
 out.append(paragraph('Built By Her · BM-06 · Version '+RELEASE+' · '+strandBook.items[strandBook.active].name,'print-meta'));
 out.append(paragraph('Prepared: '+new Date().toLocaleDateString('en-GB')+' · Reusable choices, a sample sentence and a place to keep your reference.','print-meta'));
 for(const id of ["rethink", "name-description", "writing-rules", "presentation-choice", "example-sentence", "keep-reference", "steady-notes", "name-notes", "description-notes", "writing-notes", "presentation-notes", "accuracy-notes", "reference-notes"]){
  const input=document.getElementById(id);if(!input)continue;
  const row=document.createElement('div');row.className='statement-row';
  if(input.value.length>900 || input.value.split('\n').length>12)row.classList.add('long-answer');
  const label=document.createElement('strong');label.textContent=document.querySelector('label[for="'+id+'"]').textContent;
  row.append(label,paragraph(input.value.trim()||'Not yet completed','print-answer'));out.append(row);
 }
}
let printMode='full';
// beforeprint must reproduce the requested output even when fired twice by a browser.
window.removeEventListener('beforeprint',buildPrint);
window.addEventListener('beforeprint',()=>printMode==='statement'?buildStatement():buildPrint());
window.addEventListener('afterprint',()=>{printMode='full';});
document.getElementById('export-statement').addEventListener('click',()=>{
 printMode='statement';buildStatement();document.getElementById('export-status').textContent='Choose Save as PDF and check the saved file. The full workbook export also includes the lesson, guidance, AI prompt and resources.';window.print();
});

