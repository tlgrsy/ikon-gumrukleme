import { spawn } from 'node:child_process';
import { setTimeout as sleep } from 'node:timers/promises';
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const port=9800+Math.floor(Math.random()*80);
const chrome=spawn(CHROME,[`--remote-debugging-port=${port}`,`--user-data-dir=/tmp/cdp-${port}`,'--headless=new','--disable-gpu','--hide-scrollbars','--no-first-run','--window-size=1440,900','about:blank'],{stdio:'ignore'});
setTimeout(()=>{try{chrome.kill()}catch{};process.exit(2)},170000);
async function target(){for(let i=0;i<120;i++){try{const r=await fetch(`http://127.0.0.1:${port}/json/list`);const l=await r.json();const p=l.find(t=>t.type==='page');if(p)return p}catch{}await sleep(150)}throw new Error('no chrome')}
const t=await target();const ws=new WebSocket(t.webSocketDebuggerUrl);
await new Promise((res,rej)=>{ws.onopen=res;ws.onerror=rej});
let id=0;const pend=new Map();let logs=[];
ws.onmessage=ev=>{const m=JSON.parse(ev.data);
 if(m.method==='Runtime.exceptionThrown')logs.push('EXC '+(m.params.exceptionDetails.exception?.description||'').slice(0,120));
 if(m.method==='Log.entryAdded'&&m.params.entry.level==='error')logs.push('ERR '+m.params.entry.text.slice(0,120));
 if(m.id&&pend.has(m.id)){const{res,rej}=pend.get(m.id);pend.delete(m.id);m.error?rej(new Error(JSON.stringify(m.error))):res(m.result)}};
const send=(method,params={})=>new Promise((res,rej)=>{const i=++id;pend.set(i,{res,rej});ws.send(JSON.stringify({id:i,method,params}))});
const ev=async e=>(await send('Runtime.evaluate',{expression:e,returnByValue:true})).result.value;
await send('Page.enable');await send('Runtime.enable');await send('Log.enable');
const pages=['index.html','hizmetler.html','kurumsal.html','iletisim.html'];
for(const [w,h] of [[390,844],[768,1024],[1280,800],[1440,900]]){
  await send('Emulation.setDeviceMetricsOverride',{width:w,height:h,deviceScaleFactor:1,mobile:w<600});
  for(const p of pages){
    logs=[];await send('Page.navigate',{url:`http://127.0.0.1:4321/${p}`});await sleep(3200);
    const o=await ev(`(()=>{const de=document.documentElement;const imgs=[...document.images];const broken=imgs.filter(i=>i.complete&&i.naturalWidth===0).map(i=>i.currentSrc.split('/').pop());return {sw:de.scrollWidth,cw:de.clientWidth,broken,title:document.title.slice(0,40)}})()`);
    console.log(`${w}px ${p.padEnd(15)} overflow:${o.sw-o.cw}px broken:${o.broken.length?o.broken.join(','):'0'} ${logs.length?('LOG '+logs.join(' | ')):''}`);
  }
}
ws.close();chrome.kill();process.exit(0);
