#!/usr/bin/env node
'use strict';
// thread.js — cross-module check for the Agents 101 red thread (strategy § "The red thread").
//
//   node thread.js [--root <checkout>] [--out thread.json] [--modules m1,m2,…]
//
// The Big Idea measure scores one module against one line, so it cannot see a thread that runs
// between modules. This check reads each module page in full (student view) next to the strategy
// section, read live from agents-102-core, and asks one blind-to-score Sonnet judge per module for
// quotes, never verdicts alone. Code decides from the quotes:
//   state     (M2-M8) the page points at the student's one piece of work in its current state,
//             early (before the first exercise), and that state matches the module's table row;
//   callout   (M1-M8) the fixed own-agent callout is there with this module's step;
//   previous  (M2-M8) the callout names the previous step;
//   same name (M2-M8) every page calls the piece of work by the same name.
// Score = share of checks passed, 0-100. 8 calls per run; loops/bin/claude guards them
// (budget EVAL_BUDGET, default 12 when run by hand).
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { askAsync, pool, args, targets } = require('./lib');

const a = args();
const ROOT = path.resolve(a.root || path.join(__dirname, '..', '..', '..'));
const bin = path.join(__dirname, '..', 'loops', 'bin');
if (!process.env.PATH.split(':').includes(bin)) process.env.PATH = `${bin}:${process.env.PATH}`;
process.env.EVAL_BUDGET = process.env.EVAL_BUDGET || '12';
process.env.EVAL_BUDGET_FILE = process.env.EVAL_BUDGET_FILE || path.join(require('os').tmpdir(), `thread-budget.${process.pid}.count`);

const cfg = targets();
const core = process.env.AGENTS_CORE_DIR || path.join(__dirname, '..', '..', '..', '..', 'agents-102-core');
const strat = fs.readFileSync(path.join(core, cfg.strategy_file), 'utf8').split('\n');
const i0 = strat.findIndex((l) => /^## The red thread/.test(l));
if (i0 < 0) throw new Error('strategy file: no "## The red thread" section');
const i1 = strat.findIndex((l, k) => k > i0 && l.startsWith('## '));
const SECTION = strat.slice(i0, i1 < 0 ? undefined : i1).join('\n');

const want = a.modules ? a.modules.split(',') : cfg.modules.map((m) => m.module);
const mods = cfg.modules.filter((m) => want.includes(m.module));
const page = (m) => execFileSync('node', [path.join(ROOT, 'scripts', 'read-training.js'), 'agents-101', '--modules', m],
  { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 << 20 });

const prompt = (m, text) => `You check one module page of a training against a design rule. Quote, do not paraphrase.

THE RULE (from the course strategy):
${SECTION}

THE PAGE: Module ${m.n} of 8 ("${m.module}"), as the student reads it.
<page>
${text}
</page>

Answer from the page only. Every quote must be copied exactly from the page; use null when the page has none.
- thread_name: the short name the page gives the student's one piece of work that runs across modules (the thing the rule calls the analysis), as the page words it. null if the page never names it.
- state_quote: the sentence that points at that piece of work in its current state and says what changes today. null if none.
- state_early: true if state_quote comes before the first exercise or demo on the page.
- state_matches_row: true if state_quote fits this module's row in the first table ("What happens to the analysis").
- callout_quote: the own-agent callout (the fixed step for the student's own agent). null if none.
- callout_matches_row: true if callout_quote carries this module's step in the second table.
- names_previous_step: true if the callout refers back to the previous module's step.
Answer with one json block: {"thread_name": ..., "state_quote": ..., "state_early": ..., "state_matches_row": ..., "callout_quote": ..., "callout_matches_row": ..., "names_previous_step": ...}`;

const norm = (s) => (s || '').toLowerCase().replace(/[`*_"'.]/g, '').replace(/^(your|the)\s+/, '').trim();

(async () => {
  const rows = await pool(mods, async (m) => {
    let text;
    try { text = page(m.module); } catch (e) { return { module: m.module, n: m.n, error: 'page: ' + String(e.message).slice(0, 200) }; }
    try {
      const r = await askAsync(prompt(m, text), a.model || 'sonnet');
      // A quote the page does not contain is a judge invention: it counts as absent.
      const has = (q) => typeof q === 'string' && q.length > 8 && text.replace(/\s+/g, ' ').includes(q.replace(/\s+/g, ' ').slice(0, 60));
      return { module: m.module, n: m.n, ...r, state_found: has(r.state_quote), callout_found: has(r.callout_quote) };
    } catch (e) { return { module: m.module, n: m.n, error: String(e.message || e).slice(0, 200) }; }
  }, 8);

  const names = rows.filter((r) => r.n >= 2 && r.thread_name).map((r) => norm(r.thread_name));
  const modal = names.sort((x, y) => names.filter((n) => n === y).length - names.filter((n) => n === x).length)[0] || null;
  let pass = 0, total = 0;
  const table = rows.sort((x, y) => x.n - y.n).map((r) => {
    const c = {};
    if (r.n >= 2) {
      c.state = !!(r.state_found && r.state_early && r.state_matches_row);
      c.previous = !!(r.callout_found && r.names_previous_step);
      c.same_name = !!(modal && norm(r.thread_name) === modal);
    }
    c.callout = !!(r.callout_found && r.callout_matches_row);
    if (r.error) for (const k of Object.keys(c)) c[k] = false;
    for (const v of Object.values(c)) { total++; if (v) pass++; }
    return { ...r, checks: c };
  });
  const score = total ? Math.round((100 * pass) / total) : 0;
  const out = { score, pass, total, thread_name: modal, modules: table, errors: rows.filter((r) => r.error).length };
  if (a.out) { fs.mkdirSync(path.dirname(path.resolve(a.out)), { recursive: true }); fs.writeFileSync(a.out, JSON.stringify(out, null, 1)); }
  const mark = (v) => (v === undefined ? '-' : v ? 'yes' : 'no');
  console.log(`## Red thread (cross-module)\n\nScore ${score} (${pass} of ${total} checks). Name on the pages: ${modal ? `"${modal}"` : 'none'}.\n`);
  console.log('| M | state named early | own-agent callout | names previous step | same name |\n|---|---|---|---|---|');
  for (const r of table) console.log(`| ${r.n} | ${mark(r.checks.state)} | ${mark(r.checks.callout)} | ${mark(r.checks.previous)} | ${mark(r.checks.same_name)} |${r.error ? ' error: ' + r.error : ''}`);
  if (out.errors) process.exit(3);
})();
