# Diagnose and re-send

**What you do:** Read the un-packaged M4 artefact through three failure-mode lenses. For each named failure, ask what validation would have caught it at hour 2. Build a verifier shaped against your dominant failure (one of three shapes). Assemble a task-scoped reference artefact + plan.md in conversation. At Debrief, the module re-sends the same task packaged.

**What happens:** You end the exercise with a diagnosis (named failures + quoted moments from your own artefact), a working verifier targeting one specific failure mode, and a reference artefact + plan.md scoped to the same M4 task. The module's Debrief takes over from there: self-compound `CLAUDE.local.md`, then re-send.

**The point:** Ronacher's three-pattern earns its name in this exercise. You don't learn it from a slide; you build each piece against a failure you read in your own artefact. The closing lecture names what you built afterward.

**Time:** 65 minutes inside a 2h module slot (Phases 1–4). Debrief + re-send (~15–20 min) is owned by the module file.

---

## Phase 1: Read the return (~15 min)

Open a new Claude Code session in the same repo you ran M4 in. The artefact lives in two places: the repo (commits made by the M4 agent, files modified, branch state) and the M4 session transcript at `~/.claude/projects/<project-folder>/`, where Claude Code stores every session's scrollback. A fresh Claude can find and read it. File changes tell you *what* the agent did; the transcript tells you *how* it got there, including the drift and dead-ends.

Ask Claude to read the M4 artefact through the three failure-mode lenses and quote specific moments for each.

**Prompt** *(copy → Claude Code)*

```
I sent off a multi-hour task at the end of M4 un-packaged — no plan.md, no verifier, no reference artefact. I want to read what came back through three failure-mode lenses.

Read what the M4 agent did. Start with the repo state: commits since the M4 send-off, files it modified, branch state. Then read the M4 session transcript. Claude Code stores every session's scrollback at `~/.claude/projects/<project-folder>/`; find the most recent session for this project and walk through it. That's where the agent's reasoning trail lives. The file changes alone miss the drift and the dead-ends.

Then walk the work through three lenses:

- **Goal drift** — moments where the agent solved an adjacent problem instead of the asked one. Buried instruction, redirected scope.
- **Context rot** — moments where the agent rehashed an approach it had already considered and ruled out, or re-derived something already in the working window.
- **Plausible-but-wrong** — outputs that look reasonable in isolation but don't match the original task spec.

For EACH lens, quote one specific moment from the artefact (commit message, file change, scrollback line). Don't generalise; quote. If a lens has no instance, say so — that's data too.

End with: which of the three was the DOMINANT failure mode? You'll build the verifier against that one.
```

*(end of prompt)*

Push back where Claude generalises. Insist on quoted moments. The diagnosis is data, not blame; the un-packaged run was supposed to underdeliver. **Framework**: this is *diagnosis through named failure modes*. The vocabulary is the lens, the artefact is the substance.

---

## Phase 2: Align-then-run, in reverse (~10 min)

For each named failure, ask the question that earns the three-pattern: *what validation would have caught this at hour 2, not hour 6?*

Ask Claude to walk each diagnosed failure backwards into the validation that would have caught it.

**Prompt** *(copy → Claude Code)*

```
For each of the three failures we just named, walk it backwards: what specific validation would have caught it at hour 2?

Practitioners running multi-hour coding agents in the last six months converge on three validation categories. Use these as the answer shape:

- **A re-readable spec.** Scope + success criteria + constraints the agent can diff its in-progress work against, mid-run. Holds the goal pinned down when the conversation grows.
- **A working document the agent owns and updates.** Durable state the agent re-reads when its working window fills. Phase breakdown, current-phase marker, decisions log, what-didn't-work list. Survives compaction.
- **An automated check on produced work.** Tests, lint, compile, a deterministic hook, or an LLM judge. Fires on agent output and decides pass/fail against a quality bar.

For each failure I diagnosed, map it to the validation category that would have caught it. Be specific: not "a re-readable spec" generically, but what THAT spec would have said to catch THIS particular goal-drift moment. Name when the validation would have fired (start of run, mid-run, end-of-task, on commit).

Don't name frameworks or practitioners by label ("Ronacher's three-pattern," "Huntley's Ralph," etc.) — walk from the specific failure to the specific validation. The naming happens later.
```

*(end of prompt)*

Read the three answers. You should now have a working description of three pieces, each tied to a specific failure you diagnosed. Phase 3 builds one of them; Phase 4 assembles the other two.

---

## Phase 3: Build the verifier (~20 min)

Three shapes the verifier takes. Pick the one matching your dominant failure. The comfortable shape is rarely the right one; match the failure, not your familiarity.

- **Background-agent verifier** — separate Claude session reads the produced work and judges it. Right when the failure was qualitative (style, fit, "did the answer the question").
- **Deterministic shell-hook** — tests, lint, type-check, compile, custom invariant. Right when the failure has a true-false answer (broke the build, touched the wrong directory).
- **Ralph re-feed** — loop the prompt with a check baked in; agent re-runs against its own output until the check passes. Right when drift was the dominant failure and re-anchoring catches it.

Ask Claude to build the verifier shape that matches your dominant failure, scoped to the M4 task.

**Prompt** *(copy → Claude Code)*

```
Build the verifier for my dominant failure. I'll tell you which shape after you ask me — background-agent (qualitative judge), shell-hook (deterministic), or Ralph re-feed (drift-anchoring).

Once I've named the shape, build it scoped to the M4 task we ran. The verifier should fire on agent-produced work and decide pass/fail against a quality bar that, if it had been in place, would have caught the failure I diagnosed.

If shell-hook: write the script and tell me where it lives in this repo (CI config, `.claude/hooks/`, or pre-commit, whichever fits the repo's existing conventions).

If background-agent: write the prompt and tell me how to invoke it (slash-command, sub-task dispatch, or scheduled run).

If Ralph re-feed: write the loop wrapper and the check it runs each iteration.

Show me the verifier before you save anything; I'll push back, then we save.
```

*(end of prompt)*

Read what Claude proposes. Push back if the verifier covers the wrong shape (a generic test suite when you needed a judge, or vice versa). The fit between failure shape and verifier shape is the teaching moment.

**Framework**: the verifier IS your first eval. The closing lecture names this; for now, build it.

---

## Phase 4: Assemble reference + plan.md (~20 min)

Reference artefact pins the task's success criteria and points at the relevant memory, skills, and connectors. plan.md is the durable working document the agent re-reads when its window fills.

Ask Claude to assemble both, scoped to the same M4 task, in conversation.

**Prompt** *(copy → Claude Code)*

```
Build me two task-scoped artefacts for re-running the M4 task packaged.

First, the reference artefact. A task-local file (not my codebase rules — those already exist). Should hold:
- The task scope and success criteria, in two or three sentences
- Pointers to the memory pages, ADRs, skills, and connectors most relevant to THIS task
- The constraints the verifier we just built will enforce
- A "done means" line — what the agent should produce that signals task completion

Second, plan.md. A working document the agent owns and mutates as it runs. Should start with:
- The task broken into 3–7 phases the agent can re-anchor against
- A "current phase" line the agent updates as it progresses
- A "decisions log" section the agent appends to when it makes a load-bearing choice
- A "what I tried that didn't work" section to prevent context-rot re-derivations

Propose the file paths (next to each other; same task-scoped folder). Show me both files before you save. I'll push back, then we save.
```

*(end of prompt)*

Read both files. Push back if the reference reads like generic best practices instead of THIS task's substance. Push back if plan.md reads like a project plan instead of an agent-mutable working document. The artefacts are for the agent to consume mid-run, not for you to admire.

**The exercise ends here.** The module's Debrief takes over: self-compound `CLAUDE.local.md`, then re-send the same task with reference + plan.md + verifier all in play.

<!-- maintainer -->

**Word count:** ~810 words body.

**Time budget total:** 65 min exercise body. Module Debrief + re-send adds 15–20 min. Closing lecture adds 12–15 min after Debrief.

**Frameworks riffed on:**
- **Diagnosis through named failure modes** (Phase 1) — convergent practitioner vocabulary (goal drift / context rot / plausible-but-wrong); pre-read carries the colour, this exercise applies them.
- **Align-then-run, in reverse** (Phase 2) — Ronacher's align-then-run move (ask the agent how it would validate, then negotiate the validation loop) inverted: ask backwards from a failure to the validation that would have caught it. Earns the three-pattern.
- **Three verifier shapes** (Phase 3) — Boris Cherny. Menu form; student picks one against dominant failure. Closing lecture confirms attribution.
- **Reference + plan.md** (Phase 4) — Ronacher's three-pattern, two of three pieces. Built in conversation, scoped to the task.

**Failure modes + diagnostics:**
- **Phase 1 generalised diagnosis** — student says "the agent drifted" without quoting moments. Diagnostic: prompt requires quoted artefact moments; if Claude returns only summaries, re-run with explicit *"quote a specific commit / file change / scrollback line"*.
- **Phase 1 dominant-failure dodge** — student picks the failure mode they already know how to fix, not the one that cost the most. Diagnostic: ranking is by impact, not familiarity. Nerd: *"which one cost the run the most? Build the verifier for that one."*
- **Phase 2 prescription-jumping** — student rushes past the question to start building. Diagnostic: Phase 2 produces three named validations; if the conversation moved to "let me build" before all three, redo.
- **Phase 3 verifier-shape mismatch** — student picks the shape they're most comfortable building (usually shell-hook), regardless of failure. Diagnostic: does the verifier actually fire on the failure mode it targets? If not, re-scope.
- **Phase 3 verifier as test suite** — student rebuilds the existing test suite as their verifier. Diagnostic: the verifier targets agent-produced work, with a quality bar that ISN'T already in CI. Nerd: *"if the existing tests caught it, the run wouldn't have failed. What's missing from the existing tests?"*
- **Phase 4 reference-as-codebase-rules** — student rewrites `CLAUDE.local.md` content into the reference. Diagnostic: the reference is task-local, lives in a task-scoped folder, references the codebase rules instead of restating them.
- **Phase 4 plan.md-as-project-plan** — student writes a Gantt-shaped plan instead of an agent-mutable document. Diagnostic: the plan.md has a "current phase" line the agent updates and a "decisions log" the agent appends to. If neither, redo.

**Plug points:**
- Student's own M4 artefact (Phase 1 substrate)
- Repo's existing CI / hook / pre-commit conventions (Phase 3 shell-hook integration)
- Sponsor-stated task-scoped folder convention (Phase 4 file paths)

**Decision points (pacing):**
- **Phase 1 >20 min** — over-diagnosis; force ranking and a single dominant.
- **Phase 1 <10 min** — under-engagement; diagnostic is whether quoted moments appear. If summary-only, redo with quote-enforcement.
- **Phase 3 verifier doesn't fire** — re-scope. The verifier is the load-bearing artefact for the re-send; spend extra time here over Phase 4 if needed.
- **Phase 4 >25 min** — reference becoming a manifesto. Cap at half-page reference + half-page plan.md.
- **Whole-room mood below 7** — learning through contrast isn't landing. Check Phase 1 specificity. If diagnoses stayed generic, the contrast in Phase 2 has nothing to bite into.

**Watch-fors (cross-phase):**
- Failure-mode collapse — student treats two failure modes as the same. Phase 1 must produce distinct quoted moments for each named mode.
- Verifier gold-plating — student tries to build a 5-shape verifier covering everything. M5's verifier is shaped against ONE failure; M6 expands the kit.
- Three-pattern naming pre-empted — if Phase 2 or Phase 3 names "Ronacher's three-pattern," the closing lecture has nothing to add. Watch for the term-of-art leaking into Nerd push-backs.
- Reference vs. rules drift — students familiar with `CLAUDE.local.md` may try to rewrite it as the reference. The reference is task-local; rules are repo-local.

**Send-off mechanism (Debrief, owned by module file):**
- Same Claude Code session as the exercise. No new session, no scheduled agent.
- Reference artefact + plan.md + verifier all loaded; agent re-reads at every working-window pressure point.
- Same close-the-laptop or stop-when-you've-seen-enough rule as M4.

**TODO (pre-first-cohort):**
- Three-persona sim against the exercise (Maija mid-competent / Greg opinionated senior / Jin fast operator); confirm mood-at-end clears 8 for all three.
- Capability check: Claude Code reading prior-session scrollback under `~/.claude/projects/<project>/` reliably enough to ground Phase 1 diagnosis. If unreliable, route diagnosis through repo-state only (commits + file changes + branch).
- Source verification: confirm Cherny's three-shape framing is his actual taxonomy in the cited interview, not synthesised. If synthesised, soften Phase 3 menu language to "three shapes practitioners use."
- Worked-example reference + plan.md pair for the Nerd's reference library, by engineer archetype (backend / frontend / platform / data).
- Eval instance: `curriculum/evals/instances/agentic-engineering-101--diagnose-and-resend.md` to be filled before first cohort.
