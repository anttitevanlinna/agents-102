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
// Optional per-role model override: {models: {judge: 'sonnet', refute: 'haiku'}}.
// Defaults preserve historical behavior: judges on sonnet, refuters inherit the session model.
const MODELS = Object.assign({ judge: 'sonnet', refute: null }, input.models || {})

// Evidence mode. `lean` (the default) is not a relaxation of the completeness
// contract — the ledger still carries one row per rule. It moves who WRITES the
// rows nothing turns on. Measured off the instances: average rows per instance
// went 24→68 (writing), 14→100 (technical) between May and August as the
// rulebook grew, and ~70% of those rows say N/A. `story`, the one class that
// never adopted the contract, held flat at 15. The contract is right; asking a
// language model to retype a constant 70 times per file is what is wrong.
//
// `full` restores the old behaviour verbatim for a sweep that must be able to
// say it re-derived every row from scratch.
const EVIDENCE_MODE = input.evidence === 'full' ? 'full' : 'lean'
const PREFILL = input.prefill !== false

// Dispatch mechanics the hillclimb validated. Serial timing on the judgement
// fixture: control 398s / 66 rows, champion 196s / 21 rows, both scoring 5/5.
// These three are pure mechanics — they change how the judge FETCHES, never
// what it is accountable for — so they default on.
const BRIEF = input.brief !== false          // one assembled rulebook, rules verbatim
const LAZY_EXPAND = input.lazyExpand !== false // expand-md only when the view says there is something to expand
const BATCH_READ = input.batchRead !== false   // template + rulebook + view fetched in one turn

// Two knobs the climb also found "free", deliberately NOT defaulted — and the
// reason is a property of the bench, not of the knobs.
//
//   noDiff      the fixture has no quality pin, so there was no pinned diff for
//               dropping it to cost anything. Live dispatch routes staleness
//               through that diff. The bench could not see what it removes.
//   noPreamble  the preamble encodes incidents the fixture cannot stage: a
//               cached quote outliving its body, a sha matching no commit, a
//               judge wandering out of its lane. Ten planted defects say
//               nothing about whether those protections still hold.
//
// Both looked free precisely BECAUSE the bench does not test what they protect.
// A measurement's silence is not evidence of safety.
const NO_DIFF = input.noDiff === true
const NO_PREAMBLE = input.noPreamble === true

// `fires` — the fires-only ledger — is the climb's biggest single win (74% fewer
// rows at full recall on both fixtures) and is NOT wired in, because it is not
// a dispatch change, it is a corpus-shape change. `audit-eval-coverage.js` reads
// coverage off `rules_evaluated` and would read every absent N/A row as an
// unproven hole: check_platform_and_boundaries §45 is the entry about exactly
// this, a detector whose reading vocabulary no longer covers how the corpus is
// written, reporting compliance as rot. Teach the auditor the new shape first,
// then flip this. Shipping it blind would trade half an hour of sweep for a
// coverage report nobody can believe.
const FIRES_ONLY = input.evidence === 'fires'

// A dispatched unit is identified by its own key, never by matching a returned
// verdict's file string back against the request. That match used to compare
// `v.class === j.cls` and a basename suffix, which for a cross_module set means
// comparing against `undefined` and against a semicolon-joined member list — so
// every set reported as missing while `returned` said it came back. A run that
// contradicts itself in two adjacent fields is worse than one that just fails.
const keyOf = u => (u.cls ? `${u.cls}:${u.file}` : `cross_module:${u.name}`)
const tag = (verdict, unit) => (verdict ? Object.assign(verdict, { _key: keyOf(unit) }) : verdict)

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

// The geometry every judge used to derive for itself, six times per file, each
// into an unnamespaced scratch file that a concurrent judge on a different file
// could overwrite. Now derived once, keyed by source sha, named by slug.
const VIEW = `## Your geometry is already computed — do not re-derive it

\`\`\`
node curriculum/evals/scripts/derive-body-view.js <file>
\`\`\`

Writes \`curriculum/evals/body-views/<slug>.view.json\` and returns cached if the source sha is unchanged. It carries:

- \`maintainer_cut\`, \`fence_ranges\`, \`body_regions\` — 1-indexed against the RAW source, which is what a citation means.
- \`projections.body_numbered\` — the body with its raw line numbers, fences and maintainer tail already removed. **Grep THIS file.** A hit in it is in-region by construction, so the "verify the cited line is inside the body region" check your template describes is structural here, not something you perform.
- \`greps\` — the mechanical patterns, each with \`planted_proof\`. A pattern with \`status: CLEAN\` was proven against a planted violation and then returned zero on this body: that is a real zero and you may cite it. \`UNPROVEN\` means the pattern proved nothing and decides nothing — check it yourself.
- \`accept_notes\` — every dated line in the maintainer block, already extracted.
- \`rule_inventory\` — the numbered-rule count per compendium, moved-stubs excluded. Use it for the completeness count instead of counting by hand.
- \`signals\` — structural facts (has_prompt_blocks, has_urls, group_beat_markers, …). A rule that can only fire on a shape this file does not have is N/A, and the signal is the reason.

Do not write your own body projection. Do not plant your own test string. Both are done above, and the unnamespaced scratch files judges used to write collided across concurrent files.`

const EVIDENCE_LEAN = `## Verdict discipline

- **A blocking finding owes a harm statement** — what goes wrong in the room or on the page. "Violates §N" with no harm is a citation, not a finding. A rule firing is not the harm arriving. Findings carry FULL evidence, always; nothing below relaxes that.
- **Non-blocking goes in \`todos\`, and the verdict is PASS_WITH_TODOS.** Do not report REVISE to make an observation visible; REVISE means a gate, and a TODO escalated to a gate costs a maintainer decision that was never owed.
- **The ledger stays complete; the prose does not.** One row per numbered rule, as always — a missing \`rule_index\` is an unproven coverage hole. But:
  - a rule the prefill already resolved is ALREADY IN THE FILE. Leave it. Do not re-derive it, do not rewrite its evidence.
  - a rule you mark **N/A** carries \`evidence: null\` and a \`na_reason\` of at most one clause, ideally naming the signal (\`"no prompt blocks"\`). Not a paragraph.
  - a rule you mark **PASS on a mechanical check** cites the view's grep result — the pattern and its count — and nothing more.
  - a rule you mark **PASS on judgement** still quotes the line closest to violating it, with line number, and says why it stays inside. This is where the class earns its keep and it is not abbreviated.
- **A proven zero is evidence; an unproven one is not.** The view's \`planted_proof\` is what makes a zero citable. Never report a count from a pattern you did not see proven.
- **No citing a tool you did not run.** If your evidence names a script, command or exit code, you must have RUN it in this session; paste the exact command and its real output. Never report that a checker "confirms" something from inference about what it probably does.
- **Stay in your class.** Evaluate only the compendiums your template puts in scope. A verdict outside your lane is not extra coverage, it is an unowned claim that outranks nothing and can contradict something. Put it in \`todos\`.`

const EVIDENCE_FULL = `## Verdict discipline

- **A blocking finding owes a harm statement** — what goes wrong in the room or on the page. "Violates §N" with no harm is a citation, not a finding. A rule firing is not the harm arriving.
- **Non-blocking goes in \`todos\`, and the verdict is PASS_WITH_TODOS.** Do not report REVISE to make an observation visible; REVISE means a gate, and a TODO escalated to a gate costs a maintainer decision that was never owed.
- **A PASS owes evidence too.** A mechanically-checkable rule marked PASS carries the command result; a judgement rule marked PASS quotes the line closest to violating it, with line number, and says why it stays inside; a rule that does not apply is N/A with a one-clause reason. Nothing is PASS by default. Validate your own greps against a planted test string before trusting a zero.
- **No citing a tool you did not run.** If your evidence names a script, command or exit code, you must have RUN it in this session; paste the exact command and its real output. Never report that a checker "confirms" something from inference about what it probably does.
- **Stay in your class.** Evaluate only the compendiums your template puts in scope. A verdict outside your lane is not extra coverage, it is an unowned claim that outranks nothing and can contradict something. Put it in \`todos\`.`

const EVIDENCE = EVIDENCE_MODE === 'full' ? EVIDENCE_FULL : EVIDENCE_LEAN


// The prefill resolves the rows that turn on the file's SHAPE rather than its
// prose — carried from the prior instance only when a shape hash proves the
// structural inventory is unchanged, and only ever N/A or a proven-grep PASS.
// A REVISE is never carried: that is a claim about prose, and prose is what
// moved. No prior instance, an unreadable one, a changed shape or an unproven
// grep all fall through to the judge.
function prefillNote(j) {
  if (!j.slug) return ''
  return `
## Rows already resolved — leave them alone

\`\`\`
node curriculum/evals/scripts/prefill-instance.js ${j.file} ${j.cls}
\`\`\`

Reports how many rows were carried (N/A, shape-hash verified) and how many are mechanical PASSes from a proven grep. **Those rows are already in your instance file. Do not re-derive them, do not rewrite their evidence, do not delete them** — they are part of the completeness ledger and the auditor counts them.

If it reports \`no prior instance\`, \`shape changed\` or \`predates shape_hash\`, nothing was carried and every row is yours to fill as normal. That is the fail-closed path and it is not an error.

Judge the rows it did NOT resolve. Record \`shape_hash\` at the top level of the instance you write, exactly as the prefill reports it — without it the next run cannot carry anything forward and pays this cost again.
`
}

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

${VIEW}
${PREFILL ? prefillNote(j) : ''}
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
      agent(refutePrompt(v, f, lens), { label: `refute-${lens}:${v.class}:${f.rule}`, phase, schema: REFUTE_SCHEMA, effort: 'high', ...(MODELS.refute ? { model: MODELS.refute } : {}) })
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
    j => agent(judgePrompt(j), { label: `${j.cls}:${String(j.file).split('/').pop().replace(/\.md$/, '')}`, phase: 'Judge', schema: VERDICT_SCHEMA, model: MODELS.judge }),
    (v, j) => (v ? verify(v, 'Verify').then(r => tag(r, j)) : v),
  ),
  () => pipeline(
    CONFIRM,
    c => agent(confirmPrompt(c), { label: `confirm:${c.cls}:${String(c.file).split('/').pop().replace(/\.md$/, '')}`, phase: 'Judge', schema: VERDICT_SCHEMA, model: MODELS.judge }),
    (v, c) => (v ? verify(v, 'Verify').then(r => tag(r, c)) : v),
  ),
  () => pipeline(
    SETS,
    s => agent(setPrompt(s), { label: `cross_module:${s.name}`, phase: 'Judge', schema: VERDICT_SCHEMA, model: MODELS.judge }),
    (v, s) => (v ? verify(v, 'Verify').then(r => tag(r, s)) : v),
  ),
])

const UNITS = [...JOBS, ...CONFIRM, ...SETS].map(u => Object.assign(u, { _key: keyOf(u) }))
const done = [...(fromQueue || []), ...(fromConfirm || []), ...(fromSets || [])].filter(Boolean)
const expected = UNITS.length
const surviving = done.filter(v => (v.confirmed || []).length)
log(`eval-sweep: ${done.length}/${expected} returned · ${done.filter(v => v.verdict === 'PASS').length} PASS · ${done.filter(v => v.verdict === 'PASS_WITH_TODOS').length} PASS+todos · ${surviving.length} with a finding surviving both refuters`)

return {
  returned: done.length,
  expected,
  // Named so the orchestrator can re-fire exactly what died rather than the set.
  missing: UNITS.filter(u => !done.some(v => v._key === u._key)).map(u => u._key),
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
