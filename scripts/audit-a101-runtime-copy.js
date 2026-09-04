#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { TRAININGS } = require('../site/layouts/curriculum.js');
const A101Runtimes = require('../site/layouts/a101-runtimes.js');
const { loadRegistry, registryForProfile } = require('./compile-prompts.js');
const { orderedKeys } = require('./validate-prompt-graph.js');

const ROOT = path.resolve(__dirname, '..');
const TRAINING_KEY = 'agents-101';
const MAINTAINER_MARKER = '<!-- maintainer -->';
const INCLUDE_RE = /^\[[^\]]+\]\(((?:exercises|lectures)\/[a-z0-9-]+)\.md\)[ \t]*$/gm;

const RULES = Object.freeze([
  { regex: /CLAUDE\.md/g, category: 'artifact-path' },
  { regex: /\.claude\/skills/g, category: 'skill-path' },
  { regex: /Claude Code/g, category: 'runtime-name' },
  { regex: /Claude Desktop/g, category: 'runtime-name' },
  { regex: /\b(?:Hey|Hi) Claude\b/g, category: 'runtime-name' },
  { regex: /AskUserQuestion/g, category: 'tool-name' },
  { regex: /\bsubagents?\b/gi, category: 'interaction-mechanic' },
  { regex: /Install Claude Code/g, category: 'interaction-mechanic' },
  { regex: /Customize\s*(?:→|->)\s*Skills/g, category: 'interaction-mechanic' },
  { regex: /\/(?:agents|rename)\b/g, category: 'interaction-mechanic' },
  { regex: /\bplan mode\b/gi, category: 'interaction-mechanic' },
]);

// Intentional comparisons can be added here only with an exact surface,
// file/key, matched term, and a durable explanation. Keep this list narrow:
// it is an evidence record, not a regex escape hatch.
const DEFAULT_ALLOWLIST = Object.freeze([]);

function stripMaintainer(text) {
  const index = text.indexOf(MAINTAINER_MARKER);
  return index === -1 ? text : text.slice(0, index);
}

function blankExceptNewlines(text) {
  return text.replace(/[^\n]/g, ' ');
}

function activeRuntimeClasses(profileKey) {
  const profile = A101Runtimes.getProfile(profileKey);
  return new Set([
    `rt-${profile.family}`,
    `rt-${profile.surface}`,
    'rt-code',
    `rt-profile-${profileKey}`,
  ]);
}

function applyRuntimeVisibility(source, profileKey) {
  const active = activeRuntimeClasses(profileKey);
  const wrapper = /<(span|div)\b[^>]*class=(['"])([^'"]*\brt-[^'"]*)\2[^>]*>([\s\S]*?)<\/\1>/gi;
  let visible = stripMaintainer(source);
  let previous;
  do {
    previous = visible;
    visible = visible.replace(wrapper, (whole, _tag, _quote, classNames, body) => {
      const runtimeClasses = classNames.split(/\s+/).filter((name) => name.startsWith('rt-'));
      const show = runtimeClasses.every((name) => active.has(name));
      return show ? body : blankExceptNewlines(whole);
    });
  } while (visible !== previous && wrapper.test(visible));
  wrapper.lastIndex = 0;
  return visible;
}

function validateAllowlist(allowlist) {
  for (const entry of allowlist) {
    if (!entry || !entry.surface || !entry.keyOrFile || !entry.term || !entry.rationale) {
      throw new Error('Every runtime-copy allowlist entry requires surface, keyOrFile, term, and rationale');
    }
  }
}

function scanText(text, surface, keyOrFile, allowlist = DEFAULT_ALLOWLIST) {
  validateAllowlist(allowlist);
  const findings = [];
  const lines = String(text).split('\n');
  for (let index = 0; index < lines.length; index += 1) {
    const lineText = lines[index];
    for (const rule of RULES) {
      rule.regex.lastIndex = 0;
      let match;
      while ((match = rule.regex.exec(lineText)) !== null) {
        const finding = {
          surface,
          keyOrFile,
          term: match[0],
          line: index + 1,
          category: rule.category,
        };
        const allowed = allowlist.some((entry) =>
          entry.surface === finding.surface &&
          entry.keyOrFile === finding.keyOrFile &&
          entry.term === finding.term
        );
        if (!allowed) findings.push(finding);
        if (match[0].length === 0) rule.regex.lastIndex += 1;
      }
    }
  }
  return findings;
}

function rel(file) {
  return path.relative(ROOT, file);
}

function collectStudentFiles() {
  const training = TRAININGS[TRAINING_KEY];
  const trainingDir = path.join(ROOT, 'curriculum', 'trainings', TRAINING_KEY);
  const queue = [];
  if (training.prework) queue.push(path.join(trainingDir, `${training.prework.slug}.md`));
  for (const module of training.modules) {
    queue.push(path.join(trainingDir, `${module.slug}.md`));
  }

  const files = [];
  const seen = new Set();
  while (queue.length) {
    const file = queue.shift();
    if (seen.has(file) || !fs.existsSync(file)) continue;
    seen.add(file);
    files.push(file);
    const text = stripMaintainer(fs.readFileSync(file, 'utf8'));
    INCLUDE_RE.lastIndex = 0;
    let match;
    while ((match = INCLUDE_RE.exec(text)) !== null) {
      queue.push(path.join(ROOT, 'curriculum', `${match[1]}.md`));
    }
  }
  return files;
}

function audit(profileKey, options = {}) {
  const profile = A101Runtimes.getProfile(profileKey);
  if (profile.family !== 'codex') {
    throw new Error(`Runtime-copy audit requires a Codex profile, received '${profileKey}'`);
  }
  const allowlist = options.allowlist || DEFAULT_ALLOWLIST;
  validateAllowlist(allowlist);
  const compiled = options.registry || loadRegistry();
  const selected = registryForProfile(compiled, profileKey);
  const findings = [];
  const seenPrompts = new Set();

  for (const { key } of orderedKeys(TRAINING_KEY)) {
    if (seenPrompts.has(key) || !selected[key]) continue;
    seenPrompts.add(key);
    findings.push(...scanText(selected[key].text || '', 'prompt', key, allowlist));
  }

  const files = options.files || collectStudentFiles();
  for (const file of files) {
    const visible = applyRuntimeVisibility(fs.readFileSync(file, 'utf8'), profileKey);
    findings.push(...scanText(visible, 'student-copy', rel(file), allowlist));
  }
  return findings;
}

function argValue(name, fallback = '') {
  const index = process.argv.indexOf(name);
  return index === -1 ? fallback : process.argv[index + 1];
}

function main() {
  const profileKey = argValue('--runtime');
  if (!['codex-cli', 'codex-desktop'].includes(profileKey)) {
    console.error('usage: node scripts/audit-a101-runtime-copy.js --runtime codex-cli|codex-desktop [--json]');
    process.exit(2);
  }
  const findings = audit(profileKey);
  if (process.argv.includes('--json')) {
    process.stdout.write(`${JSON.stringify(findings, null, 2)}\n`);
  } else if (findings.length === 0) {
    console.log(`Agents 101 runtime-copy audit — ${profileKey}: no findings`);
  } else {
    console.log(`Agents 101 runtime-copy audit — ${profileKey}: ${findings.length} finding(s)`);
    for (const finding of findings) {
      console.log(`  ${finding.surface} ${finding.keyOrFile}:${finding.line} [${finding.category}] ${finding.term}`);
    }
  }
  process.exit(findings.length === 0 ? 0 : 1);
}

if (require.main === module) main();

module.exports = {
  DEFAULT_ALLOWLIST,
  RULES,
  applyRuntimeVisibility,
  audit,
  collectStudentFiles,
  scanText,
  stripMaintainer,
};
