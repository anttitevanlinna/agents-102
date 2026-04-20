# Pre-Flight Checklist

Run by a volunteer on a clean laptop before every cohort. NOT by Antti. Antti has built the blind spot; you need someone whose path *doesn't* work so they find what yours obscures.

**Time:** ~45 minutes for full run. Shorter per-module if targeted.

**Environments to cover (priority order):**
1. Windows 10/11, default tenant-managed Edge, no admin rights
2. macOS with a username containing a space or non-ASCII character
3. macOS with Documents folder synced to iCloud (to test sync-eating)

Run each environment through at minimum prework + Module 1. One environment is fine for first dry runs; three for real cohort pre-flight.

## Generic checks (every cohort, every environment)

### Setup
- [ ] Claude Code installs without admin rights (or with documented steps for blocked installs)
- [ ] Claude Code can write to `~/Documents/agents-102-bootstrap/` (path with space in username if applicable)
- [ ] Self-study setup does NOT place training dir inside OneDrive / iCloud / Dropbox — warning appears if it would
- [ ] Website opens from the cohort URL; bookmarked in browser

### Zip / scaffold handoff
- [ ] Any scaffold zip: right-click → Extract All on Windows works
- [ ] After extract, instructions make it clear to navigate INTO the extracted folder (not the zip)
- [ ] On macOS, double-clicking the zip extracts to the correct folder (not Downloads parent)
- [ ] Files inside the scaffold land at paths the curriculum text names verbatim

### File handling
- [ ] No curriculum instruction says "open foo.md" in a way that lands in TextEdit / Notepad with raw markdown
- [ ] When raw markdown is the point (CLAUDE.md edits), instruction names this
- [ ] File paths quoted correctly in prompts (spaces in paths don't break)

### Downloads / discoverability
- [ ] Training handbook / reference is a URL the student bookmarks, NOT a downloaded file
- [ ] Any unavoidable download states where it will go and how to find it

### Auth / connectors
- [ ] Every connector instruction (Microsoft 365, Google Workspace, etc.) has a documented screenshot / manual fallback
- [ ] The fallback works without the connector — tested, not assumed

### Clipboard
- [ ] Multi-line prompts paste into Claude Code with indentation intact (try one on Windows Edge, Mac Safari)

## Prework-specific checks (run before any cohort)

- [ ] Task 1 snake game: paste-into-Claude-Code → file lands in `prework/snake.html` → double-click opens in browser on both Windows and Mac
- [ ] Task 2 Path A (connector): from zero, walk through enabling connector; does it hit admin consent? If so, Path B is the documented fallback — is it actually reachable from Claude Code UI (take screenshot → find screenshot → summarize)?
- [ ] Task 3 supplementary link: `curriculum.html?file=supplementary/what-is-an-agent` — does this URL open? **Check the renderer's link format — is `?file=` correct or should it be `?page=` or similar?**
- [ ] Prework time estimate (45 min) — did the volunteer actually complete in ≤60 min?

## Module 1-specific checks

- [ ] Lecture links from `getting-going.md`: do they resolve? `lectures/context-is-king.md` and `lectures/what-just-happened.md` must exist.
- [ ] Exercise: `exercises/personal-site-with-guardrails.md` resolves.
- [ ] M1 exercise requires the student's LinkedIn profile — is the prompt clear on HOW to provide it (paste URL, paste text, screenshot)?
- [ ] Debrief prompt writes to `module-1/CLAUDE.md` — does this directory exist at Debrief time? (Scaffold seed check.)
- [ ] M1 total time ≤ 1h45 including the sponsor-speaks opener.

## Inconsistencies to watch for

Known contradictions to specifically verify (flag if either side breaks):

- Prework says "CLI is smoothest"; M1 meta line says "desktop or web — no terminal." Pick one in the prework text or explicitly reconcile.
- Prework line 10 references `localhost:8000` — is that still how lectures are served, or is the hosted site live?
- `curriculum.html?file=...` link format — is this the correct query param the renderer accepts, or is it `?module=...`? (Module navigation uses `?training=<name>&module=<slug>`.)

## Reporting

After pre-flight, fill this block and save to `curriculum/evals/instances/pre-flight-YYYY-MM-DD.md`:

```
Volunteer: [name]
Environment: [OS + Claude Code version + tenant type]
Date: YYYY-MM-DD
Duration: [actual minutes]

Blockers (training-breaking): [list]
Friction (training-delaying): [list]
Confusion (training-murking): [list]
All clear: [list]

Recommend ship: YES / YES WITH FIXES / NO — [reasons]
```

Any blocker = fix before cohort. Frictions = fix or pre-warn trainer. Confusions = note for curriculum next pass.
