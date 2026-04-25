# Arc retrospective

**What you do:** Ask an agent to read everything you've authored across the training and write a one-page note on what changed. The agent names the arc from your own evidence, not a template.

**What happens:** You end with a short written note in your repo (ADR-shaped or a loose memo, your call) that names how your practice changed across the modules. Not a self-congratulation round, not a trainer monologue. A reading of your own artefacts by a fresh agent who has the patience to look at all of them at once.

**The point:** The throughline of the training is that everything is scaling of learning. Each module's loop is the same loop at a wider scope. That's only visible retrospectively, and only from your own artefacts. The agent's job here is to name the arc so you see it too.

**Time:** 15–20 minutes.

> **Quick timebox note.** The read across M1–M6 artefacts is wide and we keep the beat short. One arc-reading pass, one push-back, save or drop. If the agent's note reads true, save. If it reads thin after one re-draft, drop. Dropping is not the soft option; it is a signal your artefacts did not carry the density the read needed. Note that and move on. We do not chase a perfect note. The arc is yours; the note is just the agent helping you see it.

---

Open a new Claude Code session in your repo. A fresh session, so there's no scrollback coloring the read. Ask the agent to walk the artefacts you've authored and write the arc from them.

**Prompt** *(Claude Code)*

```
Read my work across the training. Specifically:

- My team `CLAUDE.md` (if present) and my personal `CLAUDE.local.md`.
- Everything at `.claude/memory/` (three-block memory: observations/hypotheses/rules, decisions, quality criteria).
- The ADRs in this repo — wherever our convention puts them (`docs/adr/` or equivalent).
- Both skills I authored at `~/.claude/skills/` during the training (the test-strategy skill from earlier, and the skill I authored today).
- The M4 un-packaged run artefact (commits, files, the session transcript under `~/.claude/projects/` in a folder matching this repo — the earliest long-running run).
- The M5 packaged re-run artefact (commits, files, the session transcript from the re-send of the same task).

Run this audit in a fresh sub-task via the Task tool, so the read isn't colored by this conversation.

Write a one-page note on what changed across this body of work. Not a changelog. What shape did my practice have at the start, what shape does it have now, what specific artefacts show the shift. Quote from my files. Name the pattern that you see recurring across modules if you see one. Don't invent a pattern to make the note tidy; if the arc is uneven, say so and show where.

Propose where the note should live in my repo (ADR, memo in `.claude/memory/`, or a standalone file). Show me the note before you save it. I'll push back, then we save.
```


Read the note. Push back where the agent over-generalises, or where it praises without quoting. This isn't a retrospective report card; it's a reading. The quoted moments are the substance. If the note reads generic, ask the agent to re-draft with more quotes and less framing.

If after one re-draft the note still reads thin, drop it. A thin note is data: it tells you the artefacts don't yet carry the density the arc-reading needs. Better no note than a template.

If the note reads true, save it. You'll re-read it when the next long task stalls.

<!-- maintainer -->

**Word count:** ~320 words body.

**Primary Bloom's level:** Evaluate (student pushes back on the agent's arc-reading against their own sense of it).

**Time budget total:** 15–20 min. Sits between the main exercise and the Debrief in the M6 slot.

**Mood target:** practitioner fluency (the module's mood). The arc-naming is forward-looking, not nostalgic. For core-only cohorts (no M7/M8), this is the visible compounding moment the deliberation module would otherwise carry. Watch-for: trainer-monologue drift (agent produces a generic "here's what you learned" essay). The corrective is the quote rule.

**Shape reference:** bounded-activity shared-library shape (single-move exercise, one prompt, no phases). Mirrors `curriculum/exercises/orient-and-introspect.md` in structure. Designed reusable: can run at the end of any multi-module training variant (Engineering Management, future Bootstrap variants) with the artefact list adjusted to that training's outputs. Primary use is AE101 M6.

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
- The agent should use the Task tool to read in a fresh sub-task. If it doesn't, the read gets colored by the current conversation and the arc loses its fresh-eye quality. Nerd: *"did you run that in a sub-task? Re-run it if not."*
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
- For Bootstrap variants (if adapted): adjust to the training-dir artefacts (memory, sources, agents, CLAUDE.md evolution).
- For shorter formats: the artefact list can trim; the quote rule and the push-back beat are load-bearing and don't compress.

**Pre-cohort open items:** `curriculum/trainings/agentic-engineering-101/pre-cohort-todos.md`.

**TODO (from pre-ship verifier pass):**
- Three-persona sim against the exercise (Maija / Greg / Jin); Greg especially will want to argue with the arc-reading, which is fine. Jin will want to skip the push-back beat. Nerd's job is to keep both in the exercise long enough for the note to earn the save.
- Confirm Task-tool sub-task read of training-arc artefacts is reliable enough to ground the note. If flaky, route the read through the main conversation with the same quote rule.
