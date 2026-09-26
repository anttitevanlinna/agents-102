#!/usr/bin/env bash
# chain-ae101.sh must drive each AE101 kit × cut through the same module
# sequence the four per-SUT drivers did (chain-{lemmings,northwind,picoshare,
# codesearch}.sh, folded 2026-09-26). Each case runs a driver in a sandbox:
# stub runners/arrangers record argv + effective scenario files, a git shim on
# PATH records every mutating git call, and the driver's own pre-wipe lines are
# kept. The trace is compared with tests/fixtures/chain-fold/<case>.trace,
# recorded from the OLD drivers (the middle column below) before they were
# deleted — so the fixtures, not those drivers, are now the contract. Lines
# starting with '#' in a fixture are notes: deliberate differences are
# written there, not hidden.
#
# Run: bash tests/chain-fold.test.sh
set -uo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$HERE/.."
FIX="$HERE/fixtures/chain-fold"

pass=0 fail=0
ok()  { pass=$((pass+1)); echo "  ok   - $1"; }
bad() { fail=$((fail+1)); echo "  FAIL - $1" >&2; }

# case | old command the fixture was recorded from | new command (tested)
CASES=(
  "lemmings-full-from-prework|chain-lemmings.sh --from prework|chain-ae101.sh --sut-kit lemmings --from prework"
  "lemmings-full|chain-lemmings.sh|chain-ae101.sh --sut-kit lemmings"
  "lemmings-northwind|chain-northwind.sh --sut-kit lemmings --from prework|chain-ae101.sh --sut-kit lemmings --cut northwind --from prework"
  "picoshare-full|chain-picoshare.sh|chain-ae101.sh --sut-kit picoshare"
  "picoshare-northwind|chain-northwind.sh --sut-kit picoshare|chain-ae101.sh --sut-kit picoshare --cut northwind"
  "codesearch-full|chain-codesearch.sh --m2-sha m2override|chain-ae101.sh --sut-kit codesearch --m2-sha m2override"
  "codesearch-northwind-from-m4|chain-northwind.sh --sut-kit codesearch --from m4|chain-ae101.sh --sut-kit codesearch --cut northwind --from m4"
  # Resume points (no old driver): a --from either resolves declared prior
  # state or fails before touching the SUT.
  "lemmings-full-from-m4-no-state|-|chain-ae101.sh --sut-kit lemmings --from m4"
  "lemmings-full-from-m4-m3-sha|-|chain-ae101.sh --sut-kit lemmings --from m4 --m3-sha m3override"
  "lemmings-full-from-m5-no-state|-|chain-ae101.sh --sut-kit lemmings --from m5"
  "lemmings-full-from-m6-no-state|-|chain-ae101.sh --sut-kit lemmings --from m6"
)

stub_runner() {   # $1=path
  cat > "$1" <<'EOF'
#!/usr/bin/env bash
name="$(basename "$0" .sh)"; m="${name#run-}"
case "$name" in
  run-m3) sc=" main=$(basename "${SCENARIO_MAIN:-m3-main.txt}") quality=$(basename "${SCENARIO_QUALITY:-m3-quality.txt}")" ;;
  run-*)  sc=" scenario=$(basename "${SCENARIO:-$m.txt}")" ;;
  *)      sc="" ;;
esac
echo "RUN $name $*$sc" | sed -e "s#$SB#<SB>#g" >> "$TRACE"
cwd=""; while [[ $# -gt 0 ]]; do [[ "$1" == --cwd ]] && cwd="$2"; shift; done
case "$name" in
  run-m1|run-m2|run-m3|run-m4|run-m5)
    d="$(dirname "$0")/out/stub-$m-$RANDOM"; mkdir -p "$d"
    printf '{\n  "%s_ending_sha": "%sendsha"\n}\n' "$m" "$m" > "$d/$m-state.json"
    source "$(dirname "$0")/lib/chain.sh"; run_register "$m" "$d" ;;
esac
[[ "$name" == run-m4 ]] && printf -- '- Branch: m4/agent-slug\n' > "$cwd/task.md"
exit 0
EOF
  chmod +x "$1"
}

git_shim() {      # $1=path
  cat > "$1" <<'EOF'
#!/usr/bin/env bash
args=("$@"); [[ "${args[0]:-}" == -C ]] && args=("${args[@]:2}")
a="${args[*]}"
case "$a" in
  "rev-parse --short HEAD") echo headsha ;;
  "rev-parse --abbrev-ref HEAD") cat "$SB/.cur" 2>/dev/null || echo m1/unset ;;
  log*--grep*) echo spsha ;;
  for-each-ref*) : ;;
  *) echo "GIT $a" | sed -e "s#$SB#<SB>#g" >> "$TRACE"
     if [[ "${args[0]}" == checkout && "${args[1]}" == -B ]]; then echo "${args[2]}" > "$SB/.cur"; fi
     if [[ "${args[0]}" == branch && "${args[1]}" == -m ]]; then echo "${args[3]}" > "$SB/.cur"; fi ;;
esac
exit 0
EOF
  chmod +x "$1"
}

run_case() {      # $1=command line (driver + args) -> prints normalized trace
  SB="$(mktemp -d)"; export SB
  export TRACE="$SB/trace"; : > "$TRACE"
  mkdir -p "$SB/tr/lib" "$SB/tr/out" "$SB/bin" "$SB/home/.claude/skills" "$SB/sut"
  cp "$ROOT"/chain-*.sh "$SB/tr/" 2>/dev/null
  cp "$ROOT"/lib/*.sh "$SB/tr/lib/"
  cp -R "$ROOT/scenarios" "$SB/tr/scenarios"
  for r in run-prework run-m1 run-m2 run-m3 run-m4 run-m5 run-m6 arrange-lemmings arrange-picoshare; do
    stub_runner "$SB/tr/$r.sh"
  done
  git_shim "$SB/bin/git"
  for k in lemmings picoshare codesearch; do                    # so pre-wipes show
    mkdir -p "$SB/home/.claude/skills/test-strategy-$k" "$SB/home/.claude/skills/session-shaper-$k"
  done
  echo stale > "$SB/sut/task.md"; echo stale > "$SB/sut/plan.md"
  local drv="${1%% *}" args=""; [[ "$1" == *" "* ]] && args="${1#* }"
  local out rc
  # shellcheck disable=SC2086
  out="$(cd "$SB/tr" && HOME="$SB/home" PATH="$SB/bin:$PATH" bash "./$drv" $args --sut "$SB/sut" 2>&1)"; rc=$?
  {
    cat "$TRACE"
    printf '%s\n' "$out" | sed -n -E 's/^\[[a-z0-9-]+\] (pre-wipe [^ ]+).*/WIPE \1/p' | sed -e "s#$SB#<SB>#g"
    echo "EXIT $rc"
  }
  rm -rf "$SB"
}

for c in "${CASES[@]}"; do
  IFS='|' read -r name _old new <<< "$c"
  want="$(grep -v '^#' "$FIX/$name.trace" 2>/dev/null)"
  got="$(run_case "$new")"
  if [[ -n "$want" && "$got" == "$want" ]]; then ok "$name"
  else bad "$name"; diff <(echo "$want") <(echo "$got") | head -20 >&2; fi
done

echo
echo "[test] $pass passed, $fail failed"
[[ "$fail" -eq 0 ]]
