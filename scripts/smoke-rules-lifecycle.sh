#!/usr/bin/env bash
# smoke-rules-lifecycle.sh — end-to-end smoke of the rules layer after it moved
# to the agents-102-core repo. Three stages:
#   A. loading    — live core, read-only: locate, T0, surface → T1, T2 rule.js, index fresh
#   B. compound   — SCRATCH copy of core (AGENTS_CORE_DIR): write an entry, amend a
#                   compendium, see the index go stale, rebuild, see the new rule load,
#                   repin a scratch ledger and see the drift
#   C. evals      — deterministic eval machinery: queue, cards, class brief, bench scorer
# The LLM half (one judge dispatch) is not here; it costs a model call.
# Nothing in the live core or the repo is written. Exit 1 on the first failure.
set -uo pipefail
REPO="$(cd "$(dirname "$0")/.." && pwd)"
S="$REPO/curriculum/evals/scripts"
LIVE_CORE="${AGENTS_CORE_DIR:-$(cd "$REPO/.." && pwd)/agents-102-core}"
T=$(mktemp -d); trap 'rm -rf "$T"' EXIT
pass=0
step(){ if ( eval "$2" ) >"$T/out" 2>&1; then echo "  ok   $1"; pass=$((pass+1)); else echo "  FAIL $1"; sed 's/^/       /' "$T/out" | head -8; exit 1; fi; }
cd "$REPO"

echo "A. rule loading (live core: $LIVE_CORE)"
step "core located, compendia present" '[ "$(node -p "require(\"$S/compendium-drift.js\").MEM")" = "$LIVE_CORE/memory" ] && ls "$LIVE_CORE"/memory/check_*.md >/dev/null'
step "T0 diamond index exists" 'test -s "$LIVE_CORE/memory/_index/diamond.md"'
step "session-start hook: pre-flight, index not stale" 'out=$(echo "{}" | CLAUDE_PROJECT_DIR="$REPO" "$LIVE_CORE/project-claude/hooks/session-start.sh") && grep -q "pre-flight" <<<"$out" && ! grep -q STALE <<<"$out"'
step "surface detector → T1 leads that exist" 'out=$(echo "{\"prompt\":\"rewrite the lecture intro for students\"}" | CLAUDE_PROJECT_DIR="$REPO" "$LIVE_CORE/project-claude/hooks/surface-detector.sh") && leads=$(grep -o "_index/[a-z_]*\.leads\.md" <<<"$out" | sort -u) && [ -n "$leads" ] && for l in $leads; do test -s "$LIVE_CORE/memory/$l" || exit 1; done'
step "T2 rule.js returns a rule body" 'node "$S/rule.js" writing 1 | grep -q "Banned words"'
step "rule index fresh" 'node "$S/build-rule-index.js" --check'

echo "B. compound lifecycle (scratch core)"
export AGENTS_CORE_DIR="$T/core"; mkdir -p "$T/core"; cp -R "$LIVE_CORE/memory" "$T/core/memory"
M="$T/core/memory"; cp "$REPO/curriculum/evals/compendium-pins.json" "$T/pins.json"
N=$(grep -oE '^[0-9]+\. \*\*' "$M/check_writing.md" | cut -d. -f1 | sort -n | tail -1); NEW=$((N+1))
step "scratch core is what tools read" '[ "$(node -p "require(\"$S/compendium-drift.js\").MEM")" = "$M" ]'
step "compounded entry written, schema fields valid" 'cat > "$M/compounded/2099-01-01-writing-smoke-test.md" <<EOF
---
type: correction
surface: writing
severity: low
violates_rule: ""
proposed_compendium_amendment: "(add to check_writing.md): smoke-test rule"
---
# Smoke test entry
EOF
f="$M/compounded/2099-01-01-writing-smoke-test.md"; for k in type surface severity; do v=$(grep -m1 "^$k:" "$f" | cut -d" " -f2); sed -n "/^$k:/,/^[a-z_]*:/p" "$M/compounded/_schema.yaml" | grep -qw -- "$v" || exit 1; done'
step "amend check_writing.md with rule $NEW" 'printf "\n%s. **Smoke-test rule.** Never write the word zyzzyva in body prose.\n" "$NEW" >> "$M/check_writing.md"'
step "index now reported STALE (fails closed)" '! node "$S/build-rule-index.js" --check'
step "session-start hook warns STALE" 'echo "{}" | CLAUDE_PROJECT_DIR="$REPO" "$LIVE_CORE/project-claude/hooks/session-start.sh" | grep -q STALE'
step "rebuild index" 'node "$S/build-rule-index.js"'
step "index fresh again" 'node "$S/build-rule-index.js" --check'
step "T2 loads the new rule" 'node "$S/rule.js" writing "$NEW" | grep -q zyzzyva'
step "T1 writing leads carry the new rule" 'grep -q "Smoke-test rule" "$M/_index/writing.leads.md"'
step "drift detected against scratch ledger" '! node "$S/compendium-drift.js" --check --ledger "$T/pins.json"'
step "repin scratch ledger → drift clears" 'node "$S/compendium-drift.js" --repin --ledger "$T/pins.json" && node "$S/compendium-drift.js" --check --ledger "$T/pins.json"'
unset AGENTS_CORE_DIR
step "live core untouched" '! grep -q zyzzyva "$LIVE_CORE/memory/check_writing.md" && [ -z "$(git -C "$LIVE_CORE" status --porcelain -- memory)" ] && [ -z "$(git -C "$REPO" status --porcelain -- curriculum/evals/compendium-pins.json)" ]'
step "core autocommit hook tests" 'bash "$LIVE_CORE/project-claude/hooks/test-core-autocommit.sh"'

echo "C. eval machinery (deterministic)"
step "eval queue builds (ae101)" 'node "$S/eval-queue.js" --training ae101 --json | node -e "JSON.parse(require(\"fs\").readFileSync(0))"'
step "open cards read" 'node "$S/open-cards.js" --training ae101'
step "class brief builds from core rules (gitignored cache)" 'b=$(node "$S/derive-class-brief.js" curriculum/evals/bench/fixtures/writing-5plant.md writing | grep -o "^curriculum/evals/body-views/[^ ]*") && grep -q "rules kept=[1-9]" <(node "$S/derive-class-brief.js" curriculum/evals/bench/fixtures/writing-5plant.md writing) && grep -q check_writing "$b"'
step "body view derives" 'node "$S/derive-body-view.js" curriculum/evals/bench/fixtures/writing-5plant.md | grep -q body'
step "bench scorer scores a stored run" 'node "$S/judge-bench.js" --score curriculum/evals/bench/runs/v3-both.instance.json --fixture writing-5judge'

echo "smoke-rules-lifecycle: $pass passed"
