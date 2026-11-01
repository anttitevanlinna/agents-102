#!/usr/bin/env node
'use strict';
// damage-target.js — the sanity copy for this measure: every beat that states or teaches the
// module's target idea is removed, and generic padding takes the space. If students still state
// the target from this copy, the measure is not reading the module.
//
//   node damage-target.js --module security --page student-view.md --out damaged.md [--carriers ids.json]
// A judge picks the carrier beats once (cached in --carriers, default <out>.carriers.json);
// the Big Idea beat always goes.
const fs = require('fs');
const path = require('path');
const { beats } = require('../mechanical/persona-student/lib');
const { askAsync, args } = require('./lib');

const a = args();
const t = JSON.parse(fs.readFileSync(path.join(__dirname, 'targets.json'), 'utf8')).modules.find((m) => m.module === a.module);
const bs = beats(fs.readFileSync(a.page, 'utf8'));
const cache = a.carriers || `${a.out}.carriers.json`;
const PAD = [
  'This is a rapidly evolving area, and organisations of every size are working out how best to approach it. It is important to involve the right stakeholders early, to follow best practices, and to keep iterating as the landscape changes.',
  'Industry analysts expect agent adoption to accelerate significantly over the coming years. Leading companies are investing in enablement programmes, champions networks and training, and the ones that start early will be best placed.',
  'Remember that success with AI is everyone\'s responsibility. Clear communication, strong sponsorship and regular follow-up remain the foundation, and agents are simply one more area where those principles apply.',
];

(async () => {
  let ids;
  if (fs.existsSync(cache)) ids = JSON.parse(fs.readFileSync(cache, 'utf8'));
  else {
    const r = await askAsync(`Below is one training module split into beats. The module's target idea is:
"${t.target}"
List every beat that states this idea, names it, or is the step where the student discovers or practises it. Do not list beats that only set up other ideas.
${bs.map((b) => `=== ${b.id} ===\n## ${b.heading}\n${b.body}`).join('\n\n')}
Answer with one json block: {"carriers": [beat ids]}`, 'sonnet');
    ids = [...new Set([...(r.carriers || []), ...bs.filter((b) => /\/big-idea$/.test(b.id)).map((b) => b.id)])].filter((id) => bs.some((b) => b.id === id));
    fs.writeFileSync(cache, JSON.stringify(ids, null, 2));
  }
  let p = 0; const out = [];
  for (const b of bs) {
    if (ids.includes(b.id)) { out.push(`${b.id.includes('/') ? '##' : '#'} A note on context ${p + 1}\n\n${PAD[p++ % PAD.length]}`); continue; } // heading goes too: it can state the idea
    out.push(`${b.id.includes('/') ? '##' : '#'} ${b.heading}\n\n${b.body}`);
  }
  fs.writeFileSync(a.out, out.join('\n\n') + '\n');
  console.log(`[damage-target] ${a.module}: ${ids.length}/${bs.length} beats replaced by padding (${ids.map((i) => i.split('/').pop()).join(', ')}) → ${a.out}`);
})();
