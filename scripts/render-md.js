#!/usr/bin/env node
// Print a curriculum .md file as judges should audit it: top-level
// maintainer block preserved (judges read artefact contracts, Quality,
// push-back moves from it), standalone-paragraph include links resolved
// recursively (each included file's own maintainer stripped — students
// don't see it inlined), and all `{{prompt:<key>}}` markers expanded.
//
// Companion to expand-md.js. The two scripts have different scope:
//   expand-md.js  — single file, prompt-marker expansion. Used by the
//                   mechanical harness (parse-prompts.sh) and per-exercise
//                   judges that audit one file at a time.
//   render-md.js  — full module page as the cohort experiences it. Used
//                   by any judge auditing a module file; thin module
//                   pages link to exercises where the actual prompts
//                   live, and a judge that only reads the bare file
//                   audits zero prompts.
//
// Usage:
//   node scripts/render-md.js <path.md>
//   cat <path.md> | node scripts/render-md.js -    # read from stdin (top file)
//   node scripts/render-md.js --list-includes <path.md>
//     # Instead of rendering, print one absolute path per line for every
//     # exercise/lecture transitively included from <path.md>. Used by the
//     # curriculum-pre-ship-audit skill to expand a module-file audit set
//     # into the linked exercises and lectures, so each one gets its own
//     # per-file judge run.

const fs = require('fs');
const path = require('path');
const CR = require(path.join(__dirname, '..', 'site/layouts/curriculum.js'));
const { loadRegistry } = require(path.join(__dirname, 'compile-prompts.js'));

const ROOT = path.join(__dirname, '..');
const REGISTRY = loadRegistry();

// INCLUDE_LINK_RE is /gm with one match per standalone-paragraph line.
// Captures: [1] = link title, [2] = `exercises/<slug>` or `lectures/<slug>`.
function inlineIncludes(md, seen) {
  seen = seen || new Set();
  return md.replace(CR.INCLUDE_LINK_RE, function (full, title, kindSlug) {
    const parts = kindSlug.split('/');
    const kind = parts[0];
    const slug = parts[1];
    const incPath = path.join(ROOT, 'curriculum', kind, slug + '.md');
    if (!fs.existsSync(incPath)) return full; // dead link — pass through
    const key = kind + '/' + slug;
    if (seen.has(key)) return full; // cycle guard
    const next = new Set(seen);
    next.add(key);
    const raw = fs.readFileSync(incPath, 'utf8');
    const stripped = CR.stripMaintainerTail(raw);
    const expanded = CR.expandPrompts(stripped, REGISTRY);
    const inlined = inlineIncludes(expanded, next);
    return '\n\n<!--INC:' + kind + ':' + slug + ':' + CR.esc(title) + '-->\n\n'
      + inlined
      + '\n\n<!--/INC-->\n\n';
  });
}

const args = process.argv.slice(2);
const listMode = args[0] === '--list-includes';
const arg = listMode ? args[1] : args[0];
if (!arg) {
  console.error('Usage: render-md.js [--list-includes] <path.md> | -');
  process.exit(1);
}

if (listMode) {
  if (arg === '-') {
    console.error('render-md.js --list-includes requires a path argument (stdin not supported in list mode).');
    process.exit(1);
  }
  const found = [];
  const seen = new Set();
  function collect(filePath) {
    if (!fs.existsSync(filePath)) return;
    const raw = fs.readFileSync(filePath, 'utf8');
    const body = CR.stripMaintainerTail(raw);
    // INCLUDE_LINK_RE is /gm — use matchAll for non-mutating iteration.
    for (const m of body.matchAll(CR.INCLUDE_LINK_RE)) {
      const kindSlug = m[2];
      const parts = kindSlug.split('/');
      const incPath = path.join(ROOT, 'curriculum', parts[0], parts[1] + '.md');
      const key = parts[0] + '/' + parts[1];
      if (seen.has(key)) continue;
      seen.add(key);
      if (fs.existsSync(incPath)) {
        found.push(incPath);
        collect(incPath); // recurse — exercises can link lectures and vice versa
      }
    }
  }
  collect(arg);
  found.forEach(p => process.stdout.write(p + '\n'));
  process.exit(0);
}

const raw = arg === '-' ? fs.readFileSync(0, 'utf8') : fs.readFileSync(arg, 'utf8');

// Split at first maintainer marker. Body half: inline includes + expand
// prompts. Maintainer half: pass through untouched (judges need the
// original lines + their numbers for evidence quotes).
const MAINTAINER_MARKER = '<!-- maintainer -->';
const idx = raw.indexOf(MAINTAINER_MARKER);

let body, tail;
if (idx >= 0) {
  body = raw.slice(0, idx);
  tail = raw.slice(idx); // includes the marker line itself
} else {
  body = raw;
  tail = '';
}

const inlined = inlineIncludes(body);
const expanded = CR.expandPrompts(inlined, REGISTRY);

process.stdout.write(expanded + tail);
