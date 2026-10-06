#!/usr/bin/env node
'use strict';
// extract-slide.js — cut ## slides out of a lecture into curriculum/slides/<id>.md.
//
//   node scripts/extract-slide.js lectures/<slug>.md#<id>[,<id>…] [--dry-run]
//
// Each slide's `##` section becomes slides/<id>.md and the lecture keeps
// `[<heading>](slides/<id>.md)` in its place. The include is transparent, so
// the lecture must read byte-for-byte as before once inlined: that is checked
// before anything is written, and a mismatch writes nothing.
//
// What travels with the slide (slide-card.js decides what belongs to it):
//   claims   whose anchor sits in the slide            → moved
//   sources  those claims cite                         → moved, or copied while
//                                                        a home claim or framework still cites them
//   stance   keyed only to this slide                  → moved; keyed to it and
//                                                        others, or unkeyed but owed → copied
//   notes    naming only this id in backticks          → moved; naming it and
//                                                        other ids → copied
// Frameworks, OODA, Quality and unkeyed notes are about the file: they stay home.
// The cover (`#` title + lede) is the lecture's own and is never cut.
const fs = require('fs');
const path = require('path');
const CR = require('../site/layouts/curriculum.js');
const VB = require('./validate-backing.js');
const { slideCard, maintainerNotes } = require('./slide-card.js');
const { slideReader } = require('./read-curriculum.js');

const MAINT = '<!-- maintainer -->';

function splitTail(text) {
  const i = text.indexOf(MAINT);
  return i < 0 ? { head: text, tail: '' } : { head: text.slice(0, i), tail: text.slice(i) };
}

// The backing block's lines, each tagged with its field and, for claims and
// sources, its id. Stance is a header line plus the bullets under it.
function backingLines(tail) {
  const lines = tail.split('\n');
  const o = lines.indexOf(VB.OPEN), c = lines.indexOf(VB.CLOSE);
  if (o < 0 || c < 0) return { lines, o: -1, c: -1, tagged: [] };
  const tagged = [];
  let field = null;
  for (let i = o + 1; i < c; i++) {
    const l = lines[i];
    const bold = l.match(/^\*\*([A-Za-z][A-Za-z ]*?)\*\*/);
    if (bold) { field = bold[1].trim(); tagged.push({ i, field, head: true }); continue; }
    if (!l.trim()) { if (field === 'Stance') field = 'after-stance'; tagged.push({ i, field: null }); continue; }
    const t = { i, field };
    if (field === 'Claims') { const p = VB.parseClaim(l); if (p) Object.assign(t, { claim: p.id, refs: p.refs }); }
    if (field === 'Sources') t.source = VB.parseSource(l);
    if (field === 'Frameworks') t.refs = (l.split('←')[1] || '').split(/[,\s]+/).filter(Boolean);
    tagged.push(t);
  }
  return { lines, o, c, tagged };
}

function plan(text, id, otherIds) {
  const { head, tail } = splitTail(text);
  const r = CR.slideRange(text, id);
  if (/^# /.test(r.lines[r.start])) throw new Error(`${id} is the cover (# title + lede): it stays in its lecture`);
  let end = r.end;
  while (end > r.start && !r.lines[end - 1].trim()) end--;
  const slideBody = r.lines.slice(r.start, end).join('\n') + '\n';
  const heading = r.lines[r.start].replace(/^##\s+/, '').trim();
  const headLines = head.split('\n');
  const newHead = [...headLines.slice(0, r.start), `[${heading}](slides/${id}.md)`, ...headLines.slice(end)].join('\n');

  const card = slideCard(text, id);
  const carried = new Set(card.claims.map(c => c.id));
  const b = backingLines(tail);
  const drop = new Set();
  const slideBacking = { Claims: [], Sources: [], Stance: [] };

  for (const t of b.tagged) if (t.claim && carried.has(t.claim)) { slideBacking.Claims.push(b.lines[t.i]); drop.add(t.i); }
  const homeRefs = new Set(b.tagged.filter(t => (t.claim && !carried.has(t.claim)) || t.field === 'Frameworks').flatMap(t => t.refs || []));
  const slideRefs = new Set(card.claims.flatMap(c => c.sources.map(s => s.id)));
  for (const t of b.tagged) if (t.source && slideRefs.has(t.source)) {
    slideBacking.Sources.push(b.lines[t.i]);
    if (!homeRefs.has(t.source)) drop.add(t.i);
  }
  if (card.stance) {
    const st = b.tagged.filter(t => t.field === 'Stance' || (t.head && t.field === 'Stance'));
    const keyedOnlyHere = card.stance.slides.length === 1 && card.stance.slides[0] === id;
    for (const t of st) { slideBacking.Stance.push(b.lines[t.i]); if (keyedOnlyHere) drop.add(t.i); }
  }

  // Notes: a paragraph or bullet naming `id`. Moved when it names no other
  // slide id of this file, copied otherwise.
  const key = '`' + id + '`';
  const notes = maintainerNotes(text).filter(n => n.includes(key));
  const movedNotes = notes.filter(n => !otherIds.some(o => o !== id && n.includes('`' + o + '`')));

  let tailLines = b.lines.filter((_, i) => !drop.has(i));
  let newTail = tailLines.join('\n');
  for (const n of movedNotes) newTail = newTail.replace(n + '\n\n', '').replace(n + '\n', '').replace(n, '');
  // An emptied field header (Claims/Sources/Stance) is dropped with its blank.
  newTail = newTail.replace(/\n\*\*(Claims|Sources)\*\*\n\n(?=\*\*|<!-- \/backing -->)/g, '\n');
  newTail = newTail.replace(/\n{3,}/g, '\n\n');

  let slideTail = '';
  if (notes.length || slideBacking.Claims.length || slideBacking.Stance.length) {
    const parts = [MAINT, ...notes];
    if (slideBacking.Claims.length || slideBacking.Stance.length) {
      const blk = [VB.OPEN, 'Format → `curriculum/backing-format.md`.'];
      if (slideBacking.Claims.length) blk.push('**Claims**\n' + slideBacking.Claims.join('\n'));
      if (slideBacking.Sources.length) blk.push('**Sources**\n' + slideBacking.Sources.join('\n'));
      if (slideBacking.Stance.length) blk.push(slideBacking.Stance.join('\n'));
      blk.push(VB.CLOSE);
      parts.push(blk.join('\n\n'));
    }
    slideTail = '\n' + parts.join('\n\n') + '\n';
  }
  return {
    id, heading,
    slide: slideBody + slideTail,
    home: newHead + newTail,
    moved: { claims: slideBacking.Claims.length, sources: slideBacking.Sources.length, stance: slideBacking.Stance.length > 0, notes: notes.length, notesMoved: movedNotes.length },
  };
}

function main(argv) {
  const dry = argv.includes('--dry-run');
  const ci = argv.indexOf('--curriculum');
  const curDir = ci >= 0 ? path.resolve(argv[ci + 1]) : path.resolve(__dirname, '..', 'curriculum');
  const arg = argv.filter((a, i) => !a.startsWith('--') && argv[i - 1] !== '--curriculum')[0];
  if (!arg || !arg.includes('#')) { console.error('usage: extract-slide.js lectures/<slug>.md#<id>[,<id>…] [--dry-run]'); return 2; }
  const [rel, idList] = arg.replace(/^curriculum\//, '').split('#');
  const homeAbs = path.join(curDir, rel);
  const slidesDir = path.join(curDir, 'slides');
  const original = fs.readFileSync(homeAbs, 'utf8');
  const fileIds = CR.stripMaintainerTail(original).split('\n').map(l => (l.match(CR.SLIDE_MARKER_RE) || [])[1]).filter(Boolean);

  let text = original;
  const written = {};
  const report = [];
  for (const id of idList.split(',')) {
    if (fs.existsSync(path.join(slidesDir, id + '.md')) || written[id]) {
      console.error(`slides/${id}.md already exists — ids are global; rename the marker in ${rel} first`);
      return 1;
    }
    let p;
    try { p = plan(text, id, fileIds); }
    catch (e) { console.error(`${rel}#${id}: ${e.message}`); return 1; }
    const problem = CR.slideFileProblem(id, p.slide);
    if (problem) { console.error(`${rel}#${id}: cut slide is not a slide file (${problem})`); return 1; }
    written[id] = p.slide;
    text = p.home;
    const m = p.moved;
    report.push(`${rel}#${id} → slides/${id}.md  "${p.heading}"  claims ${m.claims}, sources ${m.sources}, stance ${m.stance ? 'yes' : 'no'}, notes ${m.notes} (${m.notesMoved} moved)`);
  }

  // Byte-for-byte: the cut lecture, inlined, must read as the original did.
  const disk = slideReader(slidesDir);
  const get = id => (id in written ? written[id] : disk(id));
  const before = CR.inlineSlideFiles(CR.stripMaintainerTail(original), disk);
  const after = CR.inlineSlideFiles(CR.stripMaintainerTail(text), get);
  if (before !== after) {
    console.error(`${rel}: the cut lecture would not read as before once inlined — nothing written`);
    return 1;
  }
  console.log(report.join('\n'));
  if (dry) { console.log('(dry run: nothing written)'); return 0; }
  fs.mkdirSync(slidesDir, { recursive: true });
  for (const [id, body] of Object.entries(written)) fs.writeFileSync(path.join(slidesDir, id + '.md'), body);
  fs.writeFileSync(homeAbs, text);
  return 0;
}

module.exports = { plan };

if (require.main === module) process.exit(main(process.argv.slice(2)));
