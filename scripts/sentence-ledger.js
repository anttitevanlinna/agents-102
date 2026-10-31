#!/usr/bin/env node
'use strict';
// sentence-ledger.js — every student-facing sentence of a training, one row each.
//
// The markdown stays the source of truth. This derives an index from it so the
// language can be measured and managed at the unit it is written in: the
// sentence. Three uses ride on it:
//   - the simulated student logs a slide id plus a quoted sentence; --find maps
//     that quote to a stable sentence id, so scores survive edits elsewhere;
//   - --dupes lists sentences that live in more than one file (copies drift);
//   - locked sentences (curriculum/language/locked-sentences.json) are checked
//     against it by check-locked-sentences.js.
//
// The file set is the student's reading order: each module of the training,
// the lectures and exercises it includes, its supplementaries, and every slide
// file those include. Each source file is indexed once; a slide file records
// which files include it (usedBy), so a shared slide is not counted twice.
//
// Sentence id = 's-' + first 10 hex of sha256 over the normalised text
// (case, emphasis, quotes and spacing folded). Same words anywhere = same id.
//
// Usage:
//   node scripts/sentence-ledger.js                          # summary
//   node scripts/sentence-ledger.js --json > ledger.json     # every row
//   node scripts/sentence-ledger.js --dupes [--near]         # duplicate report
//   node scripts/sentence-ledger.js --find "<quoted sentence>" [--slide <id>]
//   node scripts/sentence-ledger.js --training agents-101    # default

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const CUR = path.join(ROOT, 'curriculum');
const CR = require(path.join(ROOT, 'site/layouts/curriculum.js'));

// ── text helpers ────────────────────────────────────────────────────────────

function normalise(s) {
  return s
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')      // links → their text
    .replace(/[*_`]/g, '')
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function sentenceId(text) {
  return 's-' + crypto.createHash('sha256').update(normalise(text)).digest('hex').slice(0, 10);
}

function words(s) { return normalise(s).split(/\s+/).filter(Boolean); }

// Student-facing body only: maintainer tail, backing blocks, comments and
// fenced blocks (prompt bodies, code) are not prose a student reads as slides.
function studentBody(md) {
  const i = md.indexOf('<!-- maintainer -->');
  if (i >= 0) md = md.slice(0, i);
  return md
    .replace(/<!-- backing[\s\S]*?<!-- \/backing -->/g, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/<svg[\s\S]*?<\/svg>/gi, '');
}

// Split one prose line into sentences. Splits after . ! ? (optionally closed by
// a quote, bracket or emphasis mark) when the next word starts like a sentence.
function splitSentences(line) {
  const out = [];
  const re = /([.!?]["'”’)*_]*)\s+(?=["'“‘(*_]*[A-Z0-9])/g;
  let last = 0, m;
  while ((m = re.exec(line))) {
    const end = m.index + m[1].length;
    const piece = line.slice(last, end).trim();
    // "e.g." / "i.e." / "vs." are not sentence ends
    if (/\b(e\.g|i\.e|vs|etc|cf)\.$/i.test(piece)) continue;
    if (piece) out.push(piece);
    last = re.lastIndex;
  }
  const tail = line.slice(last).trim();
  if (tail) out.push(tail);
  return out;
}

function slugify(h) {
  return h.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// One file → rows. Chunks at `##`; a chunk's slide id is its <!--slide:id-->
// marker, else the heading slug. `forcedSlide` names a slide file's own id.
function parseFile(md, relPath, forcedSlide) {
  const rows = [];
  const body = studentBody(md);
  let slide = forcedSlide || null;
  let heading = null;
  let pos = 0;
  const lines = body.split('\n');
  for (let li = 0; li < lines.length; li++) {
    let line = lines[li];
    const marker = line.match(/<!--\s*slide:([a-z0-9-]+)\s*-->/);
    if (marker && !forcedSlide) { slide = marker[1]; continue; }
    line = line.replace(/<!--[\s\S]*?-->/g, '');
    if (!line.trim()) continue;
    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      if (h[1].length <= 2 && !forcedSlide) {
        heading = h[2].trim();
        slide = h[1].length === 2 ? slugify(heading) : null;
        pos = 0;
      }
      rows.push(row(relPath, slide, h[2].trim(), 'heading', pos++, li + 1));
      continue;
    }
    if (/^\s*\|/.test(line)) continue;                                   // tables
    if (/^\s*\{\{[^}]+\}\}\s*$/.test(line)) continue;                    // prompt / demo markers
    if (/^\s*\[[^\]]*\]\([^)]*\)\s*$/.test(line)) continue;              // include / link-only lines
    if (/^\s*</.test(line)) continue;                                    // raw html
    const isBullet = /^\s*([-*+]|\d+[.)])\s+/.test(line);
    const text = line.replace(/^\s*>\s?/, '').replace(/^\s*([-*+]|\d+[.)])\s+/, '').trim();
    for (const s of splitSentences(text)) {
      if (words(s).length < 2) continue;
      rows.push(row(relPath, slide, s, isBullet ? 'bullet' : 'prose', pos++, li + 1));
    }
  }
  return rows;
}

function row(file, slide, text, kind, pos, line) {
  return { id: sentenceId(text), text, file, slide, kind, pos, line, words: words(text).length };
}

// ── file set ────────────────────────────────────────────────────────────────

const INCLUDE_RE = /^\[[^\]]*\]\(((?:lectures|exercises)\/[^)#]+\.md)(?:#[^)]*)?\)\s*$/;
const SLIDE_RE = new RegExp(CR.SLIDE_FILE_RE.source, 'gm');

function trainingFiles(key) {
  const tr = CR.TRAININGS[key];
  if (!tr) throw new Error(`unknown training: ${key}`);
  const src = (tr.contentKey && CR.TRAININGS[tr.contentKey]) || tr;
  const dirKey = tr.contentKey || key;
  const order = [];
  const seen = new Set();
  const add = rel => { if (!seen.has(rel) && fs.existsSync(path.join(CUR, rel))) { seen.add(rel); order.push(rel); } };
  const mods = [...(src.prework ? [src.prework] : []), ...src.modules];
  for (const m of mods) {
    const slug = typeof m === 'string' ? m : m.slug;
    const rel = `trainings/${dirKey}/${slug}.md`;
    add(rel);
    if (!fs.existsSync(path.join(CUR, rel))) continue;
    for (const line of studentBody(fs.readFileSync(path.join(CUR, rel), 'utf8')).split('\n')) {
      const inc = line.match(INCLUDE_RE);
      if (inc) add(inc[1]);
    }
  }
  for (const s of src.supplementaries || []) add(`trainings/${dirKey}/supplementary/${s.slug}.md`);
  return order;
}

function buildLedger(key) {
  const files = trainingFiles(key);
  const rows = [];
  const slideUsers = new Map();   // slide id → [files including it]
  for (const rel of files) {
    const md = fs.readFileSync(path.join(CUR, rel), 'utf8');
    let m;
    SLIDE_RE.lastIndex = 0;
    while ((m = SLIDE_RE.exec(studentBody(md)))) {
      if (!slideUsers.has(m[2])) slideUsers.set(m[2], []);
      slideUsers.get(m[2]).push(rel);
    }
    rows.push(...parseFile(md, rel, null));
  }
  for (const [id, users] of slideUsers) {
    const rel = `slides/${id}.md`;
    const abs = path.join(CUR, rel);
    if (!fs.existsSync(abs)) continue;
    for (const r of parseFile(fs.readFileSync(abs, 'utf8'), rel, id)) rows.push({ ...r, usedBy: users });
  }
  return { training: key, files: files.length, slideFiles: slideUsers.size, rows };
}

// ── reports ─────────────────────────────────────────────────────────────────

// Exact duplicates: one id in two or more source files.
function exactDupes(rows, minWords = 4) {
  const by = new Map();
  for (const r of rows) {
    if (r.kind === 'heading' || r.words < minWords) continue;
    if (!by.has(r.id)) by.set(r.id, []);
    by.get(r.id).push(r);
  }
  return [...by.values()]
    .filter(g => new Set(g.map(r => r.file)).size > 1)
    .sort((a, b) => b[0].words - a[0].words);
}

// Near duplicates: different ids, token-set Jaccard >= threshold, in
// different files. Candidates come from shared rare tokens, so this stays fast.
function nearDupes(rows, threshold = 0.8, minWords = 8) {
  const pool = rows.filter(r => r.kind !== 'heading' && r.words >= minWords);
  const uniq = new Map();
  for (const r of pool) if (!uniq.has(r.id)) uniq.set(r.id, r);
  const items = [...uniq.values()].map(r => ({ r, t: new Set(words(r.text)) }));
  const df = new Map();
  for (const it of items) for (const w of it.t) df.set(w, (df.get(w) || 0) + 1);
  const inv = new Map();
  items.forEach((it, i) => { for (const w of it.t) if (df.get(w) <= 40) { if (!inv.has(w)) inv.set(w, []); inv.get(w).push(i); } });
  const pairs = [];
  const done = new Set();
  items.forEach((a, i) => {
    const cand = new Set();
    for (const w of a.t) for (const j of inv.get(w) || []) if (j > i) cand.add(j);
    for (const j of cand) {
      const b = items[j];
      if (a.r.file === b.r.file) continue;
      let inter = 0;
      for (const w of a.t) if (b.t.has(w)) inter++;
      const jac = inter / (a.t.size + b.t.size - inter);
      const k = a.r.id + b.r.id;
      if (jac >= threshold && jac < 1 && !done.has(k)) { done.add(k); pairs.push({ score: jac, a: a.r, b: b.r }); }
    }
  });
  return pairs.sort((x, y) => y.score - x.score);
}

// Resolve a quoted sentence (as a simulated student logs it) to ledger rows.
// Exact id first; else best token overlap, optionally inside one slide.
function findQuote(rows, quote, slide) {
  const id = sentenceId(quote);
  const scope = slide ? rows.filter(r => r.slide === slide) : rows;
  const exact = scope.filter(r => r.id === id);
  if (exact.length) return { match: 'exact', score: 1, rows: exact };
  const q = new Set(words(quote));
  let best = null;
  for (const r of scope) {
    const t = new Set(words(r.text));
    let inter = 0;
    for (const w of q) if (t.has(w)) inter++;
    const score = inter / (q.size + t.size - inter);
    if (!best || score > best.score) best = { score, rows: [r] };
    else if (score === best.score) best.rows.push(r);
  }
  return best && best.score >= 0.5 ? { match: 'fuzzy', ...best } : { match: 'none', score: best ? best.score : 0, rows: [] };
}

module.exports = { normalise, sentenceId, splitSentences, parseFile, trainingFiles, buildLedger, exactDupes, nearDupes, findQuote };

// ── CLI ─────────────────────────────────────────────────────────────────────

if (require.main === module) {
  const argv = process.argv.slice(2);
  const val = n => { const i = argv.indexOf('--' + n); return i >= 0 ? argv[i + 1] : null; };
  const key = val('training') || 'agents-101';
  const L = buildLedger(key);
  const loc = r => `${r.file}${r.slide ? '#' + r.slide : ''}:${r.line}`;

  if (argv.includes('--json')) {
    process.stdout.write(JSON.stringify(L, null, 1) + '\n');
  } else if (val('find') != null) {
    const res = findQuote(L.rows, val('find'), val('slide'));
    console.log(JSON.stringify({ match: res.match, score: +res.score.toFixed(2), rows: res.rows.map(r => ({ id: r.id, at: loc(r), text: r.text })) }, null, 1));
    process.exit(res.match === 'none' ? 1 : 0);
  } else if (argv.includes('--dupes')) {
    const ex = exactDupes(L.rows);
    console.log(`# Duplicate sentences: ${key}\n\n## Exact (${ex.length} sentences in more than one file)\n`);
    for (const g of ex) {
      console.log(`- ${g[0].id} (${g[0].words} words): "${g[0].text}"`);
      for (const r of g) console.log(`  - ${loc(r)}`);
    }
    if (argv.includes('--near')) {
      const nd = nearDupes(L.rows, Number(val('threshold') || 0.8));
      console.log(`\n## Near (${nd.length} pairs, different files)\n`);
      for (const p of nd) {
        console.log(`- ${p.score.toFixed(2)}`);
        console.log(`  - ${loc(p.a)}: "${p.a.text}"`);
        console.log(`  - ${loc(p.b)}: "${p.b.text}"`);
      }
    }
  } else {
    const prose = L.rows.filter(r => r.kind !== 'heading');
    const uniq = new Set(prose.map(r => r.id)).size;
    const long = prose.filter(r => r.words > 25).length;
    const dash = prose.filter(r => r.text.includes('—')).length;
    console.log(`${key}: ${L.files} files + ${L.slideFiles} slide files`);
    console.log(`  ${prose.length} sentences (${uniq} distinct), ${L.rows.length - prose.length} headings`);
    console.log(`  ${exactDupes(L.rows).length} sentences appear in more than one file`);
    console.log(`  ${long} over 25 words, ${dash} with an em dash`);
  }
}
