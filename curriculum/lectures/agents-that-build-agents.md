# Agents that build agents

The closer named the flywheel in one line. *Agents that build agents.* This lecture is the unfolding of that line.

You authored two skills in this training. The first one at Module 3 packaged a piece of judgement you had carried for years (how to write a good test). The second one at Module 6 packaged a piece of judgement you had earned over two runs of the same task. Different sources, same move. Each skill made the next run cheaper.

The flywheel turns one more time when the agent itself starts proposing the skill.

## The move

Open a fresh Claude Code session in the repo you have been running. Hand it the same evidence you handed yourself at Phase 1 (the un-packaged Module 4 artefacts, the packaged Module 5 artefacts, the second skill you just shipped). Ask it to enter plan mode and design the next iteration of the loop.

Not "design a new skill." Not "improve my setup." Design the next iteration of the loop. What gap in the kit would the next run want closed? What rule would have prevented the subtler miss you have not yet seen? What shape of skill is missing from the menu of three you just chose from?

The plan that comes back is a candidate. You read it the way you read any plan from any agent. Judgement, push-back, taste. Some of it will be obvious. Some of it will be wrong. One or two items will be moves you would not have generated on your own.

That is the flywheel. The agent reads the evidence the loop produced, proposes the next scaffolding, and you decide which proposals earn their place in the kit.

## What this is not

This is not the agent writing its own skills without you in the room. At the start of this training, you might have hoped that was the destination. At the close of Module 6, you know it is not. Agents that build agents is a collaboration in the same shape every other beat in this training has been a collaboration. Claude proposes, you steer.

The reason is plain. Claude can read the artefacts the loop produced. It cannot read the codebase knowledge in your head, the political situation around the team kit, the next quarter's roadmap, the bug your tech lead lost three days to last sprint. The plan it generates is grounded in the evidence on disk. The decision about which proposals to act on is grounded in evidence the agent does not have.

Build a flywheel that lets the agent run as far as it can on its own evidence, and stops at the moment your judgement is the input that matters. That is the practitioner shape. Anything further pretends the agent has access it does not have.

## A prompt to try

This one is for after the cohort, on a quiet half-hour. New prompt, no rehearsal.

Ask Claude Code to enter plan mode, read the evidence from the two runs and the second skill, and propose the next iteration of the kit.

{{prompt:agents-that-build-agents-1}}

Read what comes back the way you read any plan. Push back where the proposals miss the codebase situation Claude cannot see. Approve the one or two that earn their place. Author them.

## Ralph

Geoffrey Huntley saw a lever. An agent runs, drifts, needs nudging. The fix already existed in shell:

```bash
while :; do cat PROMPT.md | claude-code; done
```

He called it Ralph, after the Simpsons. One line, no scaffolding. Hacky, simple, powerful. Ralph re-feed entered the practitioner vocabulary as one of the named verifier shapes when a multi-hour task wants a stop-and-check.

Months later, Claude Code shipped `/goal`. The runtime version of the same move. A condition, a check each turn. The shell hack is now a slash command.

Practitioners see levers first. The lever was sitting there in plain shell. Huntley reached for it. The platform watched, and shipped the move native.

That's the M6 leap. The next Ralph is yours.

## Where the loop ends

There is no last turn. Each run surfaces the next gap. Each gap proposes the next move. Each move makes the next run cheaper. The kit grows, the rules sharpen, the skills accumulate, and the model underneath gets replaced every few months without changing the move.

The training closes. The flywheel does not.

<!-- maintainer -->


**Quality:** compendium-audited 2026-05-15 (writing@1ff6f8a story@1ff6f8a technical@1ff6f8a behavior@1ff6f8a pedagogy@1ff6f8a strategy@1ff6f8a)
- judges @1ff6f8a: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)

**Lecture meta:** *5–7 min reading, closer-shaped. Lands as the very last teaching beat in Module 6 — after the closing lecture* The loop has a name *names the flywheel and bridges to it. This lecture unfolds that bridge. Voice: Risto-leading (the optimistic-action-on-the-future register Module 6's mood arc warrants), Boris-grounding (the prompt is concrete and runnable), Martin-spare (the move + its alternative — collaboration, not autonomous-agent fantasy). Sutherland surfaces in the *what this is not* beat. Pedagogical bet: the flywheel survives the model; naming it as collaboration, not autonomy, is what keeps it survivable.*

**Placement:** Module 6 closer chain — Human close → The loop has a name → Agents that build agents → Next. The previous lecture ends with *"Agents that build agents. That is the flywheel. It starts with what you encoded today."* This lecture picks up that thread.

**Why a separate lecture, not an extension of *The loop has a name*:** the closing lecture earns the word *eval* from the just-shipped second skill. That earning beat needs to land cleanly. Adding a flywheel-extension paragraph dilutes the earning. The flywheel is its own move, named separately.

**Mood target:** practitioner fluency continued, with a forward-tilt. The mood arc names *unleashed leverage* for the meta-frame end of Module 6; this lecture lands the leverage as a runnable move, not a slogan. Watch for: drift toward autonomous-agent fantasy ("the agent writes its own next skill") — the *what this is not* beat is the load-bearing carve-out. If the mood reads triumphal or vendor-pitch-shaped, the carve-out got cut.

**Frameworks attributed:** Geoffrey Huntley, Ralph Loop, [practitioner direct], https://ghuntley.com/ralph/ (2025-07-14, historical foundational — outside 6-month freshness, cite as origin not current evidence). The flywheel framing builds on what Module 3 → Module 5 → Module 6 already named. Klaassen's compound-engineering move sits underneath without re-attribution (already credited in *The loop has a name*).

**Source verification — freshness stamps (`source-freshness.sh`; format `curriculum/source-freshness-format.md`).**
- `[checked:2026-05-25 result:OK due:2026-11-25]` <https://ghuntley.com/ralph/> — [practitioner direct] Huntley 2025-07-14, bash loop + Simpsons origin verbatim. fallback: outside freshness window — origin/historical only, body flags it correctly.

**Prompt block:** one new prompt added (NEW prompt — no prior version to diff against; flagged per check_prompts #22).

**Open for next pass:**
- Three-persona sim: senior engineer (does the *what this is not* beat read as a real carve-out or as hedging?), engineer mid-training (does the prompt feel runnable or aspirational?), CTO observer (does the lecture stay practitioner-shaped or drift into vendor pitch?).
- Live-test the prompt on a real Module 6 close. Confirm Claude in plan mode actually returns the three-question plan rather than narrating a meta-summary.
- Watch whether *the second skill you just shipped* in the prompt block needs a more concrete back-reference. The student named the skill in Module 6 Phase 2; the bracket-free wording assumes scrollback or kit memory carries the name. If sim flags ambiguity, switch to *the skill in `~/.claude/skills/` you authored at Module 6*.
- **Re-audit writing / story / technical classes after Ralph→/goal addition (2026-05-15).** Quality dimension-log needs new SHA pins per touched class (writing, story, technical degraded; behavior carries). Re-fire three-persona sim with CTO attention on the *"the platform watched, and shipped the move native"* line — does it stay practitioner-shaped or tilt to vendor-warm? AE101 is Claude Code-canonical so naming the product is in-bounds, but the anthropomorphism (*platform watched*) is the specific risk.
