#!/usr/bin/env node
// Compile curriculum/figures/*.md → site/figures.json (the registry served to
// the SPA at runtime). The build-workbook.js path inlines figures at build
// time using loadFigures() from this module directly; the SPA fetches the
// JSON file and runs the same expander client-side.
//
// Each figure is one .md file, no frontmatter: the file body IS the block the
// `{{figure:<key>}}` marker expands to — a single blank-line-free
// `<figure class="diagram">…</figure>` raw-HTML run. Key = filename without
// extension. The blank-line rule is load-bearing: marked terminates a
// raw-HTML block on any interior blank line, so a blank line inside the
// figure would split it into parsed-markdown fragments (same rule the inline
// engine SVG lived under before extraction).
//
// Usage:
//   node scripts/compile-figures.js          # write site/figures.json
//   const { loadFigures } = require('./compile-figures.js')  // build path

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const FIGURES_DIR = path.join(ROOT, 'curriculum/figures');
const OUT_FILE = path.join(ROOT, 'site/figures.json');

function loadFigures(figuresDir) {
  const dir = figuresDir || FIGURES_DIR;
  const registry = {};
  if (!fs.existsSync(dir)) return registry;

  for (const file of fs.readdirSync(dir).sort()) {
    if (!file.endsWith('.md')) continue;
    const key = file.replace(/\.md$/, '');
    if (!/^[a-z0-9-]+$/.test(key)) {
      throw new Error(`figure ${file}: key must be lowercase kebab-case`);
    }
    const body = fs.readFileSync(path.join(dir, file), 'utf8').trim();
    if (!/^<figure class="diagram">/.test(body) || !/<\/figure>$/.test(body)) {
      throw new Error(`figure ${file}: body must be a single <figure class="diagram">…</figure> block`);
    }
    if (/\n[ \t]*\n/.test(body)) {
      throw new Error(`figure ${file}: blank line inside the block — marked splits the raw-HTML run there`);
    }
    registry[key] = body;
  }
  return registry;
}

function writeFigures(registry, outFile) {
  fs.writeFileSync(outFile || OUT_FILE, JSON.stringify(registry));
}

if (require.main === module) {
  const registry = loadFigures();
  writeFigures(registry);
  console.log(`Compiled ${Object.keys(registry).length} figures → ${path.relative(ROOT, OUT_FILE)}`);
}

module.exports = { loadFigures, writeFigures, FIGURES_DIR, OUT_FILE };
