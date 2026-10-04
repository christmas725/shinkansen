'use strict';
const test=require('node:test');const assert=require('node:assert/strict');
const {createCache,boundedJson}=require('../server/proxy-cache.cjs');
test('cache combines simultaneous requests before upstream work and handles void writes',async()=>{
 let prepares=0,loads=0;
 const cache=createCache('rail',{secret:'a'.repeat(64),callRpc:async name=>{if(name.endsWith('prepare')){prepares++;return {state:'claimed'}}return null}});
 const load=async()=>{loads++;return {ok:true,trains:[]}};
 const rows=await Promise.all(Array.from({length:5},()=>cache.get('fixed',{headers:{}},load)));
 assert.equal(prepares,1);assert.equal(loads,1);assert(rows.every(x=>x.ok));
});
test('fresh shared cache works across separate process caches without upstream calls',async()=>{
 let loads=0;
 for(let i=0;i<2;i++){const cache=createCache('openf1',{secret:'a'.repeat(64),callRpc:async()=>({state:'cached',payload:[]})});assert.deepEqual(await cache.get('same',{headers:{}},async()=>{loads++;return []}),[])}
 assert.equal(loads,0);
});
test('missing credentials, exhausted budget and another lease prevent upstream work',async()=>{
 for(const [secret,state,status] of [['','claimed',503],['a'.repeat(64),'limited',429],['a'.repeat(64),'pending',503]]){
  let loads=0;const cache=createCache('rail',{secret,callRpc:async()=>({state})});
  await assert.rejects(()=>cache.get('fixed',{headers:{}},async()=>{loads++}),e=>e.status===status);assert.equal(loads,0);
 }
});
test('failed refresh releases its lease and serves only a prepared stale payload',async()=>{
 let completed;const cache=createCache('rail',{secret:'a'.repeat(64),callRpc:async(name,args)=>name.endsWith('prepare')?{state:'claimed',stale_payload:{ok:true,trains:[]}}:(completed=args)});
 assert.deepEqual(await cache.get('fixed',{headers:{}},async()=>{throw Error('private failure')}),{ok:true,trains:[]});
 assert.equal(completed.p_success,false);assert.equal(completed.p_payload,null);
});
test('response size is checked on headers and actual streamed bytes',async()=>{
 await assert.rejects(()=>boundedJson(new Response('12345',{headers:{'Content-Length':'5'}}),4),/too_large/);
 await assert.rejects(()=>boundedJson(new Response('12345'),4),/too_large/);
 assert.deepEqual(await boundedJson(new Response('[{"ok":true}]'),32),[{ok:true}]);
});

const {createHandler}=require('../api/realtime');
function response(){return {headers:{},setHeader(k,v){this.headers[k]=v},status(v){this.statusCode=v;return this},json(v){this.body=v;return this}}}
test('production rail rejects methods, mock and arbitrary cache-busting queries before work',async()=>{
 let work=0;const handler=createHandler({production:true,cache:{get:async()=>{work++;}},state:()=>({open:true})});
 for(const req of [{method:'POST',query:{}},{method:'GET',query:{mock:'1'}},{method:'GET',query:{nonce:'1'}}]){const res=response();await handler(req,res);assert([400,405].includes(res.statusCode));assert.equal(res.headers['Cache-Control'],'no-store')}
 assert.equal(work,0);
});
test('rail closed hours do not start a browser or database work',async()=>{
 const handler=createHandler({cache:{get:()=>{throw Error('must not run')}},state:()=>({open:false})});const res=response();await handler({method:'GET',query:{}},res);assert.equal(res.statusCode,200);assert.equal(res.body.serviceState,'closed');
});

