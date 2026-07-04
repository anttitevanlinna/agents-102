# Name the arc

**Time:** 15–20 minutes.

**What you do:** Ask Claude to read everything you've authored across the training and write a one-page note on what changed. The agent names the arc from your own evidence, not a template.

**What you build:** one piece: a one-page note that names how your way of working changed across the six modules. It is written from your own artefacts and quoted back to you, not assembled from a template.

**The point:** The throughline of the training is that everything is scaling of learning. Each module's loop is the same loop at a wider scope. That is only visible retrospectively, and only from your own artefacts. The agent's job here is to name the arc so you see it too.

> **Quick timebox note.** The read across Modules 1–6 artefacts is wide; the beat stays short. One arc-reading pass, one push-back, save or drop. If the agent's note reads true, save. If it reads thin after one re-draft, drop. Dropping is not the soft option; it is a signal your artefacts did not carry the density the read needed. Note that and move on. No perfect note to chase. The arc is yours; the note is just the agent helping you see it.

---

## Point the agent at all six modules' artefacts

- **You stay in the same session, in the M5 worktree.** This continues the session that ran the Module 6 work. No new session. The fresh, uncoloured view comes from a sub-task the prompt spawns: a separate read the agent runs with clean context, so the arc is not coloured by this conversation.
- **Everything you authored is on disk.** The artefacts across all six modules live in the worktree: `CLAUDE.local.md`, `observations/`, ADRs, both authored skills, both runs' commits, all reachable via git refs and the worktree state.
- **The run coordinates are recorded too.** Both runs' branch names and transcript paths sit on disk: M4 in `task.md`, M5 in `plan.md`'s protected `Run coordinates` block.
- **You hold the arc; the agent walks the files.** You are not re-reading six modules of code. The agent walks the artefacts and writes the read.

Ask Claude to spawn a fresh sub-task, walk every artefact, and write the arc from your own evidence.

{{cut:arc-retrospective-1|meta-retrospective}}

## Read the note, push back, keep it if it's true

- **Skim past the opening.** Claude will likely open with a plan-summary paragraph (*"I'll dispatch the sub-task, then combine findings..."*) before any read happens. The note is what you are reading for.
- **Cap the read; do not chase it.** If the read runs ten minutes plus, interrupt with *"enough. just tell me now."* What the agent has assembled so far is the read of your six modules from outside the work.
- **Push back on one line.** Find one sentence in the note that is not true to your experience, and have the agent revise from the correction. One re-draft, not five.
- **Keep it if it reads true; drop it if it reads thin.** If the note reads true, save it; you will have your agent re-read it the next time a long task stalls. If it still reads thin after the re-draft, drop it and move on.

**What happened:** A short note now sits in your repo, ADR-shaped or a loose memo, your call. It names how your way of working changed across the modules, read from your own artefacts and quoted back to you, not from a template.

<!-- maintainer -->


**Quality:** compendium-audited 2026-05-26 (writing@0ef2ca6 technical@0ef2ca6 pedagogy@0ef2ca6)
- judges @0ef2ca6: writing PASS, story grandfathered, technical PASS, behavior grandfathered, pedagogy PASS, strategy grandfathered
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)
**Word count:** ~320 words body.

**Primary Bloom's level:** Evaluate (student pushes back on the agent's arc-reading against their own sense of it).

**Time budget total:** 15–20 min. Sits between the main exercise and the Debrief in the M6 slot.

**Mood target:** practitioner fluency (the module's mood). The arc-naming is forward-looking, not nostalgic. For core-only cohorts (no M7/M8), this is the visible compounding moment the deliberation module would otherwise carry. Watch-for: trainer-monologue drift (agent produces a generic "here's what you learned" essay). The corrective is the quote rule.

**Shape reference:** bounded-activity shared-library shape (single-move exercise, one prompt, no phases). Mirrors `curriculum/exercises/orient-and-introspect.md` in structure. Designed reusable: can run at the end of any multi-module training variant (Engineering Management, future Agents 101 variants) with the artefact list adjusted to that training's outputs. Primary use is AE101 M6.

**Frameworks riffed on:**
- **Scaling of learning** (content-strategy throughline) — the arc IS the same loop at successively wider scopes. The agent names it from the evidence; the student reads it back.
- **Agent-as-mirror** — lets the artefacts do the talking, not the trainer. Extends the M4 audit-as-subagent move (fresh context, structured return) to a retrospective frame.

**Leap test (Monday):** three observable verbs the engineer exhibits on their own codebase next working day:
- reopens the saved arc note (and feeds it back to the agent) the next time a long agent run stalls, instead of re-deriving where their approach stands cold
- spawns a fresh sub-task agent to read across their own real project artefacts and write the state-of-play from quoted files, not a template summary
- corrects at least one sentence the agent got wrong about their own arc and has it revise from the correction, rather than saving the first draft

**Failure modes + diagnostics:**
- **Agent writes a template retrospective.** *"You learned X, then Y, then Z."* No quotes, no specificity. Diagnostic: zero file quotes in the note. Fix: re-run the prompt; insist on quotes from the student's actual files.
- **Agent praises without evidence.** *"Your test-strategy skill shows strong thinking."* Diagnostic: an adjective without a quoted line underneath. Fix: trainer push *"quote the line in the skill that earns that sentence."*
- **Student accepts the first draft.** Default-acceptance, same failure mode as every authoring move. Diagnostic: the student saves without a push-back turn. Fix: ask what one sentence in the note isn't true to your experience. Revise from the answer.
- **Artefact list empty or thin.** If the student didn't ship artefacts at one or more modules (common for remote / self-study variants), the agent's arc reads thin. Fix: the note names the gap directly. The absence is data.
- **Agent invents a pattern to tidy the arc.** An over-clean narrative (*"clear progression from X to Y"*) where the student's experience was messier. Fix: push back with a specific messier moment. Ask the agent to fold it in rather than smooth it out.

**Watch-fors:**
- The agent should use the Agent tool to read in a fresh sub-task. If it doesn't, the read gets colored by the current conversation and the arc loses its fresh-eye quality. Trainer push: *"did you run that in a sub-task? Re-run it if not."*
- Note should feel like a reading, not a verdict. If it reads pass/fail, the frame slipped.
- The save destination matters less than the save itself. ADR, memo, standalone file: any works. Don't spend retrospective time on the filing decision.

**Plug points:**
- Student's actual artefacts across the modules (rules files, memory, ADRs, skills, long-running run outputs). Plug here is the artefacts themselves, not a template.
- Sponsor-stated ADR convention (if the note ends up as an ADR).
- Team-kit home if live (if the note names team-worthy observations, flag for PR via the same human-conversation rule as skills).

**Decision points (pacing):**
- **>20 min** — the agent is producing an essay, not a note. Cap length in the prompt: *"one page, not three."* Or ask for the three-quote version and stop there.
- **<10 min** — the agent's note is thin. Check the artefact list: did it actually read all of them, or did it skim? Re-run with explicit file list if needed.
- **Student won't push back** — they're treating the note as finished. Ask *"is there one sentence in here that doesn't match your experience?"* Anything the student flags becomes a revision prompt.

**Reusable across training variants:**
- For Engineering Management variant: adjust the artefact list to EM outputs (team-2x infra files, review-policy ADRs, onboarding memo, team-kit contributions).
- For Agents 101 variants (if adapted): adjust to the training-dir artefacts (memory, sources, agents, CLAUDE.md evolution).
- For shorter formats: the artefact list can trim; the quote rule and the push-back beat are load-bearing and don't compress.

**Pre-cohort open items:** `curriculum/trainings/agentic-engineering-101/pre-cohort-todos.md`.
