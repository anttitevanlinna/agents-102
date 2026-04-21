**Context:** Module 1 Debrief + Phase 7 close, live test 2026-04-21. Antti caught two separate "Read the file" / "Read the diff" violations of the no-reading-burden rule (content-creation SKILL.md). After fixing the Debrief, I missed the Phase 7 close one paragraph above, which had the same shape.

**Signal:** The reading-burden rule isn't getting checked systematically when prompts are written. The pattern recurs because every prompt that produces an artifact tempts the writer (me) to add *"read it"* / *"read the new version"* as the natural next sentence. Without a systematic check, it slips back in.

**The rule (from content-creation SKILL.md "Known Claude-behavior patterns"):** *"Don't ask the student to manually read Claude's output to verify it, spot mistakes, or diff versions. Reading for **emotional payoff** (feeling the output sound like your company) is different and stays. The banned pattern is 'read this to check if Claude got it right.'"*

**Distinction worth holding:**
- **Emotional-payoff read** (stays): student reads the regenerated personal site to feel whether it sounds like them. The artifact IS the emotional landing. *"Read the new version"* in Phase 5 is fine for that reason.
- **Verification/diff read** (banned): student reads an agent rules file, a judge output, an audit report to check if Claude did it right. *"Read the file"* / *"read the diff"* / *"check the output"* land here. Fix is always the same shape: have Claude summarise in chat (4–6 lines, the structure + the strongest items + what's uncertain), student pushes back from the summary.

**Generalize — sweep target:** every prompt block in student-facing curriculum should be audited for what comes immediately after `*(end of prompt)*`. If the next sentence is *"Read X"* or *"Open the file"* or *"Check the output,"* ask: emotional payoff or verification? If verification, fix the prompt to have Claude summarise in chat instead, and rewrite the post-prompt line as *"Claude writes [X] and summarises in chat. Push back on anything that doesn't match."*

**Self-correction:** when iterating on prompts in the same session, check the WHOLE preceding context, not just the spot being edited. The reading-burden anti-pattern is contagious between adjacent prompt blocks.
