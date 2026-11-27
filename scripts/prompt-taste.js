#!/usr/bin/env node
/*
 * Prompt taste: counts the tells of awkward prompt writing in the prompts a
 * student pastes, per training, in page order. Deterministic, no model calls.
 *
 * It ranks; it does not judge. The script says which prompts to read first.
 * The reading step holds every sentence to one test (check_prompts.md §50):
 * would a proficient agentic business person say this out loud to an agent?
 * See curriculum/evals/lints/prompt-taste.md for the tells and the reading step.
 *
 * Control: agentic-engineering-101 must stay low on every scored tell. A change
 * to a tell that makes AE101 light up is a bad change to the tell.
 *
 * Usage:
 *   node scripts/prompt-taste.js --training agents-101            # summary + the 12 to read first
 *   node scripts/prompt-taste.js --training agents-101 --read 5   # full text of the top 5, tells listed
 *   node scripts/prompt-taste.js --training agents-101 --json
 *   node scripts/prompt-taste.js --training agents-101 --check    # gate: scored tells must not exceed the baseline
 *   node scripts/prompt-taste.js --training agents-101 --update-baseline
 *
 * --check passes for a training with no baseline yet (nothing to ratchet from).
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BASELINE = path.join(ROOT, 'curriculum', 'evals', 'lints', 'prompt-taste.baseline.json');

// Acronyms and file-name words that are written in capitals everywhere. Labels
// and emphasis are not on this list on purpose: "UNGROUNDED", "HIGH", "ONLY".
const OKCAPS = new Set(['HTML', 'URL', 'URLS', 'PDF', 'PDFS', 'API', 'APIS', 'SHA', 'CTA', 'ADR', 'ADRS', 'TDD', 'STRIDE', 'MCP', 'CLI', 'CSS', 'SQL', 'HTTP', 'HTTPS', 'JSON', 'JSONL', 'YAML', 'CSV', 'SKILL', 'CLAUDE', 'AGENTS', 'README', 'JTBD', 'NDA', 'CVSS', 'LLM', 'LLMS', 'ASCII', 'CEO', 'CTO', 'CFO', 'SVP', 'SMB', 'GDPR', 'SLA', 'KPI', 'KPIS', 'OKR', 'OKRS', 'PRD', 'TODO', 'NNNN', 'AE101']);

// [NOT FOUND] is the marker of the source-or-flag pattern (AE101 prompt-anatomy).
const strip = t => t.replace(/`[^`]*`/g, '').replace(/\[NOT FOUND\]/g, '');

const TELLS = {
  // capitals for emphasis or as labels ("all of those look bad")
  caps: t => (strip(t).match(/\b[A-Z]{3,}\b/g) || []).filter(w => !OKCAPS.has(w)),
  // telling the agent to do what it does anyway
  obvious: t => t.match(/\bStart by reading\b[^.\n]*|\bRead (?:them|it|[^.\n]{0,40}) properly\b|\bdon['’]t skim\b|\bOpen the pages\b/gi) || [],
  // "No plan or preamble": fine only where a plan up front costs the student time
  preamble: t => t.match(/\bNo (?:plan or )?preamble\b/gi) || [],
  // absolutes an agent cannot guarantee
  absolute: t => t.match(/\bnon-negotiable\b/gi) || [],
  // harshness by order
  harsh: t => t.match(/\bharsh\w*|failing grade|means you didn['’]t look/gi) || [],
  // three or more "do not" sentences in a row
  dontRun: t => t.match(/(?:\b(?:Do not|Don['’]t|Never|No) [^.!?\n]*[.!?]\s+){3,}/g) || [],
  // the course talking through the student
  meta: t => t.match(/\bthis prompt\b|the ["“][^"”]+["”] instruction|durable operating memory|hidden list/gi) || [],
  // "you" meaning the student. Scripted questions the agent asks back are fine and are not matched.
  youFlip: t => t.match(/\byou(?:['’]d)? (?:stay late|are\b[^.\n]*\bwhere)|where you are\b|time with you\b|the crux you named/g) || [],
  // course coinages no professional would say
  coined: t => t.match(/\bseams?\b|\bwobbl\w*|dialect leak|package-complete/gi) || [],
  // counted, not scored: quotas ("at least 30% wrong") are fine when specific and said once
  quota: t => t.match(/\bat least (?:one|two|three|\d+)\b[^.\n]*\b(?:drop|wrong|generic|rule)|\bAssume[^.\n]*\d+ ?%/gi) || [],
  // counted, not scored: short fragments are fine unless one repeats the sentence before it
  fragments: t => t.match(/(?:(?<=[.!?]\s|^)(?:[A-Z][\w'’]*)(?: [\w'’-]+){0,3}[.!?]\s+){3,}/gm) || [],
  // a sentence that names a module number (work has no modules). Paths like module-6/ are not matched.
  module: t => t.replace(/`[^`]*`/g, '').match(/\bModule \d+\b/gi) || [],
  // counted, not scored: the agents-101 word list; AE101 is not held to it
  wording: t => t.match(/\bhir(?:e|ed|ing)\b|\bmuscle|\bland(?:s|ed|ing)\b|\bship(?:s|ped|ping)?\b|\bleverage|\bMonday|—/g) || [],
};
const WEIGHT = { caps: 1, obvious: 1, preamble: 1, absolute: 1, harsh: 2, dontRun: 2, meta: 2, youFlip: 2, coined: 2, quota: 0, fragments: 0, module: 1, wording: 0 };

function scorePrompt(key, text) {
  const t = String(text || '').replace(/\{\{[^}]*\}\}/g, 'X').trim();
  const hits = {};
  let score = 0;
  for (const name of Object.keys(TELLS)) {
    const h = TELLS[name](t);
    if (!h.length) continue;
    hits[name] = h.map(s => String(s).trim().slice(0, 90));
    score += WEIGHT[name] * h.length;
  }
  return { key, words: t ? t.split(/\s+/).length : 0, score, hits };
}

function scoreTraining(training) {
  const { loadRegistry } = require('./compile-prompts.js');
  const { orderedKeys } = require('./build-prompt-audit-context.js');
  const registry = loadRegistry();
  const rows = orderedKeys(training).filter(k => registry[k]).map(k => scorePrompt(k, registry[k].text));
  const tells = {};
  for (const name of Object.keys(TELLS)) tells[name] = rows.reduce((a, r) => a + (r.hits[name] ? r.hits[name].length : 0), 0);
  const words = rows.reduce((a, r) => a + r.words, 0);
  const scored = rows.reduce((a, r) => a + r.score, 0);
  const lengths = rows.map(r => r.words).sort((a, b) => a - b);
  return {
    summary: {
      training,
      prompts: rows.length,
      words,
      medianWords: lengths[lengths.length >> 1] || 0,
      promptsWithATell: rows.filter(r => r.score).length,
      scored,
      scoredPer1000Words: words ? +(1000 * scored / words).toFixed(1) : 0,
      tells,
    },
    rows,
    registry,
  };
}

function readBaseline() {
  try { return JSON.parse(fs.readFileSync(BASELINE, 'utf8')); } catch (e) { return {}; }
}

function main() {
  const argv = process.argv.slice(2);
  const val = name => { const i = argv.indexOf(name); return i === -1 ? null : argv[i + 1]; };
  const has = name => argv.includes(name);
  const training = val('--training');
  if (!training) { console.error('usage: prompt-taste.js --training <key> [--read N | --json | --check | --update-baseline]'); process.exit(2); }

  const { summary, rows, registry } = scoreTraining(training);
  const ranked = rows.slice().sort((a, b) => b.score - a.score);

  if (has('--update-baseline')) {
    const base = readBaseline();
    base[training] = { scored: summary.scored, prompts: summary.prompts, words: summary.words };
    const sorted = {};
    for (const k of Object.keys(base).sort()) sorted[k] = base[k];
    fs.writeFileSync(BASELINE, JSON.stringify(sorted, null, 1) + '\n');
    console.log(`baseline for ${training}: ${summary.scored} scored tells in ${summary.prompts} prompts`);
    return;
  }

  if (has('--check')) {
    const base = readBaseline()[training];
    if (!base) { console.log(`prompt-taste: no baseline for ${training}, nothing to hold it to`); return; }
    if (summary.scored <= base.scored) { console.log(`prompt-taste: ${training} ${summary.scored} scored tells (baseline ${base.scored})`); return; }
    console.error(`prompt-taste: ${training} has ${summary.scored} scored tells, baseline is ${base.scored}. Read these and fix, or run --update-baseline if they pass the out-loud test:`);
    for (const r of ranked.filter(r => r.score).slice(0, 12)) console.error(`  ${String(r.score).padStart(3)} ${r.key}  ${Object.entries(r.hits).filter(([n]) => WEIGHT[n]).map(([n, h]) => `${n}: ${h.join(' | ')}`).join('; ')}`);
    process.exit(1);
  }

  if (has('--json')) { console.log(JSON.stringify({ summary, rows }, null, 1)); return; }

  const readN = val('--read');
  if (readN) {
    for (const r of ranked.slice(0, Number(readN) || 5)) {
      console.log(`\n===== ${r.key}  (score ${r.score}, ${r.words} words)`);
      for (const [n, h] of Object.entries(r.hits)) console.log(`  ${n}${WEIGHT[n] ? '' : ' (not scored)'}: ${h.join(' | ')}`);
      console.log('');
      console.log(String(registry[r.key].text).trim());
    }
    return;
  }

  console.log(JSON.stringify(summary));
  console.log('\nRead these first (highest score):');
  for (const r of ranked.filter(r => r.score).slice(0, 12)) console.log(String(r.score).padStart(3), r.key.padEnd(44), Object.entries(r.hits).filter(([n]) => WEIGHT[n]).map(([n, h]) => `${n}:${h.length}`).join(' '));
}

module.exports = { scorePrompt, TELLS, WEIGHT };
if (require.main === module) main();
