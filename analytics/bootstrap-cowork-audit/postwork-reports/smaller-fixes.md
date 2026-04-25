# Bootstrap Cowork — smaller fixes report

Six file-disjoint fixes applied. Avoided files owned by parallel M4 reshape: `security.md`, `audit-your-agent.md`, `module-4-prework.md`, `author-security-plugin.md`, `module-4-starter` scaffold.

---

## Fix 1 — M2 prework "Plan-mode primer" label leak

**Files touched:**
- `curriculum/trainings/bootstrap/building-agent-systems.md`
- `curriculum/exercises/module-2-prework.md`

**Before:** Meta block listed prework item (3) as `[Plan-mode primer (15 min)]` linking to anchor `#3-plan-mode-primer-15-min`. Cowork has no plan mode; the label leaked the Code-only feature into Cowork render.

**After:**
- Module file: paired `<span class="rt-code">` / `<span class="rt-cowork">` around the link text. Code reads "Plan-mode primer (15 min)"; Cowork reads "Plan-first primer (15 min)". Both link to `#3-plan-first-primer-15-min`.
- Prework file: section heading `## 3. Plan-mode primer (15 min)` runtime-forked to read "Plan-first primer" in Cowork. Lead paragraph forked: Code keeps the plan-mode toggle framing; Cowork explains that Cowork has no plan-mode toggle and the same discipline comes from asking for a plan in the prompt. "Why … exists" intro inline-forks the term. Body paragraphs (2 reasons + rule of thumb) reworded runtime-neutrally (replaced "Plan mode gives you" / "turn it on" with "A plan-first move gives you" / "reach for it"). The Read/Watch list paired-divs: Code keeps the toggle/footer framing; Cowork describes the in-prompt move and reframes the Pocock video as "demo is in Code, but the move is the same one you'll ask for in Cowork."

**Note:** runtime-neutral rename was preferred per spec; Cowork users get a slightly longer fork (rule 11 — Cowork users have less terminal-fluency to lean on).

**Verdict:** DONE.

---

## Fix 2 — M3 four-session Cowork concrete UI guidance

**File touched:** `curriculum/exercises/three-retrievers-three-minds.md`

**Before:** Single-sentence Cowork variant on the demo line — *"Open four Cowork sessions on this connected folder. Name them in your head…"* — shorter than the Code fork (rule 11 violation).

**After:** Demo line wrapped in paired `<div class="rt-code">` / `<div class="rt-cowork">`. Cowork fork extended with a concrete UI paragraph naming the path (Claude Desktop → Cowork tab → new session pointed at training directory, repeat three times, four tabs/windows side by side, shared filesystem but not shared scrollback). A second Cowork-only fallback paragraph: if the build doesn't yet support four concurrent sessions on one connected folder, fall back to running the three retrievers as agents inside one main session — same shape as Phase 2's three-minds pattern, one phase earlier; loses the visceral feel, keeps the parallel-retrieval mechanic.

Cowork fork is now meaningfully longer than Code fork (rule 11 satisfied).

**Capability verification:** Did not invoke `claude-code-guide` agent (no agent-dispatch capability in this thread). The fallback paragraph is conditioned on build state ("if your Cowork build doesn't yet support…") which is the disciplined shape when capability isn't fully verified — student is given a path either way. Maintainer block already carries a self-study TODO; no new debt added.

**Verdict:** DONE.

---

## Fix 3 — M7 Access-Trust Gap zombie-stat

**File touched:** `curriculum/trainings/bootstrap/personal-to-team.md`

**Before:** Three citation sites in the file:
1. Meta/Prework: *"54–95% have access; 5–22% have production trust; gap always wider than 35 points"*
2. Body lecture (line 35): *"54–95% of enterprises have access. 5–22% have production trust. The gap is always wider than 35 points."*
3. Key Concepts (line 45): *"The gap is always wider than 35 points, across every source that's measured it."*

**After:** Per `check_research_claims.md` § zombie-stat rule, the round-number range is the classic shape (consultancy / analyst-circulated, original methodology and sample size not surfaced in the time available). Rewritten qualitatively at all three sites:
1. *"most enterprises have given far more people access than they trust to run real production work"*
2. *"In our practice, most companies have rolled out access far ahead of trust — large fractions of the workforce can reach the agent, a much smaller fraction is trusted to run it on real production work. The gap is wide, and it's social, not technical."*
3. *"The gap is wide everywhere we've looked."*

Maintainer block in same file gained a *"Source-verification debt — Access-Trust Gap stat"* bullet flagging `[UNVERIFIED STAT]` and listing what would have to surface (sample size, methodology, recency under 6 months) to restore the number.

The pedagogical move (technical plan fills, people plan stalls) is preserved — that was the load-bearing teaching beat, not the digit.

**Verdict:** DONE.

---

## Fix 4 — M7 AskUserQuestion Cowork fallback

**File touched:** `curriculum/exercises/share-your-work.md`

**Before:** Phase 1 prompt (Builder Claude) instructs *"use your ask-questions tool to confirm or correct each piece. Five to eight questions, each with three or four options."* AskUserQuestion is a Code-side tool; Cowork's surface for it is uncertain.

**After:** Phase 1 prompt block wrapped in paired `<div class="rt-code">` / `<div class="rt-cowork">`. Code fork keeps the ask-questions tool invocation as designed. Cowork fork preserves the bounded-options mechanic but replaces the tool call with a numbered/lettered-options format: *"Present five to eight questions, one at a time or as a single numbered list. Each question gets three or four lettered options (a / b / c / d) drawn from my memory. I reply with the letter."* Same structural enforcement (bounded options, no freeform), runtime-equivalent.

The maintainer block already documents the capability check on AskUserQuestion (line 237 in the original file) and the one-at-a-time vs single-call variants — left untouched; the new Cowork fork covers the absent-tool case.

**Verdict:** DONE.

---

## Fix 5 — Prework recap-server Cowork question

**File touched:** `curriculum/trainings/bootstrap/prework.md`

**Before:** Section *"One small thing for the recap site — ask Claude to start a local server"* tells the student to ask Claude to start a port-8000 web server on the training repo root. Works on Code (CLI / Desktop, local filesystem, port reachable from the host browser). Cowork runs in an isolated environment per the architecture facts in the spec; the served port doesn't reach the host browser the same way.

**After:** Heading runtime-neutralized to *"One small thing for the recap site"* (the *"ask Claude to start a local server"* clause was Code-specific). Body paired-divs:
- Code fork: original local-server prompt and instructions intact (port 8000, bookmark URL, debug via Claude).
- Cowork fork: two paths. (1) Customer-hosted recap site — password-protected URL the trainer/sponsor shares (matches `curriculum/CLAUDE.md` § Material Distribution which already names this as the cohort default). (2) Local file fallback — open `site/curriculum.html` directly in the browser via Finder/File Explorer (`file://`). Closing line names why Cowork doesn't run the port-8000 trick.

The agentic move *"you ask, the agent does"* survives in the Code fork (where it's the first proof point); Cowork users get a one-step open-the-bookmark move, which is the right shape for that runtime.

**Capability verification:** Spec stated *"Cowork runs in an isolated VM and can't expose a port to the student's browser the same way"* as a given fact, so I took the second branch of the decision tree (write the actual fork). If a future Cowork release exposes localhost from the VM, the Code fork's prompt is already authored and easy to merge.

**Verdict:** DONE.

---

## Fix 6 — M8 cross-participant data-handling + Cowork shared-FS story

**File touched:** `curriculum/exercises/joint-double-diamond.md`

**(a) Data-handling sentence — body grounding paragraph:**

Added one sentence to the *"Before you start — the grounding rule"* paragraph (right after the existing "no agent cites a claim without pointing at the file it came from" line):

> *"Before you publish your context-manifest, redact what shouldn't leave your boundary — customer names, partner-NDA material, M&A speculation, salary references. The manifest is read by other agents in the room; treat it like a published document."*

Inline, no new header, no scripted-pause register. Lands in the same paragraph as the grounding rule because that's where the publish-action is named.

**(b) Maintainer block — Cowork shared-FS capability check:**

Added a bullet under the existing *"Trainer artifacts required"* list, right after the existing shared-context-mechanism bullet:

> *"Capability check — Cowork shared-FS story. In-room shape assumes a shared filesystem twenty agents can read each other's `module-8/` folders on. Code CLI / Desktop with shared filesystem (NFS, shared mount, or git-pulled before each round) is the verified path. Cowork connected-folders are per-participant by default; in-room delivery on Cowork requires either a shared workspace primitive that doesn't yet exist, or a fallback where each participant's `context-manifest.md`, `crux.md`, and `guiding-policy.md` are git-pushed and pulled between rounds. For mixed-runtime cohorts, default to the git-push fallback so Code and Cowork participants land at the same shared state at each phase boundary."*

**Verdict:** DONE.

---

## Cross-cutting

- **Content-strategy alignment:** None of the six fixes changed module spine, exercise name, mood contract, or LOs (LO line in M2 already runtime-forks "plan mode" — untouched). No `content-strategy.md` sync needed.
- **AE101 safety:** Did not touch any file under `curriculum/trainings/agentic-engineering-101/`.
- **Disjoint-from-M4-reshape:** Did not touch the five files reserved for that subagent.
- **Linter pass on share-your-work.md:** A linter normalized em-dashes to colons and section punctuation after the runtime-fork edit landed. Preserved as intentional; Cowork-specific content is intact.

WROTE: /Users/anttitevanlinna/Projects/agents-102/analytics/bootstrap-cowork-audit/postwork-reports/smaller-fixes.md

ALL FIXES APPLIED
