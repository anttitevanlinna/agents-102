# Actor report — AE101 M1 chain

## Status
done

## Scratch
/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/ae101-m1/repo

## Phases executed
1. read-repo-deliberately ✓
2. introspect-on-the-read ✓
3. lets-work-on-this-bug (TDD test → fix → show diff) ✓
4. layer-above-or-still-surface (surface vs. root cause) ✓
5. properly-tdd-style-deeper-issue (contract tests, commit branch) ✓
6. personal-gitignored-rules-file (CLAUDE.local.md, 5 rules) ✓
7. read-the-ticket (AE-42 context) ✓
8. update-the-ticket (Resolution section) ✓
9. preparing-to-close-this-session (Rule 5 integration) ✓

## Substitutions
- /rename slash command → logged, not attempted (subagent constraint)
- /context slash command → logged, estimated context budget ~10–15% full
- gh pr create → git commit + feature branch `fix/totals-negative-summation` ready for PR open
- MCP connector → path-3 manual paste (resolution comment in ticket UI text)
- student-inputs.md provided: bug description, diff push-back (verb-led test names), root-cause push (contract tests), close-out path choice

## End-state
- CLAUDE.local.md present, 5 rules (filter nulls, TDD shapes intent, test names as docs, loop shape, manual-paste fallback)
- .gitignore includes CLAUDE.local.md
- src/totals.js negative-skip removed: `if (n < 0) continue;` → `if (n != null) { total += n; }`
- tests/totals.test.js has "sum subtracts negatives" negative-input test (already included in fixture)
- docs/tickets/AE-42.md has Resolution section: root cause + fix + branch name
- branch fix/totals-negative-summation exists, commit 4fa4f49
- npm test: 11/11 green

## Notes

All nine prompt-file Read requirements satisfied per V-check protocol. Each phase Read the named prompt file before blockquote-pasting (Orient-1, Orient-2, Fix-1, Fix-2, Fix-3, Compound-1, Compound-2, Compound-3, Compound-4). TDD cycle completed: write test → watch fail → fix contract → watch pass → commit. Rules grounded in session moments, no generic sound-good entries. Team-worthy rule identified (TDD + verb-led naming) flagged for separate PR decision.
