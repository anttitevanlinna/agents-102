# Synthetic persona kit — Agents 101 tmux-runner

Agents 101 is **participant-provided**: the student brings their own LinkedIn
profile, a live work challenge, company wiki/docs, a calendar, a teammate to
interview (M7), a roomful of peers (M8). That is why no mechanical runner
existed — there is no SUT, there is a *person*.

This kit is the synthetic stand-in for that person: the "lemmings of A101".
Build it once, version it, and the harness drives the A101 student experience
deterministically against it. Everything here is **fictional**. No real
prospect, company, or person. Safe to commit, safe to send to Claude.

## The persona

**Ingrid Solberg** — VP Product Operations at **Nordveil**, a mid-size Nordic
fleet-dispatch SaaS (≈180 people, Oslo + Tampere). Eight years scaling ops in
logistics software; ex-consultant; the person who owns the unglamorous machine
that turns a signed contract into a live customer.

**Her live challenge (the M2 spine):** Nordveil's revenue is stalling on the
per-seat model — dispatchers share logins to dodge seat costs, so seat
expansion has flatlined while *usage* keeps climbing. Leadership wants to move
to **usage-based pricing** (priced on dispatched routes) and pilot it with 8
accounts in Q3. Ingrid owns the decision and the rollout. It is open, it is
hers, and real work ships from it — passes the `name-your-challenge` two tests.

## The synthesis seam (deliberate)

The five `sources/` files (steer: keep it ~5) carry **overlap** and **one real
contradiction**, so M2 curation and M3 synthesis have something to bite on
rather than a corpus that trivially agrees with itself:

- `web/usage-based-pricing-playbook.md` argues usage-based **lifts** net revenue
  retention (the leadership thesis).
- `web/usage-pricing-churn-warning.md` argues usage-based drives **bill-shock
  churn** in SMB accounts — the direct counter.
- `docs/q2-revenue-review.md` and `wiki/pilot-cohort-notes.md` carry the
  internal data that *both* outside articles can be read against — and the
  pilot cohort is SMB-heavy, which is what makes the contradiction load-bearing
  rather than academic.

## File map

| File | Stands in for | Used by |
|---|---|---|
| `linkedin-profile.md` | Student's LinkedIn page (copy-all wall of text) | M1 personal-site Phase 1 |
| `m1-inputs.md` | Strengths + hate-list + free-iteration answers | M1 Phases 2–6 (scripted replies) |
| `challenge-seed.md` | The challenge in the student's head | M2 opener interview (scripted answers) |
| `meetings-week.md` | Calendar week view | Prework meetings summary (raw; render to PNG for screenshot path) |
| `sources/wiki/pricing-strategy-2026.md` | Internal wiki page | M2 curate/ingest; M3 synthesis |
| `sources/wiki/pilot-cohort-notes.md` | Internal wiki page | M2 curate/ingest; M3 synthesis |
| `sources/docs/q2-revenue-review.md` | Office365 doc | M2 curate/ingest; M3 synthesis |
| `sources/web/usage-based-pricing-playbook.md` | Practitioner article (pro) | M2 compound (Phase 3); M3 synthesis |
| `sources/web/usage-pricing-churn-warning.md` | Practitioner article (con) | M2 compound (Phase 3); M3 synthesis |

The scenarios feed these as prompt tails / literal `*` answer turns. Sources
are seeded into the training dir by `arrange-agents-101.sh`, NOT typed by the
session (the exercise rule is "the agent does the ingestion, you never paste").
