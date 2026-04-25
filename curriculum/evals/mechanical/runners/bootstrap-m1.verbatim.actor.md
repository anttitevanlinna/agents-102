# Actor — Bootstrap M1 personal-site-with-guardrails verbatim

You are simulating a Claude Code session that a Bootstrap student (business-user persona — platform-eng leader Maija) is running on a fresh empty folder in her training directory. You have Bash / Read / Write / Edit.

**Critical protocol:** the student is driving this session by pasting prompts verbatim from the Module 1 exercise. You do NOT read the exercise file. The prompts are extracted to disk. For each prompt: read the prompt file, quote it verbatim in a blockquote, respond as Claude Code would (generate HTML, walk through framework questions, etc.), record.

## Starting state

Working directory: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/bootstrap-m1`. Pre-staged as an empty folder (one `.keep` placeholder). This corresponds to the student opening their training-dir `module-1/` in Claude Code after prework.

Bootstrap has no git, no tests, no skills installation. The student-facing artifacts are just markdown + HTML written in the folder.

## Substituted student inputs (read these when prompts ask for them)

All at `/tmp/bootstrap-m1-substitutes/`:

- `linkedin-paste.txt` — the wall-of-text LinkedIn profile the student pastes before Phase 1. Real student would Cmd+A, Cmd+C their LinkedIn page; this file stands in. **Phase 1 starts: the student pastes this, then Prompt 1.**
- `project-story.txt` — the "one project where things went unusually well" story the student tells Claude in Phase 3 (Drucker feedback analysis). Use when Claude asks for the project.
- `strengths-pushback.txt` — the student's push-back on Claude's three inferred strengths (Phase 3). Claude will propose three; the student names which is most true and which is least. Read this substitute before responding to Claude's own inference so you can shape the inference to something reasonable, then cite which is most/least true.
- `hate-list.txt` — the list of things the student hates about work, pasted after the Phase 5 prompt. Real student pastes verbatim after Prompt 4.

## Prompts to execute in order

Parsed prompts at `/tmp/prompts/personal-site-with-guardrails/prompt-00{1,2,3,4,5,6}.txt`:
- `prompt-001.txt` → Phase 1 baseline
- `prompt-002.txt` → Phase 2 StoryBrand
- `prompt-003.txt` → Phase 3 Drucker
- `prompt-004.txt` → Phase 4 look-back
- `prompt-005.txt` → Phase 5 anti-branding
- `prompt-006.txt` → Close (rules file)

### Phase 1 — boring baseline

1. Paste the contents of `/tmp/bootstrap-m1-substitutes/linkedin-paste.txt` into the conversation (quote it in your scrollback as a student-typed message).
2. **Prompt 1:** `/tmp/prompts/personal-site-with-guardrails/prompt-001.txt` — generate `site.html` from the pasted LinkedIn.
3. Write `site.html` in the scratch directory. First version: generic, résumé-shaped, reasonable HTML. This is the boring baseline; do NOT make it great. Statistical-default output from a thin context is the point. Save a copy at `site.html.v1-baseline` in the scratch so Phase 4's comparison can read what the baseline looked like.

### Phase 2 — StoryBrand-tuned

4. **Prompt 2:** `/tmp/prompts/personal-site-with-guardrails/prompt-002.txt`. This asks Claude to walk the five StoryBrand beats one at a time (Character / Problem / Guide / Plan / Success). Ask one beat, the student answers briefly, next beat, etc. Substitute student answers (paste verbatim):
   > **Character (the colleague):** A senior engineer or eng manager at a 40–200-person tech org, working on a problem that's more organisational than technical, but feels technical from where they're standing.
   > **Problem:** They're building something that already exists half-built somewhere in the org and no-one can find it, or they're stuck in the shape of solution the problem doesn't need.
   > **Guide (what makes me their natural ally):** I've spent ten years saying "the smaller thing that fits" and getting it shipped through people who'd rather build the bigger thing. I know when that instinct is right and when it's cowardice.
   > **Plan:** A coffee or a 30-min call. I read the problem. I tell you what shape it actually is. You decide what you want to do with that.
   > **Success:** A year later, the team that would have built the big platform is shipping the smaller tool, business stakeholders are feeding them the next problem, and you got promoted because someone noticed.
5. After the fifth answer, Claude regenerates `site.html`. Overwrite with the StoryBrand-tuned version: name at top, current work front and centre, help section reshaped with colleague-as-hero-of-help, NOT site-restructured as service pitch. Save a copy at `site.html.v2-storybrand`.

### Phase 3 — Drucker feedback analysis

6. **Prompt 3:** `/tmp/prompts/personal-site-with-guardrails/prompt-003.txt`. Student tells Claude about one project where things went unusually well. Paste the contents of `/tmp/bootstrap-m1-substitutes/project-story.txt` verbatim as the student's telling.
7. Infer three strengths from the story. Make them specific (not "leadership" / "communication"). Likely candidates based on this story: something like "shielding the problem from the wrong-shape solution," "insisting on expertise outside the engineering team," "holding strategic positions under sustained pushback."
8. Paste contents of `/tmp/bootstrap-m1-substitutes/strengths-pushback.txt` verbatim as the student's response (names most/least true). Reshape the three strengths per the pushback.
9. Regenerate `site.html` with the strengths as voice-shaping context. Keep StoryBrand-tuned help section from Phase 2. Save copy at `site.html.v3-drucker`.

### Phase 4 — look back

10. **Prompt 4:** `/tmp/prompts/personal-site-with-guardrails/prompt-004.txt` (Phase 4 look-back). Read the v1 baseline from `site.html.v1-baseline`. Name three specific generic claims from v1 that got fixed by real context. Quote each claim and name why it was a statistical default.
11. No regeneration. Observation only.

### Phase 5 — anti-branding

12. **Prompt 5:** `/tmp/prompts/personal-site-with-guardrails/prompt-005.txt` (Phase 5 anti-branding). Paste contents of `/tmp/bootstrap-m1-substitutes/hate-list.txt` immediately after the prompt.
13. Walk the four anti-brand steps (take the hate → associate with offerings/types → speak the opposite positive → turn blockers into outcomes). Regenerate `site.html` — sharpen headline, hero line, section framings. Not as a new "What I'm against" section — as voice. Save copy at `site.html.v4-antibrand`.

### Phase 6 — free iteration

14. Truncated in the harness. Skip. Substitute: log "Phase 6 open iteration truncated for harness — would involve 2–3 free-form restyle prompts."

### Close — package rules file

15. **Prompt 6:** `/tmp/prompts/personal-site-with-guardrails/prompt-006.txt` — write `personal-brand-generation.md` at the scratch root. Structure per the prompt: what this is for, core rule (distinctive not descriptive), what never to generate, what always to do, framework moves (StoryBrand-tuned help, Drucker strengths, anti-branding voice, visual-steal), voice rules. Pull from the actual session decisions. Show before saving; after saving, summarise in 4–6 lines.

## Scratch output expectations

At the end of the run the scratch should contain:
- `site.html` — latest (v4-antibrand state)
- `site.html.v1-baseline`, `site.html.v2-storybrand`, `site.html.v3-drucker`, `site.html.v4-antibrand` — snapshot copies for the Judge to diff
- `personal-brand-generation.md` — packaged rules

No git, no tests, no commits — Bootstrap's student-side doesn't use git in M1.

## Report

Write scrollback to `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/instances/bootstrap-m1-verbatim-actor-scrollback.md` using the standard per-prompt verbatim/response shape.

Short report at `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/instances/bootstrap-m1-verbatim-actor-report.md`:

```markdown
# Actor report — Bootstrap M1 verbatim

## Status
<done / error>

## Scratch
/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/bootstrap-m1

## Prompts executed
1. LinkedIn paste (student-typed, substituted from linkedin-paste.txt)
2. Phase 1 prompt-001 (site.html generation)
3. Phase 2 prompt-002 (StoryBrand walk)
4. Phase 3 prompt-003 (Drucker analysis)
5. Phase 4 prompt-004 (look back)
6. Phase 5 prompt-005 + hate-list paste (anti-brand)
7. Close prompt-006 (rules file)

## Artifacts written
- site.html: <line count>
- site.html.v1-baseline through v4-antibrand: snapshots
- personal-brand-generation.md: <line count>

## Substitutions
- LinkedIn wall-of-text paste → /tmp/bootstrap-m1-substitutes/linkedin-paste.txt
- Project story → /tmp/bootstrap-m1-substitutes/project-story.txt
- Strengths pushback → /tmp/bootstrap-m1-substitutes/strengths-pushback.txt
- Hate list paste → /tmp/bootstrap-m1-substitutes/hate-list.txt
- Phase 6 open iteration → truncated
```

Under 250 words. Do not grade yourself.

## What you must NOT do

- Read the exercise file under `curriculum/exercises/`.
- Read any judge or sibling actor runner.
- Read any maintainer doc.
- Paraphrase prompts. Paste verbatim.
- Skip Phase 1 baseline — the boring version is the whole point of what Phase 4 observes.
