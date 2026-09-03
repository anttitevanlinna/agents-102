const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const archive = path.join(root, 'agents-101-starter.tar.gz');

test('the standard Agents 101 starter does not install the optional self-study facilitator', () => {
  execFileSync(path.join(root, 'scripts/build-agents-101-starter-tarball.sh'), [], {
    cwd: root,
    stdio: 'pipe',
  });

  const entries = execFileSync('tar', ['tzf', archive], { encoding: 'utf8' })
    .split(/\r?\n/)
    .map((entry) => entry.replace(/^\.\//, ''));
  const claudePath = '.claude/skills/self-study/SKILL.md';
  const codexPath = '.agents/skills/self-study/SKILL.md';

  assert.equal(entries.includes(claudePath), false, `unexpected ${claudePath}`);
  assert.equal(entries.includes(codexPath), false, `unexpected ${codexPath}`);
});
