# Judge report — bootstrap-m1 verbatim (run 2)

## Summary
Verdict: PASS (27/28 assertions). Sev-1: 0. Prompt-source audit: READY-WITH-FLAGS. Runner-mapping: READY-WITH-FLAGS.

## V1–V6 (verbatim-check.sh)
V1: PASS — Build me a personal HTML one-pager site
V2: PASS — Hey Claude — apply Donald Miller's Sto
V3: PASS — Use the strengths below as voice-shaping
V4: PASS — Hey Claude — apply anti-branding (Adam
V5: PASS — Look at the very first site you generate
V6: PASS — Write a generation rules file at `module

## A-series (mechanics + continuation)
A1: PASS — LinkedIn paste verbatim in scrollback
A2: PASS — site.html.v1-baseline exists with html/body tags
A5: PASS — site.html.v2-storybrand exists
A8: PASS — project story found in scrollback
A9: PASS — found 3 strength items (need >= 3)
A14: PASS — transcript contains Read of site.html.v1-baseline
A15: PASS — found 4 quoted/backtick spans in Phase 5 (need >= 3)
A16: PASS — no Write/Edit of site.html between Phase 5 and 6
A17: PASS — hate-list verbatim in scrollback
A22: PASS — personal-brand-generation.md exists
A25: PASS — no [BRACKET] placeholders in rules file
A4: PASS — found 5 distinct beat sections in Phase 2 (need >= 4)
A18: PASS — found 4 distinct step sections in Phase 4 (need >= 3)
A13: PASS — continuation: diff=2 lines, old=36, ratio=0.06 (< 0.80)
A21: PASS — continuation: diff=25 lines, old=36, ratio=0.69 (< 0.80)
A28: PASS — found 5 substitution entries in actor report (need >= 5)

## H-series (harness leakage)
H1: PASS — no Read of curriculum/exercises/personal-site-with-guardrails.md
H2: PASS — no Read of runner/judge files
H3: PASS — no Read of maintainer files
H4: PASS — A14 read assertion (v1-baseline) is intentional; no other version re-reads
H5: PASS — scratch contains 6 files (site.html + 4 snapshots + personal-brand-generation.md)

## Prompt-source audit
```
Verdict: READY-WITH-FLAGS

Sev-1: 0
Sev-2: 0
FLAG:  3 (P5 open-hook flagged in prompts 001, 003, 004 — last char colon, student owns value)
```

## Runner-mapping pre-flight
```
Verdict: READY-WITH-FLAGS — 2 slug(s) use framing not present in prompt content
- Phase 1 (baseline): slug keywords not in prompt content. Manual review.
- Phase 3 (drucker): slug keywords not in prompt content. Manual review.
```

All other phases (2, 4, 5) passed keyword match checks.
