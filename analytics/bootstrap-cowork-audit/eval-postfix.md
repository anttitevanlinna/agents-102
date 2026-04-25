# Bootstrap cowork-audit — post-fix eval judge re-pass

Re-pass against the four files edited since the prior audit. Cowork-mode filter on (`.rt-cowork` unwrapped, `.rt-code` hidden, chip = **Cowork**). Prompt-block rules 10 and 11 are new this turn.

---

## 1. `curriculum/trainings/bootstrap/security.md` (M4 module)

| Check | Result | Notes |
|---|---|---|
| Banned-word scan | PASS | No honest/delve/landscape-as-verb/importantly/crucial/substrate/ritual/ceremony hits in body. *"That's the curriculum."* lands as plain-state. |
| Mood fidelity (deepened unease, target M4) | 4/5 | Close holds the unease cleanly: *"The unease stays. Nothing today resolves it. That's the curriculum."* The travelable-asset paragraph adds leverage without dispelling the discomfort — the next-agent line is forward-looking, not consoling. The Bridge question reads as honest hand-off. Half-point off because *"One thing does travel"* leans slightly hopeful — register slips toward consolation prize without quite landing there. |
| Student-POV (no contemplative-pause / room-share) | PASS | No *"sit with,"* no *"say out loud,"* no *"share with the room."* The Connections-block question is rhetorical-narrative, not a directive to vocalise. |
| Prompt rules #1, #2, #6, #9 | PASS | Debrief prompt: no `[brackets]`, lead-in present (*"Five minutes. Claude reviews the audit session and sharpens the plugin you authored."* — semantic, command-verb-led, but framed as setup paragraph; the imperative *"Read Claude's summary. Push back where it's wrong"* lands the action-cue separately). No downstream leak. No `**bold**` or `*italic*` inside the fence. |
| Prompt rules #10, #11 (runtime-fork) | N/A | No runtime fork in this file — single Debrief prompt, runtime-neutral. M4-shaped runtime forks live in the exercise. |
| Cowork-edition coherence | 5/5 | Reads cleanly with `.rt-code` hidden — there isn't a `.rt-code` block in the module file. Plug-points and homework references survive. |

**Verdict: APPROVE.** Module reads as designed under cowork filter. Single watch: the *"One thing does travel"* sentence flirts with consolation register but stays inside the rule because the line that follows is mechanical (*"the plugin lives on disk now"*), not reassurance-shaped.

---

## 2. `curriculum/exercises/audit-your-agent.md` (M4 exercise — Phase 0 rewrite)

| Check | Result | Notes |
|---|---|---|
| Banned-word scan | PASS | No banned-word hits. *"It is **input** you read while authoring"* — bold-word inside body prose, fine outside fences. |
| Mood fidelity (deepened unease, M4) | 4/5 | Close holds: *"The risk didn't go away. That's expected."* + *"The best mitigation is the one you didn't need. You just named one."* Phase 0's plugin-authoring scaffold opens curious/leverage rather than uneasy — but mood is meant to deepen across phases, not from the first paragraph. The arc lands. |
| Student-POV | PASS | No room-share or pause-theatre. *"Stay with it"* during Phase 1 reads as sit-with-data, not contemplative-pause prefix — borderline acceptable per rule #23 because there's no pedagogy-aware framing wrapping it. |
| Prompt #1 (no placeholders) | PASS | All four fenced prompts use deterministic paths and back-references. |
| Prompt #2 (action lead-in) — **Phase 0 specifically** | PASS | Phase 0 lead-in: *"Ask Claude to author your two-lens security plugin from the policy files."* Twelve words, command verb (*Ask*), semantic summary. Compliant. |
| Prompt #6 (no downstream-pipeline leak) — **Phase 0 specifically** | PASS | Phase 0 prompt asks Claude to build the plugin and *"Show me the files before saving so I can push back on rule wording or report shape"* — does not leak Phase 1's audit run, does not pre-execute the lens. The plugin-author task stays self-contained. |
| Prompt #9 (no markdown shout in fences) | PASS | Phase 0 fence uses bullets and plain prose; no `**bold**`/`*italic*` inside. |
| Prompt #10 (paired-divs, shared chip) | N/A | No `.rt-code` / `.rt-cowork` paired divs in this file — runtime fork is handled below the fence in the install-step bullets (*"Cowork: click Save plugin..."* / *"Code Desktop:..."* / *"Code CLI:..."*). This is plain-prose fork, not paired-div fork. Acceptable for non-prompt-body forks but worth a maintainer flag — see TODO below. |
| Prompt #11 (Cowork ≥ Code scaffolding) | PASS-WITH-TODO | The three install bullets give Cowork a one-liner (*"click Save plugin in the chat — it registers in your library"*); CLI gets *"Claude can write the SKILL.md directly into ~/.claude/skills/<name>/SKILL.md and you're done."* Cowork bullet is shorter than CLI's. Per rule #11, Cowork should carry MORE mechanical scaffolding, not less, since Cowork users have less terminal fallback. The plugin-install moment is a runtime cliff named in M4's maintainer block. Flag for follow-up. |
| Cowork-edition coherence | 4/5 | Under `.rt-cowork` filter, the file reads cleanly because the install step is plain bullets (all visible). One orphan-fragment risk: *"Start a new session — plugins load at session start, not into the current one"* is correct for Cowork too, but in Cowork the *"new session"* is a different affordance than CLI's `claude` command. Acceptable; adjacent to rule #11 — Cowork users may want a one-line cue on what "start a new session" means in Cowork's sidebar. |

**Verdict: APPROVE-WITH-TODOs.**

TODOs:
1. Phase 0 install-step bullets: lengthen the Cowork line to match CLI's specificity. Candidate: *"Cowork: click Save plugin in the chat — Cowork registers it in your plugin library; the next session you open in this Cowork space picks it up automatically."* (Aligns with rule #11.)
2. Consider promoting the install-step trio to a paired-div pattern (`.rt-cowork` / `.rt-code`) so the renderer hides the irrelevant runtimes per active mode — currently all three runtimes show under all filters. Adjacent to rule #10. Flagged for the M4 plugin-authoring reshape (already named in the file's top TODO).

Phase 0 prewrite-vs-postfix question (rules 2 and 6): both PASS. Rewrite landed.

---

## 3. `curriculum/trainings/bootstrap/evaluations.md` (M6 module — Big Idea rewritten)

| Check | Result | Notes |
|---|---|---|
| Banned-word scan | PASS | No hits. *"yardstick"* lands as concrete metaphor — not jargon. |
| Mood fidelity (leverage, target M6) | 5/5 | Big Idea lands the leverage frame cleanly: *"You walk away. You come back to a sharper generator the same yardstick can't fault."* The judge-as-fixed + generator-as-learning split is exactly the leverage move — automation as eval-loop, not as toy. *"Walk-away autonomy"* in Key Concepts reinforces. |
| Student-POV | PASS | *"What if you weren't in the room while that happened?"* is rhetorical-curious, not a contemplative-pause directive. No room-share. |
| Prompt #1, #2, #6, #9 | PASS | Debrief prompt has no placeholders, lead-in is *"Five minutes. Claude reviews the eval loop's run and sharpens the judge's prompt..."* (semantic + command-verb), no downstream leak (no reference to M7), no markdown shout in fence. |
| Prompt #10, #11 (runtime-fork) | N/A | Single runtime-neutral Debrief prompt. |
| Cowork-edition coherence | 5/5 | No fork content; reads identically in Cowork mode. The walk-away/dashboard pattern works in either runtime. |

**Verdict: APPROVE.** Big Idea rewrite is the strongest of the four files — *"the judge stays fixed; that's the integrity of the loop"* is the single sentence the module needed. Rule #14 of compounded entries (*eval is fixed yardstick*) lands verbatim in body. Rule #11 of writing (attribution cap) — Mollick + Huyen named once each in maintainer/prework, never in body. Clean.

---

## 4. `curriculum/exercises/joint-double-diamond.md` (M8 — 5-line shape added)

| Check | Result | Notes |
|---|---|---|
| Banned-word scan | PASS | No hits. *"flywheel"* recurs (3×) and lands as the load-bearing M8 metaphor — earned. |
| Mood fidelity (awe + curiosity, target M8) | 5/5 | *"You do not graduate. You have a flywheel."* lands the awe close. The 5-line shape opens with grounding (humility before claim) and ends at synthesis (kernel-as-commitment). The arc reads as ramp-up rather than victory-lap. Identity-naming beat (*"You are now an agent builder"*) is single-sentence, no ceremony. |
| Student-POV | PASS | The read-aloud beat is delivered as *"one participant reads the kernel aloud"* (in-room) and *"read the kernel aloud to yourself"* (self-study). The self-study line could be flagged as a room-share command's solo cousin, but rule #23 explicitly carves out personal-voice writing/reading the student does for themselves — *"Hearing the four paragraphs in your own voice is what makes the kernel real"* is exactly the carved-out case. PASS. |
| Prompt #1 (no placeholders) | PASS | `module-8/<my-name>/context-manifest.md` uses `<my-name>` as a path variable convention, not a `[BRACKET]` placeholder — the angle-bracket-as-path-segment is a documented Claude Code convention. Acceptable. (Rule #1 bans `[...]`; `<...>` for path slots reads as shell-style and survives.) |
| Prompt #2 (action lead-in) | PASS | Each fenced block has a one-sentence lead-in. The grounding prompt's lead-in is the paragraph above (*"every agent publishes what it has and what it doesn't have before it speaks to another agent's work"*) — semantic, but length is over 20 words. Borderline. The Phase 1, 2, 3 fences each have tighter lead-ins. |
| Prompt #6 (no downstream-pipeline leak) | PASS-WITH-WATCH | Phase 1 prompt mentions *"weight your cluster by what they cite, not by what I already thought"* — references neighbouring agents but doesn't leak Phase 2's policy step. Phase 2 prompt opens by reading `pooled-cruxes.md` (back-reference to Phase 1 output) — correct chain-by-back-reference per rule #5. Phase 3 prompt similarly. Watch: the 5-line shape at the top names Phase 3's *"pressure-test the composite with assumption-test and pre-mortem"* — this is the exercise-overview surfacing the pipeline to the student, not a prompt leaking it to a planner-Claude. Acceptable per rule #6's exception for *"downstream awareness pedagogically load-bearing"*. |
| Prompt #9 (no markdown shout in fences) | PASS | Bullets + plain prose. No `**bold**`/`*italic*` inside fences. |
| Prompt #10, #11 (runtime-fork paired-divs) | N/A | This file uses `*(Builder Claude)*` chips throughout, not `*(Claude Code)*`. M8 is the room-scale exercise; the runtime-fork mechanic is mostly absent because the in-room/self-study split is doing the structural fork (via blockquote callouts), not paired-divs. The blockquote pattern (*"In-room cohort — self-study readers, skip..."*) is the M8-native fork mechanic and works. |
| Cowork-edition coherence | 4/5 | Under `.rt-cowork` filter: the file has no `.rt-code` blocks to hide, so it reads identically. *"shared filesystem + naming convention"* in the maintainer block names a Cowork-future variant. The `*(Builder Claude)*` chip is non-runtime and renders as-is — does not collide with the Code/Cowork chip-swap mechanic. Half-point off only because the file pre-dates the runtime-fork pattern and a future pass might want to add a Cowork-native paragraph for *"agents read each other's module-8/ folders"* — that mechanic differs in Cowork's connected-folder model vs. Code's CWD model. Adjacent to rule #11 (Cowork cliff-naming). |

**Verdict: APPROVE.** The 5-line shape is the right add — gives the student a map before the 55-minute swim. Identity-naming close holds without ceremony. The blockquote-fork pattern is M8's native fork; the rule #10 paired-div mechanic doesn't apply because Builder Claude is the addressee, not Claude Code per se.

---

## Combined verdict

**APPROVE-WITH-TODOs across the set.** Three files clear cleanly (security.md, evaluations.md, joint-double-diamond.md). One file (audit-your-agent.md) clears the rewrite spec — Phase 0 rules 2 and 6 both PASS — and earns one rule #11 follow-up on the Cowork install-step asymmetry (one-liner vs. CLI's fuller bullet). Phase 0 timing flag from prior 3-persona sim still stands (top TODO line in the file) and is the bigger reshape; this audit is on the surgical fixes only.

WROTE: /Users/anttitevanlinna/Projects/agents-102/analytics/bootstrap-cowork-audit/eval-postfix.md
