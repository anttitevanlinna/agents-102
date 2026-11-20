#!/usr/bin/env bash
# Start state "cowork-new-chat" (run via start_state in steps.sh), verifying each step:
# Chat tab, sidebar at top, a new empty chat, chip reads "Project or folder", nothing open on top.
# Never removes a folder from the chip: if one is attached, it stops and says so.
set -euo pipefail
source "$(cd "$(dirname "$0")/.." && pwd)/steps.sh"

osascript -e 'tell application "Claude" to activate'; sleep 0.5

# A picker, permission dialog or menu left by a broken take: Esc only when one is on screen.
for t in "Name of new folder" "Add folders to this session" "Allow Claude to change files" "Search projects"; do
  if [[ -n "$(find_text "$t" contains)" ]]; then press_esc; echo "  closed: $t"; fi
done

"$BIN/click" $CHAT_TAB 0                             # Chat tab icon (no text to find)
expect_text "Dispatch" contains 5 0 300               # chat-only sidebar item
"$BIN/scroll" 150 400 40                              # sidebar to the top
settle "New" exact 0 300 0 200
click_text "New" exact 300 0 300 0 200
expect_text "How can I help you today" contains 6 300 1412
expect_text "Project or folder" contains 3 300 1412 400 650 \
  || die "the chip shows a folder, not 'Project or folder'; remove it from the chip by hand"
"$BIN/scroll" 1300 300 0                              # park the pointer: MOVE only, never click (cards below the chip open docs)
echo "STATE-OK"
