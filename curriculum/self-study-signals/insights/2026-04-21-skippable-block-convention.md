**Context:** Iteration on the sponsor-moment fix, 2026-04-21.

**Signal:** Modules carry beats that apply only to one delivery mode — cohort sponsor moment, in-room pair exchanges, "the room shares back" prompts. Hiding them below `<!-- maintainer -->` removes them from one mode entirely; leaving them in the body forces the other mode's facilitator to improvise an awkward bridge ("in a cohort, you'd..."). Antti's fix: keep both views in the canonical file but make cohort-only blocks **structurally skippable** so the right reader takes the right path.

**Convention:** cohort-only beats live inside a labeled blockquote that opens with an explicit skip line — e.g.:

```markdown
> **In-room cohort opening — self-study readers, skip to the question below.**
>
> [Cohort-only content here.]
```

**Why this works:**
- Cohort delivery: trainer reads the block, the sponsor moment lands.
- Self-study: Teacher Claude (per updated SKILL.md C1 guidance) skips the blockquote silently and goes straight to what follows. No "you'll feel its absence" narration.
- Site readers in either mode see the block visually marked as conditional — the blockquote + label is the affordance.
- One canonical file, no forking, no stale duplication.

**Codified:**
- `.claude/skills/self-study/SKILL.md` C1 — "Skippable-block convention" paragraph added. Teacher skips silently, no commentary.
- `getting-going.md` Connections — sponsor moment now in this shape. Reference instance.

**Generalize:** sweep module bodies for facilitator/cohort-only language ("the room", "pair up", "your sponsor", "have students share back", "ask one or two out loud"). Convert to the blockquote-skip shape. The shape itself becomes the marker — neither mode improvises around the other.
