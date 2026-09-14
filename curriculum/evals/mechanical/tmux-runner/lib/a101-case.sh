#!/usr/bin/env bash

# Shared case resolver for the Agents 101 runner. A case supplies participant
# answers, source material, and assertion sentinels. The prompt sequence remains
# in scenarios/a101-*.txt.

a101_case_dir() {
  local runner_root="$1" case_name="$2"
  case "$case_name" in
    nordveil) printf '%s\n' "$runner_root/fixtures/agents-101-synthetic" ;;
    finnish-psychologist) printf '%s\n' "$runner_root/fixtures/agents-101-finnish-psychologist" ;;
    *) return 1 ;;
  esac
}

a101_load_case() {
  local runner_root="$1" case_name="$2"
  local resolved
  resolved="$(a101_case_dir "$runner_root" "$case_name")" || {
    echo "unknown Agents 101 case: $case_name (expected nordveil or finnish-psychologist)" >&2
    return 2
  }
  [[ -f "$resolved/case.env" ]] || {
    echo "Agents 101 case is missing case.env: $resolved" >&2
    return 2
  }
  A101_CASE="$case_name"
  A101_CASE_DIR="$resolved"
  # case.env files are trusted, versioned runner configuration.
  # shellcheck source=/dev/null
  source "$resolved/case.env"
  export A101_CASE A101_CASE_DIR
}

a101_module_rank() {
  case "$1" in
    prework) echo 0 ;;
    m1) echo 1 ;;
    m2) echo 2 ;;
    m3) echo 3 ;;
    m4a) echo 4 ;;
    m4b) echo 5 ;;
    m5) echo 6 ;;
    m6) echo 7 ;;
    m7) echo 8 ;;
    m8) echo 9 ;;
    *) return 1 ;;
  esac
}

a101_case_supports_module() {
  local module="$1"
  [[ "$(a101_module_rank "$module")" -le "$(a101_module_rank "$A101_MAX_MODULE")" ]]
}
