**Context:** Module 1 lecture demo (Context is King), live test 2026-04-21. Teacher tried to run the two-prompt demo inline — generated the "Session A / Session B / Session C" answers itself within the Teacher conversation. Antti caught it: *"meta: did you actually run the prompts? It did not look like you did?"* Teacher admitted: theatrical framing, not actually separate sessions.

**Signal:** The previous SKILL.md design told Teacher to *"be the model in the demo"* — generate fresh-context answers itself. But Teacher is one Claude, in one conversation; pretending to be three isolated sessions reads as performance, not real evidence. The student sees through it because the answers all sound like the same Teacher voice.

**Fix:** Teacher uses real subagents (Agent / Task tool) to run demo prompts in genuinely isolated sessions. Each subagent is a fresh Claude with no shared context — exactly what "another session" needs to be. Real, not theatrical.

**Critical: never say "subagent" to the student.** Subagents are deep magic — internal mechanism, not vocabulary. Student-facing language: *"simulating a session"* / *"running this in a fresh session, with no memory of what came before"* / *"a fresh Claude with no context."* The mechanism is invisible; the mechanic is the point.

**Codified in SKILL.md § What Teacher runs vs. what Builder runs:** demo execution now uses real subagents with the *"simulating a session"* framing. The Context-is-King demo example rewritten in the new shape.

**Test:** Antti re-runs Module 1 lecture, sees Teacher fire actual subagents and present results as "Session A / Session B." If the answers are genuinely different across cold vs. context-loaded calls, the demo lands.
