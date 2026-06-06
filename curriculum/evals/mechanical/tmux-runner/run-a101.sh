#!/usr/bin/env bash
# run-a101.sh — drive Agents 101 (prework | m1 | m2) end-to-end against the
# synthetic persona kit. One parameterized runner, not three near-copies.
#
# Agents 101 has no code SUT — it has a *person*. The synthetic persona kit
# (fixtures/agents-101-synthetic/) stands in: Ingrid Solberg, VP Product Ops at
# the fictional Nordveil, deciding usage-based pricing. The training directory
# is a SINGLE growing folder (not per-module worktrees like AE101/lemmings).
# Each module runs in a FRESH claude session at the same cwd; artifacts
# compound on disk.
#
# Token substitution: scenarios reference synthetic-case tokens (<LINKEDIN>,
# <MATERIAL_DIR>, <M2_CHALLENGE>, ...). This runner expands them from the
# persona kit before sending — keeps multi-line synthetic answers out of the
# one-line-per-turn scenario format, and keeps the prompt bodies pristine in
# the registry (resolve_prompt strips frontmatter; tails carry the case).
#
# Per-turn artifact assertions (check_platform_and_boundaries.md § 16a):
# sentinel completion proves the turn finished, not that the artifact landed.
# A101 deliverables are knowledge artifacts (memory/, agents/, CLAUDE.md,
# rules files) not git commits — so assertions are file-exists + grep-evidence
# + mtime-advanced, not new-commit/tree-hash.
#
# Usage: run-a101.sh --module {prework|m1|m2} [--cwd DIR] [--material DIR]
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$HERE/lib/resolve-prompt.sh"
source "$HERE/lib/tmux.sh"
source "$HERE/lib/sync.sh"
source "$HERE/lib/assertions.sh"

KIT="$HERE/fixtures/agents-101-synthetic"
module=""
sut_cwd="$HOME/Documents/agents-101-runner"
material_dir="$HOME/Documents/agents-101-runner-material"
while [[ $# -gt 0 ]]; do
  case "$1" in
    --module)   module="$2"; shift 2 ;;
    --cwd)      sut_cwd="$2"; shift 2 ;;
    --material) material_dir="$2"; shift 2 ;;
    *) echo "unknown arg: $1" >&2; exit 2 ;;
  esac
done

case "$module" in
  prework|m1|m2|m3|m4a|m4b|m5|m6) ;;
  *) echo "usage: $0 --module {prework|m1|m2|m3|m4a|m4b|m5|m6} [--cwd DIR] [--material DIR]" >&2; exit 2 ;;
esac
[[ -d "$sut_cwd" ]]      || { echo "missing training dir: $sut_cwd (run arrange-agents-101.sh first)" >&2; exit 2; }
[[ -d "$material_dir" ]] || { echo "missing material dir: $material_dir (run arrange-agents-101.sh first)" >&2; exit 2; }

scenario="$HERE/scenarios/a101-$module.txt"
[[ -f "$scenario" ]] || { echo "missing scenario: $scenario" >&2; exit 2; }

# A101 turns are all tool-heavy (file writes, fetch, subagents) with no human
# to approve. Force a permissive mode. bypassPermissions is banned (startup
# dialog hangs the runner — README § Env knobs).
CLAUDE_CMD="${CLAUDE_CMD:-claude --permission-mode auto}"

run_id="$(date +%Y%m%d-%H%M%S)-$$"
export RUNNER_TMUX_SOCKET="runner-$run_id"
run_dir="$HERE/out/a101-$module-$run_id"
sentinel_dir="$run_dir/sentinels"
mkdir -p "$sentinel_dir"

session="runner-$run_id"
warmup="${CLAUDE_RUNNER_WARMUP:-10}"
standard_timeout="${CLAUDE_RUNNER_TIMEOUT:-1800}"

# ---- Build substitution tokens from the persona kit ----------------------
strip_comments() { perl -0777 -pe 's/<!--.*?-->\s*//s' "$1"; }

LINKEDIN="$(strip_comments "$KIT/linkedin-profile.md")"
MEETINGS_FILE="$material_dir/meetings-week.md"
NEW_SOURCE="$material_dir/new/usage-pricing-churn-warning.md"
M1_PHASE2="$(cat "$KIT/answers/m1-phase2.txt")"
M1_STRENGTHS="$(cat "$KIT/answers/m1-strengths.txt")"
M1_HATELIST="$(cat "$KIT/answers/m1-hatelist.txt")"
M1_ITERATE="$(cat "$KIT/answers/m1-iterate.txt")"
M2_CHALLENGE="$(cat "$KIT/answers/m2-challenge.txt")"
M2_CURATION="$(cat "$KIT/answers/m2-curation-where.txt")"
M2_AGENT_SPEC="$(cat "$KIT/answers/m2-agent-spec.txt")"
M2_TASK="$(cat "$KIT/answers/m2-task.txt")"
M2_FINAL_Q="$(cat "$KIT/answers/m2-final-q.txt")"
NEW_SOURCE_M3="$material_dir/new-m3/usage-pricing-postmortems-2026.md"
M3_CRUX_STEER="$(cat "$KIT/answers/m3-crux-steer.txt")"
M3_WIKI_ANSWER="$(cat "$KIT/answers/m3-wiki-answer.txt")"
M3_DOCS_ANSWER="$(cat "$KIT/answers/m3-docs-answer.txt")"
M3_NET_ANSWER="$(cat "$KIT/answers/m3-net-answer.txt")"
M4_WHAT_MATTERS="$(cat "$KIT/answers/m4-what-matters.txt")"
M4_GRILL_ANSWERS="$(cat "$KIT/answers/m4-grill-answers.txt")"
M4_CHOSEN_RISK="$(cat "$KIT/answers/m4-chosen-risk.txt")"
M5_BRIEFING_SEED="$(cat "$KIT/answers/m5-briefing-seed.txt")"

# Replace a single token (literal, multi-line safe) in $1, echo result.
subst() {
  local body="$1"
  # answer/content tokens first (these may themselves contain path tokens)
  body="${body//<LINKEDIN>/$LINKEDIN}"
  body="${body//<M1_PHASE2>/$M1_PHASE2}"
  body="${body//<M1_STRENGTHS>/$M1_STRENGTHS}"
  body="${body//<M1_HATELIST>/$M1_HATELIST}"
  body="${body//<M1_ITERATE>/$M1_ITERATE}"
  body="${body//<M2_CHALLENGE>/$M2_CHALLENGE}"
  body="${body//<M2_CURATION>/$M2_CURATION}"
  body="${body//<M2_AGENT_SPEC>/$M2_AGENT_SPEC}"
  body="${body//<M2_TASK>/$M2_TASK}"
  body="${body//<M2_FINAL_Q>/$M2_FINAL_Q}"
  body="${body//<M3_CRUX_STEER>/$M3_CRUX_STEER}"
  body="${body//<M3_WIKI_ANSWER>/$M3_WIKI_ANSWER}"
  body="${body//<M3_DOCS_ANSWER>/$M3_DOCS_ANSWER}"
  body="${body//<M3_NET_ANSWER>/$M3_NET_ANSWER}"
  body="${body//<M4_WHAT_MATTERS>/$M4_WHAT_MATTERS}"
  body="${body//<M4_GRILL_ANSWERS>/$M4_GRILL_ANSWERS}"
  body="${body//<M4_CHOSEN_RISK>/$M4_CHOSEN_RISK}"
  body="${body//<M5_BRIEFING_SEED>/$M5_BRIEFING_SEED}"
  # path tokens last (expand any introduced by the answer files)
  body="${body//<MATERIAL_DIR>/$material_dir}"
  body="${body//<MEETINGS_FILE>/$MEETINGS_FILE}"
  body="${body//<NEW_SOURCE>/$NEW_SOURCE}"
  body="${body//<NEW_SOURCE_M3>/$NEW_SOURCE_M3}"
  printf '%s' "$body"
}

echo "[a101] module=$module cwd=$sut_cwd run=$run_id"
echo "[a101] launching: env CLAUDE_RUNNER_SENTINEL_DIR=$sentinel_dir $CLAUDE_CMD"
launch_cmd="env CLAUDE_RUNNER_SENTINEL_DIR=$sentinel_dir $CLAUDE_CMD"
pane_start "$session" "$sut_cwd" "$launch_cmd"
sleep "$warmup"

cleanup() {
  pane_capture_safe "$session" "$run_dir/transcript.txt" 10 || true
  pane_kill "$session"
}
trap cleanup EXIT

# ---- Assertions ----------------------------------------------------------
# Helper: at least N non-.keep files matching a glob under a dir.
count_real() { find "$1" -type f -name "$2" 2>/dev/null | grep -v '/\.keep$' | wc -l | tr -d ' '; }

assert_turn() {
  local mod="$1" seq="$2" t="$3" base="$4"
  case "$mod:$seq" in
    # ----- prework -----
    prework:1)
      local fail=0
      for sub in prework memory sources agents .claude module-4/policies; do
        [[ -e "$sut_cwd/$sub" ]] || { echo "[assert] FAIL prework T1: missing $sut_cwd/$sub" >&2; fail=1; }
      done
      [[ $fail -eq 0 ]] && echo "[assert] PASS prework T1: starter tree extracted"
      return $fail ;;
    prework:2)
      assert_file_exists "prework T2 snake" "$sut_cwd/prework/snake.html" || return 1
      assert_scrollback_grep "prework T2 snake is html" "$sut_cwd/prework/snake.html" '<canvas|<script|requestAnimationFrame|<html' ;;
    prework:3)
      assert_file_exists "prework T3 meetings" "$sut_cwd/prework/meetings.md" || return 1
      assert_scrollback_grep "prework T3 meetings content" "$sut_cwd/prework/meetings.md" 'pricing|standup|pilot|meeting|Mon|Tue' ;;

    # ----- m1 -----
    m1:1) assert_file_exists "m1 T1 site" "$sut_cwd/module-1/site.html" ;;
    m1:2) assert_file_mtime_advanced "m1 T2 site regen (StoryBrand)" "$sut_cwd/module-1/site.html" "$base" ;;
    m1:3) assert_file_mtime_advanced "m1 T3 site regen (strengths)" "$sut_cwd/module-1/site.html" "$base" ;;
    m1:4) assert_file_mtime_advanced "m1 T4 site regen (anti-branding)" "$sut_cwd/module-1/site.html" "$base" ;;
    m1:5) assert_or_warn assert_scrollback_grep "m1 T5" "$t" 'generic|statistical|default|could (apply|appear)|anyone' ;;
    m1:6) assert_file_mtime_advanced "m1 T6 free-iteration restyle" "$sut_cwd/module-1/site.html" "$base" ;;
    m1:7) assert_file_exists "m1 T7 generation rules" "$sut_cwd/module-1/personal-brand-generation.md" ;;
    m1:8) assert_file_mtime_advanced "m1 T8 rules-retro rewrite" "$sut_cwd/module-1/personal-brand-generation.md" "$base" ;;
    m1:9) assert_or_warn assert_scrollback_grep "m1 T9" "$t" 'uniquely|generic|copy-pasted|most (unique|generic)' ;;

    # ----- m2 -----
    m2:1)
      assert_file_exists "m2 T1 challenge" "$sut_cwd/challenge.md" || return 1
      assert_scrollback_grep "m2 T1 challenge content" "$sut_cwd/challenge.md" 'usage|pricing|pilot|seat' ;;
    m2:2) assert_or_warn assert_scrollback_grep "m2 T2" "$t" 'confluence|onedrive|sharepoint|wiki|practitioner|search term' ;;
    m2:3) assert_or_warn assert_scrollback_grep "m2 T3" "$t" 'curat|plan|internal|outside-in|sources' ;;
    m2:4)
      local n; n="$(count_real "$sut_cwd/sources" '*.md')"
      [[ "$n" -ge 3 ]] || { echo "[assert] FAIL m2 T4 ingest: only $n source files in sources/ (want >=3)" >&2; return 1; }
      # Held-back guard (H1): the counter-case must NOT leak into ingest. Its
      # distinctive sentinel ('survivorship') appears only in the churn-warning
      # source, which is withheld until the compound turn (9).
      if grep -riqE 'survivorship' "$sut_cwd/sources" 2>/dev/null; then
        echo "[assert] FAIL m2 T4 ingest: held-back counter-case leaked into sources/ before compound" >&2; return 1
      fi
      # Provenance diversity (C3): the all-local fixtures made the prompt's
      # three-list report (fetched / linked-by-path / not-reachable) collapse to
      # one bucket. The scenario now simulates mixed provenance, so all three
      # branches of the ingest prompt must actually fire.
      # bucket 1a — live web crawl: a sources/ file carries the a16z URL AND real
      # body (not a stub). Drift-tolerant: proves the fetch path ran, not a
      # brittle page sentence.
      local crawl_file; crawl_file="$(grep -rilE 'a16z\.com' "$sut_cwd/sources" 2>/dev/null | head -1)"
      [[ -n "$crawl_file" ]] || { echo "[assert] FAIL m2 T4 crawl: no sources/ file carries the crawled a16z URL — internet branch (bucket 1) did not fire" >&2; return 1; }
      local crawl_lines; crawl_lines="$(wc -l < "$crawl_file" | tr -d ' ')"
      [[ "$crawl_lines" -ge 12 ]] || { echo "[assert] FAIL m2 T4 crawl: a16z source is a $crawl_lines-line stub, not fetched content — live crawl did not pull the page" >&2; return 1; }
      # bucket 1b — connector provenance recorded in a header (Confluence/OneDrive).
      grep -riqE 'confluence|onedrive' "$sut_cwd/sources" 2>/dev/null || { echo "[assert] FAIL m2 T4 connector: no Confluence/OneDrive provenance in sources/ — connector branch did not fire" >&2; return 1; }
      # bucket 3 — not-reachable stub present (the unreachable O365 email).
      grep -riqE 'not reachable' "$sut_cwd/sources" 2>/dev/null || { echo "[assert] FAIL m2 T4 unreachable: no NOT REACHABLE stub in sources/ — unreachable branch (bucket 3) did not fire" >&2; return 1; }
      # bucket 2 — local-path link reported (non-gating; provenance phrasing varies).
      assert_or_warn assert_scrollback_grep "m2 T4 local-link bucket" "$t" 'local|laptop|by path|linked by'
      echo "[assert] PASS m2 T4 ingest: $n sources, buckets mixed (crawl+connector+unreachable), counter-case withheld"; return 0 ;;
    m2:5)
      local n; n="$(count_real "$sut_cwd/memory" '*.md')"
      [[ "$n" -ge 3 ]] || { echo "[assert] FAIL m2 T5 build: only $n memory pages (want >=3)" >&2; return 1; }
      assert_file_exists "m2 T5 memory index" "$sut_cwd/memory/index.md" || return 1
      grep -rqE '\[sources/' "$sut_cwd/memory" || { echo "[assert] FAIL m2 T5 build: no [sources/...] citations in memory/" >&2; return 1; }
      # Held-back guard (H1): memory must not carry the counter-case yet — it
      # only enters at compound (turn 9), forcing the synthesis there.
      if grep -riqE 'survivorship' "$sut_cwd/memory" 2>/dev/null; then
        echo "[assert] FAIL m2 T5 build: counter-case in memory before compound (synthesis seam will be a no-op)" >&2; return 1
      fi
      echo "[assert] PASS m2 T5 build: $n pages, index, citations present, counter-case still withheld" ;;
    m2:6) assert_or_warn assert_scrollback_grep "m2 T6" "$t" 'generic|specific|soft|rewrite|at risk' ;;
    m2:7)
      local n; n="$(count_real "$sut_cwd/agents" '*.md')"
      [[ "$n" -ge 1 ]] && { echo "[assert] PASS m2 T7 agent: $n agent file(s) in agents/"; return 0; }
      echo "[assert] FAIL m2 T7 agent: no agent .md in agents/" >&2; return 1 ;;
    m2:8) assert_or_warn assert_scrollback_grep "m2 T8" "$t" '\[sources/|\[memory/|memory/.*\.md' ;;
    m2:9)
      assert_file_mtime_advanced "m2 T9 compound (memory sharpened)" "$(ls -t "$sut_cwd"/memory/*.md 2>/dev/null | head -1)" "$base" || return 1
      # Synthesis-seam guard (H1): the counter-case must NOW be integrated into
      # memory — its sentinel present here proves the compound turn ingested a
      # genuinely new source and the contradiction actually fired.
      if ! grep -riqE 'survivorship|loss-averse|volatile SMB' "$sut_cwd/memory" 2>/dev/null; then
        echo "[assert] FAIL m2 T9 compound: counter-case not integrated into memory — synthesis seam did NOT fire" >&2; return 1
      fi
      echo "[assert] PASS m2 T9 compound: counter-case integrated (synthesis seam fired)"
      assert_or_warn assert_scrollback_grep "m2 T9" "$t" 'sharper|dropped|replaced|integrat' ;;
    m2:10) assert_or_warn assert_scrollback_grep "m2 T10" "$t" 'HIGH|MED|LOW|contradiction|stale|severity' ;;
    m2:11) assert_or_warn assert_scrollback_grep "m2 T11" "$t" '\[sources/|\[memory/|memory/.*\.md' ;;
    m2:12)
      assert_file_exists "m2 T12 root CLAUDE.md" "$sut_cwd/CLAUDE.md" || return 1
      assert_scrollback_grep "m2 T12 CLAUDE.md content" "$sut_cwd/CLAUDE.md" 'memory|sources|agent|citation|claim' || return 1
      # H2 detector (non-gating): flag operator-global ~/.claude bleed into the
      # student artifact. The debrief claims every rule is session-traceable;
      # these sentinels would prove a global instruction leaked in instead.
      if grep -riqE 'pseudonym|Rory|Sutherland|Bosser|prospect' "$sut_cwd/CLAUDE.md" 2>/dev/null; then
        echo "[assert] WARN m2 T12: generated CLAUDE.md may carry operator-global bleed (run under an isolated \$HOME/.claude — see findings H2)" >&2
      fi
      echo "[assert] PASS m2 T12: root CLAUDE.md written" ;;

    # ----- m3 (multi-agent-systems) -----
    m3:1)
      assert_file_exists "m3 T1 crux" "$sut_cwd/crux.md" || return 1
      assert_scrollback_grep "m3 T1 crux heading" "$sut_cwd/crux.md" '## Crux' || return 1
      assert_scrollback_grep "m3 T1 crux content" "$sut_cwd/crux.md" 'pricing|SMB|churn|floor|segment|cap' ;;
    m3:2)
      assert_file_mtime_advanced "m3 T2 question appended" "$sut_cwd/crux.md" "$base" || return 1
      assert_scrollback_grep "m3 T2 question heading" "$sut_cwd/crux.md" '## Question' || return 1
      # Append, don't overwrite: the crux heading must still be present.
      grep -qE '## Crux' "$sut_cwd/crux.md" || { echo "[assert] FAIL m3 T2: ## Question overwrote ## Crux (append contract broken)" >&2; return 1; }
      echo "[assert] PASS m3 T2: ## Question appended, ## Crux preserved" ;;
    m3:3)
      assert_file_exists "m3 T3 wiki retrieval" "$sut_cwd/sources/wiki-retrieval.md" || return 1
      assert_scrollback_grep "m3 T3 conflicts+gaps" "$sut_cwd/sources/wiki-retrieval.md" 'conflict|gap' || return 1
      assert_scrollback_grep "m3 T3 wiki content" "$sut_cwd/sources/wiki-retrieval.md" 'pilot|cohort|seat|pricing|dispatch' ;;
    m3:4)
      assert_file_exists "m3 T4 docs retrieval" "$sut_cwd/sources/docs-retrieval.md" || return 1
      assert_scrollback_grep "m3 T4 conflicts+gaps" "$sut_cwd/sources/docs-retrieval.md" 'conflict|gap' || return 1
      assert_scrollback_grep "m3 T4 docs content" "$sut_cwd/sources/docs-retrieval.md" 'revenue|Q2|NRR|104|retention' ;;
    m3:5)
      assert_file_exists "m3 T5 internet retrieval" "$sut_cwd/sources/internet-retrieval.md" || return 1
      assert_scrollback_grep "m3 T5 conflicts+gaps" "$sut_cwd/sources/internet-retrieval.md" 'conflict|gap' || return 1
      # Seam-survival #1: the fresh Halvorsen roundup must actually be read, not
      # confabulated. Its sentinel ('Halvorsen') exists ONLY in the new M3 source.
      if ! grep -riqE 'halvorsen|graduated cap' "$sut_cwd/sources/internet-retrieval.md" 2>/dev/null; then
        echo "[assert] FAIL m3 T5: fresh M3 source (Halvorsen postmortem) not surfaced in internet-retrieval.md — retriever didn't open the new material" >&2; return 1
      fi
      # Held-until-synthesis guard: the seam must NOT be in memory yet (only the
      # synthesizer at T6 integrates into memory/). Parallels the M2 H1 guard.
      if grep -riqE 'halvorsen' "$sut_cwd/memory" 2>/dev/null; then
        echo "[assert] FAIL m3 T5: M3 seam already in memory/ before synthesis (turn 6) — synthesis seam will be a no-op" >&2; return 1
      fi
      echo "[assert] PASS m3 T5: fresh seam surfaced in sources/, not yet in memory/" ;;
    m3:6)
      assert_file_exists "m3 T6 synthesis note" "$sut_cwd/memory/_synthesis-m3.md" || return 1
      assert_file_mtime_advanced "m3 T6 memory sharpened" "$(ls -t "$sut_cwd"/memory/*.md 2>/dev/null | head -1)" "$base" || return 1
      # THE big green-but-broken catch: the synthesizer can narrate integration
      # while no memory page actually took the new seam. Its sentinel must now be
      # in memory/ (it was absent at T5) — proves the seam fired, not theater.
      if ! grep -riqE 'halvorsen|graduated cap' "$sut_cwd/memory" 2>/dev/null; then
        echo "[assert] FAIL m3 T6: M3 seam (Halvorsen) not integrated into memory/ — synthesis seam did NOT fire despite synthesis note" >&2; return 1
      fi
      assert_scrollback_grep "m3 T6 contradiction named" "$sut_cwd/memory/_synthesis-m3.md" 'contradict|conflict|disagree|tension' || return 1
      echo "[assert] PASS m3 T6: fresh seam integrated into memory (synthesis seam fired), contradiction named" ;;
    m3:7)
      local ns; ns="$(count_real "$sut_cwd/module-3/stances" '*.md')"
      [[ "$ns" -ge 3 ]] || { echo "[assert] FAIL m3 T7: only $ns stance file(s) in module-3/stances/ (want >=3 — subagents may have collapsed to one pass)" >&2; return 1; }
      assert_file_mtime_advanced "m3 T7 answer appended" "$sut_cwd/crux.md" "$base" || return 1
      assert_scrollback_grep "m3 T7 answer heading" "$sut_cwd/crux.md" '## Answer' || return 1
      grep -qE '## Crux' "$sut_cwd/crux.md" && grep -qE '## Question' "$sut_cwd/crux.md" || { echo "[assert] FAIL m3 T7: ## Answer clobbered an earlier crux/question section" >&2; return 1; }
      # Rumelt legs present AND disagreement not smoothed to beige.
      assert_scrollback_grep "m3 T7 rumelt legs" "$sut_cwd/crux.md" 'diagnos|guiding|coherent action|action' || return 1
      assert_or_warn assert_scrollback_grep "m3 T7 disagreement named" "$t" 'disagree|sided|conflict|tension|reframe'
      echo "[assert] PASS m3 T7: $ns stances, ## Answer appended with Rumelt legs" ;;
    m3:8)
      assert_file_mtime_advanced "m3 T8 CLAUDE.md rewritten" "$sut_cwd/CLAUDE.md" "$base" || return 1
      # The teaching point: name >=2 handoff seams with file + pass + what was
      # lost. Diplomatic no-op is the failure mode. Require the debrief to cite a
      # retrieval/synthesis filename AND a loss word.
      assert_scrollback_grep "m3 T8 seam citation" "$t" 'wiki-retrieval|docs-retrieval|internet-retrieval|_synthesis-m3|stances' || return 1
      assert_scrollback_grep "m3 T8 loss named" "$t" 'lost|dropped|leaked|collapsed|averaged|normalis|beige|smoothed' || return 1
      # H2 detector (non-gating): operator-global ~/.claude bleed into the artifact.
      if grep -riqE 'pseudonym|Rory Sutherland|Bosser|prospect' "$sut_cwd/CLAUDE.md" 2>/dev/null; then
        echo "[assert] WARN m3 T8: rewritten CLAUDE.md may carry operator-global bleed (run under isolated \$HOME/.claude — findings H2)" >&2
      fi
      echo "[assert] PASS m3 T8: CLAUDE.md rewritten, >=1 seam cited with a loss" ;;
    m3:9)
      # Memory-health homework: "name at least one drop candidate; an all-green
      # check means you didn't look hard enough." Green-but-broken = theater
      # audit that touches nothing and names nothing. Require a concrete
      # drop/merge/split target named by file reference in the transcript.
      assert_scrollback_grep "m3 T9 drop candidate named" "$t" 'drop|merge|split|stale|supersed|consolidat|orphan' || return 1
      assert_scrollback_grep "m3 T9 names a file" "$t" 'memory/|sources/|\.md' || return 1
      echo "[assert] PASS m3 T9: memory-health audit named a concrete restructure target" ;;

    # ----- m4a (author + package + install the security skill) -----
    m4a:1)
      # Raw policy run. Green-but-broken = a report that is all "compliant" /
      # "I can't tell" — the audit "ran" but caught nothing. Require it to derive
      # rules from the shipped policies, find >=1 violation, AND specifically
      # catch the planted PII (data-minimisation / named contacts).
      local raw="$sut_cwd/outputs/policy-report-raw.md"
      assert_file_exists "m4a T1 raw report" "$raw" || return 1
      assert_scrollback_grep "m4a T1 derived policy rows" "$raw" 'GDPR-|CLASS-' || return 1
      assert_scrollback_grep "m4a T1 found a violation" "$raw" 'violat' || return 1
      assert_scrollback_grep "m4a T1 caught the PII plant" "$raw" \
        'minimis|personal data|named (contact|individual|customer)|Lindqvist|Pétursd|Petursd|Hallman|Virtanen|pilot.*name|name.*pilot|GDPR-2' || return 1
      echo "[assert] PASS m4a T1: raw policy report derived rules, flagged a violation, caught the PII" ;;
    m4a:2)
      assert_or_warn assert_scrollback_grep "m4a T2 package shape" "$t" 'agent[ -]security|two lens|policy lens|SKILL|reusable (skill|check)' ;;
    m4a:3)
      # THE catch: the authored SKILL.md must carry BOTH lenses AND all four
      # named risk patterns. A skill missing a pattern silently weakens every
      # later audit while still "existing".
      local skill="$sut_cwd/module-4/skills/security-audit/SKILL.md"
      assert_file_exists "m4a T3 SKILL.md" "$skill" || return 1
      assert_scrollback_grep "m4a T3 policy lens"         "$skill" 'policy' || return 1
      assert_scrollback_grep "m4a T3 agent-security lens" "$skill" 'agent[ -]security' || return 1
      assert_scrollback_grep "m4a T3 pattern: injection"  "$skill" 'prompt injection|injection' || return 1
      assert_scrollback_grep "m4a T3 pattern: secrets"    "$skill" 'secret' || return 1
      assert_scrollback_grep "m4a T3 pattern: tool-confusion" "$skill" 'tool[ -]confusion' || return 1
      assert_scrollback_grep "m4a T3 pattern: supply-chain"   "$skill" 'supply[ -]chain' || return 1
      echo "[assert] PASS m4a T3: SKILL.md carries both lenses + all four named patterns" ;;
    m4a:4)
      # Install lands in the OPERATOR's ~/.claude/skills — required so m4b
      # autoloads the packaged lens. $HOME can't be isolated on this setup (a
      # scratch HOME isn't logged in), so the chain removes this skill post-run
      # via a pre-existence-guarded trap (H2). Standalone m4a runs leak it until
      # the next chain run — clean up by hand if you ran m4a alone.
      assert_file_exists "m4a T4 installed skill" "$HOME/.claude/skills/security-audit/SKILL.md" || return 1
      echo "[assert] WARN m4a T4: wrote to operator \$HOME/.claude/skills/security-audit — chain auto-removes post-run; standalone runs must clean up by hand (findings H2)" >&2
      echo "[assert] PASS m4a T4: skill installed at ~/.claude/skills/security-audit/SKILL.md" ;;

    # ----- m4b (load the skill, audit, mitigate, debrief) -----
    m4b:1)
      # Packaged policy lens must ALSO catch the PII — else packaging lost the lens.
      local rep="$sut_cwd/outputs/policy-report.md"
      assert_file_exists "m4b T1 packaged report" "$rep" || return 1
      assert_scrollback_grep "m4b T1 found a violation" "$rep" 'violat' || return 1
      assert_scrollback_grep "m4b T1 caught the PII plant" "$rep" \
        'minimis|personal data|named (contact|individual|customer)|Lindqvist|Pétursd|Petursd|Hallman|Virtanen|pilot.*name|name.*pilot|GDPR-2' || return 1
      echo "[assert] PASS m4b T1: packaged policy report caught the PII violation" ;;
    m4b:2)
      # THE catches: the agent-security lens must surface the planted INJECTION
      # (in the docs source) AND the OVER-BROAD REACH (send-to-CEO in the agent).
      local sec="$sut_cwd/outputs/security-report.md"
      assert_file_exists "m4b T2 security report" "$sec" || return 1
      assert_scrollback_grep "m4b T2 caught the injection" "$sec" 'inject' || return 1
      assert_scrollback_grep "m4b T2 injection located/quoted" "$sec" \
        'q2[- ]?revenue|revenue[- ]?review|do not mention|ignore (prior|the|previous)|100%' || return 1
      assert_scrollback_grep "m4b T2 caught over-broad reach" "$sec" \
        'send|reach|scope|least[ -]privilege|over-?broad|consequential|access' || return 1
      assert_scrollback_grep "m4b T2 reach names the target" "$sec" 'ceo|pricing-memo|external|contact' || return 1
      assert_scrollback_grep "m4b T2 ranked" "$sec" 'high|medium|low' || return 1
      # Cross-module signal: did an upstream pass OBEY the injection? Match the
      # injection's actual obey-SIGNATURE, not loose churn+low co-occurrence — the
      # first run false-positived on a citation line ("...churn-warning.md): a cap
      # ... low enough to give back upside") because 'churn' (filename) and 'low'
      # (cap text) shared a line. Require "SMB churn ... low/minimal" adjacency or
      # an explicit 100%-rollout recommendation.
      if grep -riqE 'SMB churn[^.]{0,40}(is|as|=|:|risk)[^.]{0,15}(low|minimal)|(ship|roll[^.]{0,8}out|rollout)[^.]{0,12}100%|100%[^.]{0,12}(of (the )?accounts|rollout|customers)' "$sut_cwd/memory" 2>/dev/null; then
        echo "[assert] WARN m4b T2: memory/ may have OBEYED the injection upstream (SMB churn classified 'low' / 100% rollout) — cross-module signal" >&2
      fi
      echo "[assert] PASS m4b T2: agent-security lens caught injection + over-broad reach, ranked" ;;
    m4b:3)
      # Mitigation must be REAL (a file changed, not chat-only) and the residual
      # must be honest (reduces, not eliminates).
      local sec="$sut_cwd/outputs/security-report.md"
      assert_file_mtime_advanced "m4b T3 residual appended" "$sec" "$base" || return 1
      assert_scrollback_grep "m4b T3 residual section" "$sec" 'Mitigation applied and residual' || return 1
      assert_scrollback_grep "m4b T3 honest residual" "$sec" \
        'residual|reduce|not eliminat|does not eliminat|still (true|exists|sits|present)|shift' || return 1
      assert_or_warn assert_file_mtime_advanced "m4b T3 a real file changed" "$(ls -t "$sut_cwd"/memory/*.md "$sut_cwd"/agents/*.md 2>/dev/null | head -1)" "$base"
      echo "[assert] PASS m4b T3: mitigation applied to a real file, residual named honestly" ;;
    m4b:4)
      # Debrief → durable Security operating rules in CLAUDE.md. Green-but-broken
      # = vague "be secure" rules. Require a concrete trigger/file/row/residual.
      assert_file_mtime_advanced "m4b T4 CLAUDE.md updated" "$sut_cwd/CLAUDE.md" "$base" || return 1
      assert_scrollback_grep "m4b T4 security section" "$sut_cwd/CLAUDE.md" 'Security operating rules|security' || return 1
      assert_scrollback_grep "m4b T4 rules are concrete" "$sut_cwd/CLAUDE.md" \
        'GDPR-|CLASS-|inject|pilot|security-audit|outputs/|residual|minimis|least[ -]privilege' || return 1
      echo "[assert] PASS m4b T4: CLAUDE.md carries concrete security operating rules" ;;

    # ----- m5 (groundedness bakeoff) -----
    m5:1)
      # Briefing generator must emit the roster AND the briefing, and the briefing
      # must carry all THREE planted deterministic claims verbatim — else the
      # downstream pipeline has no known plant to catch (green-but-broken).
      assert_file_exists "m5 T1 evidence roster" "$sut_cwd/module-5/evidence-roster.md" || return 1
      assert_file_exists "m5 T1 briefing" "$sut_cwd/module-5/briefing.md" || return 1
      assert_scrollback_grep "m5 T1 plant: invented 30%"  "$sut_cwd/module-5/briefing.md" 'churn by 30%|30%' || return 1
      assert_scrollback_grep "m5 T1 plant: overreach"     "$sut_cwd/module-5/briefing.md" 'proves usage-based' || return 1
      assert_scrollback_grep "m5 T1 plant: broken cite"   "$sut_cwd/module-5/briefing.md" '18%' || return 1
      echo "[assert] PASS m5 T1: roster + briefing written, all 3 planted claims present" ;;
    m5:2)
      local cp="$sut_cwd/module-5/claim-pool.md"
      assert_file_exists "m5 T2 claim pool" "$cp" || return 1
      local hits=0
      for pat in 'churn by 30%|30%' 'proves usage-based' '18%'; do
        grep -qiE "$pat" "$cp" && hits=$((hits + 1))
      done
      [[ $hits -ge 2 ]] || { echo "[assert] FAIL m5 T2: claim-pool retained only $hits/3 planted claims (extractor dropped the plant)" >&2; return 1; }
      echo "[assert] PASS m5 T2: claim-pool extracted, retained $hits/3 planted claims" ;;
    m5:3)
      local dd="$sut_cwd/module-5/detectors"
      local n; n=$(count_real "$dd" '*.md')
      [[ "$n" -ge 4 ]] || { echo "[assert] FAIL m5 T3: only $n detector files (want 4)" >&2; return 1; }
      assert_file_exists "m5 T3 source-triangulation" "$dd/source-triangulation.md" || return 1
      assert_file_exists "m5 T3 citation-integrity"   "$dd/citation-integrity.md" || return 1
      echo "[assert] PASS m5 T3: four detector outputs written" ;;
    m5:4)
      # The scorer must adjudicate AND actually catch the plants. Green-but-broken
      # = an adjudication that labels everything GROUNDED. Require a planted phrase
      # to co-occur with a non-grounded verdict, plus a real scoreboard.
      local adj="$sut_cwd/module-5/adjudicated-claims.md" sb="$sut_cwd/module-5/scoreboard.md"
      assert_file_exists "m5 T4 adjudicated" "$adj" || return 1
      assert_file_exists "m5 T4 scoreboard" "$sb" || return 1
      assert_scrollback_grep "m5 T4 plant adjudicated" "$adj" '30%|18%|proves usage-based' || return 1
      assert_scrollback_grep "m5 T4 non-grounded verdicts" "$adj" 'UNGROUNDED|PARTLY|OVERREACH|CITATION-BROKEN|BROKEN|not (grounded|supported)' || return 1
      assert_scrollback_grep "m5 T4 scoreboard has precision/recall" "$sb" 'precision|recall' || return 1
      assert_scrollback_grep "m5 T4 scoreboard names a winner" "$sb" 'winner|recommend|ensemble|triangulat|entail|citation|counter-evidence' || return 1
      echo "[assert] PASS m5 T4: adjudication caught a plant, scoreboard scored + named a winner" ;;
    m5:5)
      local judge="$sut_cwd/judges/groundedness-judge.md"
      assert_file_exists "m5 T5 judge" "$judge" || return 1
      assert_scrollback_grep "m5 T5 judge names a method" "$judge" 'ground|triangulat|entail|citation|overreach' || return 1
      assert_scrollback_grep "m5 T5 judge states a known limit" "$judge" 'Known limit|known limit|limit:' || return 1
      echo "[assert] PASS m5 T5: portable groundedness-judge written with a known-limit" ;;
    m5:6)
      assert_file_mtime_advanced "m5 T6 CLAUDE.md updated" "$sut_cwd/CLAUDE.md" "$base" || return 1
      assert_scrollback_grep "m5 T6 groundedness section" "$sut_cwd/CLAUDE.md" 'Groundedness checks|groundedness' || return 1
      assert_scrollback_grep "m5 T6 rules are concrete" "$sut_cwd/CLAUDE.md" \
        'groundedness-judge|claim|evidence|UNGROUNDED|scoreboard|not enough evidence|roster' || return 1
      echo "[assert] PASS m5 T6: CLAUDE.md carries concrete groundedness rules" ;;

    # ----- m6 (eval loop) -----
    m6:1)
      # Calibration: generation tactic + one briefing + judge run in chat. Stash
      # the judge SHA now so later turns can prove it never moved (SHA, not mtime —
      # a no-op rewrite changes mtime but not bytes).
      assert_file_exists "m6 T1 generation tactic" "$sut_cwd/generation-tactic.md" || return 1
      assert_file_exists "m6 T1 fresh briefing" "$sut_cwd/module-6/fresh-briefing.md" || return 1
      assert_file_exists "m6 T1 judge present" "$sut_cwd/judges/groundedness-judge.md" || return 1
      shasum "$sut_cwd/judges/groundedness-judge.md" | awk '{print $1}' > "$run_dir/judge.sha"
      assert_or_warn assert_scrollback_grep "m6 T1 judge ran" "$t" 'verdict|UNGROUNDED|grounded|claim'
      echo "[assert] PASS m6 T1: generation-tactic + fresh-briefing written, judge SHA stashed" ;;
    m6:2)
      # THE catches: a real loop (>=3 rounds, each with briefing+judgment), the
      # prompt rewritten, the judge byte-identical, and a non-flat trajectory
      # (round-1 flagged>0 AND last round < round-1 — flat/zero = theater).
      local runs="$sut_cwd/module-6/runs"
      for r in round-1 round-2 round-3; do
        assert_file_exists "m6 T2 $r briefing" "$runs/$r/briefing.md" || return 1
        assert_file_exists "m6 T2 $r judgment" "$runs/$r/judgment.md" || return 1
      done
      assert_file_mtime_advanced "m6 T2 generation-tactic rewritten" "$sut_cwd/generation-tactic.md" "$base" || return 1
      assert_file_exists "m6 T2 eval-notes" "$sut_cwd/module-6/eval-notes.md" || return 1
      assert_scrollback_grep "m6 T2 eval-notes has SHA + trajectory" "$sut_cwd/module-6/eval-notes.md" 'SHA|sha|identical|trajector|flag|round' || return 1
      # Judge immutability (runner-level, SHA): unchanged since m6:1 stash.
      if [[ -f "$run_dir/judge.sha" ]]; then
        local now; now=$(shasum "$sut_cwd/judges/groundedness-judge.md" | awk '{print $1}')
        [[ "$now" == "$(cat "$run_dir/judge.sha")" ]] || { echo "[assert] FAIL m6 T2: judge file CHANGED during the loop (immutability broken) — $now" >&2; return 1; }
        echo "[assert] PASS m6 T2 judge byte-identical (SHA): $now"
      fi
      # Trajectory catch. Parse the flagged-count from round-1 and the last round,
      # compute whether the loop did real work (tactic rewritten — hard-asserted
      # above — AND eval-notes documents per-round changes), and let
      # eval_trajectory_verdict classify. round-1==0 is NOT theater on its own: a
      # narrow judge (M5's source-triangulation winner is blind to overreach by its
      # own documented limit) on an already-grounded corpus legitimately floors the
      # COUNTABLE metric while real improvement lands in the uncounted dimension.
      # Theater = a flat count WITH flags left, or zero AND no prompt evolution.
      local last; last=$(ls -d "$runs"/round-*/ 2>/dev/null | sort -V | tail -1)
      local r1c lnc; r1c=$(grep -i 'flag' "$runs/round-1/judgment.md" 2>/dev/null | grep -oE '[0-9]+' | head -1)
      lnc=$(grep -i 'flag' "$last/judgment.md" 2>/dev/null | grep -oE '[0-9]+' | head -1)
      local work=0
      grep -qiE 'after round|trajector|overreach|failure class|sharpen|tactic change' "$sut_cwd/module-6/eval-notes.md" 2>/dev/null && work=1
      local verdict; verdict=$(eval_trajectory_verdict "${r1c:-x}" "${lnc:-x}" "$work")
      case "$verdict" in
        THEATER*)  echo "[assert] FAIL m6 T2: $verdict" >&2; return 1 ;;
        FLOOR-UNCOUNTED)
          echo "[assert] WARN m6 T2: round-1 countable flags = 0 — narrow judge (source-triangulation, overreach-blind) met a grounded corpus; real improvement is in the uncounted dimension (see eval-notes 'what the judge cannot see'). Traces to the M5 judge's Known limit — content finding C10." >&2
          echo "[assert] PASS m6 T2: real loop (tactic evolved each round), judge fixed; countable metric at floor by design" ;;
        IMPROVED*) echo "[assert] PASS m6 T2: real loop, judge fixed, trajectory $verdict flagged" ;;
        UNPARSED)
          echo "[assert] WARN m6 T2: could not parse flagged counts (r1='$r1c' last='$lnc') — verify trajectory by hand in eval-notes.md" >&2
          echo "[assert] PASS m6 T2: >=3 rounds, prompt rewritten, judge fixed (trajectory parse skipped)" ;;
      esac ;;
    m6:3)
      assert_or_warn assert_scrollback_grep "m6 T3 readout: judge integrity" "$t" 'byte-identical|identical|unchanged|same SHA|did not (move|change)'
      assert_or_warn assert_scrollback_grep "m6 T3 readout: trajectory" "$t" 'trajector|flag|round|improv' ;;
    m6:4)
      # C11 CLOSED: the loop and the debrief now converge on ./generation-tactic.md.
      # The debrief re-sharpens the SAME file the loop wrote (T1) and rewrote (T2),
      # so assert it exists, its mtime advanced this turn (debrief touched it, not a
      # fresh orphan), tactic changes are named, no orphan generation-prompt.md was
      # left behind, and the judge STILL never moved.
      assert_file_exists "m6 T4 generation-tactic present" "$sut_cwd/generation-tactic.md" || return 1
      assert_file_mtime_advanced "m6 T4 debrief re-sharpened loop's tactic" "$sut_cwd/generation-tactic.md" "$base" || return 1
      assert_scrollback_grep "m6 T4 tactic changes named" "$t" 'add|sharpen|remov|tactic|rule' || return 1
      if [[ -e "$sut_cwd/generation-prompt.md" ]]; then
        echo "[assert] WARN m6 T4: an orphan ./generation-prompt.md exists — C11 expects the loop and debrief to use ./generation-tactic.md only" >&2
      fi
      if [[ -f "$run_dir/judge.sha" ]]; then
        local now; now=$(shasum "$sut_cwd/judges/groundedness-judge.md" | awk '{print $1}')
        [[ "$now" == "$(cat "$run_dir/judge.sha")" ]] || { echo "[assert] FAIL m6 T4: judge file changed by end of session (immutability broken)" >&2; return 1; }
      fi
      echo "[assert] PASS m6 T4: loop+debrief converge on generation-tactic.md (C11 closed), judge byte-identical end-to-end" ;;

    *) echo "[a101] no assertion configured for $mod:$seq" >&2; return 1 ;;
  esac
}

# ---- Walk the scenario ---------------------------------------------------
lines=()
while IFS= read -r line || [[ -n "$line" ]]; do
  [[ -z "$line" || "$line" =~ ^[[:space:]]*# ]] && continue
  lines+=("$line")
done < "$scenario"
echo "[a101] turns=${#lines[@]}"

seq=0
for line in "${lines[@]}"; do
  seq=$((seq + 1))

  if [[ "$line" == \** ]]; then
    body="${line#\*}"; body="${body# }"
  else
    key="${line%%[[:space:]]*}"
    tail=""
    if [[ "$line" == *[[:space:]]* ]]; then
      tail="${line#*[[:space:]]}"
      tail="${tail#"${tail%%[![:space:]]*}"}"
    fi
    body="$(resolve_prompt "$key")"
    [[ -n "$tail" ]] && body="${body}"$'\n'"${tail}"
  fi
  body="$(subst "$body")"

  echo "[a101] turn=$seq: ${body:0:70}..."
  # mtime baseline for "advanced" assertions: 2s back guards same-second writes.
  base=$(( $(date +%s) - 2 ))
  pane_send_text "$session" "$body"
  printf '%s' "$body" > "$run_dir/turn-$seq.prompt.txt"

  if ! wait_for_turn "$sentinel_dir" "$seq" "$standard_timeout" "$session"; then
    pane_capture_safe "$session" "$run_dir/transcript.txt" 10
    echo "[a101] FAIL turn=$seq (sentinel timeout/pane-death after ${standard_timeout}s) — see $run_dir" >&2
    exit 1
  fi
  pane_capture "$session" "$run_dir/turn-$seq.transcript.txt"

  if ! assert_turn "$module" "$seq" "$run_dir/turn-$seq.transcript.txt" "$base"; then
    pane_capture "$session" "$run_dir/transcript.txt"
    echo "[a101] FAIL turn=$seq assertion — see $run_dir/turn-$seq.transcript.txt" >&2
    exit 1
  fi
done

pane_capture "$session" "$run_dir/transcript.txt"

# ---- Light state hand-off (artifacts, not SHAs) --------------------------
state="$run_dir/$module-state.json"
{
  printf '{\n'
  printf '  "run_id": "%s",\n' "$run_id"
  printf '  "module": "%s",\n' "$module"
  printf '  "cwd": "%s",\n' "$sut_cwd"
  printf '  "turns": %s,\n' "$seq"
  printf '  "artifacts_present": [\n'
  first=1
  for a in prework/snake.html prework/meetings.md module-1/site.html \
           module-1/personal-brand-generation.md challenge.md memory/index.md CLAUDE.md; do
    if [[ -e "$sut_cwd/$a" ]]; then
      [[ $first -eq 0 ]] && printf ',\n'; first=0
      printf '    "%s"' "$a"
    fi
  done
  printf '\n  ]\n}\n'
} > "$state"

echo "[a101] PASS module=$module turns=$seq — out: $run_dir"
echo "[a101] state: $state"
