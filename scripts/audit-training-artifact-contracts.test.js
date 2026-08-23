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
