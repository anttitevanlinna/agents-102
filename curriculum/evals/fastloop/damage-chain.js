#!/usr/bin/env node
'use strict';
// damage-chain.js — copies of Modules 3, 5 and 6 with the briefing chain cut: Module 3 no longer leaves the
// briefing's truth open, Module 5 tests a sample briefing instead of the Module 3 one, Module 6 runs "a judge"
// instead of the Module 5 judge. Everything else is unchanged. Fails loudly when a sentence is not found once,
// so a page edit cannot silently turn the damage into a no-op.
//
//   node damage-chain.js --m3 m3.md --m5 m5.md --m6 m6.md --out DIR      -> DIR/{m3,m5,m6}.md
const fs = require('fs');
const path = require('path');
const { args } = require('../teaching/lib');
const a = args(); fs.mkdirSync(a.out, { recursive: true });

const CUTS = {
  m3: [
    ['The audit reads how your agents handed work to each other. It does not check whether the briefing is true.', 'The audit reads how your agents handed work to each other.'],
    ['## The doubt stays. Hold it.\n\nNothing checks the briefing yet, so its correctness stays open.', '## Keep the audit\n\nKeep the audit notes next to the run.'],
  ],
  m5: [
    ['which line in your Module 3 briefing reads almost right?', 'which line in an AI answer you read this week reads almost right?'],
    ['Your test corpus is the Module 3 briefing: your sources, retrievals, stances and real question.', 'Your test corpus is the sample pack in the folder: a set of sources and one question.'],
    ['Ask the agent to run it once on your `./crux.md` answer, the one Module 3 left you doubting.', 'Ask the agent to run it once on a short answer of your choice.'],
  ],
  m6: [
    ['The Module 5 eval now runs on every output.', 'An eval now runs on every output.'],
    ['the Module 5 judge scores each round unchanged', 'a judge scores each round unchanged'],
    ['the one-off Module 5 judge from one', 'a one-off judge from one'],
    ['## Module 5 turned judgment into a judge\n\nOne briefing, thirty claims, four detectors, one scorer: the scoreboard named which method caught the misses. The winner is saved as `judges/groundedness-judge.md`, measured judgment made runnable.', '## A judge is judgment made runnable\n\nA judge file scores claims against evidence, the same way every time.'],
    ['The Module 5 judge goes into a loop.', 'A judge goes into a loop.'],
    ['score it with the judge from Module 5.', 'score it with a judge.'],
    [' (Module 3).', '.'], [' (Module 4).', '.'], [' (Module 5).', '.'],
  ],
};
for (const k of ['m3', 'm5', 'm6']) {
  let t = fs.readFileSync(a[k], 'utf8');
  for (const [o, n] of CUTS[k]) {
    const c = t.split(o).length - 1;
    if (c !== 1) { console.error(`[damage-chain] ${k}: found ${c} times: ${o.slice(0, 80)}`); process.exit(1); }
    t = t.replace(o, n);
  }
  fs.writeFileSync(path.join(a.out, `${k}.md`), t);
}
console.log(`[damage-chain] wrote ${a.out}/m3.md m5.md m6.md`);
