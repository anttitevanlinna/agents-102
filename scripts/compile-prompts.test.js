#!/usr/bin/env node

const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');

const compile = require('./compile-prompts.js');

function promptDir(files) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'a101-prompts-'));
  for (const [name, body] of Object.entries(files)) {
    fs.writeFileSync(path.join(dir, name + '.md'), body);
  }
  return dir;
}

function removeDir(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
}

test('artifact identities resolve in prompt text and nested metadata for every profile', (t) => {
  const dir = promptDir({
    'root-card': `---
key: root-card
runtime: any
produces:
  - id: root-instructions
    location: "./{{artifact:root-instructions}}"
---
Write ./{{artifact:root-instructions}}.
`,
  });
  t.after(() => removeDir(dir));

  const registry = compile.loadRegistry(dir);
  const entry = registry['root-card'];

  assert.equal(entry.text, 'Write ./CLAUDE.md.');
  assert.equal(entry.produces[0].location, './CLAUDE.md');
  assert.deepEqual(Object.keys(entry.runtimeVariants), [
    'cowork', 'desktop', 'cli', 'codex-desktop', 'codex-cli'
  ]);
  assert.equal(entry.runtimeVariants.cli.text, 'Write ./CLAUDE.md.');
  assert.equal(entry.runtimeVariants['codex-cli'].text, 'Write ./AGENTS.md.');
  assert.equal(
    entry.runtimeVariants['codex-desktop'].produces[0].location,
    './AGENTS.md'
  );
});

test('Agents 101 Module 2 debrief projects the root-instructions identity by runtime', () => {
  const registry = compile.loadRegistry();
  const prompt = registry['a101-m2-debrief-claude-md'];

  assert.equal(prompt.produces[0].id, 'root-instructions');
  assert.equal(prompt.runtimeVariants.cli.produces[0].location, './CLAUDE.md');
  assert.equal(prompt.runtimeVariants['codex-cli'].produces[0].location, './AGENTS.md');
  assert.match(
    prompt.runtimeVariants.cli.text,
    /write the first version of CLAUDE\.md at the training-directory root/
  );
  assert.match(
    prompt.runtimeVariants['codex-cli'].text,
    /write the first version of AGENTS\.md at the training-directory root/
  );
});

test('Agents 101 scheduled-agent styling updates the selected root instructions', () => {
  const registry = compile.loadRegistry();
  const prompt = registry['personal-agent-homework-1'];

  assert.ok(prompt.requires.some(({ id }) => id === 'root-instructions'));
  assert.ok(prompt.produces.some(({ id }) => id === 'root-instructions'));
  assert.match(prompt.runtimeVariants.cli.text, /root CLAUDE\.md/);
  assert.match(prompt.runtimeVariants['codex-cli'].text, /root AGENTS\.md/);
});

test('Agents 101 scheduled-agent run reads the selected root instructions', () => {
  const registry = compile.loadRegistry();
  const prompt = registry['personal-agent-homework-3'];

  assert.ok(prompt.requires.some(({ id }) => id === 'root-instructions'));
  assert.match(prompt.runtimeVariants.cli.text, /root CLAUDE\.md/);
  assert.match(prompt.runtimeVariants['codex-cli'].text, /root AGENTS\.md/);
});

test('capability blocks keep matching mechanics and remove non-matching mechanics', (t) => {
  const dir = promptDir({
    mechanics: `---
key: mechanics
runtime: any
---
Begin.
{{#capability:claude}}
Use Claude mechanics.
{{/capability:claude}}
{{#capability:codex}}
Use Codex mechanics.
{{/capability:codex}}
End.
`,
  });
  t.after(() => removeDir(dir));

  const registry = compile.loadRegistry(dir);
  const claude = registry.mechanics.runtimeVariants.cli.text;
  const codex = registry.mechanics.runtimeVariants['codex-cli'].text;

  assert.match(claude, /Use Claude mechanics\./);
  assert.doesNotMatch(claude, /Use Codex mechanics\./);
  assert.match(codex, /Use Codex mechanics\./);
  assert.doesNotMatch(codex, /Use Claude mechanics\./);
  assert.doesNotMatch(claude + codex, /\{\{[#/]capability:/);
});

test('surface-specific prompts compile only compatible Claude and Codex variants', (t) => {
  const dir = promptDir({
    'cli-card': `---
key: cli-card
runtime: cli
---
Write ./{{artifact:root-instructions}}.
`,
    'desktop-card': `---
key: desktop-card
runtime: desktop
---
Write ./{{artifact:root-instructions}}.
`,
  });
  t.after(() => removeDir(dir));

  const registry = compile.loadRegistry(dir);
  assert.deepEqual(Object.keys(registry['cli-card'].runtimeVariants), ['cli', 'codex-cli']);
  assert.deepEqual(
    Object.keys(registry['desktop-card'].runtimeVariants),
    ['desktop', 'codex-desktop']
  );
  assert.equal(registry['cli-card'].text, 'Write ./CLAUDE.md.');
  assert.equal(registry['desktop-card'].text, 'Write ./CLAUDE.md.');
});

test('registryForProfile projects compatible entries and omits inactive entries', (t) => {
  const dir = promptDir({
    all: `---
key: all
runtime: any
---
Read {{artifact:root-instructions}}.
`,
    onlycli: `---
key: onlycli
runtime: cli
---
CLI only.
`,
    onlydesktop: `---
key: onlydesktop
runtime: desktop
---
Desktop only.
`,
  });
  t.after(() => removeDir(dir));

  const projected = compile.registryForProfile(compile.loadRegistry(dir), 'codex-cli');
  assert.deepEqual(Object.keys(projected), ['all', 'onlycli']);
  assert.equal(projected.all.text, 'Read AGENTS.md.');
  assert.equal(projected.all.runtimeVariants, undefined);
});

for (const invalid of [
  {
    name: 'unknown artifact',
    body: 'Read {{artifact:missing-identity}}.',
    error: /unknown artifact identity 'missing-identity'/,
  },
  {
    name: 'unknown capability',
    body: '{{#capability:telepathy}}yes{{/capability:telepathy}}',
    error: /unknown capability 'telepathy'/,
  },
  {
    name: 'unclosed capability block',
    body: '{{#capability:codex}}yes',
    error: /unclosed capability block 'codex'/,
  },
  {
    name: 'unmatched capability close',
    body: 'yes{{/capability:codex}}',
    error: /unmatched capability close 'codex'/,
  },
  {
    name: 'nested capability blocks',
    body: '{{#capability:codex}}a{{#capability:cli}}b{{/capability:cli}}{{/capability:codex}}',
    error: /nested capability block 'cli'/,
  },
  {
    name: 'malformed unresolved expression',
    body: 'Read {{artifact:root-instructions.',
    error: /unresolved runtime expression/,
  },
]) {
  test(`${invalid.name} fails closed`, (t) => {
    const dir = promptDir({
      broken: `---
key: broken
runtime: any
---
${invalid.body}
`,
    });
    t.after(() => removeDir(dir));
    assert.throws(() => compile.loadRegistry(dir), invalid.error);
  });
}

test('logical artifact ids cannot contain runtime expressions', (t) => {
  const dir = promptDir({
    broken: `---
key: broken
runtime: any
produces:
  - id: "{{artifact:root-instructions}}"
    location: ./result.md
---
Write the result.
`,
  });
  t.after(() => removeDir(dir));
  assert.throws(
    () => compile.loadRegistry(dir),
    /runtime expressions are not allowed in logical id/
  );
});

test('compiler gates Agents 101 once per profile and AE101 once on its legacy path', () => {
  assert.deepEqual(compile.VALIDATION_TARGETS, [
    { training: 'agentic-engineering-101', profile: '' },
    { training: 'agents-101', profile: 'cowork' },
    { training: 'agents-101', profile: 'desktop' },
    { training: 'agents-101', profile: 'cli' },
    { training: 'agents-101', profile: 'codex-desktop' },
    { training: 'agents-101', profile: 'codex-cli' },
  ]);
});
