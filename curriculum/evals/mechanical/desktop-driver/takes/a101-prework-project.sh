#!/usr/bin/env bash
# A101 Prework (Cowork, Mac): make the agents-101 project, its folder linked from Documents.
#   Projects -> New project -> name agents-101 -> Context + -> Link local folder -> Documents -> New Folder -> agents-101
#   -> Create -> Add folder -> Create project
# Start: cowork-new-chat. End: an agents-101 project linked to ~/Documents/agents-101 (created by the take).
# usage: a101-prework-project.sh list | step NAME | dry | record [out] | teardown
# teardown: delete the project named exactly agents-101 whose Context shows the agents-101 folder as Default, then
# remove ~/Documents/agents-101 only if empty. Each check aborts on a mismatch. Run it before re-recording.
set -euo pipefail
source "$(cd "$(dirname "$0")/.." && pwd)/steps.sh"
MODE="${1:-list}"
# allow: agents-101
# allow: re:^agents-1?0?1?$
# allow: re:^a(g(e(n(t(s(-(1(0(1)?)?)?)?)?)?)?)?)?$
# allow: re:^agents-101 th.{1,3} computer
# review-text: Make an agents-101 project. Every task you start in it has your course folder attached.
# review-text: 1. In the left sidebar, click **Projects**, then **New project** (top right).
# review-text: 2. Under **Name**, type `agents-101`.
# review-text: 3. Next to **Context**, click **+**, then **Link local folder**.
# review-text: 4. In the picker, click **Documents**, then **New Folder**. Name it `agents-101`, click **Create**, then **Add folder**.
# review-text: 5. Click **Create project**, then the **Context** tab. Under **Files**, `agents-101` is listed as **Default**.
# review-fixed: The workbook text above is a draft written for this review; judge the video against it.
# review-fixed: Claude greets the student on the new project page; the video skips that and goes to the Context tab.
# review-fixed: In the Create project clip the folder's location (the Mac's name) is blurred on purpose.
# redact: --width 2710 --trim 95
# Hints: what each clip shows; WHEN comes from the take's own logs (clip.sh times them: step start -> its last press, or
# end=done). Crops are raw px (window x2). name-folder ends on Create: a frame later the dialog fades onto the private
# folder list. context skips the "Files 0" flash just after the click; its outline marks the linked folder.
# hint[projects]: crop=480:520:0:120 src=raw lead=1.0 hold=1.0
# hint[new-project]: crop=2050:200:660:110 src=raw scale=0.6 hold=1.0
# hint[name]: crop=1020:240:856:310 src=raw end=done hold=1.0
# hint[context-menu]: crop=1020:370:856:860 src=raw hold=0.6
# hint[link]: crop=1020:370:856:860 src=raw hold=1.0
# hint[documents]: crop=286:330:560:315 src=raw hold=0.8
# hint[new-folder]: crop=1292:103:848:1085 src=raw hold=1.0
# hint[name-folder]: crop=638:300:1037:600 src=raw round=24 hold=1.0
# hint[add-folder]: crop=1292:103:848:1085 src=raw hold=1.0
# hint[create]: crop=1020:370:856:860 hold=1.0
# hint[context]: crop=1104:620:1606:10 src=raw end=done skip=2.0-2.5 mark=216:487:500:48:0.3 hold=1.5
DLG="480 1180 170 640"    # the New project dialog
PICK="335 1135 170 630"   # the folder picker

STEPS=(home projects new-project name context-menu link documents new-folder name-folder add-folder create context)

step_home() {            # any screen -> an empty new chat (not recorded)
  start_state cowork-new-chat
}
step_projects() {        # new chat -> Projects page
  click_text "Projects" contains 900 0 300 140 180
  expect_text "New project" contains 4 1100 1412 120 190
  sleep 0.8
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

run() { run_step "$1"; }
case "$MODE" in
  list)   printf '%s\n' "${STEPS[@]}" ;;
  step)   n="${2:?step NAME}"; declare -F "step_$n" >/dev/null || die "no step $n (list: ${STEPS[*]})"; run "$n" ;;
  dry)    [[ ! -e "$HOME/Documents/agents-101" ]] || die "~/Documents/agents-101 exists"
          for s in "${STEPS[@]}"; do [[ "$s" == name-folder ]] && break; run "$s"; done
          echo "DRY: reached the name dialog; undoing"; undo; back_to_operator; echo "DRY-OK" ;;
  record) [[ ! -e "$HOME/Documents/agents-101" ]] || die "~/Documents/agents-101 exists"
          MOV="${2:-$OUT/a101-prework-project.mov}"
          run home; rec_start "$MOV" 95
          for s in "${STEPS[@]:1}"; do run "$s"; done
          echo "step log: ${MOV%.mov}.steps.tsv"; cat "${MOV%.mov}.steps.tsv"
          rec_stop; back_to_operator; echo "TAKE-OK $MOV" ;;
  teardown)
          start_state cowork-new-chat >/dev/null
          click_text "Projects" contains 500 0 300 140 180; sleep 1.5
          click_text "agents-101" exact 500 300 1412 190 760   # exact: never "agents-101 upgrade" or the like
          expect_text "Threads" exact 5 900 1412 30 70
          click_text "Context" exact 400 900 1100 30 70
          expect_text "This computer" contains 4 860 1412 260 310   # the folder this take links, as Default
          expect_text "Default" contains 2 860 1412 260 310
          "$BIN/click" 473 49 400; expect_text "Delete" exact 3 450 560 300 340   # the project's header menu
          click_text "Delete" exact 400 450 560 300 340
          expect_text "Delete project?" contains 3
          click_text "Delete" exact 400 860 920 435 465; sleep 2
          if [[ -d "$HOME/Documents/agents-101" ]]; then rmdir "$HOME/Documents/agents-101" || die "~/Documents/agents-101 is not empty: left alone"; fi
          back_to_operator; echo "TEARDOWN-OK" ;;
  *)      die "usage: $0 list | step NAME | dry | record [out] | teardown" ;;
esac
