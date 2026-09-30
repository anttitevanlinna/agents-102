---
key: em-write-intent
dest: Claude Code
runtime: cli
origin: engineering-management/declare-your-intent
note: EM M4 exercise deliberate-your-intent, Phase 2. Runs after the manager names the pick in chat. Writes intent.md (one paragraph, crux-bound, revisable) and the Decision Journal entry.
requires:
  - id: em-intent-deliberation
    source: prompt:em-deliberate-intent
  - id: em-manager-pick
    source: scrollback (the shape the manager chose, and why, typed in chat)
  - id: em-two-crux
    source: prompt:em-find-two-crux
  - id: em-leadership-memory
    source: prompt:em-install-leadership-memory
produces:
  - id: em-intent
    location: intent.md
    consumed-by:
      - prompt:em-rehearse-reactions
      - prompt:em-list-frustrations
      - prompt:em-build-creation-v1
      - prompt:em-close-declare-your-intent
  - id: em-leadership-memory
    location: team-leadership.md
    note: Decision Journal entry for the intent, shapes set aside, trade-offs accepted
---
Write `intent.md` from the shape I just chose. One paragraph, in my voice: where the team is heading this quarter, which crux it moves and in which direction, and what the team's week should look like if it works. Name one thing we don't know yet. Write it as a claim I can revise, not a vision.

Then search the Decision Journal in `team-leadership.md` for earlier decisions this touches, and say if it contradicts one. Log the intent there: the context, the shapes I set aside, why this one won, and what I accept by choosing it.

Tell me what you wrote. Don't call AskUserQuestion.
