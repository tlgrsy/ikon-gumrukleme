/* İKON — interaction layer */
(function () {
  'use strict';
  const root = document.documentElement;
  const body = document.body;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const clamp = (v, a, b) => Math.min(Math.max(v, a), b);
  const lerp = (a, b, t) => a + (b - a) * t;

  /* ---------- Preloader ---------- */
  const pre = document.getElementById('preloader');
  const count = document.getElementById('preCount');
  const bar = document.getElementById('preBar');
  const seen = (() => { try { return sessionStorage.getItem('ikon-seen') === '1'; } catch (e) { return true; } })();
  function finishPre() {
    if (!pre) { root.classList.add('is-loaded'); return; }
    pre.classList.add('is-done');
    setTimeout(() => { pre.classList.add('is-hidden'); }, 1000);
    root.classList.add('is-loaded');
    try { sessionStorage.setItem('ikon-seen', '1'); } catch (e) {}
  }
  function runPre() {
    if (!pre) { root.classList.add('is-loaded'); return; }
    if (reduce) { pre.classList.add('is-hidden'); root.classList.add('is-loaded'); return; }
    const dur = seen ? 520 : 1500;
    const t0 = performance.now();
    (function tick(now) {
      const p = clamp((now - t0) / dur, 0, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      if (count) count.textContent = String(Math.round(eased * 100)).padStart(3, '0');
      if (bar) bar.style.transform = 'scaleX(' + eased + ')';
      if (p < 1) requestAnimationFrame(tick);
      else setTimeout(finishPre, 140);
    })(t0);
  }
  if (document.readyState === 'complete') runPre();
  else window.addEventListener('load', runPre, { once: true });
  setTimeout(() => { if (!root.classList.contains('is-loaded')) finishPre(); }, 3800);

  /* ---------- Nav ---------- */
  const nav = document.getElementById('nav');
  let lastY = window.scrollY;
  function onScrollNav() {
    const y = window.scrollY;
    if (nav) {
      nav.classList.toggle('nav--solid', y > 30);
      if (document.body.classList.contains('menu-open')) nav.classList.remove('is-hidden');
      else if (y > 480 && y > lastY + 4) nav.classList.add('is-hidden');
      else if (y < lastY - 4 || y < 200) nav.classList.remove('is-hidden');
    }
    lastY = y;
  }
  const progress = document.getElementById('progress');
  function onScrollProgress() {
    if (!progress) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    progress.style.transform = 'scaleX(' + p + ')';
  }
  window.addEventListener('scroll', onScrollProgress, { passive: true });
  onScrollProgress();
  window.addEventListener('scroll', onScrollNav, { passive: true });

  /* ---------- Mobile menu ---------- */
  const burger = document.getElementById('burger');
  const menu = document.getElementById('menu');
  function setMenu(open) {
    const wasOpen = body.classList.contains('menu-open');
    body.classList.toggle('menu-open', open);
    root.classList.toggle('is-locked', open);
    if (menu) { menu.classList.toggle('is-open', open); menu.setAttribute('aria-hidden', String(!open)); }
    if (burger) { burger.setAttribute('aria-expanded', String(open)); burger.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menü'); }
    if (open) { const first = menu && menu.querySelector('a'); if (first) setTimeout(() => first.focus({ preventScroll: true }), 380); }
    else if (wasOpen && burger) burger.focus({ preventScroll: true });
  }
  if (burger) burger.addEventListener('click', () => setMenu(!body.classList.contains('menu-open')));
  if (menu) menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && body.classList.contains('menu-open')) setMenu(false); });

  /* ---------- Reveal ---------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach(el => io.observe(el));
  } else { revealEls.forEach(el => el.classList.add('is-in')); }

  /* ---------- Manifesto word scrub ---------- */
  function splitWords() {
    document.querySelectorAll('[data-words]').forEach(el => {
      if (el.dataset.split === '1') return;
      const text = el.textContent.trim();
      el.textContent = '';
      text.split(/\s+/).forEach((w, i) => {
        const s = document.createElement('span');
        s.className = 'word' + (/[.!?]$/.test(w) ? '' : '');
        s.textContent = w;
        el.appendChild(s);
        el.appendChild(document.createTextNode(' '));
      });
      el.dataset.split = '1';
    });
  }
  splitWords();
  window.IkonSplitWords = splitWords;
  const wordEls = () => Array.from(document.querySelectorAll('[data-words] .word'));
  function scrubWords() {
    document.querySelectorAll('[data-words]').forEach(box => {
      const rect = box.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.82;
      const p = clamp((start - rect.top) / (rect.height + vh * 0.18), 0, 1);
      const words = box.querySelectorAll('.word');
      const n = Math.round(p * words.length * 1.12);
      words.forEach((w, i) => w.classList.toggle('on', i < n));
    });
  }
  if (!reduce) { scrubWords(); window.addEventListener('scroll', scrubWords, { passive: true }); }
  else { wordEls().forEach(w => w.classList.add('on')); }

  /* ---------- Counters ---------- */
  const counterEls = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window) {
    const co = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        const el = en.target; co.unobserve(el);
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        if (reduce) { el.textContent = target + suffix; return; }
        const t0 = performance.now(); const dur = 1400;
        (function tick(now) {
          const p = clamp((now - t0) / dur, 0, 1);
          const e = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * e) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        })(t0);
      });
    }, { threshold: 0.5 });
    counterEls.forEach(el => co.observe(el));
  }

  /* ---------- Process steps ---------- */
  const steps = document.querySelectorAll('.step');
  if (steps.length && 'IntersectionObserver' in window) {
    const so = new IntersectionObserver((entries) => {
      entries.forEach(en => { en.target.classList.toggle('is-active', en.isIntersecting); });
    }, { rootMargin: '-42% 0px -46% 0px', threshold: 0 });
    steps.forEach(s => so.observe(s));
  }

  /* ---------- FAQ ---------- */
  document.querySelectorAll('.faq__item').forEach((item, i) => {
    const btn = item.querySelector('.faq__q');
    const panel = item.querySelector('.faq__a');
    if (!btn) return;
    if (panel) { panel.id = 'faq-panel-' + i; panel.setAttribute('role', 'region'); panel.setAttribute('aria-hidden', 'true'); btn.setAttribute('aria-controls', panel.id); }
    btn.addEventListener('click', () => {
      const open = item.classList.contains('is-open');
      document.querySelectorAll('.faq__item.is-open').forEach(o => {
        o.classList.remove('is-open');
        const b = o.querySelector('.faq__q'); if (b) b.setAttribute('aria-expanded', 'false');
        const p = o.querySelector('.faq__a'); if (p) p.setAttribute('aria-hidden', 'true');
      });
      if (!open) { item.classList.add('is-open'); btn.setAttribute('aria-expanded', 'true'); if (panel) panel.setAttribute('aria-hidden', 'false'); }
    });
  });

  const firstFaq = document.querySelector('.faq__item');
  if (firstFaq) {
    const b = firstFaq.querySelector('.faq__q'), p = firstFaq.querySelector('.faq__a');
    firstFaq.classList.add('is-open');
    if (b) b.setAttribute('aria-expanded', 'true');
    if (p) p.setAttribute('aria-hidden', 'false');
  }

  /* ---------- Service hover preview ---------- */
  const svcList = document.getElementById('svcList');
  const svcPreview = document.getElementById('svcPreview');
  if (svcList && svcPreview && fine) {
    const img = svcPreview.querySelector('img');
    const label = svcPreview.querySelector('span');
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = null;
    const rows = svcList.querySelectorAll('.svc-row');
    function loop() {
      cx = lerp(cx, tx, 0.16); cy = lerp(cy, ty, 0.16);
      svcPreview.style.left = cx + 'px'; svcPreview.style.top = cy + 'px';
      raf = requestAnimationFrame(loop);
    }
    svcList.addEventListener('pointermove', e => { tx = e.clientX + 150; ty = e.clientY; });
    rows.forEach(row => {
      row.addEventListener('pointerenter', (e) => {
        if (cx === 0 && cy === 0) { cx = e.clientX + 150; cy = e.clientY; }
        if (img) { img.src = row.dataset.preview || ''; img.alt = ''; }
        if (label) label.textContent = row.dataset.previewLabel || '';
        svcPreview.classList.add('is-on');
        if (!raf) loop();
      });
      row.addEventListener('pointerleave', () => { svcPreview.classList.remove('is-on'); });
    });
    svcList.addEventListener('pointerleave', () => { svcPreview.classList.remove('is-on'); });
  }

  /* ---------- Magnetic buttons ---------- */
  if (fine && !reduce) {
    document.querySelectorAll('[data-magnetic]').forEach(el => {
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) / r.width;
        const y = (e.clientY - r.top - r.height / 2) / r.height;
        el.style.transform = 'translate(' + (x * 8).toFixed(2) + 'px,' + (y * 6).toFixed(2) + 'px)';
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
  }

  if (fine) window.addEventListener('pointermove', () => body.classList.add('has-pointer'), { once: true });

  /* ---------- Services scroll spy ---------- */
  const svcNav = document.querySelectorAll('.svc-nav a');
  const svcBlocks = document.querySelectorAll('.svc-block');
  if (svcNav.length && svcBlocks.length && 'IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        const id = '#' + en.target.id;
        svcNav.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === id));
      });
    }, { rootMargin: '-24% 0px -62% 0px', threshold: 0 });
    svcBlocks.forEach(b => spy.observe(b));
  }

  /* ---------- Custom cursor ---------- */
  if (fine && !reduce) {
    const cur = document.getElementById('cursor');
    const dot = document.getElementById('cursorDot');
    if (cur && dot) {
      let mx = innerWidth / 2, my = innerHeight / 2, x = mx, y = my, dx = mx, dy = my;
      window.addEventListener('pointermove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });
      (function loop() {
        x = lerp(x, mx, 0.16); y = lerp(y, my, 0.16);
        dx = lerp(dx, mx, 0.6); dy = lerp(dy, my, 0.6);
        cur.style.transform = 'translate(' + x + 'px,' + y + 'px) translate(-50%,-50%)';
        dot.style.transform = 'translate(' + dx + 'px,' + dy + 'px) translate(-50%,-50%)';
        requestAnimationFrame(loop);
      })();
      document.querySelectorAll('a, button, .faq__q, .svc-row').forEach(el => {
        el.addEventListener('pointerenter', () => body.classList.add('cursor-hover'));
        el.addEventListener('pointerleave', () => body.classList.remove('cursor-hover'));
      });
    }
  }

  /* ---------- Parallax ---------- */
  if (!reduce) {
    const px = Array.from(document.querySelectorAll('[data-parallax]'));
    let ticking = false;
    function applyPx() {
      const vh = window.innerHeight;
      px.forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const speed = parseFloat(el.dataset.parallax) || 0.05;
        const y = (r.top + r.height / 2 - vh / 2) * -speed;
        el.style.transform = 'translate3d(0,' + y.toFixed(1) + 'px,0) scale(1.06)';
      });
      ticking = false;
    }
    window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(applyPx); } }, { passive: true });
    applyPx();
  }

  /* ---------- World map ---------- */
  const canvas = document.getElementById('worldCanvas');
  if (canvas && window.IKON_WORLD_DOTS) initWorld(canvas);
  function initWorld(cv) {
    const ctx = cv.getContext('2d');
    const dots = window.IKON_WORLD_DOTS;
    const cities = [
      { n: 'İstanbul', lon: 28.98, lat: 41.01, main: true },
      { n: 'Rotterdam', lon: 4.14, lat: 51.95 },
      { n: 'New York', lon: -74.0, lat: 40.7 },
      { n: 'Şanghay', lon: 121.47, lat: 31.23 },
      { n: 'Singapur', lon: 103.85, lat: 1.35 },
      { n: 'Dubai', lon: 55.27, lat: 25.2 }
    ];
    let W = 0, H = 0, dpr = 1, running = false, t = 0;
    const hub = cities[0];
    const routes = cities.slice(1).map((c, i) => ({ to: c, delay: i * 0.9, speed: 0.16 + (i % 3) * 0.035 }));
    const layout = () => {
      const rect = cv.getBoundingClientRect();
      W = rect.width; H = rect.height; dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // place labels using same projection as dots
      const mapH = W * 0.5;
      const offY = (H - mapH) / 2;
      const labels = document.querySelectorAll('.city');
      labels.forEach((el, i) => {
        const c = cities[i]; if (!c) return;
        const x = ((c.lon + 180) / 360) * W;
        const y = ((90 - c.lat) / 180) * mapH + offY;
        el.style.left = x + 'px'; el.style.top = y + 'px';
      });
      draw();
    };
    const project = (lon, lat) => {
      const mapH = W * 0.5, offY = (H - mapH) / 2;
      return [((lon + 180) / 360) * W, ((90 - lat) / 180) * mapH + offY];
    };
    function draw() {
      if (!W || !H) return;
      ctx.clearRect(0, 0, W, H);
      const mapH = W * 0.5, offY = (H - mapH) / 2;
      const r = Math.max(0.8, Math.min(1.6, W / 1150));
      ctx.fillStyle = 'rgba(245,242,236,0.34)';
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        if (d[1] > 0.84) continue;
        const x = d[0] * W, y = d[1] * mapH + offY;
        ctx.fillRect(x, y, r, r);
      }
      // arcs
      routes.forEach((rt, idx) => {
        const a = project(hub.lon, hub.lat);
        const b = project(rt.to.lon, rt.to.lat);
        const mx = (a[0] + b[0]) / 2;
        const my = (a[1] + b[1]) / 2;
        const dx = b[0] - a[0], dy = b[1] - a[1];
        const len = Math.hypot(dx, dy) || 1;
        const lift = Math.min(len * 0.28, 110);
        const cx = mx - (dy / len) * lift, cy = my + (dx / len) * lift;
        ctx.beginPath();
        ctx.moveTo(a[0], a[1]);
        ctx.quadraticCurveTo(cx, cy, b[0], b[1]);
        ctx.strokeStyle = 'rgba(255,90,31,0.30)';
        ctx.lineWidth = 1;
        ctx.stroke();
        // travelling pulse
        const p = ((t * rt.speed + rt.delay) % 1);
        const q = (1 - p);
        const px = q * q * a[0] + 2 * q * p * cx + p * p * b[0];
        const py = q * q * a[1] + 2 * q * p * cy + p * p * b[1];
        ctx.beginPath();
        ctx.arc(px, py, 2.3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,90,31,' + (0.35 + 0.5 * Math.sin(p * Math.PI)) + ')';
        ctx.fill();
      });
      // hub glow
      const h = project(hub.lon, hub.lat);
      const g = ctx.createRadialGradient(h[0], h[1], 0, h[0], h[1], 40);
      g.addColorStop(0, 'rgba(255,90,31,.28)'); g.addColorStop(1, 'rgba(255,90,31,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(h[0], h[1], 40, 0, Math.PI * 2); ctx.fill();
    }
    function frame() {
      if (!running) return;
      t += 0.016;
      draw();
      if (!reduce) requestAnimationFrame(frame);
    }
    const wo = new IntersectionObserver(es => {
      es.forEach(e => {
        if (e.isIntersecting && !running) { running = true; requestAnimationFrame(frame); }
        else if (!e.isIntersecting) running = false;
      });
    }, { threshold: 0.05 });
    wo.observe(cv);
    const worldSection = cv.closest('.world');
    if (worldSection) setTimeout(() => worldSection.classList.add('is-in'), 350);
    let rz; window.addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(layout, 180); });
    layout();
  }

  /* ---------- Contact form ---------- */
  const form = document.getElementById('contactForm');
  if (form) {
    const ok = document.getElementById('formSuccess');
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      const btn = form.querySelector('[type=submit]');
      if (btn) { btn.disabled = true; btn.style.opacity = '.6'; }
      setTimeout(() => { if (ok) { ok.classList.add('is-on'); ok.setAttribute('aria-hidden', 'false'); } form.reset(); }, 700);
    });
    const close = document.getElementById('formReset');
    if (close) close.addEventListener('click', () => { ok.classList.remove('is-on'); ok.setAttribute('aria-hidden', 'true'); const b = form.querySelector('[type=submit]'); if (b) { b.disabled = false; b.style.opacity = ''; } });
  }

  /* ---------- Year ---------- */
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Language buttons ---------- */
  document.querySelectorAll('[data-lang]').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      if (window.IkonI18N) window.IkonI18N.set(lang);
    });
  });
})();
