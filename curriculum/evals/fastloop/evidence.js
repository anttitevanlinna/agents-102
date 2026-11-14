#!/usr/bin/env node
'use strict';
// evidence.js — a module's evidence page from stored run.js students: what owners act on.
//
//   node evidence.js --module security --page page.md --students students.jsonl --out DIR [--group base] [--step <beat id>[,...]]
//
// Reports, in this order:
//   1. Each step the owner names (--step; all exercise steps when none is named): how many students did it,
//      skipped it, skimmed or checked out, and what each wrote there in their own words. This is the acceptance
//      evidence (plan to done, revision 14 Nov).
//   2. Cold share: of all take-homes, how many state the module's Big Idea (each take-home scored like a cold
//      answer: blind restatement x2, then matched against all eight Big Ideas; counts when both land on it).
//      Tracked, not a gate; under a third = the module is open. Plus the teaching number (cold answer) with n.
//   3. What students took home instead, and where the Big Idea is on the page but nobody wrote it down (one call).
//   4. Attention drops.
const fs = require('fs');
const path = require('path');
const { askAsync, pool, args, targets } = require('../teaching/lib');
const { beats } = require('../mechanical/persona-student/lib');
const { scoreOne } = require('../teaching/score');

const a = args();
const MOD = a.module; const OUT = a.out; fs.mkdirSync(OUT, { recursive: true });
const BIG = targets().modules.find((t) => t.module === MOD).target;
const page = fs.readFileSync(a.page, 'utf8'); const bs = beats(page);
const rows = fs.readFileSync(a.students, 'utf8').split('\n').filter(Boolean).map(JSON.parse).filter((r) => !a.group || r.page === a.group);
const n = rows.length;
const pct = (x, d = n) => `${Math.round(100 * x / (d || 1))}%`;
const short = (id) => id.split('/').pop();

(async () => {
  // 2. Cold share of take-homes, cached per take-home text.
  const CACHE = path.join(OUT, 'takehome-cache.json');
  const cache = fs.existsSync(CACHE) ? JSON.parse(fs.readFileSync(CACHE, 'utf8')) : {};
  const ths = []; for (const r of rows) for (const t of r.take_homes || []) ths.push({ who: `${r.persona} r${r.rep}`, text: String(t) });
  await pool(ths.filter((t) => !(t.text in cache)), async (t) => {
    try { const s = await scoreOne({ id: `th-${t.who}`, module: MOD, answer: t.text }, 2); cache[t.text] = s.score; } catch (e) { /* left unscored, reported */ }
  }, 12);
  fs.writeFileSync(CACHE, JSON.stringify(cache));
  const scored = ths.filter((t) => t.text in cache); const states = scored.filter((t) => cache[t.text] === 1);
  const studentsWith = rows.filter((r) => (r.take_homes || []).some((t) => cache[t] === 1)).length;
  const stated = Math.round(100 * rows.reduce((s, r) => s + r.score, 0) / (n || 1));

  // 1. Steps.
  const isStep = (b) => /exercise|phase|step/.test(b.id) || /\{\{prompt:|```/.test(b.body);
  const wanted = a.step ? String(a.step).split(',') : bs.filter(isStep).map((b) => b.id);
  const per = Object.fromEntries(bs.map((b) => [b.id, { yes: 0, skipped: 0, skim: 0, out: 0, notes: [] }]));
  for (const r of rows) for (const b of r.beats || []) {
    const p = per[b.id]; if (!p) continue;
    if (b.did === 'yes') p.yes++; if (b.did === 'skipped') p.skipped++;
    if (b.att === 'skim') p.skim++; if (b.att === 'out') p.out++;
    p.notes.push(`${r.persona} r${r.rep}${b.did === 'skipped' ? ' [skipped]' : b.att && b.att !== 'in' ? ` [${b.att}]` : ''}: ${b.got}`);
  }

  // 3. Instead + lost.
  const notes = rows.map((r) => `### ${r.persona} r${r.rep} · cold answer score ${Math.round(100 * r.score)}
cold answer: ${r.answer}
take-homes: ${(r.take_homes || []).join(' | ')}
notes: ${(r.beats || []).map((b) => `[${short(b.id)}${b.did === 'skipped' ? ' skipped' : b.att && b.att !== 'in' ? ` ${b.att}` : ''}] ${b.got}`).join(' / ')}`).join('\n\n');
  const br = await askAsync(`A training module's Big Idea, which students should leave able to state cold, is:
"${BIG}"
Below: the page split into beats, then ${n} simulated students with the note each wrote per beat, their take-homes and their cold answer days later (scored 0-100 for carrying the Big Idea).

=== PAGE ===
${bs.map((b) => `--- beat ${b.id} ---\n## ${b.heading}\n${b.body}`).join('\n\n')}

=== STUDENTS ===
${notes}

Read the notes like a usability researcher. Report only what the notes show; count, and quote students' own words.
1. instead: the ideas students took home INSTEAD of the Big Idea, most common first: the idea in plain words, how many students (k of ${n}), two short verbatim quotes, the beat ids that produced it.
2. lost: beats where the page states or practises the Big Idea but few or no students wrote it down; for each, how many wrote it down (k of ${n}) and why not, from the notes.
Answer with one json block: {"instead":[{"idea","k","quotes":[..],"beats":[..]}],"lost":[{"beat","k","why"}]}`, 'sonnet');

  // Write the page.
  const L = [`# Evidence: ${MOD}`, '', `${n} students (6 personas). Big Idea: ${BIG}`, '',
    `- **Take-homes stating the Big Idea: ${states.length} of ${scored.length} (${pct(states.length, scored.length)})**; students with at least one: ${studentsWith} of ${n} (${pct(studentsWith)}). ${states.length / (scored.length || 1) < 1 / 3 ? 'Under a third: module open.' : ''}`,
    `- Teaching number (cold answer): ${stated}. Use only to catch a drop of 20 or more against the pooled baseline.`, ''];
  L.push('## Steps: done, skipped, and what students wrote there', '');
  for (const id of wanted) {
    const p = per[id]; if (!p) { L.push(`- ${id}: no such beat on this page`, ''); continue; }
    L.push(`### ${id}`, '', `Did it ${p.yes} · skipped ${p.skipped} · skimmed ${p.skim} · checked out ${p.out} (of ${n})`, '', ...p.notes.map((x) => `- ${x}`), '');
  }
  L.push('## What students took home instead', '');
  for (const x of br.instead || []) L.push(`- **${x.idea}** (${x.k} of ${n}). ${(x.quotes || []).map((q) => `"${q}"`).join(' ')} · from ${(x.beats || []).map(short).join(', ')}`);
  L.push('', '## On the page but nobody wrote it down', '');
  for (const x of br.lost || []) L.push(`- ${x.beat} (${x.k} of ${n} wrote it down): ${x.why}`);
  const drops = Object.entries(per).filter(([, v]) => v.skim + v.out >= Math.ceil(n / 3)).sort((p, q) => (q[1].skim + 2 * q[1].out) - (p[1].skim + 2 * p[1].out));
  L.push('', '## Attention drops (a third or more skimmed or checked out)', '', ...(drops.length ? drops.map(([id, v]) => `- ${id}: ${v.skim} skimmed, ${v.out} checked out`) : ['- none']));
  L.push('', '## Every student\'s take-homes', '', ...rows.map((r) => `- ${r.persona} r${r.rep}: ${(r.take_homes || []).map((t) => `${t}${cache[t] === 1 ? ' ✓' : ''}`).join(' | ')}`));
  fs.writeFileSync(path.join(OUT, 'evidence.md'), L.join('\n') + '\n');
  fs.writeFileSync(path.join(OUT, 'evidence.json'), JSON.stringify({ module: MOD, n, big_idea: BIG, takehomes: { stating: states.length, scored: scored.length, students_with: studentsWith }, stated, steps: Object.fromEntries(Object.entries(per).map(([k, v]) => [k, { yes: v.yes, skipped: v.skipped, skim: v.skim, out: v.out }])), instead: br.instead, lost: br.lost }, null, 2));
  console.log(L.slice(0, 6).join('\n'));
})();
