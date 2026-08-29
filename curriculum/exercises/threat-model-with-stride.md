# Pick one threat, record the decision

**Time:** 20 minutes.

**Window:** the main quest window (*m3-security*).

**What you do:** invoke the curated STRIDE skill on the map you built, then pick one threat worth hardening against.

**What you build:** one recorded hardening decision, written as an ADR (Architecture Decision Record) in your repo's convention.

**The point:** STRIDE's value is rejection, not enumeration.

---

## Phase 1: Run the threat scan across your mapped surface

*7 min*

- STRIDE is a six-category checklist for threats. Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege. The curated skill walks your surface against all six, so you don't hold the taxonomy in your head.
- The subagent does the walk; you read the result. It runs in fresh context against the map, not the raw code.

Ask Claude to invoke the STRIDE skill as a subagent on the access-surface map from Exercise 1.

{{prompt:threat-model-with-stride-1}}


## Read the threat list, expect more than you'll use

- The output over-produces on purpose. You reject most of its entries in the next phase; that rejection is the point, not a failure of the scan.
- A scan that returns in seconds went shallow. The pass should take minutes. If it comes back instant, push back and re-run. Stay in this window while it works, and read what lands.

## Phase 2: Pick the one threat worth hardening against

*8 min*

- One threat, not five. The move: name the worst realistic case first, and the hardening decision is usually obvious from there.
- The agent proposes the incident story; you judge whether it fits. You are not inventing the worst case from scratch. Claude drafts it; your read of your own codebase decides whether it's real.

Ask Claude to propose the most plausible incident story and walk you through the STRIDE pick from there.

{{prompt:threat-model-with-stride-2}}


## Push back on the incident story, land the mitigation

- The incident story is what makes STRIDE useful rather than performative. Read what Claude proposes. Push back if the story doesn't fit your codebase's reality.
- Work with Claude to land on the right mitigation.

## Phase 3: Write the decision as an ADR

*5 min*

- The ADR states the call, its alternatives, and the constraint that picked the winner. You write it in your repo's convention. It is the artifact your CISO would actually read.
- Have the agent draft it and save it, then read the diff before you decide whether to keep it.

Ask Claude to draft the ADR in your repo's convention, save it, and show you the diff.

{{prompt:threat-model-with-stride-3}}


## Read the ADR, check the voice and the lens

- The Decision section should read like one engineer explaining a call to another. Read it. If it reads like it was written for a compliance reviewer rather than a future engineer, push back, then save it.
- STRIDE is a tool, not the only lens. If its six categories feel wrong for your feature (some features are really abuse-case or insider-threat shaped, where Elevation of privilege and Repudiation carry everything and Spoofing and Tampering don't fit), say so in the Alternatives considered section. *"STRIDE surfaced X; the more accurate lens here was Y; decision reasoned in Y's terms"* is a legitimate ADR move. You decide.

## Check where the ADR landed

- Check the path Claude proposed. Is the ADR in your main session's repo, or in the M3 worktree? If it's in the main repo, skip ahead.
- If it landed in the worktree, the agent reasoned itself there. The fork prompt called the worktree "the side-quest", and the scrollback has framed everything since as M3 work, so M3's artifacts look like they belong there. `pwd` would have answered differently. The agent reasoned forward from the conversation, not from the filesystem.
- Just tell Claude to move it over.

## Ask whether the ADR loads into future sessions

Ask Claude whether this ADR rides into future sessions automatically.

{{prompt:threat-model-with-stride-4}}

- Claude's answer: no. ADRs don't auto-load like `CLAUDE.md` and `CLAUDE.local.md` do. They're on-disk and discoverable, but a future session loads them only when explicitly read. You can wire individual ADRs into team `CLAUDE.md` (one `@docs/adr/<file>.md` line per file; Claude Code's `@`-include is single-file, no glob), but most teams don't: ADRs accumulate, the window is finite, and rejected alternatives shouldn't sit in live context.
- Selective load is the practitioner default: naming exactly what to read at the start of a long-running session, rather than trusting broad auto-load.

## Save the map and the STRIDE walk before you clear

- The skills returned their work into this session: the full access-surface map from Exercise 1, and the complete STRIDE walk here, including the threats you considered and set aside. The ADR holds the one decision. The analysis around it is real security documentation, and it clears when the session does.

> **Worth keeping?** Ask Claude to save the access-surface map and the STRIDE walk to your repo's `docs/` directory, next to the ADR, before you clear. Your CISO and the next engineer read what's on disk, not your scrollback.

**What happened:** You made one call and wrote the ADR, and the decision shipped to the repo. The rest of the STRIDE output stayed in the session as evidence, not on disk.

**What this sets up:** The next exercise authors a test-strategy skill and invokes it on this feature, which is now security-tested. The hardening decision becomes a test case in the test strategy.

<!-- maintainer -->

**Lean pass (2026-08-25, Antti-directed M3/M6 shorten, free hands):** cut "It will have more entries than you want to deal with." + "You are picking a single threat worth hardening against." (restatements); "You save it as the ADR next." (Phase-3 header carries it); Phase-3's "It reads like one engineer explaining a call to another, not a compliance checkbox." (verbatim-adjacent dup of the read-the-ADR slide, which keeps the line); worktree-inference bullet condensed 6→4 sentences (the M3=side-quest inference stated once, `pwd` + reasoned-from-conversation kept); "Not everything survived to disk."; closer's "The ADR is in the repo. Your CISO has something to read." (CISO landed in Phase 3). Do not restore.

**View summary:** You run STRIDE across the mapped surface, reject most threats with reasons, and choose one hardening decision worth recording. The resulting architecture decision record turns a broad threat scan into one defensible engineering choice your team can inspect.

**Emphasis pass (2026-07-09, Antti-directed "go very lightly on the bold"):** bullet leads de-bolded to plain across all slides; kept bold: none (no named-move or menu handles in body); widget/label chrome (**Time:**/**Window:**/**What you do:**/**What you build:**/**The point:**/**What happened:**/**What this sets up:**) untouched, per `theory-plan.md § Slide format — emphasis budget` + `check_slides.md §9`. Wording near-verbatim; no claims added or cut.

**Auto-load-check prompt (`threat-model-with-stride-4`) kept, not cut.** Flagged `low-yield`. It's the ask-then-reveal auto-load-surface beat: the student asks whether the ADR rides into future sessions, and the reveal (no — ADRs are explicit-load, unlike `CLAUDE.md` / `CLAUDE.local.md`) teaches the boundary M4 pays off with its explicit read-list. A light one-question introspection carrying its own §2 lead-in, not concurrent-heavy load. Not a cut candidate.

**M3 supply-chain easter egg — DO NOT SPOIL IN BODY:**
- Phase 1 prompt `threat-model-with-stride-1` instructs the agent to run the curated `security-tools` skill as a pre-flight before invoking stride. `security-tools` ships a bundled `check.sh` whose first echo line is `owning you ............... ok` — the punch line, visible in Claude Code's collapsed Bash output without Ctrl+O. Expansion reveals an ASCII rick-roll plus the *external skills are a supply-chain vector* lesson framing.
- **Body intentionally has NO lead-in for the pre-flight** at the Phase 1 prompt fence. The body line above the fence reads only *"Ask Claude to invoke the STRIDE skill as a subagent on the access-surface map from Exercise 1."* — this deliberately violates the usual body-lead-in-mirrors-prompt rule (`check_prompts.md`). The surprise IS the pedagogy. Do not "fix" this drift in audit.
- **Trainer move when it fires:** pause the room, ask who saw line 2 of the pre-flight output, name the lesson — every link in the trust chain (tarball → SKILL.md → Bash authorization) was authorized without reading. Resume; the stride subagent invocation does the real threat-model work.
- **Source:** `pre-cohort-todos.md` *Surprise-skill live demo* entry; design refined 2026-05-21. Skill files at `content/skills/security-tools/`.

**Save-then-diff (2026-08-26):** the ADR beat reports after the write — `threat-model-with-stride-3` saves to the path, then shows the diff (`check_prompts.md §21` post-action reporting). The body bullet and lead-in describe that order; do not add a pre-save gate to the prompt.

**Quality:** compendium-audited 2026-08-26 (writing@1abb84c6 story@0e4f7c9e technical@1abb84c6 behavior@1c765f2 pedagogy@1abb84c6 strategy@1c765f2 slides@0e4f7c9e)
- judges @0e4f7c9e: writing PASS (drift-recheck), story PASS, technical PASS (drift-recheck), behavior PASS, pedagogy PASS (drift-recheck), strategy PASS, slides PASS

**Meta (trainer):**
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
- ADR home not resolved — the repo has no convention. Default to `docs/adr/` and flag at Debrief.

**Plug points:**
- Student's access surface map from Ex1 (in the temp directory Claude chose; path in scrollback) — Phase 1 input
- The repo's ADR home — Phase 3 output path
- Curated STRIDE skill — ships in content folder at `content/skills/stride/SKILL.md`, installed to `~/.claude/skills/stride/SKILL.md` at prework.

**Leap test** (per `check_pedagogy.md` rule 45 — three observable Monday-morning outcomes the student exhibits on their own codebase by the next working day):
1. **Writes a most-plausible-incident story before picking the STRIDE threat to harden against.** Falsifiable: the ADR's Context or scrollback shows the incident story preceded the threat pick, not the other way around.
2. **Rejects the other STRIDE threats explicitly in the ADR's Alternatives considered.** Falsifiable: the ADR's Alternatives section names at least two threats and the reason each was rejected (acceptable risk, already mitigated, out of scope), not left as backlog.
3. **Writes the hardening decision as an ADR in the repo's convention with all four standard sections (context, decision, alternatives, constraint).** Falsifiable: a file at the repo's ADR path with the four sections filled in, not a stub.

**Artefact contracts** (per `check_cross_module.md` §5):

| Artefact | Stable identifier | Produced by | Consumed by |
|---|---|---|---|
| Hardening-decision ADR | the repo's ADR convention; default `docs/adr/NNNN-slug.md` | Phase 3 (`{{prompt:threat-model-with-stride-3}}`) | M3 Ex3 *Author your test-strategy skill* (the hardening decision becomes a test case the test-strategy invocation reads); M4 Phase 2 walk-and-fill (audit subagent reads ADRs as part of *"system you have"*) |

**Per-phase failure modes** (per `check_pedagogy.md` rule 47 — every phase shipping a forcing function names its dominant failure and one recovery move):

| Phase forcing function | Dominant failure mode | Escape hatch |
|---|---|---|
| Phase 1 *"invoke STRIDE on the access-surface map"* | P1 skill-invocation ambiguity — student points the skill at the feature rather than the map | Trainer push: *"the map is the input — STRIDE runs against surfaces the map identified, not raw code."* |
| Phase 2 *"name the worst realistic case, pick the one threat"* | P2 menu-shopping — student picks the easiest threat, not the real one | Trainer push: *"name the worst realistic incident first. If your pick doesn't match that story, you're optimising for effort, not for risk."* |
| Phase 3 *"write the ADR in repo convention with Alternatives considered"* | P3 ADR drift toward compliance voice OR Alternatives section missing | Trainer push: *"write it for the engineer who takes over this feature in six months. The alternatives ARE the reasoning — without them, the ADR is an assertion, not a decision."* |

**Scratch path:** threat list lands alongside Ex1's surface map in the same Claude-chosen temp directory. Outside the repo; no gitignore concern. See Ex1 maintainer note on the `/tmp`-tier vs `observations/`-tier pedagogy.

<!-- backing -->

Claims
- `stride-is-a-six-category-checklist` · borrowed · "Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege." ← stride-microsoft
- `value-is-rejection-not-enumeration` · vision · "STRIDE's value is rejection, not enumeration." ← none-owed
- `strides-value-is-structured-rejection` · vision · "that rejection is the point, not a failure of the scan" ← none-owed
- `subagent-does-the-walk-you-read-the-result` · vision · "The subagent does the walk; you read the result." ← none-owed
- `runs-against-the-map-not-the-raw-code` · vision · "It runs in fresh context against the map, not the raw code" ← none-owed
- `expect-more-than-youll-use` · vision · "Read the threat list, expect more than you'll use" ← none-owed

Sources
- stride-microsoft `[checked:2026-05-15 result:OK due:none]` https://learn.microsoft.com/en-us/azure/security/develop/threat-modeling-tool-threats — [vendor docs] STRIDE's six categories, as originally coined at Microsoft by Kohnfelder and Garg (1999) and carried in Microsoft's threat-modelling documentation since. **Foundational-literature variant, `due:none`:** a 1999 taxonomy does not expire, and the six category names have been stable for a quarter-century. Vendor-hosted, but the source is the coiner rather than a marketing claim — the L0 vendor-content rule targets promotional evidence, not a vendor documenting a framework it invented. fallback: name the six categories without the URL; STRIDE is cultural vocabulary in security work.

Frameworks
- STRIDE · [borrow:security engineering] · law:none · ← stride-microsoft
- Blast radius · [borrow:safety engineering] · law:blast-radius-error-budget · ← cultural-vocab — picking one threat to harden against is triage by irreversibility
- Name the uncertainty before you move · [borrow:none] · law:name-the-uncertainty-before-you-move · ← none — the recorded decision is the governor fired and written down

Stance `[stance:2026-08-01 level:L2]`
- holds: STRIDE, which is settled, taught, and older than most of the room. **This is the one exercise in AE101 whose framework is genuinely converged** — a useful contrast with the agentic vocabulary elsewhere in the corpus, where "practitioners say" has repeatedly turned out to mean "we say."
- contested: nothing about STRIDE. The exercise's own claim — that its value is rejection rather than enumeration — is a position, and a slightly contrarian one against how STRIDE is usually taught.
- would-move-it: nothing. A twenty-five-year-old taxonomy is not the part of this curriculum that moves.

OODA
- question: none standing on STRIDE. The dependency to watch is the curated skill this exercise invokes.
- roster: none external.
- last-run: 2026-08-01

<!-- /backing -->
