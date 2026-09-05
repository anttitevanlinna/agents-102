const { test } = require('node:test');
const assert = require('node:assert/strict');

const {
  applyRuntimeVisibility,
  audit,
  collectStudentFiles,
  scanText,
} = require('./audit-a101-runtime-copy.js');

test('Codex copy audit classifies Claude-only paths, names, tools, and mechanics', () => {
  const text = [
    'Write CLAUDE.md.',
    'Install the package in .claude/skills/security-audit/.',
    'Open Claude Code and call AskUserQuestion.',
    "Run searches through Claude's connector.",
    'Open this task in Cowork.',
    '/security-audit — load the skill',
    'Spawn a subagent.',
  ].join('\n');

  const findings = scanText(text, 'prompt', 'fixture', []);

  assert.deepEqual(
    findings.map(({ term, category }) => [term, category]),
    [
      ['CLAUDE.md', 'artifact-path'],
      ['.claude/skills', 'skill-path'],
      ['Claude', 'runtime-name'],
      ['AskUserQuestion', 'tool-name'],
      ["Claude's", 'runtime-name'],
      ['Cowork', 'runtime-name'],
      ['/security-audit', 'interaction-mechanic'],
    ]
  );
});

test('slash-command detection does not classify Agents 101 file paths', () => {
  const text = [
    'Open `~/Documents/agents-101/`.',
    'Read [the guide](trainings/agents-101/reference/runtime.md).',
    'Then use `/agents` to inspect helpers.',
  ].join('\n');

  const findings = scanText(text, 'student-copy', 'fixture.md', []);

  assert.deepEqual(
    findings.map(({ term, category }) => [term, category]),
    [['/agents', 'interaction-mechanic']]
  );
});

test('runtime visibility removes Cowork copy from Codex CLI scanning', () => {
  const source = [
    '<span class="rt-cowork">Open Claude Code and write CLAUDE.md.</span>',
    '<span class="rt-code">Continue in this session.</span>',
    '<div class="rt-desktop">Install Claude Code.</div>',
    '<div class="rt-cli">Use the command line.</div>',
  ].join('\n');

  const visible = applyRuntimeVisibility(source, 'codex-cli');
  const findings = scanText(visible, 'student-copy', 'fixture.md', []);

  assert.doesNotMatch(visible, /Open Claude Code|Install Claude Code/);
  assert.match(visible, /Continue in this session/);
  assert.match(visible, /Use the command line/);
  assert.deepEqual(findings, []);
});

test('student-copy collection follows linked Agents 101 supplementary and reference pages', () => {
  const files = collectStudentFiles().map((file) => file.replaceAll('\\', '/'));

  assert.ok(files.some((file) => file.endsWith(
    '/curriculum/trainings/agents-101/supplementary/what-is-an-agent.md'
  )));
  assert.ok(files.some((file) => file.endsWith(
    '/curriculum/trainings/agents-101/reference/claude-quick-reference.md'
  )));
});

test('an exact allowlist entry suppresses comparison prose and requires rationale', () => {
  const text = 'Unlike Claude Code, Codex uses a different instruction path.';
  const allowlist = [{
    surface: 'student-copy',
    keyOrFile: 'comparison.md',
    term: 'Claude',
    rationale: 'Intentional provider comparison in a runtime-neutral lecture.',
  }];

  assert.deepEqual(
    scanText(text, 'student-copy', 'comparison.md', allowlist),
    []
  );
  assert.throws(
    () => scanText(text, 'student-copy', 'comparison.md', [{
      surface: 'student-copy', keyOrFile: 'comparison.md', term: 'Claude', rationale: ''
    }]),
    /rationale/
  );
});

test('live Agents 101 student copy is runtime-clean for both Codex profiles', () => {
  for (const profile of ['codex-cli', 'codex-desktop']) {
    assert.deepEqual(audit(profile), [], `${profile} exposes Claude-only student copy`);
  }
});
