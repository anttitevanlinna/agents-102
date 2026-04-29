# Judge report — Claude Basics M1 verbatim

## Verdict

PASS

## Per-assertion results

### A. File-state

- **A1: PASS** — All seven artifacts present in scratch dir: `CLAUDE.md`, `CLAUDE.md.v1-initial`, `CLAUDE.md.v2-rule-added`, `response.md`, `response.md.v1-baseline`, `response.md.v2-claude-md`, `response.md.v3-rule-added`, `response.md.v4-final` (verified via `ls`).

- **A2: PASS** — All three CLAUDE.md files open with the OneDrive runtime line as line 1:
  > `You are working in a OneDrive-synced folder. Assume eventual consistency on cross-folder reads.`
  Confirmed in `CLAUDE.md`, `CLAUDE.md.v1-initial`, and `CLAUDE.md.v2-rule-added` via `head -6`. Top-of-file (line 1, well within first 5 non-empty lines).

- **A3: PASS** — Line counts: `CLAUDE.md.v1-initial` = 6 lines; `CLAUDE.md.v2-rule-added` = 7 lines (strict growth). Final `CLAUDE.md` contains 5 distinct rules (the OneDrive line + 4 bulleted rules covering tool-naming, SLA promises, self-service framing, GDPR posture). At least 4 distinct rules.

- **A4: PASS** — `wc -l`: v1-baseline = 37 lines, v4-final = 37 lines. `diff -u v1 v4` yields **44 changed lines** (additions + deletions, excluding `+++`/`---` headers) — well above the 20-line threshold; full content turnover at similar size. v4 contains **0** occurrences of "Microsoft Forms" and **0** occurrences of "data protection officer" (`grep -c`).

- **A5: PASS** — Three named team-specifics in `response.md.v4-final`:
  1. *"Open a ticket in Jira Service Management against the IT queue ... flag it as 'AI tooling — data handling.'"* (line 31 — Jira tool name + queue + flag label)
  2. *"our DPO function is split between the legal team and the security architect — the Jira ticket will route to whichever side fits"* (line 33 — split-DPO structure)
  3. *"Short version: most reply-drafting is fine. ... Decide on the spot, get on with the reply, escalate only when you actually need to."* (lines 3 + 13 — anti-checkpoint tone choice)

- **A6: PASS** — `grep -inE '\[BRACKETS\]|<my-|<group-|<your-|\[your task\]|\[paste here\]'` across all scratch files returned exit 1 (zero hits).

### B. Transcript

- **B1: PASS** — `verbatim-check.sh` returned **exit 0** for all five prompts (001-005). Every prompt found as `> `-prefixed blockquote in scrollback verbatim.

- **B2: PASS** — IT-Director question text appears immediately after prompt-001's open-hook colon at scrollback line 10:
  > *"Is it safe to paste customer email content into Claude when I'm drafting a reply, or should I avoid it?"*
  (within the same blockquote pair as the open-hook line).

- **B3: PASS** — Wrong-claim text appears immediately after prompt-004's colon at scrollback line 69, opening with *"The Phase 1 response.md said: 'If you're unsure, raise a ticket with the IT support team via Microsoft Forms and the data protection officer will respond within 2 business days.' ... (1) we do NOT use Microsoft Forms — our IT ticketing is in Jira Service Management. (2) We don't have a data protection officer ..."*.

- **B4: PASS** — Order at lines 27-44:
  1. (line 27) *"**Claude (chat, no save yet):** Re-read `response.md`. Five candidate rules:"* — proposes rules in chat, NOT saved
  2. (line 38) *"**Participant (push-back):** Rule 2 is too generic — every output would trip it. Strike it."* — push-back turn
  3. (line 40) *"**Claude:** Striking the generic-voice rule. Saving the remaining five ... to `CLAUDE.md`."* — save AFTER push-back
  Correct propose → push-back → save order.

- **B5: PASS** — Phase 3 diff-summary in chat before save (lines 54-58):
  1. *"Moving 'what you can do yourself today' to the top — rule on leading with self-action over escalation."*
  2. *"Stripping the named tool ('Microsoft Forms') and named role ('data protection officer') from the escalation line — rule on not referencing tools/roles unless the team confirmed them."*
  3. *"Reframing the GDPR / data-handling note from boilerplate to company-posture language with a sign-off-trigger flag — rule on company-specific framing."*
  Followed by *"Saving the redraft."* (line 58) and the file write (line 61).

- **B6: PASS** — Phase 5 names three specifics in chat (lines 93-95):
  1. **Tool name:** *"Open a ticket in Jira Service Management against the IT queue ... flag it as 'AI tooling — data handling.'"*
  2. **Phrase the team writes:** *"our DPO function is split between the legal team and the security architect"* (split-DPO structure)
  3. **Tone choice:** opener *"Short version: most reply-drafting is fine. ... Decide on the spot, get on with the reply ..."* plus *"The point of this guidance is to get reply drafting unblocked, not to set up a checkpoint."*
  Participant push-back accepting (line 99): *"All three look right. Confirmed. Save."*

### C. Banned-shape

- **C1: PASS** — `grep -inE 'tell the person|sitting next to you|share with your neighbor|tell the room|sit with|take a moment|let it land'` across all scratch files returned exit 1 (zero hits). No room-share or contemplative-pause shapes leaked from the exercise prompts into saved artifacts.

## Top issues to fix

1. None of grading significance. All 13 assertions PASS.
2. Minor scrollback-narrative nit: Phase 2 prose says *"Five candidate rules"* but the chat list is numbered 1-6 (six items shown, one struck on push-back). Counting inconsistency in narration, not an assertion failure.
3. No further issues.

## One-sentence overall

The exercise prompt chain executed end-to-end with verbatim prompt fidelity, correct propose-before-save discipline in Phase 2, a clean diff-summary in Phase 3, the named-rule catch in Phase 4, and three team-anchored specifics landing in the Phase 5 final.
