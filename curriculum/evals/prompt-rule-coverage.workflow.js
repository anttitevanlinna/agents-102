export const meta = {
  name: 'ae101-prompt-rule-coverage',
  description: 'Rule-sharded coverage audit: fire every orphaned check_prompts rule against all 69 AE101 prompts, adversarially verify flags, emit a coverage matrix',
  phases: [
    { title: 'Inventory', detail: 'map all 42+17 rules to a firing mechanism; confirm the orphan list' },
    { title: 'Sweep', detail: 'one dedicated agent per orphan rule, swept across all 69 prompts' },
    { title: 'Verify', detail: 'adversarially refute each flag against the rule carve-outs' },
    { title: 'Synthesize', detail: 'coverage matrix + confirmed findings + close-the-holes plan' },
  ],
}

const MEM = '/Users/anttitevanlinna/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/memory'
const CHECK_PROMPTS = `${MEM}/check_prompts.md`
const CHECK_WRITING = `${MEM}/check_writing.md`
const BEHAVIOR_CATALOG = '/Users/anttitevanlinna/Projects/agents-102/.claude/skills/content-creation/simulation-behavior.md'
const JUDGES = '/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/judges'
const BUNDLE = '/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/scratch/prompt-audit-context.agentic-engineering-101.json'
const MECHANICAL = '/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/scratch/mechanical-findings.ae101.json'
const OUT_REPORT = '/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/prompt-rule-coverage.ae101.md'

const compendiumPath = (c) => (c === 'check_writing' ? CHECK_WRITING : CHECK_PROMPTS)

// Maintainer's derived candidate orphans (check_prompts rules that are body/context
// properties, apply to AE101, and aren't covered by the mechanical linter, the
// technical judge, or the behavior catalog). The inventory agent confirms/adjusts.
const CANDIDATE_ORPHANS = [
  { compendium: 'check_prompts', rule: '§5', label: 'chain by back-reference + deterministic path' },
  { compendium: 'check_prompts', rule: '§6', label: 'chained-prompt isolation — no downstream leak' },
  { compendium: 'check_prompts', rule: '§7', label: 'no session-resets mid-phase' },
  { compendium: 'check_prompts', rule: '§19', label: 'minimal hand-off + Claude self-augments (send-off)' },
  { compendium: 'check_prompts', rule: '§20', label: 'grill before save' },
  { compendium: 'check_prompts', rule: '§21', label: 'tell me what you wrote (post-action report)' },
  { compendium: 'check_prompts', rule: '§25', label: 'subagent allowed; explain why after' },
  { compendium: 'check_prompts', rule: '§27', label: 'name consumer at write time' },
  { compendium: 'check_prompts', rule: '§29', label: 'normal work request before orchestration' },
  { compendium: 'check_prompts', rule: '§33', label: 'git-output grep multi-result fallback' },
  { compendium: 'check_prompts', rule: '§34', label: 'disambiguation/decision logic lives inside the fence' },
  { compendium: 'check_prompts', rule: '§35', label: 'separate iteration from persistence' },
  { compendium: 'check_prompts', rule: '§36', label: 'wide prompts split by logical move' },
  { compendium: 'check_prompts', rule: '§37', label: 'orient saved rule by where it fires' },
  { compendium: 'check_prompts', rule: '§38', label: 'body lead-in mirrors prompt opening (+38a carve-out)' },
  { compendium: 'check_prompts', rule: '§39', label: 'declare permission-mode when paste requires a mode' },
  { compendium: 'check_prompts', rule: '§40', label: 'verify session boundary cold/warm (+40a worktree)' },
  { compendium: 'check_prompts', rule: '§41', label: 'artifact-vs-STOP tail ordering' },
  { compendium: 'check_prompts', rule: '§42', label: 'headless-runner no-AUQ guard' },
]

const INVENTORY_SCHEMA = {
  type: 'object',
  properties: {
    coverage_map: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          compendium: { type: 'string', enum: ['check_prompts', 'check_writing'] },
          rule: { type: 'string' },
          label: { type: 'string' },
          covered_by: { type: 'string', enum: ['mechanical', 'technical-judge', 'behavior-catalog', 'writing-judge', 'pedagogy-judge', 'process-hook', 'none'] },
          applies_to_ae101: { type: 'boolean' },
          body_or_context_checkable: { type: 'boolean' },
          note: { type: 'string' },
        },
        required: ['compendium', 'rule', 'covered_by', 'applies_to_ae101', 'body_or_context_checkable'],
      },
    },
    orphans: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          compendium: { type: 'string', enum: ['check_prompts', 'check_writing'] },
          rule: { type: 'string' },
          label: { type: 'string' },
          why_orphan: { type: 'string' },
        },
        required: ['compendium', 'rule', 'label'],
      },
    },
  },
  required: ['coverage_map', 'orphans'],
}

const SWEEP_SCHEMA = {
  type: 'object',
  properties: {
    rule: { type: 'string' },
    evaluated_count: { type: 'integer' },
    applicable_keys: { type: 'array', items: { type: 'string' } },
    na_keys: {
      type: 'array',
      items: { type: 'object', properties: { key: { type: 'string' }, reason: { type: 'string' } }, required: ['key', 'reason'] },
    },
    flags: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          key: { type: 'string' },
          span: { type: 'string' },
          why: { type: 'string' },
          severity: { type: 'string', enum: ['Sev-1', 'Sev-2', 'FLAG'] },
          suggested_fix: { type: 'string' },
        },
        required: ['key', 'span', 'why', 'severity', 'suggested_fix'],
      },
    },
  },
  required: ['rule', 'evaluated_count', 'applicable_keys', 'na_keys', 'flags'],
}

const VERDICT_SCHEMA = {
  type: 'object',
  properties: {
    real: { type: 'boolean' },
    reason: { type: 'string' },
    confidence: { type: 'string', enum: ['high', 'med', 'low'] },
  },
  required: ['real', 'reason'],
}

// ---- Phase 1 — coverage inventory ----
phase('Inventory')

const inventoryPrompt = `You are auditing the RULE-COVERAGE of the Agents 102 curriculum's prompt-checking system. The maintainer's recurring problem: there are many rules, and NOT all of them actually get CHECKED against prompts — some belong to no standing checker. Map every prompt-applicable rule to its firing mechanism and identify the ORPHANS.

Read these authoritative files (use the Read tool):
- PROMPT RULES (42 numbered + sub-rules 38a, 40a): ${CHECK_PROMPTS}
- WRITING RULES (17 numbered): ${CHECK_WRITING}
- BEHAVIOR judge CATALOG (the patterns the behavior judge actually fires): ${BEHAVIOR_CATALOG}
- TECHNICAL judge template (what it claims to own): ${JUDGES}/technical.md
- WRITING judge template: ${JUDGES}/writing.md
- BEHAVIOR judge template: ${JUDGES}/prompt-behavior.md

Facts to fold in:
- MECHANICALLY checked already (committed registry linter scripts/lint-prompt-bodies.js, fires every build): check_prompts §1, §4, §9, §24, §28, §31, §32. Mark these covered_by=mechanical.
- AE101 is Claude Code ONLY (no Cowork). check_prompts §10, §11 (dual-runtime) and §23 (Agents-101 artifact subpaths) DO NOT APPLY to AE101 — applies_to_ae101=false.
- PROCESS rules governing HOW edits are made (enforced by hooks, not judgeable as a property of a prompt body): §22, §26, §30 — body_or_context_checkable=false, covered_by=process-hook.
- Behavior catalog → check_prompts mapping (verify against the catalog you read): question-dump→§15, overwrite-anxiety→§16, file-preservation→§16, preamble-before-action / plan-mode-preamble-bloat→§17, append-vs-integrate→§12, citation-gap-asymmetry→§13, citation-cargo-cult→§13, niceness-tax→§14, self-audit-charity→§18. The technical judge owns static prompt mechanics: action lead-in→§2, canonical shape→§3, multi-sample sampling shape→§8.

For EVERY check_prompts rule (1–42 + 38a + 40a) and EVERY check_writing rule (1–17): emit one coverage_map row with covered_by, applies_to_ae101, body_or_context_checkable, and a short note.

Then emit the ORPHAN list = rules where covered_by==none AND applies_to_ae101==true AND body_or_context_checkable==true. These get a dedicated sweep agent next.

A candidate orphan list from the maintainer's own analysis — CONFIRM each is a genuine orphan or move it out with a reason, and ADD any you find that they missed (including check_writing rules that apply to prompt bodies/lead-ins but nothing fires):
${JSON.stringify(CANDIDATE_ORPHANS, null, 2)}

Return JSON only, matching the schema.`

const inventory = await agent(inventoryPrompt, { schema: INVENTORY_SCHEMA, label: 'coverage-inventory', phase: 'Inventory' })

let orphans = (inventory && Array.isArray(inventory.orphans) && inventory.orphans.length)
  ? inventory.orphans
  : CANDIDATE_ORPHANS
// Guard: every orphan needs a compendium + rule.
orphans = orphans.filter((o) => o && o.rule && o.compendium)
log(`Inventory done — ${orphans.length} orphan rules to sweep across 69 prompts`)

// ---- Phase 2/3 — sweep each orphan rule across all 69, then refute each flag ----
const results = await pipeline(
  orphans,
  (o) => {
    const sweepPrompt = `You are the DEDICATED judge for ONE rule: ${o.compendium} ${o.rule} — "${o.label}". Your entire job is to fire this single rule against ALL 69 AE101 prompts, so it can never silently not-fire.

STEP 1 — Read the EXACT rule text and ALL its carve-outs/sub-rules from: ${compendiumPath(o.compendium)}. Locate ${o.rule}. Read its carve-outs especially carefully (e.g. §38a surprise-pedagogy easter-egg, §40a concurrent-worktree, §32 backtick/quote/path exemptions, §25 subagent-is-allowed, §21 irreversible-action carve-out, §33 legal landings A/B/C). A satisfied carve-out means it is NOT a violation.

STEP 2 — Read the prompt bundle: ${BUNDLE}. It is JSON with .prompts[] = 69 entries. Each entry: key, index, prevKey, nextKey, includingFile, leadIn (the body sentence introducing the prompt), contextWindow (surrounding curriculum prose), body (the text the student pastes), dest, permissionMode, requires, produces. For CONTEXT-dependent rules (chain back-reference, isolation, lead-in mirror, session boundary, tail ordering, name-consumer) you MUST use leadIn / contextWindow / prevKey / nextKey — not the body alone.

STEP 3 — For EACH of the 69 prompts decide:
  - N/A: the rule's trigger condition is not met by this prompt's shape (give a one-phrase reason). Many rules only apply to a subset (e.g. §33 only git-output-grep prompts, §39 only mode-dependent pastes, §20 only artefact-assembly prompts, §42 only headless-runner prompts).
  - APPLICABLE → then PASS or FLAG. Apply carve-outs BEFORE flagging.

STEP 4 — Default to NOT flagging unless the violation is concrete and unambiguous. For each FLAG: quote the offending span (from body or leadIn), say why it violates ${o.rule}, set severity (Sev-1 breaks a cold paste; Sev-2 degrades quality; FLAG = needs human judgement), and give a one-line suggested fix.

Output JSON per schema. evaluated_count MUST be 69 (you considered every prompt). applicable_keys + na_keys together MUST cover all 69 keys exactly once. Every flags[].key MUST be in applicable_keys.`
    return agent(sweepPrompt, { schema: SWEEP_SCHEMA, label: `sweep:${o.rule}`, phase: 'Sweep' })
  },
  (sweep, o) => {
    const flags = (sweep && Array.isArray(sweep.flags)) ? sweep.flags : []
    if (!flags.length) return Promise.resolve({ rule: o.rule, compendium: o.compendium, label: o.label, sweep, verified: [] })
    return parallel(
      flags.map((f) => () => {
        const verifyPrompt = `You are an ADVERSARIAL verifier. A rule-judge flagged a prompt as violating ${o.compendium} ${o.rule} ("${o.label}"). Your job is to REFUTE it. Default to real=false (NOT a real violation) unless the violation is unambiguous and no carve-out rescues it.

The flag under review:
- prompt key: ${f.key}
- quoted span: ${f.span}
- judge's reasoning: ${f.why}
- judge's severity: ${f.severity}

STEP 1 — Read ${o.rule}'s exact text + carve-outs from ${compendiumPath(o.compendium)}.
STEP 2 — Read the FULL bundle entry for "${f.key}" in ${BUNDLE} (the .prompts[] element whose key === "${f.key}") — body, leadIn, contextWindow, prevKey/nextKey, frontmatter.
STEP 3 — Decide: is this a REAL violation, or did the judge misread the rule, miss a carve-out, or misjudge the context (cold/warm session, surprise-pedagogy, subagent-allowed, body-callout legal shape)? Quote what settles it.

Return {real, reason, confidence}.`
        return agent(verifyPrompt, { schema: VERDICT_SCHEMA, label: `verify:${o.rule}:${f.key}`, phase: 'Verify' })
          .then((v) => ({ ...f, verdict: v }))
          .catch(() => ({ ...f, verdict: { real: true, reason: 'verifier errored; kept conservatively', confidence: 'low' } }))
      })
    ).then((verified) => ({ rule: o.rule, compendium: o.compendium, label: o.label, sweep, verified: verified.filter(Boolean) }))
  }
)

// ---- Phase 4 — synthesize the coverage matrix + confirmed findings ----
phase('Synthesize')

const perRule = results.filter(Boolean).map((r) => ({
  compendium: r.compendium,
  rule: r.rule,
  label: r.label,
  evaluated_count: r.sweep ? r.sweep.evaluated_count : 0,
  applicable_count: r.sweep && r.sweep.applicable_keys ? r.sweep.applicable_keys.length : 0,
  na_count: r.sweep && r.sweep.na_keys ? r.sweep.na_keys.length : 0,
  flags_raw: r.sweep && r.sweep.flags ? r.sweep.flags.length : 0,
  confirmed_flags: (r.verified || [])
    .filter((v) => v.verdict && v.verdict.real)
    .map((v) => ({ key: v.key, span: v.span, why: v.why, severity: v.severity, suggested_fix: v.suggested_fix, confidence: v.verdict.confidence })),
  refuted_flags: (r.verified || [])
    .filter((v) => v.verdict && !v.verdict.real)
    .map((v) => ({ key: v.key, why: v.why, refute_reason: v.verdict.reason })),
}))

const confirmedTotal = perRule.reduce((n, r) => n + r.confirmed_flags.length, 0)
const refutedTotal = perRule.reduce((n, r) => n + r.refuted_flags.length, 0)
log(`Sweep complete — ${perRule.length} rules fired across 69 prompts; ${confirmedTotal} confirmed findings, ${refutedTotal} refuted false-positives`)

const synthPrompt = `Write the AE101 prompt-rule COVERAGE MATRIX report to ${OUT_REPORT} (use the Write tool). This is the artifact the maintainer has never had: proof that every prompt-applicable rule was fired against every prompt, plus the confirmed findings.

INPUTS:
1. Coverage inventory (every rule → firing mechanism), JSON:
${JSON.stringify(inventory && inventory.coverage_map ? inventory.coverage_map : [], null, 0)}

2. Orphan-rule sweep results (each orphan rule fired across all 69 prompts; flags adversarially verified — confirmed vs refuted), JSON:
${JSON.stringify(perRule, null, 0)}

3. Mechanical linter findings (already gated on every build) — READ the file ${MECHANICAL} and fold its findings into the matrix under the rules they cover (§1/§4/§9/§24/§28/§31/§32).

WRITE the report with these sections:
## Coverage matrix
A table over ALL check_prompts (1–42) + check_writing (1–17) rules: rule | label | firing mechanism (mechanical / technical-judge / behavior-catalog / writing-judge / pedagogy-judge / this-sweep / process-hook / N-A-for-ae101) | prompts evaluated | confirmed findings. Every rule MUST appear — a rule with no firing mechanism and no sweep is a COVERAGE HOLE; mark it ❌ HOLE.

## Confirmed findings (priority-ordered)
Only adversarially-CONFIRMED flags + the mechanical Sev-2s. Order by severity then by how many prompts share the pattern. For each: rule, prompt key, quoted span, why, suggested fix. These will become one-at-a-time maintainer cards — do NOT bundle into prose.

## Refuted (false positives caught)
Brief: which flags the verifier killed and why — shows the carve-outs are being respected.

## Close-the-holes plan
For each rule that was an ORPHAN (only fired because this one-off sweep fired it): recommend its PERMANENT home — fold into the mechanical linter (if grep-decidable), add a pattern to the behavior catalog ${BEHAVIOR_CATALOG}, or extend the technical-judge template. This is how "the rule fires next time too" without re-running this workflow.

Keep it tight and scannable. Return a 4-line summary: rules covered, coverage holes remaining, confirmed findings, top recommendation.`

const summary = await agent(synthPrompt, { label: 'synthesize-report', phase: 'Synthesize' })

return {
  orphans_swept: orphans.length,
  confirmed_findings: confirmedTotal,
  refuted_false_positives: refutedTotal,
  report: OUT_REPORT,
  summary,
  per_rule: perRule,
}
