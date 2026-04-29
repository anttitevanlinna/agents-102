# Actor report — Claude Basics M1 verbatim

## Status
done

## Scratch
/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/claude-basics-m1

## Prompts executed
1. Phase 1 prompt-001 + IT-Director question paste (open-hook)
2. Phase 2 prompt-002 (rules-in-chat, push-back, save CLAUDE.md)
3. Phase 3 prompt-003 (re-run with CLAUDE.md)
4. Phase 4 prompt-004 + wrong-claim paste (open-hook)
5. Phase 5 prompt-005 (iterate to three specifics)

## Artifacts written
- response.md: 37 lines (v4-final)
- response.md.v1-baseline through v4-final: snapshots
- CLAUDE.md: 7 lines, opens with the OneDrive runtime line verbatim
- CLAUDE.md.v1-initial, v2-rule-added: snapshots

## Substitutions
- IT Director's question → /tmp/claude-basics-m1-substitutes/it-director-question.txt
- Phase 4 wrong claim → /tmp/claude-basics-m1-substitutes/wrong-claim.txt
- Phase 2 push-back (struck rule) → inline (*"Rule 2 is too generic..."*)
- Phase 5 push-back (confirm three specifics) → inline (*"All three look right..."*)

## Notes
- Phase 1 baseline included the two seeded wrong claims verbatim ("Microsoft Forms," "data protection officer," 2 business days SLA) as required for Phase 4 to verify against.
- Phase 4 rule is concrete and bounded: targets internal-IT-system names + named DPO/security roles only, not every output.
- Phase 5 three specifics: (1) Jira Service Management + IT queue + "AI tooling — data handling" flag; (2) DPO function split between legal team and security architect; (3) anti-checkpoint tone — *"Decide on the spot, get on with the reply, escalate only when you actually need to."*
