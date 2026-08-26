export const meta = {
  name: 'judge-hillclimb',
  description: 'Race judge-dispatch variants on planted-defect fixtures; score recall before speed',
  whenToUse: 'Optimising judge lead time. Every variant is scored on recall against known planted defects first — a faster variant that misses a plant is rejected, not ranked.',
  phases: [
    { title: 'Round', detail: 'champion + challengers on both fixtures, recall scored before rows' },
  ],
}

// ---------------------------------------------------------------------------
// Rounds 2-10 of a hillclimb whose ONLY safe move is to gate on recall.
//
// A judge told to do less is always faster, so latency alone has one global
// optimum — instant PASS — and every step toward it reads as progress. Each
// variant here is therefore scored against defects we planted and know the
// truth about, and a variant that drops one is REJECTED, never ranked.
//
// Generation 1 result being carried in: v3-both (fires-only ledger + prefill
// brief) held 5/5 on the mechanical fixture at 26 rows vs the control's 61.
// What it did NOT establish is judgement recall — four of five plants there
// were grep-decidable. So every round from here scores BOTH fixtures, and the
// judgement fixture is the one with a veto.
//
// Timing is deliberately not measured inside a round. Challengers race in
// parallel over shared slots, so wall-clock there is contention, not variant
// cost — generation 1 had the fires-only variant come in SLOWEST while doing
// half the writing. Row count and ingested bytes are deterministic and are what
// rounds optimise; real seconds come from a serial pass over finalists at the
// end, which is the only place a timing number means anything.
// ---------------------------------------------------------------------------

const REPO = '/Users/anttitevanlinna/Projects/agents-102'
const MEM = '/Users/anttitevanlinna/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/memory'
const COMPS = ['check_writing', 'check_student_facing', 'check_prompts', 'check_sales_copy', 'check_strategy_tie_in']
const FIX = {
  mech: 'curriculum/evals/bench/fixtures/writing-5plant.md',
  judge: 'curriculum/evals/bench/fixtures/writing-5judge.md',
}

const input = args || {}
const ROUNDS = input.rounds || 9        // rounds 2..10
const START_AT = input.startAt || 2

// --- dispatch dimensions the climb can turn -------------------------------
// Each is a knob on what the judge READS or WRITES. `cost` is a rough note for
// the log only; the measurement is what decides.
const FLAGS = {
  fires:      'fires-only ledger (no N/A rows)',
  brief:      'prefill-assembled rulebook, rules verbatim',
  noDiff:     'skip the pinned-diff step',
  noPreamble: 'condensed preamble clauses inline instead of the 8.7KB file',
  lazyExpand: 'skip expand-md when the view reports no prompt/figure markers',
  batchRead:  'read template + rulebook + view in one batched turn',
  haiku:      'judge on haiku instead of sonnet',
}

function ledgerBlock(v) {
  return v.fires
    ? `## Report what fires — no N/A ledger

Do NOT emit a row for every numbered rule. Read every rule in scope, then emit rows ONLY for rules that have something to say about this body: a REVISE, or a PASS on a rule close enough to be worth recording. Rules that cannot fire get no row.

This is how the \`story\` class has always worked. Reading is unchanged and total — it is the WRITING that is scoped. Do not skim the compendium because your output is shorter.`
    : `## Completeness ledger — one row per numbered rule

Carry exactly one entry for EVERY numbered rule in \`check_writing\` and \`check_student_facing\`, no omission. A rule that does not apply is \`verdict: "N/A"\` with a one-clause reason. Use the body view's \`rule_inventory\` for counts rather than counting by hand.`
}

function readBlock(v, fixture) {
  const rules = v.brief
    ? `\`\`\`
node curriculum/evals/scripts/derive-class-brief.js ${fixture} writing
\`\`\`
One assembled file: every in-scope rule VERBATIM — full lead, full body, every carve-out — minus rules the shape-gated prefill already resolved. Read it instead of the five compendiums. If it reports it could not build, read the five in full and say so in \`notes\`.`
    : COMPS.map(c => `   - ${MEM}/${c}.md`).join('\n')

  const preamble = v.noPreamble
    ? `**Dispatch clauses (condensed — the full file is \`curriculum/evals/judges/_dispatch-preamble.md\` if you need a boundary case):**
- Read rules at T3 wording, never an \`_index/\` lead: a lead states the prohibition and drops the exception.
- Before any REVISE, say in one line WHAT HARM the rule prevents and whether it is present here. A rule firing is not the harm arriving.
- Never cite a command you did not run. Paste real output.
- A PASS owes evidence: the command result, or the line closest to violating with why it stays inside.
- Check the maintainer block for a dated accept-note before filing anything.
- Stay in your class. Out-of-lane observations go in \`notes\`.
- Never carry a quote forward from a cache without grepping it against the live file.`
    : `1. \`curriculum/evals/judges/_dispatch-preamble.md\` (in full)`

  return `## Read

${preamble}
2. \`curriculum/evals/judges/writing.md\` (in full)
3. Rules:
${rules}

${v.batchRead ? '**Issue the reads for the template, the rulebook and the body view in ONE turn** — they have no dependency on each other and serialising them costs a round trip each.\n' : ''}`
}

function prompt(v, fixture, fixtureName) {
  return `You are the **writing** eval judge for \`${fixture}\`. Repo root \`${REPO}\` — cd there first.

This is a BENCH FIXTURE: a real exercise body with defects deliberately inserted. Judge it exactly as you would judge live curriculum. Do NOT try to guess which lines were planted — report what the rules actually catch, and report real pre-existing defects too if you find them.

${readBlock(v, fixture)}
## The precomputed view — do not re-derive it

\`\`\`
node curriculum/evals/scripts/derive-body-view.js ${fixture}
\`\`\`

Carries \`maintainer_cut\`, \`fence_ranges\`, \`body_regions\`, a numbered body projection that is in-region by construction, and mechanical greps each with a \`planted_proof\`. Do not write your own body projection; do not plant your own test string.
${v.lazyExpand ? '\nRun `node scripts/expand-md.js` ONLY if the view\'s `signals` report `has_prompt_blocks` or `has_figures` true. Otherwise the raw source already IS the student view and expanding it buys nothing.\n' : ''}${v.noDiff ? '' : '\n## Run your own diff\n\nThis fixture derives from `curriculum/exercises/close-the-ticket.md`. Diff against it to see what moved.\n'}
${ledgerBlock(v)}

## You are READ-ONLY on the fixture

The only file you write is \`curriculum/evals/bench/runs/${v.id}--${fixtureName}.instance.json\`. Write it with the Write tool BEFORE composing your reply, then verify it parses.

Shape: \`{class, file, verdict, body_sha, rules_evaluated:[{compendium, rule_index, rule_lead, verdict, evidence, fix_hint, blocking}], findings:[{rule,line,quote,harm,fix}], todos:[{rule,line,note}], blocking_findings_count, todos_count}\`.

**Every defect you find must name its LINE and quote the offending text.** A rule number with no line does not tell the maintainer what to fix — and a defect of voice, register or a missing carve-out counts exactly as much as a banned word.

Return the structured verdict.`
}

const SCORE_SCHEMA = {
  type: 'object',
  required: ['variants'],
  properties: {
    variants: {
      type: 'array',
      items: {
        type: 'object',
        required: ['id', 'recall_mech', 'recall_judge', 'rows_mech', 'rows_judge'],
        properties: {
          id: { type: 'string' },
          recall_mech: { type: 'number', description: 'recall_pct on writing-5plant, 0..1; 0 if the instance is missing' },
          recall_judge: { type: 'number', description: 'recall_pct on writing-5judge, 0..1; 0 if the instance is missing' },
          rows_mech: { type: 'integer' },
          rows_judge: { type: 'integer' },
          missed: { type: 'array', items: { type: 'string' }, description: 'plant ids dropped, across both fixtures' },
        },
      },
    },
  },
}

const VERDICT = {
  type: 'object',
  required: ['verdict', 'rows_written', 'findings_count', 'todos_count'],
  properties: {
    verdict: { enum: ['PASS', 'PASS_WITH_TODOS', 'REVISE'] },
    rows_written: { type: 'integer' },
    findings_count: { type: 'integer' },
    todos_count: { type: 'integer' },
    notes: { type: 'string' },
  },
}

// The climb schedule. Each round proposes challengers as deltas on the reigning
// champion, so a round tests one or two knobs rather than a new configuration
// from scratch — which is what makes a rejection attributable.
const SCHEDULE = {
  2: [{ add: [] }],                                  // re-validate champion on the judgement fixture
  3: [{ add: ['noDiff'] }],
  4: [{ add: ['lazyExpand'] }],
  5: [{ add: ['batchRead'] }],
  6: [{ add: ['noPreamble'] }],
  7: [{ add: ['haiku'] }],
  8: [{ add: ['noDiff', 'lazyExpand'] }],
  9: [{ add: ['noDiff', 'lazyExpand', 'batchRead'] }],
  10: [{ add: [] }],                                 // final: champion on both fixtures, clean
}

let champion = { id: 'champ', fires: true, brief: true, flags: ['fires', 'brief'] }
// Carried ACROSS rounds. Read off the per-round record it was the gate's own
// incumbent value was always undefined there, so `?? Infinity` fired every time
// and every full-recall challenger promoted — including three rounds where rows
// went UP (56 -> 56 -> 71). A hillclimb whose ratchet never engages is greedy
// accumulation with a scoreboard.
let championRows = Infinity
const history = []

for (let round = START_AT; round < START_AT + ROUNDS && round <= 10; round++) {
  const proposals = SCHEDULE[round] || [{ add: [] }]
  const challengers = proposals.map((p, i) => {
    const flags = [...new Set([...champion.flags, ...p.add])]
    const v = { id: `r${round}-${i}`, flags }
    for (const f of flags) v[f] = true
    return v
  })

  phase(`Round ${round}`)
  log(`round ${round}: champion [${champion.flags.join('+')}] vs ${challengers.map(c => `[${c.flags.join('+')}]`).join(' ')}`)

  // Both fixtures, every challenger. The judgement fixture holds the veto.
  const runs = await parallel(challengers.flatMap(c => (
    [['mech', FIX.mech], ['judge', FIX.judge]].map(([name, path_]) => () =>
      agent(prompt(c, path_, name), {
        label: `${c.id}:${name}`,
        phase: `Round ${round}`,
        schema: VERDICT,
        ...(c.haiku ? { model: 'haiku' } : {}),
      }).then(r => ({ variant: c, fixture: name, result: r }))
        .catch(() => ({ variant: c, fixture: name, result: null })))
  )))

  const byVariant = new Map()
  for (const r of runs.filter(Boolean)) {
    if (!byVariant.has(r.variant.id)) byVariant.set(r.variant.id, { variant: r.variant, fixtures: {} })
    byVariant.get(r.variant.id).fixtures[r.fixture] = r.result
  }

  const rec = {
    round,
    champion_in: champion.flags.join('+'),
    challengers: [...byVariant.values()].map(x => ({
      id: x.variant.id,
      flags: x.variant.flags,
      mech: x.fixtures.mech ? { verdict: x.fixtures.mech.verdict, rows: x.fixtures.mech.rows_written, findings: x.fixtures.mech.findings_count, todos: x.fixtures.mech.todos_count } : null,
      judge: x.fixtures.judge ? { verdict: x.fixtures.judge.verdict, rows: x.fixtures.judge.rows_written, findings: x.fixtures.judge.findings_count, todos: x.fixtures.judge.todos_count } : null,
      instances: {
        mech: `curriculum/evals/bench/runs/${x.variant.id}--mech.instance.json`,
        judge: `curriculum/evals/bench/runs/${x.variant.id}--judge.instance.json`,
      },
    })),
  }
  history.push(rec)

  // Promotion has to be EARNED, and only the scorer can say whether it was.
  // Promoting on rows_written would be precisely the latency-only optimiser this
  // bench exists to stop: fewer rows is what a judge that gave up also produces.
  // So a scoring agent runs judge-bench against the instances actually written
  // and reports recall per fixture; a challenger that drops any plant is
  // rejected and the champion stands.
  const ids = rec.challengers.map(c => c.id)
  const scored = await agent(
    `Score bench instances. Repo root \`${REPO}\` — cd there first. Run EXACTLY these and report the real numbers:

${ids.map(id => `  node curriculum/evals/scripts/judge-bench.js --score curriculum/evals/bench/runs/${id}--mech.instance.json --fixture writing-5plant
  node curriculum/evals/scripts/judge-bench.js --score curriculum/evals/bench/runs/${id}--judge.instance.json --fixture writing-5judge`).join('\n')}

Each prints JSON with \`recall\`, \`recall_pct\`, \`rows\`, \`noise\`, \`misses\`. Report them verbatim — do not re-judge, do not estimate, do not repair a missing file. If a file does not exist say so and give that variant recall 0; a variant whose instance is missing did not pass, it did not run.`,
    { label: `score:r${round}`, phase: `Round ${round}`, schema: SCORE_SCHEMA, effort: 'low' })

  rec.scores = scored ? scored.variants : null
  if (scored && Array.isArray(scored.variants)) {
    for (const c of rec.challengers) {
      // The scorer has returned one row per (variant, fixture) — ids like
      // `r2-0--mech` — rather than one row per variant. Round 2 was recorded as
      // dropping a plant when it had in fact scored 5/5 on both fixtures: an id
      // mismatch reported as a recall failure, which is the single most
      // expensive way for this harness to be wrong. Merge by prefix so the
      // shape the scorer actually returns is read correctly, and take the MAX
      // per fixture so a row carrying 0 for the fixture it did not score cannot
      // masquerade as a miss.
      const parts = scored.variants.filter(x => x.id === c.id || String(x.id).split('--')[0] === c.id)
      if (!parts.length) continue
      const sc = {
        recall_mech: Math.max(...parts.map(x => x.recall_mech ?? 0)),
        recall_judge: Math.max(...parts.map(x => x.recall_judge ?? 0)),
        rows_mech: Math.max(...parts.map(x => x.rows_mech ?? 0)),
        rows_judge: Math.max(...parts.map(x => x.rows_judge ?? 0)),
      }
      c.recall_mech = sc.recall_mech
      c.recall_judge = sc.recall_judge
      c.rows_mech = sc.rows_mech
      c.rows_judge = sc.rows_judge
    }
    // A challenger is promoted only on FULL recall across BOTH fixtures, and
    // only if it writes fewer rows than the champion did. Ties keep the
    // incumbent: an equal-cost variant that changes behaviour is churn.
    const viable = rec.challengers.filter(c => c.recall_mech === 1 && c.recall_judge === 1)
    const best = viable.sort((a, b) => (a.rows_mech + a.rows_judge) - (b.rows_mech + b.rows_judge))[0]
    if (best && (best.rows_mech + best.rows_judge) < championRows) {
      champion = challengers.find(c => c.id === best.id) || champion
      championRows = best.rows_mech + best.rows_judge
      rec.promoted = best.id
      rec.champion_rows = championRows
    } else {
      rec.promoted = null
      rec.rejected_because = viable.length ? 'no row reduction over champion' : 'a plant was dropped'
    }
  }
}

return {
  rounds: history,
  champion_flags: champion.flags,
  note: 'Promotion is deliberately not decided in-workflow. Score every instance with judge-bench --score against BOTH fixtures; a variant that drops any plant on the judgement fixture is rejected regardless of its row count.',
  score_all: 'for f in curriculum/evals/bench/runs/*--mech.instance.json; do node curriculum/evals/scripts/judge-bench.js --score "$f" --fixture writing-5plant; done',
}
