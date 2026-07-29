#!/usr/bin/env node
/*
 * Validate `<!-- backing -->` blocks in curriculum files.
 *
 * The block is prose, not YAML — a maintainer decision (2026-07-29): stamps stay
 * co-located with the claims they back. Prose is only trustworthy if something
 * parses it, so this is that something. Grammar → curriculum/backing-format.md.
 *
 * Checks:
 *   ERROR  REGION-UNCLOSED   `<!-- backing -->` with no `<!-- /backing -->`
 *   ERROR  CLAIM-MALFORMED   a Claims line that does not parse
 *   ERROR  DETAIL-UNBACKED   a `detail` claim with no source id and no [SOURCE NEEDED]
 *   ERROR  SOURCE-UNDEFINED  a claim cites a source id the Sources field never defines
 *   ERROR  LEGACY-DOUBLE     a backing block coexists with `Frameworks riffed on:` /
 *                            `Frameworks attributed:` / `Source verification` — two homes
 *                            for one fact is how the corpus drifted in the first place
 *   WARN   SOURCE-ORPHAN     a defined source no claim cites
 *   WARN   VISION-BACKED     a `vision` claim carrying sources (layer is probably wrong)
 *   WARN   LAW-UNRESOLVED    a `law:` key matching no banked law in theory-plan.md
 *   WARN   STANCE-STALE      `[stance:…]` older than --stance-window months
 *   INFO   NO-BLOCK          a file with practitioner-shaped citations but no block
 *   INFO   LAW-UNREACHED     a ★ backbone law no file's `law:` key points at
 *
 * Usage:
 *   node scripts/validate-backing.js [paths...]
 *   node scripts/validate-backing.js --json
 *   node scripts/validate-backing.js --stance-window 6
 *
 * Exit 1 on any ERROR.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const THEORY_PLAN = path.join(ROOT, 'theory-plan.md');
const OPEN = '<!-- backing -->';
const CLOSE = '<!-- /backing -->';
const LEGACY = [/^\*\*Frameworks riffed on:\*\*/m, /^\*\*Frameworks attributed:\*\*/m, /^\*\*Source verification/m];
const LAYERS = new Set(['vision', 'detail', 'borrowed']);

function parseArgs(argv) {
  const opts = { json: false, kbIndex: false, stanceWindow: 6, paths: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--json') opts.json = true;
    else if (a === '--kb-index') opts.kbIndex = true;
    else if (a === '--stance-window') opts.stanceWindow = Number(argv[++i]);
    else if (a.startsWith('-')) { console.error(`unknown arg ${a}`); process.exit(2); }
    else opts.paths.push(a);
  }
  if (!opts.paths.length) opts.paths = ['curriculum/lectures', 'curriculum/exercises', 'curriculum/trainings'];
  return opts;
}

function walk(p, out = []) {
  const abs = path.isAbsolute(p) ? p : path.join(ROOT, p);
  if (!fs.existsSync(abs)) return out;
  const st = fs.statSync(abs);
  if (st.isDirectory()) {
    for (const e of fs.readdirSync(abs)) walk(path.join(abs, e), out);
  } else if (abs.endsWith('.md')) out.push(abs);
  return out;
}

/*
 * Banked laws from theory-plan.md § The pieces. The inventory is prose, so this
 * slugifies every bolded run inside its bullets rather than reading a schema.
 * Deliberately WARN-severity: theory-plan is a design doc that gets restructured,
 * and a rename there must never hard-fail a curriculum build. Keys resolve by
 * NAME, never by section number — numbers drift (check_writing.md, belief rule).
 */
function bankedLaws() {
  if (!fs.existsSync(THEORY_PLAN)) return { all: new Map(), backbone: new Set() };
  const md = fs.readFileSync(THEORY_PLAN, 'utf8');
  const start = md.indexOf('## The pieces');
  if (start === -1) return { all: new Map(), backbone: new Set() };
  const rest = md.slice(start + 3);
  const end = rest.indexOf('\n## ');
  const section = end === -1 ? rest : rest.slice(0, end);

  const all = new Map();
  const backbone = new Set();
  for (const line of section.split('\n')) {
    if (!/^\s*-\s/.test(line)) continue;
    const star = line.includes('★');
    for (const m of line.matchAll(/\*\*(.+?)\*\*/g)) {
      const slug = slugify(m[1]);
      if (!slug || slug.length < 3) continue;
      if (!all.has(slug)) all.set(slug, m[1].trim());
      if (star) backbone.add(slug);
    }
  }
  return { all, backbone };
}

function slugify(s) {
  return s.toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function monthsBetween(fromIso, toDate) {
  const d = new Date(fromIso + 'T00:00:00Z');
  if (isNaN(d)) return null;
  return (toDate.getUTCFullYear() - d.getUTCFullYear()) * 12
    + (toDate.getUTCMonth() - d.getUTCMonth());
}

function parseBlock(text) {
  const o = text.indexOf(OPEN);
  if (o === -1) return null;
  const c = text.indexOf(CLOSE, o);
  const before = text.slice(0, o).split('\n').length;
  return {
    unclosed: c === -1,
    body: c === -1 ? text.slice(o + OPEN.length) : text.slice(o + OPEN.length, c),
    lineOffset: before,
  };
}

/* Fields are `**Name**` headed runs inside the block. */
function fields(body) {
  const out = {};
  let cur = null;
  body.split('\n').forEach((line, i) => {
    const h = line.match(/^\*\*([A-Za-z][A-Za-z ]*?)\*\*/);
    if (h) { cur = h[1].trim(); out[cur] = out[cur] || []; return; }
    if (cur && line.trim()) out[cur].push({ text: line, i });
  });
  return out;
}

function parseClaim(line) {
  // - `id` · layer · "anchor" ← a, b   |   ← [SOURCE NEEDED]   |   ← none-owed
  const m = line.match(/^\s*-\s*`([^`]+)`\s*·\s*(\w+)\s*·\s*(.+?)\s*←\s*(.+?)\s*$/);
  if (!m) return null;
  const [, id, layer, anchor, backing] = m;
  const needed = /\[SOURCE NEEDED\]/i.test(backing);
  const none = /none-owed/i.test(backing);
  const refs = (none || needed) ? []
    : backing.split(',').map(s => s.trim().replace(/`/g, '')).filter(Boolean);
  return { id, layer, anchor, refs, needed, none };
}

function parseSource(line) {
  const m = line.match(/^\s*-\s*([a-z0-9][a-z0-9._-]*)\s+`\[checked:/i);
  return m ? m[1] : null;
}

/*
 * `kb:<path>` on a source line names the continuous-research file the claim is
 * grounded in. Inverting these gives the edge the repo has never had: which
 * lectures depend on which KB file, so a platform-watch cycle that moves a
 * pattern file can see what it moved the ground under.
 *
 * The edge is held HERE and not in continuous-research/ on purpose — that tree
 * ships under its own licence and stays free of curriculum references.
 */
function parseKbRefs(line) {
  return [...line.matchAll(/\bkb:([A-Za-z0-9._\/-]+)/g)].map(m => m[1].replace(/[.,;]+$/, ''));
}

/*
 * Audit one file's text. Returns { findings, lawsUsed }.
 * `file` is carried through onto findings purely as a label.
 */
function auditText(text, { laws, now, stanceWindow, file = '<text>' } = {}) {
  const findings = [];
  const lawsUsed = new Set();
  const add = (sev, code, line, msg) => findings.push({ sev, code, file, line, msg });

  const blk = parseBlock(text);
  if (!blk) {
    // No block. Only interesting if the file cites practitioners.
    if (/`\[checked:/.test(text) || LEGACY.some(re => re.test(text))) {
      add('INFO', 'NO-BLOCK', 1, 'has citations/legacy provenance but no <!-- backing --> block');
    }
    return { findings, lawsUsed, hasBlock: false };
  }
  if (blk.unclosed) {
    add('ERROR', 'REGION-UNCLOSED', blk.lineOffset, `${OPEN} with no ${CLOSE}`);
    return { findings, lawsUsed, hasBlock: true };
  }

  for (const re of LEGACY) {
    const m = text.match(re);
    if (m) add('ERROR', 'LEGACY-DOUBLE', text.slice(0, m.index).split('\n').length,
      `legacy provenance block coexists with backing block: ${m[0].replace(/\*/g, '')}`);
  }

  const f = fields(blk.body);
  const ln = i => blk.lineOffset + i;

  const claims = [];
  for (const { text: l, i } of (f.Claims || [])) {
    if (!/^\s*-\s/.test(l)) continue;
    const c = parseClaim(l);
    if (!c) { add('ERROR', 'CLAIM-MALFORMED', ln(i), l.trim().slice(0, 90)); continue; }
    if (!LAYERS.has(c.layer)) add('ERROR', 'CLAIM-MALFORMED', ln(i), `unknown layer "${c.layer}" (${[...LAYERS].join('|')})`);
    claims.push({ ...c, line: ln(i) });
  }

  const defined = new Set();
  const kbRefs = new Set();
  for (const { text: l, i } of (f.Sources || [])) {
    const id = parseSource(l);
    if (id) defined.add(id);
    else if (/^\s*-\s*\S/.test(l) && /`\[checked:/.test(l)) {
      add('ERROR', 'CLAIM-MALFORMED', ln(i), 'source line has a stamp but no leading source-id');
    }
    for (const k of parseKbRefs(l)) kbRefs.add(k);
  }

  // A source is cited from EITHER field. Claims cite sources that back a body
  // sentence; Frameworks cite sources that establish a borrowed framework's
  // provenance and often back no single sentence. Union, or every framework-only
  // source reads as an orphan.
  const cited = new Set();
  for (const c of claims) {
    if (c.layer === 'detail' && !c.refs.length && !c.needed) {
      add('ERROR', 'DETAIL-UNBACKED', c.line, `detail claim \`${c.id}\` has no source and no [SOURCE NEEDED]`);
    }
    if (c.layer === 'vision' && c.refs.length) {
      add('WARN', 'VISION-BACKED', c.line, `vision claim \`${c.id}\` cites sources — should it be detail?`);
    }
    for (const r of c.refs) {
      cited.add(r);
      if (!defined.has(r)) add('ERROR', 'SOURCE-UNDEFINED', c.line, `\`${c.id}\` cites undefined source "${r}"`);
    }
  }

  for (const { text: l, i } of (f.Frameworks || [])) {
    for (const m of l.matchAll(/law:([a-z0-9-]+)/g)) {
      const key = m[1];
      if (key === 'none') continue;
      lawsUsed.add(key);
      if (laws && laws.all.size && !laws.all.has(key)) {
        add('WARN', 'LAW-UNRESOLVED', ln(i), `law:${key} matches no banked law in theory-plan.md`);
      }
    }
    const arrow = l.split('←')[1];
    if (!arrow) continue;
    for (const r of arrow.split(',').map(s => s.trim().replace(/[`.]/g, '')).filter(Boolean)) {
      if (r === 'cultural-vocab' || r === 'none') continue;
      if (defined.has(r)) cited.add(r);
    }
  }

  for (const d of defined) {
    if (!cited.has(d)) add('WARN', 'SOURCE-ORPHAN', blk.lineOffset, `source "${d}" backs no claim`);
  }

  const stance = blk.body.match(/\[stance:(\d{4}-\d{2}-\d{2})\s+level:(L\d)\]/);
  if (stance) {
    const age = monthsBetween(stance[1], now || new Date());
    if (age !== null && age > (stanceWindow ?? 6)) {
      add('WARN', 'STANCE-STALE', blk.lineOffset, `stance dated ${stance[1]} is ${age} months old (window ${stanceWindow ?? 6})`);
    }
  }

  return { findings, lawsUsed, kbRefs, hasBlock: true };
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  const now = new Date();
  const laws = bankedLaws();
  const findings = [];
  const lawsUsed = new Set();
  const kbIndex = new Map();
  let blocks = 0;

  const files = opts.paths.flatMap(p => walk(p)).filter((v, i, a) => a.indexOf(v) === i).sort();

  for (const abs of files) {
    const rel = path.relative(ROOT, abs);
    const text = fs.readFileSync(abs, 'utf8');
    const r = auditText(text, { laws, now, stanceWindow: opts.stanceWindow, file: rel });
    findings.push(...r.findings);
    for (const k of r.lawsUsed) lawsUsed.add(k);
    for (const k of (r.kbRefs || [])) {
      if (!kbIndex.has(k)) kbIndex.set(k, []);
      kbIndex.get(k).push(rel);
    }
    if (r.hasBlock) blocks++;
  }

  if (opts.kbIndex) {
    if (!kbIndex.size) {
      console.log('No kb: references found. Add `kb:<path>` to a backing-block source line.');
      process.exit(0);
    }
    const rows = [...kbIndex.entries()].sort((a, b) => b[1].length - a[1].length);
    if (opts.json) { console.log(JSON.stringify(Object.fromEntries(rows), null, 2)); process.exit(0); }
    console.log('Which curriculum files depend on which research file\n');
    for (const [kb, deps] of rows) {
      const missing = fs.existsSync(path.join(ROOT, 'continuous-research', kb)) ? '' : '  ⚠ not found';
      console.log(`continuous-research/${kb}${missing}`);
      for (const d of [...new Set(deps)].sort()) console.log(`    ← ${d}`);
      console.log('');
    }
    process.exit(0);
  }

  for (const slug of laws.backbone) {
    if (!lawsUsed.has(slug)) {
      findings.push({ sev: 'INFO', code: 'LAW-UNREACHED', file: 'theory-plan.md', line: 1,
        msg: `★ backbone law "${laws.all.get(slug)}" (law:${slug}) is not referenced by any backing block` });
    }
  }

  const errs = findings.filter(f => f.sev === 'ERROR');
  if (opts.json) {
    console.log(JSON.stringify({ blocks, findings }, null, 2));
    process.exit(errs.length ? 1 : 0);
  }

  console.log(`Backing-block audit — ${blocks} block(s) across ${files.length} file(s)\n`);
  for (const sev of ['ERROR', 'WARN', 'INFO']) {
    const g = findings.filter(f => f.sev === sev);
    if (!g.length) continue;
    console.log(`${sev} (${g.length}):`);
    for (const f of g) console.log(`  ${f.file}:${f.line}  [${f.code}]  ${f.msg}`);
    console.log('');
  }
  console.log(`summary: ${errs.length} error · ${findings.filter(f => f.sev === 'WARN').length} warn · ${findings.filter(f => f.sev === 'INFO').length} info`);
  process.exit(errs.length ? 1 : 0);
}

if (require.main === module) main();
module.exports = { auditText, parseClaim, parseSource, parseBlock, fields, slugify, bankedLaws };
