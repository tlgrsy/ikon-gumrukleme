// Yerel geliştirme sunucusu — .htaccess temiz URL kurallarını taklit eder.
// Kullanım: node tools/dev-server.mjs   → http://127.0.0.1:4322
import http from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';

const root = process.cwd();
const port = Number(process.env.PORT) || 4322;
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.svg':'image/svg+xml', '.webp':'image/webp', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.png':'image/png', '.woff2':'font/woff2', '.xml':'application/xml', '.txt':'text/plain; charset=utf-8', '.md':'text/markdown; charset=utf-8', '.json':'application/json' };

http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  let path = decodeURIComponent(url.pathname);
  const qs = url.search;
  if (path.endsWith('/index.html')) { res.writeHead(301, { Location: '/' + qs }); return res.end(); }
  if (path.endsWith('.html')) { res.writeHead(301, { Location: path.slice(0, -5) + qs }); return res.end(); }
  if (path === '/index') { res.writeHead(301, { Location: '/' + qs }); return res.end(); }
  let file = normalize(join(root, path));
  if (!file.startsWith(root)) { res.writeHead(403); return res.end('Forbidden'); }
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
  if (!existsSync(file) && existsSync(file + '.html')) file += '.html';
  if (!existsSync(file)) { res.writeHead(404, {'Content-Type':'text/html; charset=utf-8'}); return res.end('<h1>404</h1>'); }
  res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
  createReadStream(file).pipe(res);
}).listen(port, '127.0.0.1', () => console.log(`İKON dev: http://127.0.0.1:${port}`));
