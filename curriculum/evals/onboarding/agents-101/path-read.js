'use strict';

// Home page to the start of Module 1, read cold by simulated solo learners.
// Same shape as the full-training student system: fixed personas and question,
// one stage funnel, cold take-homes scored blind, damage controls for calibration.
//
//   node path-read.js --workbook <handbook.html> [--home <home.html>] [--variant v0] [--reps 2] [--label text]
//   node path-read.js --calibrate --workbook <handbook.html>
//
// Variants: v0, no-start (home links to the course removed), no-licence (licence
// lines removed from home), no-m1-bridge (Continue to Module 1 block and links to
// Module 1 removed), placebo (one neutral sentence added to the welcome).

const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const crypto = require('node:crypto');
const { JSDOM, VirtualConsole } = require('jsdom');
const { callModel } = require('./model');

const HERE = __dirname;
const question = fs.readFileSync(path.join(HERE, 'path-question.txt'), 'utf8');
const personas = require('./journey-personas.json');
const targets = require('./path-targets.json');
const STAGES = ['arrive', 'start', 'first-result', 'setup', 'briefing', 'module-1'];
const sha = v => crypto.createHash('sha256').update(v).digest('hex').slice(0, 16);

function args(argv) {
  const out = { reps: 2, variant: 'v0', concurrency: 6 };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--calibrate') out.calibrate = true;
    else if (a.startsWith('--')) out[a.slice(2)] = argv[++i];
  }
  out.reps = Number(out.reps); out.concurrency = Number(out.concurrency);
  return out;
}

// Keep only what a reader sees: visible elements, link targets, headings, ids.
function clean(document, root) {
  const copy = root.cloneNode(true);
  for (const el of copy.querySelectorAll('script,style,noscript,template,svg,canvas,iframe,link,meta')) el.remove();
  for (const img of copy.querySelectorAll('img')) img.replaceWith(document.createTextNode(img.alt ? `[image: ${img.alt}]` : ''));
  for (const v of copy.querySelectorAll('video')) {
    const cap = v.getAttribute('aria-label') || v.getAttribute('title') || '';
    v.replaceWith(document.createTextNode(cap ? `[video: ${cap}]` : '[video]'));
  }
  for (const el of copy.querySelectorAll('*')) {
    for (const attr of [...el.attributes]) if (!['href', 'id'].includes(attr.name)) el.removeAttribute(attr.name);
    if (el.getAttribute('href')?.startsWith('data:')) el.setAttribute('href', 'download');
  }
  const walker = document.createTreeWalker(copy, 4);
  while (walker.nextNode()) walker.currentNode.textContent = walker.currentNode.textContent.replace(/Assume there is a short /g, 'This lesson includes a short ');
  return copy.outerHTML.replace(/\n\s*\n+/g, '\n').replace(/[ \t]{2,}/g, ' ');
}

function dropHidden(window, root, copy) {
  const els = root.querySelectorAll('*'), cps = copy.querySelectorAll('*');
  for (let i = els.length - 1; i >= 0; i--) {
    const s = window.getComputedStyle(els[i]);
    if (els[i].hidden || s.display === 'none' || s.visibility === 'hidden') cps[i].remove();
  }
  for (const d of copy.querySelectorAll('details:not([open])')) for (const c of [...d.childNodes]) if (c.nodeName !== 'SUMMARY') c.remove();
  return copy;
}

function homeView(html, variant) {
  const dom = new JSDOM(html, { url: 'https://example.test/' });
  const { document, window } = dom.window;
  if (variant === 'no-start') {
    for (const a of document.querySelectorAll('a[href]')) {
      const h = a.getAttribute('href');
      if (/agents-101|prework|start/i.test(h) || /start/i.test(a.textContent)) a.replaceWith(document.createTextNode(a.textContent));
    }
  }
  if (variant === 'no-licence') {
    for (const el of [...document.querySelectorAll('p,li,small,footer,div')]) {
      if (el.isConnected && /licen[cs]e/i.test(el.textContent) && el.querySelectorAll('p,li,div').length === 0) el.remove();
    }
  }
  const root = document.body;
  const view = clean(document, dropHidden(window, root, root.cloneNode(true)));
  dom.window.close();
  return view;
}

function workbookView(html, platform, variant) {
  const dom = new JSDOM(html, {
    url: 'https://example.test/agents-101/', runScripts: 'dangerously', virtualConsole: new VirtualConsole(),
    beforeParse(window) {
      Object.defineProperty(window.navigator, 'platform', { value: platform });
      window.IntersectionObserver = class { observe() {} unobserve() {} disconnect() {} };
      window.HTMLElement.prototype.scrollIntoView = function () {};
      window.matchMedia = window.matchMedia || (() => ({ matches: false, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {} }));
    },
  });
  const { document, window } = dom.window;
  try {
    if (window.A101Runtimes) window.A101Runtimes.applyRuntime('cowork');
    const prework = document.querySelector('section.module#prework');
    if (!prework) throw Error('No section.module#prework in the handbook');
    let m1 = prework.nextElementSibling;
    while (m1 && !m1.matches('section.module')) m1 = m1.nextElementSibling;
    m1 = m1 || document.querySelectorAll('section.module')[1];
    if (!m1) throw Error('No Module 1 section after prework');
    if (variant === 'placebo') {
      const h = document.querySelector('.a101-onboarding h1, .a101-onboarding h2, section#prework h1');
      const p = document.createElement('p'); p.textContent = 'This handbook was last revised in the autumn.';
      h.after(p);
    }
    if (variant === 'no-m1-bridge') {
      const h = document.getElementById('continue-to-module-1');
      if (h) { let n = h.nextElementSibling; while (n && !/^H[12]$/.test(n.tagName)) { const x = n.nextElementSibling; n.remove(); n = x; } h.remove(); }
      for (const a of document.querySelectorAll(`a[href="#${m1.id}"]`)) a.replaceWith(document.createTextNode(a.textContent));
    }
    // In-page links whose target lies outside this reading still work in the real page.
    const firstPhaseLive = m1.querySelector('section.phase');
    const inReading = el => el && (prework.contains(el) || document.querySelector('.a101-onboarding')?.contains(el)
      || (m1.contains(el) && !(firstPhaseLive && (firstPhaseLive.contains(el) || (firstPhaseLive.compareDocumentPosition(el) & 4)))));
    const readings = new Map();
    for (const a of document.querySelectorAll('a[href^="#"]')) {
      const id = decodeURIComponent(a.getAttribute('href').slice(1));
      const target = id && document.getElementById(id);
      if (!target || inReading(target)) continue;
      // A reading the prework sends the learner to is part of the path: show it after the handbook.
      if (prework.contains(a) && /^H[1-3]$/.test(target.tagName) && !readings.has(id)) {
        const box = document.createElement('section'); box.appendChild(target.cloneNode(true));
        for (let n = target.nextElementSibling; n && !/^H[1-3]$/.test(n.tagName); n = n.nextElementSibling) box.appendChild(n.cloneNode(true));
        readings.set(id, `=== READING opened from the handbook link "${a.textContent.trim()}" ===\n` + clean(document, box).slice(0, 6000));
      }
      a.append(document.createTextNode(readings.has(id) ? ' [opens a reading, shown after the handbook]' : ' [opens a reading elsewhere in the handbook]'));
    }
    const parts = [];
    for (const sel of ['.workbook-topnav', '.workbook-cover', '.a101-onboarding', '.workbook-toc']) {
      const el = document.querySelector(sel);
      if (el) parts.push(clean(document, dropHidden(window, el, el.cloneNode(true))));
    }
    parts.push(clean(document, dropHidden(window, prework, prework.cloneNode(true))));
    // Module 1 up to its first activity: the header, then the first phase's titles only.
    const head = m1.cloneNode(false);
    const firstPhase = m1.querySelector('section.phase');
    for (const child of m1.children) { if (child === firstPhase || child.contains(firstPhase)) break; head.appendChild(child.cloneNode(true)); }
    if (firstPhase) {
      const stub = document.createElement('section');
      for (const h of [...firstPhase.querySelectorAll('h1,h2')].slice(0, 2)) stub.appendChild(h.cloneNode(true));
      head.appendChild(stub);
    }
    const headView = clean(document, head);
    parts.push(headView + '\n<p>[The rest of Module 1 continues below. The reading stops here.]</p>');
    const m1Truth = headView.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 1500);
    return { view: parts.join('\n') + (readings.size ? '\n\n' + [...readings.values()].join('\n\n') : ''), m1Truth };
  } finally { dom.window.close(); }
}

function buildViews(opts, variant) {
  const wb = fs.readFileSync(opts.workbook, 'utf8');
  const homeHtml = opts.home ? fs.readFileSync(opts.home, 'utf8') : null;
  const out = {};
  for (const [os_, platform] of [['mac', 'MacIntel'], ['windows', 'Win32']]) {
    const w = workbookView(wb, platform, variant);
    const pages = [];
    if (homeHtml) pages.push('=== PAGE: home page (the first page you open) ===\n' + homeView(homeHtml, variant));
    pages.push('=== PAGE: Agents 101 handbook' + (homeHtml ? ' (only reachable through a visible link on the home page; with no such link you cannot get here)' : ' (the first page you open)') + ' ===\n' + w.view);
    out[os_] = { text: pages.join('\n\n'), m1Truth: w.m1Truth };
  }
  return out;
}

function parseJSON(text) {
  const t = text.trim().replace(/^```(?:json)?\s*/, '').replace(/\s*```$/, '');
  return JSON.parse(t.slice(t.indexOf('{'), t.lastIndexOf('}') + 1));
}

function validRead(a) {
  if (!a.stages) return false;
  for (const s of STAGES) {
    const x = a.stages[s];
    if (!x || !['yes', 'uncertain', 'no'].includes(x.reached) || !(x.stars >= 1 && x.stars <= 5)) return false;
  }
  return ['promise', 'licence', 'm1First', 'quit'].every(k => typeof a[k] === 'string');
}

async function pool(jobs, n, fn) {
  let next = 0; const errors = [];
  await Promise.all(Array.from({ length: n }, async () => {
    while (next < jobs.length) { const j = jobs[next++]; try { await fn(j); } catch (e) { errors.push(e); } }
  }));
  return errors;
}

// Blind scorer: sees targets and answers, never the version or variant name.
async function score(rows, m1Truth, out, scratch) {
  const items = rows.map((r, i) => ({ i, promise: r.answer.promise, licence: r.answer.licence, m1First: r.answer.m1First }));
  const prompt = [
    'Grade each learner answer against the targets. Score 1 when the answer states the target in substance, 0.5 when it is partly right or vague, 0 when wrong, missing or "not stated".',
    'promise target: ' + targets.promise,
    'licence target: ' + targets.licence + ' Score 1 only if the answer has both halves: free for own use, and teaching or running it for others needs a licence.',
    'm1First target (Module 1 opening as printed): ' + m1Truth + ' Score 1 if the answer names the Start here question or the first activity named there; 0.5 if it only names the module topic.',
    'Answers: ' + JSON.stringify(items),
    'Return only JSON: {"scores":[{"i":0,"promise":0|0.5|1,"licence":0|0.5|1,"m1First":0|0.5|1}, ...]} with one entry per answer.',
  ].join('\n\n');
  const res = await callModel({ prompt, cwd: scratch, outputDir: out, tag: 'scorer-' + crypto.randomUUID().slice(0, 8), timeoutMs: 180000 });
  const { scores } = parseJSON(res.text);
  for (const s of scores) if (rows[s.i]) rows[s.i].score = { promise: s.promise, licence: s.licence, m1First: s.m1First };
}

function summarize(rows) {
  const v = { yes: 1, uncertain: 0.5, no: 0 };
  const pct = xs => xs.length ? Math.round(100 * xs.reduce((a, b) => a + b, 0) / xs.length) : null;
  const mean = xs => xs.length ? Math.round(100 * xs.reduce((a, b) => a + b, 0) / xs.length) / 100 : null;
  const funnel = {}, stars = {};
  for (const s of STAGES) {
    funnel[s] = pct(rows.map(r => v[r.answer.stages[s].reached]));
    stars[s] = mean(rows.map(r => r.answer.stages[s].stars));
  }
  const take = k => pct(rows.filter(r => r.score).map(r => r.score[k]));
  // Headline on the modules' scale: each stage is the share of readers through it (unsure = half),
  // and the score is the mean of the six stages, as a module's number is a mean over its students.
  const score = pct(rows.map(r => STAGES.reduce((a, s) => a + v[r.answer.stages[s].reached], 0) / STAGES.length));
  const lowest = STAGES.reduce((a, s) => funnel[s] < funnel[a] ? s : a, STAGES[0]);
  // Strict reach (the headline until 2026-11-28): each reader counts at their weakest stage.
  const strictReach = pct(rows.map(r => Math.min(...STAGES.map(s => v[r.answer.stages[s].reached]))));
  return { n: rows.length, score, lowest, strictReach, funnel, stars, promise: take('promise'), licence: take('licence'), m1First: take('m1First') };
}

function report(label, opts, variant, rows, sum) {
  const L = [];
  L.push(`# ${label}`, '', `Home: ${opts.home || '(none, starts at the handbook)'} · Handbook: ${opts.workbook} · Variant: ${variant} · Reads: ${sum.n} (Sonnet)`, '');
  L.push(`**Score: ${sum.score}** (mean of the six stages) · Lowest stage ${sum.lowest} ${sum.funnel[sum.lowest]} · Strict reach ${sum.strictReach} · Promise ${sum.promise} · Licence ${sum.licence} · Module 1 first step ${sum.m1First}`, '');
  L.push('| Stage | Score | Stars |', '|---|---:|---:|');
  for (const s of STAGES) L.push(`| ${s} | ${sum.funnel[s]} | ${sum.stars[s]} |`);
  L.push('', '## What slowed readers, per stage', '');
  for (const s of STAGES) {
    const f = rows.map(r => ({ who: r.id, x: r.answer.stages[s] })).filter(o => o.x.reached !== 'yes' || (o.x.friction && !/^none\.?$/i.test(o.x.friction.trim())));
    if (!f.length) continue;
    L.push(`### ${s}`, '');
    for (const o of f.slice(0, 8)) L.push(`- ${o.who} (${o.x.reached}, ${o.x.stars}): ${o.x.friction}`);
    L.push('');
  }
  L.push('## Take-homes (cold, own words)', '');
  for (const r of rows.slice(0, 10)) L.push(`- ${r.id}: promise "${r.answer.promise}" · licence "${r.answer.licence}" · M1 "${r.answer.m1First}"${r.score ? ` · scored ${r.score.promise}/${r.score.licence}/${r.score.m1First}` : ''}`);
  const quits = rows.filter(r => r.answer.quit && !/^none\.?$/i.test(r.answer.quit.trim()));
  if (quits.length) { L.push('', '## Would stop', ''); for (const r of quits) L.push(`- ${r.id}: ${r.answer.quit}`); }
  return L.join('\n') + '\n';
}

async function runOne(opts, variant, label) {
  const views = buildViews(opts, variant);
  const out = path.join(HERE, 'out', `path-${variant}-${crypto.randomUUID().slice(0, 8)}`);
  fs.mkdirSync(out, { recursive: true });
  const scratch = fs.mkdtempSync(path.join(os.tmpdir(), 'a101-path-'));
  for (const [k, v] of Object.entries(views)) fs.writeFileSync(path.join(out, k + '.view.html'), v.text);
  const jobs = [];
  for (const [id, persona] of personas.slice(0, Number(opts.personas) || personas.length)) for (let r = 1; r <= opts.reps; r++) jobs.push({ id, persona, os: id === 'windows-office-user' ? 'windows' : 'mac', rep: r });
  fs.writeFileSync(path.join(out, 'scope.json'), JSON.stringify({ label, variant, home: opts.home || null, workbook: opts.workbook,
    question: sha(question), personas: sha(JSON.stringify(personas)), targets: sha(JSON.stringify(targets)),
    views: Object.fromEntries(Object.entries(views).map(([k, v]) => [k, sha(v.text)])), reads: jobs.length }, null, 2));
  const rows = [];
  const errors = await pool(jobs, opts.concurrency, async job => {
    const tag = `${job.id}-${job.os}-${job.rep}`;
    let answer, model;
    for (let attempt = 1; attempt <= 2 && !answer; attempt++) {
      const res = await callModel({ cwd: scratch, outputDir: out, tag: tag + '-a' + attempt, timeoutMs: 240000,
        prompt: [job.persona, question, views[job.os].text].join('\n\n') });
      try { const a = parseJSON(res.text); if (validRead(a)) { answer = a; model = res.model; } } catch { /* retry once */ }
    }
    if (!answer) throw Error('Invalid read: ' + tag);
    rows.push({ ...job, persona: undefined, model, answer });
  });
  if (errors.length) console.error(`${errors.length} reads failed:`, errors.map(e => e.message).join('; '));
  if (rows.length < jobs.length * 0.9) throw Error(`INCOMPLETE: ${rows.length}/${jobs.length} reads`);
  await score(rows, views.mac.m1Truth, out, scratch);
  fs.rmSync(scratch, { recursive: true, force: true });
  const sum = summarize(rows);
  fs.writeFileSync(path.join(out, 'results.json'), JSON.stringify(rows, null, 2));
  fs.writeFileSync(path.join(out, 'summary.json'), JSON.stringify({ label, variant, ...sum }, null, 2));
  fs.writeFileSync(path.join(out, 'report.md'), report(label, opts, variant, rows, sum));
  console.log(out);
  console.log(JSON.stringify({ label, variant, ...sum }));
  return { out, sum };
}

// Calibration: a fixed control home page in front of the handbook, damaged on purpose.
// Expected: no-start drops the score by 20+, no-licence drops licence by 20+, no-m1-bridge
// drops the module-1 stage or M1 first step by 20+, placebo stays within 20 of v0.
async function calibrate(opts) {
  const base = { ...opts, home: opts.home || path.join(HERE, 'path-controls', 'home-control.html'), reps: opts.reps || 1 };
  const res = {};
  for (const v of ['v0', 'no-start', 'no-licence', 'no-m1-bridge', 'placebo']) res[v] = (await runOne(base, v, 'calibration ' + v)).sum;
  const gap = (v, k) => res[v][k] - res.v0[k];
  const checks = {
    noStartDetected: gap('no-start', 'score') <= -20,
    noLicenceDetected: gap('no-licence', 'licence') <= -20,
    noBridgeDetected: Math.min(gap('no-m1-bridge', 'score'), gap('no-m1-bridge', 'm1First'), res['no-m1-bridge'].funnel['module-1'] - res.v0.funnel['module-1']) <= -20,
    placeboQuiet: ['score', 'licence', 'm1First'].every(k => Math.abs(gap('placebo', k)) < 20),
  };
  const file = path.join(HERE, 'out', 'path-calibration.json');
  fs.writeFileSync(file, JSON.stringify({ results: res, checks }, null, 2));
  console.log(JSON.stringify(checks));
}

if (require.main === module) {
  const opts = args(process.argv.slice(2));
  if (opts.resummarize) { // node path-read.js --resummarize out/path-xxx
    const rows = JSON.parse(fs.readFileSync(path.join(opts.resummarize, 'results.json'), 'utf8'));
    console.log(JSON.stringify(summarize(rows))); process.exit(0);
  }
  if (!opts.workbook) { console.error('Pass --workbook <handbook.html>'); process.exit(2); }
  (opts.calibrate ? calibrate(opts) : runOne(opts, opts.variant, opts.label || opts.variant))
    .catch(e => { console.error(e); process.exitCode = 1; });
}

module.exports = { homeView, workbookView, summarize, STAGES };
