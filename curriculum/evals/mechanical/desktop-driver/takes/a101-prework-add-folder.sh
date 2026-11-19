#!/usr/bin/env bash
# A101 Prework step 1 (Cowork): standard state -> Project or folder -> Add folder -> Documents
# -> New Folder -> agents-101 -> Create -> Open -> Allow.
# usage: a101-prework-add-folder.sh dry          no recording; stops at the New Folder dialog, cancels out
#        a101-prework-add-folder.sh record [out]  records the window to out (default out/a101-prework-add-folder.mov)
set -euo pipefail
source "$(cd "$(dirname "$0")/.." && pwd)/steps.sh"
MODE="${1:-dry}" MOV="${2:-$OUT/a101-prework-add-folder.mov}"
PICK="335 1135 170 630"                               # picker bounds, screen points

[[ ! -e "$HOME/Documents/agents-101" ]] || die "~/Documents/agents-101 already exists"
bash "$DRIVER/reset.sh"

if [[ "$MODE" == record ]]; then
  rm -f "$MOV"; screencapture -v -k -x -V 40 -R"$WIN_X,$WIN_Y,$WIN_W,$WIN_H" "$MOV" & REC=$!
  sleep 2.5
fi

click_text "Project or folder" contains 700 300 1412 400 650
expect_text "Add folder" contains 4 300 1412 350 560
click_text "Add folder" contains 600 300 1412 350 560
expect_text "Add folders to this session" contains 6
click_text "Documents" contains 700 335 480 170 630   # OCR: "D Documents" (icon read as a letter)
sleep 1
click_text "New Folder" contains 700 $PICK
expect_text "Name of new folder" contains 4

if [[ "$MODE" == dry ]]; then
  echo "DRY: reached the New Folder dialog; cancelling out"
  press_esc; expect_text "Add folders to this session" contains 3
  press_esc
  bash "$DRIVER/reset.sh" >/dev/null && echo "DRY-OK"
  exit 0
fi

type_slow "agents-101"; sleep 0.8
click_text "Create" exact 500 $PICK
expect_text "agents-101" contains 4 $PICK
sleep 0.8
click_text "Open" exact 700 $PICK
expect_text "Allow Claude to change files" contains 6
click_text "Allow" exact 600 300 1412 300 600
expect_text "agents-101" contains 6 300 1412 400 650   # the chip now names the folder
sleep 3
wait "${REC:-}" 2>/dev/null || true
echo "TAKE-OK $MOV"
