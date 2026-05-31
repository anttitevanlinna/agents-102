#!/usr/bin/env node
// Cross-doc anchor validator — verify that every `<file>.md#anchor` link in the
// curriculum resolves to a heading id the renderer actually generates.
//
// Why this exists: heading ids are produced by curriculum.js `slugifyHeading`
// via `configureMarked`. A link author writing `#9-long-running-shapes--loop-...`
// has no way to see that an inline-code heading (`/loop`, `/goal`) slugs to
// `codeloopcode`/`codegoalcode` in the built HTML — so the anchor silently
// dangles. This renders each target file through the SAME marked config the
// build uses, collects the real heading ids, and checks each inbound anchor.
//
// Usage: node scripts/check-cross-doc-anchors.js   (exit 1 on any broken anchor)

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const ROOT = path.join(__dirname, '..');
const CR = require(path.join(ROOT, 'site/layouts/curriculum.js'));

// Configure marked exactly as the build does, so heading ids match the
// student-facing HTML byte-for-byte (including any slugger quirks).
CR.configureMarked(marked);

// Source trees whose markdown may carry cross-doc links.
const SRC_DIRS = ['curriculum/trainings', 'curriculum/exercises', 'curriculum/lectures'];

// Markdown link whose target is a .md with a #fragment.
const LINK_RE = /\]\(([^)\s]*\.md)#([^)\s]+)\)/g;
const HEADING_ID_RE = /<h[1-6][^>]*\bid="([^"]+)"/g;

function walk(dir, acc) {
    for (const name of fs.readdirSync(dir)) {
        const full = path.join(dir, name);
        const st = fs.statSync(full);
        if (st.isDirectory()) walk(full, acc);
        else if (name.endsWith('.md')) acc.push(full);
    }
    return acc;
}

// Cache of target-file path -> Set of heading ids it generates.
const idCache = new Map();
function idsFor(file) {
    if (idCache.has(file)) return idCache.get(file);
    const md = fs.readFileSync(file, 'utf8');
    const html = marked.parse(md);
    const ids = new Set();
    let m;
    while ((m = HEADING_ID_RE.exec(html)) !== null) ids.add(m[1]);
    idCache.set(file, ids);
    return ids;
}

const sources = [];
for (const d of SRC_DIRS) {
    const abs = path.join(ROOT, d);
    if (fs.existsSync(abs)) walk(abs, sources);
}

// Basename index for fallback resolution. Cross-doc links from shared docs
// (exercises/lectures) use a link base the build rewrites at render time, so
// the on-disk relative path may not resolve directly; the basename does.
const byBasename = new Map();
for (const f of sources) {
    const b = path.basename(f);
    (byBasename.get(b) || byBasename.set(b, []).get(b)).push(f);
}

// Resolve a link target to an on-disk file, or null. Tries the literal
// relative path first, then a unique basename match.
function resolveTarget(src, relPath) {
    const direct = path.resolve(path.dirname(src), relPath);
    if (fs.existsSync(direct)) return direct;
    const hits = byBasename.get(path.basename(relPath));
    if (hits && hits.length === 1) return hits[0];
    return null;
}

const broken = [];
for (const src of sources) {
    const md = fs.readFileSync(src, 'utf8');
    let m;
    LINK_RE.lastIndex = 0;
    while ((m = LINK_RE.exec(md)) !== null) {
        const [, relPath, rawAnchor] = m;
        if (/^https?:/i.test(relPath)) continue; // external URL — not ours to check
        const anchor = decodeURIComponent(rawAnchor);
        const target = resolveTarget(src, relPath);
        if (!target) {
            broken.push({ src, relPath, anchor, target: null, reason: 'target file not found' });
            continue;
        }
        if (!idsFor(target).has(anchor)) {
            broken.push({ src, relPath, anchor, target, reason: 'no heading with this id' });
        }
    }
}

if (broken.length === 0) {
    console.log(`OK: all cross-doc .md#anchor links resolve (${sources.length} files scanned).`);
    process.exit(0);
}

console.error(`FAIL: ${broken.length} broken cross-doc anchor link(s):\n`);
for (const b of broken) {
    console.error(`  ${path.relative(ROOT, b.src)}`);
    console.error(`    -> ${b.relPath}#${b.anchor}  (${b.reason})`);
    if (b.reason === 'no heading with this id' && b.target) {
        const near = [...idsFor(b.target)].filter(id => {
            const a = b.anchor.replace(/[^a-z0-9]/g, '');
            const i = id.replace(/[^a-z0-9]/g, '');
            return a.length > 4 && (i.includes(a.slice(0, 8)) || a.includes(i.slice(0, 8)));
        });
        if (near.length) console.error(`    did you mean: ${near.join(', ')}`);
    }
}
process.exit(1);
