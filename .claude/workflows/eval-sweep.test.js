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
