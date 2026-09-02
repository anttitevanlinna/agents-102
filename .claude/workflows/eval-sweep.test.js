#!/usr/bin/env node
'use strict';
// eval-sweep.test.js — run the workflow with stubbed runtime globals.
//
// The script is not requireable: `export const meta`, top-level `await`, top-level
// `return`. So build it the way the runtime does (an AsyncFunction over
// agent/parallel/pipeline/log/phase/args/budget/workflow) and hand it stubs. That
// makes the post-processing — which is where the accounting bugs live — testable
// without launching a single agent.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { parseAsRuntimeWould } = require('../../scripts/check-workflow-scripts.js');

const SCRIPT = path.join(__dirname, 'eval-sweep.js');
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

// The real pipeline runs each item through every stage independently; the real
// parallel awaits an array of thunks. Both are faithful enough for accounting.
const pipeline = async (items, ...stages) =>
  Promise.all(
    items.map(async (item, i) => {
      let v = item;
      for (const s of stages) v = await s(v, item, i);
      return v;
    })
  );
const parallel = async (thunks) => Promise.all(thunks.map((t) => Promise.resolve().then(t).catch(() => null)));

async function run(args, agentImpl) {
  const src = fs.readFileSync(SCRIPT, 'utf8').replace(/^export\s+(const\s+meta)/m, '$1');
  const fn = new AsyncFunction('agent', 'parallel', 'pipeline', 'log', 'phase', 'args', 'budget', 'workflow', src);
  return fn(agentImpl, parallel, pipeline, () => {}, () => {}, args, { total: null, spent: () => 0, remaining: () => Infinity }, null);
}

// A judge that passes everything and refutes nothing.
const cleanJudge = async (_prompt, opts) => {
  const label = opts.label || '';
  if (label.startsWith('refute-')) return { refuted: true, reasoning: 'stub' };
  if (label.startsWith('cross_module:')) {
    return { file: 'a.md; b.md', class: 'cross_module', verdict: 'PASS', findings: [], todos: [] };
  }
  const cls = label.replace(/^confirm:/, '').split(':')[0];
  return { file: `curriculum/x/${label.split(':').pop()}.md`, class: cls, verdict: 'PASS', findings: [], todos: [] };
};

const ARGS = {
  items: [{ file: 'curriculum/exercises/e.md', instanceSlug: 'ae101--exercise--e', classes: ['behavior'], detail: { behavior: 'diff-region' }, pins: { behavior: 'abc1234' }, driftRules: {} }],
  confirm: [{ file: 'curriculum/lectures/l.md', slug: 'ae101--lecture--l', cls: 'technical', finding: 'f', applied: 'a', checks: [] }],
  sets: [
    { training: 'ae101', name: 'prework-m3', members: ['curriculum/trainings/t/a.md', 'curriculum/trainings/t/b.md'] },
    { training: 'ae101', name: 'm4-m5-m6', members: ['curriculum/trainings/t/c.md', 'curriculum/trainings/t/d.md'] },
  ],
};

test('the shipped script parses as the runtime builds it', () => {
  assert.equal(parseAsRuntimeWould(fs.readFileSync(SCRIPT, 'utf8')), null);
});

test('nothing is missing when every unit returns — sets included', async () => {
  const out = await run(ARGS, cleanJudge);
  assert.equal(out.expected, 4);
  assert.equal(out.returned, 4);
  // The regression: `missing` used to match a returned verdict's file string back
  // against the request, comparing `v.class === j.cls` (undefined for a set) and a
  // basename suffix against a semicolon-joined member list. Both sets reported
  // missing while `returned` said they came back — a run contradicting itself in
  // two adjacent fields.
  assert.deepEqual(out.missing, []);
});

// Wave 7, push-back-on-the-plan: a hand-built confirm item carried the bare
// slug, the dispatched judge obediently wrote `push-back-on-the-plan.technical
// .json` beside the canonical `ae101--exercise--…` — two files, one truth. The
// slug reaches the prompt verbatim, so the only safe place to stop it is
// before dispatch.
test('a confirm item with a bare slug is refused before any judge is dispatched', async () => {
  const calls = [];
  const spy = async (p, o) => { calls.push(o.label); return cleanJudge(p, o); };
  const bad = { confirm: [{ file: 'curriculum/exercises/push-back-on-the-plan.md', slug: 'push-back-on-the-plan', cls: 'technical', finding: 'f', applied: 'a', checks: [] }] };
  await assert.rejects(run(bad, spy), /not a canonical instance slug/);
  assert.equal(calls.length, 0);
});

test('a confirm item with no slug is refused, not written to instances/undefined', async () => {
  const bad = { confirm: [{ file: 'curriculum/lectures/l.md', cls: 'technical', finding: 'f', applied: 'a', checks: [] }] };
  await assert.rejects(run(bad, cleanJudge), /not a canonical instance slug/);
});

test('a queue item with a non-canonical instanceSlug is refused the same way', async () => {
  const bad = { items: [{ file: 'curriculum/exercises/e.md', instanceSlug: 'e', classes: ['writing'], detail: {}, pins: {}, driftRules: {} }] };
  await assert.rejects(run(bad, cleanJudge), /not a canonical instance slug/);
});

test('a unit that dies is named, and only that unit', async () => {
  const oneDies = async (prompt, opts) => ((opts.label || '') === 'cross_module:m4-m5-m6' ? null : cleanJudge(prompt, opts));
  const out = await run(ARGS, oneDies);
  assert.deepEqual(out.missing, ['cross_module:m4-m5-m6']);
  assert.equal(out.returned, 3);
  assert.equal(out.expected, 4);
});

test('missing names the class and the file, so a re-fire needs no guessing', async () => {
  const itemDies = async (prompt, opts) => ((opts.label || '').startsWith('behavior:') ? null : cleanJudge(prompt, opts));
  const out = await run(ARGS, itemDies);
  assert.deepEqual(out.missing, ['behavior:curriculum/exercises/e.md']);
});

test('returned + missing always accounts for every dispatched unit', async () => {
  for (const dead of ['cross_module:prework-m3', 'confirm:technical:l', 'behavior:e']) {
    const impl = async (prompt, opts) => ((opts.label || '') === dead ? null : cleanJudge(prompt, opts));
    const out = await run(ARGS, impl);
    assert.equal(out.returned + out.missing.length, out.expected, `dead=${dead}`);
  }
});

test('a surviving finding is reported; a refuted one is not', async () => {
  const finding = { rule: 'r', line: 1, quote: 'q', harm: 'h', fix: 'f' };
  const withFinding = (refuted) => async (prompt, opts) => {
    const label = opts.label || '';
    if (label.startsWith('refute-')) return { refuted, reasoning: 'stub' };
    if (label.startsWith('cross_module:')) return { file: 'a.md', class: 'cross_module', verdict: 'PASS', findings: [], todos: [] };
    if (label.startsWith('behavior:')) return { file: 'curriculum/exercises/e.md', class: 'behavior', verdict: 'REVISE', findings: [finding], todos: [] };
    return { file: 'curriculum/lectures/l.md', class: 'technical', verdict: 'PASS', findings: [], todos: [] };
  };
  const killed = await run(ARGS, withFinding(true));
  assert.equal(killed.summary.reduce((n, s) => n + s.confirmed.length, 0), 0);
  assert.deepEqual(killed.missing, []);

  const survived = await run(ARGS, withFinding(false));
  assert.equal(survived.summary.reduce((n, s) => n + s.confirmed.length, 0), 1);
});

// ---------------------------------------------------------------------------
// Every knob must reach the prompt.
//
// BRIEF, LAZY_EXPAND, BATCH_READ, NO_DIFF, NO_PREAMBLE and FIRES_ONLY shipped
// declared, documented with the measurements that justified them, and read by
// nothing: the workflow advertised a 51% reduction and dispatched the control
// prompt. No test could have caught it, because the tests only ever looked at
// the accounting. A dead constant is invisible in exact proportion to how well
// it is commented — so these assert the prompt TEXT each flag produces.
// ---------------------------------------------------------------------------

async function promptFor(extra) {
  const seen = [];
  const capture = async (prompt, opts) => {
    seen.push({ prompt, label: opts.label || '' });
    return cleanJudge(prompt, opts);
  };
  await run({ ...ARGS, ...extra }, capture);
  const j = seen.find((x) => x.label.startsWith('behavior:'));
  assert.ok(j, 'the class judge was never dispatched');
  return j.prompt;
}

test('the default dispatch carries every mechanic the hillclimb validated', async () => {
  const p = await promptFor({});
  assert.match(p, /derive-class-brief\.js/, 'BRIEF: the assembled rulebook');
  assert.match(p, /derive-body-view\.js/, 'the precomputed geometry');
  assert.match(p, /prefill-instance\.js .* --write/, 'PREFILL: park the resolved rows');
  assert.match(p, /prefill-instance\.js .* --merge/, 'PREFILL: and splice them back, or the ledger loses them');
  assert.match(p, /in ONE turn/, 'BATCH_READ: independent reads issued together');
  assert.match(p, /only if `has_prompt_blocks` or `has_figures`/, 'LAZY_EXPAND');
  assert.match(p, /check-instance-evidence\.js/, 'the guard that replaced the raw null-grep');
  assert.doesNotMatch(p, /grep -c '"evidence": \*null'/, 'the raw grep counts healthy N/A rows and means nothing now');
});

// The bug this guards is the one that produced every other instance bug. The
// dispatch used to say "in the shape already there" — imitate the nearest
// example — which is replication with mutation and no selection: 810 instances,
// 60+ top-level keys, three spellings of the drift note, and 134 AE101 todos
// counted onto Quality rows and written down nowhere. A schema the judge cannot
// read is not a schema, so it has to travel in the prompt.
test('the judge is given the instance schema, not an example to imitate', async () => {
  const p = await promptFor({});
  assert.doesNotMatch(p, /shape already there/, 'imitating the neighbour is what bred the dialects');
  assert.match(p, /rules_evaluated {2}one row per rule/, 'the ledger is named field by field');
  assert.match(p, /PASS \| PASS_WITH_TODOS \| REVISE \| N\/A/, 'the verdict enum is stated, not assumed');
  assert.match(p, /derived from `rules_evaluated`, never authored/, 'a count beside a list drifts from it');
  assert.match(p, /did not write down is a todo that does not exist/, 'the failure is named, not implied');
  assert.match(p, /Do not write a `todos` array/, 'one ledger — the second one contradicted it 61 times in 79');
  assert.match(p, /check-instance-schema\.js --training \S+ --quiet/, 'and the judge must run the gate on itself');
});

test('brief:false falls back to reading the compendiums in full', async () => {
  const p = await promptFor({ brief: false });
  assert.doesNotMatch(p, /derive-class-brief\.js/);
  assert.match(p, /Read IN FULL, no index files/);
  assert.match(p, /check_prompts\.md/);
});

test('the fallback compendium list survives even when the brief is on', async () => {
  // If the brief cannot build, the judge needs somewhere to go. A flag that
  // removes the fallback trades a slow judge for a blind one.
  const p = await promptFor({});
  assert.match(p, /check_prompts\.md/);
  assert.match(p, /If it cannot build, read these in full/);
});

test('noDiff removes the diff and says so, rather than silently dropping it', async () => {
  const on = await promptFor({});
  assert.match(on, /git diff abc1234\.\.HEAD/);
  const off = await promptFor({ noDiff: true });
  assert.doesNotMatch(off, /git diff abc1234\.\.HEAD/);
  assert.match(off, /say so in `diff_summary` rather than describing a diff you did not run/);
});

test('noPreamble downgrades the contract read and admits it is unmeasured', async () => {
  const p = await promptFor({ noPreamble: true });
  assert.match(p, /it is not free, it is unmeasured/);
  const d = await promptFor({});
  assert.match(d, /_dispatch-preamble\.md` IN FULL/);
});

test('the fires-only ledger is off unless asked for, and warns when asked for', async () => {
  assert.doesNotMatch(await promptFor({}), /no N\/A ledger/);
  const p = await promptFor({ evidence: 'fires' });
  assert.match(p, /no N\/A ledger/);
  assert.match(p, /audit-eval-coverage\.js` must already understand it/);
});

test('evidence:full appends the from-scratch discipline as an override', async () => {
  assert.doesNotMatch(await promptFor({}), /A PASS owes evidence too/);
  assert.match(await promptFor({ evidence: 'full' }), /A PASS owes evidence too/);
});

test('every judge prompt is read-only on the target, in every mode', async () => {
  for (const mode of [{}, { brief: false }, { noDiff: true }, { evidence: 'full' }, { evidence: 'fires' }]) {
    assert.match(await promptFor(mode), /You are READ-ONLY on the target file/, JSON.stringify(mode));
  }
});

test('both dispatch doors name the same mechanics, or one of them is a rumour', async () => {
  // The skill and this workflow are the two ways a judge gets fired. They share
  // one contract file, but each writes its own parameter header — and a header
  // that forgets a step is how the same file judged by the same class got two
  // different protocols depending on which door it came through.
  const skill = fs.readFileSync(path.join(__dirname, '..', 'skills', 'eval-fire', 'SKILL.md'), 'utf8');
  const prompt = await promptFor({});
  for (const mechanic of [
    '_dispatch-preamble.md',
    'derive-class-brief.js',
    'derive-body-view.js',
    'prefill-instance.js',
    '--write',
    '--merge',
    'check-instance-evidence.js',
    'expand-md.js',
    // The one instruction a judge can ignore with nothing looking wrong
    // afterwards: the merged ledger is identical whether the rows were parked
    // or retyped, and only the clock knows. A live run caught a judge
    // re-deriving 75 of 77 parked rows.
    'ONLY for the rules your brief contains',
  ]) {
    assert.match(prompt, new RegExp(mechanic.replace(/[.]/g, '\\.')), `workflow header dropped ${mechanic}`);
    assert.match(skill, new RegExp(mechanic.replace(/[.]/g, '\\.')), `eval-fire SKILL.md dropped ${mechanic}`);
  }
});

test('the contract file actually carries the mechanics both headers point at', () => {
  const contract = fs.readFileSync(
    path.join(__dirname, '..', '..', 'curriculum', 'evals', 'judges', '_dispatch-preamble.md'), 'utf8');
  assert.match(contract, /## Mechanics/);
  for (const s of ['derive-body-view.js', 'derive-class-brief.js', 'prefill-instance.js', '--merge', 'check-instance-evidence.js']) {
    assert.match(contract, new RegExp(s.replace(/[.]/g, '\\.')), `contract missing ${s}`);
  }
  // Pointing at a contract that still prescribes the meaningless grep would
  // reinstate the guard this work replaced.
  assert.doesNotMatch(contract, /run `grep -c '"evidence": \*null'` over the instances/);
});

test('template placeholders are bound, because this door does not substitute them', async () => {
  // The class templates were written for the skill door, which substitutes
  // {{file_path}} / {{trace_path}} / {{catalog_path}} before dispatch. This one
  // hands over the template PATH, so the judge reads literal braces. Harmless
  // for the file path; load-bearing for story and behavior, whose templates
  // tell the judge to read a sim-trace at {{trace_path}} and write it back.
  const behavior = await promptFor({});
  assert.match(behavior, /`\{\{file_path\}\}` → `curriculum\/exercises\/e\.md`/);
  assert.match(behavior, /`\{\{trace_path\}\}` → `curriculum\/evals\/sim-cache\/ae101--exercise--e\.behavior\.json`/);
  assert.match(behavior, /`\{\{catalog_path\}\}` → `curriculum\/evals\/simulation-behavior\.md`/);
});

test('a story judge gets the persona trace; a class without a trace gets no trace line', async () => {
  const seen = [];
  const capture = async (prompt, opts) => { seen.push({ prompt, label: opts.label || '' }); return cleanJudge(prompt, opts); };
  await run({ items: [
    { file: 'curriculum/lectures/l.md', instanceSlug: 'ae101--lecture--l', classes: ['story', 'writing'], detail: {}, pins: {}, driftRules: {} },
  ] }, capture);
  const story = seen.find((x) => x.label.startsWith('story:')).prompt;
  const writing = seen.find((x) => x.label.startsWith('writing:')).prompt;
  assert.match(story, /`\{\{trace_path\}\}` → `curriculum\/evals\/sim-cache\/ae101--lecture--l\.persona\.json`/);
  assert.doesNotMatch(story, /catalog_path/);
  assert.doesNotMatch(writing, /trace_path/);
});

test('no slug means no invented trace filename', async () => {
  const seen = [];
  const capture = async (prompt, opts) => { seen.push({ prompt, label: opts.label || '' }); return cleanJudge(prompt, opts); };
  await run({ items: [{ file: 'curriculum/lectures/l.md', classes: ['story'], detail: {}, pins: {}, driftRules: {} }] }, capture);
  const story = seen.find((x) => x.label.startsWith('story:')).prompt;
  assert.match(story, /no slug was supplied/);
  assert.doesNotMatch(story, /sim-cache\/undefined/);
});

test('the confirmation and cross-module doors carry the contract too', async () => {
  const seen = [];
  const capture = async (prompt, opts) => { seen.push({ prompt, label: opts.label || '' }); return cleanJudge(prompt, opts); };
  await run(ARGS, capture);
  const confirm = seen.find((x) => x.label.startsWith('confirm:')).prompt;
  const set = seen.find((x) => x.label.startsWith('cross_module:')).prompt;

  // A confirmation is a full class judgement, not a check of the one edited
  // line — the pass that missed the finding read the rest of the class too.
  assert.match(confirm, /_dispatch-preamble\.md/);
  assert.match(confirm, /derive-class-brief\.js/);
  assert.match(confirm, /You are READ-ONLY on the target file/);
  assert.match(confirm, /full class judgement, not a check of the one line/);

  // The set judge has no per-file brief, but it still owes the contract and it
  // still must not write the member files.
  assert.match(set, /_dispatch-preamble\.md/);
  assert.match(set, /You are READ-ONLY on the target file/);
  assert.match(set, /check_cross_module\.md/);
  assert.match(set, /body_sha` MAP/);
});

// `confirm` is a list of post-fix re-verification items, not a "yes, go ahead"
// flag. A caller reading the whenToUse — which documented `items` and `training`
// and never mentioned `confirm` — reaches for `confirm: true`, and the old
// failure was `TypeError: true is not iterable` thrown from the CANON loop:
// a stack trace pointing at slug validation for an argument that was never a
// slug. Fail on the shape, name the shape.
test('a scalar confirm is rejected by name, not as an iteration crash', async () => {
  await assert.rejects(
    () => run({ items: ARGS.items, confirm: true }, cleanJudge),
    /confirm.*array/i
  );
});

test('a scalar sets is rejected the same way', async () => {
  await assert.rejects(
    () => run({ items: ARGS.items, sets: true }, cleanJudge),
    /sets.*array/i
  );
});

// The complement: the documented shapes must still be accepted, so the guard
// cannot be satisfied by rejecting everything.
test('the documented confirm and sets shapes still run', async () => {
  const out = await run(ARGS, cleanJudge);
  assert.ok(out, 'documented arg shape should produce a result');
});
