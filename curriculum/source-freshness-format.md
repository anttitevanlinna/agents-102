# Source-freshness stamp format

Canonical spec for the per-source freshness stamp. Sibling of `quality-format.md`: Quality stamps code-readiness, this stamps **source-readiness**. Loaded by `source-freshness.sh`, `/research-review`, and any session touching a `Source verification` maintainer block. Pointer from `check_research_claims.md §11`.

**Problem it kills.** §11 source-verification blocks were a *to-do list* ("verify X before cohort") with no slot for "verified X, on this date, result R, next due D." So every cohort re-verifies from scratch and the debt gets re-narrated in `pre-cohort-todos.md`. The stamp is the missing primitive: a per-source ledger line, co-located with the citation, greppable. Bookkeeping, not more verification.

## The stamp

One line per source, inside the file's `Source verification` maintainer block. Grammar:

```
- `[checked:YYYY-MM-DD result:RESULT due:YYYY-MM-DD]` <URL-or-claim-id> — [type-label] <claim-anchor>. fallback: <reframe>.
```

Worked example:

```
- `[checked:2026-05-21 result:OK due:2026-11-21]` https://ideas.fin.ai/p/2x-nine-months-later — [practitioner direct, vendor venue] Curran 19.2% auto-approve / 14.6 vs 75.8 min / 86% ≤20 lines / 500-person R&D. fallback: drop the %, say "double-digit auto-approve at a 500-person org".
```

Fields:

- **`checked:`** `YYYY-MM-DD` the source was last opened (or capability live-tested), or `never` if not yet checked. For an attested source, the date the maintainer witnessed it.
- **`result:`** one of the vocab below.
- **`due:`** next-verify date. Default = `checked` + 6 months (the §2 freshness window). `cohort` = always re-test at delivery regardless of window (use for capability claims and anything that moves quarterly). `never`-checked sources carry `due:asap`. `none` = a permanent dated fact that does not expire (a maintainer-attested observation, a court ruling that happened) — clean, never flagged.
- **`<URL-or-claim-id>`** the URL; or a short `claim-id` for a no-URL convergent-pattern claim (e.g. `convergent:subagents-for-isolation`); or an `attested:<who> <date> <context>` token for a maintainer first-hand observation (see below).
- **`[type-label]`** from the `check_research_claims.md §1` taxonomy (`[practitioner direct]`, `[practitioner analysis]`, `[cultural-vocab]`, `[vendor press release]` …).
- **`<claim-anchor>`** the number / quote / framework this source backs — what breaks if it doesn't hold.
- **`fallback:`** the reframe if it doesn't hold (the §11(3) requirement, now inline with the stamp).

## Result vocabulary

Reused from the 2026-04-25 legacy verification report shape.

| result | meaning | severity at audit |
|---|---|---|
| `OK` | opened, byline + claim + freshness all hold | clean (warns only if `due < target`) |
| `ATTESTED` | maintainer's own first-hand observation — primary evidence, no URL required (see below) | clean (never flagged) |
| `CAVEAT` | holds with a known caveat (vendor-self-reported number, soft byline) — accepted as-is | INFO |
| `CORRECT` | drifted — body claim needs a fix (wrong byline, wrong number, mis-attributed framework) | **BLOCK** |
| `GONE` | URL 404 / removed / relocated | **BLOCK** |
| `STALE` | past the 6-month window and used as current evidence | **BLOCK** (unless body dates it as historical) |
| `NEEDED` | claim has no source pinned yet (`[SOURCE NEEDED]`) | **BLOCK** |
| `BLOCKED` | couldn't open (paywall / 403 / login) — verification deferred, NOT a content defect | INFO (carry the last-known date) |

`BLOCKED` ≠ `GONE`. A paywalled-but-live source is `BLOCKED`; a dead link is `GONE`. Never invent content for a `BLOCKED` source — stamp it and move on.

## Audit semantics

`source-freshness.sh --target YYYY-MM-DD [paths…]` — `--target` is the **cohort date**, not today. The question is *"will this be stale by the time the room sees it?"*, not *"is it stale now?"*

Flagging:
- **BLOCK** — `result ∈ {CORRECT, GONE, STALE, NEEDED}` or `checked:never`. Must clear before the cohort.
- **WARN** — `due < target` (will expire before delivery) or `due:cohort` (routine pre-delivery re-test). Re-verify, then re-stamp.
- **INFO** — `result ∈ {CAVEAT, BLOCKED}`. Known, accepted; surfaced for awareness.

Exit nonzero if any BLOCK. The script *generates* the punch list that `pre-cohort-todos.md` used to narrate by hand.

## Capability-claim variant (unified scope)

A Claude Code capability/UI/behavior claim is just a source whose "URL" is the docs page and whose "open" is a **live test**. Same stamp; `due:cohort` (platform ships mid-year, always re-test); `result:OK` means the behavior was reproduced, `CORRECT` means it changed. This retires the `capability-freshness.md` stub — one machine, two source-kinds.

```
- `[checked:2026-05-15 result:OK due:cohort]` https://code.claude.com/docs/en/hooks — [capability] Hooks fire on every named event (SessionStart/UserPromptSubmit/Pre|PostToolUse/Stop). live-tested against this repo's .claude/settings.json. fallback: inline the event list from a re-test.
```

## Maintainer-attested variant (the author's own word is a source)

The curriculum maintainer is a named practitioner — Agentics Helsinki member, trained 200+ engineers, author of Agents 101. His first-hand observation (a demo he watched, a run he drove, a meetup he sat in) is **`[practitioner direct]` — the best evidence on the ladder.** The practitioner just happens to be us. A first-hand observation does **not** need a third-party URL, and is **never** `NEEDED`/`[SOURCE NEEDED]`. This parallels the `[cultural-vocab]` carve-out in `check_research_claims.md §1`: a legitimate source class that closes the tracker without a URL.

```
- `[checked:2025-09-02 result:ATTESTED due:none]` attested:Antti 2025-09-02 Agentics-Helsinki-meetup — [maintainer-attested] demos showing ~500K lines shipped in weeks. fallback: "hundreds of thousands of lines" if a tighter figure is wanted, but the number stands on the maintainer's word.
```

- **`checked:`** = the date witnessed. **`attested:<who> <date> <context>`** replaces the URL: who saw it, when, where.
- **`due:none`** — a dated eyewitness fact does not expire the way a vendor metric does; it happened. (If the claim is phrased as *"what's possible now,"* date it in the body so it reads as the historical anchor it is — that's a body-phrasing duty, not a re-verification one.)
- The `fallback:` is the maintainer's *option* to soften, not an instruction to. **Do not soften or strip an attested number to chase a URL.** The whole point of this variant is that the system trusts the author's word; demanding a citation for what he saw with his own eyes would trust a random vendor blog (it has a URL) over the eyewitness who runs the community (he doesn't).

Attestation is an honesty contract, not a loophole: `attested:` names a real person who really saw it and can be asked. It is for the maintainer's own observations, not for laundering an unsourced claim into trustworthiness.

## Auto-degrade

Touch-based, like Quality. Editing a body claim a stamp backs degrades that stamp's `result` to `never`/re-check (the source pin may no longer match the prose). Editing prose elsewhere in the file does not. The honest move on a claim edit: re-open the source and re-stamp.

## Trigger

- Before a cohort runs the module (the `- cohorts:` row gains an entry), run `source-freshness.sh --target <cohort-date>` over the module's files; no BLOCK = source-clean.
- Within the 6-month window of any scheduled cohort, re-run against that date.
- `/research-review` and the `freshness-checker` agent remain the deep workers that open URLs and propose the stamp; the script is the cheap index over what they recorded.
