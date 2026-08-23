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
 *   ERROR  FIELD-UNPARSED    a field header in a spelling the parser cannot read
 *   ERROR  DETAIL-UNBACKED   a `detail` claim with no source id and no [SOURCE NEEDED]
 *   ERROR  SOURCE-UNDEFINED  a claim cites a source id the Sources field never defines
 *   ERROR  ANCHOR-DRIFT      a claim's quoted anchor no longer appears in the prose
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
const CR = require(path.join(__dirname, '..', 'site/layouts/curriculum.js'));
const { loadRegistry } = require('./compile-prompts.js');
const { loadFigures } = require('./compile-figures.js');

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

/*
 * Anchor matching. `curriculum/backing-format.md`: the anchor is "the body
 * phrase that breaks if the backing fails. Quote it; don't paraphrase." So the
 * check is a verbatim substring — but typography is not the target, and the
 * corpus mixes straight and curly quotes on both sides of the block. Normalise
 * quotes, dashes and runs of whitespace; change anything else and a real reword
 * starts passing.
 */
function normalizeAnchor(s) {
  return s
    .replace(/\\(["'])/g, '$1')
    .replace(/[\u2018\u2019\u02bc]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/\s+/g, ' ')
    .trim();
}

function stripAnchorQuotes(s) {
  // Exactly one pair. Body prose quotes speech, and a greedy strip eats the
  // inner quote and reports drift on an intact anchor.
  return s.trim().replace(/^["\u201c\u2018]/, '').replace(/["\u201d\u2019]$/, '');
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

/*
 * Fields are headed runs inside the block. Two spellings are legal: `**Name**`
 * and a bare `Name` on its own line — the spec writes Stance and OODA bare, and
 * blocks get authored that way. Accepting only the bolded form made a bare-headed
 * block parse to zero claims and report `0 error · 0 warn`: a green light with no
 * lamp behind it. The bare form is restricted to the known field vocabulary so a
 * line of prose can never promote itself to a header.
 */
const FIELD_NAMES = ['Claims', 'Sources', 'Frameworks', 'Stance', 'OODA', 'Flagged'];
const BARE_FIELD = new RegExp(`^(${FIELD_NAMES.join('|')})\\b`);
/* Any decorated spelling of a field name — `### Claims`, `_Sources_`, `Claims:`. */
const FIELD_LOOKALIKE = new RegExp(`^[#>*_\\s]{0,6}(${FIELD_NAMES.join('|')})\\b`);

function fields(body) {
  const out = {};
  let cur = null;
  body.split('\n').forEach((line, i) => {
    const bold = line.match(/^\*\*([A-Za-z][A-Za-z ]*?)\*\*/);
    const name = bold ? bold[1].trim() : (line.match(BARE_FIELD) || [])[1];
    if (name) { cur = name; out[cur] = out[cur] || []; return; }
    if (cur && line.trim()) out[cur].push({ text: line, i });
  });
  return out;
}

/*
 * Sentinels that close a claim without naming a defined source. `none-owed` is
 * the vision-layer marker. `[SOURCE NEEDED]` is open debt. `cultural-vocab` is
 * the attribution carve-out (check_research_claims §1, check_writing §6): a
 * public-domain thinker paraphrased as cultural vocabulary is credited by name
 * with no URL owed — legal on a `borrowed` claim, never on a `detail` one.
 */
const CULTURAL_VOCAB = 'cultural-vocab';

/*
 * The `[borrow:…]` vocabulary. Closed on purpose, and the closing is the check:
 * this field went unvalidated while `law:` was resolved against theory-plan.md,
 * and it drifted to ~50 values for ~35 real fields. Two costs. One spelling
 * splits a grep (`security engineering` / `security-engineering` both lived
 * here). The other is worse: three values were not parent fields at all, and
 * `[borrow:research-house]` credited an outside house with the
 * absorption-bottleneck law `theory-plan.md` banks as ours at `[rsch:L4]` —
 * the ledger form of the convergence-verb defect, made found instead of made.
 *
 * Adding a field costs one line HERE, deliberately. That is the forcing
 * function: a new parent field should be a decision, not a typo that sticks.
 * Compounds are honest (`learning science / HCI`) and validate part by part.
 */
const BORROW_SENTINELS = ['none', 'practitioner-coined'];
const BORROW_FIELDS = [
  'agile practice', 'alignment research', 'automation studies', 'business analysis',
  'control theory', 'cybernetics', 'distributed systems', 'economics',
  'educational psychology', 'empirical evaluation', 'evolutionary theory',
  'flow engineering', 'groundwork pattern language', 'HCI', 'human factors',
  'information theory', 'journalism', 'learning science', 'legal drafting',
  'manufacturing', 'marketing', 'military strategy', 'ML research', 'navigation',
  'organisational learning', 'organisational theory', 'pedagogy',
  'reliability engineering', 'risk management', 'safety engineering', 'security',
  'security engineering', 'software economics', 'software engineering',
  'software testing', 'SRE', 'statistical process control', 'statistics', 'strategy',
];
/* Named originators. The honest answer to "where is this from" is sometimes a
 * person, not a discipline — theory-plan.md's own spine uses this form. */
const BORROW_ORIGINATORS = ['Argyris & Schön', 'Boyd', 'Conant–Ashby', 'Ricardo'];
const BORROW_VOCAB = new Set([...BORROW_SENTINELS, ...BORROW_FIELDS, ...BORROW_ORIGINATORS]);

function borrowParts(value) {
  return value.split(/\s*\/\s*|\s+and\s+/).map(s => s.trim()).filter(Boolean);
}

/*
 * An arrow tail is source ids FIRST, optionally followed by a scoping note:
 *   ← klaassen-definitive-guide. Not named in this body; M5 owns the naming.
 * Splitting the whole tail on commas turned that note into phantom refs — a
 * false SOURCE-UNDEFINED on Claims, and on Frameworks the worse failure: the
 * real citation never registered and the source came back SOURCE-ORPHAN, a
 * warning firing on correct input. Ids are kebab-case and carry no sentence
 * break, so the id list ends at the first `. ` / ` — ` / `; `.
 */
const REF_PROSE_BREAK = /\.\s|\s[—–]\s|;\s/;
function refTokens(backing) {
  return backing.split(REF_PROSE_BREAK)[0]
    .split(',')
    .map(s => s.trim().replace(/[`.]/g, ''))
    .filter(Boolean);
}

function parseClaim(line) {
  // - `id` · layer · "anchor" ← a, b   |   ← [SOURCE NEEDED]   |   ← none-owed
  const m = line.match(/^\s*-\s*`([^`]+)`\s*·\s*(\w+)\s*·\s*(.+?)\s*←\s*(.+?)\s*$/);
  if (!m) return null;
  const [, id, layer, anchor, backing] = m;
  const needed = /\[SOURCE NEEDED\]/i.test(backing);
  const none = /none-owed/i.test(backing);
  const all = (none || needed) ? [] : refTokens(backing);
  const culturalVocab = all.includes(CULTURAL_VOCAB);
  const refs = all.filter(r => r !== CULTURAL_VOCAB);
  return { id, layer, anchor, refs, needed, none, culturalVocab };
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
 * URLs the STUDENT-FACING body cites, deduped, earliest line each.
 *
 * The block audits the claims it lists; nothing audited the claims the body
 * makes but the block forgot. A live third-party link in student-facing prose
 * with no stamp has no freshness clock, so nothing will ever re-check it and a
 * dead link ships to a cohort — the same "silence reads as rigour" failure the
 * block exists to kill, one level down. Caught on `orient-and-introspect.md`,
 * which recommends ccstatusline by URL while its Sources field held a single
 * house position with no URL at all.
 *
 * Fenced regions are skipped: a URL inside a fence is a command the student
 * runs or an example payload, not a citation the file stands behind. Flagging
 * those would fire on every `git clone` in the corpus, and a check that cries
 * wolf teaches the maintainer to skim the whole class.
 */
function bodyCitations(text) {
  const end = text.indexOf('<!-- maintainer -->');
  const lines = text.slice(0, end === -1 ? text.indexOf(OPEN) : end).split('\n');
  const seen = new Map();
  let inFence = false;
  lines.forEach((line, i) => {
    if (/^\s*```/.test(line)) { inFence = !inFence; return; }
    if (inFence) return;
    for (const m of line.matchAll(/https?:\/\/[^\s)\]"'>`]+/g)) {
      // Trailing sentence punctuation is not part of the URL; a fragment is not
      // part of its identity for stamping purposes.
      const url = m[0].replace(/[.,;:]+$/, '').split('#')[0].replace(/\/$/, '');
      if (!seen.has(url)) seen.set(url, { url, line: i + 1 });
    }
  });
  return [...seen.values()];
}

/*
 * Audit one file's text. Returns { findings, lawsUsed }.
 * `file` is carried through onto findings purely as a label.
 */
function auditText(text, { laws, now, stanceWindow, file = '<text>', expand = t => t } = {}) {
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

  /*
   * A field header the parser did not register. Silent under the old parser: the
   * run below it landed in whatever field preceded it, or nowhere at all, and the
   * block still audited clean. Loud now — an unread field is indistinguishable
   * from an empty one in the summary line, and only one of those is safe.
   */
  blk.body.split('\n').forEach((line, i) => {
    const m = line.match(FIELD_LOOKALIKE);
    if (m && !(m[1] in f)) {
      add('ERROR', 'FIELD-UNPARSED', ln(i),
        `field header "${line.trim().slice(0, 40)}" is not a recognised spelling — use \`${m[1]}\` or \`**${m[1]}**\``);
    }
  });

  const claims = [];
  for (const { text: l, i } of (f.Claims || [])) {
    if (!/^\s*-\s/.test(l)) continue;
    const c = parseClaim(l);
    if (!c) { add('ERROR', 'CLAIM-MALFORMED', ln(i), l.trim().slice(0, 90)); continue; }
    if (!LAYERS.has(c.layer)) add('ERROR', 'CLAIM-MALFORMED', ln(i), `unknown layer "${c.layer}" (${[...LAYERS].join('|')})`);
    claims.push({ ...c, line: ln(i) });
  }

  /*
   * ANCHOR-DRIFT. A claim whose quoted phrase has been edited out of the body
   * points the next re-verifier at prose that is not there, and every other
   * check still passes — which is how it stayed invisible. Matched against
   * everything ABOVE the block rather than above the maintainer fence: a few
   * anchors legitimately quote maintainer prose, and this check exists to catch
   * drift, not to relitigate where an anchor may point.
   *
   * `{{figure:}}` / `{{prompt:}}` markers expand first. A figure body is
   * student-facing prose — labels and caption included — so a claim anchored on
   * one is correctly placed, and matching the raw file reported drift on three
   * intact lectures at once. Judges read the expanded view for the same reason
   * (`judges/_dispatch-preamble.md`); this takes the same one.
   */
  const prose = normalizeAnchor(expand(text.slice(0, text.indexOf(OPEN))));
  for (const c of claims) {
    const phrase = normalizeAnchor(stripAnchorQuotes(c.anchor));
    if (!phrase) continue;
    /*
     * An ellipsis elides the middle of a long quote — a quoting convention the
     * corpus uses freely. Each fragment must appear, and in order, so elision
     * shortens a quote without licensing a reworded tail.
     */
    let at = 0;
    let intact = true;
    for (const part of phrase.split(/\s*(?:\u2026|\.\.\.)\s*/).filter(Boolean)) {
      const hit = prose.indexOf(part, at);
      if (hit === -1) { intact = false; break; }
      at = hit + part.length;
    }
    if (!intact) {
      add('ERROR', 'ANCHOR-DRIFT', c.line,
        `claim \`${c.id}\` quotes a phrase absent from the body: "${phrase.slice(0, 70)}${phrase.length > 70 ? '…' : ''}"`);
    }
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
    // cultural-vocab deliberately does NOT satisfy a detail claim — the carve-out
    // covers attribution of a borrowed framing, not evidence for a measured claim.
    if (c.layer === 'detail' && !c.refs.length && !c.needed) {
      add('ERROR', 'DETAIL-UNBACKED', c.line, `detail claim \`${c.id}\` has no source and no [SOURCE NEEDED]`
        + (c.culturalVocab ? ' (cultural-vocab attributes a borrowed framing; it is not evidence)' : ''));
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
    const b = l.match(/\[borrow:([^\]]*)\]/);
    if (b) {
      for (const part of borrowParts(b[1])) {
        if (!BORROW_VOCAB.has(part)) {
          add('WARN', 'BORROW-UNKNOWN', ln(i),
            `borrow:"${part}" is not a declared parent field — add it to BORROW_FIELDS or use an existing spelling`);
        }
      }
    }
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
    for (const r of refTokens(arrow)) {
      if (r === 'cultural-vocab' || r === 'none') continue;
      // An unresolved framework ref used to be dropped in silence, which made a
      // dangling attribution look like a recorded one. Same failure as a field
      // header the parser cannot read: nothing consumed, nothing reported.
      if (defined.has(r)) cited.add(r);
      else add('ERROR', 'SOURCE-UNDEFINED', ln(i), `framework cites undefined source "${r}"`);
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

  for (const u of bodyCitations(text)) {
    if (!blk.body.includes(u.url)) {
      add('WARN', 'BODY-URL-UNSTAMPED', u.line,
        `body cites ${u.url} but no source in the block stamps it`);
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

  // Same order build-workbook.js uses, so an anchor sees the text a student does.
  const prompts = loadRegistry();
  const figures = loadFigures();
  const expand = t => CR.expandFigures(CR.expandPrompts(t, prompts), figures);

  for (const abs of files) {
    const rel = path.relative(ROOT, abs);
    const text = fs.readFileSync(abs, 'utf8');
    const r = auditText(text, { laws, now, stanceWindow: opts.stanceWindow, file: rel, expand });
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
