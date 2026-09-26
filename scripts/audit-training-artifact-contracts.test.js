const { test } = require('node:test');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');

test('Agents 101 audit does not attribute next-module prework to the current module', () => {
  const stdout = execFileSync(
    process.execPath,
    ['scripts/audit-training-artifact-contracts.js', '--training', 'agents-101', '--json'],
    { cwd: ROOT, encoding: 'utf8' }
  );
  const result = JSON.parse(stdout);

  assert.deepEqual(result.findings.uncontractedProducedMentions, []);
  assert.deepEqual(result.findings.consumerWithoutProducer, []);
});

// Registering a training is enough: the audit reads its modules and prework
// from the registry, with no per-script config to add.
test('every content-owning registry training audits without a per-script config', () => {
  const { TRAININGS } = require('../site/layouts/curriculum.js');
  for (const [key, t] of Object.entries(TRAININGS)) {
    if (t.contentKey) continue;
    const stdout = execFileSync(
      process.execPath,
      ['scripts/audit-training-artifact-contracts.js', '--training', key, '--json'],
      { cwd: ROOT, encoding: 'utf8' }
    );
    const result = JSON.parse(stdout);
    assert.equal(result.trainingTitle, t.label, key);
    assert.ok(result.modules.length > 0, `${key}: no modules scanned`);
  }
});
