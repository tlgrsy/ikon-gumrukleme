import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';
import { setTimeout as sleep } from 'node:timers/promises';
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const port=9700+Math.floor(Math.random()*90);
const chrome=spawn(CHROME,[`--remote-debugging-port=${port}`,`--user-data-dir=/tmp/cdp-${port}`,'--headless=new','--disable-gpu','--hide-scrollbars','--no-first-run','--window-size=1440,900','about:blank'],{stdio:'ignore'});
setTimeout(()=>{try{chrome.kill()}catch{};process.exit(2)},120000);
async function target(){for(let i=0;i<120;i++){try{const r=await fetch(`http://127.0.0.1:${port}/json/list`);const l=await r.json();const p=l.find(t=>t.type==='page');if(p)return p}catch{}await sleep(150)}throw new Error('no chrome')}
const t=await target(); const ws=new WebSocket(t.webSocketDebuggerUrl);
await new Promise((res,rej)=>{ws.onopen=res;ws.onerror=rej});
let id=0;const pend=new Map();const logs=[];
ws.onmessage=ev=>{const m=JSON.parse(ev.data);
 if(m.method==='Runtime.exceptionThrown')logs.push('EXCEPTION '+(m.params.exceptionDetails.exception?.description||m.params.exceptionDetails.text));
 if(m.method==='Runtime.consoleAPICalled'&&m.params.type==='error')logs.push('console.error '+m.params.args.map(a=>a.value??a.description).join(' '));
 if(m.id&&pend.has(m.id)){const{res,rej}=pend.get(m.id);pend.delete(m.id);m.error?rej(new Error(JSON.stringify(m.error))):res(m.result)}};
const send=(method,params={})=>new Promise((res,rej)=>{const i=++id;pend.set(i,{res,rej});ws.send(JSON.stringify({id:i,method,params}))});
const evalJS=async(expr)=>{const r=await send('Runtime.evaluate',{expression:expr,returnByValue:true,awaitPromise:true});return r.result.value};
const shot=async(name)=>{const s=await send('Page.captureScreenshot',{format:'png'});writeFileSync('preview/_qa/'+name+'.png',Buffer.from(s.data,'base64'))};
const nav=async(url)=>{await send('Page.navigate',{url});await sleep(3800)};
mkdirSync('preview/_qa',{recursive:true});
await send('Page.enable');await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride',{width:1440,height:900,deviceScaleFactor:1,mobile:false});
await nav('http://127.0.0.1:4321/index.html?v=qa1');
console.log('TR lang/title:', await evalJS('document.documentElement.lang+" | "+document.title'));
// FAQ
await evalJS("document.querySelector('.faq__q').click()");
await sleep(600);
console.log('FAQ open:', await evalJS("document.querySelector('.faq__item').classList.contains('is-open')+' / '+document.querySelector('.faq__q').getAttribute('aria-expanded')"));
await evalJS("document.querySelector('.faq__q').scrollIntoView({block:'center'})");
await sleep(700); await shot('faq-open');
// lang toggle
await evalJS("document.querySelector('[data-lang=en]').click()");
await sleep(900);
console.log('EN lang/title/nav:', await evalJS('document.documentElement.lang+" | "+document.title+" | "+document.querySelector(".nav__link").textContent.trim()'));
console.log('EN url:', await evalJS('location.search'));
await evalJS("window.scrollTo(0,0)"); await sleep(600); await shot('en-top');
console.log('EN horizontal overflow:', await evalJS('document.documentElement.scrollWidth+" / "+document.documentElement.clientWidth'));
// switch back
await evalJS("document.querySelector('[data-lang=tr]').click()"); await sleep(500);
console.log('TR restored:', await evalJS('document.documentElement.lang+" | "+document.querySelector(".hero__title").innerText.replace(/\\n/g," / ")'));
// contact form
await nav('http://127.0.0.1:4321/iletisim.html?v=qa1');
await evalJS(`(()=>{const f=document.getElementById('contactForm');f.querySelector('#name').value='Test Kullanıcı';f.querySelector('#email').value='test@example.com';f.querySelector('#subject').value='İthalat İşlemleri';f.querySelector('#message').value='Test mesajı';f.querySelector('input[type=checkbox]').checked=true;f.requestSubmit();return 'submitted'})()`);
await sleep(1200);
console.log('form success visible:', await evalJS("document.getElementById('formSuccess').classList.contains('is-on')"));
await evalJS("document.getElementById('formSuccess').scrollIntoView({block:'center'})"); await sleep(500); await shot('form-success');
// mobile menu
await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
await nav('http://127.0.0.1:4321/index.html?v=qa2');
console.log('mobile burger visible:', await evalJS("getComputedStyle(document.getElementById('burger')).display"));
await evalJS("document.getElementById('burger').click()"); await sleep(900); await shot('menu-mobile');
console.log('menu open:', await evalJS("document.getElementById('menu').classList.contains('is-open')+' / aria '+document.getElementById('menu').getAttribute('aria-hidden')"));
console.log('body locked:', await evalJS("document.documentElement.classList.contains('is-locked')"));
await evalJS("document.getElementById('burger').click()"); await sleep(500);
console.log('menu closed:', await evalJS("!document.getElementById('menu').classList.contains('is-open')"));
// mobile services page
await nav('http://127.0.0.1:4321/hizmetler.html?v=qa2');
console.log('mobile services overflow:', await evalJS('document.documentElement.scrollWidth+" / "+document.documentElement.clientWidth'));
await shot('svc-mobile');
console.log('LOGS:', logs.length?logs.join('\n'):'none');
ws.close();chrome.kill();process.exit(0);
