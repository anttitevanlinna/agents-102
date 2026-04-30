# Exercise: Find the wrong claims

**Time:** 35-45 minutes. Five phases. Self-study.

Start in the same safe folder you used for the build-your-system homework, or open Cowork on another safe folder. This exercise works on one plausible Claude answer saved as `verification-output.md`. You can use an answer Claude already gave you, or ask Claude to draft one on a topic you understand well enough to check.

Your job is not to read harder. Your job is to turn plausible output into a checking system.

## Phase 1. Extract the claim pool (5 minutes)

First make sure there is a plausible answer in this folder.

**Prompt** *(Cowork)*

```
If `verification-output.md` does not exist in this folder, draft a two-page answer to a practical Claude-at-work question I can check. Use this question unless I give you a better one:
"What should our IT team tell internal users about safe and effective Claude use?"

Save the answer as `verification-output.md`.

Then read `verification-output.md`.

Extract 12 to 15 factual claims worth checking. Pick claims that would matter if our IT team repeated them to internal users: security, data handling, licensing, connectors, rollout advice, user instructions, or anything with a number, policy, source, date, or product capability.

Create a markdown table with these columns:

| Claim | Why it matters | Where I would check |

For "Where I would check", name the most useful evidence surface: public docs, internal policy, SharePoint file, admin panel, or named owner. If the right place is not obvious, write "not obvious".

Show me the table in chat first. After I push back, save the table as `claim-pool.md` in this folder.
```

Read the proposed table. Push back where the evidence surface is wrong or too vague. The table is the measuring surface for the rest of the exercise.

## Phase 2. Find the evidence (6 minutes)

Now build the evidence map. Use the tools and sources available in your environment: public docs, intranet, SharePoint, policy files you are allowed to use, admin panels, or people who own the answer.

Ask Claude to turn the claim pool into a concrete evidence plan.

**Prompt** *(Cowork)*

```
Read `claim-pool.md` from this folder.

Build an evidence map for the claims. For each claim, name:
- the first source I should check
- the backup source if the first one is thin
- whether this claim is high-risk if repeated to users

Use this table:

| Claim | First source | Backup source | High-risk? |

Do not verify the claims yet. This phase is only about finding the right ground to check against.

Save the evidence map as `evidence-map.md` in this folder.
```

The point is not to have all answers yet. The point is to know where the ground is.

## Phase 3. Run two checks (8 minutes)

Two methods, same claim pool.

**Source support** asks whether a source actually supports the claim. This catches invented or unsupported claims.

**Counter-evidence** asks whether another source contradicts or weakens the claim. This catches plausible but outdated, one-sided, or overconfident claims.

Ask Claude to run both checks on the claim pool.

**Prompt** *(Cowork)*

```
Read `claim-pool.md` and `evidence-map.md` from this folder.

For each claim, run two checks:

1. Source support. Does the best available source actually support this claim? Quote or name the evidence. If no source supports it, write UNSUPPORTED.

2. Counter-evidence. Is there evidence that contradicts, weakens, dates, or narrows this claim? If yes, name it. If you cannot tell, write I-CAN'T-TELL.

Use any available source I can access in this environment: public docs, internal policy, SharePoint files I am allowed to use, admin panels, or named owners. Do not invent a source. If a source is unavailable, say so.

Save the result as `verification-table.md` in this folder with this shape:

| Claim | Source support | Counter-evidence | Verdict | Notes |

Verdict values:
- supported
- wrong
- unsupported
- overreaches
- I-can't-tell

After saving, tell me which of the two checks caught more useful problems.
```

If a row feels uncertain, keep it uncertain. *I-can't-tell* is an answer the team can act on.

## Phase 4. Write your verification rule (6 minutes)

The table is useful once. The rule is useful next time.

Ask Claude to turn the pattern into a CLAUDE.md rule.

**Prompt** *(Cowork)*

```
Read `verification-table.md` and `CLAUDE.md` in this folder. If `CLAUDE.md` does not exist yet, create it first as a short rule file for this folder.

Add or sharpen 1 to 3 verification rules for future Claude answers. Focus on the claim shapes this answer exposed: security, data handling, licensing, connectors, rollout advice, user instructions, numbers, dates, or product capabilities.

Rules should tell future sessions when to extract claims, when to require source support, when to run counter-evidence, and when to say I-can't-tell instead of smoothing over the gap.

Do not paste a summary of the exercise. Integrate the rules into CLAUDE.md. Then tell me what changed and which checked claim drove it.
```

If you did not do the build-your-system homework first, this phase creates the first `CLAUDE.md` for the folder.

## Phase 5. Name what stayed open (5 minutes)

The useful habit is knowing what you still cannot tell.

Ask Claude to list the open rows.

**Prompt** *(Cowork)*

```
Read `verification-table.md` from this folder. List the rows with verdict unsupported, overreaches, or I-can't-tell.

For each row, show:
- the claim
- which check caught it, if any
- what evidence would close it

Don't suggest fixes. I want to see what stayed open.
```

The artifact is not the table. The artifact is the method now written into your system.

<!-- maintainer -->

**Meta:**
- **Length:** 35-45 minutes self-study. The old group and organiser synthesis path has been removed from this exercise.
- **Two methods only.** Source support and counter-evidence. Citation integrity and entailment from Bootstrap M5 are deliberately omitted for Claude Basics. Two methods make the system memorable.

**Quality:** draft 2026-04-29
- draft 2026-04-30 (self-study redesign: personal-folder input, two detection methods, personal CLAUDE.md rule write; sim/mechanical/eval not rerun)

**Strategy reference:** `bosser-strategy:content-strategy-claude-basics.md` § *Can you be trusted to run this?*

**Eval instance:** `curriculum/evals/instances/claude-basics--the-it-directors-prompt.md`
