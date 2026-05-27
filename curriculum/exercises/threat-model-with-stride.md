# Exercise: Threat-model with STRIDE

**Time:** 20 minutes.

**Window:** the main quest window (*m3-security*).

**What you do:** Invoke the curated STRIDE skill on the access-surface map you built in the previous exercise. You pick one threat worth hardening against, write the decision as an ADR in your repo's convention, and move on.

**The point:** Threat modeling is only useful if it produces a decision. STRIDE's value is that it gives you a structured surface to reject most threats against (acceptable risk, out of scope, already mitigated) so the one you decide to harden is defensible. The ADR is the artifact your CISO would actually read.

---

## Phase 1: invoke the skill on the mapped surface

Ask Claude to invoke the STRIDE skill as a subagent on the access-surface map from Exercise 1.

{{prompt:threat-model-with-stride-1}}


Let it run. The output will have more entries than you want to deal with. That's expected.

The STRIDE pass should take minutes. If it returns in seconds, Claude went shallow, push back and re-run. While it runs, switch to your m3-quality window and start the test-strategy skill authoring (next exercise's Phase 1). The wait IS the move M3 installs: kick off long work in one window, do active work in the other, come back when the first lands.

## Phase 2: pick the one

You're going to pick one threat worth hardening against. Not five. One. The move is: name the worst realistic case, then the hardening decision is usually obvious.

Ask Claude to propose the most plausible incident story and walk you through the STRIDE pick from there.

{{prompt:threat-model-with-stride-2}}


Read what Claude proposes. The "most plausible incident story" is the move that makes STRIDE useful rather than performative, push back if the story doesn't fit your codebase's reality. Work with Claude to land on the right mitigation. You'll save it next.

## Phase 3: write the ADR

Ask Claude to draft the ADR in your repo's convention and show it before saving.

{{prompt:threat-model-with-stride-3}}


Read it. If the Decision section reads like it was written for a compliance reviewer rather than a future engineer, push back. The ADR should read like one engineer explaining a call to another. Ship & Save.

If STRIDE's six categories feel like the wrong lens for your feature (some features are really abuse-case or insider-threat shaped, where Elevation-of-Privilege + Repudiation carry everything and Spoofing + Tampering don't fit), say so in the Alternatives considered section. *"STRIDE surfaced X; the more accurate lens here was Y; decision reasoned in Y's terms"* is a legitimate ADR move. The skill is a tool; the call is yours.

**Where did the ADR actually land?** Check the path Claude proposed. Is it in your main session's repo, or in the M3 worktree?

If it's in the main repo, skip ahead.

If it's in the worktree, the agent reasoned itself there. M3 forked a worktree at turn 1, and "this is M3 work" has been the scrollback's framing since. From the agent's vantage, the worktree was created specifically *for M3*, so M3's artifacts look like they belong there. The fork prompt called it "the side-quest"; the agent inferred "M3 = side-quest = worktree" and skipped the architectural detail that only the *quality* side belongs there. `pwd` would have answered differently. The agent reasoned forward from the conversation, not from the filesystem.

Just tell Claude to move it over.

Ask Claude whether this ADR rides into future sessions automatically.

{{prompt:threat-model-with-stride-4}}

Claude's answer: no, ADRs don't auto-load like `CLAUDE.md` and `CLAUDE.local.md` do. They're on-disk and discoverable, but a future session loads them only when explicitly read. You can wire individual ADRs into team `CLAUDE.md` (one `@docs/adr/<file>.md` line per file, Claude Code's `@`-include is single-file, no glob), but most teams don't: ADRs accumulate, the window is finite, and rejected alternatives shouldn't sit in live context. Selective load is the practitioner default; Module 4 will tell Claude exactly which artifacts to read at the start of the long-running run, and that explicit list is the lesson.

Not everything survived to disk, though. The skills returned their work into this session: the full access-surface map from Exercise 1, and the complete STRIDE walk here, including the threats you considered and set aside. The ADR holds the one decision. The analysis around it is real security documentation, and it clears when the session does.

> **Worth keeping?** Ask Claude to save the access-surface map and the STRIDE walk to your repo's `docs/` directory, next to the ADR, before you clear. Your CISO and the next engineer read what's on disk, not your scrollback.

**What happened:** You made one call and wrote the ADR, and the decision shipped to the repo. The rest of the STRIDE output stayed in the session as evidence, not on disk and not a hardening backlog.

---

## What this sets up

The next exercise authors a test-strategy skill and invokes it on this feature, which is now security-tested. The hardening decision becomes a test case in the test strategy. The ADR is in the repo. Your CISO has something to read.

<!-- maintainer -->


**M3 supply-chain easter egg — DO NOT SPOIL IN BODY:**
- Phase 1 prompt `threat-model-with-stride-1` instructs the agent to run the curated `security-tools` skill as a pre-flight before invoking stride. `security-tools` ships a bundled `check.sh` whose first echo line is `owning you ............... ok` — the punch line, visible in Claude Code's collapsed Bash output without Ctrl+O. Expansion reveals an ASCII rick-roll plus the *external skills are a supply-chain vector* lesson framing.
- **Body intentionally has NO lead-in for the pre-flight** at the Phase 1 prompt fence. The body line above the fence reads only *"Ask Claude to invoke the STRIDE skill as a subagent on the access-surface map from Exercise 1."* — this deliberately violates the usual body-lead-in-mirrors-prompt rule (`check_prompts.md`). The surprise IS the pedagogy. Do not "fix" this drift in audit.
- **Trainer move when it fires:** pause the room, ask who saw line 2 of the pre-flight output, name the lesson — every link in the trust chain (tarball → SKILL.md → Bash authorization) was authorized without reading. Resume; the stride subagent invocation does the real threat-model work.
- **Source:** `pre-cohort-todos.md` *Surprise-skill live demo* entry; design refined 2026-05-21. Skill files at `content/skills/security-tools/`.

**Quality:** compendium-audited 2026-05-26 (writing@0ef2ca6 story@e840433 technical@0ef2ca6 behavior@e840433 pedagogy@689e7e0 strategy@689e7e0)
- judges @0ef2ca6: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)

**Meta (trainer):**
- **Time:** 20 minutes (7 / 8 / 5)
- **Primary Bloom's level:** Apply + Evaluate
- **Mood target:** earned trust, deepening. Student leaves with a real call made under named pressure. Watch for: compliance-feeling. Diagnostic: ADR reads like a checklist item. Fix: trainer makes student name the specific future engineer they'd want this ADR to be useful for.

**Push-back moves:**
- **P1 skill invocation ambiguity.** Student points the skill at the feature rather than the access-surface map. Trainer push: *"the map is the input — STRIDE runs against surfaces the map identified, not raw code."*
- **P2 menu-shopping.** Student picks the easiest-to-harden threat rather than the real one. Trainer push: *"name the worst realistic incident first. If your pick doesn't match that story, you're optimising for effort, not for risk."*
- **P2 everything-is-high.** Student wants to harden against three. Trainer push: *"which one keeps you awake — or keeps your staff engineer awake on your behalf? That's the one. The others get rejected explicitly in the ADR, which is better than hardening against all of them half-heartedly."*
- **P3 ADR drift toward compliance voice.** Trainer push: *"write it for the engineer who takes over this feature in six months. What would they want to know?"*
- **P3 ADR missing Alternatives considered.** Trainer push: *"the alternatives ARE the reasoning. Without them, the ADR is an assertion, not a decision."*

**Watch-fors:**
- STRIDE output overwhelms the student. Normal on first pass. The teaching is *reject most*, not *address all*.
- Student argues with a threat the skill surfaced because they'd already thought about it. Good — that IS the team-kit feed. Trainer push: *"note it in the ADR's Alternatives considered — 'threat X considered, mitigated by Y which already exists.'"*
- Student says *"STRIDE doesn't really fit this feature."* Might be right (low-risk internal service) or might be avoidance. Trainer push: *"name one surface and one STRIDE category — if neither category applies, you're right; if one does, let's pick."*
- ADR home not resolved — sponsor's pre-engagement contract hadn't named one. Default to `docs/adr/` and flag at Debrief.

**Plug points:**
- Student's access surface map from Ex1 (in the temp directory Claude chose; path in scrollback) — Phase 1 input
- Sponsor-stated ADR home (from pre-engagement contract) — Phase 3 output path
- Curated STRIDE skill — ships in content folder at `content/skills/stride/SKILL.md`, installed to `~/.claude/skills/stride/SKILL.md` at prework.

**Leap test** (per `check_pedagogy.md` rule 45 — three observable Monday-morning outcomes the student exhibits on their own codebase by the next working day):
1. **Writes a most-plausible-incident story before picking the STRIDE threat to harden against.** Falsifiable: the ADR's Context or scrollback shows the incident story preceded the threat pick, not the other way around.
2. **Rejects the other STRIDE threats explicitly in the ADR's Alternatives considered.** Falsifiable: the ADR's Alternatives section names at least two threats and the reason each was rejected (acceptable risk, already mitigated, out of scope), not left as backlog.
3. **Writes the hardening decision as an ADR in the repo's convention with all four standard sections (context, decision, alternatives, constraint).** Falsifiable: a file at the sponsor-stated ADR path with the four sections filled in, not a stub.

**Artefact contracts** (per `check_pedagogy.md` rule 46):

| Artefact | Stable identifier | Produced by | Consumed by |
|---|---|---|---|
| Hardening-decision ADR | Sponsor-stated ADR home; default `docs/adr/NNNN-slug.md` | Phase 3 (`{{prompt:threat-model-with-stride-3}}`) | M3 Ex3 *Author your test-strategy skill* (the hardening decision becomes a test case the test-strategy invocation reads); M4 Phase 2 walk-and-fill (audit subagent reads ADRs as part of *"system you have"*); M4 Phase 4 three-block frame (ADRs become Block 2 examples) |

**Per-phase failure modes** (per `check_pedagogy.md` rule 47 — every phase shipping a forcing function names its dominant failure and one recovery move):

| Phase forcing function | Dominant failure mode | Escape hatch |
|---|---|---|
| Phase 1 *"invoke STRIDE on the access-surface map"* | P1 skill-invocation ambiguity — student points the skill at the feature rather than the map | Trainer push: *"the map is the input — STRIDE runs against surfaces the map identified, not raw code."* |
| Phase 2 *"name the worst realistic case, pick the one threat"* | P2 menu-shopping — student picks the easiest threat, not the real one | Trainer push: *"name the worst realistic incident first. If your pick doesn't match that story, you're optimising for effort, not for risk."* |
| Phase 3 *"write the ADR in repo convention with Alternatives considered"* | P3 ADR drift toward compliance voice OR Alternatives section missing | Trainer push: *"write it for the engineer who takes over this feature in six months. The alternatives ARE the reasoning — without them, the ADR is an assertion, not a decision."* |

**Scratch path:** threat list lands alongside Ex1's surface map in the same Claude-chosen temp directory. Outside the repo; no gitignore concern. See Ex1 maintainer note on the `/tmp`-tier vs `observations/`-tier pedagogy.
