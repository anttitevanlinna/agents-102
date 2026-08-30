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
- `[checked:2026-05-21 result:OK due:2026-10-16]` https://ideas.fin.ai/p/2x-nine-months-later — [practitioner direct, vendor venue] Curran (pub 2026-04-16) 19.2% auto-approve / 14.6 vs 75.8 min / 86% ≤20 lines / 500-person R&D. fallback: drop the %, say "double-digit auto-approve at a 500-person org".
```

Fields:

- **`checked:`** `YYYY-MM-DD` the source was last opened (or capability live-tested), or `never` if not yet checked. For an attested source, the date the maintainer witnessed it.
- **`result:`** one of the vocab below.
- **`due:`** next-verify date. Default = the source's **publication date** + 6 months (the §2 freshness window) — *not* `checked` + 6 months, which would hand a five-month-old post a fresh year every time someone re-opens it. Where a `continuous-research/` file already stamps the same URL, inherit its `due` and its type-label rather than recomputing; diverge only toward the tighter date, with the reason on the line. `cohort` = always re-test at delivery regardless of window (use for capability claims and anything that moves quarterly). `never`-checked sources carry `due:asap`. `none` = a permanent dated fact that does not expire (a maintainer-attested observation, a court ruling that happened) — clean, never flagged.
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

## Durable-account variant (`due:none` for a completed event someone reported first-hand)

The variant above says the load-bearing thing and then scopes it too narrowly: *a dated eyewitness fact does not expire the way a vendor metric does; it happened.* That is true of **any** named practitioner's first-hand account of a completed event, not only the maintainer's. A run that took ten hours took ten hours. A port that shipped, shipped. The event is fixed by having occurred, and re-reading the post in six months will not change it.

So the 6-month window is **not** a property of a source's age. It is a property of **what the source is being asked to prove**:

| what you are citing it for | expires? |
|---|---|
| *This specific thing happened, this way, to this named person* | **No** — `due:none`. It happened. |
| *This is what the field currently does / believes / achieves* | **Yes** — 6 months, no exceptions. |

Both readings can come off the same post, which is why the discipline lives in the **body sentence**, not the stamp. Ronacher's MiniJinja port is the worked example: *"Ronacher ported MiniJinja in about ten hours of agent time, reusing the Rust snapshot tests as the reference to diff against"* is durable and citable indefinitely, dated in body. *"Engineers run ten-hour ports"* is a currency claim about present practice and needs in-window backing whatever post it leans on.

```
- `[checked:2026-08-01 result:OK due:none]` https://lucumr.pocoo.org/2026/1/14/minijinja-go-port/ — [practitioner direct] Ronacher, 14 Jan 2026. Durable account: ~10h agent time (3h supervised), 2.2M tokens, lexer→parser→runtime, Rust snapshot tests reused as the diff reference. Cite dated, as an account. Do NOT cite as evidence of what is typical today.
```

**Three conditions, all required.** Miss one and the ordinary window applies:

1. **First-hand.** The person did the thing and wrote it up. A journalist's write-up, a digest, or a vendor's summary of a customer is not a durable account — it is a report about one, and reports rot.
2. **A specific completed event**, with enough detail to be checkable. Not a practice, a trend, a rate, or an opinion. *"I ran X and here is what happened"*, not *"teams are finding that…"*.
3. **Cited as an account and dated in body.** The date is what stops a durable fact quietly becoming a currency claim. An undated ten-hour port reads as *this is what happens now*, which is the thing the window exists to prevent.

**What this does not license.** Numbers about populations (adoption %, failure rates, throughput deltas), platform capability, pricing, benchmark scores, and who-currently-believes-what all keep the 6-month clock even when a named practitioner reports them first-hand — because those are claims about a moving world that happen to have been observed once. The test is not *"is it first-hand?"* but *"would re-checking it next year change the answer?"*

**`due:none` scopes the citation, not the source. One URL doing two jobs needs two stamp lines.** This is the variant's sharp edge, and it drew blood within hours of the rule landing. Before writing `due:none`, say in one clause what the stamp is durable *for*, then read the body against that clause. If any body sentence uses the source for a **live position** — *this camp exists*, *this is the current stance*, *practitioners do this* — that sentence is a currency claim and owes its own stamp with a real `due` date, even though the same URL backs both.

The worked failure. Amp's handoff launch was stamped `[checked:2026-05-25 result:OK due:none]`, anchored *"rejects auto-compaction, bets on focused threads + manual handoff,"* with `fallback: escalate to a fresher Amp post if the stance shifts.` Amp reversed on 2026-05-06 — *"So handoff is out. Compaction is in"* — and the lecture taught the handoff camp in the present tense for three months while the stamp stayed audit-clean the whole time. Two jobs, one `due` field: *what Amp shipped and argued on 2025-10-23* is durable and never expires; *the handoff camp is a live position* is a claim about a moving world. `due:none` answered the first and silenced the second.

**Free diagnostic: a `due:none` stamp whose `fallback:` says "escalate if X changes" is a defect on sight.** Nothing re-opens a `due:none`. That fallback is a standing order addressed to a process that will never run. Either the claim needs a real date, or the fallback is describing a job nobody holds.

**Why this is a tightening as much as a loosening.** Under the old rule a stale-but-durable account got quietly swapped or dropped at cohort time, and the swap was where accuracy went — a fresher post with a weaker fit replaced a perfect example for no reason but its date. It also generated busywork the maintainer correctly resented, which is how a rule stops being obeyed at all. The trade is: keep the good example forever, and pay for it by dating it in body every time.

## Auto-degrade

Touch-based, like Quality. Editing a body claim a stamp backs degrades that stamp's `result` to `never`/re-check (the source pin may no longer match the prose). Editing prose elsewhere in the file does not. The honest move on a claim edit: re-open the source and re-stamp.

## Trigger

- Before a cohort runs the module (the `- cohorts:` row gains an entry), run `source-freshness.sh --target <cohort-date>` over the module's files; no BLOCK = source-clean.
- Within the 6-month window of any scheduled cohort, re-run against that date.
- `/research-review` and the `freshness-checker` agent remain the deep workers that open URLs and propose the stamp; the script is the cheap index over what they recorded.
