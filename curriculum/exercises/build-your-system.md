# Exercise: Build your system

**Time:** 26 minutes. Five phases.

You start with a plain Claude HTML answer. You leave with a small working system on a task that matters to your work: `styling-rules.md` for a reusable look and `CLAUDE.md` that tells Cowork to use those rules.

Choose an empty local folder on your computer and open Cowork on it. Everything in this exercise saves there.

**The task** is one small thing you could actually use. Good default: a simple HTML explainer you could send internally. Other options: a one-page answer to a Claude question you keep getting, a short explanation of the difference between Claude and ChatGPT for your own work, or a short guide to which connectors you should enable for a personal workflow.

**Session** *(new, "Build your system - baseline")*

## Phase 0. Add base material (3 minutes)

Add one or two base materials to the folder. Use content that helps Claude answer the task, not style references yet.

Most formats are fine: PDF, Word, text, markdown, or a copied note. Use whatever is easiest to get into the folder.

Good base materials:

- a policy, FAQ, internal note, or pasted text file that the answer should draw from
- a short note you write yourself, such as `source-notes.md`, with the facts, audience, and purpose of the answer

## Phase 1. The boring baseline (5 minutes)

Pose the task to Claude with base material, but no saved rules, no style source, and no folder instructions. Plain Cowork session, plain prompt. The output will be plausibly fine and quietly generic. That gap is the point of Phase 1.

Tell Claude the task, ask for an HTML draft, and save it in this folder. Type your task after the label.

**Prompt** *(Cowork)*

```
Draft a one-page HTML answer I can use in my own work.

First read the base materials in this folder. Use them as the source material for the answer.

Use no saved rules or style source yet. Create simple, self-contained HTML and CSS in one file.

Save the draft as `response.html` in this folder.

The task is:
```

Now ask Claude to audit why it used the styles it used. The gap between generic and yours is the point of Phase 1; let Claude name it.

**Prompt** *(Cowork)*

```
Audit the styling choices you made. For five choices, tell me:
- what default or assumption shaped the choice
- where that choice appears in the HTML or CSS
- whether the choice is specific to my task or generic web-default
```

## Phase 2. Create the style system (7 minutes)

`styling-rules.md` is the reusable reference. It names the visible choices Claude should copy: layout, headings, colors, spacing, buttons, and links.

`CLAUDE.md` is the folder instruction. It tells future Cowork sessions to read `styling-rules.md` when the task calls for a styled answer.

Ask Claude to create both files.

**Prompt** *(Cowork)*

```
Use the style audit from this chat.

Use the website or style source I give you below. If you cannot access it, ask me to paste or describe the visible style before drafting the rules.

From the source and the first HTML draft, propose `styling-rules.md` in chat first. Capture practical rules Claude can reuse:
- page shape and layout
- typography and heading style
- colors and visual accents
- buttons and links

Save the rules as `styling-rules.md`.

Then propose a short `CLAUDE.md` for this folder. It should tell future Cowork sessions to read `styling-rules.md` before drafting a styled answer, HTML page, guide, or shareable formatted deliverable.

Save it as `CLAUDE.md`.

The style source is:
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
Regenerate the HTML in `response.html`.

Read the base materials again and use the folder instructions.

Keep it as simple, self-contained HTML and CSS in one file. Save the updated file.

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

After adding the rule, read the base materials again and use the updated folder instructions to regenerate `response.html`.

Then tell me what changed in the file.

What I want the next version to do better:
```

Look at the file again. The point is not a perfect page. The point is that the folder now knows one more thing.

When the page is visibly closer and the folder carries the rule forward, stop. The system is small, but it now has something reusable.

## Style Is Just One Aspect

This exercise used style because visual differences are easy to see. The same pattern works for any output quality you need to steer.

You can create rules for audience, tone, evidence, source use, decision criteria, formatting, review steps, or what Claude should never assume. The move is the same: notice what is off, write the rule where future sessions can read it, then run the task again.

Steer what you need to steer.

<!-- maintainer -->

**Meta:**
- **Length:** 26 minutes. 3 + 5 + 7 + 4 + 7 = 26 phase budget

**Quality:** draft 2026-04-29
- compendium-audited 2026-04-28 (check_writing v2026-04-27, check_student_facing v2026-04-28 incl. rule #3 + § 2(b) never-abbreviate-modules, check_prompts v2026-04-27)
- sim-passed 2026-04-27 — STALE since rule-#3 sweep touched body prose at exercise opener and close; re-sim recommended before next cohort
- mechanical-tested 2026-04-28 (`curriculum/evals/mechanical/instances/claude-basics-m1-verbatim-judge-report.md` @ 18affa1) PASS 13/13 — STALE after the 2026-04-29 prompt/path redesign
- draft 2026-04-30 (self-study architecture edit: exercise now runs in a local folder; prompt-chain tests not rerun)

**Strategy reference:** `bosser-strategy:content-strategy-claude-basics.md` § *Homework: build and verify*
