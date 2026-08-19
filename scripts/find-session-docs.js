#!/usr/bin/env node
/**
 * find-session-docs — separate canonical internal docs from spent session artifacts.
 *
 * The discriminator is reachability, not wording. A canonical doc is named from an
 * always-loaded instruction surface (a CLAUDE.md tier, .claude/rules/, a skill, the
 * memory index) — directly, or via another doc that is itself anchored. A session
 * doc is named by nothing but the session that produced it.
 *
 * Content heuristics ("Status:", checkboxes, RESUME) do NOT work: a judge rubric and
 * a compaction handoff look identical to a regex. Reachability is what differs.
 *
 * Usage: node scripts/find-session-docs.js [--all] [--json]
 *   default   plan-shaped internal docs only (plans, status, reports, sweeps)
 *   --all     every internal doc
 */
const { execSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = execSync('git rev-parse --show-toplevel').toString().trim();
const args = process.argv.slice(2);
const ALL = args.includes('--all');
const JSON_OUT = args.includes('--json');

const ls = (p) => execSync(`git ls-files ${p}`, { cwd: ROOT }).toString().trim().split('\n').filter(Boolean);

// Surfaces that load without anyone choosing to open them. Reachability starts here.
const ANCHOR_SEEDS = [
  'CLAUDE.md', 'AGENTS.md', 'README.md',
  ...ls('curriculum/CLAUDE.md'),
  ...ls('continuous-research/CLAUDE.md'),
  ...ls("'.claude/rules/*'"),
  ...ls("'.claude/skills/**/SKILL.md'"),
  ...ls('package.json'),
].filter((f) => fs.existsSync(path.join(ROOT, f)));

// The memory store lives outside the repo but is loaded every session.
const MEM = path.join(process.env.HOME, '.claude/projects/-Users-anttitevanlinna-Projects-agents-102/memory');

// Candidate pool: internal docs. Not research, not student-facing curriculum, not fixtures.
const EXCLUDE = /^(continuous-research|node_modules|docs\/archive)\/|^curriculum\/(lectures|exercises|modules|prompts|reference|supplementary|trainings|scaffolds|skills|figures)\/|playgrounds\/|fixtures\/|\/legacy\/|COPYRIGHT\.md$/;
const PLAN_SHAPED = /(plan|status|todo|report|audit|sweep|review|findings|log|resume|handoff|punch|fix-pass|reeval|improvements|iteration|scratch|specs?)/i;

let candidates = ls("'*.md'").filter((f) => !EXCLUDE.test(f));
if (!ALL) candidates = candidates.filter((f) => PLAN_SHAPED.test(f));

const read = (f) => { try { return fs.readFileSync(f, 'utf8'); } catch { return ''; } };
const corpus = new Map();
const allDocs = ls("'*.md'").filter((f) => !/^node_modules/.test(f));
for (const f of allDocs) corpus.set(f, read(path.join(ROOT, f)));
for (const f of ANCHOR_SEEDS) if (!corpus.has(f)) corpus.set(f, read(path.join(ROOT, f)));
if (fs.existsSync(MEM)) {
  for (const f of fs.readdirSync(MEM)) {
    if (f.endsWith('.md')) corpus.set(`memory:${f}`, read(path.join(MEM, f)));
  }
}

// A names B if B's path appears in A's text, or its basename appears as a whole
// path segment. Plain substring on the basename is wrong: a reference to
// `the-loop-has-a-name.md` would otherwise register as a hit on `loop-has-a-name.md`.
const namesIt = (text, target) => {
  if (text.includes(target)) return true;
  const base = path.basename(target);
  const re = new RegExp(`(^|[\\s\`(\\[/])${base.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`);
  return re.test(text);
};

// Transitive closure from the anchor seeds.
const anchored = new Set(ANCHOR_SEEDS);
for (const k of corpus.keys()) if (k.startsWith('memory:')) anchored.add(k);
let grew = true;
while (grew) {
  grew = false;
  for (const [src, text] of corpus) {
    if (!anchored.has(src)) continue;
    if (src.startsWith('docs/archive/')) continue; // an archive confers no authority
    for (const c of corpus.keys()) {
      if (anchored.has(c) || c === src || c.startsWith('docs/archive/')) continue;
      if (namesIt(text, c)) { anchored.add(c); grew = true; }
    }
  }
}

const rows = candidates.map((f) => {
  const size = fs.statSync(path.join(ROOT, f)).size;
  const last = execSync(`git log -1 --format=%ad --date=short -- "${f}"`, { cwd: ROOT }).toString().trim();
  // who names it, for the human deciding
  const by = [...corpus.entries()]
    .filter(([src, t]) => src !== f && anchored.has(src) && !src.startsWith('docs/archive/') && namesIt(t, f))
    .map(([src]) => src);
  return { file: f, anchored: anchored.has(f), last, size, namedBy: by.slice(0, 3) };
}).sort((a, b) => (a.anchored - b.anchored) || a.last.localeCompare(b.last));

if (JSON_OUT) { console.log(JSON.stringify(rows, null, 2)); process.exit(0); }

const orphans = rows.filter((r) => !r.anchored);
console.log(`\n  ${rows.length} plan-shaped internal docs — ${orphans.length} reachable from nothing\n`);
console.log('  SESSION (named by no loaded surface) — archive candidates');
for (const r of orphans) console.log(`    ${r.last}  ${String(Math.round(r.size / 1024) + 'K').padStart(5)}  ${r.file}`);
console.log('\n  CANONICAL (reachable) — leave alone');
for (const r of rows.filter((r) => r.anchored)) {
  console.log(`    ${r.last}  ${String(Math.round(r.size / 1024) + 'K').padStart(5)}  ${r.file}   ← ${r.namedBy.join(', ') || 'seed'}`);
}
console.log();

module.exports = { namesIt };
