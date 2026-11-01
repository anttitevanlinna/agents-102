#!/usr/bin/env node
'use strict';
// sentence-cuts.js — fewer sentences per slide, by cutting whole sentences.
//
// The maintainer's call (taste-notes 2026-11-01): Agents 101 is wordy because
// slides carry more sentences than AE101's, not because sentences are longer.
// So the move is to cut a whole sentence that repeats, narrates or restates.
// Length that does a job stays: an orientation repeat at a window switch, a
// number the student must remember, the answer to an objection nobody voiced.
//
//   --propose  for each dense slide, ask claude -p which numbered sentences to
//              cut; writes a JSON plan for a person (or session) to review
//   --apply    removes the planned sentences from their source lines, exactly
//
// Usage:
//   node scripts/sentence-cuts.js --propose --out plan.json [--skip <file>] [--max 50]
//   node scripts/sentence-cuts.js --apply plan.json
// --skip: a file of slide keys (file#slide), one per line, never to touch.

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { report } = require('./language-report.js');
const { buildLedger } = require('./sentence-ledger.js');

const ROOT = path.resolve(__dirname, '..');
const CUR = path.join(ROOT, 'curriculum');

function prompt(slideKey, numbered, over) {
  return `You edit an agents course for people who already use LLMs at work. This slide has too many sentences; the course's sister training runs about ${13} at most and a median of 7. Pick whole sentences to CUT. Do not rewrite anything.

Cut a sentence when it repeats what another sentence on the slide says, narrates what the student just did or felt, restates the header, signposts what comes later, or is a one-line witty aside. Keep every sentence the student needs to do the task, every number they must remember, a deliberate orientation repeat, and the answer to an objection the reader would raise. Never cut a sentence that only makes sense with a neighbour you keep cutting around, and keep each bullet's lead sentence. Cut at most ${Math.max(over, 1) + 2} sentences; fewer is fine; none is fine.

Slide ${slideKey}:
${numbered}

Answer with JSON only: {"cut":[<sentence numbers>],"why":"<one sentence>"}`;
}

function ask(text) {
  const r = spawnSync('claude', ['-p', '--output-format', 'text'], { input: text, encoding: 'utf8', cwd: require('os').tmpdir(), maxBuffer: 1 << 24 });
  const m = (r.stdout || '').match(/\{[\s\S]*\}/);
  try { return JSON.parse(m[0]); } catch { return { cut: [], why: 'no parse' }; }
}

function propose(opts) {
  const R = report(opts.training, opts.compare);
  const L = buildLedger(opts.training);
  const skip = new Set(opts.skip);
  const plan = [];
  for (const [mod, list] of R.byModule) {
    if (opts.modules && !opts.modules.includes(mod)) continue;
    for (const s of list) {
      if (!s.over || skip.has(s.key)) continue;
      if (plan.length >= opts.max) break;
      const rows = L.rows.filter(r => r.file === s.file && (r.slide || '') === (s.slide || '') && r.kind !== 'heading');
      const numbered = rows.map((r, i) => `${i + 1}. ${r.kind === 'bullet' ? '(bullet) ' : ''}${r.text}`).join('\n');
      const ans = ask(prompt(s.key, numbered, s.over));
      const cut = (ans.cut || []).filter(n => rows[n - 1]).map(n => ({ line: rows[n - 1].line, text: rows[n - 1].text }));
      plan.push({ module: mod, key: s.key, file: s.file, sentences: rows.length, why: ans.why, cut });
      process.stderr.write(`${plan.length} ${s.key}: cut ${cut.length}\n`);
    }
  }
  return plan;
}

// Remove each planned sentence from its file. A sentence is removed from the
// line it was indexed on; a line left empty (or an empty bullet) goes too.
function apply(plan) {
  const byFile = new Map();
  for (const p of plan) for (const c of p.cut) {
    if (!byFile.has(p.file)) byFile.set(p.file, []);
    byFile.get(p.file).push(c);
  }
  const misses = [];
  for (const [file, cuts] of byFile) {
    const abs = path.join(CUR, file);
    const lines = fs.readFileSync(abs, 'utf8').split('\n');
    for (const c of cuts) {
      const i = c.line - 1;
      const at = lines[i] == null ? -1 : lines[i].indexOf(c.text);
      if (at < 0) { misses.push(`${file}:${c.line} "${c.text}"`); continue; }
      const before = lines[i].slice(0, at);
      let after = lines[i].slice(at + c.text.length);
      if (/^\s*((?:[-*+]|\d+[.)])\s+)?$/.test(before)) after = after.replace(/^ +/, '');
      let line = before + after;
      line = line.replace(/ {2,}/g, ' ').replace(/\s+$/, '').replace(/^(\s*(?:[-*+]|\d+[.)])) +/, '$1 ');
      lines[i] = /^\s*((?:[-*+]|\d+[.)])\s*)?$/.test(line) ? null : line;
    }
    // drop removed lines; when that leaves two blank lines in a row, drop one
    const kept = [];
    lines.forEach((l, i) => {
      if (l !== null) { kept.push(l); return; }
      if (kept.length && kept[kept.length - 1] === '' && lines[i + 1] === '') lines[i + 1] = null;
    });
    fs.writeFileSync(abs, kept.join('\n'));
  }
  return misses;
}

module.exports = { propose, apply };

if (require.main === module) {
  const argv = process.argv.slice(2);
  const val = (n, d) => { const i = argv.indexOf('--' + n); return i >= 0 ? argv[i + 1] : d; };
  if (argv.includes('--propose')) {
    const skip = val('skip') ? fs.readFileSync(val('skip'), 'utf8').split('\n').map(s => s.trim()).filter(Boolean) : [];
    const plan = propose({ training: val('training', 'agents-101'), compare: val('compare', 'agentic-engineering-101'), skip, max: Number(val('max', 50)), modules: val('modules') ? val('modules').split(',') : null });
    fs.writeFileSync(val('out'), JSON.stringify(plan, null, 1) + '\n');
  } else if (val('apply')) {
    const misses = apply(JSON.parse(fs.readFileSync(val('apply'), 'utf8')));
    if (misses.length) { console.error('not found:\n' + misses.join('\n')); process.exit(1); }
  } else {
    console.error('usage: --propose --out plan.json | --apply plan.json');
    process.exit(2);
  }
}
