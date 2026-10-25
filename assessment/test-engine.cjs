const assert=require('node:assert/strict'),D=require('./data.js'),E=require('./engine.js');
const make=(value,extra={})=>({profile:{stage:'trading',offer:'both',goal:'customers',urgent:'none',...extra},answers:Object.fromEntries(D.questions.map(q=>[q.id,value]))});
let tests=0;function test(name,fn){fn();console.log('PASS',name);tests++;}
test('78 unique questions, 12 modules, live destinations and valid dependencies',()=>{assert.equal(D.questions.length,78);assert.equal(new Set(D.questions.map(q=>q.id)).size,78);assert.equal(D.modules.length,12);D.questions.forEach(q=>{assert.ok(q.outcome);assert.ok(/^https:\/\/(www.womenofourtime.uk\/c\/founders-toolkit\/sections\/\d+\/lessons\/\d+|woot-bbh.github.io\/built-by-her-bp01\/m10-l08\/)$/ .test(q.url));q.deps.forEach(id=>assert.ok(D.questions.some(x=>x.id===id)));});});
test('all done has no invented priorities',()=>assert.equal(E.analyse(D,make('done')).ordered.length,0));
test('all deferred has no invented priorities',()=>assert.equal(E.analyse(D,make('na')).ordered.length,0));
test('unanswered remains unknown',()=>{let s=make(undefined),r=E.analyse(D,s);assert.equal(r.ordered.length,0);assert.equal(r.counts.unanswered,78);assert.equal(r.partial,true);});
test('in-progress work is recommended',()=>{let s=make('done');s.answers.M08L06='progress';assert.deepEqual(E.analyse(D,s).ordered.map(q=>q.id),['M08L06']);});
test('cash pressure beats branding and protection',()=>{let s=make('start',{urgent:'cash'});assert.equal(E.analyse(D,s).ordered[0].id,'M11L03');});
test('capacity pressure surfaces personal requirements and workload',()=>{let s=make('help',{urgent:'capacity'}),ids=E.analyse(D,s).ordered.slice(0,3).map(q=>q.id);assert.deepEqual(ids,['M01L02','M10L01','M10L08']);});
test('service-only excludes product pricing even with old answer',()=>{let s=make('help',{offer:'service'}),r=E.analyse(D,s);assert.equal(r.total,77);assert.ok(!r.ordered.some(q=>q.id==='M07L03'));s.profile.offer='both';assert.ok(E.analyse(D,s).ordered.some(q=>q.id==='M07L03'));});
test('product-only excludes service pricing',()=>assert.ok(!E.analyse(D,make('help',{offer:'product'})).ordered.some(q=>q.id==='M07L02')));
test('dependencies only reorder reported gaps once',()=>{let s=make('done');s.answers.M06L04='help';s.answers.M03L06='progress';let r=E.analyse(D,s);assert.deepEqual(r.ordered.map(q=>q.id),['M03L06','M06L04']);s.answers.M03L06='na';assert.deepEqual(E.analyse(D,s).ordered.map(q=>q.id),['M06L04']);});
test('launch foundations before optional visibility',()=>{let r=E.analyse(D,make('start',{stage:'idea'}));assert.equal(r.ordered[0].id,'M01L01');});
test('stable unique ordering for every stage/goal/offer combination',()=>{for(const stage of ['idea','launch','trading','established'])for(const goal of ['clarity','customers','money','running','direction','protection'])for(const offer of ['product','service','both','unsure']){let s=make('start',{stage,goal,offer}),a=E.analyse(D,s),b=E.analyse(D,s);assert.equal(a.ordered.length,a.total);assert.equal(new Set(a.ordered.map(q=>q.id)).size,a.total);assert.deepEqual(a,b);}});
console.log(tests+' tests passed');
