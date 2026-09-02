#!/usr/bin/env bash
set -euo pipefail

render_controls() {
  local profile="$1" text="$2"
  local no_questions direct_execution multi_agent save_without_review
  case "$profile" in
    cli)
      no_questions='Headless dry-run: do not call AskUserQuestion and do not pause for questions.'
      direct_execution='Stay out of plan mode and execute directly.'
      multi_agent='Use Claude subagents for the parallel work.'
      ;;
    codex-cli)
      no_questions='Headless dry-run: do not request interactive user input and do not pause for questions.'
      direct_execution='Execute directly without entering an interactive planning pause.'
      multi_agent='Use Codex agents for the parallel work.'
      ;;
    *)
      echo "render_controls: unsupported executable profile: $profile" >&2
      return 2
      ;;
  esac
  save_without_review='Save the requested artifacts without waiting for review or approval.'
  text="${text//<CONTROL:NO_QUESTIONS>/$no_questions}"
  text="${text//<CONTROL:DIRECT_EXECUTION>/$direct_execution}"
  text="${text//<CONTROL:MULTI_AGENT>/$multi_agent}"
  text="${text//<CONTROL:SAVE_WITHOUT_REVIEW>/$save_without_review}"
  if [[ "$text" == *'<CONTROL:'* ]]; then
    echo "render_controls: unresolved control token in scenario text" >&2
    return 2
  fi
  printf '%s' "$text"
}
