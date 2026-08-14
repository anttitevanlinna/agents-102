#!/usr/bin/env node
/*
 * Tests for validate-backing.js.
 *
 * Run: node --test scripts/validate-backing.test.js
 *
 * Regression focus: a source id can be cited from TWO fields — `Claims`
 * (`← id`) and `Frameworks` (`← id`). The first cut of the orphan check only
 * scanned Claims, so a source cited solely by a framework attribution — the
 * normal shape for a borrowed framework whose provenance backs no single body
 * sentence — was reported SOURCE-ORPHAN. Caught on the first real block
 * (skills-from-the-frontier, klaassen-compound-engineering). The orphan check
 * must union both fields.
 */

const { test } = require('node:test');
const assert = require('node:assert/strict');

const { auditText, parseClaim, parseSource, slugify } = require('./validate-backing.js');

const NO_LAWS = { all: new Map(), backbone: new Set() };
const AT = new Date('2026-07-29T00:00:00Z');
const audit = (text, opts = {}) =>
  auditText(text, { laws: NO_LAWS, now: AT, stanceWindow: 6, ...opts });
const codes = fs => fs.map(f => f.code);

function block(inner) {
  return `# A lecture\n\nBody prose.\n\n<!-- maintainer -->\n\n<!-- backing -->\n\n${inner}\n\n<!-- /backing -->\n`;
}

const STAMP = '`[checked:2026-07-01 result:OK due:2027-01-01]`';

test('source cited only by Frameworks is not an orphan', () => {
  const { findings } = audit(block(
    '**Claims**\n' +
    '- `a-claim` · vision · "some framing" ← none-owed\n\n' +
    '**Sources**\n' +
    `- klaassen ${STAMP} https://example.com — [practitioner direct] the four-step loop. fallback: none.\n\n` +
    '**Frameworks**\n' +
    '- Compound engineering · [borrow:practitioner-coined] · law:none · ← klaassen\n'
  ));
  assert.equal(codes(findings).includes('SOURCE-ORPHAN'), false,
    `expected no orphan, got: ${JSON.stringify(findings)}`);
});

/*
 * The arrow tail carries source ids FIRST and may carry prose after them —
 * `← ronacher-agentic-coding. Present only as deliberate absence; M5 owns the
 * naming.` is the authored shape wherever a borrow needs a scoping note. The
 * first cut split the whole tail on commas, so the entire sentence became one
 * "ref", it matched no defined id, the citation never registered, and the
 * source was reported SOURCE-ORPHAN. A warning that fires on correct input is
 * worse than no warning: it teaches the maintainer to skim past the class.
 * Caught authoring test-and-learn.md (2026-08-01); the corpus had dodged it
 * only because every framework line with a trailing note happened to cite
 * `cultural-vocab`, which is never a defined source and so never orphaned.
 */
test('source cited by a Frameworks line with a trailing note is not an orphan', () => {
  const { findings } = audit(block(
    '**Claims**\n' +
    '- `a-claim` · vision · "some framing" ← none-owed\n\n' +
    '**Sources**\n' +
    `- ronacher ${STAMP} https://example.com — [practitioner direct] the three-pattern. fallback: none.\n\n` +
    '**Frameworks**\n' +
    "- Ronacher's three-pattern · [borrow:practitioner-coined] · law:none · ← ronacher. " +
    'Present only as deliberate absence — "no plan.md, no verifier, no reference artifact." ' +
    'Not named in this body; M5 owns the naming.\n'
  ));
  assert.equal(codes(findings).includes('SOURCE-ORPHAN'), false,
    `expected no orphan, got: ${JSON.stringify(findings)}`);
});

test('claim refs stop at the prose boundary, not at the first comma in the prose', () => {
  const { findings } = audit(block(
    '**Claims**\n' +
    '- `a-claim` · detail · "a sourced thing" ← alpha, beta. Scoped note, with a comma.\n\n' +
    '**Sources**\n' +
    `- alpha ${STAMP} https://a.example.com — [practitioner direct] one. fallback: none.\n` +
    `- beta ${STAMP} https://b.example.com — [practitioner direct] two. fallback: none.\n`
  ));
  assert.deepEqual(codes(findings).filter(c => c === 'SOURCE-UNDEFINED'), [],
    `trailing prose must not mint phantom refs, got: ${JSON.stringify(findings)}`);
  assert.equal(codes(findings).includes('SOURCE-ORPHAN'), false,
    `both ids are cited, got: ${JSON.stringify(findings)}`);
});

test('source cited by nothing IS an orphan', () => {
  const { findings } = audit(block(
    '**Claims**\n' +
    '- `a-claim` · vision · "some framing" ← none-owed\n\n' +
    '**Sources**\n' +
    `- lonely ${STAMP} https://example.com — [practitioner direct] backs nothing. fallback: none.\n`
  ));
  assert.deepEqual(codes(findings).filter(c => c === 'SOURCE-ORPHAN'), ['SOURCE-ORPHAN']);
});

test('detail claim with no backing → DETAIL-UNBACKED', () => {
  const { findings } = audit(block(
    '**Claims**\n- `n` · detail · "267 skills" ← \n'
  ));
  assert.ok(codes(findings).includes('DETAIL-UNBACKED') || codes(findings).includes('CLAIM-MALFORMED'));
});

test('detail claim marked [SOURCE NEEDED] is not DETAIL-UNBACKED', () => {
  const { findings } = audit(block(
    '**Claims**\n- `n` · detail · "most-cited paper" ← [SOURCE NEEDED]\n'
  ));
  assert.equal(codes(findings).includes('DETAIL-UNBACKED'), false);
});

/*
 * `cultural-vocab` closes a tracker without a URL (check_research_claims §1
 * carve-out, check_writing §6): a public-domain thinker paraphrased as cultural
 * vocabulary is credited by name, no source pinned. The Frameworks field always
 * treated it as a sentinel; the Claims field did not, so a `borrowed` claim
 * closing correctly on Godin was reported SOURCE-UNDEFINED. Caught on the first
 * block that had one (painting-the-picture-with-the-llm).
 */
test('claim closing on cultural-vocab is not SOURCE-UNDEFINED', () => {
  const { findings } = audit(block(
    '**Claims**\n- `tool-vs-taste` · borrowed · "the taste behind the tool" ← cultural-vocab\n'
  ));
  assert.equal(codes(findings).includes('SOURCE-UNDEFINED'), false,
    `expected cultural-vocab to close cleanly, got: ${JSON.stringify(findings)}`);
});

test('cultural-vocab does not satisfy a detail claim', () => {
  const { findings } = audit(block(
    '**Claims**\n- `n` · detail · "a measured number" ← cultural-vocab\n'
  ));
  assert.ok(codes(findings).includes('DETAIL-UNBACKED'),
    'cultural-vocab is an attribution carve-out for borrowed framings, not a source for a measured claim');
});

test('claim citing an undefined source → SOURCE-UNDEFINED', () => {
  const { findings } = audit(block(
    '**Claims**\n- `n` · detail · "a number" ← ghost\n\n**Sources**\n'
  ));
  assert.ok(codes(findings).includes('SOURCE-UNDEFINED'));
});

test('vision claim carrying sources → VISION-BACKED warn', () => {
  const { findings } = audit(block(
    '**Claims**\n- `n` · vision · "framing" ← real\n\n' +
    `**Sources**\n- real ${STAMP} https://example.com — [practitioner direct] x. fallback: none.\n`
  ));
  const v = findings.find(f => f.code === 'VISION-BACKED');
  assert.ok(v && v.sev === 'WARN');
});

test('unknown layer → CLAIM-MALFORMED', () => {
  const { findings } = audit(block('**Claims**\n- `n` · guess · "x" ← none-owed\n'));
  assert.ok(codes(findings).includes('CLAIM-MALFORMED'));
});

test('unclosed region → REGION-UNCLOSED', () => {
  const { findings } = audit('# L\n\n<!-- maintainer -->\n\n<!-- backing -->\n\n**Claims**\n');
  assert.deepEqual(codes(findings), ['REGION-UNCLOSED']);
});

test('legacy provenance block alongside a backing block → LEGACY-DOUBLE', () => {
  const text = block('**Claims**\n- `n` · vision · "x" ← none-owed\n')
    + '\n**Frameworks riffed on:**\n- STRIDE\n';
  assert.ok(codes(audit(text).findings).includes('LEGACY-DOUBLE'));
});

test('file with no block but with stamps → NO-BLOCK info', () => {
  const { findings } = audit(`# L\n\n<!-- maintainer -->\n\n- x ${STAMP} https://e.com — [x] y.\n`);
  assert.deepEqual(codes(findings), ['NO-BLOCK']);
});

test('file with no block and no citations → silent', () => {
  assert.deepEqual(audit('# L\n\nJust prose.\n').findings, []);
});

test('stance older than the window → STANCE-STALE', () => {
  const fresh = audit(block('**Stance** `[stance:2026-07-01 level:L2]`\n- holds: x\n'));
  assert.equal(codes(fresh.findings).includes('STANCE-STALE'), false);
  const old = audit(block('**Stance** `[stance:2025-01-01 level:L2]`\n- holds: x\n'));
  assert.ok(codes(old.findings).includes('STANCE-STALE'));
});

test('law: key resolves against banked laws, else WARN', () => {
  const laws = { all: new Map([['the-compound-ladder', 'The compound ladder']]), backbone: new Set() };
  const good = audit(block('**Frameworks**\n- CE · [borrow:economics] · law:the-compound-ladder · ← cultural-vocab\n'), { laws });
  assert.equal(codes(good.findings).includes('LAW-UNRESOLVED'), false);
  const bad = audit(block('**Frameworks**\n- CE · [borrow:economics] · law:invented-law · ← cultural-vocab\n'), { laws });
  assert.ok(codes(bad.findings).includes('LAW-UNRESOLVED'));
});

test('law:none is never reported unresolved', () => {
  const laws = { all: new Map([['x', 'X']]), backbone: new Set() };
  const { findings } = audit(block('**Frameworks**\n- CE · [borrow:economics] · law:none · ← cultural-vocab\n'), { laws });
  assert.equal(codes(findings).includes('LAW-UNRESOLVED'), false);
});

test('parseClaim: shapes', () => {
  const c = parseClaim('- `my-id` · detail · "the anchor phrase" ← a, b');
  assert.equal(c.id, 'my-id');
  assert.equal(c.layer, 'detail');
  assert.deepEqual(c.refs, ['a', 'b']);
  assert.equal(parseClaim('- `x` · vision · "y" ← none-owed').none, true);
  assert.equal(parseClaim('- `x` · detail · "y" ← [SOURCE NEEDED]').needed, true);
  assert.equal(parseClaim('not a claim line'), null);
});

test('parseSource: id required before the stamp', () => {
  assert.equal(parseSource(`- my-source ${STAMP} https://e.com — [x] y.`), 'my-source');
  assert.equal(parseSource(`- ${STAMP} https://e.com — [x] y.`), null);
});

test('slugify strips punctuation and case', () => {
  assert.equal(slugify('The compound ladder:'), 'the-compound-ladder');
  assert.equal(slugify('Principal–agent:'), 'principal-agent');
});

/*
 * Bare field headers. The spec's own Stance/OODA example writes the field name
 * on a bare line, and the first two real blocks were authored that way. The
 * parser only matched `**Bold**`, so those blocks parsed to zero claims, zero
 * sources, zero frameworks — and reported `0 error · 0 warn`. A validator that
 * returns clean because it read nothing is worse than no validator: it is a
 * green light with no lamp behind it. Both spellings must parse, and any field
 * header the parser fails to register must be loud.
 */
test('bare field headers parse like bolded ones', () => {
  const { findings } = audit(block(
    'Claims\n- `n` · detail · "a number" ← ghost\n\nSources\n'
  ));
  assert.ok(codes(findings).includes('SOURCE-UNDEFINED'),
    'a bare `Claims` header must yield parsed claims');
});

test('bare and bolded headers mix in one block', () => {
  const { findings } = audit(block(
    'Claims\n- `a` · vision · "framing" ← none-owed\n\n' +
    `**Sources**\n- real ${STAMP} https://example.com — [practitioner direct] x. fallback: none.\n\n` +
    'Frameworks\n- CE · [borrow:economics] · law:none · ← real\n'
  ));
  assert.equal(codes(findings).includes('SOURCE-ORPHAN'), false,
    'the bare Frameworks header must count as a citation site');
});

test('a field header the parser cannot register → FIELD-UNPARSED', () => {
  const { findings } = audit(block(
    '### Claims\n- `n` · detail · "a number" ← ghost\n'
  ));
  const f = findings.find(x => x.code === 'FIELD-UNPARSED');
  assert.ok(f && f.sev === 'ERROR',
    'an unrecognised header spelling must error, not silently parse to nothing');
});

test('prose inside a field is never mistaken for a header', () => {
  const { findings } = audit(block(
    'Claims\n- `a` · vision · "Stance is what the field holds" ← none-owed\n\n' +
    'Stance `[stance:2026-07-01 level:L2]`\n- holds: Sources and Frameworks both matter\n'
  ));
  assert.equal(codes(findings).includes('FIELD-UNPARSED'), false);
  assert.equal(codes(findings).includes('CLAIM-MALFORMED'), false);
});

/*
 * A Frameworks line can cite a source id too, and an id that resolves to
 * nothing must be as loud there as it is on a Claims line. The first cut only
 * checked Claims: a framework citing a typo'd or never-defined id silently
 * contributed nothing, so the attribution looked recorded and wasn't. Found by
 * authoring `open-the-side-quest`'s block with a `cherny-mastering-cc` ref that
 * had no Sources entry — the file validated clean with an attribution pointing
 * at empty space. Same disease as the bare-header bug: a check that reads
 * nothing reports the same as a check that passes.
 */
test('Frameworks citing an undefined source → SOURCE-UNDEFINED', () => {
  const { findings } = audit(block(
    '**Claims**\n- `a` · vision · "framing" ← none-owed\n\n' +
    '**Frameworks**\n- CE · [borrow:economics] · law:none · ← ghost-source\n'
  ));
  const f = findings.find(x => x.code === 'SOURCE-UNDEFINED');
  assert.ok(f && f.sev === 'ERROR', 'an undefined framework ref must error');
});

test('Frameworks sentinels and defined ids stay silent', () => {
  const { findings } = audit(block(
    '**Claims**\n- `a` · vision · "framing" ← none-owed\n\n' +
    `**Sources**\n- real ${STAMP} https://example.com — [practitioner direct] x. fallback: none.\n\n` +
    '**Frameworks**\n' +
    '- A · [borrow:economics] · law:none · ← cultural-vocab\n' +
    '- B · [borrow:economics] · law:none · ← none — house framing\n' +
    '- C · [borrow:economics] · law:none · ← real\n'
  ));
  assert.equal(codes(findings).includes('SOURCE-UNDEFINED'), false);
  assert.equal(codes(findings).includes('SOURCE-ORPHAN'), false);
});

/*
 * `law:` resolves against theory-plan.md; `borrow:` resolved against nothing,
 * and drifted to ~50 distinct values for ~35 real parent fields. Two spellings
 * of one discipline (`security engineering` / `security-engineering`) split a
 * grep in half, and three values were not parent fields at all — the worst,
 * `[borrow:research-house]`, credited an outside research house with the
 * absorption-bottleneck law that `theory-plan.md` banks as ours at `[rsch:L4]`.
 * A ledger field nobody validates is a ledger that records whatever was typed.
 */
test('an unknown borrow value → BORROW-UNKNOWN warn', () => {
  const { findings } = audit(block(
    '**Claims**\n- `a` · vision · "framing" ← none-owed\n\n' +
    '**Frameworks**\n- X · [borrow:research-house] · law:none · ← none\n'
  ));
  const f = findings.find(x => x.code === 'BORROW-UNKNOWN');
  assert.ok(f && f.sev === 'WARN', 'an unrecognised parent field must warn');
  assert.match(f.msg, /research-house/);
});

test('canonical parent fields, none, and named originators stay silent', () => {
  const { findings } = audit(block(
    '**Claims**\n- `a` · vision · "framing" ← none-owed\n\n' +
    '**Frameworks**\n' +
    '- A · [borrow:none] · law:none · ← none\n' +
    '- B · [borrow:control theory] · law:none · ← none\n' +
    '- C · [borrow:SRE] · law:none · ← none\n' +
    '- D · [borrow:Argyris & Schön] · law:none · ← none\n' +
    '- E · [borrow:practitioner-coined] · law:none · ← none\n'
  ));
  assert.deepEqual(codes(findings).filter(c => c === 'BORROW-UNKNOWN'), []);
});

/*
 * A framework can straddle two fields honestly (`learning science / HCI`).
 * Splitting on `/` and ` and ` validates each part, so the compound keeps the
 * author's precision without becoming a hole the drift walks back through.
 */
test('compound borrow values validate part by part', () => {
  const { findings } = audit(block(
    '**Claims**\n- `a` · vision · "framing" ← none-owed\n\n' +
    '**Frameworks**\n' +
    '- A · [borrow:learning science / HCI] · law:none · ← none\n' +
    '- B · [borrow:SRE and security] · law:none · ← none\n'
  ));
  assert.deepEqual(codes(findings).filter(c => c === 'BORROW-UNKNOWN'), []);
});

test('a compound with one unknown part names that part', () => {
  const { findings } = audit(block(
    '**Claims**\n- `a` · vision · "framing" ← none-owed\n\n' +
    '**Frameworks**\n- A · [borrow:economics and vibes] · law:none · ← none\n'
  ));
  const f = findings.find(x => x.code === 'BORROW-UNKNOWN');
  assert.ok(f, 'the unknown half must still warn');
  assert.match(f.msg, /vibes/);
  assert.doesNotMatch(f.msg, /economics/);
});

/*
 * Exact match on purpose. Accepting `security-engineering` as a synonym of
 * `security engineering` would let both spellings live in the corpus forever,
 * which is the defect — one canonical spelling per field is the whole point.
 */
test('a hyphenated variant of a canonical field still warns', () => {
  const { findings } = audit(block(
    '**Claims**\n- `a` · vision · "framing" ← none-owed\n\n' +
    '**Frameworks**\n- A · [borrow:security-engineering] · law:none · ← none\n'
  ));
  assert.ok(findings.some(f => f.code === 'BORROW-UNKNOWN'),
    'a near-duplicate spelling is the drift this check exists to catch');
});

/*
 * BODY-URL-UNSTAMPED — the gap between the two registers.
 *
 * The block audits the claims it LISTS. Nothing audited the claims the body
 * makes but the block forgot, so a live third-party link in student-facing
 * prose could sit unstamped forever and the file still reported clean —
 * exactly the "silence reads as rigour" failure the block was built to kill,
 * reappearing one level down. Caught on `orient-and-introspect.md`, which
 * recommends ccstatusline by URL in body while its Sources field held a single
 * house position with no URL at all.
 *
 * A stamp is what gives a citation a freshness clock. No stamp, no clock, and
 * a dead tool link ships to a cohort with nothing to catch it.
 */
test('a body URL absent from Sources is flagged', () => {
  const { findings } = audit(
    '# A lecture\n\nUse [a tool](https://example.com/tool) for this.\n\n' +
    '<!-- maintainer -->\n\n<!-- backing -->\n\n' +
    '**Claims**\n- `a` · vision · "framing" ← none-owed\n\n' +
    `**Sources**\n- other ${STAMP} https://elsewhere.example — [practitioner direct] backs something else. fallback: none.\n\n` +
    '<!-- /backing -->\n'
  );
  const f = findings.find(x => x.code === 'BODY-URL-UNSTAMPED');
  assert.ok(f, `expected BODY-URL-UNSTAMPED, got: ${JSON.stringify(findings)}`);
  assert.match(f.msg, /example\.com\/tool/);
});

test('a body URL that IS stamped in Sources is not flagged', () => {
  const { findings } = audit(
    '# A lecture\n\nUse [a tool](https://example.com/tool) for this.\n\n' +
    '<!-- maintainer -->\n\n<!-- backing -->\n\n' +
    '**Claims**\n- `a` · detail · "Use a tool" ← tool\n\n' +
    `**Sources**\n- tool ${STAMP} https://example.com/tool — [capability] the tool exists. fallback: cut the pointer.\n\n` +
    '<!-- /backing -->\n'
  );
  assert.equal(findings.some(f => f.code === 'BODY-URL-UNSTAMPED'), false,
    `a stamped URL must not warn: ${JSON.stringify(findings)}`);
});

/*
 * A URL inside a fenced block is a command the student runs or an example
 * payload, not a citation the file is standing behind. Flagging those would
 * fire on every `git clone` line in the corpus and train everyone to skim the
 * class — a check that cries wolf is worse than no check.
 */
test('a URL inside a fenced code block is not a citation', () => {
  const { findings } = audit(
    '# A lecture\n\nRun this:\n\n```bash\ngit clone https://example.com/repo.git\n```\n\n' +
    '<!-- maintainer -->\n\n<!-- backing -->\n\n' +
    '**Claims**\n- `a` · vision · "framing" ← none-owed\n\n' +
    '<!-- /backing -->\n'
  );
  assert.equal(findings.some(f => f.code === 'BODY-URL-UNSTAMPED'), false,
    `fenced URLs must not warn: ${JSON.stringify(findings)}`);
});

/*
 * Scoped to files that HAVE a block. A blockless file is already reported
 * NO-BLOCK; firing both would double-count one defect, and whether the module
 * layer owes blocks at all is an open architectural question, not this
 * check's to prejudge.
 */
test('a blockless file is left to NO-BLOCK', () => {
  const { findings } = audit(
    '# A module\n\nRead [this](https://example.com/tool).\n\n' +
    '<!-- maintainer -->\n\n**Source verification — freshness stamps.**\n'
  );
  assert.equal(findings.some(f => f.code === 'BODY-URL-UNSTAMPED'), false,
    'NO-BLOCK owns the blockless case');
});

/*
 * ANCHOR-DRIFT. `curriculum/backing-format.md` states the contract plainly:
 * the anchor is "the body phrase that breaks if the backing fails. Quote it;
 * don't paraphrase." Nothing enforced it. The block's whole premise is that a
 * re-verifier reads the source against the quoted prose, so an anchor that no
 * longer appears in the body silently points the next verifier at a sentence
 * that is not there, and the file still reports zero errors.
 *
 * Found live 2026-08-12 in fix-tests-first.md: the claim quoted "the deeper cut
 * asks why the test could fail that way at all" against a body that had been
 * rewritten to "asks whether the test was pointing at the right thing". The file
 * was stamped PASS on seven judges at the time.
 *
 * Matching is on the prose ABOVE the block, not above the maintainer fence:
 * a handful of anchors legitimately quote maintainer prose, and this check's
 * job is catching drift, not relitigating where an anchor may point.
 */
test('an anchor whose phrase is gone from the body is ANCHOR-DRIFT', () => {
  const { findings } = audit(
    '# A lecture\n\nThe deeper cut asks whether the test was pointing at the right thing.\n\n' +
    '<!-- backing -->\n\n' +
    '**Claims**\n- `a` · vision · "the deeper cut asks why the test could fail that way at all" ← none-owed\n\n' +
    '<!-- /backing -->\n'
  );
  assert.equal(findings.some(f => f.code === 'ANCHOR-DRIFT'), true,
    `drifted anchor must error: ${JSON.stringify(findings)}`);
});

test('an anchor still present in the body does not fire', () => {
  const { findings } = audit(
    '# A lecture\n\nThe deeper cut asks whether the test was pointing at the right thing.\n\n' +
    '<!-- backing -->\n\n' +
    '**Claims**\n- `a` · vision · "asks whether the test was pointing at the right thing" ← none-owed\n\n' +
    '<!-- /backing -->\n'
  );
  assert.equal(findings.some(f => f.code === 'ANCHOR-DRIFT'), false,
    `intact anchor must not fire: ${JSON.stringify(findings)}`);
});

/*
 * Anchors carry markdown (`**bold**`, backticks) and curly quotes that the body
 * also carries; normalising both sides keeps the check from failing on
 * typography while still catching a real reword.
 */
test('anchor matching survives smart quotes and surrounding whitespace', () => {
  const { findings } = audit(
    '# A lecture\n\nClaude’s first read was partly wrong.\n\n' +
    '<!-- backing -->\n\n' +
    '**Claims**\n- `a` · vision · "Claude\'s first read was partly wrong." ← none-owed\n\n' +
    '<!-- /backing -->\n'
  );
  assert.equal(findings.some(f => f.code === 'ANCHOR-DRIFT'), false,
    `typography must not trip the check: ${JSON.stringify(findings)}`);
});

/*
 * The corpus elides the middle of a long quote with an ellipsis. That is a
 * quoting convention, not a paraphrase, so each fragment must appear in order
 * rather than the whole string appearing verbatim. Getting this wrong made the
 * first run of this check report 96 findings, most of them typography.
 */
test('an ellipsis in an anchor elides, and each fragment must still appear in order', () => {
  const body = '# A page\n\nA noisy investigation (read twenty files) does not have to land in your own window.\n\n';
  const block = (anchor) =>
    body + '<!-- backing -->\n\n**Claims**\n- `a` · vision · "' + anchor + '" ← none-owed\n\n<!-- /backing -->\n';

  assert.equal(
    audit(block('A noisy investigation … does not have to land in your own window.'))
      .findings.some(f => f.code === 'ANCHOR-DRIFT'),
    false, 'a correctly elided quote must not fire');

  assert.equal(
    audit(block('A noisy investigation … does not have to land in your main window.'))
      .findings.some(f => f.code === 'ANCHOR-DRIFT'),
    true, 'elision must not hide a reworded tail');

  assert.equal(
    audit(block('does not have to land in your own window … A noisy investigation'))
      .findings.some(f => f.code === 'ANCHOR-DRIFT'),
    true, 'fragments out of order are not a quote');
});

/*
 * Anchors quote body prose that itself contains quoted speech, so the outer
 * pair must be stripped exactly once. A greedy strip ate the inner quote and
 * reported drift on an intact anchor.
 */
test('only the outer quote pair is stripped from an anchor', () => {
  const { findings } = audit(
    '# A lecture\n\nAsk it: "List the tools you have available." The session can name them.\n\n' +
    '<!-- backing -->\n\n' +
    '**Claims**\n- `a` · vision · ""List the tools you have available." The session can name them." ← none-owed\n\n' +
    '<!-- /backing -->\n'
  );
  assert.equal(findings.some(f => f.code === 'ANCHOR-DRIFT'), false,
    `nested quotes must survive: ${JSON.stringify(findings)}`);
});

test('anchors may escape the quotes they contain', () => {
  const { findings } = audit(
    '# A lecture\n\nThis is why "let the agent handle it" does not.\n\n' +
    '<!-- backing -->\n\n' +
    '**Claims**\n- `a` · detail · "This is why \\"let the agent handle it\\" does not." ← s\n\n' +
    'Sources\n- s `[checked:2026-08-01 result:OK due:2027-01-01]` (no URL) — [house canonical] x\n\n' +
    '<!-- /backing -->\n'
  );
  assert.equal(findings.some(f => f.code === 'ANCHOR-DRIFT'), false,
    `escaped inner quotes must normalise: ${JSON.stringify(findings)}`);
});
