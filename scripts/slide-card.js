#!/usr/bin/env node
'use strict';
// slide-card.js — what one slide carries when another training borrows it.
//
// A slide include (`[T](lectures/x.md#<id>)`) inlines one `##` section. The
// research and the maintainer guards behind it stay in the home file, judged
// and freshness-stamped there; a borrower reads them here instead of copying.
//
//   claims   ← the backing block's Claims whose anchor sits in this slide. No
//              slide field in the block: the anchor already names the phrase,
//              and validate-backing's ANCHOR-DRIFT matcher (anchorAt) places it.
//   sources  ← each carried claim's stamps, verbatim (due dates travel).
//   stance   ← the file's Stance header + would-move-it. A header naming slide
//              ids (`**Stance** `[stance:…]` (`<id>`)`) travels only to those;
//              unkeyed, to any slide carrying a detail or borrowed claim.
//   notes    ← maintainer paragraphs / bullets naming the id in backticks
//              (`<id>`). Unkeyed notes are about the file's place in its home
//              training and stay home.
//   borrowers← training files that include this slide by id.
//
// A claim whose anchor spans two `#`/`##` sections is a straddler: carried by
// neither slide, so a borrower would take half of it. Reported per file.
//
// Usage:
//   node scripts/slide-card.js lectures/<slug>.md#<id>   # one slide
//   node scripts/slide-card.js lectures/<slug>.md        # every slide in the file

const fs = require('fs');
const path = require('path');
const CR = require('../site/layouts/curriculum.js');
const { readCurriculumMd } = require('./read-curriculum.js');
const VB = require('./validate-backing.js');

const ROOT = path.resolve(__dirname, '..');

function backing(text) {
  const b = VB.parseBlock(text);
  if (!b) return { claims: [], sources: {}, stance: null };
  const f = VB.fields(b.body);
  const claims = (f.Claims || []).map(l => VB.parseClaim(l.text)).filter(Boolean);
  const sources = {};
  for (const l of f.Sources || []) {
    const id = VB.parseSource(l.text);
    if (id) sources[id] = (l.text.match(/`\[checked:[^\]]*\]`/) || [''])[0];
  }
  const head = b.body.match(/^\*\*Stance\*\*\s*(`\[stance:[^\]]*\]`)(.*)$/m);
  const wm = (f.Stance || []).map(l => l.text.match(/^\s*-\s*would-move-it:\s*(.+)$/)).find(Boolean);
  const keys = head ? [...head[2].matchAll(/`([a-z0-9-]+)`/g)].map(m => m[1]) : [];
  const stance = head ? { header: head[1], wouldMoveIt: wm ? wm[1] : null, slides: keys } : null;
  return { claims, sources, stance };
}

// Body sections at slide grain: every `#` / `##` outside fences.
function sections(body) {
  const out = [];
  let cur = null, inFence = false;
  for (const line of body.split('\n')) {
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
    if (!inFence && /^#{1,2} /.test(line)) { cur = []; out.push(cur); }
    if (cur) cur.push(line);
  }
  return out.map(ls => ls.join('\n'));
}

const norm = (s, expand) => VB.normalizeAnchor(expand ? expand(s) : s);

function straddlers(text, { expand } = {}) {
  const body = CR.stripMaintainerTail(text);
  const whole = norm(body, expand);
  const secs = sections(body).map(s => norm(s, expand));
  return backing(text).claims
    .filter(c => VB.anchorAt(whole, c.anchor) && !secs.some(s => VB.anchorAt(s, c.anchor)))
    .map(c => c.id);
}

// Maintainer region minus the backing block, split into paragraphs; a list
// paragraph splits into its top-level bullets so one bullet can be keyed alone.
function maintainerNotes(text) {
  const i = text.indexOf('<!-- maintainer -->');
  if (i === -1) return [];
  let tail = text.slice(i + '<!-- maintainer -->'.length);
  const o = tail.indexOf(VB.OPEN), c = tail.indexOf(VB.CLOSE);
  if (o !== -1) tail = tail.slice(0, o) + (c === -1 ? '' : tail.slice(c + VB.CLOSE.length));
  const out = [];
  for (const para of tail.split(/\n\s*\n/)) {
    const p = para.trim();
    if (!p) continue;
    if (/^\s*- /m.test(p)) {
      const lines = p.split('\n');
      let lead = [];
      let item = null;
      for (const l of lines) {
        if (/^- /.test(l)) { if (item) out.push(item.join('\n')); item = [l]; }
        else if (item) item.push(l);
        else lead.push(l);
      }
      if (item) out.push(item.join('\n'));
      if (lead.length) out.push(lead.join('\n'));
    } else out.push(p);
  }
  return out;
}

function slideCard(text, id, { expand } = {}) {
  const slice = CR.sliceSlide(text, id);
  const heading = slice.split('\n')[0].replace(/^#{1,2}\s+/, '');
  const tm = slice.match(/^<!--tier:([123])-->/m);
  const prose = norm(slice, expand);
  const b = backing(text);
  const claims = b.claims
    .filter(c => VB.anchorAt(prose, c.anchor))
    .map(c => ({
      id: c.id, layer: c.layer, anchor: c.anchor,
      sources: c.refs.map(r => ({ id: r, stamp: b.sources[r] || '(undefined source)' })),
      culturalVocab: c.culturalVocab,
    }));
  // A stance is about one subject. Keyed (`<id>` after the header) → only those
  // slides; unkeyed → any slide carrying a detail or borrowed claim.
  const owesStance = b.stance && b.stance.slides.length
    ? b.stance.slides.includes(id)
    : claims.some(c => c.layer === 'detail' || c.layer === 'borrowed');
  const key = '`' + id + '`';
  return {
    id, heading,
    tier: tm ? tm[1] : (/^# /.test(slice) ? 'cover' : '1'),
    claims,
    stance: owesStance ? b.stance : null,
    notes: maintainerNotes(text).filter(n => n.includes(key)),
  };
}

function borrowers(kindSlug, id) {
  const out = [];
  const root = path.join(ROOT, 'curriculum/trainings');
  for (const t of fs.readdirSync(root)) {
    const dir = path.join(root, t);
    if (!fs.statSync(dir).isDirectory()) continue;
    for (const f of fs.readdirSync(dir).filter(n => n.endsWith('.md'))) {
      const body = CR.stripMaintainerTail(readCurriculumMd(path.join(dir, f)));
      for (const m of body.matchAll(CR.INCLUDE_LINK_RE)) {
        if (m[2] === kindSlug && m[3] && m[3].split(',').includes(id)) out.push(`${t}/${f}`);
      }
    }
  }
  return out;
}

function ids(text) {
  return CR.stripMaintainerTail(text).split('\n')
    .map(l => (l.match(CR.SLIDE_MARKER_RE) || [])[1]).filter(Boolean);
}

function print(kindSlug, text, id, expand) {
  const c = slideCard(text, id, { expand });
  const lines = [`## ${kindSlug}.md#${id} — ${c.heading}  [${c.tier === 'cover' ? 'cover' : 'T' + c.tier}]`];
  if (!c.claims.length) lines.push('claims: none');
  for (const cl of c.claims) {
    const src = cl.sources.length ? cl.sources.map(s => `${s.id} ${s.stamp}`).join('; ')
      : cl.culturalVocab ? 'cultural-vocab' : 'none-owed';
    lines.push(`- ${cl.id} · ${cl.layer} ← ${src}`);
  }
  if (c.stance) lines.push(`stance: ${c.stance.header}${c.stance.wouldMoveIt ? ` · would-move-it: ${c.stance.wouldMoveIt}` : ''}`);
  for (const n of c.notes) lines.push(`note: ${n.replace(/\s*\n\s*/g, ' ').slice(0, 400)}${n.length > 400 ? '…' : ''}`);
  const b = borrowers(kindSlug, id);
  lines.push(`borrowed by: ${b.length ? b.join(', ') : 'none'}`);
  return lines.join('\n');
}

function main(argv) {
  const arg = argv[0];
  if (!arg) { console.error('Usage: slide-card.js <kind>/<slug>.md[#<id>]'); return 2; }
  const [file, id] = arg.split('#');
  const kindSlug = file.replace(/^curriculum\//, '').replace(/\.md$/, '');
  const abs = path.join(ROOT, 'curriculum', kindSlug + '.md');
  const text = readCurriculumMd(abs);
  const { loadRegistry } = require('./compile-prompts.js');
  const { loadFigures } = require('./compile-figures.js');
  const prompts = loadRegistry(), figures = loadFigures();
  const expand = t => CR.expandFigures(CR.expandPrompts(t, prompts), figures);

  const list = id ? [id] : ids(text);
  if (!list.length) { console.error(`${kindSlug}.md carries no <!--slide:<id>--> markers`); return 1; }
  console.log(list.map(i => print(kindSlug, text, i, expand)).join('\n\n'));
  const s = straddlers(text, { expand });
  if (!id && s.length) console.log(`\nstraddlers (anchor spans two slides, carried by neither): ${s.join(', ')}`);
  return 0;
}

module.exports = { slideCard, straddlers, maintainerNotes, borrowers };

if (require.main === module) process.exit(main(process.argv.slice(2)));
