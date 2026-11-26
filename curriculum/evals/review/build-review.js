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
const FINDINGS = opt('--findings', path.join(OUT, 'findings.json'));

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
