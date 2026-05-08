#!/usr/bin/env node
// Compile curriculum/prompts/*.md → site/prompts.json (the registry served to
// the SPA at runtime). The build-workbook.js path inlines prompts at build
// time using loadRegistry() from this module directly; the SPA fetches the
// JSON file and runs the same expander client-side.
//
// Each prompt is one .md file with frontmatter:
//   ---
//   key: a101-prework-extract-tarball
//   dest: Claude Code           # default; renders as destination chip label
//   context: optional           # optional, becomes em-paren note after dest
//   runtime: any                # any | cli | cowork | desktop (informational)
//   origin: agents-101/prework  # documentation-only; helps grep
//   ---
//   <prompt body — what the student copies>
//
// Usage:
//   node scripts/compile-prompts.js          # write site/prompts.json
//   const { loadRegistry } = require('./compile-prompts.js')  // build path

const fs = require('fs');
const path = require('path');
const fm = require('front-matter');

const ROOT = path.resolve(__dirname, '..');
const PROMPTS_DIR = path.join(ROOT, 'curriculum/prompts');
const OUT_FILE = path.join(ROOT, 'site/prompts.json');

function loadRegistry(promptsDir) {
  const dir = promptsDir || PROMPTS_DIR;
  const registry = {};
  if (!fs.existsSync(dir)) return registry;

  for (const file of fs.readdirSync(dir).sort()) {
    if (!file.endsWith('.md') || file === 'README.md') continue;
    const abs = path.join(dir, file);
    const raw = fs.readFileSync(abs, 'utf8');
    let parsed;
    try {
      parsed = fm(raw);
    } catch (e) {
      throw new Error(`${file}: frontmatter parse failed — ${e.message}`);
    }
    const meta = parsed.attributes || {};
    const key = meta.key;
    if (!key) throw new Error(`${file}: missing required frontmatter field 'key'`);
    if (registry[key]) throw new Error(`${file}: duplicate key '${key}' (also in another file)`);
    if (key !== file.replace(/\.md$/, '')) {
      throw new Error(`${file}: filename must match key (expected ${key}.md)`);
    }
    const text = parsed.body.replace(/^\n+/, '').replace(/\n+$/, '');
    if (!text) throw new Error(`${file}: prompt body is empty`);
    registry[key] = {
      key: key,
      dest: meta.dest || 'Claude Code',
      context: meta.context || '',
      runtime: meta.runtime || 'any',
      origin: meta.origin || '',
      text: text
    };
  }
  return registry;
}

function writeRegistry(registry, outFile) {
  const out = outFile || OUT_FILE;
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify(registry, null, 2) + '\n');
  return out;
}

if (require.main === module) {
  const registry = loadRegistry();
  const out = writeRegistry(registry);
  const count = Object.keys(registry).length;
  console.log(`Compiled ${count} prompts to ${path.relative(ROOT, out)}`);
}

module.exports = { loadRegistry, writeRegistry, PROMPTS_DIR, OUT_FILE };
