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
// Score = share of checks passed, 0-100.
// Students (--students N, default 2; 0 skips): after each module, N persona students who read only that
// page answer five questions from memory: which parts of the job the agents now do end to end, and
// what context, compounding, control and agents building agents mean to them now. A blind scorer
// checks each answer against the module's row in the job table and the four-yarns grid. Per-yarn
// share = whether students own the yarns. Calls: 8 page judges + 16 per student (answer + score).
// loops/bin/claude guards them (budget EVAL_BUDGET, default 8 + 16*N + 4 when run by hand).
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { askAsync, pool, args, targets } = require('./lib');
const { loadPersona } = require('../mechanical/persona-student/lib');

const a = args();
const ROOT = path.resolve(a.root || path.join(__dirname, '..', '..', '..'));
const bin = path.join(__dirname, '..', 'loops', 'bin');
if (!process.env.PATH.split(':').includes(bin)) process.env.PATH = `${bin}:${process.env.PATH}`;
const NSTU = a.students === undefined ? 2 : Number(a.students);
process.env.EVAL_BUDGET = process.env.EVAL_BUDGET || String(8 + 16 * NSTU + 4);
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
- state_quote: the sentence that says which part of that job the agents take over today (or, in Module 1, that nothing is handed over yet). null if none.
- state_early: true if state_quote comes before the first exercise or demo on the page.
- state_matches_row: true if state_quote fits this module's row in the first table.
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

  // Students: one answer call and one blind score call each, per module.
  const PD = a['persona-dir'] || path.join(__dirname, '..', 'personas', 'agents-101');
  const PERS = (a.personas || 'cfo-sceptic,cto-builder,hr-svp,ops-director,legal-lead,sales-vp').split(',');
  const YARNS = ['context', 'compounding', 'control', 'agents building agents'];
  const jobs = [];
  for (const m of mods) for (let s = 0; s < NSTU; s++) jobs.push({ m, persona: PERS[(m.n + s) % PERS.length] });
  const pages = {};
  const stu = await pool(jobs, async ({ m, persona }) => {
    try {
      pages[m.module] = pages[m.module] || page(m.module);
      const ans = await askAsync(`${loadPersona(PD, persona).text}

---
You are this person. You took Module ${m.n} of 8 of the Agents 101 course. This is the module as you read it:
<page>
${pages[m.module]}
</page>
A week has passed and you no longer have the page. From memory, in your own words, one or two sentences each.
If something did not stick, say so. Do not invent.
1. job: the course has agents make one analysis of your challenge. After this module, which parts of that job do the agents do end to end, and what is still yours?
2. context: what does "context" mean to you now?
3. compounding: what does "compounding" mean to you now?
4. control: what does "control" over agents mean to you now?
5. builders: what does "agents building agents" mean to you now?
Answer with one json block: {"job": "...", "context": "...", "compounding": "...", "control": "...", "builders": "..."}`, a.model || 'sonnet');
      const sc = await askAsync(`You score a student's answers against what a course module intends. Be strict: a generic answer that would fit any module is a "no"; the gist of the intended meaning in other words is a "yes".

THE INTENDED MEANINGS (from the course strategy; the student took Module ${m.n}, the "M${m.n}" rows):
${SECTION}

THE STUDENT'S ANSWERS:
${JSON.stringify(ans, null, 1)}

For each key, does the answer state the M${m.n} meaning? job = the M${m.n} row of the table of what the agents take over; context, compounding, control, builders = the M${m.n} cell of that column in the four-yarns grid (builders = "Agents building agents").
Answer with one json block: {"job": true|false, "context": true|false, "compounding": true|false, "control": true|false, "builders": true|false}`, a.model || 'sonnet');
      return { module: m.module, n: m.n, persona, answers: ans, owned: sc };
    } catch (e) { return { module: m.module, n: m.n, persona, error: String(e.message || e).slice(0, 200) }; }
  }, 8);
  const KEYS = ['job', 'context', 'compounding', 'control', 'builders'];
  const own = Object.fromEntries(KEYS.map((k) => {
    const ok = stu.filter((s) => s.owned && (k !== 'job' || s.n >= 2));
    return [k, ok.length ? Math.round((100 * ok.filter((s) => s.owned[k] === true).length) / ok.length) : null];
  }));
  const ownByModule = mods.map((m) => ({ n: m.n, ...Object.fromEntries(KEYS.map((k) => {
    const ok = stu.filter((s) => s.n === m.n && s.owned);
    return [k, ok.length && (k !== 'job' || m.n >= 2) ? `${ok.filter((s) => s.owned[k] === true).length}/${ok.length}` : '-'];
  })) }));

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
  const out = { score, pass, total, thread_name: modal, modules: table, students: stu, owned: own, errors: rows.filter((r) => r.error).length + stu.filter((s) => s.error).length };
  if (a.out) { fs.mkdirSync(path.dirname(path.resolve(a.out)), { recursive: true }); fs.writeFileSync(a.out, JSON.stringify(out, null, 1)); }
  const mark = (v) => (v === undefined ? '-' : v ? 'yes' : 'no');
  console.log(`## Red thread (cross-module)\n\nScore ${score} (${pass} of ${total} checks). Name on the pages: ${modal ? `"${modal}"` : 'none'}.\n`);
  console.log('| M | state named early | own-agent callout | names previous step | same name |\n|---|---|---|---|---|');
  for (const r of table) console.log(`| ${r.n} | ${mark(r.checks.state)} | ${mark(r.checks.callout)} | ${mark(r.checks.previous)} | ${mark(r.checks.same_name)} |${r.error ? ' error: ' + r.error : ''}`);
  if (NSTU) {
    console.log(`\n### Do students own the yarns? (${NSTU} per module, from memory after reading one page)\n`);
    console.log(`Share stating the module's meaning: job ${own.job}, context ${own.context}, compounding ${own.compounding}, control ${own.control}, agents building agents ${own.builders}.\n`);
    console.log('| M | job | context | compounding | control | agents building agents |\n|---|---|---|---|---|---|');
    for (const r of ownByModule) console.log(`| ${r.n} | ${r.job} | ${r.context} | ${r.compounding} | ${r.control} | ${r.builders} |`);
    for (const s of stu.filter((x) => x.error)) console.log(`error M${s.n} ${s.persona}: ${s.error}`);
  }
  if (out.errors) process.exit(3);
})();
