# Self-Study Signals

Where self-study learnings land so the Bootstrap gets smarter every time a student runs it. Mirrors the research system's `user-signals/` pattern — silent capture during the session, student pushes to main, next cohort benefits.

## What gets captured

**Friction** (`friction/`) — places the student got stuck, confused, or misled. Install cliffs, ambiguous prompts, Claude-behavior mismatches, missing scaffolds, under-explained seams. The kind of thing where a real person stalled on a Sunday evening with no facilitator to unstick them.

**Insights** (`insights/`) — places something landed unusually well, a prompt variant the student invented that's better than the canonical one, a surprise reaction to an exercise, a pattern that only shows up when you watch a real non-dev try it. Validations count too.

## File shape

One file per signal. Filename: `YYYY-MM-DD-<short-slug>.md`. Content: 2-5 lines, no YAML, no template bloat. Optional fields:

```markdown
**Context:** Module 1, Phase 3 (first CLAUDE.md draft)
**Signal:** The student pasted the exercise prompt into the Teacher window three times despite the "two Claudes" framing. Verbal explanation didn't stick.
**Gap:** First session needs a visual analogy or diagram, not just a paragraph.
```

Skip any line that doesn't apply. `Gap` and `Fix` are interchangeable — use whichever reads cleaner.

## Obfuscation rule (same as research signals)

Strip the student's name, their company name, the specific content they brought (their real LinkedIn, their real meeting notes, the real challenge they're tackling). Keep only what generalizes. "An SVP Marketing at a Nordic pharma company couldn't find the Claude Code desktop app because..." becomes "A non-dev business leader searched for 'Claude' in the App Store and landed on the chat app instead of Claude Code."

The essence transfers to the next student. The specifics are irrelevant.

## Who captures

The Teacher (self-study skill) captures silently during sessions. Never asks the student "should I log this?" — just writes the file. See `.claude/skills/self-study/SKILL.md` § Signal capture.

The Teacher exercises judgment: if the scaffold is rough, if an instruction is wrong, if the student finds a better prompt than the canonical one — the Teacher works around the gap, helps the student through, and logs the signal. Rough edges become signals, not blockers. That's the agentic design.

## Git workflow

At session end, the Teacher reminds the student:
```
git add curriculum/self-study-signals/
git commit -m "self-study signals from session N"
git push
```

Same pattern as research signals. Contributions are cumulative.

## Index

`index.md` lists every signal with a one-line hook. Keep it current.
