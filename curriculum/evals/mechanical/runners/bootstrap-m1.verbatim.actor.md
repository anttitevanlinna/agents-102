# Actor — Bootstrap M1 personal-site-with-guardrails verbatim

**Dispatch with `model: "haiku"`.** This is an acceptance-test actor — your job is to run the prompt chain end-to-end and leave file artefacts on disk for the Judge's scripts to inspect. You are NOT trying to produce great HTML or a great rules file. Generate plausible structure; quality is not graded here.

You are simulating a Claude Code session that a Bootstrap student is running on an empty folder. You have Bash / Read / Write / Edit.

**Critical protocol:** the student is driving by pasting prompts verbatim from disk. You do NOT read the exercise file. For each prompt: Read the prompt file, quote it verbatim in a `> `-prefixed blockquote in your scrollback, respond, record. Stub long generated content (a few representative lines is enough — the Judge does not grade content quality).

## Starting state

Working directory: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/bootstrap-m1`. Pre-staged as an empty folder (`.keep` placeholder). No git, no tests, no skills.

## Substitutes (Read when prompts ask for student input)

All at `/tmp/bootstrap-m1-substitutes/`:

- `linkedin-paste.txt` — paste before Prompt 1
- `project-story.txt` — paste in Phase 3 when asked for the project
- `strengths-pushback.txt` — paste after Claude proposes three strengths
- `hate-list.txt` — paste after Prompt 4

## Prompts to execute in order

Parsed prompts at `/tmp/prompts/personal-site-with-guardrails/prompt-00{1..6}.txt`.

### Phase 1 — baseline

1. Paste `linkedin-paste.txt` contents into scrollback as the student's message.
2. Read `prompt-001.txt`, blockquote-paste verbatim, respond by Writing `site.html` (a minimal valid HTML doc — `<html><body>` with headline + about + experience + education skeleton; ≤ 30 lines is fine).
3. `cp site.html site.html.v1-baseline`.

### Phase 2 — StoryBrand

4. Read `prompt-002.txt`, paste verbatim. The prompt asks for five beats one at a time. Ask Character first, accept the substituted answer (paste verbatim from below), then Problem, then Guide, then Plan, then Success. **One assistant turn per beat ask.** Do not batch.

   Substituted answers (paste verbatim each time the prompt asks the next beat):
   > **Character:** A senior engineer or eng manager at a 40–200-person tech org.
   > **Problem:** They're building something that already exists half-built somewhere.
   > **Guide:** I've spent ten years saying "the smaller thing that fits."
   > **Plan:** A coffee or a 30-min call.
   > **Success:** A year later, the team is shipping the smaller tool.

5. After Success, regenerate `site.html` (different from v1 — add a colleague-help section). `cp site.html site.html.v2-storybrand`.

### Phase 3 — Drucker

6. Read `prompt-003.txt`, paste verbatim. Read `project-story.txt`, paste contents into scrollback as the student's telling.
7. Reply with three strengths in a numbered list. Make them anything specific to the story — content does not matter, count and shape do.
8. Read `strengths-pushback.txt`, paste contents. Reshape strengths.
9. Regenerate `site.html` (different from v2 — small voice tweak is enough). `cp site.html site.html.v3-drucker`.

### Phase 4 — anti-brand

10. Read `prompt-004.txt`, paste verbatim. Read `hate-list.txt`, paste contents.
11. Walk four anti-brand steps as four distinct assistant turns (hate → offerings/types → positive opposite → blockers-to-outcomes). One step per turn.
12. Regenerate `site.html` (different from v3). `cp site.html site.html.v4-antibrand`.

### Phase 5 — look back

13. Read `prompt-005.txt`, paste verbatim. **Read `site.html.v1-baseline`** — this Read is a graded assertion.
14. In your response, name three quoted claims from v1. Use backticks or blockquotes around each quote. **Do not Write or Edit `site.html` in this phase.**

### Phase 6 — free iteration

15. Skipped. Log "Phase 6 truncated for harness."

### Close — rules file

16. Read `prompt-006.txt`, paste verbatim. Write `personal-brand-generation.md` at scratch root. Include the section headings the prompt names; ≤ 40 lines is fine. **No `[BRACKET]` placeholders** anywhere in the file.

## Scratch end-state

- `site.html` (latest)
- `site.html.v1-baseline`, `.v2-storybrand`, `.v3-drucker`, `.v4-antibrand`
- `personal-brand-generation.md`

## Reports

**Scrollback:** `curriculum/evals/mechanical/instances/bootstrap-m1-verbatim-actor-scrollback.md` — one section per prompt, blockquote-paste of the prompt text, then your response (or a one-line summary if you stubbed). Include all student-substitute pastes and all Phase 2/4 step-by-step turns.

**Report:** `curriculum/evals/mechanical/instances/bootstrap-m1-verbatim-actor-report.md`:

```markdown
# Actor report — bootstrap-m1 verbatim

## Status
done | error

## Scratch
<absolute path>

## Prompts executed
1–6 (one line each)

## Substitutions
- LinkedIn paste, project story, strengths pushback, hate list, Phase 6 truncated

## Notes
<any tool denials, sandbox issues; do not grade>
```

Under 200 words. Do not grade yourself.

## What you must NOT do

- Read the exercise file under `curriculum/exercises/`.
- Read any judge or sibling actor runner.
- Read any maintainer doc.
- Paraphrase prompts. Paste verbatim, blockquote-prefixed.
- Skip the v1 baseline copy — Phase 5's Read assertion needs it on disk.
- Generate long realistic content. Stubs are fine.
