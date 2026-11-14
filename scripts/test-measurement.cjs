const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict');
const source=fs.readFileSync('toolkit-measurement.js','utf8');
function boot(saved,hostname='woot-bbh.github.io'){
 const nodes=[],handlers={},wh={},store={};let writes=0;
 function el(tag){const n={tag,children:[],handlers:{},appendChild(c){this.children.push(c);return c},setAttribute(){},addEventListener(k,f){this.handlers[k]=f}};nodes.push(n);return n}
 const main=el('main');main.parentNode={insertBefore(){}};
 const document={body:{dataset:{lesson:'BP-01'}},head:el('head'),cookie:'',createElement:el,querySelector:()=>main,addEventListener(k,f){handlers[k]=f}};
 const localStorage={getItem:()=>saved?JSON.stringify({value:saved,until:Date.now()+100000}):null,setItem(k,v){store[k]=v;writes++}};
 const window={addEventListener(k,f){wh[k]=f}};
 vm.runInNewContext(source,{window,document,localStorage,location:{hostname,pathname:'/built-by-her-bp01/'},Date});
 const click=t=>nodes.find(n=>n.tag==='button'&&n.textContent===t).handlers.click();
 const events=()=>Array.from(window.bbhMeasurementLayer).filter(a=>a[0]==='event');
 return {nodes,window,click,events,handlers,wh,writes:()=>writes,scriptCount:()=>nodes.filter(n=>n.tag==='script').length};
}
let b=boot();assert.equal(b.scriptCount(),0);assert.equal(b.events().length,0);
const target={matches:()=>true,get value(){throw Error('Private answer accessed')}};
b.handlers.input({isTrusted:true,target});b.click('No thanks');assert.equal(b.events().length,0);assert.equal(b.scriptCount(),0);
b.click('Allow usage measurement');assert.equal(b.scriptCount(),1);assert.deepEqual(b.events().map(a=>a[1]),['bbh_lesson_open']);
b.handlers.input({isTrusted:false,target});assert.equal(b.events().length,1);
b.handlers.input({isTrusted:true,target});b.handlers.input({isTrusted:true,target});assert.equal(b.events().filter(a=>a[1]==='bbh_workbook_use').length,1);
b.handlers.click({isTrusted:true,target:{closest:()=>({id:'export-pdf'})}});assert.equal(b.events().at(-1)[1],'bbh_export_requested');
b.click('I found a relevant lesson and took a useful next step');assert.equal(b.events().at(-1)[1],'bbh_useful_next_step');
const count=b.events().length;b.click('No thanks');b.handlers.input({isTrusted:true,target});assert.equal(b.events().length,count);assert.equal(b.window['ga-disable-G-21LSVC1NKJ'],true);
let writes=b.writes();b.wh.storage({key:'bbh-measurement-choice-v1',newValue:JSON.stringify({value:'accepted',until:Date.now()+10000})});assert.equal(b.writes(),writes);assert.equal(b.scriptCount(),1);
assert.equal(boot('accepted','localhost').scriptCount(),0);assert.equal(boot('rejected').events().length,0);assert.equal(boot('accepted').events().length,1);
assert(!JSON.stringify(b.events()).includes('Private answer'));
for(const e of b.events()){assert.equal(e[2].page_referrer,'');assert.equal(e[2].page_location,'https://woot-bbh.github.io/built-by-her-bp01/');}
console.log('PASS: consent gating, withdrawal, no answer access, trusted inputs, event deduplication, export request, useful response, cross-tab choice, local transport disabled.');
