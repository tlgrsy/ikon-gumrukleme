// Minimal CDP screenshot tool: node tools/shot.mjs <url> <out.png> [width] [height] [fullPage] [extraJS]
import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';
import { setTimeout as sleep } from 'node:timers/promises';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const [url, out, w = '1440', h = '900', full = '1', extraJS = ''] = process.argv.slice(2);
const width = parseInt(w, 10), height = parseInt(h, 10);
const port = 9222 + Math.floor(Math.random() * 500);
const profile = `/tmp/cdp-profile-${port}`;
const chrome = spawn(CHROME, [
  `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`,
  '--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run',
  '--no-default-browser-check', '--force-color-profile=srgb',
  '--disable-features=Translate,MediaRouter', `--window-size=${width},${height}`,
  'about:blank'
], { stdio: 'ignore' });

async function getTarget() {
  for (let i = 0; i < 120; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${port}/json/list`);
      const list = await r.json();
      const page = list.find(t => t.type === 'page');
      if (page) return page;
    } catch {}
    await sleep(150);
  }
  throw new Error('chrome did not start');
}
setTimeout(() => { console.error('watchdog timeout'); try{chrome.kill();}catch{} process.exit(2); }, 75000);
const target = await getTarget();
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
let id = 0; const pending = new Map();
ws.onmessage = (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) { const { res, rej } = pending.get(msg.id); pending.delete(msg.id); msg.error ? rej(new Error(JSON.stringify(msg.error))) : res(msg.result); }
};
const send = (method, params = {}) => new Promise((res, rej) => { const i = ++id; pending.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method, params })); });
await send('Page.enable'); await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width < 600 });
await send('Page.navigate', { url });
await sleep(5000);
if (extraJS) { try { await send('Runtime.evaluate', { expression: extraJS, awaitPromise: true }); } catch (e) { console.error('js error', e.message); } await sleep(1200); }
let sh = height;
if (full === '1') {
  const r = await send('Runtime.evaluate', { expression: 'Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)', returnByValue: true });
  sh = Math.min(Math.max(r.result.value, height), 12000);
  await send('Emulation.setDeviceMetricsOverride', { width, height: sh, deviceScaleFactor: 1, mobile: width < 600 });
  await sleep(1400);
}
const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: full === '1' });
mkdirSync(out.split('/').slice(0, -1).join('/') || '.', { recursive: true });
writeFileSync(out, Buffer.from(shot.data, 'base64'));
console.log('saved', out, width + 'x' + sh);
ws.close(); chrome.kill();
process.exit(0);
