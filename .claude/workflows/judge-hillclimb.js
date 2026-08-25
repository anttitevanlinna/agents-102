export const meta = {
  name: 'judge-hillclimb',
  description: 'Race judge-dispatch variants on a planted-defect fixture; score recall before speed',
  whenToUse: 'Optimising judge lead time. Every variant is scored on recall against known planted defects first — a faster variant that misses a plant is rejected, not ranked.',
  phases: [
    { title: 'Race', detail: 'one judge per dispatch variant, same fixture, wall-clock recorded' },
    { title: 'Score', detail: 'recall against ground truth, then speed' },
  ],
}

// ---------------------------------------------------------------------------
// The point of the fixture is that speed is never the only thing improving.
// A judge told to do less will always be faster; the question this asks is
// whether it still finds the five defects we planted. A variant that drops a
// plant is not a cheaper judge, it is a different and worse one.
//
// The variable actually under test is the COMPLETENESS LEDGER. Measured off the
// instances, `story` reports ~15 rows against 136 in-scope rules and never
// regressed, while the ledger-bearing classes went 24→68 and 14→100 as the
// rulebook grew. Whether that ledger buys recall or only buys the appearance of
// coverage has been a judgement call. It is an empirical question now.
// ---------------------------------------------------------------------------

const REPO = '/Users/anttitevanlinna/Projects/agents-102'
const MEM = '/Users/anttitevanlinna/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/memory'
const FIXTURE = 'curriculum/evals/bench/fixtures/writing-5plant.md'
const COMPS = ['check_writing', 'check_student_facing', 'check_prompts', 'check_sales_copy', 'check_strategy_tie_in']

const input = args || {}
const ONLY = input.only || null   // optional list of variant ids to run

const LEDGER_FULL = `## Completeness ledger — one row per numbered rule

\`rules_evaluated\` is the coverage ledger, not a highlights reel. Carry exactly one entry for EVERY numbered rule in \`check_writing\` and \`check_student_facing\`, no omission — a rule that does not apply is \`verdict: "N/A"\` with a one-clause reason. Use the \`rule_inventory\` in the body view for the counts rather than counting by hand.`

const LEDGER_FIRES_ONLY = `## Report what fires — no N/A ledger

Do NOT emit a row for every numbered rule. Read every rule in scope, then emit rows ONLY for rules that actually have something to say about this body: a REVISE, or a PASS on a rule that came close enough to be worth recording. Rules that cannot fire on this surface get no row at all.

This is how the \`story\` class has always worked. Reading is unchanged and total — it is the WRITING that is scoped. Do not skim the compendium because your output is shorter.`

// The brief: rules the prefill already resolved by shape are excluded from the
// read. Lossless in the sense that those rows are answered and already in the
// instance — but it is still a reduction in what the judge sees, so it is a
// variant to be scored, not an optimisation to be assumed.
const BRIEF = `## Read the brief, not all five compendiums

\`\`\`
node curriculum/evals/scripts/derive-class-brief.js ${FIXTURE} writing
\`\`\`

Writes one assembled file containing every in-scope rule VERBATIM — full lead, full body, every carve-out and boundary clause — minus the rules the shape-gated prefill already resolved. Read that one file instead of the five compendiums. If it reports that it could not build, fall back to reading the five in full and say so in \`notes\`.`

function prompt(v) {
  return `You are the **writing** eval judge for \`${FIXTURE}\`. Repo root \`${REPO}\` — cd there first.

This file is a BENCH FIXTURE: a real exercise body with defects deliberately inserted. Judge it exactly as you would judge live curriculum. Do not try to guess which lines were planted — report what the rules actually catch.

## Read IN FULL, no index files

1. \`curriculum/evals/judges/_dispatch-preamble.md\`
2. \`curriculum/evals/judges/writing.md\`
${v.brief ? BRIEF : `3. ${COMPS.map(c => `${MEM}/${c}.md`).join('\n   - ')}`}

## The precomputed view — do not re-derive it

\`\`\`
node curriculum/evals/scripts/derive-body-view.js ${FIXTURE}
\`\`\`

Carries \`maintainer_cut\`, \`fence_ranges\`, \`body_regions\`, a numbered body projection you can grep in-region by construction, and mechanical greps each with a \`planted_proof\`. Do not write your own body projection and do not plant your own test string.

${v.ledger === 'fires' ? LEDGER_FIRES_ONLY : LEDGER_FULL}

## You are READ-ONLY on the fixture

The only file you write is your instance JSON: \`curriculum/evals/bench/runs/${v.id}.instance.json\`. Write it with the Write tool BEFORE composing your reply, then verify it parses with \`node -e "JSON.parse(require('fs').readFileSync('<path>','utf8'))"\`.

Shape: \`{class, file, verdict, body_sha, rules_evaluated:[{compendium, rule_index, rule_lead, verdict, evidence, fix_hint, blocking}], findings:[{rule,line,quote,harm,fix}], todos:[{rule,line,note}], blocking_findings_count, todos_count}\`.

**Every defect you find must name its LINE and quote the offending text**, in \`findings\` (blocking) or \`todos\` (not). A rule number with no line and no quote does not tell the maintainer what to fix.

Return the structured verdict.`
}

const VERDICT = {
  type: 'object',
  required: ['verdict', 'rows_written', 'findings_count', 'todos_count'],
  properties: {
    verdict: { enum: ['PASS', 'PASS_WITH_TODOS', 'REVISE'] },
    rows_written: { type: 'integer', description: 'real count of rules_evaluated entries in the file you wrote' },
    findings_count: { type: 'integer' },
    todos_count: { type: 'integer' },
    notes: { type: 'string' },
  },
}

const VARIANTS = [
  { id: 'v0-control', ledger: 'full', brief: false, label: 'full ledger · 5 compendiums' },
  { id: 'v1-brief', ledger: 'full', brief: true, label: 'full ledger · prefill brief' },
  { id: 'v2-fires', ledger: 'fires', brief: false, label: 'fires-only · 5 compendiums' },
  { id: 'v3-both', ledger: 'fires', brief: true, label: 'fires-only · prefill brief' },
].filter(v => !ONLY || ONLY.includes(v.id))

phase('Race')
log(`racing ${VARIANTS.length} dispatch variants on ${FIXTURE} — 5 planted defects, recall scored before speed`)

// Wall-clock per variant. Date.now() is unavailable in workflow scripts (it
// would break resume), so each judge is asked for nothing time-related and the
// ordering of completion is what the runner records instead. Real seconds come
// from the instance file mtimes, which the scorer reads afterwards.
const results = await parallel(VARIANTS.map(v => () =>
  agent(prompt(v), { label: `judge:${v.id}`, phase: 'Race', schema: VERDICT })
    .then(r => ({ variant: v, result: r }))
    .catch(() => ({ variant: v, result: null }))))

const done = results.filter(Boolean)
log(`raced: ${done.filter(d => d.result).length}/${VARIANTS.length} returned`)

return {
  fixture: FIXTURE,
  variants: done.map(d => ({
    id: d.variant.id,
    label: d.variant.label,
    ledger: d.variant.ledger,
    brief: d.variant.brief,
    returned: !!d.result,
    verdict: d.result ? d.result.verdict : null,
    rows_written: d.result ? d.result.rows_written : null,
    findings_count: d.result ? d.result.findings_count : null,
    todos_count: d.result ? d.result.todos_count : null,
    notes: d.result ? (d.result.notes || '') : 'agent did not return',
    instance: `curriculum/evals/bench/runs/${d.variant.id}.instance.json`,
  })),
  score_with: 'node curriculum/evals/scripts/judge-bench.js --score curriculum/evals/bench/runs/<id>.instance.json',
}
