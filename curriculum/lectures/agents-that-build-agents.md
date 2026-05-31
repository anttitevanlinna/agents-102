# Agents that build agents

The closer named the flywheel in one line. *Agents that build agents.* This lecture is the unfolding of that line.

You authored two skills in this training. The first one at Module 3 packaged a piece of judgement you had carried for years (how to write a good test). The second one at Module 6 packaged a piece of judgement you had earned over two runs of the same task. Different sources, same move. Each skill made the next run cheaper.

The flywheel turns one more time when the agent writes the prompt that builds the next skills.

## The move

You authored one skill from one task's evidence. The flywheel turns once more when you hand the agent the move itself and ask it to write you the prompt that builds the rest.

Not "write me a skill." Not "improve my setup." Ask it for a handoff prompt: one you paste into a fresh session later, that studies your work across your repos for the shapes you repeat, draws the ones worth packaging, and authors a skill for each. The same move you just practiced, widened to everything you do.

What comes back is a candidate. You read it the way you read any prompt the agent drafts. Judgement, push-back, taste. Some of it will be obvious. Some of it will be off. One or two lines will be moves you would not have written on your own.

That is the flywheel. The agent writes the prompt that builds the next skills, and you decide whether it earns a place in your kit before you ever run it.

## What this is not

This is not the agent writing its own skills without you in the room. At the start of this training, you might have hoped that was the destination. At the close of Module 6, you know it is not. Agents that build agents is a collaboration in the same shape every other beat in this training has been a collaboration. Claude proposes, you steer.

The reason is plain. Claude can read the artefacts the loop produced. It cannot read the codebase knowledge in your head, the political situation around the team kit, the next quarter's roadmap, the bug your tech lead lost three days to last sprint. The plan it generates is grounded in the evidence on disk. The decision about which proposals to act on is grounded in evidence the agent does not have.

Build a flywheel that lets the agent run as far as it can on its own evidence, and stops at the moment your judgement is the input that matters. That is the practitioner shape. Anything further pretends the agent has access it does not have.

## A prompt to try

This one closes the module. The shapes you drew and the skill you shipped are still in the session. Ask the agent to turn them into a prompt that builds the rest of the kit.

{{prompt:agents-that-build-agents-handoff}}

What comes back is a prompt, not a plan. Read it the way you read any prompt the agent drafts. Save it where you will find it. The kit you grow on your own is the one that counts.

## Ralph

Geoffrey Huntley saw a lever. An agent runs, drifts, needs nudging. The fix already existed in shell:

```bash
while :; do cat PROMPT.md | claude-code; done
```

He called it Ralph, after the Simpsons. One line, no scaffolding. Hacky, simple, powerful. Ralph re-feed entered the practitioner vocabulary as one of the named verifier shapes when a multi-hour task wants a stop-and-check.

Months later, Claude Code shipped `/goal`. The runtime version of the same move. A condition, a check each turn. The shell hack is now a slash command.

Practitioners see levers first. The lever was sitting there in plain shell. Huntley reached for it. The runtime caught up later.

That's the M6 leap. The next Ralph is yours.

## Where the loop ends

There is no last turn. Each run surfaces the next gap. Each gap proposes the next move. Each move makes the next run cheaper. The kit grows, the rules sharpen, the skills accumulate, and the model underneath gets replaced every few months without changing the move.

The training closes. The flywheel does not.

<!-- maintainer -->


**Quality:** compendium-audited 2026-05-31 (writing@182969a story@182969a technical@6ab470b behavior@6ab470b pedagogy@182969a strategy@182969a)
- judges @182969a: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)
- sim-passed 2026-05-31 (three-persona sim + handoff-generator live-test @182969a): generated handoff is cold-safe — named shapes carried, on-disk `session-shaper` referenced as the worked example, repos re-studied, no placeholders. Sim-grade (constructed M6 context); a real-cohort live-test on an actual M6 close is still owed — no cohort has run it yet. Per-class instances at `curriculum/evals/instances/ae101--agents-that-build-agents.<class>.json`.

**Lecture meta:** *5–7 min reading, closer-shaped. Lands as the very last teaching beat in Module 6 — after the closing lecture* The loop has a name *names the flywheel and bridges to it. This lecture unfolds that bridge. Voice: Risto-leading (the optimistic-action-on-the-future register Module 6's mood arc warrants), Boris-grounding (the prompt is concrete and runnable), Martin-spare (the move + its alternative — collaboration, not autonomous-agent fantasy). Sutherland surfaces in the *what this is not* beat. Pedagogical bet: the flywheel survives the model; naming it as collaboration, not autonomy, is what keeps it survivable.*

**Placement:** Module 6 closer chain — Human close → The loop has a name → Agents that build agents → Next. The previous lecture ends with *"Agents that build agents. That is the flywheel. It starts with what you encoded today."* This lecture picks up that thread.

**Why a separate lecture, not an extension of *The loop has a name*:** the closing lecture earns the word *eval* from the just-shipped second skill. That earning beat needs to land cleanly. Adding a flywheel-extension paragraph dilutes the earning. The flywheel is its own move, named separately.

**Mood target:** practitioner fluency continued, with a forward-tilt. The mood arc names *unleashed leverage* for the meta-frame end of Module 6; this lecture lands the leverage as a runnable move, not a slogan. Watch for: drift toward autonomous-agent fantasy ("the agent writes its own next skill") — the *what this is not* beat is the load-bearing carve-out. If the mood reads triumphal or vendor-pitch-shaped, the carve-out got cut.

**Frameworks attributed:** Geoffrey Huntley, Ralph Loop, [practitioner direct], https://ghuntley.com/ralph/ (2025-07-14, historical foundational — outside 6-month freshness, cite as origin not current evidence). The flywheel framing builds on what Module 3 → Module 5 → Module 6 already named. Klaassen's compound-engineering move sits underneath without re-attribution (already credited in *The loop has a name*).

**Source verification — freshness stamps (`source-freshness.sh`; format `curriculum/source-freshness-format.md`).**
- `[checked:2026-05-25 result:OK due:2026-11-25]` <https://ghuntley.com/ralph/> — [practitioner direct] Huntley 2025-07-14, bash loop + Simpsons origin verbatim. fallback: outside freshness window — origin/historical only, body flags it correctly.

**Prompt block:** `agents-that-build-agents-1` (design-the-next-kit plan, plan-mode) retired and replaced by `agents-that-build-agents-handoff` — the agent reads the shipped `session-shaper` and writes the student a standalone, cold-runnable prompt that builds workflow skills across their whole stack (study then diagram then author). NEW prompt — no prior version to diff against; flagged per check_prompts #22.

**Open for next pass:**
- [technical, non-blocking] Stamp the verified `/goal` capability (Claude Code 2.1.142, `/goal [condition|clear]`) into this lecture's own Source-verification block — currently evidenced only in a scratch sweep, not in-artifact.
- Real-cohort gold standard: the handoff-generator live-test that cleared pedagogy was sim-grade — constructed M6 context (six named shapes, a stand-in `session-shaper`). A live-test on an actual student's M6 close (their real shapes, their just-shipped skill) is the real-cohort bar; owed until a cohort runs.
