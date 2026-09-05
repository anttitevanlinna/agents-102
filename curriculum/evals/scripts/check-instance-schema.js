#!/usr/bin/env node
'use strict';
/*
 * check-instance-schema.js — gate the eval-instance record itself.
 *
 * An instance is the only durable evidence a judge ran. The Quality row cites it
 * by name ("PASS:3 todos see instances/<slug>.<cls>.json"), so whatever the
 * instance fails to record, the row asserts anyway.
 *
 * Nothing has ever checked that record. The judge dispatch prompt asks for the
 * instance "in the shape already there", which is an instruction to imitate the
 * nearest example — replication with mutation and no selection. 810 instances
 * carry 60+ top-level keys, three spellings of the drift note, five of the free
 * comment, and two rival todo ledgers that contradict each other in 61 of the 79
 * instances holding both.
 *
 * The damage is not cosmetic. In AE101, 97 of 407 instances declare a
 * `todos_count` no reader can resolve: 49 carry no list at all and 48 disagree
 * with the list they carry. That is 134 todos which exist as a number on a
 * Quality row and as text nowhere. A pointer to absent evidence reads exactly
 * like evidence.
 *
 * What this gate enforces:
 *
 *   COUNT_MISMATCH        todos_count / blocking_findings_count must equal the
 *                         entries actually recorded. A count is derived, never
 *                         authored — an authored count drifts from its list and
 *                         nothing notices.
 *   COUNT_WITHOUT_LIST    a positive count with no ledger at all. The todos the
 *                         row promises were never written down.
 *   RIVAL_LEDGERS         `todos[]` and `rules_evaluated[]` both present and
 *                         disagreeing. One record, or the two rot apart.
 *   TODO_WITHOUT_FIX      a behavior finding filed TODO none of whose fired
 *                         risks names a fix. The judge's own output contract
 *                         puts `fix_hint` on the risk, and a todo nobody can
 *                         act on still lands on the Quality row, still counts,
 *                         and survives every triage that opens it looking for
 *                         something to do. Currently fires on nothing in AE101
 *                         — it guards the rubric line that now demands it,
 *                         which is the point of writing it down before it rots.
 *   FIELD_MISMATCH        `class` / `training` disagreeing with the filename the
 *                         coverage audit looks instances up by.
 *   BAD_VERDICT           a verdict outside the enum the stamper can act on.
 *
 * The count rules are what make the history self-repair: a judge cannot record
 * a count without the list any more, so every re-judge converts a phantom into
 * either a real todo or an honest zero. No archaeology needed.
 *
 * Usage:
 *   node curriculum/evals/scripts/check-instance-schema.js --training ae101
 *   [--fix] [--quiet] [--json] [--repo <path>]
 *
 * `--fix` repairs only what one reading of the data can settle: a class field
 * disagreeing with the filename every tool globs on, a training field disagreeing
 * with the path of the file the instance says it judged, and a count disagreeing
 * with the single ledger beneath it. It will not invent a missing verdict and it
 * will not choose between two ledgers — those want a judge, not a script. It
 * skips any instance with uncommitted changes, because a neighbouring session
 * writing that file is the likeliest reason it looks wrong right now.
 *
 * `--training` is required and takes no default. These instances span three
 * trainings whose histories are independent, and a gate that silently swept all
 * three would hold one training's work hostage to another's backlog.
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('node:child_process');

const REL_DIR = 'curriculum/evals/instances';
const NAME_RE = /^(.+)\.([a-z_]+)\.json$/;
const VERDICTS = new Set(['PASS', 'PASS_WITH_TODOS', 'REVISE', 'N/A']);

// A todo is a finding the judge chose not to gate on. In the ledger shape it is
// a rule row that came back REVISE without blocking; in the older shape it is an
// entry in `todos[]`. Both are counted the same way so the two can be compared.
const isTodoRow = r => !!r && typeof r === 'object' && r.verdict === 'REVISE' && r.blocking === false;
const isBlockingRow = r => !!r && typeof r === 'object' && r.verdict === 'REVISE' && r.blocking === true;

// Class B (simulation-behavior) never writes rule rows. It scores prompts, and
// each finding lands in `prompts_findings` carrying its own verdict — TODO for
// a non-blocking one, REVISE for a blocking one. The mapping is not a guess:
// across the 106 instances holding the field, count(REVISE) equals the declared
// blocking_findings_count on every single one, and count(TODO) equals the
// declared todos_count on 103. The three that disagree all declare zero over
// recorded TODOs, which is the direction this gate exists to catch.
const isPromptTodo = f => !!f && typeof f === 'object' && f.verdict === 'TODO';
const isPromptBlocking = f => !!f && typeof f === 'object' && f.verdict === 'REVISE';

function ledgers(inst) {
  const list = Array.isArray(inst.todos) ? inst.todos.length : null;
  const rows = Array.isArray(inst.rules_evaluated) ? inst.rules_evaluated.filter(isTodoRow).length : null;
  const prompts = Array.isArray(inst.prompts_findings) ? inst.prompts_findings.filter(isPromptTodo).length : null;
  return { list, rows, prompts };
}

// `todos[]` is the older, thinner record and `rules_evaluated` the one five
// tools already read, so the ledger wins a tie. `prompts_findings` sits between
// them: it is a whole class's only record, so it counts wherever no rule rows
// exist. Where only the list exists it is still the evidence, and counting it
// is not the same as blessing the shape.
function derivedTodos(inst) {
  const { list, rows, prompts } = ledgers(inst);
  if (rows !== null) return rows;
  if (prompts !== null) return prompts;
  return list;
}

function derivedBlocking(inst) {
  if (Array.isArray(inst.rules_evaluated)) return inst.rules_evaluated.filter(isBlockingRow).length;
  if (Array.isArray(inst.prompts_findings)) return inst.prompts_findings.filter(isPromptBlocking).length;
  return null;
}

const asInt = v => (typeof v === 'number' && Number.isInteger(v) ? v
  : (typeof v === 'string' && /^\d+$/.test(v) ? Number(v) : null));

// Patch the text, never re-serialise the object. These files were written by
// many hands at several indents, so JSON.stringify turns a one-word correction
// into a whole-file rewrite — 1330 changed lines to move "storytelling" to
// "story". In a tree a neighbouring session is reading, a diff that large is
// indistinguishable from a rewrite, and it buries the change it was made for.
//
// Only top-level scalars are ever patched, and only at the file's own base
// indent, so a same-named key nested inside rules_evaluated is never touched.
// Returns null when a key is not found where expected — the caller reports it
// rather than falling back to a reformat.
function patchText(text, patch) {
  const indent = (/\n(\s+)"/.exec(text) || [, '  '])[1];
  let out = text;
  for (const [k, v] of Object.entries(patch)) {
    const re = new RegExp(`^${indent}"${k}": [^\\n]*$`, 'm');
    const hit = re.exec(out);
    if (!hit) return null;
    const comma = hit[0].endsWith(',') ? ',' : '';
    out = out.slice(0, hit.index) + `${indent}"${k}": ${JSON.stringify(v)}${comma}` + out.slice(hit.index + hit[0].length);
  }
  return out;
}

// Gate vs debt, the split the board already draws: a contradiction is wrong
// under every reading and is cheap to correct, so it fails the build. Legacy
// debt is a to-do list — the todos a judge never wrote down cannot be recovered
// by any amount of arithmetic here, and they clear when that class is re-judged
// under a schema that forbids the omission. Gating on debt would only mean
// switching the gate off.
const DEBT = new Set(['RIVAL_LEDGERS', 'COUNT_WITHOUT_LIST', 'TODO_WITHOUT_FIX']);

// A todo whose author can name no fix is not work. It reads on the Quality row
// exactly like one that is, so it survives every triage that goes looking for
// something to do and finds nothing to do. The hint lives on the risk, not on
// the finding — the finding carries only the verdict — so a check written
// against the finding would flag all 54 AE101 todos and mean nothing by it.
// Missing key and empty string are the same statement; catching one spelling
// and not the other is how a ledger this size drifts.
const hasFix = r => !!r && typeof r === 'object' && typeof r.fix_hint === 'string' && r.fix_hint.trim() !== '';
const namesNoFix = f => isPromptTodo(f)
  && !(Array.isArray(f.risks_fired) && f.risks_fired.some(hasFix));

function checkInstance(name, inst) {
  const problems = [];
  const add = (code, detail) => problems.push({ code, detail, severity: DEBT.has(code) ? 'debt' : 'gate' });

  const m = NAME_RE.exec(name);
  const fileClass = m ? m[2] : null;
  const fileTraining = m ? String(m[1]).split('--')[0] : null;

  if (fileClass && inst.class !== fileClass) {
    add('FIELD_MISMATCH', `class is ${JSON.stringify(inst.class)}, filename says ${fileClass}`);
  }
  if (fileTraining && inst.training !== fileTraining) {
    add('FIELD_MISMATCH', `training is ${JSON.stringify(inst.training)}, filename says ${fileTraining}`);
  }
  if (!VERDICTS.has(inst.verdict)) {
    add('BAD_VERDICT', `${JSON.stringify(inst.verdict)} is not one of ${[...VERDICTS].join(' / ')}`);
  }

  // Any two ledgers present at once are compared. Three names for one number is
  // not redundancy; they rot apart and each reader picks whichever it was
  // written against.
  const { list, rows, prompts } = ledgers(inst);
  const present = [
    ['todos[]', list], ['prompts_findings', prompts], ['rules_evaluated', rows],
  ].filter(([, n]) => n !== null);
  let rivals = false;
  for (let i = 0; i < present.length; i++) {
    for (let j = i + 1; j < present.length; j++) {
      const [an, av] = present[i]; const [bn, bv] = present[j];
      if (av === bv) continue;
      rivals = true;
      add('RIVAL_LEDGERS', `${an} holds ${av}, ${bn} holds ${bv}`
        + (bn === 'rules_evaluated' ? ' non-blocking REVISE rows' : ''));
    }
  }

  const declared = asInt(inst.todos_count);
  const derived = derivedTodos(inst);
  if (declared === null) {
    add('COUNT_MISMATCH', `todos_count is ${JSON.stringify(inst.todos_count)}, not an integer`);
  } else if (derived === null) {
    if (declared > 0) add('COUNT_WITHOUT_LIST', `declares ${declared} todo(s) and records none`);
  } else if (declared !== derived) {
    // With the ledgers disagreeing there is no count to be right about, so the
    // mismatch is a symptom of the rivalry and travels with it rather than
    // failing a build that cannot be made green without a judgement call.
    problems.push({
      code: 'COUNT_MISMATCH', severity: rivals ? 'debt' : 'gate',
      detail: `todos_count says ${declared}, ${derived} recorded${rivals ? ' (ledgers disagree)' : ''}`,
    });
  }

  // Counted, not dropped. Which of these findings is real is the judge's call,
  // and silently reinterpreting one here would close a row nobody decided to
  // close — the same move the resolution-block rule forbids on a verdict.
  if (Array.isArray(inst.prompts_findings)) {
    const mute = inst.prompts_findings.filter(namesNoFix);
    if (mute.length) {
      add('TODO_WITHOUT_FIX', `${mute.length} TODO(s) name no fix — prompt `
        + mute.map(f => (f.prompt_index === undefined ? '?' : f.prompt_index)).join(', '));
    }
  }

  const declaredBlocking = asInt(inst.blocking_findings_count);
  const derivedB = derivedBlocking(inst);
  if (declaredBlocking !== null && derivedB !== null && declaredBlocking !== derivedB) {
    add('COUNT_MISMATCH', `blocking_findings_count says ${declaredBlocking}, ${derivedB} recorded`);
  }

  return problems;
}

function scan(repo, training) {
  const dir = path.join(repo, REL_DIR);
  const out = [];
  for (const name of fs.readdirSync(dir).sort()) {
    if (!name.endsWith('.json')) continue;
    let inst;
    try { inst = JSON.parse(fs.readFileSync(path.join(dir, name), 'utf8')); }
    catch (e) {
      // Corruption is attributed by filename, since the record that would have
      // claimed a training cannot be read. A name carrying no training prefix
      // belongs to nobody, so every scan reports it — an unparseable instance
      // that no training owns is exactly the file that would sit unnoticed.
      const owner = name.includes('--') ? name.split('--')[0] : null;
      if (owner === null || owner === training) {
        out.push({ name, problems: [{ code: 'UNREADABLE', detail: e.message }] });
      }
      continue;
    }
    if (!inst || typeof inst !== 'object') continue;
    // Training is taken from the record, not the filename: an instance stamped
    // with the wrong training is itself a finding, and reading the filename here
    // would route it out of the very scan that would have caught it.
    const t = inst.training || String(name).split('--')[0];
    if (t !== training) continue;
    const problems = checkInstance(name, inst);
    if (problems.length) out.push({ name, problems });
  }
  return out;
}

// The repairs a single reading of the data settles. Each returns a patch or
// null; null means the defect needs a judge and the report keeps it.
function repairs(name, inst) {
  const patch = {};
  const m = NAME_RE.exec(name);
  const fileClass = m ? m[2] : null;

  // Every tool globs instances by the `.<class>.json` suffix, so where the field
  // and the suffix disagree the suffix is the one anything downstream believes.
  if (fileClass && inst.class !== fileClass) patch.class = fileClass;

  // Training is derived from the path of the file the instance says it judged —
  // the same derivation check-instance-names.js uses to place the file — so the
  // two gates can never disagree about who owns an instance.
  // Lectures and exercises are a shared library — the same file is taught by
  // more than one training — so only a file under trainings/ carries its owner in
  // its path. Where it does not, the filename prefix stands in, which is safe
  // only because check-instance-names.js has already derived that prefix from
  // the path and runs ahead of this gate. Fields follow filenames; filenames
  // follow the judged file. Reverse either and a mis-stamp becomes consistent,
  // and a consistent mis-stamp is one nothing will ever report.
  const owner = /\/trainings\/([^/]+)\//.exec(String(inst.file || ''));
  const derivedTraining = owner
    ? (owner[1] === 'agentic-engineering-101' ? 'ae101' : owner[1])
    : (name.includes('--') ? name.split('--')[0] : null);
  if (derivedTraining && inst.training !== derivedTraining) patch.training = derivedTraining;

  // Arithmetic is only settled while every ledger present agrees. One dissenter
  // among three makes the count a judgement, same as it does among two.
  const counts = Object.values(ledgers(inst)).filter(n => n !== null);
  const single = new Set(counts).size < 2;
  if (single) {
    const d = derivedTodos(inst);
    if (d !== null && asInt(inst.todos_count) !== d) patch.todos_count = d;
    const b = derivedBlocking(inst);
    if (b !== null && asInt(inst.blocking_findings_count) !== b) patch.blocking_findings_count = b;
  }
  return Object.keys(patch).length ? patch : null;
}

function main() {
  const argv = process.argv.slice(2);
  const flag = n => (argv.includes(n) ? argv[argv.indexOf(n) + 1] : null);
  const repo = flag('--repo') || process.cwd();
  const training = flag('--training');
  const quiet = argv.includes('--quiet');
  const asJson = argv.includes('--json');

  if (!training || training.startsWith('--')) {
    process.stderr.write('usage: check-instance-schema.js --training <training> [--quiet] [--json] [--repo <path>]\n');
    process.exit(2);
  }

  if (argv.includes('--fix')) {
    const dir = path.join(repo, REL_DIR);
    let fixed = 0, wip = 0, left = 0;
    for (const f of scan(repo, training)) {
      const file = path.join(dir, f.name);
      let text, inst;
      try { text = fs.readFileSync(file, 'utf8'); inst = JSON.parse(text); } catch { left++; continue; }
      const patch = repairs(f.name, inst);
      if (!patch) { left++; continue; }
      const dirty = execFileSync('git', ['status', '--porcelain', '--', path.join(REL_DIR, f.name)],
        { cwd: repo, encoding: 'utf8' }).trim();
      if (dirty) { process.stderr.write(`WIP-SKIP ${f.name}\n`); wip++; continue; }
      const next = patchText(text, patch);
      if (next === null) {
        process.stderr.write(`UNPATCHABLE ${f.name}: ${Object.keys(patch).join(' ')} not found at top level\n`);
        left++; continue;
      }
      fs.writeFileSync(file, next);
      process.stdout.write(`  ${f.name}: ${Object.entries(patch).map(([k, v]) => `${k}=${JSON.stringify(v)}`).join(' ')}\n`);
      fixed++;
    }
    process.stdout.write(`\nrepaired ${fixed}; wip-skipped ${wip}; ${left} left for a judge\n`);
  }

  const found = scan(repo, training);
  const gated = found.filter(f => f.problems.some(p => p.severity === 'gate'));

  if (asJson) { process.stdout.write(JSON.stringify(found, null, 2) + '\n'); process.exit(gated.length ? 1 : 0); }

  const tally = sev => {
    const m = new Map();
    for (const f of found) for (const p of f.problems) if (p.severity === sev) m.set(p.code, (m.get(p.code) || 0) + 1);
    return [...m].map(([c, n]) => `${c} ${n}`).join('  ');
  };
  const section = (sev, title) => {
    const rows = found.map(f => ({ name: f.name, ps: f.problems.filter(p => p.severity === sev) })).filter(r => r.ps.length);
    if (!rows.length) return;
    process.stdout.write(`\n${title} — ${rows.length} instance(s) in ${training}:\n\n`);
    if (!quiet) for (const r of rows) {
      process.stdout.write(`  ${r.name}\n`);
      for (const p of r.ps) process.stdout.write(`    ${p.code}: ${p.detail}\n`);
    }
    process.stdout.write(`  ${tally(sev)}\n`);
  };

  section('gate', 'Instance schema — CONTRADICTIONS');
  section('debt', 'Instance schema — legacy debt (clears on re-judge, does not fail the build)');
  if (!found.length) process.stdout.write(`Instance schema — ${training}: clean.\n`);
  else if (!gated.length) process.stdout.write(`\nNo contradictions in ${training}.\n`);
  process.exit(gated.length ? 1 : 0);
}

if (require.main === module) main();

module.exports = { checkInstance, derivedTodos, derivedBlocking, ledgers, isTodoRow, isBlockingRow, scan, repairs, patchText };
