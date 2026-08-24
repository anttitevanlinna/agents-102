#!/usr/bin/env node
'use strict';
// check-workflow-scripts.js — parse every `.claude/workflows/*.js` the way the
// Workflow runtime does, before a launch pays to find out.
//
// A workflow script is neither CommonJS nor a real module: it carries
// `export const meta`, top-level `await`, and a top-level `return`. The runtime
// wraps the body in an async function and hands it agent/parallel/pipeline/log/
// phase/args/budget/workflow. Nothing in the standard toolchain reads that shape:
//
//   node --check   — sees `export`, switches to a lax mode, and exits 0 on a body
//                    containing `const = ((;`. Verified on v24.5.0. A check that
//                    passes a planted break is worse than no check.
//   import()       — rejects the top-level `return` as "Illegal return statement",
//                    so a healthy script and a broken one fail identically.
//
// So: strip the `export ` prefix and build an AsyncFunction with the runtime's
// parameter list. That parse accepts exactly what the runtime accepts.
//
// Also checks the `meta` block, which must be a pure literal with `name` and
// `description` — the permission dialog renders it before anything runs, so a
// computed value there is a dialog that cannot say what it is about to do.
//
// Usage:
//   node scripts/check-workflow-scripts.js          # gate, exit 1 on any failure
//   node scripts/check-workflow-scripts.js --file <path>...

const fs = require('node:fs');
const path = require('node:path');

const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
const RUNTIME_GLOBALS = ['agent', 'parallel', 'pipeline', 'log', 'phase', 'args', 'budget', 'workflow'];

// Returns null when the body parses, else the SyntaxError message.
function parseAsRuntimeWould(body) {
  const src = String(body).replace(/^export\s+(const\s+meta)/m, '$1');
  try {
    new AsyncFunction(...RUNTIME_GLOBALS, src);
    return null;
  } catch (e) {
    return `${e.constructor.name}: ${e.message}`;
  }
}

// Returns null when meta is acceptable, else a one-line reason.
function checkMeta(body) {
  const m = /^export\s+const\s+meta\s*=\s*\{/m.exec(body);
  if (!m) return 'no `export const meta` — the runtime requires one';
  // Read the object literal by brace balance from the opening `{`.
  const start = body.indexOf('{', m.index);
  let depth = 0;
  let end = -1;
  for (let i = start; i < body.length; i++) {
    if (body[i] === '{') depth++;
    else if (body[i] === '}' && --depth === 0) {
      end = i;
      break;
    }
  }
  if (end === -1) return 'the meta literal never closes';
  const lit = body.slice(start, end + 1);
  // Present-but-computed is diagnosed before absent: a field whose value is an
  // identifier IS there, and reporting it as missing sends the author looking
  // for the wrong thing.
  const computed = /(^|[{,\s])(name|description|whenToUse)\s*:\s*(?!['"`])[A-Za-z_$][\w$]*/.exec(lit);
  if (computed) return `meta.${computed[2]} is not a literal — the permission dialog renders it before anything runs`;
  for (const field of ['name', 'description']) {
    const f = new RegExp(`(^|[{,\\s])${field}\\s*:\\s*(['"\`])`).exec(lit);
    if (!f) return `meta is missing a string \`${field}\``;
  }
  if (/\.\.\./.test(lit)) return 'meta must be a pure literal — no spreads';
  return null;
}

function collect(fileArgs = []) {
  const repo = path.resolve(__dirname, '..');
  let files;
  if (fileArgs.length) {
    files = fileArgs.map((f) => (path.isAbsolute(f) ? f : path.join(repo, f)));
  } else {
    const dir = path.join(repo, '.claude/workflows');
    // `*.test.js` in this directory tests the workflows; it is not one. Running
    // the runtime parse over a CommonJS test file fails on syntax the runtime
    // would never see, which is a red that says nothing about any workflow.
    files = fs.existsSync(dir)
      ? fs
          .readdirSync(dir)
          .filter((f) => f.endsWith('.js') && !f.endsWith('.test.js'))
          .map((f) => path.join(dir, f))
      : [];
  }
  return files.map((f) => ({ file: path.relative(repo, f), body: fs.readFileSync(f, 'utf8') }));
}

if (require.main === module) {
  const argv = process.argv.slice(2);
  const fileArgs = [];
  for (let i = 0; i < argv.length; i++) if (argv[i] === '--file') fileArgs.push(argv[++i]);
  const docs = collect(fileArgs);
  let bad = 0;
  for (const d of docs) {
    const syntax = parseAsRuntimeWould(d.body);
    const meta = syntax ? null : checkMeta(d.body);
    if (syntax || meta) {
      bad++;
      console.log(`FAIL ${d.file}`);
      console.log(`      ${syntax || meta}`);
    }
  }
  console.log(`${docs.length} workflow script${docs.length === 1 ? '' : 's'} · ${bad} failing`);
  process.exit(bad ? 1 : 0);
}

module.exports = { parseAsRuntimeWould, checkMeta, collect, RUNTIME_GLOBALS };
