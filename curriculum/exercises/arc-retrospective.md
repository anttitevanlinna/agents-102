# Arc retrospective

**Time:** 15–20 minutes.

**What you do:** Ask an agent to read everything you've authored across the training and write a one-page note on what changed. The agent names the arc from your own evidence, not a template.

**The point:** The throughline of the training is that everything is scaling of learning. Each module's loop is the same loop at a wider scope. That's only visible retrospectively, and only from your own artefacts. The agent's job here is to name the arc so you see it too.

> **Quick timebox note.** The read across Modules 1–6 artefacts is wide; the beat stays short. One arc-reading pass, one push-back, save or drop. If the agent's note reads true, save. If it reads thin after one re-draft, drop. Dropping is not the soft option; it is a signal your artefacts did not carry the density the read needed. Note that and move on. No perfect note to chase. The arc is yours; the note is just the agent helping you see it.

---

Open a new Claude Code session in the Module 5 worktree (the same one Module 6 Phase 1 + 2 ran in). A fresh session, so there's no scrollback coloring the read. The artefacts across all six modules, `CLAUDE.local.md`, `.claude/memory/`, ADRs, both authored skills, both runs' commits, are accessible via git refs and the worktree state. Both runs' session transcripts live under `~/.claude/projects/`, one folder per cwd the session ran in. Ask the agent to walk them and write the arc from them.

{{prompt:arc-retrospective-1}}

Claude will likely open with a plan-summary paragraph (*"I'll dispatch the sub-task, then combine findings..."*) before any read happens. Skim past the opening; the note is what you're reading for.

If the read runs ten minutes plus, interrupt with *"enough. just tell me now."*, you have what the agent has assembled so far, and that's the read.

Read the note. That's the read of your six modules from outside the work.

If the note reads true, save it. You'll have your agent re-read it when the next long task stalls.

**What happened:** You ended with a short written note in your repo (ADR-shaped or a loose memo, your call) that named how your practice changed across the modules. The agent read across all six modules' artefacts and wrote the arc from your own evidence, not a template.

<!-- maintainer -->


**Quality:** compendium-audited 2026-05-09 (writing@56f9332)
- judges @56f9332: writing PASS, story grandfathered, technical grandfathered, behavior grandfathered
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)
**Word count:** ~320 words body.

**Primary Bloom's level:** Evaluate (student pushes back on the agent's arc-reading against their own sense of it).

**Time budget total:** 15–20 min. Sits between the main exercise and the Debrief in the M6 slot.

**Mood target:** practitioner fluency (the module's mood). The arc-naming is forward-looking, not nostalgic. For core-only cohorts (no M7/M8), this is the visible compounding moment the deliberation module would otherwise carry. Watch-for: trainer-monologue drift (agent produces a generic "here's what you learned" essay). The corrective is the quote rule.

**Shape reference:** bounded-activity shared-library shape (single-move exercise, one prompt, no phases). Mirrors `curriculum/exercises/orient-and-introspect.md` in structure. Designed reusable: can run at the end of any multi-module training variant (Engineering Management, future Agents 101 variants) with the artefact list adjusted to that training's outputs. Primary use is AE101 M6.

**Frameworks riffed on:**
- **Scaling of learning** (content-strategy throughline) — the arc IS the same loop at successively wider scopes. The agent names it from the evidence; the student reads it back.
- **Agent-as-mirror** — lets the artefacts do the talking, not the trainer. Extends the M4 audit-as-subagent move (fresh context, structured return) to a retrospective frame.

**Failure modes + diagnostics:**
- **Agent writes a template retrospective.** *"You learned X, then Y, then Z."* No quotes, no specificity. Diagnostic: zero file quotes in the note. Fix: re-run the prompt; insist on quotes from the student's actual files.
- **Agent praises without evidence.** *"Your test-strategy skill shows strong thinking."* Diagnostic: an adjective without a quoted line underneath. Fix: Nerd push *"quote the line in the skill that earns that sentence."*
- **Student accepts the first draft.** Default-acceptance, same failure mode as every authoring move. Diagnostic: the student saves without a push-back turn. Fix: ask what one sentence in the note isn't true to your experience. Revise from the answer.
- **Artefact list empty or thin.** If the student didn't ship artefacts at one or more modules (common for remote / self-study variants), the agent's arc reads thin. Fix: the note names the gap directly. The absence is data.
- **Agent invents a pattern to tidy the arc.** An over-clean narrative (*"clear progression from X to Y"*) where the student's experience was messier. Fix: push back with a specific messier moment. Ask the agent to fold it in rather than smooth it out.

**Watch-fors:**
- The agent should use the Agent tool to read in a fresh sub-task. If it doesn't, the read gets colored by the current conversation and the arc loses its fresh-eye quality. Nerd: *"did you run that in a sub-task? Re-run it if not."*
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
