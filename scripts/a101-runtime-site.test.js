#!/usr/bin/env node

const { test } = require('node:test');
const assert = require('node:assert/strict');

const R = require('../site/layouts/a101-runtimes.js');

test('runtime profiles expose the approved order and concrete artifact bindings', () => {
  assert.deepEqual(R.PROFILE_ORDER, [
    'cowork',
    'desktop',
    'cli',
    'codex-desktop',
    'codex-cli',
  ]);

  assert.equal(R.DEFAULT_PROFILE, 'cowork');
  assert.equal(R.PROFILES.cli.artifacts['root-instructions'], 'CLAUDE.md');
  assert.equal(R.PROFILES['codex-cli'].artifacts['root-instructions'], 'AGENTS.md');
  assert.equal(R.PROFILES.cli.artifacts['project-skills'], '.claude/skills');
  assert.equal(R.PROFILES['codex-cli'].artifacts['project-skills'], '.agents/skills');
});

test('runtime profiles carry the executable transport only on CLI surfaces', () => {
  assert.equal(R.PROFILES.cowork.transport, '');
  assert.equal(R.PROFILES.desktop.transport, '');
  assert.equal(R.PROFILES.cli.transport, 'claude-tmux');
  assert.equal(R.PROFILES['codex-desktop'].transport, '');
  assert.equal(R.PROFILES['codex-cli'].transport, 'codex-exec');
});

test('surface metadata activates equivalent Claude and Codex profiles', () => {
  assert.deepEqual(R.compatibleProfiles('any'), R.PROFILE_ORDER);
  assert.deepEqual(R.compatibleProfiles('desktop'), ['desktop', 'codex-desktop']);
  assert.deepEqual(R.compatibleProfiles('cli'), ['cli', 'codex-cli']);
  assert.deepEqual(R.compatibleProfiles('cowork'), ['cowork']);
});

test('unknown runtime metadata and profile keys fail closed', () => {
  assert.throws(
    () => R.compatibleProfiles('terminal'),
    /Unknown Agents 101 prompt runtime: terminal/
  );
  assert.throws(
    () => R.getProfile('codex-cowork'),
    /Unknown Agents 101 runtime profile: codex-cowork/
  );
});

test('profile records and nested runtime data are frozen', () => {
  assert.equal(Object.isFrozen(R.PROFILES), true);
  assert.equal(Object.isFrozen(R.PROFILES['codex-cli']), true);
  assert.equal(Object.isFrozen(R.PROFILES['codex-cli'].capabilities), true);
  assert.equal(Object.isFrozen(R.PROFILES['codex-cli'].artifacts), true);
});
