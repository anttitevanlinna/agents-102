#!/usr/bin/env node
'use strict';
// sentence-step.js — the sentence step of the language loop.
//
// Reads persona-student experience logs (one JSON per run: {persona, page_hash,
// beats: [{id, tag, attention, trigger, got, tell_colleague}]}), resolves each
// beat's trigger sentence to a ledger sentence (scripts/sentence-ledger.js), and
// ranks sentences by how often independent reads went dead on them versus lit up.
// Only runs on the original page count (pass --page <hash>); a damaged copy's
// triggers are about the damage.
//
// The output is a work list, not a verdict: dead-air sentences become the
// candidates for rewrite options. Pair reviewers do not yet agree with the
// maintainer (curriculum/language/pair-review/), so every option goes to him.
//
// Usage:
//   node scripts/sentence-step.js --logs <dir> [--logs <dir>] --page <hash> [--training agents-101] [--json]
//   ... --options <N>   rewrite proposals for the N worst dead-air sentences (calls claude -p)

const fs = require('fs');
const path = require('path');
const { buildLedger, findQuote } = require('./sentence-ledger.js');

const DEAD = new Set(['boredom', 'confusion', 'frustration']);
const LIFT = new Set(['surprise', 'mastery', 'flow', 'unease']);

function classify(b) {
  if (DEAD.has(b.tag) || b.attention === 'checked-out') return 'dead';
  if (LIFT.has(b.tag) && b.attention === 'in') return 'lift';
  return 'flat';
}

function stepFromLogs(logs, ledger) {
  const by = new Map();
  const unresolved = [];
  for (const log of logs) {
    for (const b of log.beats || []) {
      if (!b.trigger || /^#+\s/.test(b.trigger)) continue;
      const res = findQuote(ledger.rows, b.trigger.replace(/\s*…$/, ''));
      const kind = classify(b);
      if (res.match === 'none') { unresolved.push({ trigger: b.trigger, beat: b.id, kind }); continue; }
      const r = res.rows[0];
      if (!by.has(r.id)) by.set(r.id, { id: r.id, text: r.text, file: r.file, slide: r.slide, line: r.line, words: r.words, dead: 0, lift: 0, flat: 0, personas: new Set(), notes: [] });
      const e = by.get(r.id);
      e[kind]++;
      e.personas.add(log.persona);
      if (kind !== 'flat') e.notes.push(`${log.persona} (${b.tag}): ${b.got}`);
    }
  }
  const rows = [...by.values()].map(e => ({ ...e, personas: [...e.personas].sort() }));
  return { rows, unresolved };
}

// Options: rewrite proposals for one dead-air sentence, written with the course
// style and the maintainer's taste notes in context. Shorter or the same length,
// or a cut. Proposals only; the maintainer decides.
function optionsPrompt(row, slideText) {
  const ROOT = path.resolve(__dirname, '..');
  const style = fs.readFileSync(path.join(ROOT, 'curriculum/writing-style.md'), 'utf8');
  const taste = fs.readFileSync(path.join(ROOT, 'curriculum/taste-notes.md'), 'utf8');
  return `You edit an agents course for people who already use LLMs at work. Simulated students went dead on one sentence. Propose fixes for that sentence only.

Rules: keep the author's claim and voice. Each option is shorter than the original or the same length, never longer. CUT is a valid option when the slide works without the sentence. Plain words, no em dashes.

Course writing style:
${style}

The course editor's taste notes:
${taste}

=== SLIDE (${row.file}${row.slide ? '#' + row.slide : ''}) ===
${slideText}

=== SENTENCE ===
${row.text}

=== WHAT THE STUDENTS SAID ===
${row.notes.slice(0, 6).join('\n')}

Answer with JSON only: {"diagnosis":"<one sentence>","options":["<rewrite or CUT>","<rewrite or CUT>"]}`;
}

function askClaude(text) {
  const { spawnSync } = require('child_process');
  const r = spawnSync('claude', ['-p', '--output-format', 'text'], { input: text, encoding: 'utf8', cwd: require('os').tmpdir(), maxBuffer: 1 << 24 });
  const m = (r.stdout || '').match(/\{[\s\S]*\}/);
  try { return JSON.parse(m[0]); } catch { return { diagnosis: 'no parse', options: [] }; }
}

module.exports = { classify, stepFromLogs, optionsPrompt };

if (require.main === module) {
  const argv = process.argv.slice(2);
  const all = n => argv.flatMap((a, i) => (a === '--' + n ? [argv[i + 1]] : []));
  const val = n => all(n)[0];
  const page = val('page');
  const logs = all('logs').flatMap(d => fs.readdirSync(d).filter(f => f.endsWith('.json')).map(f => JSON.parse(fs.readFileSync(path.join(d, f), 'utf8'))))
    .filter(l => !page || String(l.page_hash || '').startsWith(page));
  const ledger = buildLedger(val('training') || 'agents-101');
  const { rows, unresolved } = stepFromLogs(logs, ledger);
  if (val('options')) {
    const n = Number(val('options'));
    const top = rows.filter(r => r.dead >= 2 && r.dead > r.lift).sort((a, b) => (b.personas.length - a.personas.length) || (b.dead - a.dead)).slice(0, n);
    const out = top.map(r => {
      const slideText = ledger.rows.filter(x => x.file === r.file && x.slide === r.slide).map(x => (x.kind === 'heading' ? '## ' : '') + x.text).join('\n');
      const o = askClaude(optionsPrompt(r, slideText));
      process.stderr.write(`options: ${r.id}\n`);
      return { id: r.id, file: r.file, slide: r.slide, line: r.line, original: r.text, dead: r.dead, lift: r.lift, personas: r.personas, notes: r.notes, diagnosis: o.diagnosis, options: o.options };
    });
    console.log(JSON.stringify(out, null, 1));
    process.exit(0);
  }
  if (argv.includes('--json')) { console.log(JSON.stringify({ logs: logs.length, rows, unresolved }, null, 1)); process.exit(0); }
  const dead = rows.filter(r => r.dead > 0).sort((a, b) => (b.personas.length - a.personas.length) || (b.dead - a.dead));
  const lift = rows.filter(r => r.lift > 0 && r.dead === 0).sort((a, b) => b.lift - a.lift);
  console.log(`# Sentence step\n\n${logs.length} logs on page ${page || '(any)'}. ${rows.length} trigger sentences resolved, ${unresolved.length} not found in the current text.\n`);
  console.log(`## Dead air (${dead.length})\n`);
  for (const r of dead) {
    console.log(`- **${r.dead} dead / ${r.lift} lift**, ${r.personas.length} personas · ${r.file}${r.slide ? '#' + r.slide : ''}:${r.line} · ${r.id}\n  "${r.text}"`);
    for (const n of r.notes.slice(0, 3)) console.log(`  - ${n}`);
  }
  console.log(`\n## Lift, never dead (${lift.length})\n`);
  for (const r of lift.slice(0, 15)) console.log(`- ${r.lift} lift · ${r.file}${r.slide ? '#' + r.slide : ''} · "${r.text}"`);
  if (unresolved.length) {
    console.log(`\n## Not in the current text (${unresolved.length})\n`);
    for (const u of unresolved.slice(0, 20)) console.log(`- ${u.kind} · ${u.beat} · "${u.trigger}"`);
  }
}
