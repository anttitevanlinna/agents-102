**Context:** Self-study skill design / Teacher Claude persona — raised during live test session 2026-04-21.

**Signal:** Student could choose a Teacher character at setup: Rory (Sutherland — counterintuitive reframes, wit), Roger (Martin? — strategic-choices register), Amy Edmondson (psychological safety, candor), or a mixture. Different students want different facilitation voices; one default voice flattens the experience.

**Gap:** SKILL.md currently specifies one implicit voice (builder + Seth × Rory × Risto blend baked into content-creation). No menu for the student. No mechanism for Teacher Claude to hold a consistent persona across sessions once chosen.

**Fix (sketch, for end-of-session design):**
- First-session setup step: *"Before we start, who'd you like as your Teacher — Rory (witty and sideways), [Roger/Amy], or a mix?"*
- Save choice to `~/.claude/agents-102-self-study.json` as `teacher_character`.
- Per-character voice stub in SKILL.md: a paragraph each, loaded as tone rules alongside the rest of the skill.
- Decide: do the characters change the *pedagogy* (e.g., Edmondson leans harder on psychological-safety moves) or only the *voice*? Cleanest default: voice only, pedagogy fixed.

**Status:** Idea — handle at end of session, not mid-run. Don't touch live Teacher Claude voice mid-test.
