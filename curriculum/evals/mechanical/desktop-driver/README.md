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
./clip.sh a101-prework-add-folder --cut            # re-cut the hint clips only (seconds, no OCR pass)
```

`clip.sh` builds the helpers on first use. Run with bash, not zsh. `out/` is gitignored: the raw `.mov` shows the operator's whole screen and never leaves the machine; only the `.mp4` that printed `CLEAN` does.

## New take

Copy `takes/a101-prework-add-folder.sh`. Keep the shape: guard against leftovers → `reset.sh` → start recording → `click_text` / `expect_text` pairs → `dry` branch that stops before the first change on disk. Declare redaction in one comment line, `# redact: --crop … --trim … --blur x,y,w,h@from-to`. Dry-run until it passes, then `clip.sh`.

## Hint chains — cut to the hint, not the screen

What ships is not the take but a **chain of hint clips**: 2–6 s each, one key moment, cropped to the place where it happens (the chip and its menu, the name dialog, the Allow card, the result). Maintainer, 2026-11-19: it shows the student only the hint they need, none of the clutter, and it keeps the redaction need close to zero. One take records the whole flow once; each hint is one line in the take:

```
# cut[3-name-it]: 13.3-19.4 crop=638:300:1037:600 src=raw round=24
```

- **Crop to the element's own edges.** Measure them in pixels (white panel on dimmed screen: scan outward from inside it), never eyeball. A margin shows slivers of the screen behind.
- **`round=R`** masks a dialog's rounded corners to white; measure R the same way (the first white pixel per row from the corner).
- **One action per hint, ending on the press ring.** The recording draws a ring at each click (`screencapture -k`); the ring lasts ~1 frame, so end a raw cut ON the ring frame and let `hold=` freeze it — the hint says *click*, not just *go here*. Find it with a 20–30 fps tile strip of the crop (`ffmpeg … fps=10,crop=…,drawtext=%{pts},tile`). Redacted cuts end on arrival: a pressed button misreads and blurs. Every hint freezes its last frame `hold=` s (default 0.8) — it loops, the eye needs a beat on the target.
- **Orient, then check.** `lead=S` freezes a hint's first frame (time to find the target on one's own screen); `mark=x:y:w:h:T` draws an orange outline for *check this* (the folder now named, the finished chip) — black ring = click, orange = look. A whole-window overview with blur patches confuses more than it orients: cut it. `mask=` paints a private sliver at a crop edge flat; `scale=` shrinks a tall crop (small text loses — prefer two strips).
- **Done = a fresh student-reviewer says `great and clear`.** Brief a new subagent each round (frames from `<take>-chain.mp4` only, never `out/*.mov`), the workbook text beside it, fixed constraints named so it does not re-ask for them; fix, re-cut, repeat. The add-folder chain took six rounds.
- **A thin strip is a fine crop.** The picker's button bar alone (New Folder · Cancel · Open) carries two hints with nothing private in it.
- **The pointer glides, and lands late.** Start a cut early enough for it to enter the crop; check the landing frame, never the script's click time — hint 2 v1 cut before the pointer arrived and pointed at nothing.
- **`src=raw`** cuts from the unredacted take at native resolution, for crops that show only app text. Redaction blurs a hovered button (the highlight breaks OCR), so a raw cut keeps the hint sharp. The guard: a raw cut must contain **only allowlisted text**; anything else fails it. That is stricter than the name check, because a raw crop has no blur to fall back on.
- Otherwise cuts come from the redacted video. Redact at native width (`--width` = crop width) so hint crops stay crisp.

## Redaction (`bin/redact`)

- **Allowlist, not denylist.** Every text line OCR finds in every frame is blurred unless it is in `redact-allow.txt` (the app's own labels, the course's own names). Unknown text — anyone's folder, project, file or person names — is blurred by default, wherever it moves. Near-misses of an allowed label (glued chevron, cut-off prefix, misread letters: 1 on short labels, 2 on 8+ chars, which covers labels fading in and out) stay sharp. The Claude welcome line (greeting + first name) is allowed: the maintainer wants it shown.
- **Big, still patches, not many small blinking ones.** Boxes snap to a 32 px grid and become tracks; a track is lit 2 frames before its first sighting to 2 after its last, bridging OCR dropouts up to 10 frames. Tracks lit together merge when stacked in one column, so a list is one block; nothing chains sideways. `redact` prints how many frames change blur shape — a calm clip changes only at scene changes (take 1: under a tenth of its frames). Mask edges are feathered.
- **Holding boxes across a time window (±N frames) looked safe and was wrong:** it mixed scenes, a dialog's boxes merged with the previous screen's, and the whole frame went soft.
- **`--blur` regions** cover private pixels OCR cannot read (artifact thumbnails); `@from-to` limits one to a time window (e.g. step it below a dialog while the dialog is up).
- **Leak check** (in `clip.sh`): OCRs the finished clip against this Mac's real names (`~/Documents`, `~/Desktop`, username), built at run time, never written. Entries that are also app words ("Auto") are skipped — they cannot be told apart from the UI. Any hit fails the clip. Proven fail-closed: the same check on the raw take finds hundreds of hits.
- **Known soft spots:** half-second fades (menu closing, dialog dismissing) can blur a label for a frame or two.
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
