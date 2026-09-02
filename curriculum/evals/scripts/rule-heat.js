#!/usr/bin/env node
'use strict';
/*
 * rule-heat.js — read the todo pile as feedback on the rules, not as a backlog.
 *
 * A standing population of open judge todos is healthy. Working them one by one
 * is not: it treats each note as a defect in the file, when a rule firing
 * non-blocking across fifteen files is one mis-calibrated rule and not fifteen
 * flawed files. Declining them one by one is worse — it spends the maintainer's
 * attention to make a report look tidy and changes nothing about what the next
 * sweep raises.
 *
 * So this counts by RULE. What it measures, on AE101 at first run:
 *
 *   61 rules produced a finding. 47 of them have never once blocked — they only
 *   ever advise. Ten rules account for half the todos. writing §20, prompts §38
 *   and student_facing §21 each fired eight to ten times and gated nothing.
 *
 * A rule that fires often and never gates is one of three things, and the counts
 * do not tell you which — that is the read the maintainer makes:
 *
 *   advisory by nature   it should say so, so its notes stop reading as work
 *   too broad            it wants a carve-out; the notes are true and unhelpful
 *   under-weighted       it matters and should block
 *
 * Any of the three is one amendment to one compendium, and the next sweep is
 * quieter for it. That is the same loop AE101 teaches: fix the rule, not the
 * instance, and let the fix compound.
 *
 * The number to watch is NOT the pile going to zero. It is the concentration
 * falling — a healthy corpus has a modest pile spread thin across many rules; a
 * sick one has ten rules shouting. A pile of zero would mean the judges had
 * stopped noticing anything.
 *
 * Usage:
 *   node curriculum/evals/scripts/rule-heat.js --training ae101
 *   node curriculum/evals/scripts/rule-heat.js --training ae101 --rule "writing §20"
 *   [--min <n>] [--limit <n>] [--json] [--repo <path>]
 *
 * `--rule` prints every todo that rule raised, with the file and the judge's own
 * evidence, which is what an amendment has to be written against.
 *
 * `--training` is required and takes no default: rule calibration is per corpus,
 * and averaging three trainings' habits together describes none of them.
 */
const fs = require('fs');
const path = require('path');

const REL_DIR = 'curriculum/evals/instances';

const ruleKey = r => `${String(r.compendium || '?').replace(/^check_/, '').replace(/\.md$/, '')} §${r.rule_index}`;
const isFinding = r => !!r && typeof r === 'object' && r.verdict === 'REVISE';

// Collect per rule rather than per file. A rule is identified by compendium and
// index; `rule_index` arrives as both 20 and "20" in the corpus, and the two are
// the same rule, so the key is built from the string form of each.
function heat(repo, training) {
  const dir = path.join(repo, REL_DIR);
  const rules = new Map();
  let files = new Set();
  for (const name of fs.readdirSync(dir).sort()) {
    if (!name.endsWith('.json')) continue;
    let inst;
    try { inst = JSON.parse(fs.readFileSync(path.join(dir, name), 'utf8')); } catch { continue; }
    if (!inst || inst.training !== training) continue;
    const src = String(inst.file || name);
    files.add(src);
    // The ledger is an array everywhere it is well-formed, and an object in a
    // handful of instances written before anything checked. Iterating that
    // throws, and a reader over a corpus with no schema has to survive the
    // corpus it has rather than the one its fixtures describe.
    if (!Array.isArray(inst.rules_evaluated)) continue;
    for (const r of inst.rules_evaluated) {
      if (!isFinding(r)) continue;
      const key = ruleKey(r);
      if (!rules.has(key)) rules.set(key, { key, lead: '', todos: [], blocking: [], classes: new Set(), files: new Set() });
      const e = rules.get(key);
      if (!e.lead && r.rule_lead) e.lead = String(r.rule_lead);
      e.classes.add(inst.class);
      e.files.add(src);
      (r.blocking === false ? e.todos : e.blocking).push({
        file: src, cls: inst.class, instance: name,
        evidence: String(r.evidence || '').trim(), fix_hint: r.fix_hint || null,
      });
    }
  }
  return { rules: [...rules.values()], fileCount: files.size };
}

// Sorted by todo volume, then by how many distinct files carry it: a rule firing
// once each on ten files says something different from one firing ten times on
// one file, and only the first is a rule problem.
const rank = rs => rs.slice().sort((a, b) =>
  b.todos.length - a.todos.length || b.files.size - a.files.size || a.key.localeCompare(b.key));

function main() {
  const argv = process.argv.slice(2);
  const flag = n => (argv.includes(n) ? argv[argv.indexOf(n) + 1] : null);
  const repo = flag('--repo') || process.cwd();
  const training = flag('--training');
  const only = flag('--rule');
  const min = Number(flag('--min') || 1);
  const limit = Number(flag('--limit') || 20);

  if (!training || training.startsWith('--')) {
    process.stderr.write('usage: rule-heat.js --training <training> [--rule "<compendium> §<n>"] [--min n] [--limit n] [--json]\n');
    process.exit(2);
  }

  const { rules, fileCount } = heat(repo, training);
  const ranked = rank(rules).filter(r => r.todos.length >= min);

  if (argv.includes('--json')) {
    process.stdout.write(JSON.stringify(ranked.map(r => ({
      rule: r.key, lead: r.lead, todos: r.todos.length, blocking: r.blocking.length,
      files: r.files.size, classes: [...r.classes].sort(), items: r.todos,
    })), null, 2) + '\n');
    return;
  }

  if (only) {
    const r = rules.find(x => x.key === only || x.key.replace(/\s+/g, '') === only.replace(/\s+/g, ''));
    if (!r) { process.stderr.write(`no findings recorded for ${only} in ${training}\n`); process.exit(1); }
    process.stdout.write(`\n${r.key} — ${r.lead}\n${r.todos.length} todo(s), ${r.blocking.length} blocking, across ${r.files.size} file(s)\n`);
    for (const t of [...r.todos, ...r.blocking.map(b => ({ ...b, blocked: true }))]) {
      process.stdout.write(`\n  ${path.basename(t.file)} · ${t.cls}${t.blocked ? ' · BLOCKING' : ''}\n`);
      process.stdout.write(`    ${t.evidence.replace(/\s+/g, ' ').slice(0, 400)}\n`);
      if (t.fix_hint) process.stdout.write(`    fix: ${String(t.fix_hint).replace(/\s+/g, ' ').slice(0, 200)}\n`);
    }
    process.stdout.write('\n');
    return;
  }

  const todos = ranked.reduce((n, r) => n + r.todos.length, 0);
  const neverBlocked = rules.filter(r => r.todos.length && !r.blocking.length);
  const top10 = rank(rules).slice(0, 10).reduce((n, r) => n + r.todos.length, 0);
  const allTodos = rules.reduce((n, r) => n + r.todos.length, 0);

  process.stdout.write(`\n${training} — ${allTodos} open todo(s) from ${rules.length} rule(s), across ${fileCount} file(s)\n\n`);
  process.stdout.write(`  ${'rule'.padEnd(30)} ${'todo'.padStart(4)} ${'block'.padStart(5)} ${'files'.padStart(5)}  lead\n`);
  for (const r of ranked.slice(0, limit)) {
    const flagCold = !r.blocking.length ? ' ·' : '  ';
    process.stdout.write(`  ${r.key.padEnd(30)} ${String(r.todos.length).padStart(4)} ${String(r.blocking.length).padStart(5)} ${String(r.files.size).padStart(5)}${flagCold} ${r.lead.slice(0, 52)}\n`);
  }
  process.stdout.write(`\n  · = has never blocked, only advised: ${neverBlocked.length} of ${rules.length} rules\n`);
  if (allTodos) process.stdout.write(`  concentration: top 10 rules carry ${top10} of ${allTodos} todos (${Math.round(100 * top10 / allTodos)}%)\n`);
  process.stdout.write(`\n  Read one before amending it:  --rule "${(ranked[0] || { key: 'writing §3' }).key}"\n\n`);
}

if (require.main === module) main();

module.exports = { heat, rank, ruleKey };
