# Manual Run — Observation Sheet

For Antti's one end-to-end self-study run. The Arc Pass has already caught static arc problems; the per-exercise evals have caught mechanical problems. **This sheet captures what only a human in a live two-Claude session can see.**

Keep this open in a side pane. Write one line per observation as it happens — not after. Memory compresses mood into "it was fine." Live notes preserve what actually surprised you.

## Setup

- **Training dir:** `~/Documents/agents-102-bootstrap-sim/` (not your real one; throwaway so you can rerun)
- **Two Claudes:** Teacher (`/self-study` at repo root) + Builder (at training dir). Standard self-study shape.
- **Persona:** play one consistent character — suggestion: SVP Marketing at a 400-person Nordic software co, used ChatGPT weekly, never built an agent. Stay in character; don't break frame to evaluate.
- **Recording:** session transcripts are auto-captured at `~/.claude/projects/<slug>/<session-id>.jsonl`. Grab both session IDs at start (Teacher + Builder) — you'll feed them to the Post-Run Judge after.

## Watch-fors (only humans catch these)

### Teacher Claude facilitation quality

- [ ] Does Teacher nudge at the right moments, or over-nudge / under-nudge?
- [ ] Does Teacher catch rubber-stamping (*"find me one row the judge got wrong"* style prompts)?
- [ ] Does Teacher hold the mood contract, or let the student tidy away an unease that should stew?
- [ ] Does Teacher remember state across sessions (read `progress.md`, refer to prior artifacts)?
- [ ] Any moment Teacher drops into curriculum-author voice instead of facilitator voice?

### Mood arc — felt, not scored

At the END of each module, before moving on, write one line:
- M1 felt like: _____________ (target: joyful creation, *"I made this"*)
- M2 felt like: _____________ (target: satisfied compounding, *"it runs while I sleep"*)
- M3 felt like: _____________ (target: unsettled competence, *"I wonder if this is right?"*)
- M4 felt like: _____________ (target: deepened unease, *"damn, this is complex"*)
- M5 felt like: _____________ (target: mechanical rescue, *"ahh, this is fixable"*)
- M6 felt like: _____________ (target: unleashed leverage, *"automate the loop"*)
- M7 felt like: _____________ (target: generous impulse, *"others could benefit"*)
- M8 felt like: _____________ (target: awe and curiosity, *"where is this going?"*)

Any module where your felt-line doesn't match the target = real finding. The arc is broken there, not where evals said.

### Seam moments (slow down here)

The seams are where arc-level breakage shows. Pause and note at each:

- **M1→M2 (joy → compound):** does the student WANT to keep building, or does M2 feel like setup homework?
- **M2→M3 (compound → unease):** does the doubt arrive naturally from the synthesized answer, or does M3 feel bolted on?
- **M3→M4 (unease → deeper unease):** does M4 deepen the doubt or collapse it into a tidy framework?
- **M4→M5 (unease → rescue):** has the unease stewed long enough that M5's rescue feels earned?
- **M5→M6 (rescue → leverage):** does M6 feel like "more of M5" or a real step up in power?
- **M6→M7 (leverage → generosity):** is the sharing impulse generative or compliance-flavored?
- **M7→M8 (generosity → awe):** does M8 land forward-hunger or graduation-ceremony?

### Persona drift triggers

Write down every moment YOU broke character. That's a design finding:
- Moment + what made you break: _____________

Common triggers: ambiguous instruction you had to re-read; Claude behavior that doesn't match exercise assumption; a prompt that asks for expertise you don't have in character; a seam that makes you put on the author hat to explain what's happening.

### Claude behavior mismatches

When Builder Claude's actual behavior differs from what the exercise assumes, note:
- Module + phase + what happened + what exercise expected: _____________

These upgrade the "Known Claude-behavior patterns" list in SKILL.md.

### Time reality vs. spec

Each module has a 1h45 target. Note actual time per phase when it deviates >20%:
- M_ Connections: spec _ / actual _
- M_ Lecture: spec _ / actual _
- M_ Exercise: spec _ / actual _
- M_ Debrief: spec _ / actual _

## After the run

1. Save this sheet filled out at `curriculum/evals/instances/manual-run-YYYY-MM-DD.md`.
2. Feed both JSONL transcripts + this sheet to the Post-Run Judge (`curriculum/evals/post-run-judge.md`).
3. The Judge produces curriculum change proposals grounded in transcript evidence.
4. Triage: the things YOU caught that the Judge missed → upgrade the simulation protocol or the per-exercise evals with a new judge. That's the system getting smarter.

## Why only-human catches matter

Per-exercise evals score artifacts. Arc Pass scores static coherence. Post-Run Judge scores transcripts. **None of them feels the moment a persona loses energy, or notices that Teacher Claude's nudge landed as patronizing, or registers that a seam that reads fine on paper feels like a jump cut live.** That's the slot this sheet fills. Don't automate it; keep it human.
