# AE101 Prompt-Rule Coverage Matrix

**Scope:** Agentic Engineering 101 — 69 registry prompts.
**Claim this artifact backs:** every prompt-applicable rule in `check_prompts` (§1–42) and `check_writing` (§1–17) has a firing mechanism that ran against every AE101 prompt — and where the standing mechanism is a one-off sweep, this report names its permanent home.

A rule with no standing firing mechanism AND no sweep this run = a **COVERAGE HOLE** (❌ HOLE below). Every other rule is either covered by a standing checker (mechanical / technical-judge / behavior-catalog / writing-judge / pedagogy-judge / process-hook), out of scope for AE101 (N-A), or was fired this run by the orphan sweep (this-sweep).

## Coverage matrix

### check_prompts (§1–42)

| Rule | Label | Firing mechanism | Prompts evaluated | Confirmed findings |
|---|---|---|---|---|
| §1 | no placeholders inside fences | mechanical | 69 (every build) | 0 |
| §2 | one-sentence action lead-in | technical-judge | 69 | 0 |
| §3 | canonical shape (lead-in, label+dest, blank, fence) | technical-judge (+ build expander reconstructs shape) | 69 | 0 |
| §4 | installed skills invoke by name not path | mechanical | 69 | 0 |
| §5 | chain by back-reference + deterministic path | this-sweep | 69 (31 applicable / 38 N-A) | 0 |
| §6 | chained-prompt isolation — no downstream leak | this-sweep | 69 (38 / 31) | 0 |
| §7 | no session-resets mid-phase | this-sweep | 69 (2 / 67) | 0 |
| §8 | multi-sample methods need structural enforcement | technical-judge | 69 | 0 |
| §9 | no markdown shout inside fenced prompts | mechanical | 69 | **3 (Sev-2)** |
| §10 | runtime-fork: paired divs, shared chip | N-A-for-ae101 (Cowork; Code-only) | — | — |
| §11 | runtime-mechanical scaffolding asymmetry | N-A-for-ae101 (Cowork; Code-only) | — | — |
| §12 | append-vs-integrate — name integration mode | behavior-catalog | 69 | 0 |
| §13 | citation discipline — extend scope + quote sentence | behavior-catalog (+ technical-judge secondary) | 69 | 0 |
| §14 | niceness tax — name the edge or pin the line | behavior-catalog | 69 | 0 |
| §15 | question-dump — two legal shapes | behavior-catalog | 69 | 0 |
| §16 | overwrite anxiety / file preservation | behavior-catalog | 69 | 0 |
| §17 | preamble before action | behavior-catalog | 69 | 0 |
| §18 | self-critique register not defense | behavior-catalog | 69 | 0 |
| §19 | minimal hand-off + Claude self-augments (send-off) | this-sweep | 69 (2 / 67) | 0 |
| §20 | grill before save | this-sweep | 69 (11 / 58) | 0 |
| §21 | tell me what you wrote (post-action report) | this-sweep | 69 (31 / 37) | 0 |
| §22 | prompt-body edits require maintainer approval | process-hook (PreToolUse + pre-commit) | n/a (governs HOW) | 0 |
| §23 | artifact destinations are explicit subpaths | N-A-for-ae101 (Agents-101-scoped) | — | — |
| §24 | don't restate session CWD inside prompt body | mechanical | 69 | 0 |
| §25 | subagent allowed; explain why after | this-sweep | 69 (4 / 65) | 0 |
| §26 | maintainer-approval edits — one-at-a-time cards | process-hook (orchestrator discipline) | n/a (governs HOW) | 0 |
| §27 | name consumer at write time | this-sweep | 69 (21 / 48) | 0 |
| §28 | strong-bold label is exactly **Prompt** | mechanical | 69 | 0 |
| §29 | normal work request before orchestration | this-sweep | 69 (12 / 57) | 0 |
| §30 | live-test corrections preserve operator workflow | process-hook (orchestrator discipline) | n/a (governs HOW) | 0 |
| §31 | prompts live in registry; files reference by marker | mechanical (+ build strict-expansion + post-render audit) | 69 | 0 |
| §32 | no module-name references in prompt prose | mechanical (+ prompt-source-audit.sh P4) | 69 | **3 (Sev-2)** |
| §33 | git-output grep multi-result fallback | this-sweep | 69 (1 / 68) | 0 |
| §34 | disambiguation/decision logic lives inside the fence | this-sweep | 69 (36 / 34) | 0 |
| §35 | separate iteration from persistence | this-sweep | 69 (14 / 51) | 0 |
| §36 | wide prompts split by logical move | this-sweep | 69 (59 / 10) | 0 |
| §37 | orient saved rule by where it fires | this-sweep | 69 (6 / 61) | 0 |
| §38 | body lead-in mirrors prompt opening | this-sweep | 69 (64 / 5) | 0 |
| §38a | carve-out for surprise-pedagogy prompts | this-sweep (rides with §38) | 69 (rides §38) | 0 |
| §39 | declare permission-mode when paste requires a mode | this-sweep | 69 (5 / 64) | 0 |
| §40 | verify session boundary cold/warm | this-sweep | 69 (66 / 3) | **2 (Sev-2 / FLAG)** |
| §40a | concurrent-worktree corollary | this-sweep (rides with §40) | 69 (rides §40) | (1 of the §40 pair) |
| §41 | artifact-vs-STOP tail ordering | this-sweep | 69 (24 / 45) | 0 |
| §42 | headless-runner no-AUQ guard | this-sweep | 69 (0 / 69 — none applicable) | 0 |

### check_writing (§1–17)

| Rule | Label | Firing mechanism | Prompts evaluated | Confirmed findings |
|---|---|---|---|---|
| §1 | banned words — grep zero-tolerance | writing-judge (body + lead-ins; **fence content NOT covered**) | 69 | 0 |
| §2 | ritual/practice/ceremony hard ban (+AE101 carve-out) | writing-judge (body-only) | 69 | 0 |
| §3 | no stale markers / fixed retrospectives | writing-judge | 69 | 0 |
| §4 | register match (AE101 voice quintet) | writing-judge (body prose; fence register not graded) | 69 | 0 |
| §5 | rough-cut drafts for articles | N-A-for-ae101 (article workflow) | — | — |
| §6 | credit original / author-we bans | writing-judge (fence 'we' exempt by §6 itself) | 69 | 0 |
| §7 | always 'you', never 'the student' | writing-judge | 69 | 0 |
| §8 | don't smuggle maintainer terms-of-art into body | writing-judge (+ §32/lint cover the fence M-number slice) | 69 | 0 |
| §9 | over-hedge detector | writing-judge (non-blocking TODO) | 69 | 0 |
| §10 | verbatim-frame-cite in reference artefact | N-A-for-ae101 (authoring-process, not a shipped property) | — | — |
| §11 | cap practitioner attribution at one/module | writing-judge | 69 | 0 |
| §12 | punchy framing keeps punch | writing-judge (non-blocking) | 69 | 0 |
| §13 | value-prop/positioning leak into body | writing-judge (blocking + vendor sub-rule) | 69 | 0 |
| §14 | watch planting jargon too early (prompt-body surface) | this-sweep | 69 (38 / 33) | 0 |
| §15 | audit closer when trimming forcing function | writing-judge (body scope) | 69 | 0 |
| §16 | past tense for exercise recap sections | writing-judge | 69 | 0 |
| §17 | no combative verbs about the agent in body | writing-judge | 69 | 0 |

### Coverage holes

**None.** Every prompt-applicable rule has a standing mechanism, was fired this run, or is documented N-A for AE101. The matrix below lists what is *not yet permanent* — the `this-sweep` rules — and where each must move so it fires next build without re-running this workflow (see **Close-the-holes plan**).

A residual scope-gap worth the maintainer's eyes, but not a hole: `check_writing §1/§2/§4/§14` are body-prose scoped — banned words, register, and too-early jargon **inside a registry prompt fence** are not graded by the writing-judge. §32 + mechanical lint cover the M-number slice of fence content; the rest of fence prose register is uncovered by design. This run's §14 sweep partially closes that for jargon-level (0 flags).

## Confirmed findings (priority-ordered)

Adversarially-confirmed flags + mechanical Sev-2s only. Ordered by severity, then by how many prompts share the pattern. **One card each — do not bundle.**

---

**Card 1 — §40 cold/warm boundary collapse**
- **Rule:** check_prompts §40 (verify session boundary cold/warm)
- **Prompt key:** `arc-retrospective-1`
- **Severity:** Sev-2 (high confidence)
- **Span:** "Run this audit in a fresh sub-task via the Agent tool so you have the cold-read view, then combine those findings with insights you have from this session's scrollback. I want both viewpoints: the fresh read uncoloured by our conversation, and what you noticed while we worked together."
- **Why:** The lead-in launches a COLD session — "Open a new Claude Code session in the Module 5 worktree. A fresh session, so there's no scrollback coloring the read." The fence then back-references "this session's scrollback" and "what you noticed while we worked together," presupposing a WARM session the module explicitly removed. The intended dual-viewpoint (cold sub-task read + warm in-session memory) collapses to single-viewpoint because the warm half references context that isn't there.
- **Suggested fix:** Drop the warm-scrollback half (a genuinely fresh session has none), leaving the cold sub-task read as the whole move; OR move this prompt into a warm session that actually carried the M6 Phase-1/2 scrollback and reword the lead-in to match.

---

**Card 2 — §40a cross-window scrollback not present**
- **Rule:** check_prompts §40a (concurrent-worktree corollary, rides §40)
- **Prompt key:** `ae101-m3-sharpen-skill`
- **Severity:** FLAG (high confidence)
- **Span:** "Read this scrollback: the access-control output, the STRIDE decision and ADR, the moment the skill was invoked on the security-tested feature, the critique exchange."
- **Why:** The prompt runs in the `m3-security` main window, but the skill invocation + critique exchange happened in the sibling `m3-quality` worktree window (`author-test-strategy-skill-2`, index 38). Per §40a a sibling worktree's window/scrollback does not cross — "the moment the skill was invoked … the critique exchange" are NOT in `m3-security`'s scrollback (only the access-control output, STRIDE, and ADR are). The fence instructs Claude to read scrollback content that isn't present in this window. The mitigation (lead-in tells the student to switch windows, grab quotes, paste them in) lives at the body layer, which §34 says does not reach the fence at runtime.
- **Suggested fix:** Reword the fence so the cross-window items read as "the quotes I pasted above" (matching the lead-in's paste step) rather than "this scrollback," OR have the fence read the `m3-quality` transcript path explicitly instead of assuming the invocation moment is in this window's scrollback.

---

**Card 3 — §32 module-number in prompt prose (prework)**
- **Rule:** check_prompts §32 (no module-name references in prompt prose)
- **Prompt key:** `ae101-prework-screen-and-ready`
- **Severity:** Sev-2 (mechanical, gated every build)
- **Span:** "2. Once I've picked, confirm the repo is ready for Module 1. Tests run (or name how the repo checks code), git status is …"
- **Why:** Linter flagged a bare "Module 1" token in prose outside any backtick/quote/path carve-out.
- **Suggested fix:** Recast without the module label (e.g. "ready for the first hands-on session") or wrap in the carve-out form the linter recognises.

---

**Card 4 — §32 module-number in prompt prose (M5 worktree setup)**
- **Rule:** check_prompts §32
- **Prompt key:** `ae101-m5-worktree-setup`
- **Severity:** Sev-2 (mechanical)
- **Span:** "Read … Use the branch named in its … block — that block is authoritative; ignore any other … line in the task body …"
- **Why:** Linter flagged a bare module-number token in prose (carve-out not matched).
- **Suggested fix:** Use the backtick/path carve-out form, or refer to the artefact by filename rather than module number.

---

**Card 5 — §32 module-number in prompt prose (spot-gaps M5 re-run)**
- **Rule:** check_prompts §32
- **Prompt key:** `spot-gaps-build-the-loop-5`
- **Severity:** Sev-2 (mechanical)
- **Span:** "Invoke the … skill we just authored — by its name — on the M5 packaged re-run. Not on a toy example. The actual artefacts …"
- **Why:** Bare "M5" token in prose outside the carve-out.
- **Suggested fix:** Replace "the M5 packaged re-run" with a description not keyed to the module number (e.g. "the packaged re-run from the last exercise") or wrap in a recognised carve-out.

---

**Card 6 — §9 markdown shout inside fence (diagnose-and-resend-2)**
- **Rule:** check_prompts §9 (no markdown shout inside fenced prompts)
- **Prompt key:** `diagnose-and-resend-2`
- **Severity:** Sev-2 (mechanical)
- **Span:** "- **Goal drift** — moments where the agent solved an adjacent problem instead of the asked one…"
- **Why:** Bold markdown (`**Goal drift**`) inside the fenced prompt body, which renders as shout when pasted.
- **Suggested fix:** Drop the bold; use plain text or a leading dash label without `**`.

---

**Card 7 — §9 markdown shout inside fence (diagnose-and-resend-3)**
- **Rule:** check_prompts §9
- **Prompt key:** `diagnose-and-resend-3`
- **Severity:** Sev-2 (mechanical)
- **Span:** "- **A re-readable spec.** Scope + success criteria + constraints the agent can diff its in-progress work against, mid-run…"
- **Why:** Bold markdown inside the fence.
- **Suggested fix:** Remove the `**` emphasis.

---

**Card 8 — §9 markdown shout inside fence (diagnose-and-resend-6)**
- **Rule:** check_prompts §9
- **Prompt key:** `diagnose-and-resend-6`
- **Severity:** Sev-2 (mechanical)
- **Span:** "- **The tests that name the bar** — scoped to this task's core paths, named before any code lands…"
- **Why:** Bold markdown inside the fence.
- **Suggested fix:** Remove the `**` emphasis.

---

**Card 9 — §9 markdown shout inside fence (spot-gaps-build-the-loop-1)**
- **Rule:** check_prompts §9
- **Prompt key:** `spot-gaps-build-the-loop-1`
- **Severity:** Sev-2 (mechanical)
- **Span:** "- **What packaging caught.** Specific moments in the packaged run where the reference, the plan.md, or the verifier prev[ented]…"
- **Why:** Bold markdown inside the fence.
- **Suggested fix:** Remove the `**` emphasis.

---

These 9 cards are the entire confirmed set: 2 adversarially-confirmed sweep flags (§40 / §40a) + 7 mechanical Sev-2s (3× §32, 4× §9). No Sev-1s. The §9 cluster (4 of 7) all sit in the `diagnose-and-resend` / `spot-gaps-build-the-loop` exercise prompts — a single authoring habit (bold-led bullet labels copied into fences); worth one editorial pass rather than four isolated edits when the maintainer batches them.

## Refuted (false positives caught)

The adversarial verifier killed every raw flag outside the 2 confirmed above — `flags_raw` was 0 for all 20 orphan-sweep rules except §40 (2 raw, both confirmed). So there were **no false positives to kill**: the sweep did not over-fire. What this demonstrates instead is that the carve-outs already encoded are being respected at evaluation time, because the high-applicable-count rules came back clean rather than noisy:

- **§16 overwrite-anxiety** carve-outs (personal-scope integrate / fresh-install / regeneration) — covered by behavior-catalog, not in this sweep, but the analogous sweep rules respected scope.
- **§36 wide-prompt split** (59 applicable) — 0 flags; the read-aloud diagnostic did not trip on legitimately multi-move-but-coherent prompts.
- **§38 body-lead-in mirrors opening** (64 applicable) — 0 flags; the §38a surprise-pedagogy carve-out was honoured (no deliberate-non-mirror prompt was flagged).
- **§34 decision-logic-in-fence** (36 applicable) — 0 flags; body-callout vs fence-binding distinction held without false alarms.
- **§40** itself: 2 raw → 2 confirmed, 0 refuted — the verifier confirmed both rather than discounting either as an intended cold/warm design.

Net: zero refutations is the *good* signal here — it means the sweep's applicability gating (N-A counts of 31–68 on the narrow rules) did the filtering up front, so almost nothing reached the adversarial verifier as a candidate flag.

## Close-the-holes plan

Each rule below currently fires **only because this one-off sweep fired it** (`this-sweep`). Left alone it goes dark next build. Recommended permanent home per rule so "the rule fires next time too" without re-running this workflow. Three destinations:

- **(M) mechanical linter** — `scripts/lint-prompt-bodies.js`, for grep-decidable rules.
- **(B) behavior catalog** — `/Users/anttitevanlinna/Projects/agents-102/.claude/skills/content-creation/simulation-behavior.md`, for runtime-behavior patterns a per-prompt judge can grade.
- **(T) technical-judge template** — extend the enumerated surface-4 subset, for static prompt-mechanics a per-prompt static read can grade.

### Grep-decidable → fold into mechanical linter (M)

| Rule | Why grep-decidable | Linter check to add |
|---|---|---|
| §33 git-output grep multi-result fallback | pattern: prompt greps git output + asserts exact-N without a multi-result landing | regex for `grep`/`rev-list`/`log` near a count assertion lacking a fallback-handle token; Sev-2 |
| §39 declare permission-mode when paste requires a mode | frontmatter property check | lint frontmatter: if body references plan/acceptEdits/bypass behavior, require a `permission-mode:` key; Sev-2 |
| §41 artifact-vs-STOP tail ordering | structural: a STOP/ask-and-wait tail appearing AFTER the write imperative | regex: `write|save` imperative followed later by `STOP|ask.*wait`; flag ordering; Sev-1 (bit M2 in a real run) |
| §42 headless-runner no-AUQ guard | structural: headless/tmux-runner prompt lacking an explicit no-AskUserQuestion guard tail | for prompts tagged runner/headless, require a no-AUQ guard line; Sev-1 (bit M3 in a real run). 0 applicable in AE101 today but add the check so it fires when one lands. |

### Runtime-behavior → add pattern to behavior catalog (B)

| Rule | Pattern to add to simulation-behavior.md |
|---|---|
| §6 chained-prompt isolation — no downstream leak | "downstream-leak" pattern: judge holds the multi-prompt set, flags P_n revealing P_{n+1}'s twist |
| §7 no session-resets mid-phase | "mid-phase-reset" pattern: flag a prompt that assumes scrollback a prior step's reset removed |
| §19 minimal hand-off + self-augment (send-off) | "send-off-shape" pattern: four-section task/rules/self-augment/report-back; bites M4/M5 |
| §20 grill before save | "grill-before-save" pattern: assembly prompts must close with a missing-detail grill |
| §21 tell me what you wrote (post-action report) | "report-vs-preconfirm" pattern: side-effect prompts prefer post-action report, irreversible carve-out |
| §25 subagent allowed; explain why after | "subagent-explain-after" pattern: permissive, but require after-fence why |
| §27 name consumer at write time | "name-the-consumer" pattern: every `save as <path>` names a downstream reader |
| §29 normal work request before orchestration | "natural-first-ask" pattern: first task prompt reads like a real work ask, not a mini-protocol |
| §35 separate iteration from persistence | "iterate-vs-persist" pattern: multi-turn-touches-artifact needs the 5-element write-gate shape |
| §37 orient saved rule by where it fires | "rule-orientation" pattern: save-the-rule lead-ins name next-session verb, not this-session verb |

### Static prompt-mechanics → extend technical-judge template (T)

| Rule | Surface-4 extension |
|---|---|
| §5 chain by back-reference + deterministic path | already *named* in surface 4 but not in the enumerated graded subset — add it to the subset so it actually grades |
| §34 disambiguation/decision logic lives inside the fence | add "read-fence-in-isolation" check: runtime-binding logic must live in fence, not body callouts |
| §36 wide prompts split by logical move | add read-aloud diagnostic: >2 logical moves → split recommendation |
| §38 / §38a body lead-in mirrors prompt opening | needs body+fence cross-read — extend the technical-judge to receive the body lead-in alongside the fence and grade phrasal congruence; §38a carve-out requires a maintainer easter-egg note |
| §40 / §40a verify session boundary cold/warm | highest-value — extend technical-judge to receive the module + lecture body to decide cold/warm and check fence self-containment; §40a needs the worktree/window map. This is where the 2 confirmed findings live; it should not stay a sweep-only rule. |
| check_writing §14 watch planting jargon too early (fence surface) | extend writing-judge scope OR technical-judge to grade prompt-fence vocabulary level against arc's current vocabulary — currently body-only |

**Priority order for the maintainer to action the close-the-holes work:** (1) §40/§40a into technical-judge — it caught the only 2 confirmed sweep findings and rides on a cross-file read no standing judge does; (2) §41/§42 into the linter — both bit real AE101 runs (M2, M3) and are grep-shaped; (3) the behavior-catalog batch — cheap to add as patterns, high recurrence. The technical-judge cross-read extension (§38/§40) is the single change that closes the most sweep-only rules at once.
