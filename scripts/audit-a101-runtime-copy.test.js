const { test } = require('node:test');
const assert = require('node:assert/strict');

const {
  applyRuntimeVisibility,
  scanText,
} = require('./audit-a101-runtime-copy.js');

test('Codex copy audit classifies Claude-only paths, names, tools, and mechanics', () => {
  const text = [
    'Write CLAUDE.md.',
    'Install the package in .claude/skills/security-audit/.',
    'Open Claude Code and call AskUserQuestion.',
    'Hey Claude — revise the page.',
    'Spawn a Claude-only subagent.',
  ].join('\n');

  const findings = scanText(text, 'prompt', 'fixture', []);

  assert.deepEqual(
    findings.map(({ term, category }) => [term, category]),
    [
      ['CLAUDE.md', 'artifact-path'],
      ['.claude/skills', 'skill-path'],
      ['Claude Code', 'runtime-name'],
      ['AskUserQuestion', 'tool-name'],
      ['Hey Claude', 'runtime-name'],
      ['subagent', 'interaction-mechanic'],
    ]
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

test('an exact allowlist entry suppresses comparison prose and requires rationale', () => {
  const text = 'Unlike Claude Code, Codex uses a different instruction path.';
  const allowlist = [{
    surface: 'student-copy',
    keyOrFile: 'comparison.md',
    term: 'Claude Code',
    rationale: 'Intentional provider comparison in a runtime-neutral lecture.',
  }];

  assert.deepEqual(
    scanText(text, 'student-copy', 'comparison.md', allowlist),
    []
  );
  assert.throws(
    () => scanText(text, 'student-copy', 'comparison.md', [{
      surface: 'student-copy', keyOrFile: 'comparison.md', term: 'Claude Code', rationale: ''
    }]),
    /rationale/
  );
});
