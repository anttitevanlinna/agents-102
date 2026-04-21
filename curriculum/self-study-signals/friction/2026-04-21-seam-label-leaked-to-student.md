**Context:** Module 2 start, Teacher Claude announcing the Builder folder switch to the training-dir root.
**Signal:** Teacher said *"Folder switch first — seam 3"* to the student. "Seam 3" / "folder switch" are trainer-internal labels from `self-study/SKILL.md` § Builder folder switches; they're section headers for the maintainer, not something the student should hear. Leaks the scaffolding and reads as meta-narration.
**Gap:** SKILL.md modeled the student-facing wording (*"End the current Builder session and start a fresh Builder Claude at …"*) but didn't explicitly forbid using the `Seam N` / `folder switch` labels in chat. Teacher paraphrased the header.
**Fix:** Added a "Never leak the trainer labels" rule under § Builder folder switches in `self-study/SKILL.md`.
