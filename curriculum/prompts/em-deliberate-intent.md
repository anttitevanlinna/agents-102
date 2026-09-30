---
key: em-deliberate-intent
dest: Claude Code
runtime: cli
origin: engineering-management/declare-your-intent
note: EM M4 exercise deliberate-your-intent, Phase 1. Three posture subagents (keep the hierarchy / flatten it / hybrid) bound by the crux-tagged hypotheses + a fresh synthesis subagent. Chat only, no file writes; the manager's pick feeds em-write-intent.
requires:
  - id: em-leadership-memory
    source: prompt:em-install-leadership-memory
  - id: em-two-crux
    source: prompt:em-find-two-crux
  - id: em-coalition
    source: prompt:em-schedule-coalition-checkin
  - id: em-first-move
    source: prompt:em-shortlist-and-first-move
produces:
  - id: em-intent-deliberation
    location: scrollback
    consumed-by:
      - prompt:em-write-intent
---
Read my memory in `team-leadership.md`. Find my two crux (the Team Knowledge hypotheses tagged `crux`), my coalition, and what the Decision Journal says about my first move.

Then start three subagents. Each argues, at its strongest, for one shape my team could take this quarter:

- Keep the hierarchy: run the change through the structure we have now.
- Flatten it: treat the layers, my own role included, as routing that agents could replace.
- A hybrid: keep some structure, dissolve some, and say which.

Each argument says how its shape moves both crux, and quotes the Team Knowledge entries it rests on. An argument that moves neither crux is out of bounds. No argument drifts toward the middle to be agreeable.

When all three are back, start a fourth subagent that reads only the three arguments. It tells me where they agree, where they split, and what each shape would cost the people on my team.

Give me the three arguments and the fourth read in chat, short. Don't write any files. Don't call AskUserQuestion; where something is unclear, say what you assumed and carry on.
