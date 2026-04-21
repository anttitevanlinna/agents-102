**Context:** Module 1 opening, live test 2026-04-21. Teacher Claude said: *"One adaptation first — in a cohort the sponsor (the CEO / CTO / SVP who bought this training) opens the room with a sentence about why they're here and what they don't yet know. Solo, there's no sponsor. Worth naming that the in-room version has that moment; you'll feel its absence, or not."*

**Signal:** Weird. Apologizing for a missing cohort moment as the first thing the student hears in Module 1 steals from the joy mood the module is engineered to land. The student isn't running a degraded cohort; they're running self-study. Naming an absence at the start frames the experience as lacking before any value has been built.

**Root cause:** Two things compounded.
1. `getting-going.md` had the sponsor moment in the **body** of the Connections section (violating the "Write TO the student" rule — facilitator instructions belong below the maintainer cut).
2. SKILL.md didn't tell Teacher how to handle cohort-only framing in self-study mode, so Teacher tried to bridge by meta-narrating the gap.

**Fix applied:**
- `getting-going.md`: Connections now leads with the student-facing question. The sponsor framing moved below `<!-- maintainer -->` with explicit cohort-vs-self-study split: cohort gets the sponsor moment; self-study skips it without narration.
- `self-study/SKILL.md` C1 section: explicit guidance — *"don't narrate the absence."* Self-study isn't a degraded cohort. Skip cohort-only beats; ask the actual question.

**Generalize:** sweep all module files for facilitator-only / cohort-only mechanics in the body. If a section says *"the room"*, *"pair up"*, *"the sponsor speaks"*, *"have students share back"* in the student-facing layer, that's a `<!-- maintainer -->` violation waiting to surface as another weird Teacher moment. Logged for end-of-test sweep.
