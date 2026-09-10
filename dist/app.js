const STORAGE_KEY = 'bbh-bp01-progress-v1';
const vagueWords = ['quality','bespoke','supportive','modern','affordable','tailored','professional','unique','passionate','friendly','excellent','premium','solutions','holistic','innovative','empowering'];
const fields = [...document.querySelectorAll('[data-field]')];
const checks = [...document.querySelectorAll('[data-complete]')];
let state = loadState();

function loadState(){
  try{return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {answers:{},complete:{}}}
  catch{return {answers:{},complete:{}}}
}

function hydrate(){
  fields.forEach(el=>{
    const key=el.dataset.field;
    const value=state.answers?.[key];
    if(el.type==='radio') el.checked=value===el.value;
    else if(value!==undefined) el.value=value;
  });
  checks.forEach(el=>el.checked=Boolean(state.complete?.[el.dataset.complete]));
  const date=document.querySelector('[data-field="date"]');
  if(!date.value){date.value=new Date().toISOString().slice(0,10);saveField(date)}
  updateProgress();
}

function saveField(el){
  state.answers ||= {};
  if(el.type==='radio' && !el.checked)return;
  state.answers[el.dataset.field]=el.value;
  persist();
}

function persist(){
  localStorage.setItem(STORAGE_KEY,JSON.stringify(state));
  const status=document.getElementById('save-status');
  status.textContent='Saving…';
  clearTimeout(persist.timer);
  persist.timer=setTimeout(()=>status.textContent='Saved on this device',450);
  updateProgress();
}

function updateProgress(){
  const total=checks.length;
  const done=checks.filter(c=>c.checked).length;
  const percent=Math.round(done/total*100);
  document.getElementById('progress-bar').style.width=`${percent}%`;
  document.getElementById('progress-label').textContent=`${percent}% complete`;
}

fields.forEach(el=>el.addEventListener(el.type==='radio'?'change':'input',()=>saveField(el)));
checks.forEach(el=>el.addEventListener('change',()=>{
  state.complete ||= {};
  state.complete[el.dataset.complete]=el.checked;
  persist();
}));

document.querySelectorAll('[data-jump]').forEach(button=>button.addEventListener('click',()=>{
  document.getElementById(button.dataset.jump)?.scrollIntoView({behavior:'smooth'});
}));

document.querySelectorAll('[role="tab"]').forEach(tab=>tab.addEventListener('click',()=>{
  document.querySelectorAll('[role="tab"]').forEach(t=>t.setAttribute('aria-selected','false'));
  document.querySelectorAll('[role="tabpanel"]').forEach(panel=>panel.hidden=true);
  tab.setAttribute('aria-selected','true');
  document.getElementById(tab.dataset.tab).hidden=false;
}));

document.getElementById('generate-definition').addEventListener('click',()=>{
  const a=state.answers || {};
  const pieces=[a.sell,a.who,a.problem,a.result];
  if(pieces.every(Boolean)){
    const sentence=`I provide ${clean(a.sell)} for ${clean(a.who)}, who ${clean(a.problem)}, so ${clean(a.result)}.`;
    const box=document.getElementById('definition');
    box.value=sentence;
    saveField(box);
    box.focus();
  }else{
    document.getElementById('definition').value='Complete all four boxes above to build your sentence.';
    document.getElementById('definition').focus();
  }
});

function clean(text){return text.trim().replace(/[.!?]+$/,'').replace(/^I\s+(provide|sell|make)\s+/i,'')}

document.getElementById('check-vague').addEventListener('click',()=>{
  const text=document.getElementById('definition').value.trim();
  const result=document.getElementById('vague-results');
  if(!text){result.innerHTML='<div class="found">Write your definition first, then run the check.</div>';return}
  const found=vagueWords.filter(word=>new RegExp(`\\b${word}\\b`,'i').test(text));
  result.innerHTML=found.length
    ? `<div class="found"><strong>Look underneath:</strong> ${found.map(escapeHtml).join(', ')}. What specific fact does each word represent—such as a price, timescale, location, deliverable or method?</div>`
    : '<div class="clear"><strong>No common vague words found.</strong> Read each remaining word and ask: could this belong to a completely different business?</div>';
});

const prompts={
  vague:()=>`I run a business selling ${state.answers?.sell || '[what you sell]'} to ${state.answers?.who || '[who it is for]'} in the UK. Here is my draft business definition: “${state.answers?.refinedDefinition || state.answers?.definition || '[paste your sentence]'}”. Review it and give me three lists: (1) any word that is vague or could apply to almost any business, with a question that would help me replace it with a specific fact; (2) which of the four parts (what is sold, who it is for, the problem or goal, the practical result) is missing or weakest; (3) any claim in my sentence that I have not evidenced. Do not rewrite the sentence for me, do not suggest a new business direction and do not invent any facts about my business. List anything you had to assume.`,
  reader:()=>`Read this sentence once: “${state.answers?.refinedDefinition || state.answers?.definition || '[paste your sentence]'}”. Without asking me anything first, tell me in your own words: what you think this business sells, who you think buys it, and what problem you think it solves. Then list every point where you had to guess, and the question I would need to answer to remove each guess. Do not fill the gaps yourself and do not invent details.`
};

document.querySelectorAll('.copy-prompt').forEach(button=>button.addEventListener('click',async()=>{
  const original=button.textContent;
  try{await navigator.clipboard.writeText(prompts[button.dataset.prompt]());button.textContent='Copied'}
  catch{button.textContent='Select and copy manually';prompt('Copy this prompt:',prompts[button.dataset.prompt]())}
  setTimeout(()=>button.textContent=original,1800);
}));

document.getElementById('download-work').addEventListener('click',()=>{
  const a=state.answers || {};
  const definition=a.refinedDefinition || a.definition || '';
  const body=`BUILT BY HER — BP-01\nWhat is my business, who is it for and what problem does it solve?\n\nACTIVITY 1 — THINK IT THROUGH\n\nLast three things paid for or requested:\n${a.lastThings||''}\n\nWho were those people?\n${a.people||''}\n\nWhat was happening beforehand?\n${a.before||''}\n\nWhat changed afterwards?\n${a.after||''}\n\nACTIVITY 2 — MY FOUR PARTS\n\nWhat I sell: ${a.sell||''}\nWho it is for: ${a.who||''}\nProblem or goal: ${a.problem||''}\nPractical result: ${a.result||''}\n\nMY DEFINITION — ${a.date||''}\n${definition}\n\nACTIVITY 3 — TEST A DECISION\n\nDecision:\n${a.decision||''}\n\nDid it make the decision clearer? ${a.clarity||''}\n\nReflection:\n${a.decisionReflection||''}\n`;
  const blob=new Blob([body],{type:'text/plain;charset=utf-8'});
  const url=URL.createObjectURL(blob);
  const link=document.createElement('a');
  link.href=url;link.download='Built-By-Her-BP-01-my-work.txt';link.click();URL.revokeObjectURL(url);
});

document.getElementById('reset-work').addEventListener('click',()=>{
  if(confirm('Clear every answer and restart this lesson? This cannot be undone.')){
    localStorage.removeItem(STORAGE_KEY);location.reload();
  }
});

function escapeHtml(value){return value.replace(/[&<>'"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[char]))}

hydrate();
