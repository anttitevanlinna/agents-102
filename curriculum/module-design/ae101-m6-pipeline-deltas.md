# AE101 M6 generation → pipeline updates

Delta list distilled from `ae101-m6-gen-diff.md` (Run 1 vs Run 2 diff), `ae101-m6-gen-arc-note.md` (arc-retrospective), and `~/.claude/skills/curriculum-pre-ship-audit/SKILL.md` (the skill authored this cycle).

Dominant framing: **a rule in memory that does not force is worse than no rule**. The `evals+sim auto-fire` compound entry (2026-04-23) was one day old when M6 generation began. It still didn't force. The forcing function has to live in the generation pipeline's hand-off points, not only in memory.

---

## 1. `.claude/skills/content-creation/SKILL.md` amendments

- **PDCA loop Step 6 (Simulate / test)** — rewrite to name the `curriculum-pre-ship-audit` skill as the invocation, not leave "simulation protocol" as a procedural description. "After any significant rewrite, invoke `curriculum-pre-ship-audit` on the file list. Block 'done' until the skill returns GO."
- **PDCA loop auto-fire trigger list** — make the trigger concrete, not abstract:
  - FIRES on: new module file / new shared-library exercise / new shared-library lecture / new reference page / structural rewrite of any of the above (phase structure changed, LOs changed, mood contract changed, new practitioner artefact integrated, forcing-function mechanic changed).
  - DOES NOT fire on: typo fixes, register polish within existing phases, maintainer-block edits, internal planning artefact edits (`curriculum/module-design/*`), research file edits under `continuous-research/`.
- **Three-pass build — Pass 3 completion gate** — Pass 3 sign-off requires the pre-ship-audit skill to have returned GO.
- **"Done" criterion in this skill's closing paragraph** — add: *"Before writing any 'done' summary for a curriculum-generation cycle, the pre-ship-audit skill must have returned GO. Deferring sim+eval to pre-first-cohort TODO is what let the M6 generation ship Run 1 un-audited."*

## 2. `memory/check_student_facing.md` amendment

New numbered rule (append to §21):

> **21. LLM-vs-agent-vs-Claude vocabulary discipline.** Use *LLM* when the topic is thinking (reasoning, drift, framing, non-deterministic cognitive-like behaviour). Use *agent* when the topic is acting (files written, tools called, execution). Use *Claude* for the specific product, version grounding (*claude-opus-4-7*), or disambiguation. Default to the specific word. Vendors conflate chatbot and agent on purpose; curriculum should correct the conflation, not confirm it. Source: M6 generation-session turn 12 Antti redirect; compounded 2026-04-24.

## 3. `memory/check_writing.md` amendment

New numbered rule:

> **10. Verbatim-frame-cite.** When the user gives a specific verbal frame (3–7 word blunt sentences, a named thesis, quoted lines), capture it verbatim in the reference artefact under a *"Frame to land"* section. Paraphrasing the frame into prose drifts at ship time — the draft ends up wrapping the frame in commentary or dropping parts of it entirely. Only verbatim-in-reference survives cite-and-compare at ship time. Source: M6 generation-session, where Antti's turn-7 frame *"everyone struggles. Surprises happen. The LLM is not a deterministic machine."* got wrapped in 150 words of philosophising and dropped *Surprises happen* entirely. Caught by Antti on draft review, not by the rule-loaded writer.

## 4. `memory/check_pedagogy.md` amendments

- **§24 (sim+eval auto-fire)** — strengthen the trigger list per the SKILL.md amendment above. Remove the ambiguity that let "significant rewrite" get talked into "sentence-level polish."
- **New rule (§25 or next number): pre-set-categories-before-experiment anti-pattern.** *"Don't specify categories of findings before the experiment runs. Pre-specification filters data before it arrives and sets up confirmation bias — the author starts noticing moments that fit the pre-set buckets and skimming past moments that don't. Let categories emerge at drafting from the pattern of what actually happened. Generalises across research, article drafting, eval design, and sim persona selection."* Source: M6 turn-13 Antti redirect.
- **New rule: packaging-layers-sample-different-error-distributions.** *"Verification layers (reference, verifier, loop, sim, source-verify, capability-check, human review) are NOT belt-and-braces. Each layer catches a DIFFERENT error distribution. Removing a layer on 'the other layers will catch it' reasoning loses the specific shape of error only that layer sees. This is why /loop's grep-clean stop-condition is not sufficient — grep doesn't sample the same errors sim does."* Source: M6 arc-retrospective throughline.

## 5. `curriculum/module-design-long-running-strategy.md` amendments

- **Reference-artefact template: "Frame to land" section** — new required section. Captures verbatim user-provided framings (3–5 word sentences, named thesis, quoted lines). Becomes the cite-and-compare source at ship time.
- **Reference-artefact template: "Done means" criterion** — MUST include pre-ship-audit skill invocation as a blocking gate. Deferring sim+eval as pre-first-cohort TODO is forbidden. Per-cohort freshness re-checks are legitimate pre-cohort TODOs; first-pass sim+eval is not.
- **Plan-file shape** — add: *"This plan is a snapshot taken at the moment of dispatch, not a forecast of what the session will actually do. Antti nudges and reversals will reshape it. The plan tracks the session's current understanding; the session notes track what actually happened."* (Per arc-note finding that the plan's tidy three-phases lied relative to the five-nudge reality.)
- **/loop stop-condition** — augment: two clean passes on grep + verifier is not sufficient. The pre-ship-audit skill must also return GO before /loop declares done. (Per dominant-gap finding.)

## 6. Compound candidates for `/compound` (schema-validated memory)

Highest-leverage entries that generalise beyond the M6 session:

1. **Verbatim-user-frame capture in reference artefact** (writing surface).
2. **Sim+eval as blocking pre-ship gate, not deferred TODO** (pedagogy surface + content-creation surface).
3. **LLM-vs-agent-vs-Claude vocabulary discipline** (student_facing surface).
4. **Pre-set-categories-before-experiment anti-pattern** (pedagogy / research surface).
5. **Packaging-layers-sample-different-error-distributions** (pedagogy / content-creation surface).
6. **A rule in memory that does not force is worse than no rule** (meta-rule; governs how corrections should be promoted — to forcing-function hand-off points, not just memory entries).

## 7. Compendium rule edge-cases surfaced (for compendium maintenance, not new rules)

- **§19 path-leak** was written for invocation-by-path. Authoring ship destinations (`write SKILL.md at ~/.claude/skills/<name>/`) are a legitimate distinct use the rule over-catches. Refine §19 or refine verifier J6.
- **§1 banned-word** does not explicitly exempt maintainer blocks the way §4 and §7 do. This cycle applied strict reading (fixed two maintainer-block `honest` instances). Either add an explicit maintainer exemption to §1 or keep strict reading and audit maintainer blocks in shipped files.
- **§14 em-dash ban** applied strictly would require rewriting M5's already-shipped `what-packaging-is.md` and `diagnose-and-resend.md` (which use em-dashes in body). Applied-rule vs. practised-rule gap. Either soften §14 to "em-dashes for clarification-parentheticals per §14 exception; split-sentence em-dashes prohibited" or do the M5 retroactive audit.

---

**Next:** task #15 (/compound dispatch for the six entries) → task #16 (apply the amendments) → task #17 (final commit).
