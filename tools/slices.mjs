// Viewport slice capture + console errors: node tools/slices.mjs <url> <prefix> [w] [h] [step] [js]
import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';
import { setTimeout as sleep } from 'node:timers/promises';
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const [url, prefix, w='1440', h='900', stepArg, extraJS=''] = process.argv.slice(2);
const width=parseInt(w,10), height=parseInt(h,10), step=parseInt(stepArg||String(height),10);
const port=9500+Math.floor(Math.random()*400);
const chrome=spawn(CHROME,[`--remote-debugging-port=${port}`,`--user-data-dir=/tmp/cdp-${port}`,'--headless=new','--disable-gpu','--hide-scrollbars','--no-first-run','--force-color-profile=srgb',`--window-size=${width},${height}`,'about:blank'],{stdio:'ignore'});
setTimeout(()=>{try{chrome.kill()}catch{};process.exit(2)},110000);
async function target(){for(let i=0;i<120;i++){try{const r=await fetch(`http://127.0.0.1:${port}/json/list`);const l=await r.json();const p=l.find(t=>t.type==='page');if(p)return p}catch{}await sleep(150)}throw new Error('no chrome')}
const t=await target();
const ws=new WebSocket(t.webSocketDebuggerUrl);
await new Promise((res,rej)=>{ws.onopen=res;ws.onerror=rej});
let id=0;const pend=new Map();const logs=[];
ws.onmessage=ev=>{const m=JSON.parse(ev.data);
  if(m.method==='Runtime.consoleAPICalled'){logs.push('console.'+m.params.type+': '+m.params.args.map(a=>a.value??a.description??'').join(' '))}
  if(m.method==='Runtime.exceptionThrown'){logs.push('EXCEPTION: '+(m.params.exceptionDetails.exception?.description||m.params.exceptionDetails.text))}
  if(m.method==='Log.entryAdded'&&m.params.entry.level!=='info'){logs.push('LOG '+m.params.entry.level+': '+m.params.entry.text)}
  if(m.id&&pend.has(m.id)){const{res,rej}=pend.get(m.id);pend.delete(m.id);m.error?rej(new Error(JSON.stringify(m.error))):res(m.result)}};
const send=(method,params={})=>new Promise((res,rej)=>{const i=++id;pend.set(i,{res,rej});ws.send(JSON.stringify({id:i,method,params}))});
await send('Page.enable');await send('Runtime.enable');await send('Log.enable');
await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<600});
await send('Page.navigate',{url});
await sleep(4200);
if(extraJS){try{await send('Runtime.evaluate',{expression:extraJS,awaitPromise:true})}catch(e){console.error('JS:',e.message)}await sleep(1200)}
const sh=(await send('Runtime.evaluate',{expression:'document.documentElement.scrollHeight',returnByValue:true})).result.value;
mkdirSync(prefix,{recursive:true});
let i=0;
for(let y=0;y<Math.min(sh,14000);y+=step){
  await send('Runtime.evaluate',{expression:`window.scrollTo({top:${y},behavior:'instant'})`});
  await sleep(900);
  const shot=await send('Page.captureScreenshot',{format:'png'});
  writeFileSync(`${prefix}/s${String(i).padStart(2,'0')}.png`,Buffer.from(shot.data,'base64'));
  i++;
}
console.log('height',sh,'slices',i);
if(logs.length){console.log('--- logs ---');console.log(logs.slice(0,40).join('\n'))}else console.log('no console errors');
ws.close();chrome.kill();process.exit(0);
