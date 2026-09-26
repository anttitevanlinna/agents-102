#!/usr/bin/env bash
# Explicit chain state. A chain driver creates ONE chain dir and exports it;
# every runner registers its run dir there; the next module reads the prior
# module's state through that pointer. Nothing scans out/ for the newest run —
# that guess broke whenever two runs overlapped or a stale run was newest.
#
#   out/_chains/<chain-id>/<module>.run   → absolute path of that module's run dir
#   <run-dir>/.module                     → which module the run was (prune reads it)

chain_init() {
  # $1=out root, $2=optional existing chain dir (resume). Exports
  # CLAUDE_RUNNER_CHAIN_DIR and echoes it.
  local out="$1" reuse="${2:-}"
  if [[ -n "$reuse" ]]; then
    [[ -d "$reuse" ]] || { echo "chain_init: no such chain dir: $reuse" >&2; return 1; }
    CLAUDE_RUNNER_CHAIN_DIR="$(cd "$reuse" && pwd)"
  else
    CLAUDE_RUNNER_CHAIN_DIR="$out/_chains/$(date +%Y%m%d-%H%M%S)-$$"
    mkdir -p "$CLAUDE_RUNNER_CHAIN_DIR"
  fi
  export CLAUDE_RUNNER_CHAIN_DIR
  echo "$CLAUDE_RUNNER_CHAIN_DIR"
}

chain_register() {
  # $1=module, $2=run dir. No-op outside a chain (standalone run-mN.sh).
  [[ -n "${CLAUDE_RUNNER_CHAIN_DIR:-}" ]] || return 0
  printf '%s\n' "$2" > "$CLAUDE_RUNNER_CHAIN_DIR/$1.run"
}

run_register() {
  # Every runner calls this once its run dir exists: marks the module for
  # prune-out.sh and registers the run in the chain, if there is one.
  printf '%s\n' "$1" > "$2/.module"
  chain_register "$1" "$2"
}

chain_state() {
  # $1=module. Echoes <run dir>/<module>-state.json for THIS chain's run, or
  # nothing. Never falls back to a guess.
  local ptr="${CLAUDE_RUNNER_CHAIN_DIR:-}/$1.run" rd
  [[ -n "${CLAUDE_RUNNER_CHAIN_DIR:-}" && -f "$ptr" ]] || return 0
  rd="$(cat "$ptr")"
  [[ -f "$rd/$1-state.json" ]] && echo "$rd/$1-state.json"
  return 0
}

chain_list_recent() {
  # $1=out root, $2=count. For the resume error message.
  # Only chains that registered a run; an aborted resume leaves an empty one.
  local d n=0
  for d in $(ls -td "$1"/_chains/*/ 2>/dev/null); do
    d="${d%/}"
    ls "$d"/*.run >/dev/null 2>&1 || continue
    echo "$d  ($(cd "$d" && ls *.run | sed 's/\.run$//' | tr '\n' ' '))"
    n=$((n + 1)); (( n >= ${2:-5} )) && break
  done
  return 0
}

# ---- user-scope skills guard ------------------------------------------------
# A chain leaves ~/.claude/skills exactly as it found it — success, failure or
# Ctrl-C. Prework installs the student security skills, M3/M6 author
# <skill>-<sut>, arrange removes -<sut> skills; left behind, they load into
# every later session of the maintainer and seed the next run's name clash.
# On exit the chain's end state is kept in <chain>/skills-after/ so a resume
# (--chain-dir) gets back the skills its earlier modules wrote (M4+ read M3's
# test-strategy-<sut>), then is cleaned up the same way.
chain_guard_skills() {
  _CHAIN_SKILLS_SRC="${CLAUDE_RUNNER_SKILLS_DIR:-$HOME/.claude/skills}"
  _CHAIN_SKILLS_SNAP="$CLAUDE_RUNNER_CHAIN_DIR/skills-before"
  mkdir -p "$_CHAIN_SKILLS_SRC"
  rm -rf "$_CHAIN_SKILLS_SNAP"; mkdir -p "$_CHAIN_SKILLS_SNAP"
  rsync -a "$_CHAIN_SKILLS_SRC/" "$_CHAIN_SKILLS_SNAP/"
  if [[ -d "$CLAUDE_RUNNER_CHAIN_DIR/skills-after" ]]; then
    rsync -a "$CLAUDE_RUNNER_CHAIN_DIR/skills-after/" "$_CHAIN_SKILLS_SRC/"
    echo "[chain] resume: re-applied this chain's skills from skills-after/" >&2
  fi
  trap '_chain_restore_skills' EXIT
  trap 'exit 130' INT
  trap 'exit 143' TERM
}

_chain_restore_skills() {
  [[ -d "${_CHAIN_SKILLS_SNAP:-}" ]] || return 0
  mkdir -p "$CLAUDE_RUNNER_CHAIN_DIR/skills-after"
  rsync -a --delete "$_CHAIN_SKILLS_SRC/" "$CLAUDE_RUNNER_CHAIN_DIR/skills-after/"
  rsync -a --delete "$_CHAIN_SKILLS_SNAP/" "$_CHAIN_SKILLS_SRC/" \
    && rm -rf "$_CHAIN_SKILLS_SNAP" \
    && echo "[chain] $_CHAIN_SKILLS_SRC restored to its pre-run snapshot" >&2
}

# Standalone runners (run-mN.sh / run-prework.sh / run-a101.sh without a
# chain) get the same guard. Runners already own `trap cleanup EXIT`, so the
# restore is a call at the end of their cleanup(), not a second trap. Inside a
# chain the runner stands aside — the chain's guard owns the restore.
# CLAUDE_RUNNER_KEEP_SKILLS=1 opts out (hand-chaining m4a → m4b).
runner_guard_skills() {                 # $1=run dir (snapshot lives there)
  [[ -n "${CLAUDE_RUNNER_CHAIN_DIR:-}" ]] && return 0
  if [[ "${CLAUDE_RUNNER_KEEP_SKILLS:-}" == 1 ]]; then
    echo "[runner] CLAUDE_RUNNER_KEEP_SKILLS=1 — skills this run writes stay in user scope" >&2
    return 0
  fi
  _RUNNER_SKILLS_SRC="${CLAUDE_RUNNER_SKILLS_DIR:-$HOME/.claude/skills}"
  _RUNNER_SKILLS_SNAP="$1/.skills-before"
  mkdir -p "$_RUNNER_SKILLS_SRC" "$_RUNNER_SKILLS_SNAP"
  rsync -a "$_RUNNER_SKILLS_SRC/" "$_RUNNER_SKILLS_SNAP/"
  # Interim EXIT trap until the runner installs `trap cleanup EXIT` (which
  # replaces this one and calls runner_restore_skills itself). Covers exits in
  # between — run-prework.sh deletes the student skills ~60 lines earlier.
  trap 'runner_restore_skills' EXIT
  trap 'exit 130' INT                   # route signals through the EXIT trap
  trap 'exit 143' TERM
}

runner_restore_skills() {
  [[ -d "${_RUNNER_SKILLS_SNAP:-}" ]] || return 0
  rsync -a --delete "$_RUNNER_SKILLS_SNAP/" "$_RUNNER_SKILLS_SRC/" \
    && rm -rf "$_RUNNER_SKILLS_SNAP" \
    && echo "[runner] $_RUNNER_SKILLS_SRC restored to its pre-run snapshot" >&2
}
