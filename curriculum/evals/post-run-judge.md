# Post-Run Judge — Transcript-grounded eval

After the manual end-to-end run, a Judge Claude reads the full Teacher + Builder session transcripts and produces evidence-cited findings. Converts one manual run into reusable signal: curriculum change proposals, SKILL.md upgrades, new per-exercise judges.

## Inputs

1. **Teacher transcript:** `~/.claude/projects/<teacher-slug>/<session-id>.jsonl`
2. **Builder transcript:** `~/.claude/projects/<builder-slug>/<session-id>.jsonl`
3. **Observation sheet:** `curriculum/evals/instances/manual-run-YYYY-MM-DD.md` (filled during the run)
4. **Arc contract:** `curriculum/content-strategy.md` (mood arc + per-module Mood sections)

Session IDs are captured at run start. If the run spans multiple sessions per side (compaction, break between modules), concatenate all Teacher JSONLs and all Builder JSONLs by timestamp.

## How to run

Fresh Claude Code session at repo root. Paste the prompt below. Attach or path-reference the inputs above.

## Judge prompt

```
You are the Post-Run Judge for an Agents 102 Bootstrap manual end-to-end run. Your job: ground findings in transcript evidence, propose specific curriculum changes, and catch what the human observer missed.

INPUTS:
- Teacher session transcript: [path]
- Builder session transcript: [path]
- Observation sheet (filled by human during run): [path]
- Arc contract (mood per module): curriculum/content-strategy.md

You have three jobs. Do them in order.

=== JOB 1 — MOOD LANDING, EVIDENCE-CITED ===

For each module M1 through M8:
1. Find the module-end moment in the Teacher transcript (phase marker, Debrief close, or Bridge to next).
2. Read the 10-20 turns leading up to it in BOTH transcripts.
3. Compare the felt-state at close to the module's deliberate mood.
4. Score 1-10. Quote 1-2 specific turns as evidence (student's language is primary signal; Teacher's facilitation is secondary).
5. If score <8, name what specifically stole the mood — which turn, which instruction, which Claude behavior.

Target: 8+/10 at every module close. 7 = facilitator-premium signature (room-only lift); name what would take it to 8.

=== JOB 2 — BEHAVIOR VS SELF-REPORT ===

The observation sheet is human self-report and will be charitable or incomplete. The transcripts are ground truth. Compare:

- Where did the human mark a phase "fine" but the transcript shows friction (re-reads, confusion, Claude redirects, persona breaks)?
- Where did the human flag a problem that the transcript shows resolved naturally (i.e., not a real issue)?
- What did the transcript catch that the observer didn't mention at all?

Report: 3-5 gaps between observation sheet and transcript reality. This is the most valuable section — it's where the system gets smarter about what to watch for.

=== JOB 3 — CURRICULUM CHANGE PROPOSALS ===

For each real finding (mood miss at a module close, seam break, under-scaffolded phase, Teacher Claude over/under-facilitation, Claude behavior mismatch), propose one specific change. Format:

FINDING: [one line]
EVIDENCE: [transcript turn or observation sheet quote]
PROPOSED CHANGE: [specific file + specific edit]
CONFIDENCE: [high/medium/low — high only if evidence is unambiguous]

Group by file touched so edits can be batched.

=== JOB 4 — SYSTEM UPGRADES ===

If the run revealed a Claude-behavior pattern not in `.claude/skills/content-creation/SKILL.md` § "Known Claude-behavior patterns," propose the new entry.

If the run revealed a missing judge in any per-exercise eval, propose the judge.

If the run revealed a missing watch-for in `manual-run-observation.md`, propose the line.

=== OUTPUT ===

Structure:
1. Mood landing table (M1-M8, score, evidence quote, what stole the mood)
2. Seam report (7 seams, pass/break, evidence)
3. Observation vs transcript gaps (3-5 items)
4. Change proposals (grouped by file)
5. System upgrade proposals (SKILL.md / eval templates / observation sheet)
6. Verdict: ARC HOLDS / ARC FRAYS AT [seams] / ARC BREAKS

Be specific. Quote transcripts. Do not generalize past the evidence.
```

## Triage after Judge completes

1. **High-confidence findings with transcript evidence** → open as work items; fix before next run.
2. **Observation-vs-transcript gaps** → upgrade `manual-run-observation.md` so the next run catches them live.
3. **New Claude-behavior patterns** → add to SKILL.md; they'll steer every future content pass.
4. **New judges** → add to `curriculum/evals/exercise.md` or `lecture.md` templates; re-run affected per-exercise evals.

## One run, compound learning

The single manual run should produce:
- ~20-40 grounded change proposals (triaged by confidence)
- 2-4 new entries in the Claude-behavior pattern list
- 0-2 new eval judges
- An upgraded observation sheet ready for the next run

If the Post-Run Judge produces fewer than 10 proposals, either the arc is solid (unlikely) or the transcripts were thin (run shorter than 8 modules — partial credit, partial signal).
