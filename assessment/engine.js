/* Pure recommendation logic. Self-report routing, not a business readiness score. */
(function(root){
const LABELS={done:'In place',progress:'In progress',start:'Not started',help:'Need help',na:'Not relevant now'};
const URGENT={cash:['M11L03','M11L04','M11L06'],capacity:['M10L01','M01L02','M10L08'],setup:['M03L01','M03L03','M03L04','M03L06','M11L05']};
const GOALS={clarity:[1,2],customers:[4,5,6,8],money:[7,11],running:[9,10],direction:[1,12],protection:[3]};
const PROTECT=['M03L01','M03L03','M03L04','M03L06','M10L07','M11L05'];
const FOUNDATIONS=['M01L01','M01L02','M02L01','M02L02','M02L04','M11L01'];
function applicable(q,p){return !(q.type==='service'&&p.offer==='product'||q.type==='product'&&p.offer==='service');}
function analyse(data,state){
 const p=state.profile||{}, answers=state.answers||{};
 const active=data.questions.filter(q=>applicable(q,p));
 const counts={done:0,progress:0,start:0,help:0,na:0,unanswered:0};
 active.forEach(q=>counts[LABELS[answers[q.id]]?answers[q.id]:'unanswered']++);
 const candidates=active.filter(q=>['help','start','progress'].includes(answers[q.id]));
 function category(q){
  if((URGENT[p.urgent]||[]).includes(q.id))return 0;
  if(p.stage!=='idea'&&PROTECT.includes(q.id))return 1;
  if(['idea','launch'].includes(p.stage)&&FOUNDATIONS.includes(q.id))return 2;
  if((GOALS[p.goal]||[]).includes(q.module))return 3;
  return 4;
 }
 function reason(q){let r=[]; const cat=category(q);
  if(cat===0)r.push('This relates to the immediate pressure you selected.');
  if(cat===1)r.push('A protection or essential-records gap is worth checking for your current stage.');
  if(cat===2)r.push('This helps establish a workable foundation for your idea or launch.');
  if(cat===3)r.push('This supports your chosen focus.');
  r.push(answers[q.id]==='help'?'You asked for help with this.':answers[q.id]==='progress'?'You have started this; the lesson can help you move it forward.':'You marked this as not started.');
  return r.join(' ');
 }
 const statusOrder={help:0,start:1,progress:2};
 candidates.sort((a,b)=>category(a)-category(b)||statusOrder[answers[a.id]]-statusOrder[answers[b.id]]||a.module-b.module||a.lesson-b.lesson);
 const byId=new Map(candidates.map(q=>[q.id,q])), ordered=[],seen=new Set();
 function add(q,forId){if(seen.has(q.id))return;seen.add(q.id);
  // Only move other reported gaps, never add done, deferred, unanswered or inapplicable work.
  for(const dep of q.deps||[]){const prev=byId.get(dep);if(prev&&category(q)>0)add(prev,q.id);}
  ordered.push({...q,answer:answers[q.id],reason:reason(q)+(forId?' Suggested before '+forId.replace('L',' · Lesson ').replace('M','Module ')+' to make that work easier.':''),category:category(q)});
 }
 candidates.forEach(q=>add(q));
 return {active,counts,ordered,answered:active.length-counts.unanswered,total:active.length,partial:counts.unanswered>0,
 modules:data.modules.map(m=>({...m,counts:active.filter(q=>q.module===m.id).reduce((o,q)=>{const a=LABELS[answers[q.id]]?answers[q.id]:'unanswered';o[a]=(o[a]||0)+1;return o;},{})}))};
}
const api={LABELS,applicable,analyse};if(typeof module!=='undefined')module.exports=api;root.BBH_ENGINE=api;
})(typeof window!=='undefined'?window:globalThis);
