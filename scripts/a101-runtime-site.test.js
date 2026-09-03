#!/usr/bin/env node

const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const R = require('../site/layouts/a101-runtimes.js');
const ROOT = path.resolve(__dirname, '..');

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
  assert.deepEqual(R.compatibleProfiles('code'), [
    'desktop', 'cli', 'codex-desktop', 'codex-cli'
  ]);
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

test('runtime switcher markup is generated from the approved profile order', () => {
  const html = R.renderSwitcherHtml();
  const keys = [...html.matchAll(/data-runtime="([^"]+)"/g)].map((match) => match[1]);
  assert.deepEqual(keys, R.PROFILE_ORDER);
  for (const key of R.PROFILE_ORDER) {
    assert.match(html, new RegExp(`>${R.PROFILES[key].label}<`));
  }
  assert.match(html, /Working with:/);
});

test('prompt expansion emits concrete runtime variants with exact profile wrappers', () => {
  const registry = {
    'root-card': {
      runtime: 'any',
      runtimeVariants: {
        cowork: { dest: 'Claude Code', text: 'Write ./CLAUDE.md.' },
        desktop: { dest: 'Claude Code', text: 'Write ./CLAUDE.md.' },
        cli: { dest: 'Claude Code', text: 'Write ./CLAUDE.md.' },
        'codex-desktop': { dest: 'Claude Code', text: 'Write ./AGENTS.md.' },
        'codex-cli': { dest: 'Claude Code', text: 'Write ./AGENTS.md.' },
      },
    },
  };
  const render = (entry, cut) =>
    `${entry.dest}|${entry.text}|${cut ? cut.reason : ''}`;

  const md = R.expandPrompts('{{prompt:root-card}}', registry, {
    strict: true,
    renderPromptBlock: render,
  });

  assert.equal((md.match(/class="rt-profile /g) || []).length, 5);
  assert.match(md, /rt-profile-cowork[^]*Cowork\|Write \.\/CLAUDE\.md\./);
  assert.match(md, /rt-profile-cli[^]*Claude Code CLI\|Write \.\/CLAUDE\.md\./);
  assert.match(md, /rt-profile-codex-desktop[^]*Codex Desktop\|Write \.\/AGENTS\.md\./);
  assert.match(md, /rt-profile-codex-cli[^]*Codex CLI\|Write \.\/AGENTS\.md\./);
  assert.doesNotMatch(md, /\{\{artifact:/);
});

test('surface-specific prompt expansion emits only compatible wrappers', () => {
  const registry = {
    'cli-card': {
      runtime: 'cli',
      runtimeVariants: {
        cli: { dest: 'Claude Code', text: 'Claude CLI.' },
        'codex-cli': { dest: 'Claude Code', text: 'Codex CLI.' },
      },
    },
  };
  const md = R.expandPrompts('{{prompt:cli-card}}', registry, {
    strict: true,
    renderPromptBlock: (entry) => entry.text,
  });
  assert.match(md, /rt-profile-cli/);
  assert.match(md, /rt-profile-codex-cli/);
  assert.doesNotMatch(md, /rt-profile-cowork|rt-profile-desktop|rt-profile-codex-desktop/);
});

test('cut markers preserve their reason for every generated profile block', () => {
  const registry = {
    cuttable: {
      runtime: 'cowork',
      runtimeVariants: { cowork: { dest: 'Claude Code', text: 'Cut me.' } },
    },
  };
  const md = R.expandPrompts('{{cut:cuttable|runtime-test}}', registry, {
    strict: true,
    renderPromptBlock: (entry, cut) => `${entry.text}|${cut.reason}`,
  });
  assert.match(md, /Cut me\.\|runtime-test/);
});

test('strict expansion rejects unknown keys and missing active variants', () => {
  assert.throws(
    () => R.expandPrompts('{{prompt:missing}}', {}, {
      strict: true,
      renderPromptBlock: () => '',
    }),
    /unresolved.*missing/
  );
  assert.throws(
    () => R.expandPrompts('{{prompt:broken}}', {
      broken: { runtime: 'cli', runtimeVariants: { cli: { text: 'only one' } } },
    }, {
      strict: true,
      renderPromptBlock: (entry) => entry.text,
    }),
    /missing variant.*codex-cli/
  );
});

test('Agents 101 runtime CSS selects one generated prompt profile', () => {
  const cssPath = path.join(ROOT, 'site/layouts/a101-runtimes.css');
  const css = fs.readFileSync(cssPath, 'utf8');
  for (const key of R.PROFILE_ORDER) {
    assert.match(css, new RegExp(`body\\.runtime-${key.replace('-', '\\-')}[^}]*\\.rt-profile-${key.replace('-', '\\-')}`));
  }
});

test('workbook and SPA select the extension only for Agents 101', () => {
  const buildSource = fs.readFileSync(path.join(ROOT, 'scripts/build-workbook.js'), 'utf8');
  const spaSource = fs.readFileSync(path.join(ROOT, 'site/layouts/curriculum-spa.js'), 'utf8');
  assert.match(buildSource, /promptExpanderFor[\s\S]+trainingKey === 'agents-101'/);
  assert.match(buildSource, /trainingKey === 'agents-101'[\s\S]+A101_RUNTIME_JS/);
  assert.match(spaSource, /trainingKey === 'agents-101'[\s\S]+A101Runtimes\.expandPrompts/);
});
