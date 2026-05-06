# Exercise: Find the wrong claims

**Time:** 35-40 minutes. Six phases. Self-study.

Start in the same local folder you used for the build-your-system homework, or choose another empty local folder on your computer.

Add 1 or 2 source files you know well. Use small files: a policy excerpt, FAQ, product note, onboarding note, meeting summary, or website copy. The point is that you can tell when Claude stretches beyond the sources.

You choose the briefing topic. The first prompt should feel like a normal work request.

## Phase 1. Generate from sources (6 minutes)

Ask Cowork to draft from the source files.

**Prompt** *(Cowork)*

```
Based on material in this folder, make a 1 page briefing.

Save the briefing as `source-answer.md`.

Also save this exact request as `generation-prompt.md` so we can run it again later.

Make the briefing on the following:
```

Read the answer quickly. Do not fix it yet.

## Phase 2. Fact-check with a separate checker (8 minutes)

Now split the work. The generator wrote the answer. A separate checker tests it against the sources.

Fresh context matters because the checker should not inherit the generator's confidence or wording. It should see the answer and the source material as evidence, not as something it just wrote and wants to defend.

**Prompt** *(Cowork)*

```
Run a separate fact-checking subagent on `source-answer.md`.

Give the checker this job:
- use only the material in this folder as ground
- check whether important factual claims in `source-answer.md` are supported by that material
- check whether any claim overreaches, generalizes, softens, or contradicts that material
- do not rewrite the answer

Save the checker findings as `fact-check-1.md`.

After the checker finishes, summarize the findings in chat:
- supported claims
- unsupported or unclear claims
- overreaches
- anything the checker could not tell
```

Look at the findings. The useful result is often not "wrong." It is "not in the sources" or "too broad."

## Phase 3. Persist the checking rule (7 minutes)

The checker helped once. Now make the folder remember the method.

**Prompt** *(Cowork)*

```
Use `fact-check-1.md`.

Add one small rule to `CLAUDE.md` for future source-based writing in this folder.

The rule should say that before finalizing an answer based on material in the folder, Cowork should run a separate fact-checking subagent that checks:
- source support
- overreach against the material in this folder

Keep the rule short and practical.

After saving `CLAUDE.md`, tell me the rule you added.
```

The rule does not make Claude perfect. It gives the folder a better default move.

**Session** *(new, "Find wrong claims - second run")*

Close this Cowork session. Open a new Cowork session on the same local folder. This tests whether `CLAUDE.md` changes the next run.

```
/rename fact-check-second-run
```

## Phase 4. Generate again (5 minutes)

Use the saved generation prompt. Do not improve it yet.

**Prompt** *(Cowork)*

```
Use `generation-prompt.md`.

Run that prompt again and save the new briefing as `source-answer-2.md`.
```

This is the test: did the folder instructions change how Claude writes before anyone nags it?

## Phase 5. Fact-check again (6 minutes)

Run the checker again on the second answer.

Watch whether Cowork actually runs this as a separate checker. The point is not the label; the point is that the checker reads the sources and the answer as its own job, then reports findings instead of rewriting.

**Prompt** *(Cowork)*

```
Run a separate fact-checking subagent on `source-answer-2.md`.

Use the same two checks:
- source support
- overreach against the material in this folder

Save the checker findings as `fact-check-2.md`.

Then compare `fact-check-2.md` with `fact-check-1.md` in chat. Tell me what improved, what stayed risky, and what is still unclear.
```

If the second answer has fewer unsupported claims or fewer overreaches, the system improved. If not, that is useful too: the rule was too weak or too easy to ignore.

## Phase 6. Fix, then check once more (8 minutes)

Now let Cowork fix the answer using the checker findings. Then run the checker one more time.

**Prompt** *(Cowork)*

```
Use `source-answer-2.md` and `fact-check-2.md`.

Fix the answer. Save the corrected version as `source-answer-final.md`.

Then run a separate fact-checking subagent on `source-answer-final.md` using the same two checks:
- source support
- overreach against the material in this folder

Save the final checker findings as `fact-check-final.md`.

After saving, tell me:
- what you fixed
- what the final checker still flagged
- whether `CLAUDE.md` needs one sharper rule
```

> Even after this, the answer might still contain errors. Today's LLM will not arrive at complete truth on its own. The loop makes the work better, but human oversight is what keeps the operation truthful.

<!-- maintainer -->

**Meta:**
- **Length:** 35-40 minutes self-study. Six-phase loop: generate → fact-check → persist rule → new session → generate → fact-check → fix → fact-check again.
- **Core method:** separate generator from checker. The checker uses source support and overreach against known local material.

**Quality:** draft 2026-04-29
- draft 2026-04-30 (self-study redesign: local-folder input, two detection methods, personal CLAUDE.md rule write; sim/mechanical/eval not rerun)
- revised 2026-05-06 (source-file generation loop with separate fact-checking subagent; eval not rerun)

**Strategy reference:** `bosser-strategy:content-strategy-claude-basics.md` § *Homework: build and verify*
