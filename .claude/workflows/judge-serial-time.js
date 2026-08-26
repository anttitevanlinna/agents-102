export const meta = {
  name: 'judge-serial-time',
  description: 'Time control vs champion judge dispatch strictly serially, one agent at a time',
  whenToUse: 'After a hillclimb has settled on flags. Rounds cannot measure seconds — challengers race over shared slots, so in-round wall-clock is contention. This runs one agent at a time so the clock means something.',
  phases: [
    { title: 'Control', detail: 'baseline dispatch, alone on the machine' },
    { title: 'Champion', detail: 'winning flags, alone on the machine' },
  ],
}

// Wall-clock is the whole point here, so nothing may run beside anything else.
// Generation 1 raced four variants in parallel and produced timings in which
// the variant doing HALF the writing came in slowest — pure slot contention,
// reported as if it were variant cost. Rows are deterministic and survive
// parallelism; seconds do not.
//
// Date.now() is unavailable in workflow scripts, so each agent is asked to
// stamp the clock itself with `date +%s` either side of its own work and return
// both. That makes the measurement the agent's own observation rather than an
// inference from when the orchestrator happened to notice it finished.

const REPO = '/Users/anttitevanlinna/Projects/agents-102'
const MEM = '/Users/anttitevanlinna/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/memory'
const COMPS = ['check_writing', 'check_student_facing', 'check_prompts', 'check_sales_copy', 'check_strategy_tie_in']
const FIXTURE = 'curriculum/evals/bench/fixtures/writing-5judge.md'

const TIMING = `## Time yourself

Run \`date +%s\` as your FIRST action and again as your LAST action before replying, and return both integers as \`started_at\` and \`ended_at\`. Do not estimate either. Do not reuse a number you saw earlier in the session.`

function controlPrompt(id) {
  return `You are the **writing** eval judge for \`${FIXTURE}\`. Repo root \`${REPO}\` — cd there first.

${TIMING}

## Read IN FULL

1. \`curriculum/evals/judges/_dispatch-preamble.md\`
2. \`curriculum/evals/judges/writing.md\`
3. Rules:
${COMPS.map(c => `   - ${MEM}/${c}.md`).join('\n')}

## The read view

\`node scripts/expand-md.js ${FIXTURE}\` gives the student's view. Judge that; cite line numbers against the RAW source.

## Run your own diff

This fixture derives from \`curriculum/exercises/close-the-ticket.md\`. Diff against it to see what moved.

## Completeness ledger — one row per numbered rule

Carry exactly one entry for EVERY numbered rule in \`check_writing\` and \`check_student_facing\`, no omission. A rule that does not apply is \`verdict: "N/A"\` with a one-clause reason.

## READ-ONLY on the fixture

Write only \`curriculum/evals/bench/runs/${id}.instance.json\`, with the Write tool, BEFORE composing your reply. Shape: \`{class,file,verdict,body_sha,rules_evaluated:[{compendium,rule_index,rule_lead,verdict,evidence,fix_hint,blocking}],findings:[{rule,line,quote,harm,fix}],todos:[{rule,line,note}],blocking_findings_count,todos_count}\`.

**Every defect must name its LINE and quote the text** — a defect of voice, register or a missing carve-out counts exactly as much as a banned word.

Return the structured verdict.`
}

function championPrompt(id) {
  return `You are the **writing** eval judge for \`${FIXTURE}\`. Repo root \`${REPO}\` — cd there first.

${TIMING}

## Read

**Dispatch clauses (condensed — full file is \`curriculum/evals/judges/_dispatch-preamble.md\` if you need a boundary case):**
- Read rules at their T3 wording, never an \`_index/\` lead: a lead states the prohibition and drops the exception.
- Before any REVISE, state in one line WHAT HARM the rule prevents and whether it is present here. A rule firing is not the harm arriving.
- Never cite a command you did not run. Paste real output.
- A PASS owes evidence: the command result, or the line closest to violating and why it stays inside.
- Check the maintainer block for a dated accept-note before filing anything.
- Stay in your class. Out-of-lane observations go in \`notes\`.
- Never carry a quote forward from a cache without grepping it against the live file.

Then \`curriculum/evals/judges/writing.md\` in full, and the rulebook:

\`\`\`
node curriculum/evals/scripts/derive-class-brief.js ${FIXTURE} writing
\`\`\`

Every in-scope rule VERBATIM, minus rules the shape-gated prefill already resolved. If it cannot build, read the five compendiums in full and say so in \`notes\`.

**Issue the reads for the template, the rulebook and the body view in ONE turn** — they have no dependency on each other.

## The precomputed view — do not re-derive it

\`\`\`
node curriculum/evals/scripts/derive-body-view.js ${FIXTURE}
\`\`\`

Carries \`maintainer_cut\`, \`fence_ranges\`, \`body_regions\`, a numbered body projection in-region by construction, and mechanical greps each with a \`planted_proof\`. Do not write your own projection; do not plant your own test string. Run \`expand-md.js\` ONLY if \`signals\` reports \`has_prompt_blocks\` or \`has_figures\`.

## Report what fires — no N/A ledger

Do NOT emit a row for every numbered rule. Read every rule in scope, then emit rows ONLY for rules with something to say about this body. Rules that cannot fire get no row. Reading is unchanged and total — it is the WRITING that is scoped. Do not skim the compendium because your output is shorter.

## READ-ONLY on the fixture

Write only \`curriculum/evals/bench/runs/${id}.instance.json\`, with the Write tool, BEFORE composing your reply. Same shape as any instance.

**Every defect must name its LINE and quote the text** — a defect of voice, register or a missing carve-out counts exactly as much as a banned word.

Return the structured verdict.`
}

const SCHEMA = {
  type: 'object',
  required: ['verdict', 'rows_written', 'started_at', 'ended_at'],
  properties: {
    verdict: { enum: ['PASS', 'PASS_WITH_TODOS', 'REVISE'] },
    rows_written: { type: 'integer' },
    findings_count: { type: 'integer' },
    todos_count: { type: 'integer' },
    started_at: { type: 'integer', description: 'unix seconds from `date +%s` run as your first action' },
    ended_at: { type: 'integer', description: 'unix seconds from `date +%s` run as your last action' },
    notes: { type: 'string' },
  },
}

// Strictly sequential. No parallel(), no pipeline() — the second agent must not
// start until the first has returned, or the clock is measuring contention again.
phase('Control')
log('serial timing 1/2: control dispatch, alone')
const control = await agent(controlPrompt('serial-control'), { label: 'serial:control', phase: 'Control', schema: SCHEMA })

phase('Champion')
log('serial timing 2/2: champion dispatch, alone')
const champ = await agent(championPrompt('serial-champion'), { label: 'serial:champion', phase: 'Champion', schema: SCHEMA })

const secs = r => (r && r.ended_at && r.started_at ? r.ended_at - r.started_at : null)
const cs = secs(control)
const hs = secs(champ)

log(`control ${cs ?? '?'}s · champion ${hs ?? '?'}s`)

return {
  fixture: FIXTURE,
  control: control ? { seconds: cs, rows: control.rows_written, verdict: control.verdict, findings: control.findings_count, todos: control.todos_count } : null,
  champion: champ ? { seconds: hs, rows: champ.rows_written, verdict: champ.verdict, findings: champ.findings_count, todos: champ.todos_count } : null,
  delta_pct: cs && hs ? Math.round(100 * (cs - hs) / cs) : null,
  caveat: 'One serial replicate each. A single pair cannot separate variant cost from run-to-run variance; the four identical-config replicates in rounds 6/8/9/10 put total-row variance at about 3%, but nothing here bounds time variance. Score both instances with judge-bench before believing either number.',
}
