#!/usr/bin/env node
'use strict';
// mkdmg-modules.js: damaged-copy check for all 8 Agents 101 modules. From each module file, 3 slides
// (seeded pick among body `##` chunks of 40-220 words). Each slide gets 4 damaged copies:
// putdown / narrator / witty (one sentence rewritten at ~equal length) and cut-concrete (the slide's
// most concrete sentence removed: example, number, command, named tool). The judge must prefer the original.
//   node mkdmg-modules.js OUTDIR   (run from persona-student/)
const fs = require('fs'); const path = require('path');
const { askJson } = require(process.cwd() + '/lib');
const OUT = process.argv[2];
const ROOT = path.resolve(process.cwd(), '../../../..');
const MODULES = ['getting-going', 'output-quality', 'security', 'evaluations', 'building-agent-systems',
  'multi-agent-systems', 'personal-to-team', 'agents-building-agents'];
let seed = 20261101; const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
const KINDS = {
  putdown: 'a light put-down of how people or teams usually do this today, or of the reader\'s current way of working',
  narrator: 'a narrator sentence telling the reader what they just felt or experienced',
  witty: 'an off-hand witty one-liner or rhetorical flourish that sounds clever but adds nothing',
};
const slides = [];
for (const m of MODULES) {
  let t = fs.readFileSync(path.join(ROOT, 'curriculum/trainings/agents-101', m + '.md'), 'utf8');
  t = t.replace(/^---\n[\s\S]*?\n---\n/, ''); const cut = t.indexOf('\n<!--'); if (cut >= 0) t = t.slice(0, cut);
  const ch = t.split(/\n(?=## )/).map((s) => s.trim()).filter((s) => s.startsWith('## ') && !/\{\{prompt:/.test(s))
    .filter((s) => { const w = s.split(/\s+/).length; return w >= 40 && w <= 220; });
  const pick = [];
  while (pick.length < Math.min(3, ch.length)) { const i = Math.floor(rnd() * ch.length); if (!pick.includes(i)) pick.push(i); }
  pick.forEach((i, n) => slides.push({ id: `${m}-${n}`, module: m, text: ch[i] }));
}
const res = askJson(`For each slide below, produce FOUR edits.
1-3. For each kind, pick ONE existing plain sentence in the slide body (not the heading) and rewrite it so it carries the same information but also becomes: ${Object.entries(KINDS).map(([k, v]) => `[${k}] ${v}`).join('; ')}. Keep the rewrite within 4 words of the original length.
4. [cut-concrete] Name the slide's single most concrete sentence: the one carrying an example, a number, a command, a named tool or a specific action. It will be deleted.
Copy every original sentence EXACTLY as it appears.

${slides.map((s) => `### SLIDE ${s.id}\n${s.text}`).join('\n\n')}

Answer with one json block: {"edits":[{"slide":"<id>","kind":"putdown"|"narrator"|"witty"|"cut-concrete","original":"exact sentence","rewrite":"... (empty for cut-concrete)"}...four per slide]}`, { model: 'sonnet' });
const blind = [], key = [];
for (const e of res.edits || []) {
  const s = slides.find((x) => x.id === e.slide); if (!s || !e.original || !s.text.includes(e.original)) continue;
  const dam = e.kind === 'cut-concrete' ? s.text.replace(e.original, '').replace(/[ \t]+\n/g, '\n').replace(/\n- *\n/g, '\n') : s.text.replace(e.original, e.rewrite);
  if (dam === s.text) continue;
  const id = `md-${s.id}-${e.kind}`; const ab = rnd() < 0.5;
  blind.push({ id, a: ab ? s.text : dam, b: ab ? dam : s.text });
  key.push({ id, answer: ab ? 'a' : 'b', module: s.module, kind: e.kind, original: e.original, rewrite: e.rewrite || '' });
}
const w = (f, rows) => fs.writeFileSync(path.join(OUT, f), rows.map((x) => JSON.stringify(x)).join('\n') + '\n');
w('dmg.blind.jsonl', blind); w('dmg.swapped.jsonl', blind.map((x) => ({ ...x, a: x.b, b: x.a }))); w('dmg.key.jsonl', key);
console.log(`${slides.length} slides, ${blind.length} damaged pairs`);
