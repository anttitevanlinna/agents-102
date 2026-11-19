# desktop-driver

Drives the Claude desktop app (Chat/Cowork + Code tabs) from a script, verifying every step, and records takes as screen video. Uses: course setup videos, live simulation of Cowork-path prompts, UI drift checks when the app changes. Sibling of `tmux-runner` (CLI path); this is the GUI path.

## Contract

1. **Standard Cowork state** before every take: Chat tab, sidebar scrolled to top, a new empty chat, chip under the input reads `Project or folder`, nothing open on top. `reset.sh` gets there and verifies it, or stops.
2. **Click text, never remembered coordinates.** `click_text` OCRs the window (macOS Vision) and clicks the centre of the match. Only exception: the Chat/Code tab icons (no text), `276,46` / `310,47`.
3. **Expect before the next step.** Every click is followed by `expect_text` for the screen it should open. First surprise = abort. Typing only after its target field is confirmed on screen.
4. **`settle` after anything that moves** (scroll, animation): same OCR position twice, 0.5 s apart, then click.
5. **Dry first.** A take's `dry` mode runs to the last step before any change on disk, cancels out, resets.

## Use

```bash
cd curriculum/evals/mechanical/desktop-driver
bash takes/a101-prework-add-folder.sh dry          # rehearse: runs to the last step before anything changes, cancels out
./clip.sh a101-prework-add-folder                  # record + redact + leak check + contact sheet -> out/<take>.mp4
./clip.sh a101-prework-add-folder --redact         # re-redact the existing recording after tuning
```

`clip.sh` builds the helpers on first use. Run with bash, not zsh. `out/` is gitignored: the raw `.mov` shows the operator's whole screen and never leaves the machine; only the `.mp4` that printed `CLEAN` does.

## New take

Copy `takes/a101-prework-add-folder.sh`. Keep the shape: guard against leftovers → `reset.sh` → start recording → `click_text` / `expect_text` pairs → `dry` branch that stops before the first change on disk. Declare redaction in one comment line, `# redact: --crop … --trim … --blur x,y,w,h@from-to`. Dry-run until it passes, then `clip.sh`.

## Redaction (`bin/redact`)

- **Allowlist, not denylist.** Every text line OCR finds in every frame is blurred unless it is in `redact-allow.txt` (the app's own labels, the course's own names). Unknown text — anyone's folder, project, file or person names — is blurred by default, wherever it moves. Near-misses of an allowed label (glued chevron, cut-off prefix, one misread letter) stay sharp.
- **Held ±8 frames**, so dialogs sliding in or out stay covered. **`--blur` regions** cover private pixels OCR cannot read (artifact thumbnails); `@from-to` limits one to a time window (e.g. step it below a dialog while the dialog is up).
- **Leak check** (in `clip.sh`): OCRs the finished clip against this Mac's real names (`~/Documents`, `~/Desktop`, username, first name), built at run time, never written. Any hit fails the clip. Proven fail-closed: the same check on the raw take finds hundreds of hits.
- Adding to the allowlist: only the app's wording, never a name a user chose.

## Setup (once per Mac)

- System Settings → Privacy & Security → **Accessibility** and **Screen & System Audio Recording**: Claude on. Each applies only after Claude is relaunched. Without Screen Recording, captures show only the wallpaper.
- Geometry in `steps.sh` (`WIN_X/Y/W/H`) is the operator's window; check with `osascript -e 'tell application "System Events" to get {position, size} of window 1 of process "Claude"'`.

## Learned (2026-11-18)

- **The app reopens whatever was last viewed.** ⌘N in the Chat tab is unreliable; a blind take opened a doc in edit mode and typed into it. Hence the standard state.
- **This session lives in the same window.** Code tab = the operator's transcript. Switching to Chat moves them off it, and their glance can flip it back mid-take: hands off during a take. Quiet first seconds (OCR checks) look like a hang; they are not.
- **Esc only when a dialog is confirmed on screen.** In the Code tab, Esc reaches the chat input.
- **OCR quirks:** chevrons read as a trailing `v` (`Project or folder v`), sidebar icons as a leading glyph, badges join the label (`Dispatch Beta`). Match `contains` for those.
- **Park the pointer by moving, never clicking.** A "park" click at an empty-looking spot opened a *Recent artifacts* card (a doc, in edit mode). `bin/scroll x y 0` moves without clicking.
- **Scroll glides past the event.** Clicking `New` mid-glide hit `Artifacts`.
- **Cowork facts:** Cowork = the Chat tab (no separate tab). Folder chip → `Add folder` opens the picker *Add folders to this session* (has its own `New Folder`). It **adds**; an already-attached default stays (`… +1`). Opening a folder asks *Allow Claude to change files in "…"?* (Cancel / Always allow / Allow). The picker remembers its last location. Cowork's shell reaches the internet (`curl` HTTP 200).
- **System Events `click at` does nothing on the Electron web view;** real HID events (`bin/click`, CGEvent) do. The AX tree is exposed only intermittently (`AXManualAccessibility`), so OCR is the locator.
