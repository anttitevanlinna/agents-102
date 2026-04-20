# Delivery Incidents — Append-Only Log

Every training-day failure that wasn't about curriculum content. These are the expensive-in-the-room, cheap-in-pre-flight failures. Each incident becomes a permanent entry in `pre-flight-checklist.md`.

**Rule:** you'll never be surprised by the same failure twice. New categories get seed entries here even before an incident confirms them — imagination is cheap.

**Entry shape:**

```
### YYYY-MM-DD — [cohort / run name] — [short title]
**Environment:** [OS, Claude Code version, network, connector]
**Where:** [module / phase]
**What happened:** [what the student saw, not what we meant to happen]
**Root cause:** [why]
**Fix (in the moment):** [what resolved it live]
**Fix (curriculum / pre-flight):** [permanent change made]
**Class:** [zip / path / default-app / download / auth / sync / clipboard / other]
```

---

## Seed entries (from Antti's memory — confirm or refine)

### — Known pattern — Windows users browse inside zip without extracting
**Environment:** Windows (Explorer)
**Where:** prework / any module with a scaffold zip
**What happened:** Student double-clicked the zip, Explorer shows contents, student opens files "inside" the zip, edits nothing persists, nothing references correctly.
**Root cause:** Windows Explorer previews zip contents as if extracted; right-click → Extract All is not discoverable.
**Fix (in the moment):** Walk through Extract All, then navigate to extracted folder.
**Fix (curriculum / pre-flight):** Any zip instruction must include explicit "right-click → Extract All → then open the EXTRACTED folder, not the zip." And: pre-flight checklist tests on a fresh Windows machine.
**Class:** zip

### — Known pattern — "I can't unzip"
**Environment:** macOS + Windows
**Where:** prework / scaffold handoff
**What happened:** Some students' default zip handler is broken (old 3rd-party app hijacks, missing admin rights to install).
**Root cause:** No universal zip story across enterprise-managed laptops.
**Fix (in the moment):** Screen-share through it.
**Fix (curriculum / pre-flight):** Prefer a one-folder-per-module scaffold dropped via the website (copy-paste commands) over a zip when feasible. If zip is unavoidable, include fallback instructions for macOS Archive Utility and Windows Extract All, + "ask the trainer if neither works."
**Class:** zip

### — Known pattern — HTML handbook bundle gets lost
**Environment:** any
**Where:** post-download, 3 days later
**What happened:** Student downloaded the training handbook as an HTML bundle, can't find it when they need to look up Module 3 reference material.
**Root cause:** Downloads folder amnesia; `.html` files don't re-open easily without the surrounding folder.
**Fix (in the moment):** Re-send the link.
**Fix (curriculum / pre-flight):** Move to password-protected static URL per customer (already the direction in `curriculum/CLAUDE.md` § Material Distribution). The URL is bookmarked, not downloaded. Never ship an HTML bundle for a document students will return to.
**Class:** download

### — Imagined but likely — Spaces / non-ASCII in username break paths
**Environment:** macOS "Firstname Lastname" usernames; Finnish ä/ö in paths
**Where:** any time a prompt uses `~/Documents/agents-102-bootstrap/` as a literal
**What happened (predicted):** File-write commands fail; Claude sometimes quotes paths, sometimes doesn't; error messages look like permissions bugs.
**Root cause:** Shell-quoting inconsistency.
**Fix (pre-flight):** Test with a username containing a space on the fresh laptop pre-flight.
**Class:** path

### — Imagined but likely — Default app opens .md in TextEdit / Notepad
**Environment:** any
**Where:** any time instruction says "open X.md"
**What happened (predicted):** Student opens .md in TextEdit, it renders raw markdown with tons of asterisks, confusion.
**Root cause:** Default-app for .md varies.
**Fix (pre-flight):** Instruction should say "read it in Claude Code's Read tool" or "open in your browser via the site" — never "open the .md file directly." When students must see raw markdown (e.g., CLAUDE.md edits), say "the raw markdown is the point; don't worry about rendering."
**Class:** default-app

### — Imagined but likely — MCP connector admin consent blocks prework
**Environment:** Microsoft 365 or Google Workspace, enterprise tenant
**Where:** prework Task 2 (calendar connector)
**What happened (predicted):** Student tries to enable the connector on a Sunday evening, hits "admin approval required," can't complete Task 2.
**Root cause:** Enterprise tenants lock down OAuth scopes.
**Fix (curriculum):** Prework Task 2 ALREADY has a Path B screenshot fallback — good. Pre-flight check: does the fallback work without the connector at all?
**Class:** auth

### — Imagined but likely — OneDrive / iCloud / Dropbox eats writes
**Environment:** any sync-folder
**Where:** any time training dir is inside a sync root
**What happened (predicted):** Claude writes a file, sync reconciles mid-write, conflict copy appears (`file (My MacBook conflicted copy 2).md`).
**Root cause:** Sync daemons can't keep up with Claude Code's write pattern.
**Fix (curriculum):** `self-study/SKILL.md` already enforces "not inside OneDrive/iCloud/Dropbox" — good. Pre-flight: verify the self-study setup dialog surfaces this clearly on a machine whose Documents folder IS synced.
**Class:** sync

### — Imagined but likely — localhost:8000 lecture server not running
**Environment:** self-study
**Where:** any module that links to a lecture
**What happened (predicted):** Student clicks `curriculum.html?file=...`, gets connection-refused because they didn't start `python3 -m http.server 8000`, gives up.
**Root cause:** Prework assumes the student runs a local HTTP server. This is a dev-environment assumption, not a delivery-mode one.
**Fix (curriculum):** Move lectures to the hosted site (password-protected URL). Don't ask students to run `python3 -m http.server` — that's a setup cliff for a non-developer audience. **This is a known incident before first real cohort — fix before any self-study pilot.**
**Class:** other / delivery-mode

---

## How to add an incident

1. Something breaks in a real run (or you realize an imagined risk is likely).
2. Open this file, append an entry using the shape above.
3. Update `pre-flight-checklist.md` with the corresponding check.
4. Update the curriculum file(s) if the root cause is curriculum-level.
5. Same-day. Don't batch — you'll forget context.
