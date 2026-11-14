#!/usr/bin/env node
'use strict';
// calibrate.js — is the fast measure fit to steer edits? Judged on CHANGES with a known answer.
//
//   node calibrate.js DIR/run/<module> [...] [--bands 5,10,15] [--sizes 6,12,18,24] [--draws 2000]
// Input: run.js outputs over calib-set.js pages (v0, dose33, dose67, dose100, p-pad, p-swap, p-para),
// read at the largest panel. For each panel size n (persona-balanced subsets of slots) and band B:
//   false alarm  = share of placebo draws whose paired |gap| >= B (should be <= 10%)
//   detection    = share of dose draws whose gap <= -B, per dose level
//   gap SD       = spread of the paired gap at that n (placebos), i.e. the noise a session must read past
// Also prints the full-panel numbers so the dose order (v0 >= 33 >= 67 >= 100) can be read directly.
const fs = require('fs');
const path = require('path');
const { args } = require('../teaching/lib');
const a = args();
const dirs = process.argv.slice(2).filter((x) => !x.startsWith('--') && fs.existsSync(path.join(x, 'students.jsonl')));
const BANDS = String(a.bands || '5,8,10,12,15').split(',').map(Number);
const SIZES = String(a.sizes || '6,12,18,24').split(',').map(Number);
const DRAWS = Number(a.draws || 2000);
let seed = 7; const rnd = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648);

const out = { modules: {}, by_size: {} };
const pooled = {}; // size -> { placebo: [gaps], dose33: [], dose67: [], dose100: [] }
for (const d of dirs) {
  const rows = fs.readFileSync(path.join(d, 'students.jsonl'), 'utf8').split('\n').filter(Boolean).map(JSON.parse);
  const mod = path.basename(d);
  const by = {}; for (const r of rows) (by[r.page] ||= {})[r.slot] = 100 * r.score;
  const mean = (o) => { const v = Object.values(o || {}); return Math.round(v.reduce((t, x) => t + x, 0) / (v.length || 1)); };
  out.modules[mod] = Object.fromEntries(Object.keys(by).map((p) => [p, { n: Object.keys(by[p]).length, stated: mean(by[p]) }]));
  const personas = [...new Set(rows.map((r) => r.persona))];
  const reps = [...new Set(rows.map((r) => r.rep))];
  for (const n of SIZES) {
    const per = Math.max(1, Math.round(n / personas.length));
    const P = (pooled[n] ||= { placebo: [], dose33: [], dose67: [], dose100: [] });
    for (const [kind, pages] of [['placebo', ['p-pad', 'p-swap', 'p-para']], ['dose33', ['dose33']], ['dose67', ['dose67']], ['dose100', ['dose100']]]) {
      for (const p of pages) {
        if (!by[p] || !by.v0) continue;
        for (let k = 0; k < DRAWS / pages.length; k++) {
          // Persona-balanced draw: `per` reps per persona for the version and, independently, for v0
          // (a real cycle re-reads v0 fresh, so the v0 reps are not the same draws as the version's).
          let t = 0, c = 0;
          for (const who of personas) {
            const pick = () => Array.from({ length: per }, () => reps[Math.floor(rnd() * reps.length)]); // bootstrap, with replacement
            const rv = pick(), r0 = pick();
            for (let i = 0; i < per; i++) {
              const x = by[p][`${who}-r${rv[i]}`], y = by.v0[`${who}-r${r0[i]}`];
              if (x === undefined || y === undefined) continue; t += x - y; c++;
            }
          }
          if (c) P[kind].push(t / c);
        }
      }
    }
  }
}
const sd = (v) => { const m = v.reduce((t, x) => t + x, 0) / v.length; return Math.sqrt(v.reduce((t, x) => t + (x - m) ** 2, 0) / (v.length - 1)); };
const pct = (v, f) => Math.round(100 * v.filter(f).length / (v.length || 1));
for (const n of Object.keys(pooled)) {
  const P = pooled[n];
  out.by_size[n] = { gap_sd: Math.round(sd(P.placebo) * 10) / 10, bands: Object.fromEntries(BANDS.map((B) => [B, {
    false_alarm: pct(P.placebo, (g) => Math.abs(g) >= B), detect33: pct(P.dose33, (g) => g <= -B), detect67: pct(P.dose67, (g) => g <= -B), detect100: pct(P.dose100, (g) => g <= -B),
  }])) };
}
console.log('Full-panel numbers (stated, per page):');
for (const [m, v] of Object.entries(out.modules)) console.log(`  ${m.padEnd(24)} ` + ['v0', 'dose33', 'dose67', 'dose100', 'p-pad', 'p-swap', 'p-para'].map((p) => `${p} ${v[p] ? v[p].stated : '-'}`).join(' · '));
console.log('\nPanel size x band (placebo false alarms; detection of graded damage):');
for (const [n, v] of Object.entries(out.by_size)) {
  console.log(`  n=${n} per version, gap SD ${v.gap_sd}`);
  for (const [B, r] of Object.entries(v.bands)) console.log(`    band ${String(B).padStart(2)}: false alarm ${String(r.false_alarm).padStart(3)}%  detect 1/3 ${String(r.detect33).padStart(3)}%  2/3 ${String(r.detect67).padStart(3)}%  all ${String(r.detect100).padStart(3)}%`);
}
if (a.out) fs.writeFileSync(a.out, JSON.stringify(out, null, 2));
