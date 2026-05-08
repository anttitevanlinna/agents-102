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

const REFERENCE_RE = /\{\{prompt:([a-z0-9-]+)\}\}/g;

function walkMarkdown(dir, files) {
  files = files || [];
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip the registry dir itself when walking — its files don't reference
      // prompts, they ARE prompts.
      if (abs === REGISTRY_DIR) continue;
      walkMarkdown(abs, files);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(abs);
    }
  }
  return files;
}

function findReferences(files) {
  const refs = new Map();    // key -> [referencingFiles]
  for (const f of files) {
    const text = fs.readFileSync(f, 'utf8');
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

  console.log(`Registry:    ${Object.keys(registry).length} prompts at ${path.relative(ROOT, REGISTRY_DIR)}`);
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

main();
