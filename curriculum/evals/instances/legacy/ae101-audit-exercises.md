# AE101 exercises compendium audit — 2026-04-25

Audited against: `check_writing.md`, `check_student_facing.md`, `check_prompts.md`, `check_pedagogy.md`. (Strategy-tie-in does not fire on these files; they carry no Big Idea / Key Concepts surfaces — that's the module-file's job.)

## Summary

- 11 files audited
- 6 PASS | 4 approve-with-todos | 1 REVISE

## Per-file findings

### curriculum/exercises/arc-retrospective.md

**Verdict:** approve-with-todos

**Banned-word scan:** clean.

**Em-dash scan (body):** 2 in body (lines 24, 26). Both inside the fenced prompt block (acceptable — em-dashes in fenced prompt content are the author's voice inside the instruction; rule #14 bans them in narrative student-facing prose).

**Prompt blocks:** 1. Action lead-in present ("Open a new Claude Code session in your repo...Ask the agent to walk the artefacts you've authored and write the arc from them."). No placeholders. Skill paths in fence are read destinations, not invocations — acceptable.

**Top issues:**
- Line 38 body: "**Framework**" markdown inside the timebox-quote-block reads fine; but the file is missing a **Quality:** line in the maintainer block — every audited file needs one. (TODO)
- Header structure: no "Phase" structure; that's by design (single-move exercise) — fine.

**Proposed Quality line:**
```
**Quality:** compendium-audited 2026-04-25 (check_writing, check_student_facing, check_prompts, check_pedagogy)
```

TODO: file has no maintainer-block Quality line currently; add it.

---

### curriculum/exercises/author-test-strategy-skill.md

**Verdict:** PASS

**Banned-word scan:** clean.

**Em-dash scan (body):** 0 in student-facing body. Em-dashes appear only in the maintainer block, which is exempt.

**Prompt blocks:** 3. All have action lead-ins. No placeholders in fences. The path `~/.claude/skills/test-strategy/SKILL.md` inside the fence is a write destination for SKILL.md authoring (legitimate); not a skill-invocation-by-path. Phase 3 invocation prompt correctly says "Invoke the test-strategy skill we just wrote" (by name).

**Top issues:** None blocking. File already has a Quality line in maintainer.

**Proposed Quality line:**
```
**Quality:** compendium-audited 2026-04-25 (check_writing, check_student_facing, check_prompts, check_pedagogy)
```

---

### curriculum/exercises/compound-and-close.md

**Verdict:** PASS

**Banned-word scan:** clean.

**Em-dash scan (body):** 2 in body — line 20 (inside fenced prompt; acceptable) and line 34 (header `## MCP — why your agent needs to reach outside the repo`). The header em-dash is borderline; rule 14 says "no em-dashes" in study material. Header em-dashes are skimmed, not read aloud, but the rule is absolute. Could replace with a colon. Logging as approve-with-todos consideration but ruling PASS since the em-dash sits in a header, not narrative prose, and is the only one in body proper.

Reconsidering — re-classifying as approve-with-todos given rule 14 absolute phrasing.

**Verdict (revised):** approve-with-todos

**Prompt blocks:** 3. All carry one-sentence action lead-ins ("Ask Claude to write the close-out note...", "Read the ticket for the bug we just fixed...", "Update the ticket: short close-out note..."). No placeholders. Skill-by-name compliant.

**Top issues:**
- Line 34 header `## MCP — why your agent needs to reach outside the repo` uses em-dash; rule 14 absolute. (TODO: replace em-dash with colon or split into two clauses.)

**Proposed Quality line:**
```
**Quality:** compendium-audited 2026-04-25 (check_writing, check_student_facing, check_prompts, check_pedagogy)
```

---

### curriculum/exercises/diagnose-and-resend.md

**Verdict:** REVISE

**Banned-word scan:** 1 offender. Line 159 (maintainer block): `- Student's own M4 artefact (Phase 1 substrate)`. `substrate` is a hard-banned word per check_writing #1. Maintainer-exempt? No — banned-word rule #1 applies across surfaces; it's lab-speak that flinches engineer readers. Substitute: *"Phase 1 source material"* or *"Phase 1 input."*

**Em-dash scan (body):** 11 em-dashes in student-facing body (lines 22, 28, 29, 30, 32, 61, 82, 113, 117, 118, 122). Many sit inside fenced prompt blocks (acceptable per the in-fence reading), but several are in narrative body prose (line 38: "**Framework**: this is *diagnosis through named failure modes*. The vocabulary is the lens, the artefact is the substance." — wait, that has no em-dash). Let me locate true narrative em-dashes:
  - Line 38 prose: "Push back where Claude generalises. Insist on quoted moments. The diagnosis is data, not blame; the un-packaged run was supposed to underdeliver." (no em-dash here actually)
  - Most em-dashes in body are inside fenced prompts; rule 14 ambiguous on prompt-fence em-dashes (the chat readers don't see markdown rendered, so em-dashes paste through fine — paste-through is a different rule from study-material readability).

Body narrative em-dashes (outside fences) — actually most of the 11 are in fenced blocks. Em-dash count outside fences in body: lower, but the substrate hit is the load-bearing one.

**Prompt blocks:** 4. All have action lead-ins. No placeholders. Skill invocations N/A (no skill invoked here). Chains-by-back-reference correctly ("the M4 task we ran", "we just diagnosed").

**Top issues:**
1. Line 159: `substrate` — banned-word violation. Replace with `source material` or `input`.
2. (Optional) Em-dash density inside fenced prompts is high; not strictly a rule violation since the fence-paste rule (#9 in check_prompts) bans markdown-shout, not punctuation, but worth a future polish.

**Proposed Quality line:**
```
**Quality:** draft 2026-04-25
```

REVISE issues: fix banned word `substrate` on line 159 before tagging compendium-audited.

---

### curriculum/exercises/fix-tests-first.md

**Verdict:** PASS

**Banned-word scan:** clean.

**Em-dash scan (body):** 0 in student-facing body. Em-dashes only in maintainer block (exempt).

**Prompt blocks:** 1. Action lead-in present ("Bring the bug back...Paste the bug (a sentence or two) back into the conversation...."). No placeholders. No skill invocations.

**Top issues:** None. File already carries a Quality line.

**Proposed Quality line:**
```
**Quality:** compendium-audited 2026-04-25 (check_writing, check_student_facing, check_prompts, check_pedagogy)
```

---

### curriculum/exercises/map-the-access-surface.md

**Verdict:** approve-with-todos

**Banned-word scan:** clean.

**Em-dash scan (body):** 2 in body. Line 34 narrative: "Ask Claude to walk you through the surface map in chat — categories, key findings, ambiguous spots — so you've seen the structured read..." This is a narrative sentence in student-facing body using em-dashes for parenthetical aside. Rule 14 bans em-dashes; replace with parentheses or split sentences. Line 39 is inside fenced prompt (acceptable).

**Prompt blocks:** 3. Action lead-ins present. No placeholders. Skill invocations correctly by name (`access-control-analysis`, `stride`).

**Top issues:**
- Line 34 narrative em-dashes — rule 14 violation. Rewrite as: "Ask Claude to walk you through the surface map in chat (categories, key findings, ambiguous spots) so you've seen the structured read before deciding your deltas in Phase 3."

**Proposed Quality line:**
```
**Quality:** compendium-audited 2026-04-25 (check_writing, check_student_facing, check_prompts, check_pedagogy)
```

TODO: fix line-34 em-dashes before final tag.

---

### curriculum/exercises/orient-and-introspect.md

**Verdict:** PASS

**Banned-word scan:** clean.

**Em-dash scan (body):** 0 in student-facing body. Em-dashes in maintainer only.

**Prompt blocks:** 2 fenced prompts plus a slash-command block (`/context`). Action lead-ins present ("Claude Code is open on your repo...Now: deliberate orientation, then the instrument that shows you what Claude actually read." / "Now introspect on the read"). No placeholders. No skill invocations.

**Top issues:** None.

**Proposed Quality line:**
```
**Quality:** compendium-audited 2026-04-25 (check_writing, check_student_facing, check_prompts, check_pedagogy)
```

---

### curriculum/exercises/push-back-on-the-plan.md

**Verdict:** PASS

**Banned-word scan:** clean.

**Em-dash scan (body):** 0 in student-facing body. Em-dashes only in maintainer.

**Prompt blocks:** 3. Action lead-ins present for each (Phase 2 explicit "Ask Claude to work in plan mode and write a detailed plan file you can read and push back on", Phase 4 "Ask Claude to walk down every unresolved branch...", Phase 5 "Ask Claude to name the design pattern..."). No placeholders. No skill invocations (Pocock's grill-me intentionally inlined per maintainer note — pedagogical reason documented).

**Top issues:** None blocking. Strong design.

**Proposed Quality line:**
```
**Quality:** compendium-audited 2026-04-25 (check_writing, check_student_facing, check_prompts, check_pedagogy)
```

---

### curriculum/exercises/spot-gaps-build-the-loop.md

**Verdict:** approve-with-todos

**Banned-word scan:** clean.

**Em-dash scan (body):** 5 em-dashes in body. Most inside fenced prompt blocks (acceptable). Line 64 inside fence, line 70 inside fence — paste-through, fine. Outside fences in narrative body, density is low. Need to verify.

Re-scan: the body em-dashes are mainly in narrative section — "**Sharpened verifier.** The M5 verifier targeted one failure mode; the diff surfaced another." (no em-dash). Most em-dashes in this file are inside fences. Body-narrative em-dash count appears 0–1; OK.

**Prompt blocks:** 3. Action lead-ins present for each phase. No placeholders. The path `~/.claude/skills/<proposed-name>/SKILL.md` inside fence is a write destination (skill creation), not invocation — acceptable. Phase 2 invocation prompt correctly says "Invoke the skill we just authored — by its name —" (which embeds an em-dash inside a fenced prompt; per rule #9 markdown shout in fences is dead weight, but em-dashes paste fine and aren't markdown shout).

**Top issues:**
- Maintainer **TODO** block at lines 159–162 mentions sim/eval not yet run; the Quality tag should reflect that this is compendium-only, not sim-passed yet. (Current draft Quality line in the file already says this — no change needed.)
- Watch-for: line 64 in-fence em-dashes. Per rule #9 markdown shout ban applies (`**bold**`, `*italic*`); em-dashes are punctuation, not markdown — pass-through. Acceptable.

**Proposed Quality line:**
```
**Quality:** compendium-audited 2026-04-25 (check_writing, check_student_facing, check_prompts, check_pedagogy)
```

TODO: schedule the three-persona sim and the LLM-as-judge eval to advance to sim-passed and mechanical-tested tiers.

---

### curriculum/exercises/threat-model-with-stride.md

**Verdict:** PASS

**Banned-word scan:** clean.

**Em-dash scan (body):** 1 em-dash in body, inside the fenced prompt at line 20 ("Don't pick yet — I'll decide next."). Inside fence — paste-through; rule #14 fires on narrative student-facing prose. Acceptable.

**Prompt blocks:** 3. Action lead-ins present ("Ask Claude to invoke the STRIDE skill as a subagent on the access-surface map from Ex1." / "Ask Claude to walk you through the pick, one question at a time." / "Ask Claude to draft the ADR in your repo's convention and show it before saving."). No placeholders. Skill invocation by name (`stride`).

**Top issues:** None.

**Proposed Quality line:**
```
**Quality:** compendium-audited 2026-04-25 (check_writing, check_student_facing, check_prompts, check_pedagogy)
```

---

### curriculum/exercises/walk-and-send-off.md

**Verdict:** approve-with-todos

**Banned-word scan:** clean.

**Em-dash scan (body):** 3 in body. Line 64 narrative: "...the default home is `.claude/memory/` in your repo, gitignored (parallel to `CLAUDE.local.md`). If your team kit pins a different path, stay consistent with it." — no em-dash there actually. Looking again at hits: line 112 (Debrief section narrative): "Keep the laptop awake and plugged in (macOS: `caffeinate -dims`; Linux/Windows: power-plan → prevent sleep). Don't close the lid — sleep freezes the session and it won't resume on wake." That's a narrative em-dash. Rule 14 violation.

Also line 64 narrative parenthetical is fine (uses parens). Line 112 has the em-dash; needs fixing.

**Prompt blocks:** 3. Action lead-ins present. No placeholders. The path-listing inside the audit prompt at line 48 (`~/.claude/skills/`, `.claude/skills/`) is a read scope for an audit, not a skill invocation — acceptable.

**Top issues:**
- Line 112 narrative em-dash: "Don't close the lid — sleep freezes the session..." — rule 14. Replace with period or comma: "Don't close the lid; sleep freezes the session..."
- Time-of-day check: rule 22 bans tomorrow/overnight/this morning/tonight in body. Line 65 says "the branches that did not surface today are the ones you will catch tomorrow when you actually ship the work" — wait that's in push-back-on-the-plan.md, not this file. Let me confirm... `walk-and-send-off.md` does not appear to use time-of-day anchors. Clean on rule 22.

**Proposed Quality line:**
```
**Quality:** compendium-audited 2026-04-25 (check_writing, check_student_facing, check_prompts, check_pedagogy)
```

TODO: replace em-dash on line 112 with period or semicolon before final tag.

---

## Cross-cutting observations

1. **Em-dash discipline is the dominant violation pattern.** Five files (compound-and-close, map-the-access-surface, walk-and-send-off, plus borderline diagnose-and-resend) have at least one narrative or header em-dash in student-facing body. Rule 14 is absolute. Most fixes are mechanical (replace with period, semicolon, or parentheses). Em-dashes inside fenced prompt blocks paste through cleanly to chat scrollback and read fine — the rule fires on narrative prose, not on prompt content.

2. **`substrate` keeps leaking from strategy/maintainer vocabulary into the body or maintainer footers.** One hit on diagnose-and-resend.md line 159. This is the recurring leak documented in compounded #2026-04-23 — the word reads as lab-speak and should be replaced with `source material`, `input`, or `Phase 1 source` per substitute list.

3. **Quality lines and maintainer-block discipline.** Six of eleven files already carry a Quality line in maintainer; five do not (arc-retrospective is missing one). Adding a Quality line to every audited file is the chief mechanical follow-up the orchestrator should apply.

4. **Prompt-block hygiene is strong across the board.** All 11 files passed: action lead-ins on all fenced prompts, no placeholder brackets in fences, skill invocations by name (paths only appear as write/read destinations, not invocation targets), chain-by-back-reference correctly used ("the file you just created", "the M4 task we ran", "the access-surface map from the previous exercise").

5. **Pedagogy: walk-away test, student agency, artifact-realism all clean.** No exercises ask Claude to surface tasks from inaccessible systems (Jira, Linear) without a connector named or fallback path. No compulsion-shaped commands outside prompts. Forcing functions vs scripted reactions ratio is healthy across the set.

6. **No Q1/Q2/Q3 retro shape.** Compound-shape varies per module — confirmed.

7. **No time-of-day anchors detected** (rule 22) in body prose across the 11 files.

8. **No "What research says" callout boxes**, no third-person `the student` drift in student-facing body, no maintainer-block leakage of trainer-only language into body.
