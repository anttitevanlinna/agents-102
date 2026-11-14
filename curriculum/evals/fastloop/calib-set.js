#!/usr/bin/env node
'use strict';
// calib-set.js — the edits the fast loop is judged on: graded damage (known ordering) + placebos (must not move).
//
//   node calib-set.js --module security --page v0.md --carriers carriers.json --out DIR
// Writes DIR/<module>~<edit>.md for:
//   dose33, dose67, dose100  Big Idea carrier beats (damage-target.js carriers) replaced by generic padding,
//                            a third / two thirds / all of them. Known order: v0 >= dose33 >= dose67 >= dose100.
//   p-pad    one non-carrier beat of similar length replaced by the same padding (does damage there move it?)
//   p-swap   two adjacent non-carrier beats swapped
//   p-para   one non-carrier beat paraphrased by a model, same content and length
// Placebos should not move the number; how often they "move" it at a threshold = the false-alarm rate.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { beats } = require('../mechanical/persona-student/lib');
const { askAsync, args } = require('../teaching/lib');

const a = args();
const bs = beats(fs.readFileSync(a.page, 'utf8'));
const carriers = JSON.parse(fs.readFileSync(a.carriers, 'utf8')).filter((id) => bs.some((b) => b.id === id));
const PAD = [
  'This is a rapidly evolving area, and organisations of every size are working out how best to approach it. It is important to involve the right stakeholders early, to follow best practices, and to keep iterating as the landscape changes.',
  'Industry analysts expect agent adoption to accelerate significantly over the coming years. Leading companies are investing in enablement programmes, champions networks and training, and the ones that start early will be best placed.',
  'Remember that success with AI is everyone\'s responsibility. Clear communication, strong sponsorship and regular follow-up remain the foundation, and agents are simply one more area where those principles apply.',
];
const h = (s) => crypto.createHash('sha256').update(s).digest('hex');
const hashOrder = carriers.slice().sort((x, y) => (h(x) < h(y) ? -1 : 1)); // fixed, content-independent pick
const render = (list) => list.map((b) => `${b.id.includes('/') ? '##' : '#'} ${b.heading}\n\n${b.body}`).join('\n\n') + '\n';
function padded(ids) {
  let p = 0;
  return render(bs.map((b) => (ids.includes(b.id) ? { id: b.id, heading: `A note on context ${p + 1}`, body: PAD[p++ % PAD.length] } : b)));
}
const out = (name, text) => { fs.writeFileSync(path.join(a.out, `${a.module}~${name}.md`), text); console.log(`[calib] ${a.module}~${name}`); };
fs.mkdirSync(a.out, { recursive: true });

(async () => {
  const n = hashOrder.length;
  out('dose33', padded(hashOrder.slice(0, Math.max(1, Math.round(n / 3)))));
  out('dose67', padded(hashOrder.slice(0, Math.max(2, Math.round(2 * n / 3)))));
  out('dose100', padded(hashOrder));
  // Non-carrier body beats with real content, never the module cover or Key Concepts.
  const free = bs.map((b, i) => ({ ...b, i })).filter((b) => !carriers.includes(b.id) && b.id.includes('/') && b.body.length > 300 && !/key-concepts|big-idea/.test(b.id));
  if (free.length < 3) throw new Error('too few non-carrier beats for placebos');
  const mid = free[Math.floor(free.length / 2)];
  out('p-pad', padded([mid.id]));
  const pair = free.find((b, k) => k > 0 && free[k - 1].i === b.i - 1) || free[1];
  const sw = bs.slice(); [sw[pair.i - 1], sw[pair.i]] = [sw[pair.i], sw[pair.i - 1]]; out('p-swap', render(sw));
  const tgt = free[Math.floor(free.length / 3)];
  const r = await askAsync(`Rewrite this training slide body in different words. Keep every fact, instruction, example, list item, code block and the length the same; change only the wording and sentence order where natural. Do not add or remove ideas.

${tgt.body}

Answer with one json block: {"body": "..."}`, 'sonnet');
  out('p-para', render(bs.map((b) => (b.id === tgt.id ? { ...b, body: r.body } : b))));
  fs.writeFileSync(path.join(a.out, `${a.module}~edits.json`), JSON.stringify({ carriers: hashOrder, p_pad: mid.id, p_swap: [bs[pair.i - 1].id, pair.id], p_para: tgt.id }, null, 2));
})();
