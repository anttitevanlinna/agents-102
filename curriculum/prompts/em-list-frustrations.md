---
key: em-list-frustrations
dest: Claude Code
runtime: cli
origin: engineering-management/declare-your-intent
note: EM M4 exercise build-your-first-creation, Phase 1. Reads the memory, intent and observations; lists recurring frustrations with quoted evidence and the crux each sits on. Chat only; the manager's pick feeds em-build-creation-v1.
requires:
  - id: em-leadership-memory
    source: prompt:em-install-leadership-memory
  - id: em-intent
    source: prompt:em-write-intent
  - id: em-observations
    source: prompt:em-schedule-weekly-diagnostic
opportunistic-copy:
  - id: em-diagnostic
    if-present-at: diagnostics/
    rationale: the weekly diagnostic's latest output shows which frustrations recur; absent if it never ran
produces:
  - id: em-frustrations
    location: scrollback
    consumed-by:
      - prompt:em-build-creation-v1
---
List the frustrations that keep coming back in my team's week. Read `team-leadership.md`, `intent.md` and the notes in `observations/`, and the latest file in `diagnostics/` if there is one.

I mean things that stall, get lost, wait on me, or never get shared. Give me five. For each, quote where it shows up, name the crux it sits on, and say whether a mechanism could take it on or only a conversation could.

Tell me the list in chat. Don't build anything yet. Don't call AskUserQuestion.
