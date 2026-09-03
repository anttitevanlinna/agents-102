#!/usr/bin/env node
/*
 * Tests for validate-prompt-graph.js.
 *
 * Run: node --test scripts/validate-prompt-graph.test.js
 *
 * Regression focus: the validator hardcodes a list of body-readable artefact
 * primitives (BODY_PRIMITIVES), each keyed by a frontmatter id like
 * `memory-folder`. That id is the ONE graph reference the validator cannot
 * self-check through requires/produces linkage — it is the checker's own
 * config. If a rename touches every prompt's frontmatter id but misses this
 * list (or vice-versa), the validator silently looks for a ghost id and
 * mis-flags every body that reads the artefact. `findStalePrimitives` is the
 * guard: every BODY_PRIMITIVES id must appear as a real frontmatter id.
 */

const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');

const {
  findStalePrimitives,
  BODY_PRIMITIVES,
  orderedKeys,
  validate,
} = require('./validate-prompt-graph.js');
const { loadRegistry } = require('./compile-prompts.js');
const A101Runtimes = require('../site/layouts/a101-runtimes.js');

test('findStalePrimitives: id present in the graph → not stale', () => {
  const known = new Set(['memory-folder', 'claude-local-md']);
  const primitives = [{ id: 'memory-folder', label: '`./observations/` folder' }];
  assert.deepEqual(findStalePrimitives(primitives, known), []);
});

test('findStalePrimitives: id absent from the graph → flagged stale', () => {
  // Simulates a rename that updated every prompt frontmatter to
  // `observations-folder` but left BODY_PRIMITIVES pointing at `memory-folder`.
  const known = new Set(['observations-folder', 'claude-local-md']);
  const primitives = [{ id: 'memory-folder', label: '`./observations/` folder' }];
  const stale = findStalePrimitives(primitives, known);
  assert.equal(stale.length, 1);
  assert.equal(stale[0].id, 'memory-folder');
});

test('findStalePrimitives: catches the inverse partial rename too', () => {
  // BODY_PRIMITIVES renamed to `observations-folder` but the frontmatter
  // still says `memory-folder` everywhere.
  const known = new Set(['memory-folder', 'claude-local-md']);
  const primitives = [{ id: 'observations-folder', label: '`./observations/` folder' }];
  const stale = findStalePrimitives(primitives, known);
  assert.equal(stale.length, 1);
  assert.equal(stale[0].id, 'observations-folder');
});

test('findStalePrimitives: mixed list reports only the stale ones', () => {
  const known = new Set(['memory-folder']);
  const primitives = [
    { id: 'memory-folder', label: 'a' },
    { id: 'claude-local-md', label: 'b' },
  ];
  const stale = findStalePrimitives(primitives, known);
  assert.deepEqual(stale.map((p) => p.id), ['claude-local-md']);
});

test('logical artifact source follows whichever runtime prompt produces the identity', () => {
  const registry = {
    producer: {
      text: 'Write result.md.',
      produces: [{ id: 'shared-result', location: 'result.md' }],
    },
    consumer: {
      text: 'Read result.md.',
      requires: [{ id: 'shared-result', source: 'artifact:shared-result' }],
    },
  };
  const ordered = [{ key: 'producer' }, { key: 'consumer' }];

  const result = validate('agents-101', { registry, ordered, primitives: [] });

  assert.deepEqual(result.findings, []);
});

test('logical artifact source must name the required identity', () => {
  const registry = {
    producer: {
      text: 'Write result.md.',
      produces: [{ id: 'shared-result', location: 'result.md' }],
    },
    consumer: {
      text: 'Read result.md.',
      requires: [{ id: 'shared-result', source: 'artifact:different-result' }],
    },
  };
  const ordered = [{ key: 'producer' }, { key: 'consumer' }];

  const result = validate('agents-101', { registry, ordered, primitives: [] });

  assert.equal(result.findings.length, 1);
  assert.equal(result.findings[0].code, 'SOURCE-IDENTITY-MISMATCH');
});

test('live AE101 graph: every real BODY_PRIMITIVES id resolves (no CONFIG-STALE)', () => {
  // Guards against the self-check false-positiving on the shipping graph.
  const result = validate('agentic-engineering-101');
  const configStale = result.findings.filter((f) => f.code === 'CONFIG-STALE');
  assert.deepEqual(configStale, [], `unexpected CONFIG-STALE: ${JSON.stringify(configStale)}`);
  // And the real primitives are non-empty (the check is actually exercising something).
  assert.ok(BODY_PRIMITIVES.length >= 1);
});

test('live Agents 101 graph declares the load-bearing prompt handoffs', () => {
  const registry = loadRegistry();
  const edges = [
    ['personal-site-with-guardrails-2', 'm1-site', 'prompt:personal-site-with-guardrails-1'],
    ['name-your-challenge-2', 'challenge-md', 'prompt:name-your-challenge-1'],
    ['build-your-challenge-memory-3', 'challenge-sources', 'prompt:build-your-challenge-memory-2'],
    ['name-your-crux-2', 'crux-md', 'prompt:name-your-crux-1'],
    ['three-retrievers-one-curator-1', 'crux-md', 'prompt:name-your-crux-2'],
    ['author-security-skill-2', 'policy-report-raw', 'prompt:author-security-skill-1'],
    ['audit-your-agent-3', 'security-report', 'prompt:audit-your-agent-2'],
    ['hallucination-bakeoff-2', 'm5-briefing', 'prompt:hallucination-bakeoff-1'],
    ['hallucination-bakeoff-5', 'm5-detector-outputs', 'artifact:m5-detector-outputs'],
    ['eval-loop-2', 'generation-tactic', 'prompt:eval-loop-1'],
    ['share-your-work-3', 'm7-jtbd', 'artifact:m7-jtbd'],
    ['share-your-work-6', 'm7-assumptions', 'prompt:share-your-work-5'],
    ['joint-double-diamond-3', 'm8-sponsor-challenge', 'prompt:joint-double-diamond-1'],
    ['joint-double-diamond-8', 'm8-critiques', 'prompt:joint-double-diamond-7'],
  ];

  for (const [key, id, source] of edges) {
    const requires = Array.isArray(registry[key].requires) ? registry[key].requires : [];
    assert.ok(
      requires.some((edge) => edge.id === id && edge.source === source),
      `${key} must require ${id} from ${source}`
    );
  }
});

for (const profileKey of A101Runtimes.PROFILE_ORDER) {
  test(`live Agents 101 graph resolves for ${profileKey}`, () => {
    const registry = loadRegistry();
    const expectedActive = orderedKeys('agents-101').filter(({ key }) =>
      registry[key]?.runtimeVariants?.[profileKey]
    ).length;
    const result = validate('agents-101', { profileKey });
    assert.equal(result.profile, profileKey);
    assert.equal(result.orderCount, 93);
    assert.equal(result.activeCount, expectedActive);
    assert.equal(result.activeCount, 86);
    assert.deepEqual(
      result.findings.filter((finding) => finding.severity === 'error'),
      []
    );
  });
}

test('a required producer hidden on the selected surface is INACTIVE-PRODUCER', (t) => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'a101-graph-runtime-'));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  fs.writeFileSync(path.join(dir, 'desktop-producer.md'), `---
key: desktop-producer
runtime: desktop
produces:
  - id: shared-result
    location: ./result.md
---
Write the result.
`);
  fs.writeFileSync(path.join(dir, 'consumer.md'), `---
key: consumer
runtime: any
requires:
  - id: shared-result
    source: prompt:desktop-producer
---
Read the result.
`);

  const registry = loadRegistry(dir);
  const ordered = [
    { key: 'desktop-producer', file: 'fixture.md' },
    { key: 'consumer', file: 'fixture.md' },
  ];
  const cli = validate('fixture', {
    profileKey: 'codex-cli',
    registry,
    ordered,
    primitives: [],
  });
  assert.deepEqual(
    cli.findings.map((finding) => finding.code),
    ['INACTIVE-PRODUCER']
  );

  const desktop = validate('fixture', {
    profileKey: 'codex-desktop',
    registry,
    ordered,
    primitives: [],
  });
  assert.deepEqual(desktop.findings, []);
});
