# Actor scrollback — Bootstrap M4 verbatim — 2026-04-24

Simulated Claude Code session run at the Bootstrap training-directory root `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/bootstrap-m4`. Inherited state from M3: `module-1/CLAUDE.md`, `module-2/challenge.md` + `soft-pages.md`, `memory/` (7 pages), `sources/` (10 files), `agents/monday-risks.md`, `module-3/` outputs. Phase 0 pre-unzipped `skills/company-ai-policy/` and `skills/agent-security/`; `module-4/` empty.

Skill-invocation substitution: real Claude Code auto-discovers skills from `skills/`. In this subagent environment skills are not auto-loaded. Every "apply the X skill" is substituted by directly reading `skills/<name>/` files.

---

## Phase 0 — setup confirmation

`[harness substitution — skill invocation by direct Read of skills/ files (no auto-discovery)]`

Tree check:
- `skills/company-ai-policy/SKILL.md` + `policies/{data-usage.md, security.md, ai-use.md, sector-rules.md}` — present.
- `skills/agent-security/SKILL.md` + `access-analysis.md` + `stride.md` + `mitigations.md` — present.
- `module-4/` — empty.

Rule count confirmed across policies: R-DU-1..6 (6) + R-SEC-1..5 (5) + R-AI-1..5 (5) + R-SR-1..5 (5) = 21 rules.

---

## Phase 1 — Policy audit

### Prompt 1 (audit-your-agent/prompt-001.txt) — verbatim

> Apply the company-ai-policy skill to the agent system I built in module-2 and module-3. The system is: the memory in memory/, the sources in sources/, the agent files in agents/, the root CLAUDE.md, and the multi-agent runs in module-3/retrievals/ and module-3/stances/.
>
> For each rule in the skill's policies, produce one row in a report: rule name, one-line description, verdict (compliant / violating / "I can't tell"), and one line of evidence from my actual files for that verdict. If you can't tell, say what evidence you'd need to decide.
>
> Write the report to module-4/policy-report.md. Be specific. Be plain. An "I can't tell" is a better answer than a confident guess.
>
> Read the memory and agent files properly — don't skim. Quote the specific lines or files that support each verdict.

`[harness substitution — skill company-ai-policy invoked by reading skills/company-ai-policy/ directly]`

**Claude:** Read all four policy files. Walked the target tree — 7 memory pages, 10 source files, one agent file, module-3 outputs, no root CLAUDE.md. Produced 21-row report at `module-4/policy-report.md`.

Headline verdicts: 3 violating (R-DU-6, R-SEC-5, R-AI-3), 10 compliant (incl. a "compliant but watch it" note on R-DU-3), 8 I-can't-tell (incl. R-DU-1 classification labels missing; R-DU-4 destination + review gate missing; R-SEC-2 authorship tag missing; R-SEC-4 connector list missing; R-AI-1 tier undeclared; R-AI-5 no-train confirmation absent; R-SR-3 and R-SR-5 scope-not-in-evidence). Every "I can't tell" paired with a "need:" clause.

---

## Phase 1.5 — Ask what's in the report

### Prompt 2 (audit-your-agent/prompt-002.txt) — verbatim

> Read module-4/policy-report.md. Tell me:
> 1. The top three surprises — rows where the verdict is not what a careful reader would have predicted from my files alone.
> 2. The three rows where "I can't tell" is most likely hiding a real compliance gap — rows where the missing evidence would probably come back as violating, not compliant, if it surfaced.
> 3. One row that looks compliant on the surface but where you'd still push back.
>
> Keep each point to one or two sentences. Quote the specific rule name so I can find the row.

**Claude:**

**1. Surprises.**
- **R-DU-6 (violating).** The agent file's prose hard-line looks like a win; `memory/skeptic-conversion.md` encoding the personal-note reasoning with a `[sources/maija-prep-notes-skeptics.md]` cite bypasses the guard via the memory path.
- **R-SEC-5 (violating).** No root CLAUDE.md and no write-path declared in the agent file; the absence reads as oversight, not as "personal so it doesn't count."
- **R-AI-3 (violating).** Being explicitly personal is what triggers the tier-label requirement; the agent file has no tier label.

**2. "I can't tell" likely hiding a real violation.**
- **R-DU-4.** Agent text says output "might be pasted into the leads sync" with no human-review step — surfaces as missing review gate.
- **R-SEC-2.** No self-authorship line in the output template; paste-into-channel becomes silent agent authorship.
- **R-SR-5.** "Risks about Paavo's skepticism" is one prompt away from performance-adjacent framing; absent explicit exclusion, drift is the default path.

**3. Compliant but push back.**
- **R-DU-3.** Structurally compliant — every memory claim cites a source file — but `memory/skeptic-conversion.md` cites the personal note, importing its reasoning into a shareable memory page. Same leak R-DU-6 flags, formally laundered.

---

## Phase 2 — Security audit with STRIDE

### Prompt 3 (audit-your-agent/prompt-003.txt) — verbatim

> Apply the agent-security skill to the same system. Run both the access-control analysis and the agent-STRIDE pass.
>
> For access control: list every external system the agent can reach (connectors, retrievals, file writes beyond the training directory, anything in tools/). For each: is the access necessary for what the system actually does? Flag anything the system has access to but doesn't need.
>
> For agent-STRIDE: run the six categories (spoofing, tampering, repudiation, information disclosure, denial of service, elevation of privilege) in their agent-adapted meanings from the skill. For each category, name the top one or two specific risks in my system, not generic category descriptions.
>
> For each risk flagged (access or STRIDE), suggest one agentic mitigation — scope, split, filter, gate, or review — matched to the specific risk. Rank the risks by severity × likelihood, three-tier (high / medium / low).
>
> Write the report to module-4/security-report.md. Include the ranked mitigation suggestions.

`[harness substitution — skill agent-security invoked by reading skills/agent-security/ directly]`

**Claude:** Read SKILL.md + access-analysis.md + stride.md + mitigations.md. Walked access-control against the agent + memory + sources surface. Walked STRIDE six-category pass. Produced `module-4/security-report.md`.

Access-control: no connectors declared; `sources/` read over-broad (includes the personal note); write destination undeclared (tampering surface); module-3 read is possible stale-context.

STRIDE (top risks): SP-1 memory launders personal-origin provenance; SP-2 no self-authorship on output; T-1 undeclared write destination; T-2 memory edit-in-place drift; R-1 no author/timestamp header; ID-1 personal-note paraphrase via monday-risks; ID-2 named-colleague × judgement-term combo; DoS-1 memory-growth across recurring runs; EoP-1 personal agent → paste-into-sync elevation.

Ranked: High — ID-1 (filter), EoP-1 (gate), T-1 (scope). Medium — SP-1, R-1, ID-2, over-broad sources read. Low — SP-2, T-2, DoS-1, module-3 stale context.

---

## Phase 3 — Mitigate one risk

Before pasting prompt-004, Maija names the risk in plain chat:

> The Monday-risks agent can read `sources/maija-prep-notes-skeptics.md` and could paraphrase its content into the risk briefing. The hard-line rule in the agent file says not to, but it's a prose rule, not a structural one. If the agent drifts, the rule may not fire and the personal note could leak.

### Prompt 4 (audit-your-agent/prompt-004.txt) — verbatim

> I named the risk I want to mitigate in my last message. Walk me through applying a mitigation to my system for that risk: what file changes, what agent instructions change, what new skill or rule might need to land. You pick the mitigation shape from the five (scope, split, filter, gate, review); I'll steer if a different one fits.
>
> DO NOT make any changes yet. Describe the diff in plain English first and stop. Wait for me to type "apply" before you touch a file. If I want something different, I'll tell you.
>
> After I confirm and the change lands, re-run the check the skill performed for this specific risk (re-apply the relevant part of the skill, not the whole audit). Report the new verdict. Is the risk reduced, eliminated, or shifted somewhere else?
>
> Then write one paragraph to module-4/residual.md naming what's still true after the mitigation. Not what we fixed. What's left. Be specific.

**Claude:** Shape — **filter**. Risk shape is "content from a named file leaks through paraphrase"; filter is right — prose rules lifted to a structural declaration plus a pre-write phrase-grep plus an output-template self-check. Three layers sampling different failure modes (read the rule, match the phrases, recall what was read).

Diff (no changes yet):

1. `agents/monday-risks.md` — new "Excluded from output (structural)" block at top of file, above Role section, naming `sources/maija-prep-notes-skeptics.md` as excluded-from-output path.
2. `agents/monday-risks.md` — Rules section adds a filter step: grep the draft against distinctive phrases from the personal note ("three-way split," "builders / waiters / principled skeptics," "principled skeptic," "the bar to test against," "what converts a principled skeptic"). Halt and ask if any match.
3. `agents/monday-risks.md` — output shape adds a self-check line: "does this output reference anything I read from `sources/maija-prep-notes-skeptics.md`? If yes, stop and ask."

Stopped. Awaiting confirmation.

**Maija:**

> apply

**Claude:** Applied all three edits to `agents/monday-risks.md`.

Re-applied the Information-Disclosure sub-section of STRIDE on the edited file:

- **ID-1 — reduced.** Prose rule now backed by structural declaration + grep list + self-check. Three sampling modes instead of one.
- **ID-2 — unchanged (shifted, not reduced).** Named-colleague × judgement-term combo isn't directly addressed by the personal-note-scoped filter.

Verdict: reduced, not eliminated. Wrote `module-4/residual.md`.

---

## Close — Doors I'd rather not open

Appended to `module-4/residual.md` under `## Doors I'd rather not open`, Maija's verbatim decision:

> I'm scoping out: agent-drafted HR-adjacent communications (performance feedback, disciplinary framing, team-health assessments). The agent will not draft content that makes claims about individual engineers' performance or judgment — only aggregate team-level observations grounded in shipped work.

---

## Truncations

Debrief (skill-sharpening prompt) and homework micro-skill: not executed per runner instructions.

## Artifacts written

- `module-4/policy-report.md` — 21 rows across R-DU, R-SEC, R-AI, R-SR.
- `module-4/security-report.md` — access-control + 6-category STRIDE + three-tier ranked mitigations.
- `module-4/residual.md` — one paragraph residual after ID-1 mitigation + `## Doors I'd rather not open` section.
- `agents/monday-risks.md` — edited with structural exclusion, filter step, and output self-check.

`module-3/` artifacts not touched.
