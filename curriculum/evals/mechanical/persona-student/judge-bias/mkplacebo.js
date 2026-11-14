#!/usr/bin/env node
'use strict';
// mkplacebo.js — pairs where neither side is better, to see what the taste judge does when there is no taste call.
//
//   node mkplacebo.js --pages m1.md,m2.md,... --out DIR [--per 4]
// From each student-view page, --per prose slides (60-220 words, no code or prompt blocks). One Sonnet call per
// slide picks one ordinary sentence and writes two neutral rewrites of it (same meaning, same length, same
// register, nothing better or worse). Pair sets, each with blind / swapped / key files like build-pairs.py:
//   same    original vs original (identical): which letter it defaults to
//   para    original vs rewrite 1: does it prefer the original wording just for being the original?
//   para2   rewrite 1 vs rewrite 2: two neutral rewrites, a pure coin; its split rate is the noise floor
//   swap    original vs the same slide with two adjacent sentences swapped (no change in content)
// Key field "orig_is" names the original side; for para2 it names rewrite 1.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { beats } = require('../lib');
const { askAsync, pool, args } = require('../../../teaching/lib');

const a = args(); const OUT = a.out; fs.mkdirSync(OUT, { recursive: true });
const PER = Number(a.per || 4);
const h = (s) => crypto.createHash('sha256').update(s).digest('hex');
const sentences = (t) => t.match(/[^.!?\n]+[.!?]+(?=\s|$)/g) || [];
const slides = [];
for (const f of String(a.pages).split(',')) {
  const ok = beats(fs.readFileSync(f, 'utf8')).filter((b) => {
    const w = b.body.split(/\s+/).length;
    return b.id.includes('/') && w >= 60 && w <= 220 && !/```|\{\{prompt|<figure|^\s*\|/m.test(b.body) && sentences(b.body).length >= 4;
  }).sort((x, y) => (h(x.id) < h(y.id) ? -1 : 1)).slice(0, PER);
  slides.push(...ok.map((b) => ({ id: b.id, text: `## ${b.heading}\n\n${b.body}` })));
}

(async () => {
  const rows = (await pool(slides, async (s) => {
    try {
      const r = await askAsync(`Below is one slide from a training. Pick ONE ordinary sentence from its body (not the heading, not the first sentence, not a list item), copy it exactly, and write two different neutral rewrites of it.
A neutral rewrite says exactly the same thing at the same length (within two words), in the same plain register. It is neither better nor worse: no sharper verb, no added example, no cut clause, no new rhythm or punchline. A careful editor should have no preference between the three.

${s.text}

Answer with one json block: {"sentence": "exact copy", "rewrite1": "...", "rewrite2": "..."}`, 'sonnet');
      if (!r.sentence || s.text.split(r.sentence).length !== 2) return null;
      const sw = sentences(s.text.split('\n').slice(2).join('\n'));
      let swapped = null;
      for (let i = 1; i + 1 < sw.length && !swapped; i++) { // swap two adjacent sentences within one paragraph
        const x = sw[i].trim(), y = sw[i + 1].trim(), both = `${x} ${y}`;
        if (s.text.split(both).length === 2) swapped = s.text.replace(both, `${y} ${x}`);
      }
      return { ...s, para1: s.text.replace(r.sentence, r.rewrite1), para2: s.text.replace(r.sentence, r.rewrite2), swapped, sentence: r.sentence, rewrite1: r.rewrite1, rewrite2: r.rewrite2 };
    } catch (e) { return null; }
  })).filter(Boolean);
  const sets = { same: [], para: [], para2: [], swap: [] };
  const rng = (s) => parseInt(h(s).slice(0, 8), 16) % 2 === 0;
  const add = (set, id, orig, other) => {
    const flip = rng(set + id); const pid = `${set}:${id}`;
    sets[set].push({ blind: { id: pid, a: flip ? other : orig, b: flip ? orig : other }, key: { id: pid, orig_is: flip ? 'b' : 'a' } });
  };
  for (const r of rows) {
    add('same', r.id, r.text, r.text);
    add('para', r.id, r.text, r.para1);
    add('para2', r.id, r.para1, r.para2);
    if (r.swapped) add('swap', r.id, r.text, r.swapped);
  }
  const w = (f, xs) => fs.writeFileSync(path.join(OUT, f), xs.map((x) => JSON.stringify(x)).join('\n') + '\n');
  for (const [k, v] of Object.entries(sets)) {
    w(`${k}.blind.jsonl`, v.map((x) => x.blind)); w(`${k}.key.jsonl`, v.map((x) => x.key));
    w(`${k}.swapped.jsonl`, v.map((x) => ({ ...x.blind, a: x.blind.b, b: x.blind.a })));
  }
  w('rewrites.jsonl', rows.map(({ id, sentence, rewrite1, rewrite2 }) => ({ id, sentence, rewrite1, rewrite2 })));
  console.log(`[placebo] ${rows.length} slides → ${Object.entries(sets).map(([k, v]) => `${k} ${v.length}`).join(', ')}`);
})();
