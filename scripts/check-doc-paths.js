#!/usr/bin/env node
// Doc-path validator — verify that every file path a doc names actually exists.
//
// Sibling of check-cross-doc-anchors.js, which validates the #anchor half of
// `<file>.md#heading` links across three curriculum dirs. This validates the
// PATH half, everywhere, and for the form that carries most of the repo's
// pointers: a backticked path in prose (`curriculum/evals/judges/writing.md`).
// Rot there is invisible until someone follows the pointer and finds nothing.
//
// Deliberately conservative: it resolves a reference against several roots and
// stays quiet unless the path resolves against none of them. A checker that
// cries wolf gets muted, and a muted checker guards nothing.
//
// Usage: node scripts/check-doc-paths.js [--verbose]   (exit 1 on any dangling path)

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const MEMORY = path.join(
  process.env.HOME || '',
  '.claude/projects/-Users-anttitevanlinna-Projects-agents-102/memory',
);

// Docs we read. Archived text is a record of what was true, so its pointers are
// allowed to rot; fixtures and playgrounds name files inside student sandboxes.
// continuous-research/ is excluded: it addresses itself by paths relative to its
// own root, has its own review skill, and is the one public tree here. Bringing
// it in wants a second resolution convention, not a wider glob.
const SKIP_TREE =
  /^docs\/archive\/|playgrounds\/|fixtures\/|^node_modules\/|^continuous-research\//;

const EXT = String.raw`md|js|sh|json|html|css|yaml|yml`;
// Backticked path, or a markdown link target. Both must contain a slash to
// count: a bare basename is prose, not a pointer.
const BACKTICK_RE = new RegExp('`([A-Za-z0-9_.@/-]+\\.(?:' + EXT + '))`', 'g');
const LINK_RE = new RegExp(String.raw`\]\(([A-Za-z0-9_.@/-]+\.(?:` + EXT + String.raw`))(?:#[^)]*)?\)`, 'g');

// Illustrative rather than real. Placeholders, globs, and the generic examples
// that rule docs use to show a shape.
const PLACEHOLDER = [
  /[<>{}*]/, /\bNNNN\b/, /\bX\.md$/, /\/(old|new)-path\./, /\bslug\.md$/,
  /\bfoo\.|\bbar\.|\bexample\./, /\byour-/, /_a\.md$|_b\.md$/,
  /project_(xyz|old_thing)/, /\.\.\.[/]/,
];

// A path a doc instructs you to CREATE is a destination, not a pointer: it is
// supposed to be absent until the run that writes it happens. Judged from the
// text immediately before the reference.
const WRITE_CONTEXT = /\b(write|writes|written|save|saved|output|emit|emits|create|creates|overwrite)\b[^.]{0,60}$/i;

function isDestination(text, index) {
  return WRITE_CONTEXT.test(text.slice(Math.max(0, index - 90), index));
}

// Gitignored by design: the repo documents them precisely because each reader
// creates their own. They must never exist here.
const BY_DESIGN_ABSENT = [/(^|\/)CLAUDE\.local\.md$/];

function isPlaceholder(ref) {
  return PLACEHOLDER.some((re) => re.test(ref)) || BY_DESIGN_ABSENT.some((re) => re.test(ref));
}

// Known-dangling pointers, each with the reason it is allowed to dangle. An
// entry here is a decision on the record; anything not listed fails the build.
// Format: "<file> -> <ref>". Keep the reason, or delete the entry and fix it.
const ALLOW = new Map(Object.entries(require('./check-doc-paths.allow.json')));

// Student-facing surfaces name two different trees. Ours (`curriculum/...`,
// `scripts/...`) must resolve. The student's own working directory
// (`outputs/policy-report.md`, `module-1/site.html`, `./challenge.md`) is
// created during the exercise and cannot resolve here — checking it would flag
// every exercise that tells a student to make a file. So on those surfaces we
// validate only references rooted in a repo top-level directory.
// Prompts and scaffolds address the student's working tree as directly as an
// exercise body does; skills carry upstream authors' own paths.
// The tmux-runner drives Claude through OTHER repositories (lemmings, codesearch,
// picoshare). Its docs quote paths inside those trees — src/round.js, tests/,
// docs/adr/, observations/ — which cannot resolve here and are not meant to.
const FOREIGN_TREE = /^curriculum\/evals\/mechanical\//;

const STUDENT_SURFACE =
  /^curriculum\/(trainings|exercises|lectures|prompts|scaffolds|skills)\//;
// `memory/` and `.claude/` are deliberately absent: both name a real directory
// in THIS repo and a directory the student creates in their own project, and on
// a student surface the second reading is the intended one.
const REPO_ROOTS = [
  'curriculum/', 'scripts/', 'site/', 'content/', 'docs/', 'protos/',
  'continuous-research/',
];
const isRepoPointer = (ref) => REPO_ROOTS.some((r) => ref.startsWith(r));

const TRAINING_ROOTS = (() => {
  const base = path.join(ROOT, 'curriculum/trainings');
  try {
    return fs.readdirSync(base)
      .filter((d) => fs.statSync(path.join(base, d)).isDirectory())
      .map((d) => path.join(base, d));
  } catch { return []; }
})();

// A module include is the RENDERER's contract, not the student's working tree:
// `rewriteCrossDocLinks` in site/layouts/curriculum.js fetches exactly these
// shapes, so exactly these must resolve. They carry no repo-root prefix, so the
// roots pre-filter in collect() skipped every one — the checker reported 447
// docs OK while never looking at the pointers that decide whether a module
// renders its own exercises at all. Shape mirrors module-shape.md § Cross-doc
// links; a single flat slug, no nesting, which is what keeps `outputs/x.md` and
// `agents/researcher.md` out.
const CURRICULUM_REF = new RegExp(
  String.raw`^(?:\.\./)*(?:(?:exercises|lectures)/[a-z0-9-]+\.md` +
  String.raw`|trainings/[a-z0-9-]+/(?:reference|supplementary)/[a-z0-9-]+\.md)$`,
);
const isCurriculumInclude = (ref) => CURRICULUM_REF.test(ref);

// Strip fenced code blocks: they show commands and shapes, not live pointers.
function stripFences(text) {
  return text.replace(/^```[\s\S]*?^```/gm, '');
}

function resolves(ref, fromDir, fromFile) {
  const ownTraining = fromFile && fromFile.match(/^curriculum\/trainings\/[^/]+\//);
  const candidates = [
    ownTraining && path.join(ROOT, ownTraining[0], ref),
    path.join(ROOT, ref),
    path.join(ROOT, fromDir, ref),
    path.join(ROOT, 'curriculum', ref),
    // Eval docs address the eval tree from its own root; skill docs name
    // sibling skills as `<name>/SKILL.md`.
    path.join(ROOT, 'curriculum/evals', ref),
    path.join(ROOT, '.claude/skills', ref),
    path.join(ROOT, 'continuous-research', ref),
    path.join(ROOT, 'continuous-research/findings', ref),
    // A shared lecture or exercise may name a training-specific page by the
    // bare `reference/<slug>.md` form. Which training it means is ambiguous
    // from a shared file, so try each — the alternative was one hardcoded
    // training, which quietly made every other training's pointers unresolvable.
    ...TRAINING_ROOTS.map((t) => path.join(t, ref)),
    // The memory store lives outside the repo; docs address it as `memory/...`.
    MEMORY && path.join(MEMORY, ref.replace(/^memory\//, '')),
    MEMORY && path.join(MEMORY, ref),
    MEMORY && path.join(MEMORY, path.basename(ref)),
  ].filter(Boolean);
  return candidates.some((c) => fs.existsSync(c));
}

function collect(files) {
  const dangling = [];
  for (const f of files) {
    const full = path.join(ROOT, f);
    let text;
    try { text = stripFences(fs.readFileSync(full, 'utf8')); } catch { continue; }
    const fromDir = path.dirname(f);
    const seen = new Set();
    for (const re of [BACKTICK_RE, LINK_RE]) {
      re.lastIndex = 0;
      let m;
      while ((m = re.exec(text)) !== null) {
        const ref = m[1];
        if (seen.has(ref) || !ref.includes('/')) continue;
        seen.add(ref);
        if (isPlaceholder(ref) || /^https?:/.test(ref)) continue;
        const roots = FOREIGN_TREE.test(f)
          ? REPO_ROOTS.filter((r) => r !== 'docs/')   // in a foreign tree, docs/ is theirs
          : REPO_ROOTS;
        if ((STUDENT_SURFACE.test(f) || FOREIGN_TREE.test(f)) &&
            !roots.some((r) => ref.startsWith(r)) &&
            !isCurriculumInclude(ref)) continue;
        if (isDestination(text, m.index)) continue;
        if (ALLOW.has(`${f} -> ${ref}`)) continue;
        if (!resolves(ref, fromDir, f)) dangling.push({ file: f, ref });
      }
    }
  }
  return dangling;
}

function trackedDocs() {
  return execSync('git ls-files "*.md"', { cwd: ROOT })
    .toString().trim().split('\n')
    .filter((f) => f && !SKIP_TREE.test(f));
}

if (require.main === module) {
  const files = trackedDocs();
  const dangling = collect(files);
  if (dangling.length === 0) {
    console.log(`OK — ${files.length} docs, every named file path resolves.`);
    process.exit(0);
  }
  console.error(`\nDangling doc paths — ${dangling.length} across ${new Set(dangling.map((d) => d.file)).size} files:\n`);
  for (const d of dangling) console.error(`  ${d.file}\n    → ${d.ref}`);
  console.error('\nFix the pointer, or delete the sentence that carries it.\n');
  process.exit(1);
}

module.exports = { collect, isPlaceholder, stripFences, resolves, isCurriculumInclude };
