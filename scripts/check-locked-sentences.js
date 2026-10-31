#!/usr/bin/env node
'use strict';
// check-locked-sentences.js — a sentence the maintainer approved word for word
// stays word for word.
//
// Locks live in curriculum/language/locked-sentences.json, keyed by sentence id
// (scripts/sentence-ledger.js). A lock is the maintainer's call on one exact
// wording. An agent session cannot tell a polished line from a first cut; the
// lock tells it, and this gate fails when a locked sentence is changed or gone,
// naming the closest sentence now on the same slide so the edit is easy to find.
// Changing a locked sentence on purpose = remove or update its lock in the same
// commit, which makes the decision visible in review.
//
// Usage:
//   node scripts/check-locked-sentences.js                       # gate
//   node scripts/check-locked-sentences.js --add "<sentence>" [--slide <id>] [--note "<why>"] [--training <key>]
//   node scripts/check-locked-sentences.js --list

const fs = require('fs');
const path = require('path');
const { buildLedger, findQuote } = require('./sentence-ledger.js');

const ROOT = path.resolve(__dirname, '..');
const DEFAULT_FILE = path.join(ROOT, 'curriculum/language/locked-sentences.json');

function readLocks(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8')).locks || [];
}

// → [{ lock, nearest }] for every lock whose id is no longer in its training.
function brokenLocks(locks, ledgerFor) {
  const broken = [];
  for (const lock of locks) {
    const L = ledgerFor(lock.training || 'agents-101');
    if (L.rows.some(r => r.id === lock.id)) continue;
    const near = findQuote(L.rows, lock.text, lock.slide);
    broken.push({ lock, nearest: near.rows[0] || null, score: near.score });
  }
  return broken;
}

module.exports = { readLocks, brokenLocks };

if (require.main === module) {
  const argv = process.argv.slice(2);
  const val = n => { const i = argv.indexOf('--' + n); return i >= 0 ? argv[i + 1] : null; };
  const file = val('file') ? path.resolve(val('file')) : DEFAULT_FILE;
  const cache = new Map();
  const ledgerFor = k => { if (!cache.has(k)) cache.set(k, buildLedger(k)); return cache.get(k); };

  if (val('add') != null) {
    const training = val('training') || 'agents-101';
    const res = findQuote(ledgerFor(training).rows, val('add'), val('slide'));
    if (res.match !== 'exact' || res.rows.length === 0) {
      console.error(`No exact sentence match for: "${val('add')}"`);
      if (res.rows[0]) console.error(`Closest: "${res.rows[0].text}" (${res.rows[0].file})`);
      process.exit(1);
    }
    const r = res.rows[0];
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    data.locks = data.locks || [];
    if (data.locks.some(l => l.id === r.id)) { console.log(`Already locked: ${r.id}`); process.exit(0); }
    data.locks.push({ id: r.id, text: r.text, training, file: r.file, slide: r.slide, lockedOn: new Date().toISOString().slice(0, 10), note: val('note') || '' });
    fs.writeFileSync(file, JSON.stringify(data, null, 1) + '\n');
    console.log(`Locked ${r.id}: "${r.text}"`);
    process.exit(0);
  }

  const locks = readLocks(file);
  if (argv.includes('--list')) {
    for (const l of locks) console.log(`${l.id}  ${l.file}${l.slide ? '#' + l.slide : ''}  "${l.text}"`);
    process.exit(0);
  }
  const broken = brokenLocks(locks, ledgerFor);
  if (!broken.length) { console.log(`check-locked-sentences: ${locks.length} locked sentences intact`); process.exit(0); }
  console.error(`check-locked-sentences: ${broken.length} locked sentence(s) changed or removed\n`);
  for (const b of broken) {
    console.error(`- ${b.lock.id} ${b.lock.file}${b.lock.slide ? '#' + b.lock.slide : ''}`);
    console.error(`  locked: "${b.lock.text}"`);
    console.error(b.nearest ? `  now:    "${b.nearest.text}" (${b.nearest.file}:${b.nearest.line})` : '  now:    (no similar sentence found)');
  }
  console.error('\nRestore the locked wording, or remove/update the lock in curriculum/language/locked-sentences.json in the same commit.');
  process.exit(1);
}
