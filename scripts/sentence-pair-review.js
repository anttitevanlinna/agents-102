#!/usr/bin/env node
'use strict';
// sentence-pair-review.js — the test step of the language loop: a reviewer
// compares two versions of one slide blind and picks the one a student is
// better served by. Run against a calibration set first (the maintainer's own
// past calls) to learn how far its picks can be trusted.
//
// Each pair is judged twice with the sides swapped. A pick counts only when
// both orders agree; a flip is position noise and is reported as such.
//
// Usage:
//   node scripts/sentence-pair-review.js --pairs <blind.jsonl> --out <picks.jsonl>
//        [--mode reader|rules] [--model <m>] [--jobs 6] [--limit N]
//   reader = a student's read only (enjoyment, felt learning)
//   rules  = the same, plus curriculum/writing-style.md in the prompt
//   taste  = the same, plus curriculum/taste-notes.md in the prompt
//   [--examples <jsonl of {kept, rejected, why}>] past calls shown first (hold them out of --pairs)
//   [--ids <file>] judge only these pair ids
// Output rows: {id, pick: "a"|"b"|null, first, second, reasons}

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const ROOT = path.resolve(__dirname, '..');

const READER = `You are a participant in a hands-on agents course. You already use LLMs and agents at work. You are reading one slide alone, with no trainer talking over it.

Below are two versions of the same slide, X and Y. They differ only in some wording. Decide which version you would rather meet in the course, judged on two things:
- Enjoyment: which one you would read with more pleasure and attention.
- Felt learning: which one leaves you with something you would actually tell a colleague you learned, stated truly and clearly.

Shorter is not automatically better, and a change is not automatically an improvement. Pick the version a good, demanding editor of this course would keep.`;

function prompt(mode, x, y, examples = []) {
  let p = READER;
  if (mode === 'rules') p += '\n\nThe course writing style, for reference:\n\n' + fs.readFileSync(path.join(ROOT, 'curriculum/writing-style.md'), 'utf8');
  if (mode === 'taste') p += '\n\nThe course editor\'s own taste notes, from past decisions:\n\n' + fs.readFileSync(path.join(ROOT, 'curriculum/taste-notes.md'), 'utf8');
  if (examples.length) {
    p += '\n\nPast calls by the course editor on other slides, with the reason:';
    examples.forEach((e, i) => { p += `\n\n--- Example ${i + 1}: KEPT ---\n${e.kept}\n--- Example ${i + 1}: REJECTED ---\n${e.rejected}\nWhy: ${e.why}`; });
  }
  return `${p}\n\n=== VERSION X ===\n${x}\n\n=== VERSION Y ===\n${y}\n\nAnswer with one line of JSON only: {"pick":"X" or "Y","why":"<one sentence>"}`;
}

function ask(text, model) {
  return new Promise(resolve => {
    const args = ['-p', '--output-format', 'text'];
    if (model) args.push('--model', model);
    const ch = spawn('claude', args, { cwd: require('os').tmpdir(), stdio: ['pipe', 'pipe', 'pipe'] });
    let out = '';
    ch.stdout.on('data', d => (out += d));
    ch.on('close', () => {
      const m = out.match(/\{[^{}]*"pick"\s*:\s*"([XY])"[^{}]*\}/);
      let why = '';
      try { why = JSON.parse(m[0]).why; } catch { /* keep empty */ }
      resolve(m ? { pick: m[1], why } : { pick: null, why: out.slice(0, 200) });
    });
    ch.stdin.end(text);
  });
}

async function reviewPair(pair, mode, model, examples) {
  const [r1, r2] = await Promise.all([ask(prompt(mode, pair.a, pair.b, examples), model), ask(prompt(mode, pair.b, pair.a, examples), model)]);
  const first = r1.pick === 'X' ? 'a' : r1.pick === 'Y' ? 'b' : null;
  const second = r2.pick === 'X' ? 'b' : r2.pick === 'Y' ? 'a' : null;
  return { id: pair.id, pick: first && first === second ? first : null, first, second, reasons: [r1.why, r2.why] };
}

async function main() {
  const argv = process.argv.slice(2);
  const val = (n, d) => { const i = argv.indexOf('--' + n); return i >= 0 ? argv[i + 1] : d; };
  const readJsonl = f => fs.readFileSync(f, 'utf8').trim().split('\n').map(JSON.parse);
  const only = val('ids') ? new Set(fs.readFileSync(val('ids'), 'utf8').split(/\s+/).filter(Boolean)) : null;
  const pairs = readJsonl(val('pairs')).filter(p => !only || only.has(p.id)).slice(0, Number(val('limit', 1e9)));
  // --examples: jsonl of {kept, rejected, why}; never pass a pair that is also being judged
  const examples = val('examples') ? readJsonl(val('examples')) : [];
  const mode = val('mode', 'reader');
  const model = val('model', null);
  const jobs = Number(val('jobs', 6));
  const out = [];
  let next = 0;
  async function worker() {
    while (next < pairs.length) {
      const p = pairs[next++];
      const r = await reviewPair(p, mode, model, examples);
      out.push(r);
      process.stderr.write(`${out.length}/${pairs.length} ${r.id} ${r.pick || 'flip'}\n`);
    }
  }
  await Promise.all(Array.from({ length: jobs }, worker));
  fs.writeFileSync(val('out'), out.map(r => JSON.stringify(r)).join('\n') + '\n');
}

module.exports = { prompt };
if (require.main === module) main();
