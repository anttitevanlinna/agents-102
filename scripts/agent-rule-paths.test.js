#!/usr/bin/env node
/*
 * Every repo-relative path an agent definition tells a subagent to READ must exist.
 *
 * Run: node --test scripts/agent-rule-paths.test.js
 *
 * Why this test exists. Five persona definitions (source-type-auditor,
 * zombie-stat-detector, freshness-checker, evidence-ladder-classifier,
 * research-pruner) each opened with "Read `.claude/rules/research-rules.md`".
 * That file has never existed. The canonical rules live at
 * `continuous-research/research-rules.md`, which `continuous-research/CLAUDE.md`
 * explicitly names as canonical and explicitly notes does NOT auto-load.
 *
 * The failure mode is quiet, which is what makes it worth a test. A subagent
 * told to read a missing file does not crash — it proceeds without the evidence
 * ladder and the source-type taxonomy, and still returns confident, well-formed
 * findings. One auditor found the right file by inference and said so; the
 * others may simply have worked from prior knowledge of the rules. A persona
 * whose rulebook silently failed to load is the exact instrument-that-cannot-
 * measure-the-fact shape from check_research_claims.md §14: the pass tells you
 * nothing, because a green result looks identical either way.
 *
 * Scope note: `.claude/` is gitignored, so on a fresh clone these files are
 * absent. The test skips rather than fails in that case — it guards the working
 * copy of whoever actually has the agents, which is where the bug can bite.
 */

const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const AGENTS_DIR = path.join(ROOT, '.claude', 'agents');

/* Backtick-quoted repo-relative paths that look like files we tell an agent to read. */
const PATH_RE = /`([A-Za-z0-9_.\-]+(?:\/[A-Za-z0-9_.\-]+)+\.(?:md|js|sh|json|yaml|yml))`/g;

/* Globs and wildcards are patterns, not paths; skip them. */
const isConcrete = p => !p.includes('*') && !p.includes('<') && !p.includes('{');

function agentFiles() {
  if (!fs.existsSync(AGENTS_DIR)) return [];
  return fs.readdirSync(AGENTS_DIR)
    .filter(f => f.endsWith('.md'))
    .map(f => path.join(AGENTS_DIR, f));
}

test('every concrete repo path cited in an agent definition exists', () => {
  const files = agentFiles();
  if (!files.length) return; // .claude/ is gitignored; nothing to guard here.

  const broken = [];
  for (const file of files) {
    const text = fs.readFileSync(file, 'utf8');
    for (const m of text.matchAll(PATH_RE)) {
      const rel = m[1];
      if (!isConcrete(rel)) continue;
      if (!fs.existsSync(path.join(ROOT, rel))) {
        broken.push(`${path.relative(ROOT, file)} → ${rel}`);
      }
    }
  }

  assert.deepEqual(
    broken, [],
    `Agent definitions cite paths that do not exist. A subagent told to read a ` +
    `missing rules file does not fail loudly — it answers anyway, without the rules:\n  ` +
    broken.join('\n  '),
  );
});

test('the canonical research-rules path is the one that exists', () => {
  /* Pins the specific confusion that caused this: two plausible homes, one real. */
  assert.equal(
    fs.existsSync(path.join(ROOT, 'continuous-research', 'research-rules.md')), true,
    'continuous-research/research-rules.md is canonical per continuous-research/CLAUDE.md',
  );
  assert.equal(
    fs.existsSync(path.join(ROOT, '.claude', 'rules', 'research-rules.md')), false,
    'if a rules file is ever added at .claude/rules/research-rules.md, the two copies ' +
    'will drift and the agents will read whichever one they were pointed at. Keep one home.',
  );
});
