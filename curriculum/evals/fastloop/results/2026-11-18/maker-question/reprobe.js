'use strict';
const fs = require('fs'); const path = require('path');
const FL = require('path').join(__dirname, '..', '..', '..');
const { loadPersona } = require(FL + '/../mechanical/persona-student/lib');
const { askAsync, pool } = require(FL + '/../teaching/lib');
const PD = path.join(FL, '..', 'personas', 'agents-101');
const OUT = __dirname + '/out.jsonl';
const Q = 'You made a briefing with agents in Module 3. If you needed a new one today, how would it get made and checked, and what is different from Module 3?';
const rows = fs.readFileSync(FL + '/results/2026-11-14/chain/students.jsonl', 'utf8').split('\n').filter(Boolean).map(JSON.parse);
const slots = [...new Set(rows.map((r) => r.slot))].filter((s) => /-r[12]$/.test(s));
const cf = fs.readFileSync(FL + '/results/2026-11-14/course-final/students.jsonl', 'utf8').split('\n').filter(Boolean).map(JSON.parse)
  .map((r) => ({ set: 'main', slot: r.persona + '-r' + r.rep, persona: r.persona, walks: [[2, 'Module 3'], [4, 'Module 5'], [5, 'Module 6']].map(([i, m]) => ({ module: m, ...r.mods[i] })) }));
const pick = rows.filter((r) => slots.includes(r.slot)).concat(cf);
const nl = (w) => (w.beats || []).map((b) => b.got).filter((g) => g && !/^nothing new/i.test(g));
const probe = (persona, walks) => `${persona.text}

---
You are this person. Over the past weeks you took Agents 101. You do not have the material any more.
These are the notes you wrote in three of the modules, in your own words:

${walks.map((w) => `${w.module}:\n${nl(w).map((n) => `- ${n}`).join('\n') || '- (nothing)'}\nTaking home: ${(w.take_homes || []).join(' | ') || '(nothing)'}`).join('\n\n')}

A colleague asks: "${Q}"
Answer as this person would, honestly, in two or three sentences. If you do not remember, say so.
Answer with one json block: {"answer": "..."}`;
const judge = (answer) => `A participant in an AI training was asked, weeks later: "${Q}"
Their answer: "${answer}"

Mark each link true ONLY if the answer itself says it (in any words); do not infer, do not reward vague mentions.
- made: the briefing is produced by their own agents or agent system from real sources.
- checked: the briefing is tested for fabrication, hallucination or grounding, claim by claim against sources, by a saved judge or checker that stays fixed or is itself checked against the person's own marks.
- improved: the judge's score or flags feed back into how briefings get generated (rules, tactic or instructions the generator reads are rewritten from them), so later briefings come out better.

Answer with one json block: {"made": true|false, "checked": true|false, "improved": true|false}`;
(async () => {
  const res = await pool(pick, async (r) => {
    try {
      const persona = loadPersona(PD, r.persona);
      const p = await askAsync(probe(persona, r.walks), 'sonnet'); const answer = String(p.answer || '');
      const js = await Promise.all([0, 1].map(() => askAsync(judge(answer), 'sonnet')));
      const link = (k) => js.filter((j) => j[k] === true).length / js.length;
      const o = { set: r.set, slot: r.slot, answer, made: link('made'), checked: link('checked'), improved: link('improved') };
      fs.appendFileSync(OUT, JSON.stringify(o) + '\n'); return o;
    } catch (e) { console.error(r.slot, e.message); return null; }
  }, 8);
  const ok = res.filter(Boolean); const mean = (xs) => Math.round(100 * xs.reduce((a, b) => a + b, 0) / (xs.length || 1));
  for (const s of ['intact', 'damaged', 'main']) { const xs = ok.filter((o) => o.set === s); console.log(s, xs.length, 'made', mean(xs.map((o) => o.made)), 'checked', mean(xs.map((o) => o.checked)), 'improved', mean(xs.map((o) => o.improved)), 'score', mean(xs.map((o) => (o.made + o.checked + o.improved) / 3))); }
})();
