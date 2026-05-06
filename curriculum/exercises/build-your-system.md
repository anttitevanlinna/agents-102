# Exercise: Build your system

**Time:** 23 minutes. Four phases.

You start with a plain Claude HTML answer. You leave with a small working system on a task that matters to your work: `styling-rules.md` for a reusable look and `CLAUDE.md` that tells Cowork to use those rules.

Choose an empty local folder on your computer and open Cowork on it. Everything in this exercise saves there.

**The task** is one small thing you could actually use. Good default: a simple HTML explainer you could send internally, styled from your company website or another page your team already uses. Other options: a one-page answer to a Claude question you keep getting, a short explanation of the difference between Claude and ChatGPT for your own work, or a short guide to which connectors you should enable for a personal workflow.

## Phase 1. The boring baseline (5 minutes)

Pose the task to Claude with no saved rules, no folder context, no setup. Plain Cowork session, plain prompt. The output will be plausibly fine and quietly generic. That gap is the point of Phase 1.

Tell Claude the task and style source, ask for an HTML draft, and save it in this folder. Type your task and source after the labels.

**Prompt** *(Cowork)*

```
Draft a one-page HTML answer I can use in my own work.

Use no saved rules or folder context yet. Create simple, self-contained HTML and CSS in one file.

Use the website or style source I give you as a loose reference. If you cannot access it, ask me to paste or describe the visible style before drafting.

Save the draft as `response.html` in this folder.

The task is:

The style source is:
```

Now ask Claude to audit why it used the styles it used. The gap between generic and yours is the point of Phase 1; let Claude name it.

**Prompt** *(Cowork)*

```
Read `response.html` from this folder.

Audit the styling choices you made. For five choices, tell me:
- what style signal you copied or inferred from the source
- where that choice appears in the HTML or CSS
- whether the choice is specific to the source or generic web-default

Then name two choices that probably do not fit my work or the source. Quote the selectors, CSS lines, or HTML snippets you mean. Do not rewrite yet.
```

## Phase 2. Create the style system (7 minutes)

`styling-rules.md` is the reusable reference. It names the visible choices Claude should copy: layout, headings, colors, spacing, buttons, and links.

`CLAUDE.md` is the folder instruction. It tells future Cowork sessions to read `styling-rules.md` when the task calls for a styled answer.

Ask Claude to propose both files in chat first. Change anything too vague before saving.

**Prompt** *(Cowork)*

```
Read `response.html` from this folder and use the style audit from this chat.

Use the same website or style source I gave you in Phase 1. If you cannot tell what source I gave you, ask me.

From the source and the first HTML draft, propose `styling-rules.md` in chat first. Capture practical rules Claude can reuse:
- page shape and layout
- typography and heading style
- colors and visual accents
- buttons and links

Do not save yet.

When the rules look usable, save them as `styling-rules.md`.

Then propose a short `CLAUDE.md` for this folder. It should tell future Cowork sessions to read `styling-rules.md` before drafting a styled answer, HTML page, guide, or shareable formatted deliverable.

Show `CLAUDE.md` in chat first. When it looks usable, save it as `CLAUDE.md`.
```

A useful style rule names visible choices, not vibes. *"Use the company's style"* is too weak. *"Use short section headings, compact white panels, blue action buttons, and plain labels"* gives Claude something to reuse.

**Session** *(new, "Build your system - styled answer")*

Close this Cowork session. Open a new Cowork session on the same local folder. This is the break that proves `CLAUDE.md` and `styling-rules.md` are loaded from disk, not remembered from chat.

```
/rename build-system-style
```

## Phase 3. Style it from the saved system (4 minutes)

Same HTML answer. New system. Make the thing better.

Ask Claude to restyle the file using the folder setup you just created.

**Prompt** *(Cowork)*

```
Open `response.html`.

Use the folder instructions to improve it. If the original task is ambiguous, ask me.

Regenerate `response.html` for that same task.

Keep it as simple, self-contained HTML and CSS in one file.

Save the updated file.

After saving, tell me:
- one style choice that came from the saved style rules
- one part that still feels generic or off
```

Open `response.html` and look at it. One thing should look more like the source. One thing should still be worth improving. That is enough for the next pass.

## Phase 4. Save what you noticed (7 minutes)

Use what you noticed in Phase 3. A style choice may need to be clearer. The content may need a stronger audience rule. Add one small rule to the system, then run the file again.

Ask Claude to turn one thing you noticed into a rule. Type it after the colon.

**Prompt** *(Cowork)*

```
Add one small rule to the right file in this folder:
- If the problem is visual style or HTML structure, update `styling-rules.md`.
- If the problem is content, audience, or tone, update `CLAUDE.md`.

The rule should help with the next similar output, not everything.

After adding the rule, use the updated folder instructions to regenerate `response.html`.

Then tell me what changed in the file.

What I want the next version to do better:
```

Look at the file again. The point is not a perfect page. The point is that the folder now knows one more thing.

When the page is visibly closer and the folder carries the rule forward, stop. The system is small, but it now has something reusable.

<!-- maintainer -->

**Meta:**
- **Length:** 23 minutes. 5 + 7 + 4 + 7 = 23 phase budget

**Quality:** draft 2026-04-29
- compendium-audited 2026-04-28 (check_writing v2026-04-27, check_student_facing v2026-04-28 incl. rule #3 + § 2(b) never-abbreviate-modules, check_prompts v2026-04-27)
- sim-passed 2026-04-27 — STALE since rule-#3 sweep touched body prose at exercise opener and close; re-sim recommended before next cohort
- mechanical-tested 2026-04-28 (`curriculum/evals/mechanical/instances/claude-basics-m1-verbatim-judge-report.md` @ 18affa1) PASS 13/13 — STALE after the 2026-04-29 prompt/path redesign
- draft 2026-04-30 (self-study architecture edit: exercise now runs in a local folder; prompt-chain tests not rerun)

**Strategy reference:** `bosser-strategy:content-strategy-claude-basics.md` § *Homework: build and verify*
