export const meta = {
  name: 'eval-sweep',
  description: 'Fire one class judge per owing (file, class) pair, adversarially verify every blocking finding, return what survived',
  whenToUse: 'Clearing the eval queue. Pass {items} from `eval-queue.js --training <t> --json` — items must be supplied, the script cannot read the board itself. Optional: {confirm} = ARRAY of post-fix re-verification items, {sets} = ARRAY of module sets for cross_module; neither is a boolean flag, omit to skip that phase. Judges are read-only; the orchestrator applies findings and stamps afterwards.',
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

// `confirm` and `sets` are lists, not switches. A caller who reads the
// whenToUse as offering a go-ahead flag passes `confirm: true`, and the bare
// `for (const c of CONFIRM)` below then throws `true is not iterable` from the
// slug validator — a stack trace about canonical slugs for an argument that
// never was one. Name the shape at the door instead.
for (const [name, val] of [['confirm', input.confirm], ['sets', input.sets]]) {
  if (val != null && !Array.isArray(val)) {
    throw new Error(`${name} must be an array, got ${typeof val} (${JSON.stringify(val)}). ` +
      `\`confirm\` is a list of post-fix re-verification items ` +
      `([{file, slug, cls, pin, finding, applied, checks}]); \`sets\` is a list of module sets ` +
      `([{training, name, members}]). Neither is a boolean go-ahead — omit it to skip that phase.`)
  }
}
// Optional per-role model override: {models: {judge: 'sonnet', refute: 'haiku'}}.
// Defaults preserve historical behavior: judges on sonnet, refuters inherit the session model.
const MODELS = Object.assign({ judge: 'sonnet', refute: null }, input.models || {})

// The slug reaches the dispatched prompt verbatim as the instance path the
// judge overwrites, so a bare or missing slug becomes a stray file beside the
// canonical one — two files, one truth (wave 7, push-back-on-the-plan wrote
// `push-back-on-the-plan.technical.json` from a hand-built confirm item).
// Canonical is always `<training>--<surface-type>--<name>`; refuse anything
// else BEFORE spending a judge on it. Queue items may omit instanceSlug (the
// no-slug path has its own handling); a supplied one must still be canonical.
const CANON = /^[a-z0-9-]+--[a-z0-9_-]+--[a-z0-9-]+$/
for (const c of CONFIRM) {
  if (!c.slug || !CANON.test(c.slug)) throw new Error(`confirm item for ${c.file}: ${JSON.stringify(c.slug)} is not a canonical instance slug (<training>--<type>--<name>)`)
}
for (const it of ITEMS) {
  if (it.instanceSlug && !CANON.test(it.instanceSlug)) throw new Error(`item ${it.file}: ${JSON.stringify(it.instanceSlug)} is not a canonical instance slug (<training>--<type>--<name>)`)
}

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
  required: ['file', 'class', 'verdict', 'body_sha', 'ungrounded_count', 'rows_written_by_you', 'rows_spliced_by_merge', 'diff_summary', 'findings', 'todos'],
  properties: {
    // The TARGET file, not the instance you wrote. A story judge returned its
    // own instance path here and the summary then named the wrong file as the
    // thing judged — harmless in a one-item run, unreadable in a sweep of 70.
    file: { type: 'string', description: 'the curriculum file you judged, exactly as the header names it — NOT the instance JSON you wrote' },
    class: { type: 'string' },
    // PASS_WITH_TODOS is the rung a binary schema kept collapsing into REVISE.
    // A judge with a non-blocking observation must be able to say so without
    // the orchestrator reading it as a gate.
    verdict: { enum: ['PASS', 'PASS_WITH_TODOS', 'REVISE'] },
    body_sha: { type: 'string', description: 'shasum -a 256 of the file, first 64 hex, taken when you START reading' },
    // §49's companion. Re-deriving the parked rows costs only time, so it is
    // invisible in a finished instance: same ledger, same verdict, same hash.
    // Splitting the ledger by who wrote each row turns a four-minute tax into a
    // two-integer diff the orchestrator can see without timing anything.
    rows_written_by_you: { type: 'integer', description: 'rows YOU judged and wrote. Should be about what the class brief said it kept — much higher means you re-derived rows the prefill had already parked.' },
    rows_spliced_by_merge: { type: 'integer', description: 'the integer `prefill-instance.js --merge` reported splicing in. Zero when the prefill parked nothing; near-zero when the prefill parked plenty means you did its work again.' },
    ungrounded_count: { type: 'integer', description: 'real integer from `check-instance-evidence.js` on the instance you wrote — a finding with no quote or harm, a REVISE or judgement PASS with no evidence, an N/A with no reason. A terse N/A is healthy and is NOT counted.' },
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

const EVIDENCE_FULL = `## Verdict discipline

- **A blocking finding owes a harm statement** — what goes wrong in the room or on the page. "Violates §N" with no harm is a citation, not a finding. A rule firing is not the harm arriving.
- **Non-blocking goes in \`todos\`, and the verdict is PASS_WITH_TODOS.** Do not report REVISE to make an observation visible; REVISE means a gate, and a TODO escalated to a gate costs a maintainer decision that was never owed.
- **A PASS owes evidence too.** A mechanically-checkable rule marked PASS carries the command result; a judgement rule marked PASS quotes the line closest to violating it, with line number, and says why it stays inside; a rule that does not apply is N/A with a one-clause reason. Nothing is PASS by default. Validate your own greps against a planted test string before trusting a zero.
- **No citing a tool you did not run.** If your evidence names a script, command or exit code, you must have RUN it in this session; paste the exact command and its real output. Never report that a checker "confirms" something from inference about what it probably does.
- **Stay in your class.** Evaluate only the compendiums your template puts in scope. A verdict outside your lane is not extra coverage, it is an unowned claim that outranks nothing and can contradict something. Put it in \`todos\`.`

// Lean is not a block of prose any more — it is `_dispatch-preamble.md`
// §Mechanics, which every judge reads in full anyway. `full` is the escape
// hatch: an override appended after the preamble for a sweep that must be able
// to say it re-derived every row from scratch.
const EVIDENCE = EVIDENCE_MODE === 'full' ? EVIDENCE_FULL : ''


// The prefill resolves the rows that turn on the file's SHAPE rather than its
// prose — carried from the prior instance only when a shape hash proves the
// structural inventory is unchanged, and only ever N/A or a proven-grep PASS.
// A REVISE is never carried: that is a claim about prose, and prose is what
// moved. No prior instance, an unreadable one, a changed shape or an unproven
// grep all fall through to the judge.
//
// The `--merge` half is not decoration. `derive-class-brief.js` DROPS exactly
// the rules the sidecar holds, so a judge that runs `--write` and skips
// `--merge` loses those rows from the ledger — a coverage hole that reads as a
// clean run. An earlier version of this note asserted the rows were "already in
// your instance file" and no code path had ever put them there.
function prefillNote(j) {
  if (!j.slug) return ''
  return `
## Rows resolved before you started — park them, then splice them

\`\`\`
node curriculum/evals/scripts/prefill-instance.js ${j.file} ${j.cls} --write
\`\`\`

Parks the shape-resolved rows in a sidecar and tells you how many are yours.

**Emit rows ONLY for the rules your brief contains.** A rule the brief omitted is parked and answered; writing your own row for it is the whole cost this mechanism removes, and it is invisible afterwards because the finished ledger looks identical either way. Measured on the run that caught it: a judge re-derived 75 of 77 parked N/A rows and the merge had nothing left to splice.

After you write your instance, and before you reply:

\`\`\`
node curriculum/evals/scripts/prefill-instance.js ${j.file} ${j.cls} --merge
\`\`\`

Report both integers: the rows you wrote yourself as \`rows_written_by_you\`, and the number \`--merge\` splices in as \`rows_spliced_by_merge\`. \`no prior instance\`, \`shape changed\` or \`predates shape_hash\` means nothing was parked and every row is yours — the fail-closed path, not an error. Record \`shape_hash\` at the top level of your instance exactly as the prefill reports it.
`
}

// Every flag below now reaches the dispatched prompt. They did not, for one
// release: BRIEF, LAZY_EXPAND, BATCH_READ, NO_DIFF, NO_PREAMBLE and FIRES_ONLY
// were all declared, documented with the measurements that justified them, and
// read by nothing. The workflow advertised a 51% reduction and dispatched the
// control prompt. Dead constants are invisible exactly in proportion to how
// well they are commented, so `eval-sweep.test.js` now asserts the prompt text
// each one produces.
// The class templates were written for the skill door, which substitutes
// `{{file_path}}`, `{{compendium_paths}}`, `{{trace_path}}` and
// `{{catalog_path}}` before dispatch. This door hands the judge the template
// PATH and asks it to read the file, so every placeholder arrives as literal
// braces. Harmless for `{{file_path}}` (the header already names the file);
// load-bearing for `story` and `behavior`, whose templates tell the judge to
// read a sim-trace cache at `{{trace_path}}` and write the merged trace back
// there. Bind them here instead.
const TRACE_SUFFIX = { story: 'persona', behavior: 'behavior' }
function paramsBlock(j) {
  const rows = [`- \`{{file_path}}\` → \`${j.file}\``,
                '- `{{compendium_paths}}` → the rulebook named above']
  const suffix = TRACE_SUFFIX[j.cls]
  if (suffix) {
    rows.push(j.slug
      ? `- \`{{trace_path}}\` → \`curriculum/evals/sim-cache/${j.slug}.${suffix}.json\``
      : '- `{{trace_path}}` → **no slug was supplied, so no trace path exists.** Regenerate the trace rather than guessing a filename, and say so in `notes`.')
  }
  if (j.cls === 'behavior') rows.push('- `{{catalog_path}}` → `curriculum/evals/simulation-behavior.md`')
  return `\n**Your template was written for a dispatcher that substitutes its placeholders. This one does not — bind them yourself:**\n\n${rows.join('\n')}\n`
}

function readSection(j) {
  const comps = (COMPENDIA[j.cls] || []).map(c => `${MEM}/${c}.md`).join('\n  - ')
  const preamble = NO_PREAMBLE
    ? `1. **Dispatch contract:** \`curriculum/evals/judges/_dispatch-preamble.md\` — skim for boundary cases only (this run was dispatched with \`noPreamble\`, which the bench measured as free because it cannot stage a stale cache or an out-of-lane verdict; it is not free, it is unmeasured).`
    : `1. \`curriculum/evals/judges/_dispatch-preamble.md\` IN FULL — the dispatch contract, including §Mechanics, which tells you what not to re-derive.`
  const rulebook = BRIEF
    ? `3. Your rulebook:
\`\`\`
node curriculum/evals/scripts/derive-class-brief.js ${j.file} ${j.cls}
\`\`\`
Every in-scope rule VERBATIM — full lead, full body, every carve-out — minus the rules the prefill resolved. If it cannot build, read these in full instead and say so in \`notes\`:
  - ${comps}`
    : `3. Read IN FULL, no index files:
  - ${comps}`
  const batch = BATCH_READ
    ? `\n**Issue the template read, the rulebook and the body view in ONE turn** — they have no dependency on each other, and three sequential round-trips for three independent reads is the largest avoidable cost in a judge run.\n`
    : ''
  const expand = LAZY_EXPAND
    ? `\n## The read view\n\nThe body view's \`signals\` tell you whether there is anything to expand. Run \`node scripts/expand-md.js ${j.file}\` only if \`has_prompt_blocks\` or \`has_figures\` is true; on a file with neither it returns the source and costs a read. Cite line numbers against the RAW source either way.\n`
    : `\n## The read view\n\n\`node scripts/expand-md.js ${j.file}\` gives the student's view ({{prompt:}} / {{figure:}} expanded). Judge that; cite line numbers against the RAW source.\n`
  return `## Read

${preamble}
2. \`curriculum/evals/judges/${TEMPLATE[j.cls]}\`${paramsBlock(j)}
${rulebook}

Judges cite rule numbers and adjudicate boundary cases, so the \`_index/\` leads are never enough.
${batch}${expand}
## Your geometry is already computed

\`\`\`
node curriculum/evals/scripts/derive-body-view.js ${j.file}
\`\`\`

\`_dispatch-preamble.md\` §Mechanics says what it carries and what you therefore must not re-derive. Grep \`projections.body_numbered\`, not the source: a hit there is in-region by construction.`
}

function judgePrompt(j) {
  const drift = j.reason === 'rule-drift' && j.rules.length
    ? `\n## This class is stale because a RULE moved, not because the body did\n\nRe-read each at its CURRENT wording and check the body against it:\n\n${j.rules.map(r => `  - ${r}`).join('\n')}\n\nFetch with \`node curriculum/evals/scripts/rule.js <surface> <N>\` (surface = compendium name without \`check_\`; sub-rules like \`52c\` and \`11a\` resolve too). List each in \`drift_rules_reread\` with the verdict you reached. The body may not have moved at all — a clean diff is not a PASS on its own here, and the rest of the class is still a normal read.\n`
    : ''
  const diff = (j.pin && !NO_DIFF)
    ? `\n## Run your own diff\n\nPin \`${j.pin}\`, staleness reason **${j.reason}**.\n\n\`\`\`\ngit diff ${j.pin}..HEAD -- ${j.file}\n\`\`\`\n\n**Do not filter with \`grep -E '^[-+][^-+]'\`** — it silently drops every markdown bullet line (an added bullet is \`+- \`). Use \`grep -E '^[-+]' | grep -vE '^(\\+\\+\\+|---)'\` if you must. Do not scope your read to the diff: findings are routinely pre-existing lines every diff-scoped pass skipped.\n`
    : (j.pin ? `\n## Staleness\n\nPin \`${j.pin}\`, reason **${j.reason}**. This run was dispatched with \`noDiff\`: say so in \`diff_summary\` rather than describing a diff you did not run.\n` : '')
  const fires = FIRES_ONLY
    ? `\n## Report what fires — no N/A ledger\n\nDo NOT emit a row for every numbered rule. Read every rule in scope, then emit rows ONLY for rules with something to say about this body. Reading is unchanged and total — it is the WRITING that is scoped. **This changes the shape of the corpus**: \`audit-eval-coverage.js\` must already understand it, or every absent row reads as an unproven hole.\n`
    : ''
  return `You are the **${j.cls}** eval judge for \`${j.file}\`. Repo root \`${REPO}\` — cd there first.

${readSection(j)}
${PREFILL ? prefillNote(j) : ''}
${diff}${drift}
## Before filing anything

Read the \`<!-- maintainer -->\` block. It carries **dated accept-notes** where the maintainer authorised something a rule would otherwise catch. A finding against a documented accept-note is a false positive that costs real attention. List every accept-note you find in \`accept_notes_found\`. The body view has already extracted them.

Maintainer and \`<!-- backing -->\` blocks are prose and in scope for \`check_writing §3\`: a block states what is TRUE NOW, not the diff it just recorded.

${READ_ONLY}

## Write the instance
${j.slug ? `
Overwrite \`curriculum/evals/instances/${j.slug}.${j.cls}.json\` in the shape already there, with \`body_sha\` and \`shape_hash\` at top level. Then run and report the real integer:
\`\`\`
node curriculum/evals/scripts/check-instance-evidence.js curriculum/evals/instances/${j.slug}.${j.cls}.json
\`\`\`
It counts ungrounded verdicts only — a terse N/A is healthy and is not one. Report its count as \`ungrounded_count\`. Its top-level \`verdict\` must match what you return here — a gate compares the two and fires when they disagree.
` : ''}${fires}${EVIDENCE}

Return the structured verdict.`
}

function confirmPrompt(c) {
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

${readSection({ file: c.file, cls: c.cls })}

This is a full class judgement, not a check of the one line. The previous pass at this pin missed the finding you are confirming, so do not assume the rest of the class was read correctly either.

${READ_ONLY}

Overwrite \`curriculum/evals/instances/${c.slug}.${c.cls}.json\`, \`body_sha\` at top level, and report \`ungrounded_count\` from \`node curriculum/evals/scripts/check-instance-evidence.js\` on it. If the fix swapped one violation for another, or removed the defect and broke the sentence, say so — that is not resolved.

${EVIDENCE}

Return the structured verdict.`
}

function setPrompt(s) {
  return `You are the **cross_module** eval judge for the AE101 module set **${s.name}**. Repo root \`${REPO}\` — cd there first.

Members, in student order:
${s.members.map(m => `  - ${m}`).join('\n')}

Read IN FULL: \`curriculum/evals/judges/_dispatch-preamble.md\` (the dispatch contract), \`curriculum/evals/judges/cross-module.md\` and \`${MEM}/check_cross_module.md\`. §Mechanics applies per member file — derive each member's body view rather than projecting the bodies yourself.

Judge the SET, not the files: every adjacent pair, both ends. A gap assigned at one end and not echoed at the other is the failure this class exists to catch — walk each pair in both directions and say which you walked.

${READ_ONLY}

Overwrite \`curriculum/evals/instances/${s.training}--module-set--${s.name}.cross_module.json\` with a \`body_sha\` MAP (one sha per member) and a \`module_set\` array of the member paths. Report \`ungrounded_count\` from \`check-instance-evidence.js\` on it. A row stamped on no member is invisible to the queue, so name the set exactly as above.

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
    ungrounded_count: v.ungrounded_count,
    rows: { judged: v.rows_written_by_you, spliced: v.rows_spliced_by_merge },
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
