const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const archive = path.join(root, 'agents-101-starter.tar.gz');

test('the universal Agents 101 starter ships one self-study skill to both runtime homes', () => {
  execFileSync(path.join(root, 'scripts/build-agents-101-starter-tarball.sh'), [], {
    cwd: root,
    stdio: 'pipe',
  });

  const entries = execFileSync('tar', ['tzf', archive], { encoding: 'utf8' })
    .split(/\r?\n/)
    .map((entry) => entry.replace(/^\.\//, ''));
  const claudePath = '.claude/skills/self-study/SKILL.md';
  const codexPath = '.agents/skills/self-study/SKILL.md';

  assert.ok(entries.includes(claudePath), `missing ${claudePath}`);
  assert.ok(entries.includes(codexPath), `missing ${codexPath}`);

  const claudeSkill = execFileSync('tar', ['xOzf', archive, `./${claudePath}`]);
  const codexSkill = execFileSync('tar', ['xOzf', archive, `./${codexPath}`]);
  assert.deepEqual(codexSkill, claudeSkill);
});
