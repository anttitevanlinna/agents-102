#!/usr/bin/env node
'use strict';
// check-new-sentences.js — the voice lock for Agents 101.
//
// curriculum/language/sentence-index.json holds the id of every sentence on the
// student reading path as accepted on main. This gate reads the current text,
// takes only the sentences NOT in the index (new or reworded), and runs the
// mechanical taste checks on them. Old sentences are never re-flagged, so the
// gate stays quiet on accepted text and fires on what a commit adds.
//
//   block  put-down wording, narrator voice, banned words from rewrite-rules,
//          em-dashes
//   warn   loaded one-liners (a short remark standing alone, a rhetorical
//          question), "it" opening a paragraph
//
// After a reviewed pass lands, refresh the index:
//   node scripts/check-new-sentences.js --update
// Usage: node scripts/check-new-sentences.js [--training agents-101] [--json]

const fs = require('fs');
const path = require('path');
const { buildLedger } = require('./sentence-ledger.js');
const { flagRows } = require('./sentence-flags.js');

const ROOT = path.resolve(__dirname, '..');
const INDEX = path.join(ROOT, 'curriculum/language/sentence-index.json');

// Maintainer's word calls (curriculum/language/rewrite-rules.md § Words, calls page 2026-11-01).
const BANNED = [
  [/\bhonest(ly)?\b/i, 'honest'], [/\bdelve\b/i, 'delve'], [/\bcrucial\b/i, 'crucial'], [/\bsubstrate\b/i, 'substrate'],
  [/\bleverag(e|es|ing)\b/i, 'leverage'], [/\bimportantly\b/i, 'importantly'], [/\bmuscle\b/i, 'muscle'],
  [/\b(lands|landed|landing)\b(?! (on|in|at) (the|a|your)\b)/i, 'lands (metaphor)'],
  [/\bagent file\b/i, 'agent file (invented concept)'],
  [/\bearns? (its|their)? ?(autonomy|trust)\b/i, 'agents do not earn autonomy'],
  [/\bactually read\b/i, 'actually read'], [/\bon Monday\b/i, 'Monday'],
  [/\bship(s|ped|ping)? (it|this|the)\b/i, 'ship framing'],
];

function readIndex() {
  if (!fs.existsSync(INDEX)) return null;
  const j = JSON.parse(fs.readFileSync(INDEX, 'utf8'));
  return new Set(Object.values(j.files).flat());
}

function writeIndex(key) {
  const L = buildLedger(key);
  const files = {};
  for (const r of L.rows) {
    if (r.kind === 'heading') continue;
    (files[r.file] = files[r.file] || []).includes(r.id) || files[r.file].push(r.id);
  }
  const sorted = Object.fromEntries(Object.keys(files).sort().map(f => [f, files[f].sort()]));
  fs.writeFileSync(INDEX, JSON.stringify({ training: key, files: sorted }, null, 0).replace(/\],/g, '],\n') + '\n');
  return Object.values(files).reduce((a, x) => a + x.length, 0);
}

function check(key) {
  const known = readIndex();
  if (!known) return { missing: true, block: [], warn: [] };
  const L = buildLedger(key);
  const fresh = L.rows.filter(r => r.kind !== 'heading' && !known.has(r.id));
  const freshIds = new Set(fresh.map(r => r.id));
  const block = [], warn = [];
  // flagRows needs whole slides for its "standing alone" test; keep only new rows' flags
  for (const f of flagRows(L.rows)) {
    if (!freshIds.has(f.id)) continue;
    for (const reason of f.reasons) (/^(put-down|narrator)/.test(reason) ? block : warn).push({ ...f, reason });
  }
  for (const r of fresh) {
    for (const [re, name] of BANNED) if (re.test(r.text)) block.push({ ...r, reason: `banned word: ${name}` });
    if (/—/.test(r.text)) block.push({ ...r, reason: 'em-dash' });
    if (/^it\b/i.test(r.text) && r.pos === 0) warn.push({ ...r, reason: '"It" opens the slide' });
  }
  return { fresh: fresh.length, block, warn };
}

module.exports = { check, writeIndex, BANNED };

if (require.main === module) {
  const argv = process.argv.slice(2);
  const val = (n, d) => { const i = argv.indexOf('--' + n); return i >= 0 ? argv[i + 1] : d; };
  const key = val('training', 'agents-101');
  if (argv.includes('--update')) { console.log(`indexed ${writeIndex(key)} sentences → ${path.relative(ROOT, INDEX)}`); process.exit(0); }
  const r = check(key);
  if (argv.includes('--json')) { console.log(JSON.stringify(r, null, 1)); process.exit(r.block.length ? 1 : 0); }
  if (r.missing) { console.log('no sentence index yet; run --update'); process.exit(0); }
  const show = x => `  ${x.file}:${x.line} "${x.text.slice(0, 120)}" · ${x.reason}`;
  if (r.warn.length) console.log(`warn (${r.warn.length}):\n` + r.warn.map(show).join('\n'));
  if (r.block.length) {
    console.log(`\n${r.block.length} new sentence(s) break the maintainer's language rules:\n` + r.block.map(show).join('\n'));
    console.log('\nFix the sentence, or if the maintainer accepted it, refresh the index: node scripts/check-new-sentences.js --update');
    process.exit(1);
  }
  console.log(`OK: ${r.fresh} new sentence(s) since the index, none break the language rules`);
}
