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

const {
  findStalePrimitives,
  BODY_PRIMITIVES,
  validate,
} = require('./validate-prompt-graph.js');

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

test('live AE101 graph: every real BODY_PRIMITIVES id resolves (no CONFIG-STALE)', () => {
  // Guards against the self-check false-positiving on the shipping graph.
  const result = validate('agentic-engineering-101');
  const configStale = result.findings.filter((f) => f.code === 'CONFIG-STALE');
  assert.deepEqual(configStale, [], `unexpected CONFIG-STALE: ${JSON.stringify(configStale)}`);
  // And the real primitives are non-empty (the check is actually exercising something).
  assert.ok(BODY_PRIMITIVES.length >= 1);
});
