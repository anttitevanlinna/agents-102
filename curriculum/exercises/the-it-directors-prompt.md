# Exercise: Find the wrong claims

**Time:** 27 minutes of participant work. Five phases. Phase 5 runs after the organisers complete their separate synthesis exercise.

The organisers prepared a two-page output before the workshop. It lives at `shared/m2-verification-output.md`. It looks useful. It contains about fifty factual claims. Some are wrong. Some are unsupported. Some cannot be checked from the room.

Your job is not to read harder. Your job is to turn plausible output into a checking system.

## Phase 1. Extract the claim pool (5 minutes)

Ask Claude to read the shared output and extract the claims worth checking.

**Prompt** *(Cowork)*

```
Read `shared/m2-verification-output.md`.

Extract 12 to 15 factual claims worth checking. Pick claims that would matter if our IT team repeated them to internal users: security, data handling, licensing, connectors, rollout advice, user instructions, or anything with a number, policy, source, date, or product capability.

Create a markdown table with these columns:

| Claim | Why it matters | Where I would check |

For "Where I would check", name the most useful evidence surface: public docs, internal policy, SharePoint file, admin panel, or named owner. If the right place is not obvious, write "not obvious".

Show me the table in chat first. After I push back, ask me for my participant folder under `participants/` if you do not already know it. Then save the table as `claim-pool.md` in that folder.
```

Read the proposed table. Push back where the evidence surface is wrong or too vague. The table is the measuring surface for the rest of the exercise.

## Phase 2. Find the evidence (6 minutes)

Now build the evidence map. Use the tools and sources available in your environment: public docs, intranet, SharePoint, policy files in `shared/`, admin panels, or people who own the answer.

Ask Claude to turn the claim pool into a concrete evidence plan.

**Prompt** *(Cowork)*

```
Read `claim-pool.md` in my participant folder.

Build an evidence map for the claims. For each claim, name:
- the first source I should check
- the backup source if the first one is thin
- whether this claim is high-risk if repeated to users

Use this table:

| Claim | First source | Backup source | High-risk? |

Do not verify the claims yet. This phase is only about finding the right ground to check against.

Save the evidence map as `evidence-map.md` in my participant folder.
```

The point is not to have all answers yet. The point is to know where the ground is.

## Phase 3. Run two checks (8 minutes)

Two methods, same claim pool.

**Source support** asks whether a source actually supports the claim. This catches invented or unsupported claims.

**Counter-evidence** asks whether another source contradicts or weakens the claim. This catches plausible but outdated, one-sided, or overconfident claims.

Ask Claude to run both checks on the claim pool.

**Prompt** *(Cowork)*

```
Read `claim-pool.md` and `evidence-map.md` in my participant folder.

For each claim, run two checks:

1. Source support. Does the best available source actually support this claim? Quote or name the evidence. If no source supports it, write UNSUPPORTED.

2. Counter-evidence. Is there evidence that contradicts, weakens, dates, or narrows this claim? If yes, name it. If you cannot tell, write I-CAN'T-TELL.

Use any available source I can access in this environment: public docs, internal policy, SharePoint files, admin panels, or named owners. Do not invent a source. If a source is unavailable, say so.

Save the result as `verification-table.md` in my participant folder with this shape:

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

## Phase 4. Save the group result (4 minutes)

Each group produces one short file for the organisers to read. Pick one driver in the group. The driver asks Claude to combine the group's findings and writes the group output to `shared/`.

Ask Claude to write the group result.

**Prompt** *(Cowork, group driver)*

```
Create our group's verification result for the organisers.

Use my `verification-table.md` plus the findings my group gives me in chat. Ask me to paste or summarize the other group members' top findings before you write.

Write a short markdown file with:
- top wrong or unsupported claims we found
- top I-can't-tell claims
- the most useful evidence source we found
- which method caught more useful problems: source support or counter-evidence
- one proposed rule for future Claude answers

Ask me for our group number if you do not already know it. If I say group 2, save the file as `shared/group-2-verification.md`. Use the same pattern for the group number I give you.
```

The filename should look like `shared/group-1-verification.md`, `shared/group-2-verification.md`, or `shared/group-3-verification.md`.

## Phase 5. Personal rule from synthesis (4 minutes)

After the organisers' synthesis is visible in `shared/m2-verification-synthesis.md`, update your personal `CLAUDE.md` with one to three rules.

Ask Claude to turn the synthesis into personal operating rules.

**Prompt** *(Cowork)*

```
Read `shared/m2-verification-synthesis.md`, then read the `CLAUDE.md` in my participant folder.

Add or sharpen 1 to 3 verification rules for future Claude answers. Focus on the claim shapes this team just saw fail: security, data handling, licensing, connectors, rollout advice, user instructions, numbers, dates, or product capabilities.

Rules should tell future sessions when to extract claims, when to require source support, when to run counter-evidence, and when to say I-can't-tell instead of smoothing over the gap.

Do not paste a summary of the exercise. Integrate the rules into CLAUDE.md. Then tell me what changed and which group finding drove it.
```

The artifact is not the table. The artifact is the method now written into your system.

<!-- maintainer -->

**Meta:**
- **Length:** 27 minutes participant work. 5 + 6 + 8 + 4 = 23 before synthesis, then 4 minutes personal rule-write after the separate synthesis exercise. Module budget 45 min: 3 Connections + 6 mini-lecture + 23 group work + 4 synthesis + 4 personal rule-write + 5 Debrief/Bridge.
- **Two methods only.** Source support and counter-evidence. Citation integrity and entailment from Bootstrap M5 are deliberately omitted for Claude Basics. Two methods make the system memorable.

**Quality:** draft 2026-04-29
- draft 2026-04-29 (remote-resilient redesign: pre-staged claim-rich input, two detection methods, group outputs, organiser-only synthesis split out; sim/mechanical/eval not rerun)

**Strategy reference:** `bosser-strategy:content-strategy-claude-basics.md` § *Can you be trusted to run this?*

**Eval instance:** `curriculum/evals/instances/claude-basics--the-it-directors-prompt.md`
