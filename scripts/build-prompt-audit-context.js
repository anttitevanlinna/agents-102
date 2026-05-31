#!/usr/bin/env node
/*
 * Build the prompt-audit context bundle.
 *
 * For each prompt on a training's linear student path, capture the registry body
 * + frontmatter PLUS the surrounding curriculum context: the file that includes
 * it, the lead-in line that introduces it, its neighbouring prompts, and a text
 * window around the marker. This is the input for the rule-coverage audit.
 *
 * Why the context, not just the body: the CONTEXTUAL prompt rules can't be judged
 * from the body alone — they need neighbours and the prose that frames the prompt:
 *   §5  chain-by-back-reference     (does it reference the file an earlier prompt wrote?)
 *   §6  chained-prompt isolation    (does it leak the downstream pipeline?)
 *   §33 git-grep multi-result       (body callout AFTER the prompt is a legal shape)
 *   §34 in-fence binding            (is decision logic in the fence or stranded in body?)
 *   §38 body lead-in mirror         (does the lead-in rhyme with the prompt's opening?)
 *   §40 session boundary            (cold/warm — read the module body, not just frontmatter)
 *   §41 artifact-vs-STOP tail order
 *
 * Reuses the SAME linear walk the graph validator uses (site/layouts/curriculum.js
 * TRAININGS → prework + modules → exercise/lecture includes → {{prompt:<key>}}
 * markers, in order) so the audit sees exactly the sequence a student walks.
 *
 * Usage:
 *   node scripts/build-prompt-audit-context.js                      # AE101 → scratch json
 *   node scripts/build-prompt-audit-context.js --training agents-101
 *   node scripts/build-prompt-audit-context.js --out path.json
 *   node scripts/build-prompt-audit-context.js --json               # stdout, no file
 *
 * Exported for reuse: orderedKeys(trainingKey) returns the unique prompt keys in
 * linear order — lint-prompt-bodies.js uses it to scope a training.
 */

const fs = require('fs');
const path = require('path');
const { TRAININGS } = require('../site/layouts/curriculum.js');
const { loadRegistry } = require('./compile-prompts.js');

const ROOT = path.resolve(__dirname, '..');
const DEFAULT_TRAINING = 'agentic-engineering-101';
const INCLUDE_RE = /^\[([^\]]+)\]\(((?:exercises|lectures)\/[a-z0-9-]+)\.md\)[ \t]*$/gm;
const PROMPT_MARKER_RE = /^\{\{prompt:([a-z0-9-]+)\}\}[ \t]*$/gm;
const MAINTAINER_MARKER = '<!-- maintainer -->';
const WINDOW_BEFORE = 900;
const WINDOW_AFTER = 500;

function argValue(name, fallback) {
  const i = process.argv.indexOf(name);
  return i === -1 ? fallback : process.argv[i + 1];
}
function hasArg(name) {
  return process.argv.includes(name);
}
function rel(file) {
  return path.relative(ROOT, file);
}
function stripMaintainer(md) {
  const i = md.indexOf(MAINTAINER_MARKER);
  return i === -1 ? md : md.slice(0, i);
}
function resolveInclude(href) {
  return path.join(ROOT, 'curriculum', `${href}.md`);
}

// Walk one file, emitting prompt occurrences in document order. Include links
// and `{{prompt:<key>}}` markers are interleaved by character index, and includes
// recurse, so the returned order matches what a student walks through. Each
// occurrence carries the including file + the marker's char index so callers can
// extract the lead-in and surrounding window.
function collectOccurrences(file, seen, out) {
  if (!fs.existsSync(file)) return;
  if (seen.has(file)) return;
  seen.add(file);
  const md = stripMaintainer(fs.readFileSync(file, 'utf8'));

  const events = [];
  let m;
  INCLUDE_RE.lastIndex = 0;
  while ((m = INCLUDE_RE.exec(md)) !== null) {
    events.push({ index: m.index, kind: 'include', href: m[2] });
  }
  PROMPT_MARKER_RE.lastIndex = 0;
  while ((m = PROMPT_MARKER_RE.exec(md)) !== null) {
    events.push({ index: m.index, kind: 'prompt', key: m[1], markerLen: m[0].length });
  }
  events.sort((a, b) => a.index - b.index);

  for (const ev of events) {
    if (ev.kind === 'prompt') {
      out.push({ key: ev.key, file, md, index: ev.index, markerLen: ev.markerLen });
    } else {
      collectOccurrences(resolveInclude(ev.href), seen, out);
    }
  }
}

// All prompt occurrences for a training, in linear student order (with dupes).
function trainingOccurrences(trainingKey) {
  const training = TRAININGS[trainingKey];
  if (!training) throw new Error(`Training not found: ${trainingKey}`);
  const trainingDir = path.join(ROOT, 'curriculum', 'trainings', trainingKey);
  const out = [];
  const seen = new Set();
  if (training.prework) {
    collectOccurrences(path.join(trainingDir, `${training.prework.slug}.md`), seen, out);
  }
  for (const mod of training.modules) {
    collectOccurrences(path.join(trainingDir, `${mod.slug}.md`), seen, out);
  }
  return out;
}

// Unique prompt keys in first-occurrence order. Exported so the mechanical
// linter can scope itself to exactly one training's prompt set.
function orderedKeys(trainingKey) {
  const seenKey = new Set();
  const keys = [];
  for (const occ of trainingOccurrences(trainingKey)) {
    if (seenKey.has(occ.key)) continue;
    seenKey.add(occ.key);
    keys.push(occ.key);
  }
  return keys;
}

// The non-blank line immediately preceding the marker — the body lead-in (§2/§38).
function leadInBefore(md, index) {
  const before = md.slice(0, index);
  const lines = before.split('\n');
  // last element is the (partial) line the marker sits on; walk back for prose.
  for (let i = lines.length - 2; i >= 0; i--) {
    const t = lines[i].trim();
    if (t) return t;
  }
  return '';
}

function buildContext(trainingKey) {
  const registry = loadRegistry();
  const occurrences = trainingOccurrences(trainingKey);

  // Unique keys in order, plus all including files per key.
  const order = [];
  const seenKey = new Set();
  const includersByKey = new Map();
  const firstOccByKey = new Map();
  for (const occ of occurrences) {
    if (!includersByKey.has(occ.key)) includersByKey.set(occ.key, []);
    const relFile = rel(occ.file);
    if (!includersByKey.get(occ.key).includes(relFile)) includersByKey.get(occ.key).push(relFile);
    if (!seenKey.has(occ.key)) {
      seenKey.add(occ.key);
      order.push(occ.key);
      firstOccByKey.set(occ.key, occ);
    }
  }

  const prompts = order.map((key, i) => {
    const occ = firstOccByKey.get(key);
    const entry = registry[key];
    const md = occ.md;
    const ctxStart = Math.max(0, occ.index - WINDOW_BEFORE);
    const ctxEnd = Math.min(md.length, occ.index + occ.markerLen + WINDOW_AFTER);
    const base = {
      key,
      index: i,
      prevKey: i > 0 ? order[i - 1] : null,
      nextKey: i < order.length - 1 ? order[i + 1] : null,
      includingFile: rel(occ.file),
      includingFiles: includersByKey.get(key),
      leadIn: leadInBefore(md, occ.index),
      contextWindow: md.slice(ctxStart, ctxEnd),
    };
    if (!entry) {
      return { ...base, missing: true };
    }
    return {
      ...base,
      origin: entry.origin || '',
      dest: entry.dest || 'Claude Code',
      context: entry.context || '',
      runtime: entry.runtime || 'any',
      permissionMode: entry['permission-mode'] || null,
      requires: entry.requires || [],
      produces: entry.produces || [],
      body: entry.text || '',
    };
  });

  return {
    training: trainingKey,
    generatedFor: 'prompt-rule-coverage-audit',
    count: prompts.length,
    missingCount: prompts.filter((p) => p.missing).length,
    prompts,
  };
}

function main() {
  const trainingKey = argValue('--training', DEFAULT_TRAINING);
  const bundle = buildContext(trainingKey);

  if (hasArg('--json')) {
    process.stdout.write(JSON.stringify(bundle, null, 2) + '\n');
    return;
  }
  const outArg = argValue('--out', null);
  const out = outArg
    ? path.resolve(ROOT, outArg)
    : path.join(ROOT, 'curriculum/evals/scratch', `prompt-audit-context.${trainingKey}.json`);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify(bundle, null, 2) + '\n');
  console.log(`Prompt-audit context — ${trainingKey}`);
  console.log(`  ${bundle.count} prompts (${bundle.missingCount} missing registry entry)`);
  console.log(`  → ${rel(out)}`);
}

if (require.main === module) main();

module.exports = { buildContext, orderedKeys, trainingOccurrences };
