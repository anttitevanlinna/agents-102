export const meta = {
  name: 'eval-sweep',
  description: 'Fire one class judge per owing (file, class) pair, adversarially verify every blocking finding, return what survived',
  whenToUse: 'Clearing the eval queue. Pass args from `eval-queue.js --training <t> --json`, or {training, limit} to let the sweep read the board itself. Judges are read-only; the orchestrator applies findings and stamps afterwards.',
  phases: [
    { title: 'Judge', detail: 'one agent per (file, class) pair, each running its own pinned diff' },
    { title: 'Verify', detail: 'two adversarial refuters per BLOCKING finding — lenses scope / harm' },
  ],
}

// ---------------------------------------------------------------------------
// Why this is a named workflow and not another scratchpad script.
//
// Six of these were hand-built in one session (set-a … set-g). Each copy drifted:
// one lost the read-only clause and five verdicts died to a sibling write-race;
// one crashed on a refuter that returned null; one forced a binary PASS/REVISE
// schema so a judge with a non-blocking TODO had to report REVISE, and the
// orchestrator read that as a gate. Agent-written dispatch drifts exactly like
// agent-written prose does, and the fix is the same: one artefact, edited.
// ---------------------------------------------------------------------------

const MEM = '/Users/anttitevanlinna/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/memory'
const REPO = '/Users/anttitevanlinna/Projects/agents-102'

const COMPENDIA = {
  writing: ['check_writing', 'check_student_facing', 'check_prompts', 'check_sales_copy', 'check_strategy_tie_in'],
  story: ['check_lectures', 'check_pedagogy', 'check_prompts', 'check_strategy_tie_in', 'check_workshop'],
  technical: ['check_platform_and_boundaries', 'check_research_claims', 'check_pedagogy', 'check_prompts'],
  pedagogy: ['check_pedagogy', 'check_workshop'],
  strategy: ['check_strategy_tie_in'],
  slides: ['check_slides'],
  behavior: ['check_prompts', 'check_pedagogy'],
  cross_module: ['check_cross_module'],
}
const TEMPLATE = {
  writing: 'writing.md', story: 'story.md', technical: 'technical.md', pedagogy: 'pedagogy.md',
  strategy: 'strategy.md', slides: 'slides.md', behavior: 'prompt-behavior.md', cross_module: 'cross-module.md',
}

// args shapes accepted:
//   [{file, classes:[...], detail:{cls:reason}, driftRules:{cls:[...]}, instanceSlug}, ...]   (eval-queue --json)
//   {items: [...same...], confirm: [...], sets: [...]}
//   {training: 'ae101'}  — nothing to read the board with in-script, so items must be supplied
const input = Array.isArray(args) ? { items: args } : (args || {})
const ITEMS = input.items || []
const CONFIRM = input.confirm || []   // [{file, slug, cls, pin, finding, applied, checks:[[cmd, expected]]}]
const SETS = input.sets || []         // [{training, name, members:[rel...]}]

const JOBS = []
for (const it of ITEMS) {
  for (const cls of it.classes || []) {
    JOBS.push({
      file: it.file,
      slug: it.instanceSlug || null,
      cls,
      pin: (it.pins && it.pins[cls]) || it.pin || null,
      reason: (it.detail && it.detail[cls]) || 'unknown',
      rules: ((it.driftRules && it.driftRules[cls]) || []).map(r =>
        typeof r === 'string' ? r : `${String(r.compendium).replace(/^check_/, '')} §${r.rule}`),
    })
  }
}

const VERDICT_SCHEMA = {
  type: 'object',
  required: ['file', 'class', 'verdict', 'body_sha', 'evidence_null_count', 'diff_summary', 'findings', 'todos'],
  properties: {
    file: { type: 'string' },
    class: { type: 'string' },
    // PASS_WITH_TODOS is the rung a binary schema kept collapsing into REVISE.
    // A judge with a non-blocking observation must be able to say so without
    // the orchestrator reading it as a gate.
    verdict: { enum: ['PASS', 'PASS_WITH_TODOS', 'REVISE'] },
    body_sha: { type: 'string', description: 'shasum -a 256 of the file, first 64 hex, taken when you START reading' },
    evidence_null_count: { type: 'integer', description: 'real integer from grep -c on the instance you wrote; N/A rows legitimately carry null, only a FINDING with null evidence is ungrounded' },
    diff_summary: { type: 'string', description: 'what the pinned diff actually changed, from the diff YOU ran' },
    drift_rules_reread: { type: 'array', items: { type: 'string' } },
    accept_notes_found: { type: 'array', items: { type: 'string' } },
    findings: {
      type: 'array',
      description: 'BLOCKING findings only. Each gets two adversarial refuters.',
      items: {
        type: 'object',
        required: ['rule', 'line', 'quote', 'harm', 'fix'],
        properties: { rule: { type: 'string' }, line: { type: 'integer' }, quote: { type: 'string' }, harm: { type: 'string' }, fix: { type: 'string' } },
      },
    },
    todos: {
      type: 'array',
      description: 'Non-blocking observations. Reported, never refuted, never a gate.',
      items: {
        type: 'object',
        required: ['rule', 'note'],
        properties: { rule: { type: 'string' }, line: { type: 'integer' }, note: { type: 'string' } },
      },
    },
  },
}

const REFUTE_SCHEMA = {
  type: 'object', required: ['refuted', 'reasoning'],
  properties: { refuted: { type: 'boolean' }, reasoning: { type: 'string' }, counter_evidence: { type: 'string' } },
}

const READ_ONLY = `## You are READ-ONLY on the target file

Do not edit it at all — not the body, not the maintainer block, not a backing block, not a source stamp. Other judges are reading this same file right now. On an earlier run judges were allowed to fix maintainer notes; five verdicts were then thrown away because a sibling wrote the file mid-read and the recorded \`body_sha\` matched no commit. Scope-of-content is not scope-of-concurrency: the sha covers the whole file.

Anything you would have fixed goes in \`findings\` (blocking) or \`todos\` (not). The orchestrator applies them after every class on this file has returned. The only file you write is your own instance JSON.`

const EVIDENCE = `## Verdict discipline

- **A blocking finding owes a harm statement** — what goes wrong in the room or on the page. "Violates §N" with no harm is a citation, not a finding. A rule firing is not the harm arriving.
- **Non-blocking goes in \`todos\`, and the verdict is PASS_WITH_TODOS.** Do not report REVISE to make an observation visible; REVISE means a gate, and a TODO escalated to a gate costs a maintainer decision that was never owed.
- **A PASS owes evidence too.** A mechanically-checkable rule marked PASS carries the command result; a judgement rule marked PASS quotes the line closest to violating it, with line number, and says why it stays inside; a rule that does not apply is N/A with a one-clause reason. Nothing is PASS by default. Validate your own greps against a planted test string before trusting a zero.
- **No citing a tool you did not run.** If your evidence names a script, command or exit code, you must have RUN it in this session; paste the exact command and its real output. Never report that a checker "confirms" something from inference about what it probably does.
- **Stay in your class.** Evaluate only the compendiums your template puts in scope. A verdict outside your lane is not extra coverage, it is an unowned claim that outranks nothing and can contradict something. Put it in \`todos\`.`

function judgePrompt(j) {
  const comps = (COMPENDIA[j.cls] || []).map(c => `${MEM}/${c}.md`).join('\n  - ')
  const drift = j.reason === 'rule-drift' && j.rules.length
    ? `\n## This class is stale because a RULE moved, not because the body did\n\nRe-read each at its CURRENT wording and check the body against it:\n\n${j.rules.map(r => `  - ${r}`).join('\n')}\n\nFetch with \`node curriculum/evals/scripts/rule.js <surface> <N>\` (surface = compendium name without \`check_\`; sub-rules like \`52c\` and \`11a\` resolve too). List each in \`drift_rules_reread\` with the verdict you reached. The body may not have moved at all — a clean diff is not a PASS on its own here, and the rest of the class is still a normal read.\n`
    : ''
  const diff = j.pin
    ? `\n## Run your own diff\n\nPin \`${j.pin}\`, staleness reason **${j.reason}**.\n\n\`\`\`\ngit diff ${j.pin}..HEAD -- ${j.file}\n\`\`\`\n\n**Do not filter with \`grep -E '^[-+][^-+]'\`** — it silently drops every markdown bullet line (an added bullet is \`+- \`). Use \`grep -E '^[-+]' | grep -vE '^(\\+\\+\\+|---)'\` if you must. Do not scope your read to the diff: findings are routinely pre-existing lines every diff-scoped pass skipped.\n`
    : ''
  return `You are the **${j.cls}** eval judge for \`${j.file}\`. Repo root \`${REPO}\` — cd there first.

## Read IN FULL, no index files

1. \`curriculum/evals/judges/_dispatch-preamble.md\`
2. \`curriculum/evals/judges/${TEMPLATE[j.cls]}\`
3. ${comps}

Judges cite rule numbers and adjudicate boundary cases, so the \`_index/\` leads are not enough.

## The read view

\`node scripts/expand-md.js ${j.file}\` gives the student's view ({{prompt:}} / {{figure:}} expanded). Judge that; cite line numbers against the RAW source.
${diff}${drift}
## Before filing anything

Read the \`<!-- maintainer -->\` block. It carries **dated accept-notes** where the maintainer authorised something a rule would otherwise catch. A finding against a documented accept-note is a false positive that costs real attention. List every accept-note you find in \`accept_notes_found\`.

Maintainer and \`<!-- backing -->\` blocks are prose and in scope for \`check_writing §3\`: a block states what is TRUE NOW, not the diff it just recorded.

${READ_ONLY}

## Write the instance
${j.slug ? `
Overwrite \`curriculum/evals/instances/${j.slug}.${j.cls}.json\` in the shape already there, with \`body_sha\` at top level. Then run and report the real integer:
\`\`\`
grep -c '"evidence": *null' curriculum/evals/instances/${j.slug}.${j.cls}.json
\`\`\`
Its top-level \`verdict\` must match what you return here — a gate compares the two and fires when they disagree.
` : ''}
${EVIDENCE}

Return the structured verdict.`
}

function confirmPrompt(c) {
  const comps = (COMPENDIA[c.cls] || []).map(x => `${MEM}/${x}.md`).join('\n  - ')
  const checks = (c.checks || []).map(([cmd, exp]) => `    ${cmd}\n      -> must print exactly ${exp}`).join('\n')
  return `You are the **${c.cls}** eval judge for \`${c.file}\`. Repo root \`${REPO}\` — cd there first.

This is a CONFIRMATION run. A blocking finding was filed, it survived refutation, and the fix has been applied. Decide whether the class is now clean.

## Run these FIRST and report the real integers in diff_summary
${checks || '    (none supplied)'}

If any number differs, the edit you were told about is not the edit on disk. Say so, return REVISE, and stop — do not judge a body you cannot confirm.

## What was found and what was done

- **Finding:** ${c.finding}
- **Applied:** ${c.applied}

## Then judge the class properly

Read IN FULL: \`curriculum/evals/judges/_dispatch-preamble.md\`, \`curriculum/evals/judges/${TEMPLATE[c.cls]}\`, and
  - ${comps}

This is a full class judgement, not a check of the one line. The previous pass at this pin missed the finding you are confirming, so do not assume the rest of the class was read correctly either.

${READ_ONLY}

Overwrite \`curriculum/evals/instances/${c.slug}.${c.cls}.json\`, \`body_sha\` at top level, and report \`evidence_null_count\`. If the fix swapped one violation for another, or removed the defect and broke the sentence, say so — that is not resolved.

${EVIDENCE}

Return the structured verdict.`
}

function setPrompt(s) {
  return `You are the **cross_module** eval judge for the AE101 module set **${s.name}**. Repo root \`${REPO}\` — cd there first.

Members, in student order:
${s.members.map(m => `  - ${m}`).join('\n')}

Read IN FULL: \`curriculum/evals/judges/cross-module.md\` and \`${MEM}/check_cross_module.md\`.

Judge the SET, not the files: every adjacent pair, both ends. A gap assigned at one end and not echoed at the other is the failure this class exists to catch — walk each pair in both directions and say which you walked.

${READ_ONLY}

Overwrite \`curriculum/evals/instances/${s.training}--module-set--${s.name}.cross_module.json\` with a \`body_sha\` MAP (one sha per member) and a \`module_set\` array of the member paths. A row stamped on no member is invisible to the queue, so name the set exactly as above.

${EVIDENCE}

Return the structured verdict.`
}

function refutePrompt(v, f, lens) {
  const angle = lens === 'scope'
    ? `**Scope lens.** (a) does the cited rule actually say what the judge claims — read it at current wording with \`rule.js\`; (b) does a carve-out or N/A clause exempt this surface type; (c) is there a dated accept-note pre-authorising exactly this; (d) is the judge binding OUR curriculum's rules to text a student's own Claude would author; (e) is the cited line inside the region the rule governs.`
    : `**Harm lens.** Grant the rule applies. (a) would anyone in the room actually be worse off, or is this tidiness; (b) is the harm a restatement of the rule rather than a consequence; (c) does the fix cost more than the defect — does it break a claim, a callback, a deliberate beat; (d) does another line already carry the meaning, making the fix a no-op; (e) verify every factual claim independently — count what it says it counted, and run \`git blame\` before accepting that a value is wrong.`
  return `You are an adversarial refuter. Kill this finding. Repo root \`${REPO}\`.

A ${v.class} judge filed a BLOCKING finding against \`${v.file}\`:

- **rule:** ${f.rule}
- **line:** ${f.line}
- **quote:** ${f.quote}
- **harm claimed:** ${f.harm}
- **fix proposed:** ${f.fix}

${angle}

Read the file, the rule in the compendium at \`${MEM}/\`, and the maintainer block. Verify every factual claim — if the judge counted something, count it yourself.

**Default to \`refuted: true\` when uncertain.** A finding survives only if it withstands you. A false finding that ships gets applied to a body that was correct.`
}

// Two refuters per blocking finding; survives only if neither kills it. A
// refuter that dies returns null — count that as NOT a refutation and say so,
// rather than crashing the stage, which is how one run lost a whole pipeline.
async function verify(v, phase) {
  const blocking = v.findings || []
  if (!blocking.length) return { ...v, adjudicated: [], confirmed: [], refuter_deaths: 0 }
  const judged = await parallel(blocking.flatMap((f, i) =>
    ['scope', 'harm'].map(lens => () =>
      agent(refutePrompt(v, f, lens), { label: `refute-${lens}:${v.class}:${f.rule}`, phase, schema: REFUTE_SCHEMA, effort: 'high' })
        .then(r => ({ f, i, lens, r })))))
  const by = new Map()
  let deaths = 0
  for (const x of judged) {
    if (!x) { deaths++; continue }
    if (!x.r) { deaths++; continue }
    const k = `${x.i}`
    if (!by.has(k)) by.set(k, { f: x.f, votes: [] })
    by.get(k).votes.push({ lens: x.lens, refuted: x.r.refuted, reasoning: x.r.reasoning })
  }
  for (const [k, x] of by) void k
  const adj = blocking.map((f, i) => {
    const rec = by.get(String(i))
    const votes = rec ? rec.votes : []
    return { ...f, votes, survives: votes.length > 0 && votes.every(w => !w.refuted), unadjudicated: votes.length < 2 }
  })
  return { ...v, adjudicated: adj, confirmed: adj.filter(a => a.survives), refuter_deaths: deaths }
}

phase('Judge')

// The three lanes are independent — a cross_module set does not wait on a class
// judge, and a confirmation does not wait on either. Awaiting them in turn made
// a 1-item + 2-confirm + 2-set run take three sequential rounds instead of one,
// for no ordering the work actually needs.
const [fromQueue, fromConfirm, fromSets] = await parallel([
  () => pipeline(
    JOBS,
    j => agent(judgePrompt(j), { label: `${j.cls}:${String(j.file).split('/').pop().replace(/\.md$/, '')}`, phase: 'Judge', schema: VERDICT_SCHEMA, model: 'sonnet' }),
    v => (v ? verify(v, 'Verify') : v),
  ),
  () => pipeline(
    CONFIRM,
    c => agent(confirmPrompt(c), { label: `confirm:${c.cls}:${String(c.file).split('/').pop().replace(/\.md$/, '')}`, phase: 'Judge', schema: VERDICT_SCHEMA, model: 'sonnet' }),
    v => (v ? verify(v, 'Verify') : v),
  ),
  () => pipeline(
    SETS,
    s => agent(setPrompt(s), { label: `cross_module:${s.name}`, phase: 'Judge', schema: VERDICT_SCHEMA, model: 'sonnet' }),
    v => (v ? verify(v, 'Verify') : v),
  ),
])

const done = [...(fromQueue || []), ...(fromConfirm || []), ...(fromSets || [])].filter(Boolean)
const expected = JOBS.length + CONFIRM.length + SETS.length
const surviving = done.filter(v => (v.confirmed || []).length)
log(`eval-sweep: ${done.length}/${expected} returned · ${done.filter(v => v.verdict === 'PASS').length} PASS · ${done.filter(v => v.verdict === 'PASS_WITH_TODOS').length} PASS+todos · ${surviving.length} with a finding surviving both refuters`)

return {
  returned: done.length,
  expected,
  // Named so the orchestrator can re-fire exactly what died rather than the set.
  missing: [...JOBS, ...CONFIRM, ...SETS]
    .filter(j => !done.some(v => v.class === j.cls && String(v.file || '').endsWith(String(j.file || j.name || '').split('/').pop())))
    .map(j => `${j.cls || 'cross_module'}:${j.file || j.name}`),
  summary: done.map(v => ({
    file: v.file, class: v.class, verdict: v.verdict, body_sha: v.body_sha,
    evidence_null_count: v.evidence_null_count,
    diff_summary: v.diff_summary,
    drift_rules_reread: v.drift_rules_reread || [],
    accept_notes_found: v.accept_notes_found || [],
    todos: v.todos || [],
    refuter_deaths: v.refuter_deaths || 0,
    confirmed: (v.confirmed || []).map(c => ({ rule: c.rule, line: c.line, quote: c.quote, harm: c.harm, fix: c.fix })),
    unadjudicated: (v.adjudicated || []).filter(a => a.unadjudicated).map(a => ({ rule: a.rule, line: a.line, votes: a.votes.length })),
    refuted: (v.adjudicated || []).filter(a => !a.survives && !a.unadjudicated)
      .map(a => ({ rule: a.rule, line: a.line, why: a.votes.filter(x => x.refuted).map(x => `${x.lens}: ${x.reasoning}`) })),
  })),
}
