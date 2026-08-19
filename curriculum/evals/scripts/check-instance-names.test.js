#!/usr/bin/env node
'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { expectedName } = require('./check-instance-names.js');
const { linkFinder } = require('./scan-stale-classes.js');

// A throwaway repo with one AE101 reference page, one Agents 101 module, and a
// shared exercise that only Agents 101 links — the three shapes the derivation
// has to tell apart.
function fixture() {
  const repo = fs.mkdtempSync(path.join(os.tmpdir(), 'instnames-'));
  const mk = (rel, body = '# x\n') => {
    fs.mkdirSync(path.join(repo, path.dirname(rel)), { recursive: true });
    fs.writeFileSync(path.join(repo, rel), body);
  };
  mk('curriculum/trainings/agentic-engineering-101/reference/mcp-and-connectors.md');
  mk('curriculum/trainings/agents-101/getting-going.md', '# M1\n[Ex](exercises/eval-loop.md)\n');
  mk('curriculum/exercises/eval-loop.md');
  fs.mkdirSync(path.join(repo, 'curriculum/evals/instances'), { recursive: true });
  return repo;
}

function write(repo, base, obj) {
  fs.writeFileSync(path.join(repo, 'curriculum/evals/instances', base), JSON.stringify(obj));
}

test('surface type comes from the judged file path, not the basename', () => {
  const repo = fixture();
  write(repo, 'mcp-and-connectors.writing.json', {
    file: path.join(repo, 'curriculum/trainings/agentic-engineering-101/reference/mcp-and-connectors.md'),
  });
  const r = expectedName(repo, 'mcp-and-connectors.writing.json', linkFinder(repo));
  assert.equal(r.want, 'ae101--reference--mcp-and-connectors.writing.json');
});

test('a shared exercise is owned by the training that links it', () => {
  const repo = fixture();
  write(repo, 'eval-loop.behavior.json', { file: path.join(repo, 'curriculum/exercises/eval-loop.md') });
  const r = expectedName(repo, 'eval-loop.behavior.json', linkFinder(repo));
  assert.equal(r.want, 'agents-101--exercise--eval-loop.behavior.json');
});

// The 2026-08-12 mis-stamp: a judge wrote `training: ae101` onto an Agents 101
// exercise and named the file to match. The path wins over the stamp, and the
// disagreement is surfaced rather than silently corrected.
test('a wrong training prefix is corrected from the path, and the stamp reported', () => {
  const repo = fixture();
  write(repo, 'ae101--eval-loop.behavior.json', {
    training: 'ae101',
    file: path.join(repo, 'curriculum/exercises/eval-loop.md'),
  });
  const r = expectedName(repo, 'ae101--eval-loop.behavior.json', linkFinder(repo));
  assert.equal(r.want, 'agents-101--exercise--eval-loop.behavior.json');
  assert.equal(r.declared, 'ae101');
  assert.equal(r.training, 'agents-101');
});

test('a name already on the convention is left alone', () => {
  const repo = fixture();
  write(repo, 'agents-101--exercise--eval-loop.behavior.json', {
    file: path.join(repo, 'curriculum/exercises/eval-loop.md'),
  });
  const r = expectedName(repo, 'agents-101--exercise--eval-loop.behavior.json', linkFinder(repo));
  assert.equal(r.ok, true);
});

test('cross_module keeps set scope: module-set is inserted, never a surface type', () => {
  const repo = fixture();
  write(repo, 'ae101--m3-m4.cross_module.json', {});
  assert.equal(
    expectedName(repo, 'ae101--m3-m4.cross_module.json', linkFinder(repo)).want,
    'ae101--module-set--m3-m4.cross_module.json',
  );
  write(repo, 'ae101--module-set--m3-m4.cross_module.json', {});
  assert.equal(expectedName(repo, 'ae101--module-set--m3-m4.cross_module.json', linkFinder(repo)).ok, true);
});

// A gate that crashes on one bad file audits nothing. Every underivable case
// has to come back as a named skip.
test('undecidable instances are skipped with a reason, never guessed at', () => {
  const repo = fixture();
  write(repo, 'orphan.writing.json', { file: path.join(repo, 'curriculum/exercises/gone.md') });
  fs.writeFileSync(path.join(repo, 'curriculum/evals/instances/broken.writing.json'), '{not json');
  write(repo, 'nofile.writing.json', {});
  const find = linkFinder(repo);
  assert.match(expectedName(repo, 'orphan.writing.json', find).skip, /judged file is gone/);
  assert.match(expectedName(repo, 'broken.writing.json', find).skip, /unparseable/);
  assert.match(expectedName(repo, 'nofile.writing.json', find).skip, /`file` field/);
});
