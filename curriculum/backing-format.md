# Backing-block format

Canonical spec for the per-file `<!-- backing -->` block. Third sibling of `quality-format.md` (code-readiness) and `source-freshness-format.md` (source-readiness). This one stamps **claim-readiness**: for every load-bearing claim a file makes, what stands behind it, and what the field currently believes.

Loaded by `/lecture-ooda`, `backing-lint.sh`, `/curriculum-pre-ship-audit`, and any session touching a backing block. Pointer from `check_research_claims.md §11`.

**Problem it kills.** §11's `Source verification` block is a ledger of claims that *have* sources. A file with zero citations carries zero stamps and audits clean — silence reads as rigour. And the borrow ledger (`Frameworks riffed on:` / `Frameworks attributed:`, two spellings, 34 files) sits in a separate register, unstamped, joined to `theory-plan.md`'s law inventory only by hand. Neither register records a **stance**: what the field currently holds on this subject, at what evidence level, and what would move it. The backing block is one region carrying all three, so a lecture-scoped OODA has exactly one file region to read and one to write.

## Region

```
<!-- backing -->
…five fields…
<!-- /backing -->
```

Lives below `<!-- maintainer -->`, so it never renders. Explicit close so the linter slices it without heuristics. One region per file. Absorbs and replaces `Frameworks riffed on:` / `Frameworks attributed:` / `**Source verification …**` — do not keep a second copy. A `**Vision vs. detail:**` section is absorbed too, by the Claims `layer` field: delete it when the block lands. It is not in the linter's `LEGACY` list because a file with no block still needs it.

**Field headers** take either spelling — `Claims` bare on its own line, or `**Claims**`. Nothing else. `### Claims` and `Claims:` are errors (`FIELD-UNPARSED`), because a header the parser cannot read makes its whole field invisible and the block reports clean on content nobody checked. Claim ids are backticked; the layer token is bare.

Maintainer-block region → edits are **not** gated by the prompt-approval hook and are **not** card-shaped (`check_prompts.md §22`, §26). Apply directly, then report as landed work. Not a carve-out: §26 fires on student-facing body text and prompt bodies only, and everything else applies without asking. Cosmetic edits here do not degrade Quality (`quality-format.md`); a claim edit *above* the divider still degrades the stamps that back it (auto-degrade, below).

## The five fields

### 1 · Claims

Every load-bearing assertion the body makes, one line:

```
- <claim-id> · <layer> · "<anchor>" ← <source-id>[, <source-id>…]
```

- **`claim-id`** — kebab-case, file-local, stable. Renaming breaks the OODA's diff; prefer adding to renaming.
- **`layer`** — `vision` · `detail` · `borrowed`. Governs what backing is owed (below).
- **`anchor`** — the body phrase that breaks if the backing fails. Quote it; don't paraphrase. This is what a re-verifier reads the source *against*.
- **`←`** — source ids from field 3, or `none-owed` for `vision`.

### 2 · Layers — what each owes

| layer | what it is | backing owed |
|---|---|---|
| `vision` | framing, arc, governing rule, the design's own stance | **none.** `check_research_claims.md §7` — vision layer is the maintainer's framing and needs no KB backing. Recording it as a claim with `none-owed` is the point: it marks the line as deliberately unsourced, not as debt. |
| `detail` | practitioner claim, number, shipped result, named company | full stamp. URL + type label + freshness. |
| `borrowed` | a framework imported from a parent field | attribution, not freshness. `[cultural-vocab]` closes it by name alone; a specific named technique still owes a URL (`check_writing.md §6`). |

The layer split is what stops the block manufacturing false debt across a 23-lecture corpus. Most lecture prose is `vision`. Mark it and move on.

### 3 · Sources

The `source-freshness-format.md` stamp, verbatim — same grammar, same result vocabulary, same script (`source-freshness.sh`). Prefixed with the claim-id it backs so the join is greppable both directions:

```
- <source-id> `[checked:YYYY-MM-DD result:RESULT due:DUE]` <url> — [type-label] <what it backs>. kb:<path> fallback: <reframe>.
```

**`kb:` — the reverse edge.** Optional. When the claim is grounded in a file under `continuous-research/`, name it: `kb:observations/intercom.md`. `node scripts/validate-backing.js --kb-index` inverts these into *which lectures depend on which KB file*, so a platform-watch cycle that moves `by-pattern/absorption-bottleneck.md` can see what it just moved the ground under. Research → curriculum has been the weak direction; this is the join that makes it checkable.

The edge is held on this side deliberately. `continuous-research/` ships under its own licence and stays free of curriculum references (`.claude/skills/lecture-ooda/SKILL.md` § Deposit). Findings deposited there stand as research on their own terms.

**Foundational-literature variant — `due:none`.** A canonical paper does not expire. Saltzer & Schroeder 1975, Ashby 1956, Conant–Ashby 1970, Argyris on double-loop: the claim *"this framework says X"* is fixed by publication. Stamp `result:OK due:none`. Re-verify only if the body's *reading* of the framework changes. Applying the 6-month window here would flag a 50-year-old citation `STALE`, which is an artifact of the rule, not a defect in the material.

Freshness applies to what *moves*: deployment numbers, adoption rates, platform capability, who-currently-thinks-what. Not to what was published once and stayed published.

The maintainer-attested (`result:ATTESTED due:none`) and capability (`due:cohort`) variants carry over unchanged.

### 4 · Frameworks

The borrow ledger. One line per imported framework:

```
- <name> · [borrow:<parent field>] · law:<theory-plan law name> · ← <source-id | cultural-vocab>
```

- **`law:`** keys to `theory-plan.md`'s inventory **by law name, never by section number** — numbers drift on restructure (`check_writing.md`, belief-reference rule). `law:none` when the framework is riffed on but anchors no banked law.
- This field is the join `theory-plan.md` has never had. Every ★ backbone law should be reachable from at least one lecture's `law:` key; a law with no reachable lecture is theory with no delivery, and a `law:` key matching no banked law is a lecture citing a spine that isn't there. The linter reports both directions.

### 5 · Stance + OODA

The new register, and the OODA's write target.

```
Stance `[stance:YYYY-MM-DD level:L<n>]`
- holds: <what the field currently converges on, one or two lines>
- contested: <what is not settled, or `nothing material`>
- would-move-it: <the observation that would change the lecture>

OODA
- question: <the standing research question for this file>
- roster: <slice of source-roster.md to hunt — names, not topics>
- last-run: YYYY-MM-DD | never
```

- **`level:`** from the evidence ladder (`research-rules.md`) — `L0`–`L4`. No new vocabulary.
- **`would-move-it:`** is the field that earns the block. A stance with no falsifier is a preference. It also gives the OODA its stopping condition: hunt for *that*, not for "anything new."
- **`roster:`** names people, per the people-first method (`continuous-research/CLAUDE.md`) — broad topic search is banned as a primary mode.

## Flagged — the OODA's outbox

An OODA run does not silently rewrite stance or body. It appends findings here; they clear when discussed and resolved.

```
Flagged
- `[found:YYYY-MM-DD]` <what changed, one line> → <the discussion it forces>
```

Cleared on resolution — resolved items leave no residue (`check_writing.md §3`: rules are rules, history is git). An empty `Flagged` list is deleted, not kept as a stub.

## Auto-degrade

Touch-based, inherited from the stamp format. Editing a body phrase that appears as a claim `anchor` degrades that claim's sources to re-check — the pin may no longer match the prose. Editing body prose no anchor quotes does not. The `Flagged` list is not degraded by anything; only resolution clears it.

## Audit

- `node scripts/validate-backing.js [paths…]` (`npm run audit:backing`) — structural: region well-formed, every `detail` claim has ≥1 source id or `[SOURCE NEEDED]`, every source id cited by a claim or a framework, every `law:` key resolves against `theory-plan.md`, `Frameworks riffed on:` / `Source verification` legacy blocks fully migrated. Exit 1 on ERROR. Reports ★ backbone laws no block reaches as INFO — theory with no delivery.
- `source-freshness.sh --target <cohort-date>` — unchanged, still owns date semantics. The stamps moved house; the script does not care.
- Stance staleness is a WARN, not a BLOCK: a `[stance:…]` older than 6 months on a file whose subject moves means the OODA is overdue, not that the material is wrong.
