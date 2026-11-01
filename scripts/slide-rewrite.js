#!/usr/bin/env node
'use strict';
// slide-rewrite.js — whole-slide rewrite pass against the maintainer's language rules.
//
// Each unit is one `##` chunk of a module file, lecture or exercise, or one slide
// file. Structure is frozen: headings, slide markers, includes, Session widgets,
// prompt fences, tables, HTML comments and everything below `<!-- maintainer -->`
// become numbered placeholders the model must return in order. Sentences quoted
// in the file's maintainer block, locked sentences and calls-page lines must
// survive verbatim. The model mostly cuts (curriculum/language/rewrite-rules.md).
//
//   --propose  writes <out>/<module>.json: per unit, before/after/unsure
//   --apply    writes accepted units back into the files
//
// Usage:
//   node scripts/slide-rewrite.js --propose --modules security --out dir [--jobs 8] [--limit N]
//   node scripts/slide-rewrite.js --apply dir/security.json [--skip-unsure]

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { trainingFiles, normalise } = require('./sentence-ledger.js');
const { moduleOf } = require('./language-report.js');
const { isProtected } = require('./sentence-step.js');

const ROOT = path.resolve(__dirname, '..');
const CUR = path.join(ROOT, 'curriculum');
const RULES = fs.readFileSync(path.join(CUR, 'language/rewrite-rules.md'), 'utf8');
const TRAINING = 'agents-101';

// --- structure -------------------------------------------------------------

const FROZEN_LINE = [
  /^\s*#{1,6}\s/,                       // headings keep anchors stable
  /^\s*<!--.*-->\s*$/,                  // slide markers, comments
  /^\s*\[[^\]]+\]\([^)]+\)\s*$/,        // include / standalone link lines
  /\*\*Session\*\*/,                    // session widget
  /\{\{prompt:[^}]+\}\}/,               // registry prompt
  /^\s*\|/,                             // table rows
  /class="rt-/,                         // runtime-specific spans
  /^\s*([-*]|\d+\.)\s.*https?:\/\//,     // source bullets with a URL
  /^\s*\*[^*]*\d+\s*min[^*]*\*\s*$/i,   // timing labels
];

// Split a file into units. Returns { units: [{start, end, heading}], tailStart }.
function units(lines) {
  let tail = lines.findIndex(l => l.trim() === '<!-- maintainer -->');
  if (tail < 0) tail = lines.length;
  const starts = [];
  let fence = false;
  for (let i = 0; i < tail; i++) {
    if (/^\s*(```|~~~)/.test(lines[i])) fence = !fence;
    if (!fence && /^##\s/.test(lines[i])) starts.push(i);
  }
  if (!starts.length || starts[0] > 0) starts.unshift(0);
  return starts.map((s, k) => ({ start: s, end: k + 1 < starts.length ? starts[k + 1] : tail, heading: (lines[s].match(/^#+\s+(.*)/) || [, ''])[1] }));
}

// Replace frozen lines (and whole fenced blocks) with ⟦n⟧ placeholders.
function freeze(chunk) {
  const out = []; const frozen = [];
  let i = 0;
  while (i < chunk.length) {
    const l = chunk[i];
    if (/^\s*(```|~~~)/.test(l)) {
      let j = i + 1;
      while (j < chunk.length && !/^\s*(```|~~~)/.test(chunk[j])) j++;
      frozen.push(chunk.slice(i, j + 1).join('\n'));
      out.push(`⟦${frozen.length}⟧`);
      i = j + 1; continue;
    }
    if (FROZEN_LINE.some(re => re.test(l))) { frozen.push(l); out.push(`⟦${frozen.length}⟧`); i++; continue; }
    out.push(l); i++;
  }
  return { text: out.join('\n'), frozen };
}

function thaw(text, frozen) {
  return text.replace(/⟦(\d+)⟧/g, (_, n) => frozen[Number(n) - 1]);
}

// --- protected sentences ---------------------------------------------------

function locks() {
  const f = path.join(CUR, 'language/locked-sentences.json');
  return fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')).locks.map(l => normalise(l.text || l.sentence || '')) : [];
}

function keepList(file, text) {
  const { splitSentences } = require('./sentence-ledger.js');
  const sents = splitSentences(text.replace(/⟦\d+⟧/g, ' '));
  const lk = locks();
  return sents.filter(s => {
    const n = normalise(s);
    return n.split(' ').length >= 3 && (isProtected(file, s) || lk.includes(n));
  });
}

// --- model -----------------------------------------------------------------

function prompt(u) {
  return `You are editing Agents 101, a hands-on training for business professionals (CEOs, CFOs, product and HR leads) who already use LLMs and are learning to build their own agents with Claude Code. The maintainer rates the current language 3 out of 5. Your job: bring this one unit to 4+ by his rules below. Most fixes are CUTS of whole sentences; rewrite a sentence only when a rule names the fix. Keep the meaning, every instruction, every number, every reason for a step. Never add new claims or new content. The result must be shorter or equal in length.

${RULES}

Module: ${u.module}. ${u.moduleIdea ? 'Big idea: ' + u.moduleIdea : ''}
${u.learnings ? 'Key points the students must carry away from this module (do not cut the sentences that carry them):\n' + u.learnings + '\n' : ''}
File: ${u.file}

The unit before this one, for referents only (do not edit):
<<<
${u.prev || '(none)'}
>>>

Lines like ⟦3⟧ are frozen structure (headings, includes, prompts, widgets). Return every one of them exactly once, in the same order, on its own line.
${u.keep.length ? 'These sentences are the maintainer\'s and must appear verbatim:\n' + u.keep.map(s => '- ' + s).join('\n') + '\n' : ''}
The unit to edit:
<<<
${u.text}
>>>

Word budget for the prose of this unit (frozen lines do not count): at most ${u.budget} words. It now has ${u.words}.

Answer with JSON only: {"text":"<the edited unit>","unsure":"<leave empty unless a cut removed one of the key points above or an instruction the student needs; then name it in one sentence>"}.`;
}

function ask(text) {
  return new Promise(res => {
    const p = spawn('claude', ['-p', '--output-format', 'text'], { cwd: require('os').tmpdir() });
    let out = '';
    p.stdout.on('data', d => { out += d; });
    p.on('close', () => {
      const m = out.match(/\{[\s\S]*\}/);
      try { res(JSON.parse(m[0])); } catch { res(null); }
    });
    p.stdin.end(text);
  });
}

function validate(before, after, frozenCount, keep) {
  const ph = (after.match(/⟦(\d+)⟧/g) || []).map(s => Number(s.slice(1, -1)));
  const want = Array.from({ length: frozenCount }, (_, i) => i + 1);
  if (JSON.stringify(ph) !== JSON.stringify(want)) return 'placeholders changed';
  if (/—/.test(after) && !/—/.test(before)) return 'em-dash added';
  const w = s => s.replace(/⟦\d+⟧/g, '').split(/\s+/).filter(Boolean).length;
  if (w(after) > w(before) + 2) return 'grew';
  const na = normalise(after);
  for (const k of keep) if (!na.includes(normalise(k).replace(/[.!?"']+$/, ''))) return 'protected sentence lost: ' + k;
  return null;
}

// --- module context --------------------------------------------------------

function moduleContext(mod) {
  const spec = path.join(CUR, 'evals/mechanical/persona-student/modules', mod + '.json');
  const learnings = fs.existsSync(spec) ? JSON.parse(fs.readFileSync(spec, 'utf8')).intended_learnings.map(l => `- ${l.text}`).join('\n') : '';
  const page = path.join(CUR, 'trainings', TRAINING, mod + '.md');
  const idea = fs.existsSync(page) ? ((fs.readFileSync(page, 'utf8').match(/## Big Idea\n+([^\n]+)/) || [])[1] || '') : '';
  return { learnings, idea };
}

function moduleFiles(mod) {
  const { map } = moduleOf(TRAINING);
  const files = new Set();
  for (const rel of trainingFiles(TRAINING)) if (map.get(rel) === mod) files.add(rel);
  // slide files included by those files
  for (const rel of [...files]) {
    const md = fs.readFileSync(path.join(CUR, rel), 'utf8');
    for (const m of md.matchAll(/\]\((slides\/[^)]+\.md)\)/g)) files.add(m[1]);
  }
  return [...files];
}

async function propose(mod, opts) {
  const ctx = moduleContext(mod);
  const jobs = [];
  for (const file of moduleFiles(mod)) {
    const lines = fs.readFileSync(path.join(CUR, file), 'utf8').split('\n');
    let prev = '';
    for (const u of units(lines)) {
      const chunk = lines.slice(u.start, u.end);
      const { text, frozen } = freeze(chunk);
      const prose = text.replace(/⟦\d+⟧/g, '').trim();
      const before = chunk.join('\n');
      if (prose.split(/\s+/).length >= 12) {
        const words = prose.split(/\s+/).length;
        const budget = Math.max(20, Math.min(Math.round(words * opts.ratio), file.startsWith('exercises/') ? 160 : 110));
        jobs.push({ words, budget, module: mod, moduleIdea: ctx.idea, learnings: ctx.learnings, file, start: u.start, end: u.end, heading: u.heading, before, text, frozen, prev, keep: keepList(file, text) });
      }
      prev = before;
    }
  }
  const todo = opts.limit ? jobs.slice(0, opts.limit) : jobs;
  let next = 0, done = 0;
  async function worker() {
    while (next < todo.length) {
      const j = todo[next++];
      let ans = await ask(prompt(j));
      let err = !ans || typeof ans.text !== 'string' ? 'no answer' : validate(j.text, ans.text, j.frozen.length, j.keep);
      if (err && err !== 'grew') { ans = await ask(prompt(j)); err = !ans || typeof ans.text !== 'string' ? 'no answer' : validate(j.text, ans.text, j.frozen.length, j.keep); }
      j.after = err ? null : thaw(ans.text.replace(/\s+$/, ''), j.frozen);
      j.unsure = ans && ans.unsure || '';
      j.error = err;
      j.changed = !!j.after && normalise(j.after) !== normalise(j.before);
      process.stderr.write(`${++done}/${todo.length} ${j.file}#${j.heading}: ${err || (j.changed ? 'changed' : 'same')}\n`);
    }
  }
  await Promise.all(Array.from({ length: opts.jobs }, worker));
  return todo.map(({ text, frozen, prev, moduleIdea, learnings, ...rest }) => rest);
}

function apply(plan, opts) {
  const byFile = new Map();
  for (const u of plan) {
    if (!u.changed || !u.after) continue;
    if (opts.skipUnsure && u.unsure) continue;
    if (!byFile.has(u.file)) byFile.set(u.file, []);
    byFile.get(u.file).push(u);
  }
  const misses = [];
  for (const [file, us] of byFile) {
    const abs = path.join(CUR, file);
    let lines = fs.readFileSync(abs, 'utf8').split('\n');
    for (const u of us.sort((a, b) => b.start - a.start)) {
      const cur = lines.slice(u.start, u.end).join('\n');
      if (cur !== u.before) { misses.push(`${file}#${u.heading}`); continue; }
      let after = u.after.replace(/\n{3,}/g, '\n\n');
      // keep the unit's trailing blank line so the next heading stays separated
      if (u.before.endsWith('\n') && !after.endsWith('\n')) after += '\n';
      lines.splice(u.start, u.end - u.start, ...after.split('\n'));
    }
    fs.writeFileSync(abs, lines.join('\n'));
  }
  return misses;
}

module.exports = { units, freeze, thaw, validate, moduleFiles };

if (require.main === module) {
  const argv = process.argv.slice(2);
  const val = (n, d) => { const i = argv.indexOf('--' + n); return i >= 0 ? argv[i + 1] : d; };
  if (argv.includes('--propose')) {
    const out = val('out'); fs.mkdirSync(out, { recursive: true });
    (async () => {
      for (const mod of val('modules').split(',')) {
        const plan = await propose(mod, { jobs: Number(val('jobs', 8)), limit: Number(val('limit', 0)), ratio: Number(val('ratio', 0.6)) });
        fs.writeFileSync(path.join(out, mod + '.json'), JSON.stringify(plan, null, 1) + '\n');
      }
    })();
  } else if (val('apply')) {
    const misses = apply(JSON.parse(fs.readFileSync(val('apply'), 'utf8')), { skipUnsure: argv.includes('--skip-unsure') });
    if (misses.length) { console.error('changed since propose:\n' + misses.join('\n')); process.exit(1); }
  } else {
    console.error('usage: --propose --modules a,b --out dir | --apply plan.json');
    process.exit(2);
  }
}
