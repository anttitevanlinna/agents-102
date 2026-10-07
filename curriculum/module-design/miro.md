# Miro connector: what Claude can and cannot do on a board

Agent notes for building and running board beats (APT101 first; any training with a team board). Tested live 2026-10-07 on a free Miro account through the claude.ai Miro connector in Claude Code, scratch board `APT101 connector test (scratch)`. Re-test when the connector changes; tool names below are the connector's own.

## Access

- Connector = claude.ai connector (`/mcp` → claude.ai Miro → browser sign-in). Works in Claude Code when signed in with a claude.ai account; it is per person: each laptop signs in with that person's own Miro account, and Claude sees only boards that account can open.
- Customer org on Claude Team/Enterprise: an admin must allow the Miro connector first. Not tested here (free accounts). Screenshot fallback stays in every exercise.
- Trainer shares each team board with every member as editor before Day 1; the person's Claude then reaches it with the board URL.

## Protocol (read before any call)

- First call `canvas_get_canvas_composer_skill` (no args), then `step="design"` for new content or `step="edit"` for changes, then `step="dsl"`. The DSL is SVG; every element = one widget.
- Find a frame by name: `canvas_search` `result_mode="overview"` → frame titles, ids, `scope` bbox, sample stickies. `result_mode="matches"` + `patterns` finds stickies by text.
- Read: `canvas_read_as_svg`. Sticky = `<rect data-type="sticky" data-content=… data-color=… x y>`. Connector = `<line data-start=<id> data-end=<id>>` → tree structure recoverable from a read.
- Write new: `canvas_create_from_svg`. Change existing: `canvas_update_from_svg` with `data-miro-id`; deletion only with explicit `data-deleted="true"` (confirm with the person first).

## Gotchas (each one bit in the test)

1. **Frame syntax:** `<g transform="translate(x,y)" data-frame="Title">` and FIRST child `<rect data-type="frame" x="0" y="0" width height fill>`. `data-frame="true"` makes a frame titled "true"; a plain rect child is a shape, and the frame shrinks to 896x508.
2. **Write into an existing frame:** echo the frame's `<g data-miro-id=… data-frame="Title" transform=…>` with its frame rect, children inside it, coordinates relative to the frame. A bare `<g data-miro-id>` is ignored → the sticky lands LOOSE: visually on the frame, not its child.
3. **Read a frame by area, not by id.** `widget_ids=[frame]` returns only parented children and drops connectors attached to loose items. `scope_x/y/width/height` = the frame's bbox (from `canvas_search`) returns loose stickies too. Prompts that "read the X frame" should do: search overview → frame bbox → scope read.
4. **Move inside a frame:** echo the frame `g` (gotcha 2); moving a child "relative to canvas" is rejected.
5. **Connectors between existing stickies:** give each endpoint stub `id` + `data-miro-id` inside the echoed frame and point `data-start`/`data-end` at the local `id`s. Raw miro ids in `data-start` → "endpoint unresolved", skipped silently in an otherwise successful call.
6. Line breaks in a sticky: `&lt;br&gt;` in `data-content`; reads back as `&lt;br /&gt;`.
7. A call can partly succeed (`success:false` with items created). Read the `failed_items` / `skipped` lists every time.

## What works (verified)

| Need in the exercises | Result |
|---|---|
| Read a frame's stickies (text, colour, position) | ✅ |
| Find a frame by its title | ✅ `canvas_search` overview |
| Write stickies into a frame (assumption stickies, Claude's pre-mortem causes) | ✅ (gotcha 2) |
| Write a merged tree: stickies + connectors | ✅ one call; connectors read back with endpoints |
| Move a sticky (branch set aside) | ✅ (gotcha 4) |
| Scale: 75 stickies in one frame | ✅ written in one call, read back in one call, ~15 KB SVG (~5k tokens) per frame; seconds, holds the room rhythm |
| Build a trainer's team board (frames per beat) from a spec | ✅ frames + titles + seed stickies; Claude can generate the board set-up |

## Votes: dot stickers and stamps, never the native voting tool

- Tested: 3 stickies, 4 dot circles in person colours sitting on them, 1 thumbs-up stamp. One area read → tally by geometry (dot/stamp centre inside a sticky's box) came out exact: import button 3 (one per colour), digest 1, Sales 1 stamp.
- Stamps read back with `data-stamp` + position. Dots (circle shapes) read back with `fill` + position → colour = who voted.
- Native **dot voting** widget: a read returns its title only, no results; create-only, can't be moved or edited. Don't build a beat Claude must read on it.
- → Trainer kit: each person gets a stack of dot stickers in their own colour (copy-paste a circle). "One dot each" works as written in the exercises.

## What the board does NOT give Claude

- **No author on a sticky.** A read carries text, colour, position, tags; never who wrote it. → Authorship = **one sticky colour per person** (exercises already say "your own sticky colour"); where a name must survive into a file, the name or initials on the sticky too. Every board-reading prompt body needs the colour map from the trio ("Maija yellow, Jonas blue, Pekka green"), or asks for it first.
- Tags: read back via `data-tags`, but cannot be written through the connector, and only a person adds them. Not worth a convention; colour does the job.

## Personal and team beats

- **Team beat** (merge the tree, read the pre-mortem, story map backbone, five-users wall): the driver's Claude reads the frame by area, writes Claude's stickies/connectors into the frame or a new one, then the room works the board again. All steps verified above.
- **Personal beat on the board** (alone, own colour, own side of a frame: tree sketch, pre-mortem causes): no Claude call during it; the later team read separates people by colour. Verified as part of the team read.
- **Each person's own Claude reading the team board**: the same calls under that person's account. Miro is multi-user by design (maintainer 2026-10-07); the setup step is the trainer sharing the board as editor and each person signing into the connector.

## More gotchas

8. **Loose creates get auto-placed away from occupied space** (a sticky aimed at a frame's edge moved 3080px right). Claude never drops loose items onto a frame; it writes into the frame (gotcha 2) or into a new frame of its own.
9. A person's sticky dragged half off a frame may lose its parent. Pad the area read by about one sticky (250px) on each side.

## Scratch board

`APT101 connector test (scratch)`, https://miro.com/app/board/uXjVEdNyChY=/ : kept for re-tests; frames *Merged tree*, *Scale test 75 stickies*, *Vote test*. The two frames titled "true" are gotcha 1.
