#!/usr/bin/env bash
# A101 Prework step 1 (Cowork): standard state -> Project or folder -> Add folder -> Documents
# -> New Folder -> agents-101 -> Create -> Open -> Allow.
# usage: a101-prework-add-folder.sh dry          no recording; stops at the New Folder dialog, cancels out
#        a101-prework-add-folder.sh record [out]  records the window to out (default out/a101-prework-add-folder.mov)
set -euo pipefail
source "$(cd "$(dirname "$0")/.." && pwd)/steps.sh"
MODE="${1:-dry}" MOV="${2:-$OUT/a101-prework-add-folder.mov}"
# redact: --crop 556,0,2154,1502 --width 2154 --trim 31 --blur 990,1110,1360,350@0-6.3 --blur 990,1170,1360,290@6.3-24 --blur 990,1110,1360,350@24-99
# Hint chain: one short clip per key moment, cropped to where it happens. Crop coords are px of the cut's source
# (src=raw: the raw take; otherwise the redacted video = raw x - 556). Raw cuts end just after the press ring.
# cut[1-add-folder]: 3.0-6.05 crop=600:220:990:750 src=raw
# cut[2-documents]: 8.6-9.75 crop=286:330:560:315 src=raw
# cut[3-new-folder]: 11.6-12.5 crop=1292:103:848:1085 src=raw
# cut[4-name-it]: 13.3-19.95 crop=638:300:1037:600 src=raw round=24
# cut[5-open]: 21.9-23.3 crop=1292:103:848:1085 src=raw
# cut[6-allow]: 24.1-26.7 crop=794:272:958:615 src=raw round=24
# cut[7-attached]: 26.8-30.3 crop=1340:300:410:660
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
