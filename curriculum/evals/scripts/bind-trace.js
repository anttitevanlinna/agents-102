#!/usr/bin/env node
'use strict';
// bind-trace.js — bind a persisted sim trace to the body its judge read.
//
//   node curriculum/evals/scripts/bind-trace.js <trace.json> <target.md>
//
// A story (persona) or behavior trace is evidence about one version of its
// target file, and `content_sha` says which. Judges computing that hash by hand
// wrote hashes that were not the file's; binding it in the stamper instead
// marked a trace fresh even when the judge had regenerated it only in memory
// and left the tracked file stale. So the judge persists the trace, then runs
// this: the hash is computed here, and running it is the judge's statement that
// the file on disk is the trace for this read. update-quality.sh refuses a
// story/behavior stamp whose trace is not bound to the body the verdict names.
const fs = require('node:fs');
const crypto = require('node:crypto');

function bind(tracePath, targetPath) {
  const text = fs.readFileSync(tracePath, 'utf8');
  const trace = JSON.parse(text); // a trace that does not parse is not evidence
  if (trace === null || typeof trace !== 'object' || Array.isArray(trace)) {
    throw new Error(`${tracePath}: not a trace object`);
  }
  const sha = crypto.createHash('sha256').update(fs.readFileSync(targetPath)).digest('hex');
  const next = /"content_sha"\s*:\s*"[^"]*"/.test(text)
    ? text.replace(/("content_sha"\s*:\s*")[^"]*(")/, `$1${sha}$2`)
    : JSON.stringify({ content_sha: sha, ...trace }, null, 2) + '\n';
  if (next !== text) fs.writeFileSync(tracePath, next);
  return sha;
}

if (require.main === module) {
  const [trace, target] = process.argv.slice(2);
  if (!trace || !target) {
    process.stderr.write('usage: bind-trace.js <trace.json> <target.md>\n');
    process.exit(2);
  }
  try {
    const sha = bind(trace, target);
    process.stdout.write(`bound ${trace} -> ${sha}\n`);
  } catch (e) {
    process.stderr.write(`bind-trace: ${e.message}\n`);
    process.exit(1);
  }
}

module.exports = { bind };
