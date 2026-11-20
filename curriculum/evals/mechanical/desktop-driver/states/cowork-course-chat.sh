#!/usr/bin/env bash
# Start state "cowork-course-chat": cowork-new-chat + ~/Documents/agents-101 attached (chip reads agents-101).
# Most training scenes start here. The folder must exist (a fixture or an earlier take's result); the picker jumps
# to it by path, so the operator's Documents list is never browsed. Leaves Allow answered for this chat.
set -euo pipefail
source "$(cd "$(dirname "$0")/.." && pwd)/steps.sh"
FOLDER="${COURSE_FOLDER:-$HOME/Documents/agents-101}"
[[ -d "$FOLDER" ]] || die "no course folder $FOLDER: create the fixture first"
bash "$DRIVER/states/cowork-new-chat.sh"
click_text "Project or folder" contains 500 300 1412 400 650
expect_text "Add folder" contains 4 300 1412 350 560
click_text "Add folder" contains 500 300 1412 350 560
expect_text "Add folders to this session" contains 6
picker_go "$FOLDER"
expect_text "$(basename "$FOLDER")" contains 4
click_text "Open" exact 500
allow_if_asked
expect_text "$(basename "$FOLDER")" contains 6 300 1412 400 650
"$BIN/scroll" 1300 300 0
echo "STATE-OK"
