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
//   permission-mode: plan       # optional; renders as a separate mode chip in
//                               # the prompt header. canonical Claude Code mode
//                               # tokens: default | acceptEdits | plan | auto |
//                               # bypassPermissions. omit when mode is not
//                               # load-bearing for the paste — no chip renders.
//   runtime: any                # any | cli | cowork | desktop (informational)
//   origin: agents-101/prework  # documentation-only; helps grep
//   requires:                   # optional; artefacts this prompt depends on
//     - id: <stable-id>
//       source: prompt:<key> | module:<slug> | scrollback (...) | external
//       conditional: <flag>     # optional, e.g. m3-completed
//   produces:                   # optional; artefacts this prompt creates
//     - id: <stable-id>
//       location: <path or scrollback>
//       consumed-by:            # optional, BEST-EFFORT forward index, NOT
//         - prompt:<key>        # authoritative and NOT validated. The canonical
//                               # dependency edge is the consumer's `requires:`
//                               # — validate-prompt-graph.js checks that. This
//                               # reverse list is a human reading aid that may
//                               # drift; don't rely on it for resolution.
//   opportunistic-copy:         # optional; uses-if-present, no-ops if absent
//     - id: <stable-id>
//       if-present-at: <path>
//       rationale: <one line>
//   anchors:                    # optional; future prompt-anatomy highlight metadata
//     - move: <move-name>
//       span: <quoted clause>
//   note: <one-liner>           # optional; informal carve-out / context
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
    const entry = {
      key: key,
      dest: meta.dest || 'Claude Code',
      context: meta.context || '',
      runtime: meta.runtime || 'any',
      origin: meta.origin || '',
      text: text
    };
    // Pass through metadata fields when present. Inert at the SPA layer today
    // (renderer uses dest/context/text only) but consumed by:
    //   - lint / audit scripts that walk the dependency graph
    //   - future prompt-anatomy highlight tooling (anchors)
    //   - downstream tooling that needs to find producers / consumers by id
    // Keep these optional; absence is normal for short / supplementary prompts.
    for (const field of ['requires', 'produces', 'opportunistic-copy', 'opportunistic-copy-by', 'anchors', 'note', 'permission-mode']) {
      if (meta[field] !== undefined) entry[field] = meta[field];
    }
    registry[key] = entry;
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

  // Gate the build on the prompt dependency graph. Compiling emits JSON but
  // says nothing about artefact ordering; run the validator as a sibling so a
  // premature-read / dangling-require can't pass the build. A child process
  // keeps the two modules decoupled (no require cycle) and propagates the exit
  // code. Scoped to AE101, the training whose graph is normalized; pass
  // --training to validate-prompt-graph.js directly to check others.
  const { execFileSync } = require('child_process');
  try {
    execFileSync(
      process.execPath,
      [path.join(__dirname, 'validate-prompt-graph.js'), '--training', 'agentic-engineering-101'],
      { stdio: 'inherit' }
    );
  } catch (e) {
    console.error('\nPrompt dependency-graph validation failed — see errors above. Build aborted.');
    process.exit(1);
  }
}

module.exports = { loadRegistry, writeRegistry, PROMPTS_DIR, OUT_FILE };
