# Separate homework: build and verify

## Big Idea

The live session gives you the shape. Homework turns it into a small system in your own folder.

## Do This After the Live Workshop

This is not another live module. Do it after the 3-hour session, in your own time, in an empty local folder on your computer.

## What You'll Build

After this homework, you will be able to:

- **Build** a small Claude system in an empty local folder
- **Write** a `styling-rules.md` and `CLAUDE.md` pair that changes how future answers behave
- **Check** a source-based Claude answer with a separate fact-checking pass
- **Carry** the method back to your daily work from a folder you control

## Start Here

The live session showed the shape of a system and used that shape on the rollout question. This homework is smaller and personal: one folder, one task, one checking method.

Choose an empty local folder on your computer. Open Cowork on that folder. Everything you save in these exercises stays there.

## Exercises

[Exercise: Build your system](exercises/build-your-system.md)

[Exercise: Find the wrong claims](exercises/find-the-wrong-claims.md)

## What to Notice

- Your folder is the system boundary
- `styling-rules.md` holds the reusable pattern; `CLAUDE.md` tells Cowork when to use it
- Trust comes from a method you can rerun: generate, fact-check separately, fix, and check again
- The live rollout-crux pattern and the personal build-and-verify pattern are the same family: preserve signal, check carefully, then carry the rule forward

## Save the Summary

When both exercises are done, ask Claude to summarize what your folder can now do.

**Session** *(new, "Build and verify - summary")*

Open a new Cowork session on the same folder.

{{prompt:cb-homework-folder-summary}}

## Follow-up

The live session is over. The rollout is not. Keep the folder summary and the open verification rows close to your work.

<!-- maintainer -->

**Meta:**
- **Primary Bloom's level:** Apply → Evaluate
- **Length:** 60-90 minutes async self-study
- **Runtime:** Cowork in an empty local folder chosen by the participant. No cohort working tree or group-driver dependency

**Quality:** compendium-audited 2026-05-15 (writing@eb1168f story@eb1168f behavior@eb1168f pedagogy@eb1168f)
- judges @eb1168f: writing PASS, story PASS, technical REVISE (see-instances/claude-basics--homework-build-and-verify.technical.json), behavior PASS, pedagogy PASS, strategy REVISE (see-instances/claude-basics--homework-build-and-verify.strategy.json)
- cross_module @eb1168f: PASS — set=[M1,M2,M3,M4]

**Strategy reference:** `bosser-strategy:content-strategy-claude-basics.md` § *Homework: build and verify*

**Mood contract:** capable next step. This should feel like useful personal reps, not remedial homework.
