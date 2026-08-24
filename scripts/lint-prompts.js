#!/usr/bin/env node
// Lint the prompt registry against the curriculum:
//   1. every {{prompt:key}} reference in curriculum/ resolves to a prompt file
//   2. every prompt file is referenced at least once (no orphans)
//   3. frontmatter is valid (loadRegistry already enforces shape)
//   4. no unresolved markers leak into the rendered HTML output
//      (checked separately by render-parity-check.sh)
//
// Exits 0 on success, 1 on any violation.

const fs = require('fs');
const path = require('path');
const { loadRegistry } = require('./compile-prompts.js');

const ROOT = path.resolve(__dirname, '..');
const CURRICULUM = path.join(ROOT, 'curriculum');
const REGISTRY_DIR = path.join(CURRICULUM, 'prompts');
// Eval reports quote markers verbatim as evidence (incl. retired ones); they
// are records, not rendered curriculum — never count them as references.
const EVALS_DIR = path.join(CURRICULUM, 'evals');
const APPROVALS_DIR = path.join(ROOT, '.claude', 'prompt-approvals');

// check_prompts.md §22(e): the card flow completes at marker-write, not at
// "approved". The marker is the durable approval record AND .githooks/pre-commit's
// only headless clear-path, so a missing one dead-ends the next body edit at a
// no-tty abort. `prompt-ok` is the rule's token — the bare word "approved" is not.
const APPROVAL_TOKEN = /prompt-ok/i;

function claimsApproval(entry) {
  return APPROVAL_TOKEN.test((entry && entry.note) || '');
}

// A frontmatter note asserting approval with no marker behind it. The converse is
// NOT a gap: the marker IS the record, and a note that simply omits the token
// claims nothing.
function approvalGaps(registry, markers) {
  return Object.keys(registry)
    .filter(k => claimsApproval(registry[k]) && !markers.has(k))
    .sort();
}

function readMarkers() {
  try {
    return new Set(fs.readdirSync(APPROVALS_DIR)
      .filter(f => f.endsWith('.confirmed'))
      .map(f => f.slice(0, -'.confirmed'.length)));
  } catch { return new Set(); }
}

// Both {{prompt:key}} and its cut-candidate sibling {{cut:key|reason}} count as
// a reference to `key` — a cut candidate is still "used", so it must not trip the
// orphan warning. Group 1 is the key; the optional cut `|reason` slug is ignored.
const REFERENCE_RE = /\{\{(?:prompt|cut):([a-z0-9-]+)(?:\|[a-z0-9-]+)?\}\}/g;

function walkMarkdown(dir, files) {
  files = files || [];
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip the registry dir itself when walking — its files don't reference
      // prompts, they ARE prompts. Skip eval records — they quote markers.
      if (abs === REGISTRY_DIR || abs === EVALS_DIR) continue;
      walkMarkdown(abs, files);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(abs);
    }
  }
  return files;
}

// A {{prompt:key}} marker inside an inline code span or fenced code block is a
// mention (maintainer narrative, eval reports), not an include — the renderer
// only expands bare markers. Strip code regions before scanning.
function stripCodeMentions(text) {
  return text
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`\n]*`/g, '');
}

function findReferences(files) {
  const refs = new Map();    // key -> [referencingFiles]
  for (const f of files) {
    const text = stripCodeMentions(fs.readFileSync(f, 'utf8'));
    let m;
    REFERENCE_RE.lastIndex = 0;
    while ((m = REFERENCE_RE.exec(text)) !== null) {
      const key = m[1];
      if (!refs.has(key)) refs.set(key, []);
      refs.get(key).push(path.relative(ROOT, f));
    }
  }
  return refs;
}

function main() {
  let registry;
  try {
    registry = loadRegistry();
  } catch (e) {
    console.error('FAIL: registry load error');
    console.error('  ' + e.message);
    process.exit(1);
  }

  const files = walkMarkdown(CURRICULUM);
  const refs = findReferences(files);

  const errors = [];
  const warnings = [];

  // 1. Every reference resolves.
  for (const [key, sites] of refs) {
    if (!registry[key]) {
      errors.push(`unresolved reference: {{prompt:${key}}}`);
      for (const s of sites) errors.push('  in ' + s);
    }
  }

  // 2. Every registry entry is referenced.
  for (const key of Object.keys(registry)) {
    if (!refs.has(key)) {
      warnings.push(`orphan registry entry: ${key}.md is not referenced anywhere in curriculum/`);
    }
  }

  // 3. A frontmatter note claiming approval owes its marker (§22e).
  const markers = readMarkers();
  for (const key of approvalGaps(registry, markers)) {
    errors.push(`approval claimed with no marker: ${key} — frontmatter says prompt-ok, .claude/prompt-approvals/${key}.confirmed does not exist`);
    errors.push('  the marker is the durable record and pre-commit\'s only headless clear-path (check_prompts.md §22e)');
    errors.push('  do NOT write it to clear this — it records the maintainer\'s decision; ask them to confirm');
  }

  console.log(`Registry:    ${Object.keys(registry).length} prompts at ${path.relative(ROOT, REGISTRY_DIR)}`);
  console.log(`Approvals:   ${markers.size} marker(s) at ${path.relative(ROOT, APPROVALS_DIR)}`);
  console.log(`References:  ${refs.size} unique keys across ${files.length} curriculum .md files`);

  if (warnings.length) {
    console.log('\nWARNINGS:');
    for (const w of warnings) console.log('  ' + w);
  }
  if (errors.length) {
    console.log('\nERRORS:');
    for (const e of errors) console.log('  ' + e);
    console.log('\nFAIL: ' + errors.filter(e => !e.startsWith('  ')).length + ' error(s)');
    process.exit(1);
  }
  console.log('\nPASS');
}

if (require.main === module) main();

module.exports = { stripCodeMentions, findReferences, walkMarkdown, claimsApproval, approvalGaps, readMarkers, REFERENCE_RE };
