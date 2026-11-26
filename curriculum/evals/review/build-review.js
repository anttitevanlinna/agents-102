#!/usr/bin/env node
'use strict';
// Review copy of the open Agents 101 handbook, for Antti to read and comment on
// as a claude.ai artifact. Adds: a how-to banner, a source-file chip on every
// module and step, a prompt-key chip on every prompt, and suite findings inline.
// Strips analytics so reading the review copy never counts as a learner visit.
//
// Usage: node curriculum/evals/review/build-review.js [--findings <json>] [--out <dir>]
// findings json: { "<source path>": [{ "sev": "block|warn|note", "check": "...", "text": "..." }] }
// Rebuild the handbook first: node scripts/build-a101-mvp.js --edition open
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { JSDOM } = require('jsdom');

const ROOT = path.resolve(__dirname, '../../..');
const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const OUT = path.resolve(opt('--out', '/mnt/project-files/agents-101-review'));
const FINDINGS = opt('--findings', '/mnt/project-files/agents-101-review/findings.json');

const html = fs.readFileSync(path.join(ROOT, 'site/agents-101/index.html'), 'utf8');
const dom = new JSDOM(html);
const d = dom.window.document;
const sha = execFileSync('git', ['-C', ROOT, 'rev-parse', '--short', 'HEAD']).toString().trim();
const findings = fs.existsSync(FINDINGS) ? JSON.parse(fs.readFileSync(FINDINGS, 'utf8')) : {};
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// 1. No analytics in the review copy.
d.querySelectorAll('script').forEach((s) => {
  if (/umami|A101_TRACK/.test(s.textContent)) s.remove();
});

// 2. Section id -> source file.
const T = 'curriculum/trainings/agents-101';
function sourceFor(id) {
  const cands = [];
  let m;
  if ((m = id.match(/^(lectures|exercises)-(.+)$/))) cands.push(`curriculum/${m[1]}/${m[2]}.md`);
  if ((m = id.match(/^supplementary-(.+)$/))) cands.push(`${T}/supplementary/${m[1]}.md`);
  cands.push(`${T}/${id}.md`);
  return cands.find((p) => fs.existsSync(path.join(ROOT, p)));
}

// 3. Prompt text -> registry key (first 60 normalised chars of the body).
const norm = (s) => s.replace(/`/g, '').replace(/\s+/g, ' ').trim().toLowerCase().slice(0, 60);
const promptKeys = new Map();
const PDIR = path.join(ROOT, 'curriculum/prompts');
for (const f of fs.readdirSync(PDIR)) {
  if (!f.endsWith('.md') || f === 'README.md') continue;
  const body = fs.readFileSync(path.join(PDIR, f), 'utf8').replace(/^---[\s\S]*?\n---\n/, '');
  promptKeys.set(norm(body), f.replace(/\.md$/, ''));
}

const used = new Set();
let chips = 0, pchips = 0, fcount = 0;
d.querySelectorAll('section.module[id], section.phase[id]').forEach((sec) => {
  const src = sourceFor(sec.id);
  if (!src) return;
  used.add(src);
  const box = d.createElement('div');
  box.className = 'rv-src';
  const list = findings[src] || [];
  fcount += list.length;
  box.innerHTML = `<span class="rv-src__file">${esc(src)}</span>` + (list.length
    ? `<ul class="rv-find">${list.map((f) => `<li class="rv-find--${esc(f.sev || 'note')}"><b>${esc(f.sev || 'note')}</b> ${f.check ? `<i>${esc(f.check)}</i> ` : ''}${esc(f.text)}</li>`).join('')}</ul>`
    : '');
  const head = sec.querySelector('h1, h2, h3');
  if (head && head.parentElement) head.parentElement.insertBefore(box, head.nextSibling);
  else sec.insertBefore(box, sec.firstChild);
  chips++;
});

d.querySelectorAll('pre').forEach((pre) => {
  const key = promptKeys.get(norm(pre.textContent));
  if (!key) return;
  const tag = d.createElement('div');
  tag.className = 'rv-prompt';
  tag.textContent = `prompt ${key}`;
  pre.parentElement.insertBefore(tag, pre);
  pchips++;
});

// 3b. Calls panel: open cards (R = rules eval, T = live run) at the top, each with a jump link.
const CARDS = opt('--cards', '/mnt/project-files/quality-suite-2026-11-26');
const secOf = {};
d.querySelectorAll('section.module[id], section.phase[id]').forEach((sec) => { const p = sourceFor(sec.id); if (p && !secOf[p]) secOf[p] = sec; });
const cardSec = {};
for (const [src, list] of Object.entries(findings)) for (const f of list) {
  const m = /Card ([RT]\d+)/.exec(f.text || ''); if (m && f.sev !== 'note') cardSec[m[1]] = secOf[src];
}
const md = (t) => esc(t).replace(/\*\*([^*]+)\*\*/g, '<mark>$1</mark>').replace(/`([^`]+)`/g, '<code>$1</code>');
const cards = [];
if (fs.existsSync(path.join(CARDS, 'cards.md'))) {
  for (const blk of fs.readFileSync(path.join(CARDS, 'cards.md'), 'utf8').split(/\n(?=## )/)) {
    const h = /^## (R\d+) (.+?)(?: — (.+))?\n/.exec(blk); if (!h || /applied directly/.test(blk)) continue;
    const field = (k) => [...blk.matchAll(new RegExp(`^${k}[^:]*: (.+)$`, 'gm'))].map((x) => x[1]);
    cards.push({ id: h[1], title: h[2], before: field('BEFORE'), after: field('AFTER'), why: field('WHY').join(' ') });
  }
}
if (fs.existsSync(path.join(CARDS, 'tmux-cards.md'))) {
  for (const line of fs.readFileSync(path.join(CARDS, 'tmux-cards.md'), 'utf8').split('\n')) {
    const m = /^(\d+) (\S+) ([^:]*?)\s*(\(C-\d+\))?: (.+)$/.exec(line); if (!m) continue;
    const [change, ev] = m[5].split(/ Evidence: /);
    cards.push({ id: `T${m[1]}`, title: `${m[2]} ${m[3]}`.trim(), after: [change], why: ev ? `Seen in the live run: ${ev}` : '' });
  }
}
let panel = null;
if (cards.length) {
  panel = d.createElement('div');
  panel.className = 'rv-calls';
  panel.id = 'calls';
  const where = (c) => { const sec = cardSec[c.id]; if (!sec) return ''; const t = sec.querySelector('h1,h2'); return ` <a href="#${sec.id}">${esc(t ? t.textContent.trim() : sec.id)} &rarr;</a>`; };
  panel.innerHTML = `<h2>Your calls: ${cards.length} proposed fixes</h2>
<p>Read each card. Highlight its title, comment <b>prompt-ok</b> to take it, <b>no</b> to drop it, or write your own wording, then press <b>Send to Claude</b>. One comment can cover several cards, like "prompt-ok R1 to R6". Red and orange boxes inside the course show the same findings in place. Green ones are already fixed.</p>
<ol>${cards.map((c) => `<li><h3>${c.id}. ${esc(c.title)}${where(c)}</h3>${(c.before || []).map((b) => `<p class="b">Now: ${md(b)}</p>`).join('')}${(c.after || []).map((a) => `<p class="a">Change: ${md(a)}</p>`).join('')}${c.why ? `<p class="w">${md(c.why)}</p>` : ''}</li>`).join('')}</ol>`;
}

// 4. Home page (site/index.html) as the first block, its CSS scoped to .rv-home
// so neither page's styles reach the other.
const home = new JSDOM(fs.readFileSync(path.join(ROOT, 'site/index.html'), 'utf8')).window.document;
const homeBox = d.createElement('div');
homeBox.className = 'rv-home';
homeBox.id = 'home';
const scope = (sel) => sel.split(',').map((s) => {
  s = s.trim();
  const m = s.match(/^(html|body|:root)((?::not\([^)]*\)|\[[^\]]*\])*)\s*(?:body)?\s*(.*)$/);
  if (m) return (m[2] ? `:root${m[2]} .rv-home` : '.rv-home') + (m[3] ? ` ${m[3]}` : '');
  return `.rv-home ${s}`;
}).join(', ');
function scopeRules(rules) {
  return [...rules].map((r) => {
    if (r.selectorText) return `${scope(r.selectorText)}{${r.style.cssText}}`;
    if (r.cssRules && r.media) return `@media ${r.media.mediaText}{${scopeRules(r.cssRules)}}`;
    return r.cssText; // @font-face, @keyframes
  }).join('\n');
}
const homeCss = [...home.querySelectorAll('style')].map((s) => {
  const sheet = new JSDOM(`<style>${s.textContent}</style>`).window.document.styleSheets[0];
  return scopeRules(sheet.cssRules);
}).join('\n');
home.querySelectorAll('script[src], link[rel=canonical]').forEach((n) => n.remove());
home.querySelectorAll('a[href^="/agents-101/#"]').forEach((a) => a.setAttribute('href', a.getAttribute('href').replace('/agents-101/', '')));
const homeLabel = `<div class="rv-src rv-src--home"><span class="rv-src__file">site/index.html</span> (home page)</div>`
  + ((findings['site/index.html'] || []).length ? '' : '');
homeBox.innerHTML = `<style>${homeCss}</style>${homeLabel}${home.body.innerHTML}`;
const homeScripts = [...homeBox.querySelectorAll('script')];
homeScripts.forEach((s) => { const n = d.createElement('script'); [...s.attributes].forEach((a) => n.setAttribute(a.name, a.value)); n.textContent = s.textContent; s.replaceWith(n); });
const fh = d.querySelector('.field-header');
if (fh) fh.after(homeBox); else d.body.insertBefore(homeBox, d.body.firstChild);
const hb = d.createElement('div');
hb.className = 'rv-divider';
hb.textContent = 'Self-study handbook starts here';
homeBox.after(hb);
used.add('site/index.html');

// 5. Banner + styles.
const style = d.createElement('style');
style.textContent = `
.rv-banner{position:relative;z-index:50;background:#14110d;color:#f4ecdb;font:14px/1.5 Inter,system-ui,sans-serif;padding-block:12px;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px))}
.rv-banner b{color:#ffb38a}.rv-banner small{color:#c2b8a4;display:block;margin-top:2px}
.rv-src{margin:4px 0 10px;font:12px/1.4 ui-monospace,Menlo,monospace;color:#786c56}
.rv-src__file{background:#e6dcc4;border-radius:3px;padding:1px 6px}
.rv-find{list-style:none;margin:6px 0 0;padding:0;display:grid;gap:4px;font:13px/1.45 Inter,system-ui,sans-serif;color:#1f1a13}
.rv-find li{border-left:3px solid #2f6b6b;background:rgba(47,107,107,.08);padding:4px 8px}
.rv-find li.rv-find--block{border-color:#8a3a2a;background:rgba(138,58,42,.1)}
.rv-find li.rv-find--warn{border-color:#c97942;background:rgba(201,121,66,.1)}
.rv-find b{text-transform:uppercase;font-size:11px;letter-spacing:.06em;margin-right:4px}
.rv-divider{font:600 12px/1 Inter,system-ui,sans-serif;letter-spacing:.08em;text-transform:uppercase;text-align:center;color:#f4ecdb;background:#8a3a2a;padding:10px 16px}
.rv-src--home{padding:8px max(16px,env(safe-area-inset-left,0px));margin:0}
.rv-calls{background:#fff8ee;color:#1f1a13;font:15px/1.5 Inter,system-ui,sans-serif;padding-block:20px;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));border-bottom:3px solid #8a3a2a}
.rv-calls>*{max-width:760px;margin-left:auto;margin-right:auto}
.rv-calls h2{font-size:22px;margin:0 auto 6px}.rv-calls ol{list-style:none;padding:0;display:grid;gap:12px}
.rv-calls li{background:#fff;border:1px solid #e6dcc4;border-radius:6px;padding:10px 14px;min-width:0}
.rv-calls h3{font-size:15px;margin:0 0 6px}.rv-calls h3 a{font-weight:400;font-size:13px;color:#8a3a2a;margin-left:6px}
.rv-calls li p{margin:4px 0}.rv-calls>p{margin:0 auto 8px}.rv-calls .b{color:#4a4234}.rv-calls .w{color:#786c56;font-size:13px}
.rv-calls mark{background:#ffe3c4;color:inherit;padding:0 2px}.rv-calls code{font-size:13px;overflow-wrap:anywhere}
.rv-prompt{font:11px/1.3 ui-monospace,Menlo,monospace;color:#786c56;margin:8px 0 -4px}`;
d.head.appendChild(style);
const t = d.querySelector('title');
if (t) t.textContent = 'Agents 101 review copy';
const banner = d.createElement('div');
banner.className = 'rv-banner';
const when = new Date().toISOString().slice(0, 16).replace('T', ' ');
banner.innerHTML = `<b>Review copy.</b> Select any text, add a comment, then press <b>Send to Claude</b>. Claude fixes it on main, replies on the comment with what changed, and republishes this page. Prompt edits wait for your <b>prompt-ok</b> in a reply.`
  + `<small>Self-study edition built from main ${esc(sha)}, ${when} UTC. ${fcount ? `${fcount} quality findings shown inline.` : 'Quality findings appear inline once the suite run finishes.'}</small>`;
homeBox.before(banner);
if (panel) banner.after(panel);
// The home page demo scrolls itself on load; in the review copy, open at the top.
const top = d.createElement('script');
top.textContent = "(function(){if(location.hash)return;var moved=false;addEventListener('wheel',function(){moved=true},{once:true});addEventListener('touchstart',function(){moved=true},{once:true});[300,1200,2500].forEach(function(t){setTimeout(function(){if(!moved)scrollTo(0,0)},t)})})();";
d.body.appendChild(top);

fs.mkdirSync(path.join(OUT, 'media'), { recursive: true });
for (const f of fs.readdirSync(path.join(ROOT, 'site/agents-101/media'))) {
  fs.copyFileSync(path.join(ROOT, 'site/agents-101/media', f), path.join(OUT, 'media', f));
}
fs.writeFileSync(path.join(OUT, 'review.html'), dom.serialize().replace(/^<!DOCTYPE html>\s*/i, ''));
fs.writeFileSync(path.join(OUT, 'sources.json'), JSON.stringify([...used].sort(), null, 1));
console.log(`review.html: ${chips} source chips, ${pchips} prompt chips, ${fcount} findings, main ${sha}`);
