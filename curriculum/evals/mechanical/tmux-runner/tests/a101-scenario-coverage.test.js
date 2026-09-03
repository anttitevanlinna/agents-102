#!/usr/bin/env node

const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { test } = require('node:test');
const { orderedKeys } = require('../../../../../scripts/validate-prompt-graph.js');
const { loadRegistry, registryForProfile } = require('../../../../../scripts/compile-prompts.js');

const RUNNER = path.resolve(__dirname, '..');
const SCENARIOS = path.join(RUNNER, 'scenarios');
const EXCLUSIONS = path.join(RUNNER, 'a101-scenario-exclusions.json');

function executedKeys() {
  const keys = new Set();
  for (const name of fs.readdirSync(SCENARIOS).filter((name) => /^a101-.*\.txt$/.test(name))) {
    for (const raw of fs.readFileSync(path.join(SCENARIOS, name), 'utf8').split(/\r?\n/)) {
      const line = raw.trim();
      if (!line || line.startsWith('#') || line.startsWith('*') || line.startsWith('@')) continue;
      keys.add(line.split(/\s+/)[0]);
    }
  }
  return keys;
}

test('A101 Codex CLI scenario chain covers every active prompt or exact allowed exclusion', () => {
  const compiled = loadRegistry();
  const active = registryForProfile(compiled, 'codex-cli');
  const ordered = [...new Set(orderedKeys('agents-101').map((entry) => entry.key))]
    .filter((key) => active[key]);
  const executed = executedKeys();
  const exclusions = JSON.parse(fs.readFileSync(EXCLUSIONS, 'utf8'));
  const seen = new Set();
  const exclusionKeys = new Set();

  for (const exclusion of exclusions) {
    assert.equal(typeof exclusion.key, 'string', 'exclusion key is required');
    assert.ok(['alternate-runtime', 'observation-only'].includes(exclusion.reason), `${exclusion.key}: invalid exclusion reason`);
    assert.ok(!seen.has(exclusion.key), `${exclusion.key}: duplicate exclusion`);
    seen.add(exclusion.key);
    exclusionKeys.add(exclusion.key);
    assert.ok(ordered.includes(exclusion.key), `${exclusion.key}: unused exclusion (not active in A101 codex-cli)`);
    assert.ok(!executed.has(exclusion.key), `${exclusion.key}: unused exclusion (already executed)`);
    assert.ok(!(active[exclusion.key].produces || []).length, `${exclusion.key}: producer prompts cannot be excluded`);
  }

  const missing = ordered.filter((key) => !executed.has(key) && !exclusionKeys.has(key));
  process.stdout.write(`A101 codex-cli scenario coverage: covered=${ordered.length - missing.length - exclusions.length} excluded=${exclusions.length} missing=${missing.length}\n`);
  if (missing.length) process.stdout.write(`missing: ${missing.join(', ')}\n`);
  assert.deepEqual(missing, []);
});
