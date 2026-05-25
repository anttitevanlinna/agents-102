# Group E source sweep — reference + trainer-guide (2026-05-25)

Auditor: source + capability-claim auditor. Cwd: agents-102. Today: 2026-05-25.

**Scope note.** Assigned `gemini-cli-for-engineers.md` **DOES NOT EXIST**. The
`reference/` dir holds `claude-code-for-engineers.md`, `mcp-and-connectors.md`,
`multi-session-git.md`, `prompt-anatomy.md` (not assigned). No Gemini CLI reference
page is present anywhere under `agentic-engineering-101/`. The Gemini-CLI feature-matrix
claims this group was told to expect do not exist to audit. Trainer-guide confirms
Gemini CLI is "planned alternate runtime … not yet active for delivery" — consistent
with the page's absence. **No action; flagged so the parent knows the assigned file is
not yet authored.**

Four files audited exhaustively: mcp-and-connectors.md, claude-code-for-engineers.md,
multi-session-git.md, trainer-guide.md. (trainer-guide carries no operational URLs or
docs-cited capability claims — only one practitioner-style item, the security-tools
easter egg, which is a curated in-repo skill, not a URL. Nothing to fetch there.)

DO NOT EDIT honored — report only.

---

## Section 1 — Operational links (resolve-check, due:cohort)

### mcp-and-connectors.md

**L11,48,70,116,122,147 — claude.ai/customize/connectors** (connector inheritance install surface)
- URL: https://claude.ai/customize/connectors
- Verdict: **BLOCKED** (403 — auth wall, expected for a per-account customize page). Resolves to live host.
- Finding: Fine. Corroborated indirectly: code.claude.com/docs/en/mcp documents this exact URL ("Add servers at claude.ai/customize/connectors") and the Team/Enterprise admin-only gate, so the link target is confirmed live and the surrounding claim is current.
- `- ` + "`[checked:2026-05-25 result:BLOCKED due:cohort]`" + ` https://claude.ai/customize/connectors — [connector install surface] mcp-and-connectors L11. fallback: docs corroborate the URL + admin-gate; recheck the page renders at cohort.`

**L19,87,122,146 — claude.ai/directory** (Anthropic Directory of reviewed connectors)
- URL: https://claude.ai/directory
- Verdict: **BLOCKED** (403 — auth/render wall). Live host.
- Finding: Fine. code.claude.com/docs/en/mcp links the same Directory URL and describes it as "Browse reviewed connectors in the Anthropic Directory … add any remote server listed there with `claude mcp add`." The file's claim that it replaces the older `modelcontextprotocol.io/servers` URL is consistent with docs.
- `- ` + "`[checked:2026-05-25 result:BLOCKED due:cohort]`" + ` https://claude.ai/directory — [Anthropic Directory] mcp-and-connectors L19. fallback: docs corroborate; recheck render at cohort.`

**L19,87 — modelcontextprotocol.io** (MCP spec / examples)
- URL: https://modelcontextprotocol.io/introduction
- Verdict: **OK** (resolves; live "What is MCP" page).
- Finding: Resolves clean. Note L87 cites `modelcontextprotocol.io/examples` specifically — not re-fetched (max-1-attempt budget spent on /introduction); /examples is the at-risk sub-path, flag for cohort recheck.
- `- ` + "`[checked:2026-05-25 result:OK due:cohort]`" + ` https://modelcontextprotocol.io/introduction — [MCP spec home] mcp-and-connectors L19. fallback: /examples sub-path (L87) unverified this pass; recheck at cohort.`

**L23,42,148 — cli.github.com** (`gh` CLI homepage)
- URL: https://cli.github.com
- Verdict: **OK** (resolves; live GitHub CLI homepage). `gh` manual at /manual/ (L42) not separately fetched.
- `- ` + "`[checked:2026-05-25 result:OK due:cohort]`" + ` https://cli.github.com — [gh CLI home] mcp-and-connectors L23. fallback: /manual/ sub-path unverified this pass; recheck at cohort.`

**L42,145 — github.com/github/github-mcp-server** (GitHub MCP server repo)
- URL: https://github.com/github/github-mcp-server
- Verdict: **OK** (resolves). Confirms endpoint `https://api.githubcopilot.com/mcp/` (trailing slash) verbatim.
- Finding: Endpoint confirmed. ONE DRIFT on the prose, not the link: file (L40, L145) says "Requires a GitHub **fine-grained** Personal Access Token." The repo docs do NOT mandate fine-grained — they show classic-PAT-compatible examples and recommend minimal scopes (`repo`, `read:packages`, `read:org`). Soften to "a PAT (fine-grained recommended)". Low severity; not link-breaking.
- `- ` + "`[checked:2026-05-25 result:OK due:cohort]`" + ` https://github.com/github/github-mcp-server — [GitHub MCP repo] mcp-and-connectors L42. fallback: endpoint confirmed; soften "fine-grained PAT" → "PAT, fine-grained recommended" (docs allow classic).`

**L42,148(implied) — github.com/settings/personal-access-tokens** (PAT settings)
- URL: https://github.com/settings/personal-access-tokens
- Verdict: **BLOCKED** (auth/login wall — expected for a settings page). Live host; path matches what code.claude.com/docs/en/mcp links for "GitHub token settings."
- `- ` + "`[checked:2026-05-25 result:BLOCKED due:cohort]`" + ` https://github.com/settings/personal-access-tokens — [PAT settings] mcp-and-connectors L42. fallback: auth wall expected; docs link same path; recheck at cohort.`

**L46,62,64,143 — support.atlassian.com Rovo remote MCP docs**
- URL: https://support.atlassian.com/rovo/docs/getting-started-with-the-atlassian-remote-mcp-server/
- Verdict: **OK** (resolves). Confirms canonical endpoint `https://mcp.atlassian.com/v1/mcp/authv2` AND the `/v1/sse` sunset: page states "After **30th June 2026**, usage of `https://mcp.atlassian.com/v1/sse` … will no longer be supported." File's "stops working 2026-06-30" (L62) matches exactly.
- Finding: Fully corroborated, including the deprecation date. Strong.
- `- ` + "`[checked:2026-05-25 result:OK due:cohort]`" + ` https://support.atlassian.com/rovo/docs/getting-started-with-the-atlassian-remote-mcp-server/ — [Atlassian Rovo MCP docs] mcp-and-connectors L46. fallback: endpoint + 2026-06-30 sunset both confirmed; recheck at cohort.`

**L52 — mcp.atlassian.com/v1/mcp/authv2** (Jira MCP endpoint, install command)
- Verdict: **OK** (confirmed canonical by the Atlassian support docs above; not directly fetched — MCP endpoints return auth errors to a browser fetch by design).
- `- ` + "`[checked:2026-05-25 result:OK due:cohort]`" + ` https://mcp.atlassian.com/v1/mcp/authv2 — [Jira MCP endpoint] mcp-and-connectors L52. fallback: confirmed canonical via Atlassian docs; live-OAuth-test at cohort.`

**L64 — admin.atlassian.com** (Atlassian admin console)
- URL: https://admin.atlassian.com/
- Verdict: **BLOCKED** (login wall — expected for an admin console). Live host.
- `- ` + "`[checked:2026-05-25 result:BLOCKED due:cohort]`" + ` https://admin.atlassian.com/ — [Atlassian admin console] mcp-and-connectors L64. fallback: auth wall expected; recheck at cohort.`

**L64,149 — composio.dev/content/jira-mcp-server** (Composio Jira bridge)
- URL: https://composio.dev/content/jira-mcp-server
- Verdict: **GONE** (HTTP 404).
- Finding: **DEAD LINK.** Composio's content path returns 404. This is cited twice (L64 as a Jira fallback source, L149 in the source-verification block as `[third-party bridge docs]`). Composio reorganises its content site frequently (third-party host, no stability contract).
- FIX: Replace with Composio's current Jira MCP landing page. Candidate: `https://composio.dev/mcp/jira` or `https://mcp.composio.dev/` (verify live before pasting — do not blind-swap). If no stable Composio URL resolves at recheck, drop the specific deep link and cite Composio's root + the Anthropic Directory entry instead, since the file already frames Composio as one of several tenant fallbacks.
- `- ` + "`[checked:2026-05-25 result:GONE due:cohort]`" + ` https://composio.dev/content/jira-mcp-server — [Composio Jira bridge] mcp-and-connectors L64,L149. fallback: 404; replace with a live Composio Jira-MCP URL (verify first) or drop deep link, cite Composio root + Directory.`

**L68,81,144 — linear.app/changelog** (Linear MCP changelog reference)
- URL: https://linear.app/changelog
- Verdict: **OK** (resolves; live changelog, entries through 2026-05-21). Discusses MCP extensively ("Linear Agent can now connect to your tools via MCP").
- Finding: Resolves and supports the MCP-existence claim. Caveat: the changelog does NOT print the literal endpoint string `mcp.linear.app/mcp` on the landing view, and the file (L68) already instructs readers to "search 'MCP'" — so the citation shape is honest. No fix.
- `- ` + "`[checked:2026-05-25 result:OK due:cohort]`" + ` https://linear.app/changelog — [Linear MCP changelog] mcp-and-connectors L68. fallback: MCP discussed; literal endpoint not on landing view (file says "search MCP" — honest). Recheck at cohort.`

**L74,81 — mcp.linear.app/mcp** (Linear MCP endpoint)
- URL: https://mcp.linear.app/mcp
- Verdict: **OK / live** (HTTP 401 Unauthorized — endpoint is up, rejecting an unauthenticated browser fetch, which is the correct behavior for an OAuth MCP endpoint). Independently corroborated: the live Linear MCP server's own deprecation notice (surfaced in this session) names `https://mcp.linear.app/mcp` as the **replacement** endpoint for the deprecated `/sse`.
- `- ` + "`[checked:2026-05-25 result:OK due:cohort]`" + ` https://mcp.linear.app/mcp — [Linear MCP endpoint] mcp-and-connectors L74. fallback: 401 = up + correct; Linear's own notice names it the canonical replacement. Live-OAuth-test at cohort.`

**L81 — linear.app/settings/account/security** (Linear API token settings)
- URL: https://linear.app/settings/account/security
- Verdict: **BLOCKED** (SPA "Loading…" / auth wall — expected for a settings page). Live host.
- `- ` + "`[checked:2026-05-25 result:BLOCKED due:cohort]`" + ` https://linear.app/settings/account/security — [Linear token settings] mcp-and-connectors L81. fallback: auth/SPA wall expected; recheck at cohort.`

**L110 — github.com/anthropics/claude-plugins-official** (official plugins repo)
- Verdict: **OK** (not separately fetched; the official-marketplace name `claude-plugins-official` and the `anthropics/claude-plugins-community` sibling are both confirmed live in code.claude.com/docs/en/plugins, which references this org/repo). Resolve-check at cohort.
- `- ` + "`[checked:2026-05-25 result:OK due:cohort]`" + ` https://github.com/anthropics/claude-plugins-official — [official plugins repo] mcp-and-connectors L110. fallback: docs reference the org/repo; direct resolve-check at cohort.`

### claude-code-for-engineers.md (docs links used operationally)

These code.claude.com docs pages all **resolve OK** and are checked here once; their
capability content is assessed in Section 2. Listing for resolve-status completeness:
- memory.md (L5,38,76,129,149,347,471,495,513,533) — **OK**
- skills (L5,217) — **OK**
- sub-agents (L5,195,199) — **OK** (note: `#enable-persistent-memory` anchor live)
- settings — **OK** (autoMemoryEnabled / autoMemoryDirectory / claudeMdExcludes all present)
- hooks (L5,448) — **OK** (all 9 events + Elicitation present)
- cli-reference (L5,363) — **OK** (`--append-system-prompt` + System-prompt-flags section present)
- permission-modes / plan mode (L162,178) — **OK**
- ultraplan (L170,178) — **OK** (live, research-preview)
- scheduled-tasks (`/loop`) (L235,280) — **OK**
- desktop-scheduled-tasks (L245,280) — **OK**
- routines (L245,280) — **OK**
- commands (L340,347) — **OK**
- context-window#what-survives-compaction (L347) — **OK**
- plugins / discover-plugins / plugin-marketplaces / plugins-reference — **OK**
- desktop (L227) — **OK** (Connectors documented on the Desktop reference page)
- `- ` + "`[checked:2026-05-25 result:OK due:cohort]`" + ` https://code.claude.com/docs/en/ — [all cited CC docs pages] claude-code-for-engineers (16 distinct pages). fallback: all resolve; per-claim drift in §2.`

**L280 — github.com/anthropics/claude-code/issues/3003, /17466, /18880** (Ctrl+C corruption evidence)
- Verdict: **OK** (all three resolve), but see §2 for an accuracy drift on how they're characterized.

---

## Section 2 — Capability + evidence claims

### Capability claims (Claude Code; cannot live-test → docs-corroborated; due:cohort)

**claude-code-for-engineers.md §1–§4, §11, §14 — memory hierarchy, auto memory, rules, imports, compaction, claudeMdExcludes**
- Cited: code.claude.com/docs/en/memory.md (+ context-window, settings)
- Verdict: **OK — docs corroborate, strongly.** Confirmed against live docs: four-layer hierarchy + managed-policy paths (L19); CLAUDE.local.md verbatim gitignore quote (L30–32) matches docs word-for-word; auto memory at `~/.claude/projects/<project>/memory/` + MEMORY.md-as-index + "first 200 lines or 25KB" (L52,65) exact; **auto-memory v2.1.59+ (L67) confirmed verbatim** ("requires Claude Code v2.1.59 or later"); `.claude/rules/` `paths:` frontmatter + brace expansion + symlinks (§3) all present; `@path` imports with **5-hop** recursion + first-time approval dialog (§4) exact; `claudeMdExcludes` (§14) + "managed cannot be excluded" exact; compaction survival table (§11) matches context-window#what-survives-compaction (project-root re-injected, nested subdir lost-until-reread, conversation-only lost).
- `- ` + "`[checked:2026-05-25 result:OK due:cohort]`" + ` https://code.claude.com/docs/en/memory.md — [memory hierarchy / auto-memory / rules / imports / compaction] claude-code-for-engineers §1-4,11,14. fallback: all corroborated incl. v2.1.59 + 5-hop + verbatim CLAUDE.local quote. Live capability-check at cohort.`

**claude-code-for-engineers.md §6 — subagents persistent memory location**
- Claim (L195): "subagents can maintain their own auto memory. See [subagent configuration](…/sub-agents#enable-persistent-memory)."
- Verdict: **OK on existence + anchor; minor latent drift on location if the file ever states one.** Docs confirm the `#enable-persistent-memory` anchor is live and the `memory` frontmatter field exists. Docs place the user-scope subagent memory at `~/.claude/agent-memory/<name>/` — NOT under `~/.claude/projects/<project>/memory/`. The reference body does not assert a path here (it only links), so no contradiction today. Flag only: if anyone later inlines a path, use `~/.claude/agent-memory/`.
- `- ` + "`[checked:2026-05-25 result:OK due:cohort]`" + ` https://code.claude.com/docs/en/sub-agents#enable-persistent-memory — [subagent persistent memory] claude-code-for-engineers §6 L195. fallback: anchor + field live; if a path is ever inlined it is ~/.claude/agent-memory/<name>/.`

**claude-code-for-engineers.md §5 — plan mode + five approval paths + Ultraplan**
- Cited: permission-modes#analyze-before-you-edit-with-plan-mode, ultraplan
- Verdict: **OK — docs corroborate.** Anchor live. Shift+Tab cycle `default → acceptEdits → plan` exact; `auto`/`bypassPermissions` slotting "after plan" exact ("Enabled optional modes slot in after `plan`"). The five approval options match the docs list verbatim: Approve-and-start-in-auto, Approve-and-accept-edits, Approve-and-review-each-edit-manually, Keep-planning-with-feedback, **Refine with Ultraplan** (docs: "Refine with [Ultraplan] for browser-based review"). Ultraplan page live (research preview, v2.1.91+), confirms cloud/CC-on-web plan hand-off with per-section comments. Strong.
- `- ` + "`[checked:2026-05-25 result:OK due:cohort]`" + ` https://code.claude.com/docs/en/permission-modes#analyze-before-you-edit-with-plan-mode — [plan mode + 5 approval paths + Ultraplan] claude-code-for-engineers §5. fallback: all five options + Shift+Tab cycle + Ultraplan confirmed verbatim. Live-test at cohort.`

**claude-code-for-engineers.md §9 — /loop two forms, desktop catch-up, Routines, /goal**
- Cited: scheduled-tasks, desktop-scheduled-tasks, routines, goal
- Verdict: **OK — docs corroborate, with one additive nuance.** `/loop 5m <prompt>` fixed-interval + bare `/loop <prompt>` self-paced (1min–1hr, activity-driven) + bare `/loop` running built-in maintenance prompt OR `.claude/loop.md` — ALL confirmed verbatim in scheduled-tasks. Desktop local-task missed-run catch-up "**once** for the most recently missed slot within a 7-day window" (L243) confirmed word-for-word in desktop-scheduled-tasks ("exactly one catch-up run for the most recently missed time … last seven days"). Routines = cloud, requires cloud-Git repo, `/schedule` creates scheduled triggers only / API+GitHub web-only (L245) — all confirmed in routines page. `/goal` condition-driven, `/goal clear`, transcript-evaluable condition (L247) confirmed (commands page lists `/goal [condition|clear]`).
  - ADDITIVE (not a contradiction): docs say `/loop` fixed-interval loops also auto-expire after a **7-day** session limit; the file says only "Closes when you close the session." Not wrong, just incomplete. Optional: add the 7-day expiry note at cohort. Low severity.
- `- ` + "`[checked:2026-05-25 result:OK due:cohort]`" + ` https://code.claude.com/docs/en/scheduled-tasks + /desktop-scheduled-tasks + /routines — [/loop, catch-up, Routines, /goal] claude-code-for-engineers §9. fallback: all confirmed verbatim incl. catch-up-once-in-7-days; optionally add /loop 7-day expiry note.`

**claude-code-for-engineers.md §9 (L247) — /goal verified "against Claude Code 2.1.142"; §13 (L371) hooks "verified against 2.1.142"**
- Verdict: **OK — docs corroborate the behavior** (version-pin is the file's own live-test stamp, not a doc claim). All 9 hook events (SessionStart, SessionEnd, UserPromptSubmit, PreToolUse, PostToolUse, Notification, Stop, SubagentStop, PreCompact) confirmed present in hooks docs; docs ALSO now document Elicitation + ElicitationResult (additive — file lists "nine canonical," docs have grown two more; the nine are all correct). `InstructionsLoaded` hook (§16, L511) confirmed referenced in memory docs.
- `- ` + "`[checked:2026-05-25 result:OK due:cohort]`" + ` https://code.claude.com/docs/en/hooks — [9 hook events + InstructionsLoaded] claude-code-for-engineers §13,§16. fallback: all 9 confirmed; docs added Elicitation/ElicitationResult (additive, not contradicting). Re-stamp version at cohort.`

**claude-code-for-engineers.md §12 — --append-system-prompt**
- Verdict: **OK.** cli-reference confirms `--append-system-prompt` ("Append custom text to the end of the default system prompt") and a "System prompt flags" section (anchor `#system-prompt-flags` valid). Bonus: docs also show `--append-system-prompt-file`.
- `- ` + "`[checked:2026-05-25 result:OK due:cohort]`" + ` https://code.claude.com/docs/en/cli-reference#system-prompt-flags — [--append-system-prompt] claude-code-for-engineers §12. fallback: confirmed; sibling --append-system-prompt-file also exists. Live-test at cohort.`

**claude-code-for-engineers.md §11 — /clear, /compact, /context, /memory, /init**
- Verdict: **OK.** commands docs confirm: `/clear [name]` ("Start a new conversation with empty context. Previous stays in `/resume`. Pass a name to label…") with aliases `/reset`, `/new` — exact; `/compact [instructions]` with focus-instructions + cross-link to what-survives-compaction — exact; `/context [all]` colored grid + fullscreen expand — exact; `/memory` and `/init` (incl. `CLAUDE_CODE_NEW_INIT=1` interactive flow, confirmed in memory docs) — exact.
- `- ` + "`[checked:2026-05-25 result:OK due:cohort]`" + ` https://code.claude.com/docs/en/commands — [/clear /compact /context /memory /init] claude-code-for-engineers §11. fallback: all confirmed verbatim incl. aliases + CLAUDE_CODE_NEW_INIT. Live-test at cohort.`

**claude-code-for-engineers.md §7 / mcp-and-connectors.md §plugins — skills location, plugin bundling, marketplaces**
- Verdict: **OK.** skills docs confirm `.claude/skills/<name>/SKILL.md` + frontmatter + dual invocation (model + explicit `/name`). plugins docs confirm a plugin can bundle skills/agents/hooks/MCP servers/LSP servers/monitors; `/plugin marketplace add owner/repo` and `/plugin install plugin-name@marketplace-name` confirmed; `claude-plugins-official` reserved official marketplace confirmed; `marketplace.json`-in-git-repo model confirmed; `extraKnownMarketplaces`/`strictKnownMarketplaces`/`managed-mcp.json` enterprise pre-registration confirmed (managed-mcp.json is the canonical enterprise MCP-policy filename per mcp docs).
- `- ` + "`[checked:2026-05-25 result:OK due:cohort]`" + ` https://code.claude.com/docs/en/skills + /plugins — [skills location + plugin/MCP bundling + marketplaces] claude-code-for-engineers §7 / mcp-and-connectors plugins. fallback: all confirmed. Live-test at cohort.`

**claude-code-for-engineers.md §9 L280 — Ctrl+C mid-tool corruption GitHub-issue evidence**
- Claim: "Ctrl+C corruption verified against GitHub issues #3003, #17466, #18880 (2026-05-14 — **all three closed with repros**; #3003 documents `messages.N: tool_use ids were found without tool_result blocks` after mid-tool interrupt + --resume)."
- Verdict: **CORRECT (precision drift on issue status; underlying behavior OK).** All three resolve and all three describe mid-tool-interrupt session-`.jsonl`-corruption — the substantive claim holds and #3003 does carry the quoted `tool_use ids … without tool_result blocks` error verbatim. BUT "all three closed with repros" overstates: #3003 is **closed as duplicate** (of #6836); #17466 and #18880 are **closed as not planned**. None is closed-as-fixed. "Closed with repros" reads as resolved-and-reproduced; the accurate state is closed-without-a-shipped-fix.
- FIX (L280): change "all three closed with repros" → "all three resolve with repros; #3003 closed as duplicate of #6836, #17466 and #18880 closed as not planned — the corruption is documented, not yet fixed." Keep the #3003 verbatim-error citation as-is (accurate).
- `- ` + "`[checked:2026-05-25 result:CORRECT due:cohort]`" + ` https://github.com/anthropics/claude-code/issues/3003 (+17466,18880) — [Ctrl+C mid-tool corruption] claude-code-for-engineers §9 L280. fallback: behavior confirmed; fix status wording — #3003 dup-of-#6836, #17466/#18880 not-planned, none fixed.`

### Evidence citations (practitioner; 6-month window vs 2026-05-25)

**multi-session-git.md L100 — Cherny worktrees attribution (TWO sources)**

(a) Cherny X thread, Jan 2026 — "the single biggest productivity unlock"
- URL: https://x.com/bcherny/status/2017742743125299476
- Verdict: **BLOCKED** (HTTP 402 — x.com paywall/login, as anticipated). Did NOT verify the quote or that the post exists; not inventing content.
- Label: `[practitioner direct]` — plausible (Cherny is the named CC lead) but **unverified this pass**. The quoted phrase "single biggest productivity unlock" could not be confirmed against the post.
- `- ` + "`[checked:2026-05-25 result:BLOCKED due:cohort]`" + ` https://x.com/bcherny/status/2017742743125299476 — [Cherny worktrees quote, practitioner direct] multi-session-git L100. fallback: x.com 402; quote unverified — confirm verbatim wording + date via an authenticated/archived read before relying on it.`

(b) Pragmatic Engineer interview — Cherny on parallel worktrees
- URL: https://newsletter.pragmaticengineer.com/p/building-claude-code-with-boris-cherny
- Verdict: **CORRECT (attribution drift).** Page resolves; it IS a Cherny / Claude Code interview, dated **2026-03-04** (within the 6-month window — current). BUT the fetched content describes Cherny running "**5 parallel Claude instances** … five terminal tabs (each a separate **checkout**)" — it does **not** use the word "worktrees" and does **not** carry the phrase "single biggest productivity unlock." The file folds both the X thread and this interview under one "[both practitioner direct / practitioner analysis]" stamp and attributes the worktree framing to both. The interview supports *parallel-checkouts-as-unlock*, not *worktrees-as-the-single-biggest-unlock*.
- This is a journalist-write-up/interview (practitioner *analysis* of Cherny's words), not a raw practitioner-direct artifact — the file's dual label half-acknowledges this, but the worktree-specific quote rides on the BLOCKED X source alone.
- FIX (L100): split the attribution. Keep the interview as `[practitioner analysis]` supporting "parallel checkouts / multiple instances as a major productivity unlock" (date 2026-03-04, current). Move the literal "single biggest productivity unlock" + "worktrees" wording to ride ONLY on the X source, and mark it unverified until (a) clears. Do not present the interview as corroborating the word "worktrees."
- `- ` + "`[checked:2026-05-25 result:CORRECT due:2026-11-25]`" + ` https://newsletter.pragmaticengineer.com/p/building-claude-code-with-boris-cherny — [Cherny parallel-checkouts, practitioner analysis] multi-session-git L100. fallback: resolves, dated 2026-03-04 (current); says "parallel instances/checkouts" NOT "worktrees" and not "single biggest unlock" — re-scope the attribution, don't let it carry the worktree quote.`

**trainer-guide.md L135 — Agentics Helsinki first meetup (fall 2025), 500K-lines-in-weeks demos**
- Verdict: **not fetched** (no URL in the file; the maintainer block itself logs "source-verification debt is logged; check before first cohort"). Flag only: this is an unverified historical/statistic claim (500K lines, fall-2025 meetup) with no citation. Belongs to the research-claims surface; out of scope for link/capability resolve-check but noting for the parent since it is the one live evidence-shaped claim in the trainer-guide.
- `- ` + "`[checked:2026-05-25 result:BLOCKED due:cohort]`" + ` (no URL) — [Agentics Helsinki 500K-lines claim] trainer-guide L135 (via quality-is-grounding lecture). fallback: no source cited; maintainer already logged verification debt — needs a citation before first cohort.`

---

## Counts

- Operational resolve-check (Section 1): **OK 7** (modelcontextprotocol.io, cli.github.com, github-mcp-server repo, Atlassian Rovo docs, mcp.atlassian.com endpoint, linear.app/changelog, mcp.linear.app/mcp; + the CC-docs bundle counted once as OK) · **GONE 1** (composio.dev/content/jira-mcp-server) · **MOVED 0** · **BLOCKED 6** (claude.ai/customize/connectors, claude.ai/directory, github PAT settings, linear token settings, admin.atlassian.com — all expected auth walls).
- Capability claims (Section 2): **9 claim-clusters checked** → OK 8 (memory/auto-memory/rules/imports/compaction; subagent memory; plan-mode+Ultraplan; /loop+catch-up+Routines+/goal; hooks 9-events; --append-system-prompt; session-hygiene commands; skills+plugins+marketplaces), **CORRECT 1** (GitHub-issue status wording, §9 L280; behavior OK, status overstated).
- Evidence citations: **3 checked** → CORRECT 1 (Pragmatic Engineer attribution drift), BLOCKED 2 (Cherny X 402; Agentics Helsinki uncited).
