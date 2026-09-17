'use strict';
const LESSON = document.body.dataset.lesson;
const KEY = `bbh-${LESSON.toLowerCase().replace('-','')}-v${document.body.dataset.version}`;
const fields = [...document.querySelectorAll('[data-save]')];
const status = document.getElementById('save-status');
let state = {}, dirty = false, storageAvailable = true;
try { state = JSON.parse(localStorage.getItem(KEY)) || {}; } catch { storageAvailable = false; }
if (typeof state !== 'object' || Array.isArray(state)) state = {};
fields.forEach(field => { field.value = typeof state[field.dataset.save] === 'string' ? state[field.dataset.save] : ''; });
function storageMessage(){status.textContent=storageAvailable?'Temporary draft on this browser only. Export your PDF to keep your work.':'This browser cannot retain a draft. Keep this page open and export your PDF before leaving.';}
function update(){
 document.getElementById('definition-preview').textContent=document.getElementById('definition').value.trim()||'Your sentence will appear here.';
 const value=id=>document.getElementById(id).value.trim();
 document.getElementById('test-summary').textContent=`In the next 30 days, I will ${value('test-action')||'[action]'} to test ${value('test-assumption')||'[assumption]'}. I will look for ${value('test-evidence')||'[evidence]'} by ${value('test-date')||'[date]'}.`;
 const deadline=value('test-date'),today=new Date();today.setHours(0,0,0,0);const max=new Date(today);max.setDate(max.getDate()+30);
 document.getElementById('date-guidance').textContent=deadline&&(new Date(deadline+'T00:00:00')<today||new Date(deadline+'T00:00:00')>max)?'The lesson asks for a test within the next 30 days. Check your deadline.':'';
}
fields.forEach(field=>field.addEventListener('input',()=>{
 state[field.dataset.save]=field.value;dirty=true;
 try{localStorage.setItem(KEY,JSON.stringify(state));storageAvailable=true;}catch{storageAvailable=false;}
 storageMessage();update();
}));
document.querySelectorAll('.help').forEach((help,i)=>{
 const button=help.querySelector('button'),tip=help.querySelector('.tip');tip.id=`guidance-${i}`;button.setAttribute('aria-describedby',tip.id);
 button.addEventListener('click',()=>{help.classList.remove('suppressed');const open=help.classList.toggle('open');button.setAttribute('aria-expanded',String(open));});
 help.addEventListener('keydown',e=>{if(e.key==='Escape'){help.classList.remove('open');help.classList.add('suppressed');button.setAttribute('aria-expanded','false');}});
 help.addEventListener('mouseleave',()=>help.classList.remove('suppressed'));
});
document.querySelectorAll('.copy').forEach(button=>button.addEventListener('click',async()=>{
 try{await navigator.clipboard.writeText([...button.parentElement.querySelectorAll('p')].map(p=>p.textContent).join('\n\n'));button.textContent='Copied';}
 catch{button.textContent='Select the prompt text and copy it';}
}));
function paragraph(text,cls){const p=document.createElement('p');p.textContent=text;if(cls)p.className=cls;return p;}
function buildPrint(){
 const out=document.getElementById('print-workbook');out.replaceChildren();
 out.append(document.querySelector('.topbar img').cloneNode());
 const h=document.createElement('h1');h.textContent='My Business Definition Page';out.append(h);
 out.append(paragraph('Built By Her · Module 1 · Business Planning · BP-01 · Version 2','print-meta'));
 out.append(paragraph(document.querySelector('h1').textContent));
 out.append(paragraph('Export prepared: '+new Date().toLocaleDateString('en-GB')+'. A working definition, to be reviewed as evidence develops.','print-meta'));
 document.querySelectorAll('.activity').forEach((activity,i)=>{
 const group=document.createElement('div');if(i>0)group.className='print-group';
 const title=document.createElement('h2');title.textContent=`Activity ${i+1}: ${activity.querySelector('h3').textContent}`;group.append(title);
 activity.querySelectorAll('[data-save]').forEach(field=>{
 const block=document.createElement('div');block.className='print-field';const label=document.createElement('h3');
 label.textContent=(field.closest('fieldset')?field.closest('fieldset').querySelector('legend').textContent+' — ':'')+document.querySelector(`label[for="${field.id}"]`).textContent;
 block.append(label,paragraph(field.value.trim()||'Not yet completed','print-answer'));group.append(block);
 });
 if(i===2){const title=document.createElement('h3');title.textContent='My 30-day test';group.append(title,paragraph(document.getElementById('test-summary').textContent,'print-answer'));}
 out.append(group);
 });
 out.append(paragraph('Next step: Put 30 minutes in your diary this week. Draft the page, read it aloud once, then choose the one assumption you will test before you treat it as fact.'));
}
window.addEventListener('beforeprint',buildPrint);
document.getElementById('export-pdf').addEventListener('click',()=>{
 buildPrint();document.getElementById('export-status').textContent='Choose Save as PDF in the print window. Opening or closing that window does not confirm a file has been saved. Check your saved PDF before leaving.';window.print();
});
window.addEventListener('beforeunload',e=>{if(dirty){e.preventDefault();e.returnValue='';}});
document.getElementById('reset').addEventListener('click',()=>{
 if(!confirm('Have you exported your PDF? This clears the current workbook draft from this browser.'))return;
 try{localStorage.removeItem(KEY);}catch{}
 fields.forEach(f=>f.value='');state={};dirty=false;update();storageMessage();document.getElementById('export-status').textContent='Current draft cleared.';
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
