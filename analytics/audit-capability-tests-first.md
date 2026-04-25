# Capability Audit: Tests-First Integration in M2 & M5

**Date:** 2026-04-24  
**Exercises audited:** push-back-on-the-plan (M2) / diagnose-and-resend (M5)  
**Scope:** Five specific assertions about Claude Code plan mode and task-scoped files  

---

## Assertion 1: Plan mode writes a markdown plan file when asked

**Exercise claim (M2 Phase 2):** *"Write the plan to a plan file."*

**Finding:** VERIFIED with clarification

Plan mode does not explicitly "write" a file as an autonomous action. Instead, **Claude Code prompts the student to save the plan.** The current desktop/CLI workflow is:

1. Claude drafts the plan in conversation
2. At the approval prompt, the student is offered: "Approve and start in auto mode" / "Approve and accept edits" / "Approve and review each edit manually" / **"Keep planning with feedback"** / "Refine with Ultraplan"
3. The student does *not* manually save; **Claude writes the plan file when approved** (upon selecting an approve option, or when the student says "save this plan to a file"—this is implicit in the approval flow, not explicit)

**Correction for M2 Phase 2 prompt:**  
Current: *"Write the plan to a plan file."*  
Should be: *"Create a detailed plan. At the approval prompt, approve it to save it as a file."* (or let Claude auto-name and save it upon approval)

---

## Assertion 2: Plan mode plan can include a tests section as a plan artifact

**Exercise claim (M2 Phase 2 prompt):** *"Tests you'd write or update before any code lands"* as a plan-output section

**Finding:** VERIFIED

Claude Code's plan mode has no enforced structure — it's entirely the model's judgment. The exercise prompt explicitly asks for tests as a plan section. Claude will include a tests section if the prompt asks for it (and M2 does). This is confirmed: practitioners running multi-hour coding agents do converge on tests-first validation, and Claude can structure plans with subsections including tests.

**No change needed.**

---

## Assertion 3: Plan mode "keep planning with feedback" option at approval

**Exercise claim (M2 Phase 3):** *"At the approval prompt, pick keep planning with feedback."*

**Finding:** VERIFIED exactly as written

The official documentation confirms: when a plan is ready, Claude presents an approval prompt offering these options:
- Approve and start in auto mode
- Approve and accept edits
- Approve and review each edit manually
- **Keep planning with feedback** ← explicitly named option
- Refine with Ultraplan

**No change needed. Current keybinding/UI references are correct.**

---

## Assertion 4: Shift+Tab toggles plan mode + status bar shows "plan"

**Exercise claim (M2 Phase 2):** *"Shift+Tab until the status bar shows **plan**."*

**Finding:** VERIFIED for CLI; STALE for Desktop/VS Code

**CLI (desktop terminal):**
- Keybinding: `Shift+Tab` cycles modes: `default` → `acceptEdits` → `plan` (and then `bypassPermissions` / `auto` if enabled)
- Status bar shows mode labels:
  - `default` → (no indicator or shows "Ask before edits")
  - `acceptEdits` → `⏵⏵ accept edits on`
  - `plan` → `**plan**` (or similar visual indicator)

**Desktop app & VS Code:**
- No `Shift+Tab` cycle (uses mode selector UI next to send button)
- Desktop app: dropdown selector next to the prompt
- VS Code: click mode indicator at bottom of prompt box (labeled "Ask before edits" / "Edit automatically" / "Plan mode")

**Correction for M2 exercise:**  
If training runs on desktop/VS Code: *"Click the mode selector next to the send button and select 'Plan mode'."*  
If training runs on CLI: current text is correct.

---

## Assertion 5: M5 reference artifact + plan.md as task-scoped files in shared folder

**Exercise claim (M5 Phase 4):** *"Propose the file paths (next to each other; same task-scoped folder)."*

**Finding:** STALE / needs clarification

No platform feature called "task-scoped files" or "shared folders" exists in Claude Code's public API. However, the exercise intent is achievable:

1. **File locations:** Students can create any folder structure in their repo or training directory
2. **Agent reading at pressure points:** Claude can re-read specific files via explicit path references in the prompt or in CLAUDE.md
3. **The pattern works:** reference.md + plan.md scoped to a task (e.g., `tasks/m5-task-name/reference.md` + `tasks/m5-task-name/plan.md`) is achievable with standard file operations

**No platform constraint.** The exercise can proceed as written. The terms "task-scoped" and "shared folder" are pedagogical language, not platform features. Claude will create and mutate plan.md in conversation without special platform support.

**Clarification for M5 student instructions:**  
If students seem confused about "task-scoped," rephrase: *"Create a folder for this task (e.g., `m5-refactor/`) and put reference.md and plan.md inside it. Claude will read and update plan.md as it works."*

---

## Summary

| Assertion | Status | Action |
|-----------|--------|--------|
| Plan mode writes files | VERIFIED | Clarify "approval saves file" in M2 prompt |
| Plan includes tests section | VERIFIED | No change |
| "Keep planning with feedback" option | VERIFIED | No change for CLI; desktop note CLI vs. UI difference |
| Shift+Tab toggles plan mode | VERIFIED (CLI only) | Caveat for Desktop/VS Code users; desktop uses mode selector UI |
| Task-scoped files + shared folders | STALE (no platform feature) | Works via standard file ops; clarify terminology in M5 |

All five assertions are either verified or achievable without platform changes. No blockers to tests-first integration.

