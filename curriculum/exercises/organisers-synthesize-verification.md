# Exercise: Organisers synthesize verification

**Time:** 4 minutes. Organisers only.

This exercise happens while the participant groups have saved their verification files to `shared/`. It is not a participant prompt. The job is to turn group findings and the private answer key into one team synthesis.

## Phase 1. Read across the group files

Ask Claude to synthesize the group outputs.

**Prompt** *(Cowork, organisers only)*

```
Read the group verification files in `shared/`.

Use the group files plus the private answer key I provide in chat. Do not invent answer-key details. If I do not provide the answer key, synthesize only what the group files support.

Create a concise team synthesis with:
- wrong claims multiple groups caught
- unsupported or I-can't-tell claims that stayed open
- evidence sources that mattered
- which method caught useful misses: source support or counter-evidence
- one team verification rule to carry forward

Show me the synthesis in chat first. Don't save yet. I will correct anything that conflicts with the private answer key.

After I approve it, save it as `shared/m2-verification-synthesis.md`.
```

Use the private answer key only inside the customer's environment. Do not paste customer material into Bosser tooling.

## Phase 2. Name the carry-forward rule

After the file is saved, tell the room the one rule that should survive the exercise. Keep it short. Participants use that rule in their personal `CLAUDE.md` update.

<!-- maintainer -->

**Meta (organisers):**
- **Length:** 4 minutes
- **Audience:** organisers only. This file is a runbook for the synthesis operator, not a participant exercise
- **Inputs:** `shared/group-*-verification.md` and the organisers' private answer key
- **Output:** `shared/m2-verification-synthesis.md`
- **Privacy:** answer key and customer material stay inside the customer Cowork/SharePoint environment

**Quality:** draft 2026-04-29
- draft 2026-04-29 (split from M2 participant exercise; sim/mechanical/eval not rerun)

**Strategy reference:** `bosser-strategy:content-strategy-claude-basics.md` § *Can you be trusted to run this?*
