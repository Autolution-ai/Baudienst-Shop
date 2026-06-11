# Auditing Existing Copy (and Rewriting Within Brand Constraints)

Most real copywriting work is not writing from scratch — it is auditing copy that already exists, often inside a brand that already has voice rules. This reference covers the specific workflow for that situation. It is the methodology used on Capfluence (Series A SaaS, full IA-changing reimagining) and Trellis Studio (founder-led agency, audit-only with optional rewrite). Both cases surfaced the same structural insight: **brand voice docs are hard overrides of skill defaults; the skill defaults only apply when no brand doc exists.**

Use this reference whenever:

- The user asks you to **audit** existing copy (a landing page, a deck, an email sequence)
- The user asks you to **rewrite** existing copy without starting fresh from a brief
- The project has a **brand voice doc, style guide, or voice constraint card** that defines hard rules
- The project is for a **client** whose brand identity is not yours to invent

This reference is paired with [workflows.md](workflows.md) (the canonical 8-phase workflow for writing from scratch) and [checklists.md](checklists.md) (the page-audit diagnostic + edit pass checklists).

## Table of Contents

1. [Why this workflow is different](#why-this-workflow-is-different)
2. [The hierarchy of authority](#the-hierarchy-of-authority)
3. [The audit-first, rewrite-second pattern](#the-audit-first-rewrite-second-pattern)
4. [Extracting hard constraints from a brand voice doc](#extracting-hard-constraints-from-a-brand-voice-doc)
5. [The conflict-resolution rule](#the-conflict-resolution-rule)
6. [The audit deliverable structure](#the-audit-deliverable-structure)
7. [The rewrite deliverable structure](#the-rewrite-deliverable-structure)
8. [Verification checks after a rewrite](#verification-checks-after-a-rewrite)
9. [When the brand voice doc itself needs auditing (meta-audit)](#when-the-brand-voice-doc-itself-needs-auditing)
10. [Common failure modes](#common-failure-modes)

---

## Why this workflow is different

The 8-phase workflow in [workflows.md](workflows.md) assumes you are writing for a known audience against a clean brief. Real client work usually has at least one of the following twists:

- Copy already exists. The team is attached to parts of it. Some of it works, some of it does not, and you are expected to honor what works.
- A brand voice doc exists. It may name fonts, italic usage, banned words, pronoun rules, tone allocations by surface. Those rules **are not suggestions** — they are the brand's identity. You are not allowed to override them with copywriting defaults from a generic skill.
- The buyer who hired you (a founder, a head of marketing) is **emotionally attached** to specific lines. Audits land harder when you preserve the strongest of those lines and name them in the deliverable.
- The audit is the deliverable, OR the audit gates the rewrite. The client may want to see the diagnosis before authorizing changes.

The audit-first, rewrite-second pattern handles all of this.

## The hierarchy of authority

When multiple sources of rules conflict, this is the priority order. Top wins.

| #   | Source                                                                                             | Examples                                                                                         | What wins when there's a conflict                                                                                                                         |
| --- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Client's hard brand rules** (in brand voice doc, style guide, voice constraint card)             | "Zero em-dashes." "Italics only on _Canadian_." "Cormorant Garamond headlines, no weight drift." | Always wins. These are non-negotiable identity choices.                                                                                                   |
| 2   | **Client's stated preferences during the engagement**                                              | "We don't want any 'AI-powered' framing." "Keep the Three Mondays section."                      | Wins over default rules. Confirm in the audit so it is documented.                                                                                        |
| 3   | **Universal copywriting principles** (Schwartz awareness, Dunford 5+1, 4 Buyer Concerns, Cialdini) | Specificity, "you" over "we" ratio, awareness-stage matching                                     | Apply by default. Soften when the brand voice asks for something different (e.g., a luxury brand may deliberately use "we" forward in heritage contexts). |
| 4   | **Elite-copywriting skill defaults** (everything in this skill's other reference files)            | The anti-slop banned-word list, the headline templates library, the 8-phase workflow             | Apply unless 1 or 2 says otherwise.                                                                                                                       |

**Operational implication.** The first read of any audit project is the brand voice doc, not the target copy. Internalize the constraints first; only then look at the page. Otherwise you will write recommendations that the brand will reject in seconds.

## The audit-first, rewrite-second pattern

The pattern that worked on Capfluence and Trellis:

**Step 1 — Audit, produced as a standalone deliverable.** The audit names what works, what does not, and the top prioritized fixes. The audit is read by the buyer to authorize (or steer) the rewrite. The audit alone has value even if no rewrite happens.

**Step 2 — Rewrite, produced as a separate deliverable that does not overwrite the original.** The original is preserved. The rewrite ships as a sibling file (e.g., `homepage-rewrite.md` alongside `homepage.md`) so the buyer can diff and choose.

This pattern serves the audit-and-rewrite use case AND the audit-only use case from the same workflow, with the same first-pass artifact.

If the client asks for rewrite-only, do the audit silently and use it to inform the rewrite. The audit still happens — it is just internal.

## Extracting hard constraints from a brand voice doc

Brand voice docs vary wildly in quality. Some are crisp constraint cards (Capfluence's voice.md), some are aspirational essays, some are decks. The pattern is the same: extract the **hard, testable rules** before writing anything.

A hard rule is a rule a script could check. Soft rules ("be confident, not arrogant") are useful framing but cannot be enforced mechanically.

Extract into a constraint card. Example from Capfluence:

| Constraint type           | Specific rules                                                                                                              |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Typography (headline)** | Cormorant Garamond 400 only — no 500/600 drift                                                                              |
| **Italics**               | Strategic word + geographic moat (_Canadian_) only — max 2 italic moments per headline                                      |
| **Punctuation**           | Zero em-dashes in user-facing copy                                                                                          |
| **Pronouns**              | "We" never "I"                                                                                                              |
| **Numerals**              | Always in numeric form ("23 million" not "twenty-three million")                                                            |
| **Banned words**          | industry-leading, best-in-class, transform, leverage, unlock, revolutionary, delve, tapestry                                |
| **Preferred verbs**       | find, match, surface, run, route                                                                                            |
| **Tone allocation**       | ~80% Cool Analytical baseline, 20% Warm Editorial on narrative surfaces                                                     |
| **Audience hierarchy**    | Primary: wealth-firm execs. Secondary: solo advisors. Tertiary: compliance/IT/procurement. Hero copy optimized for primary. |
| **Factual content**       | 23M Canadians, 8 inflection signals, CASL/PIPEDA/CIRO/Bill 25, pilot data                                                   |

Write this constraint card explicitly at the top of your scratch space before drafting. Every line of output must be checkable against it.

If the brand voice doc lacks hard rules in a category (e.g., it says nothing about pronouns), the elite-copywriting default applies (you over we, 3:1+).

## The conflict-resolution rule

Brand voice docs and elite-copywriting defaults will conflict. The rule is simple: **brand wins.**

| Elite default                            | Brand override (example)                                                | What to do                                                                                                    |
| ---------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Use em-dashes for emphasis where natural | "Zero em-dashes"                                                        | Brand wins. Use periods, semicolons, commas, or restructure.                                                  |
| "You" beats "we" 3:1+                    | Luxury heritage brand favors "we have crafted, we have inherited"       | Brand wins. Honor it on heritage pages; apply the 3:1 rule on conversion pages where the brand doc is silent. |
| Specificity (numbers, names, dates)      | Brand insists on numeric form ("23 million" not "twenty-three million") | No conflict — both want specificity, same direction.                                                          |
| Active voice, 2nd person, present tense  | Brand uses passive for legal/regulatory framing on the Compliance page  | Brand wins for that specific surface. Apply defaults on every other surface.                                  |
| Avoid "AI-powered" — corporate AI-slop   | (Brand has no rule about it)                                            | Skill default applies. Replace with specific framing ("AI workflows that…").                                  |

When in doubt: ask the client. "Your voice doc says X. I want to do Y on this page because Z. Which do you prefer?" — that question signals seniority and avoids ambushing the client with copy they will reject.

## The audit deliverable structure

A complete audit is a standalone document. The structure that worked on Capfluence + Trellis:

1. **Executive summary (5-7 lines)** — what works, what does not, the conversion hypothesis driving the top fixes.
2. **Schwartz awareness × sophistication diagnosis per section** — table format. For each section, identify target awareness stage and what stage the current copy actually targets; market sophistication stage; mismatches flagged.
3. **Persona × awareness matrix** — primary / secondary / tertiary buyers. Which sections serve which persona? Where are the gaps?
4. **Page-Audit Diagnostic** — score the 4 Buyer Concerns 0-10 each: (a) Will it work? (b) Will it work for me? (c) How fast? (d) How risky? Score the page overall AND key sections. Lowest score = top priority fix.
5. **Objection-prediction 6-layer stack** — universal / role-specific / life-stage / industry / awareness-stage / **embarrassing**. Which are addressed on the page? Which are unresolved? The embarrassing layer is usually where the biggest conversion lift hides. See [objection-prediction.md](objection-prediction.md) for the full layer definitions.
6. **AI-slop scan** — em-dash count, banned-words check, three-item-list reflex, "It's not X — it's Y" parallelism, abstraction-without-specific.
7. **Voice-card adherence audit** — does every section honor the brand's tone allocation (Cool Analytical / Warm Editorial / Steady Plainspoken or whatever the brand's tone categories are)? Any drift?
8. **"You" vs "we" ratio per section** — flag any section where the brand-preferred pronoun is losing.
9. **Specificity audit** — which claims are concrete (numbers, named entities, lived detail), which are abstract.
10. **Section-by-section critique** — 2-4 lines per section: what works, what to fix, severity (must-fix / nice-to-have / strong-as-is).
11. **Top 10 prioritized improvements** — ranked by likely conversion impact for the primary audience.
12. **Hypothesis for the rewrite** — what the rewrite will try, what the strongest section will become, what the biggest IA change (if any) will be.

Output this as a single markdown file. The buyer reads it top-down to authorize the rewrite.

## The rewrite deliverable structure

The rewrite ships as a sibling file to the original, not as an overwrite. The structure:

1. **Header metadata** — version number, date, summary of what changed vs the prior version, voice rules preserved verbatim.
2. **The new copy** — section by section, in the same markdown conventions as the original (preserving `[EYEBROW]`, `[VISUAL]`, `[CTA ROW]`, and any other structural markers). Preserve all factual content (data, names, dates, regulatory references).
3. **Change notes (the meta block at the bottom)** — a table showing old section → new section / what changed / why / which audit finding it addresses. Plus IA changes (reorder / merge / split / add / remove) with the audit rationale.
4. **Self-audit on the rewrite output** — actual counts and pass/fail on the brand constraints (em-dash count, banned-words count, italic discipline check, "you"/"we" ratio, factual content preservation, 4 Buyer Concerns scores on the rewrite).

The self-audit is non-negotiable. A rewrite that violates the brand voice rules is worse than no rewrite — it signals you did not read the brand doc.

## Verification checks after a rewrite

Run these on the rewrite output before declaring it done. Adapt to whatever the brand's hard rules are.

```bash
# Zero em-dashes (if brand bans them)
grep -o '—' rewrite.md | wc -l   # expect 0 in user-facing copy

# No banned words
grep -iE 'industry-leading|best-in-class|transform|leverage|unlock|revolutionary|delve|tapestry|AI-powered' rewrite.md

# Factual content preserved (adjust patterns to the specific brand facts)
grep -E '23 million|CASL|PIPEDA|specific-pilot-data' rewrite.md

# Pronoun discipline
grep -nE '\b(I|my|me)\b' rewrite.md   # expect 0 if "we never I" is a brand rule

# Italic discipline (per-headline scan)
grep -E '^#' rewrite.md | awk -F'_' '{print NF-1, $0}' | sort -rn | head
# expect each headline at or below the brand's max italic count (typically 2-4 underscores = 1-2 italics)
```

If any check fails, fix the violation before declaring done. The verification step is a non-negotiable part of the delivery.

## When the brand voice doc itself needs auditing

Sometimes the brand voice doc is itself broken (vague, self-contradictory, generic). The Trellis audit surfaced this exact case — the brand-skill prescribed rules that the live site itself violated, AND some of the rules were too soft to enforce.

Signs the brand voice doc needs a meta-audit:

- The doc's own tagline fails its own rules (e.g., "lead with the prospect's problem" is the rule, but the tagline opens "One studio…")
- Messaging pillars overlap or repeat the same argument from different angles
- Voice rules are aspirational ("be confident not arrogant") with no operational test
- The doc lacks a constraint card (10 always-use words, 10 never-use words, 5 favored moves, 5 avoided moves)
- The doc does not specify awareness staging — when to use which tone for which buyer stage
- The doc does not segment the audience hierarchy (primary / secondary / tertiary buyers)

When you find this, the deliverable expands. In addition to auditing the surface copy, audit the brand voice doc itself. Recommend:

- Tagline rewrites that honor the doc's own decision rules
- Pillar compression (3-4 distinct pillars over 5+ overlapping ones)
- An explicit voice constraint card (operational, not aspirational)
- Awareness staging guidance ("for Stage-1 cold traffic, use X tone; for Stage-4 product-aware buyers, use Y")
- Audience tier segmentation if it is missing

Flag this carefully. The brand owner may be emotionally attached to the existing doc. Present the brand-doc audit as **strengthening the foundation that the surface copy stands on**, not as criticism of past work.

## Common failure modes

Things that go wrong when auditing existing copy. Avoid all of them.

**1. Imposing skill defaults over brand rules.** The most common failure. The skill's anti-em-dash rule conflicts with a brand that uses em-dashes deliberately; an inexperienced auditor strips them. Wrong. Brand wins.

**2. Auditing the page without reading the brand voice doc first.** Half the audit findings will be invalidated. Always read the brand doc first.

**3. Recommending rewrites without preserving factual content.** If the page cites "23 million Canadians" and the rewrite drops the number for a rounder phrasing, you have destroyed an asset. Preserve every named fact, number, date, regulatory reference, and proprietary phrase unless the audit explicitly identifies one as unsupported.

**4. Overwriting the original without offering a diff.** Always preserve the original. The buyer needs to compare. The rewrite is a proposal, not a fait accompli.

**5. Skipping the self-audit on the rewrite output.** A rewrite that violates brand rules is worse than no rewrite. Always run the verification checks. Quote the counts in the deliverable.

**6. Treating soft rules as hard constraints.** "Be confident, not arrogant" is a soft rule — useful for framing but not mechanically testable. Do not assert it failed without evidence. Reserve binary pass/fail judgments for hard rules.

**7. Auditing the brand voice doc when not asked to.** If the buyer hired you to audit a landing page, do that. Note brand-doc gaps in passing if they materially affect the landing page audit, but do not pivot to auditing the brand identity unless the buyer authorizes the scope expansion.

**8. Recommending IA changes (section reordering, merging, splitting) without naming the audit finding that justifies it.** IA changes are the highest-friction recommendations. Always tie each IA change to a specific audit finding ("Three Mondays vignettes reordered so leader leads — per the persona × awareness finding that primary audience is wealth-firm execs who in v2 met the advisor vignette first").

**9. Producing a 30-page audit when a 3-page audit would have moved the project forward.** Audit length should match decision weight. A homepage audit before a full rebuild justifies depth. A weekly email audit needs ≤1 page. Calibrate.

**10. Sending the rewrite without the audit.** The audit is what authorizes the rewrite. Without it, the buyer cannot judge why the changes were made. Always pair them.

---

## Quick-start checklist

When a user asks you to audit or rewrite existing copy, run through this in order:

- [ ] Locate and read the brand voice doc (look for `brand/`, `LORE.md`, `voice.md`, `guidelines.md`, `style-guide.md`)
- [ ] Extract hard constraints into a constraint card (above)
- [ ] Read the target copy with the constraints in mind
- [ ] Identify the audience hierarchy (primary / secondary / tertiary)
- [ ] Run the audit using the deliverable structure above
- [ ] Score the 4 Buyer Concerns
- [ ] Run the objection-prediction 6-layer stack, especially the embarrassing layer
- [ ] Run the AI-slop scan against the brand's specific banned-word list
- [ ] Identify the top 10 fixes ranked by conversion impact
- [ ] If a rewrite is requested, produce it as a sibling file (preserve original)
- [ ] Run the verification checks on the rewrite
- [ ] Self-audit the rewrite output with actual counts and report them
- [ ] Pair the audit and rewrite in the delivery

This is the workflow that produced the Capfluence reimagining (Stage-1-2 hero re-targeting, 4 Buyer Concerns going from (4, 4, 6, 4) → (8, 7, 7, 7), advisor-pushback frame promoted out of FAQ to a named section) and the Trellis audit (brand-skill self-violations surfaced, embarrassing-objection layer identified as the biggest gap). It is the proven pattern for this category of work.
