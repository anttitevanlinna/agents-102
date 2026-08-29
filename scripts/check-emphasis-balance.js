#!/usr/bin/env node
// check-emphasis-balance.js — catch unpaired `**` in student-facing body prose.
//
// An odd number of `**` on a line means one delimiter never closes. Markdown
// renders the survivor as literal asterisks, so the defect is invisible to every
// prose lint (the words are all correct) and shows up only on the page. Bulk
// edits that reposition emphasis are how it gets in: the pattern that matched
// most entries misses the one shaped differently.
//
// Scope is the BODY — everything above `<!-- maintainer -->`. Maintainer prose is
// not projected and uses `**` freely for structured field labels.
// Fenced code is skipped: `**` there is a glob or an operator, not emphasis.
//
// Usage:
//   node scripts/check-emphasis-balance.js                 # whole curriculum
//   node scripts/check-emphasis-balance.js --file <path>   # one file
// Exit 0 = balanced, 1 = at least one unpaired delimiter.

const fs = require('fs');
const path = require('path');

const MAINTAINER_CUT = '<!-- maintainer -->';

// Returns [{line, text}] for each body line carrying an odd count of `**`.
function scanText(src) {
  const out = [];
  let inFence = false;
  const lines = src.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith(MAINTAINER_CUT)) break;
    if (/^\s*```/.test(line)) { inFence = !inFence; continue; }
    if (inFence) continue;
    // Inline code spans hold globs (`**/*.ts`, `src/**/*`), not emphasis. Strip
    // them before counting or every glob in the reference page reads as a defect.
    const prose = line.replace(/`[^`]*`/g, '');
    const n = (prose.match(/\*\*/g) || []).length;
    if (n % 2 !== 0) out.push({ line: i + 1, text: line.trim() });
  }
  return out;
}

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (e.name.endsWith('.md')) acc.push(p);
  }
  return acc;
}

if (require.main === module) {
  const root = path.join(__dirname, '..');
  const argFile = process.argv.indexOf('--file');
  // Internal surfaces: a punch list and a gap log, never projected to a student.
  const SKIP = new Set(['pre-cohort-todos.md']);
  const files = argFile !== -1
    ? [path.resolve(process.argv[argFile + 1])]
    : ['curriculum/trainings', 'curriculum/lectures', 'curriculum/exercises']
        .map(d => path.join(root, d))
        .filter(fs.existsSync)
        .flatMap(d => walk(d))
        .filter(f => !SKIP.has(path.basename(f)));

  let bad = 0;
  for (const f of files) {
    for (const hit of scanText(fs.readFileSync(f, 'utf8'))) {
      bad++;
      console.log(`${path.relative(root, f)}:${hit.line}  unpaired **  ${hit.text.slice(0, 90)}`);
    }
  }
  console.log(bad === 0
    ? `OK — ${files.length} files, every ** delimiter pairs in body prose.`
    : `${bad} unpaired delimiter(s) across ${files.length} files.`);
  process.exit(bad === 0 ? 0 : 1);
}

module.exports = { scanText };
