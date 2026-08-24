#!/usr/bin/env node
'use strict';
// check-ui-labels.js — flag an internal slug standing where an on-screen label
// belongs.
//
// A trainer reading "pick keep-planning-with-feedback" out loud names a menu
// option no student can see; the screen says "No, keep planning". The slug is
// real — it is the `<!-- backing -->` detail-tag id for that fact — but an id is
// how WE address a claim, not what the product calls a button.
//
// Why a checker and not another sweep: this exact line survived b4ebe6df, which
// fixed the same fault 46 lines up. That pass matched the prose spelling
// ("keep planning with feedback") and never saw the hyphenated one. A corrective
// grep is shaped like the string it was written against; the defect is shaped
// like the POSITION. So match the position.
//
// What counts as a violation: an un-backticked lowercase slug of three or more
// hyphen-joined segments, immediately after a verb that names an on-screen
// affordance (pick / choose / select / click / press / hit / tap / toggle), in
// prose. All four constraints carry weight:
//
//   - three segments, because two-segment hyphenations are ordinary English and
//     ordinary labels ("Yes, auto-accept edits" is a live menu row);
//   - un-backticked, because backticks already tell the reader "identifier, not
//     speech" — `claude-code-guide` in a sentence is honest, the same token bare
//     inside quoted trainer speech is not;
//   - affordance verbs only. `via` is a mechanism word ("audit via
//     curriculum-pre-ship-audit") and reports under --report without gating;
//   - prose only — fenced and indented code are where slugs belong.
//
// How a match clears: the file's own maintainer block attests it, scoped to the
// one slug so the check keeps biting elsewhere in the same file.
//
//     **UI label accepted:** "<slug>" — <reason>
//
// Usage:
//   node curriculum/evals/scripts/check-ui-labels.js            # gate, exit 1 on violation
//   node curriculum/evals/scripts/check-ui-labels.js --report   # include the non-gating `via` lane
//   node curriculum/evals/scripts/check-ui-labels.js --file <path>...

const fs = require('node:fs');
const path = require('node:path');

const GATING_VERBS = ['pick', 'choose', 'select', 'click', 'press', 'hit', 'tap', 'toggle'];
const REPORT_ONLY_VERBS = ['via'];
const SLUG = '[a-z][a-z0-9]*(?:-[a-z0-9]+){2,}';
const SKIP_DIRS = new Set(['node_modules', '.git', 'sim-cache', 'sim-cache-legacy', 'instances']);

function verbRe(verbs) {
  // (verb)(space)(optional emphasis)(slug) — emphasis must close symmetrically,
  // and the slug must not run on into a longer token.
  return new RegExp(`\\b(${verbs.join('|')})\\s+(\\*{0,2})(${SLUG})\\2(?![a-z0-9\`-])`, 'g');
}

// Lines that are code, not prose: fenced blocks and 4-space-indented blocks.
function proseMask(lines) {
  const mask = new Array(lines.length).fill(true);
  let fenced = false;
  lines.forEach((ln, i) => {
    if (/^\s{0,3}(```|~~~)/.test(ln)) {
      fenced = !fenced;
      mask[i] = false;
      return;
    }
    if (fenced || /^(\t| {4,})\S/.test(ln)) mask[i] = false;
  });
  return mask;
}

function acceptedSlugs(body) {
  const out = new Set();
  const re = /\*\*UI label accepted:\*\*\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(body))) out.add(m[1]);
  return out;
}

// A slug already inside backticks earlier on the line is an identifier the
// author marked as one. Cheap test: an odd number of backticks before it.
function insideCode(line, index) {
  const before = line.slice(0, index);
  return (before.match(/`/g) || []).length % 2 === 1;
}

function violations(docs, opts = {}) {
  const out = [];
  const lanes = [
    { verbs: GATING_VERBS, gating: true },
    ...(opts.report ? [{ verbs: REPORT_ONLY_VERBS, gating: false }] : []),
  ];
  for (const doc of docs) {
    const lines = doc.body.split('\n');
    const prose = proseMask(lines);
    const accepted = acceptedSlugs(doc.body);
    lines.forEach((line, i) => {
      if (!prose[i]) return;
      for (const lane of lanes) {
        const re = verbRe(lane.verbs);
        let m;
        while ((m = re.exec(line))) {
          const slugAt = m.index + m[0].length - m[3].length - m[2].length;
          if (insideCode(line, slugAt)) continue;
          if (accepted.has(m[3])) continue;
          out.push({
            file: doc.file,
            line: i + 1,
            verb: m[1],
            slug: m[3],
            gating: lane.gating,
            text: line.trim(),
          });
        }
      }
    });
  }
  return out;
}

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (!SKIP_DIRS.has(e.name)) walk(p, out);
    } else if (e.name.endsWith('.md')) out.push(p);
  }
  return out;
}

function collect(roots = ['curriculum']) {
  const repo = path.resolve(__dirname, '../../..');
  const files = [];
  for (const r of roots) {
    const abs = path.isAbsolute(r) ? r : path.join(repo, r);
    if (!fs.existsSync(abs)) continue;
    if (fs.statSync(abs).isDirectory()) files.push(...walk(abs));
    else files.push(abs);
  }
  return files.map((f) => ({ file: path.relative(repo, f), body: fs.readFileSync(f, 'utf8') }));
}

if (require.main === module) {
  const argv = process.argv.slice(2);
  const report = argv.includes('--report');
  const fileArgs = [];
  for (let i = 0; i < argv.length; i++) if (argv[i] === '--file') fileArgs.push(argv[++i]);
  const docs = collect(fileArgs.length ? fileArgs : undefined);
  const hits = violations(docs, { report });
  const gating = hits.filter((h) => h.gating);
  for (const h of hits) {
    const tag = h.gating ? 'LABEL' : 'note ';
    console.log(`${tag} ${h.file}:${h.line}  "${h.verb} ${h.slug}"`);
    console.log(`      ${h.text.slice(0, 150)}`);
  }
  console.log(
    `${docs.length} files scanned · ${gating.length} violation${gating.length === 1 ? '' : 's'}` +
      (report ? ` · ${hits.length - gating.length} reported` : '')
  );
  process.exit(gating.length ? 1 : 0);
}

module.exports = { violations, collect, GATING_VERBS, REPORT_ONLY_VERBS };
