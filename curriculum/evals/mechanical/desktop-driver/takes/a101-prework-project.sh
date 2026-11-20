#!/usr/bin/env bash
# A101 Prework (Cowork, Mac): make the agents-101 project, its folder linked from Documents.
#   Projects -> New project -> name agents-101 -> Context + -> Link local folder -> Documents -> New Folder -> agents-101
#   -> Create -> Add folder -> Create project
# Start: cowork-new-chat. End: an agents-101 project linked to ~/Documents/agents-101 (created by the take).
# usage: a101-prework-project.sh list | step NAME | dry | record [out]
set -euo pipefail
source "$(cd "$(dirname "$0")/.." && pwd)/steps.sh"
MODE="${1:-list}"
# allow: agents-101
# allow: re:^agents-1?0?1?$
# allow: re:^a(g(e(n(t(s(-(1(0(1)?)?)?)?)?)?)?)?)?$
# redact: (set after the first recording)
DLG="480 1180 170 640"    # the New project dialog
PICK="335 1135 170 630"   # the folder picker

STEPS=(open-projects new-project name context-menu link documents new-folder name-folder add-folder create context)

step_open-projects() {   # any screen -> Projects page
  start_state cowork-new-chat
  click_text "Projects" contains 600 0 300 140 180
  expect_text "New project" contains 4 1100 1412 120 190
}
step_new-project() {     # Projects page -> New project dialog, empty
  expect_text "New project" contains 2 1100 1412 120 190
  click_text "New project" contains 700 1100 1412 120 190
  expect_text "Create project" contains 4 $DLG
  on_abort 'click_text "Cancel" exact 300 480 1180 560 640'
}
step_name() {            # dialog -> name typed
  expect_text "API performance" contains 3 $DLG
  click_text "API performance" contains 500 $DLG
  type_slow "agents-101"; sleep 0.6
  expect_text "agents-101" contains 3 $DLG
}
step_context-menu() {    # name typed -> Context + menu
  expect_text "Context" contains 2 $DLG
  click_text "+" exact 700 850 1000 440 520
  expect_text "Link local folder" contains 3 $DLG
}
step_link() {            # Context menu -> folder picker (Link local folder)
  click_text "Link local folder" contains 600 $DLG
  expect_text "trusted for Claude Code" contains 5
  on_abort 'press_esc'
}
step_documents() {       # picker -> picker on Documents
  click_text "Documents" contains 700 335 480 170 630   # sidebar
  expect_text "Documents" contains 4 480 1135 210 250  # location pop-up
}
step_new-folder() {      # picker on Documents -> name dialog
  click_text "New Folder" contains 700 $PICK
  expect_text "Name of new folder" contains 4
  on_abort 'press_esc'
}
step_name-folder() {     # name dialog -> agents-101 created and selected   (changes disk)
  expect_text "Name of new folder" contains 2
  type_slow "agents-101"; sleep 0.8
  click_text "Create" exact 500 $PICK
  expect_text "agents-101" contains 4 $PICK
  sleep 0.8
}
step_add-folder() {      # agents-101 selected -> dialog lists agents-101 under Context
  click_text "Add folder" exact 700 1000 1140 575 610
  expect_text "Create project" contains 5 $DLG
  expect_text "agents-101" contains 3 480 1180 440 640
}
step_create() {          # dialog filled -> the agents-101 project page (Claude greets and starts a first turn by itself)
  click_text "Create project" contains 700 $DLG
  expect_text "Threads" exact 6 900 1412 30 70
  expect_text "agents-101" contains 3 300 900 30 70
}
step_context() {         # project page -> Context tab: the folder linked as the project's default
  click_text "Context" exact 700 900 1100 30 70
  expect_text "This computer" contains 4 860 1412 260 310
  expect_text "Default" contains 2 860 1412 260 310
  sleep 2.5
}

run() { echo "== $1"; "step_$1"; }
case "$MODE" in
  list)   printf '%s\n' "${STEPS[@]}" ;;
  step)   n="${2:?step NAME}"; declare -F "step_$n" >/dev/null || die "no step $n (list: ${STEPS[*]})"; run "$n" ;;
  dry)    [[ ! -e "$HOME/Documents/agents-101" ]] || die "~/Documents/agents-101 exists"
          for s in "${STEPS[@]}"; do [[ "$s" == name-folder ]] && break; run "$s"; done
          echo "DRY: reached the name dialog; undoing"; undo; back_to_operator; echo "DRY-OK" ;;
  record) [[ ! -e "$HOME/Documents/agents-101" ]] || die "~/Documents/agents-101 exists"
          MOV="${2:-$OUT/a101-prework-project.mov}"
          run open-projects; rec_start "$MOV" 60
          for s in "${STEPS[@]:1}"; do run "$s"; done
          rec_stop; back_to_operator; echo "TAKE-OK $MOV" ;;
  *)      die "usage: $0 list | step NAME | dry | record [out]" ;;
esac
