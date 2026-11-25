'use strict';

// Visual rubric for home page to Module 1 (path-rubric.md): screenshots of fixed
// states at two widths, mechanical gates, then one Sonnet critic with the fixed rubric.
//
//   node path-visual.js --site <site dir> --handbook <path under site> [--home <path under site>] [--no-critic]
//   e.g. --site site --handbook clients/acme-mvp/agents-101/ --home index.html

const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const crypto = require('node:crypto');
const { spawn } = require('node:child_process');
const { chromium } = require('playwright');

const HERE = __dirname;
const VIEWPORTS = [['1440', { width: 1440, height: 900 }], ['421', { width: 421, height: 698 }]];
const STATES = [
  ['entry', ''], ['first-request', '#make-my-first-game'], ['folder', '#open-cowork-and-add-a-folder'],
  ['course-files', '#3-download-the-course-files'], ['continue', '#continue-to-module-1'], ['module-1', '#getting-going'],
];

function args(argv) { const o = {}; for (let i = 0; i < argv.length; i++) if (argv[i].startsWith('--')) o[argv[i].slice(2)] = argv[i + 1]?.startsWith('--') || argv[i + 1] === undefined ? true : argv[++i]; return o; }

function serve(root) {
  const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml', '.webm': 'video/webm', '.mp4': 'video/mp4' };
  const server = http.createServer((req, res) => {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    let f = path.join(root, p);
    if (!f.startsWith(path.resolve(root))) { res.writeHead(403); return res.end(); }
    if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
    if (!fs.existsSync(f)) { res.writeHead(404); return res.end('not found'); }
    res.writeHead(200, { 'content-type': types[path.extname(f)] || 'application/octet-stream' });
    fs.createReadStream(f).pipe(res);
  });
  return new Promise(r => server.listen(0, '127.0.0.1', () => r(server)));
}

// Contrast of visible paragraph text against the first opaque ancestor background.
const CONTRAST = () => {
  const parse = c => (c.match(/[\d.]+/g) || []).map(Number);
  const lum = ([r, g, b]) => { const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
  const bg = el => { for (let e = el; e; e = e.parentElement) { const c = parse(getComputedStyle(e).backgroundColor); if (c.length >= 3 && (c[3] === undefined || c[3] > 0.5)) return c; } return [255, 255, 255]; };
  let worst = 21, where = '';
  for (const el of document.querySelectorAll('p, li, td, h1, h2, h3, a, button, summary')) {
    const r = el.getBoundingClientRect();
    if (!r.width || r.bottom < 0 || r.top > innerHeight || !el.textContent.trim()) continue;
    const s = getComputedStyle(el); if (s.visibility === 'hidden' || s.display === 'none' || Number(s.opacity) < 0.5) continue;
    const a = lum(parse(s.color)), b = lum(bg(el)); const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
    const large = parseFloat(s.fontSize) >= 24 || (parseFloat(s.fontSize) >= 18.66 && Number(s.fontWeight) >= 700);
    const need = large ? 3 : 4.5;
    if (ratio / need < worst / 4.5) { worst = ratio * 4.5 / need; where = `${el.tagName.toLowerCase()} "${el.textContent.trim().slice(0, 40)}" ${ratio.toFixed(2)}:1 (needs ${need})`; }
  }
  return { ok: worst >= 4.5, where };
};

async function gatesFor(page, base, hash) {
  const g = {};
  g.noHorizontalScroll = await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1);
  if (hash) {
    g.anchorLands = await page.evaluate(id => {
      const h = document.getElementById(id); if (!h) return 'missing';
      const r = h.getBoundingClientRect(); if (r.top < 0 || r.top > innerHeight * 0.6) return `top at ${Math.round(r.top)}px`;
      const hit = document.elementFromPoint(Math.min(r.left + 10, innerWidth - 1), r.top + Math.min(r.height / 2, 10));
      return hit && (h.contains(hit) || hit.contains(h)) ? true : `covered by ${hit?.tagName.toLowerCase()}.${hit?.className}`;
    }, hash.slice(1));
  }
  g.contrast = await page.evaluate(CONTRAST);
  return g;
}

async function run(opts) {
  const site = path.resolve(opts.site || path.join(HERE, '../../../../site'));
  const server = await serve(site);
  const base = `http://127.0.0.1:${server.address().port}/`;
  const out = path.join(HERE, 'out', 'visual-' + crypto.randomUUID().slice(0, 8));
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch();
  const shots = [], gates = {};
  try {
    for (const [vw, size] of VIEWPORTS) {
      const ctx = await browser.newContext({ viewport: size, deviceScaleFactor: 1 });
      await ctx.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: base.slice(0, -1) });
      const page = await ctx.newPage();
      const errors = []; page.on('pageerror', e => errors.push(e.message));
      if (opts.home) {
        await page.goto(base + opts.home, { waitUntil: 'load' }); await page.waitForTimeout(400);
        const f = `home-${vw}.png`; await page.screenshot({ path: path.join(out, f) }); shots.push(f);
        const g = await gatesFor(page, base, '');
        const start = await page.evaluate(h => {
          const links = [...document.querySelectorAll('a[href]')].filter(a => { const r = a.getBoundingClientRect(); return r.width && new URL(a.href, location).pathname.replace(/index\.html$/, '').endsWith(h.replace(/index\.html$/, '')); });
          return links.length ? { text: links[0].textContent.trim(), aboveFold: links[0].getBoundingClientRect().top < innerHeight } : null;
        }, opts.handbook);
        g.startLink = start ? (start.aboveFold ? true : `"${start.text}" below the first viewport`) : 'no visible link to the handbook';
        g.licenceLine = await page.evaluate(() => /licen[cs]e/i.test(document.body.innerText) || 'no licence line');
        gates[`home-${vw}`] = g;
      }
      await page.goto(base + opts.handbook, { waitUntil: 'load' }); await page.waitForTimeout(600);
      for (const [name, hash] of STATES) {
        if (hash) { await page.evaluate(h => { location.hash = h; }, hash); await page.waitForTimeout(500); }
        const f = `${name}-${vw}.png`; await page.screenshot({ path: path.join(out, f) }); shots.push(f);
        gates[`${name}-${vw}`] = await gatesFor(page, base, hash);
      }
      // Copy: the first visible Copy button in step 1 copies the request text.
      await page.evaluate(() => { location.hash = '#make-my-first-game'; });
      const btn = page.locator('section#prework button:visible', { hasText: /^\s*Copy\s*$/ }).first();
      let copy = 'no visible Copy button';
      if (await btn.count()) {
        await btn.click(); await page.waitForTimeout(300);
        const clip = await page.evaluate(() => navigator.clipboard.readText().catch(() => ''));
        copy = clip.trim().length > 10 ? true : 'clipboard empty after Copy';
      }
      // Keyboard: focus visible on the first ten Tab stops from the top.
      await page.goto(base + opts.handbook, { waitUntil: 'load' });
      const invisible = [];
      for (let i = 0; i < 10; i++) {
        await page.keyboard.press('Tab');
        const v = await page.evaluate(() => { const e = document.activeElement; if (!e || e === document.body) return null;
          // Tab inside a player's native controls leaves activeElement on the video; the browser draws that ring.
          if (e.tagName === 'VIDEO' && e.controls && !e.matches(':focus-visible')) return true; const s = getComputedStyle(e); return (s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0) || s.boxShadow !== 'none' ? true : `${e.tagName.toLowerCase()} "${e.textContent.trim().slice(0, 30)}"`; });
        if (v && v !== true) invisible.push(v);
      }
      gates[`handbook-${vw}`] = { copy, focusVisible: invisible.length ? invisible.join('; ') : true, pageErrors: errors.length ? errors.slice(0, 3).join('; ') : true };
      await ctx.close();
    }
  } finally { await browser.close(); server.close(); }
  const failures = [];
  for (const [state, g] of Object.entries(gates)) for (const [k, v] of Object.entries(g)) {
    if (k === 'contrast') { if (!v.ok) failures.push(`${state} contrast: ${v.where}`); }
    else if (v !== true) failures.push(`${state} ${k}: ${v}`);
  }
  fs.writeFileSync(path.join(out, 'gates.json'), JSON.stringify({ gates, failures }, null, 2));
  console.log(out); console.log(failures.length ? 'GATE FAILURES:\n- ' + failures.join('\n- ') : 'All gates pass');
  if (!opts['no-critic']) await critic(out, shots, failures, !!opts.home);
}

function critic(out, shots, failures, hasHome) {
  const rubric = fs.readFileSync(path.join(HERE, 'path-rubric.md'), 'utf8');
  const visual = rubric.slice(rubric.indexOf('## Visual rubric'), rubric.indexOf('## Results'));
  const prompt = [
    'You are an independent visual critic. Read each screenshot file listed below with the Read tool, then score the experience with the fixed rubric. Judge only what is visible. Do not judge the quality of the language.',
    visual,
    hasHome ? '' : 'There is no home page in this run. Score Promise, Licence and Start as 0 and say "no home page".',
    'Screenshots (name = state-width): ' + shots.join(', '),
    'Mechanical gate failures: ' + (failures.length ? failures.join('; ') : 'none'),
    'Return only JSON: {"scores":{"promise":n,"licence":n,"start":n,"action":n,"route":n,"layout":n},"total":n,"verdict":"AAA|AA|A|below A","deductions":[{"dimension":"...","state":"...","element":"...","cost":"..."}],"best":"one sentence on what works best"}',
  ].join('\n\n');
  return new Promise((resolve, reject) => {
    const child = spawn('claude', ['-p', '--model', 'sonnet', '--output-format', 'json', '--no-session-persistence', '--tools', 'Read', '--allowedTools', 'Read', '--permission-mode', 'dontAsk', '--setting-sources', '', '--strict-mcp-config', '--mcp-config', '{"mcpServers":{}}'], { cwd: out, stdio: ['pipe', 'pipe', 'pipe'] });
    let so = ''; child.stdout.on('data', d => so += d); child.stderr.on('data', () => {});
    child.on('close', () => {
      try {
        const text = JSON.parse(so).result; fs.writeFileSync(path.join(out, 'critic.txt'), text);
        const t = text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1); const v = JSON.parse(t);
        fs.writeFileSync(path.join(out, 'critic.json'), JSON.stringify(v, null, 2));
        console.log(JSON.stringify({ scores: v.scores, total: v.total, verdict: failures.length ? `${v.verdict} (gates fail)` : v.verdict }));
        resolve(v);
      } catch (e) { reject(Error('Critic reply unreadable: ' + so.slice(0, 300))); }
    });
    child.stdin.end(prompt);
  });
}

if (require.main === module) {
  const opts = args(process.argv.slice(2));
  if (!opts.handbook) { console.error('Pass --handbook <path under site>'); process.exit(2); }
  run(opts).catch(e => { console.error(e); process.exitCode = 1; });
}
