# Voice & Tone (Execution)

How a brand sounds when it speaks — sentence by sentence, page by page. This file is about **execution**: the line-level discipline of writing inside a defined voice. The strategic decision of _what_ voice the brand has lives in [elite-brand-design/references/brand-tone-voice.md](../../elite-brand-design/references/brand-tone-voice.md).

## Table of Contents

1. [Brand Voice vs Copy Voice](#brand-voice-vs-copy-voice)
2. [NN/g Four Tone Dimensions](#nng-four-tone-dimensions)
3. [The Voice Constraint Card](#the-voice-constraint-card)
4. [Gary Provost's Rhythm Exercise](#gary-provosts-rhythm-exercise)
5. [SUCCES Framework (Heath Brothers)](#succes-framework-heath-brothers)
6. [Reading Level Targets](#reading-level-targets)
7. [The Three Defaults](#the-three-defaults)
8. [The "You" Principle (Halbert)](#the-you-principle-halbert)
9. [Concrete vs Abstract Diction](#concrete-vs-abstract-diction)
10. [Canonical Voice Guides Worth Studying](#canonical-voice-guides-worth-studying)
11. [Voice Consistency Mechanisms](#voice-consistency-mechanisms)
12. [Voice Failure Modes](#voice-failure-modes)
13. [AI-Era Voice Considerations](#ai-era-voice-considerations)
14. [Channel Voice Modulation](#channel-voice-modulation)

---

## Brand Voice vs Copy Voice

Two related but distinct jobs:

| Discipline       | Job                                            | Output                                                                |
| ---------------- | ---------------------------------------------- | --------------------------------------------------------------------- |
| **Brand design** | Define the voice (personality, position, axes) | Voice strategy document, NN/g axis plot, three-adjective rule         |
| **Copywriting**  | Execute inside that voice, line by line        | Voice constraint card, exemplar paragraphs, banned-words list, rhythm |

The brand designer answers _"who is this brand when it speaks?"_ The copywriter answers _"given who this brand is, what does the next sentence sound like?"_

If you don't have a brand voice yet, run [elite-brand-design/references/brand-tone-voice.md](../../elite-brand-design/references/brand-tone-voice.md) first. This file assumes the strategic decision is made and now you're shipping sentences.

---

## NN/g Four Tone Dimensions

Nielsen Norman Group's research-based framework. Every brand voice can be plotted on four spectrums. Voice is the fixed position; **tone** moves within each axis based on context (celebratory for success, empathetic for errors, plain for instructions).

```
Funny          ◄─────────────────► Serious
Formal         ◄─────────────────► Casual
Respectful     ◄─────────────────► Irreverent
Enthusiastic   ◄─────────────────► Matter-of-fact
```

### Worked Plots

| Brand            | Funny↔Serious | Formal↔Casual | Respectful↔Irreverent | Enthusiastic↔Matter-of-fact |
| ---------------- | :-----------: | :-----------: | :-------------------: | :-------------------------: |
| **Mailchimp**    |     Funny     |    Casual     |      Respectful       |        Enthusiastic         |
| **Stripe**       |    Serious    |    Formal     |      Respectful       |       Matter-of-fact        |
| **Liquid Death** |     Funny     |    Casual     |      Irreverent       |        Enthusiastic         |
| **Apple**        |    Serious    |  Mid-formal   |      Respectful       |        Enthusiastic         |
| **GOV.UK**       |    Serious    |    Formal     |      Respectful       |       Matter-of-fact        |
| **Slack**        |   Mid-funny   |    Casual     |      Respectful       |        Enthusiastic         |
| **Patagonia**    |    Serious    |  Mid-casual   |      Respectful       |       Matter-of-fact        |

### What Each Position Sounds Like

**Mailchimp** (casual + funny + respectful + enthusiastic):

> "High fives! Your campaign just went out to 12,847 people. Time for a snack."

**Stripe** (formal + matter-of-fact + respectful + serious):

> "Your charge was successful. The funds will appear in your bank account within 2 business days."

**Liquid Death** (casual + funny + irreverent + enthusiastic):

> "Murder your thirst. 100% mountain water. 0% corporate bullshit."

**GOV.UK** (formal + matter-of-fact + respectful + serious):

> "You can renew your passport online if you have a valid digital photo and a credit or debit card."

Same information, four different brands, four entirely different sentences. The axis position dictates everything.

---

## The Voice Constraint Card

Build one of these for every brand or project. It's the cheat sheet a writer (human or AI) consults before drafting any sentence.

### Template

```
─────────────────────────────────────────────
VOICE CONSTRAINT CARD — [BRAND]

NN/g Axis Plot:
  Funny↔Serious:             [position]
  Formal↔Casual:             [position]
  Respectful↔Irreverent:     [position]
  Enthusiastic↔Matter-of-fact: [position]

10 Words to Always Consider:
  1. ___    6. ___
  2. ___    7. ___
  3. ___    8. ___
  4. ___    9. ___
  5. ___   10. ___

10 Words to NEVER Use:
  1. ___    6. ___
  ...

5 Structural Moves to Favor:
  1. ___
  2. ___
  ...

5 Structural Moves to Avoid:
  1. ___
  ...

Sentence-Length Distribution (target):
  Short (≤8 words):    __%
  Medium (9-18 words): __%
  Long (19+ words):    __%

Rhythm Rule:
  e.g., "Short-short-LONG. Never three short in a row."

Three Adjectives (the brand-voice DNA):
  e.g., "Plain-spoken, dryly funny, never cute."
─────────────────────────────────────────────
```

### Completed Example: "Hearthline" (fictional B2B accounting SaaS for SMBs)

```
─────────────────────────────────────────────
VOICE CONSTRAINT CARD — HEARTHLINE

NN/g Axis Plot:
  Funny↔Serious:             Mid (60% serious, 40% dry humor)
  Formal↔Casual:             Casual
  Respectful↔Irreverent:     Respectful
  Enthusiastic↔Matter-of-fact: Matter-of-fact (slight enthusiasm)

10 Words to Always Consider:
  1. clear         6. real
  2. simple        7. shows
  3. ready         8. catch
  4. close         9. straightforward
  5. tonight      10. you

10 Words to NEVER Use:
  1. leverage      6. utilize
  2. seamless      7. robust
  3. solution      8. unlock
  4. synergy       9. revolutionary
  5. innovative   10. game-changing

5 Structural Moves to Favor:
  1. Lead with the outcome ("Close your books by Friday.")
  2. Concrete time markers ("by 8pm tonight," "in 3 minutes")
  3. Specific numbers ("$2,847 in unmatched expenses")
  4. Short opening sentence + longer follow-up
  5. End the section on a one-line punch

5 Structural Moves to Avoid:
  1. Abstract benefit headlines ("Empower your finance team")
  2. Three-clause subordinate sentences
  3. Stacked adjectives ("powerful, intuitive, modern")
  4. Rhetorical questions in the hero
  5. Emojis as decoration

Sentence-Length Distribution:
  Short:  40%
  Medium: 45%
  Long:   15%

Rhythm Rule:
  Short-short-LONG. Never three short in a row.
  Long sentences only appear after concrete claims.

Three Adjectives:
  Plain-spoken, quietly confident, dryly observant.
─────────────────────────────────────────────
```

A copywriter (or an LLM) given this card produces dramatically more consistent output than one given the brief "write copy for an accounting tool, friendly but professional."

---

## Gary Provost's Rhythm Exercise

The most-quoted paragraph in copywriting craft. Memorize it.

> "This sentence has five words. Here are five more words. Five-word sentences are fine. But several together become monotonous. Listen to what is happening. The writing is getting boring. The sound of it drones. It's like a stuck record. The ear demands some variety.
>
> Now listen. I vary the sentence length, and I create music. Music. The writing sings. It has a pleasant rhythm, a lilt, a harmony. I use short sentences. And I use sentences of medium length. And sometimes, when I am certain the reader is rested, I will engage him with a sentence of considerable length, a sentence that burns with energy and builds with all the impetus of a crescendo, the roll of the drums, the crash of the cymbals — sounds that say listen to this, it is important."
>
> — Gary Provost, _100 Ways to Improve Your Writing_

### The Rules That Fall Out of It

1. **Vary sentence length deliberately.** Three short sentences in a row drones. Three long sentences in a row drowns. Mix.
2. **Short-short-LONG is the basic cadence.** Two punchy beats, then a longer sentence that breathes.
3. **Long sentences sing; short ones punch.** Use long for emotion, mood, momentum. Use short for emphasis, fact, finality.
4. **End on a short.** Section-ending sentences should land like a door closing.

### Worked Example

**Before (all medium-length, monotonous):**

> Our team has decades of experience building tools for finance professionals who work in growing companies. We focus on closing your books quickly without sacrificing accuracy or audit-readiness. Our customers reduce their month-end close from ten days to three days on average. This frees up your finance team to focus on higher-value strategic work.

**After (Provost rhythm applied):**

> We build for finance teams that hate the eleventh of the month. You know the one — when the books should be closed but aren't, when the CFO is asking questions, when half the team is still chasing receipts. We cut that ten-day close to three. So your team can stop reconciling and start advising. That's the trade.

Same information. The second one has a pulse. Three short, one long, two short. The reader hears it.

---

## SUCCES Framework (Heath Brothers)

From _Made to Stick_ (Chip & Dan Heath). Six attributes that make ideas — and sentences — stick. The most useful general-purpose checklist in marketing writing.

### S — Simple

Find the core. One idea per sentence, one idea per page. If you can't strip a sentence to its one essential idea, you don't have an idea yet.

> **Before:** "Our comprehensive platform empowers finance teams to leverage advanced automation capabilities."
> **After:** "Close your books by Friday."

### U — Unexpected

Break a pattern. Surprise. The reader's brain pays attention to the thing that violates schema.

> **Before:** "We have great customer support."
> **After:** "Our average response time is 3 minutes. At 2am. From an actual human."

### C — Concrete

Sensory specifics. Things you can see, touch, count. Concrete beats abstract every time.

> **Before:** "Early in the morning."
> **After:** "6:14am."
> **Before:** "Thousands of customers."
> **After:** "12,847 customers."

### C — Credible

Authority, details, anti-authority. Sometimes the surgeon vouches; sometimes the patient does. The specific small detail outperforms the grand claim.

> **Before:** "Trusted by top companies worldwide."
> **After:** "Used by every major American airline except one."

(The "except one" is the credibility move — a vague boast doesn't include caveats; a true one does.)

### E — Emotional

Focus on one individual. Identity over interest. People give to one named child, not to "starving children." Same in copy.

> **Before:** "Help small businesses save time on payroll."
> **After:** "Last Friday at 11pm, Sara closed her bakery's payroll in 6 minutes — from her phone, in bed, holding her baby."

### S — Stories

Stories are simulation chambers. The reader rehearses the outcome in their head, which is the closest thing copy has to a free trial. See [storytelling.md](storytelling.md) for the full treatment.

> **Before:** "Reduce churn with better onboarding."
> **After:** "Three years ago, 60% of our signups churned in week two. We rebuilt onboarding around one question — 'what do you need to see today to come back tomorrow?' Now we keep 87% past week eight."

---

## Reading Level Targets

The Flesch-Kincaid grade is the meter. Lower number = easier to read = wider audience.

| Audience                                     | Target Grade | Why                                                                               |
| -------------------------------------------- | :----------: | --------------------------------------------------------------------------------- |
| **General consumer (DTC, retail, services)** |     5–7      | Maximum reach; cognitive ease; reading on a phone at the gym                      |
| **B2B SMB**                                  |     7–9      | Smart but busy; reading between Slack messages                                    |
| **Technical buyer (devtools, security)**     |     9–11     | Tolerates more density when accuracy matters; lower than 9 reads as condescending |
| **Academic / regulated / legal**             |    11–14     | Convention requires it; deviate at your own risk                                  |

**Above grade 11, comprehension drops regardless of reader intelligence.** Smart people don't want to read harder than they have to.

### How to Lower Reading Level

| Move                        | Before                                                                                        | After                                      |
| --------------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------ |
| **Shorten sentences**       | "Our platform, which integrates with over 200 tools and supports custom workflows, can help." | "It works with the tools you already use." |
| **Simpler words**           | "Utilize," "leverage," "facilitate," "implement"                                              | "Use," "use," "help," "do"                 |
| **Active voice**            | "The report can be generated by the user in seconds."                                         | "Generate the report in seconds."          |
| **Cut subordinate clauses** | "If you're ready, which most teams aren't, you can start."                                    | "When you're ready, start."                |
| **Cut adjectives**          | "A powerful, intuitive, modern, comprehensive solution."                                      | "A tool that works."                       |
| **Cut adverbs**             | "Incredibly fast and remarkably easy."                                                        | "Fast and easy."                           |

### Tools

- **Hemingway App** (hemingwayapp.com) — color-codes complexity in real time
- **Readable** (readable.com) — multiple readability scores
- **Grammarly** — readability score in the side panel

Aim for two grades _lower_ than your target audience's capability. Cognitive ease is a form of trust.

---

## The Three Defaults

When in doubt, default to these three. Override only when the voice card explicitly says to.

### 1. Active Voice

The subject does the action. "You do X" beats "X is done by you."

| Passive (avoid)                                       | Active (prefer)                           |
| ----------------------------------------------------- | ----------------------------------------- |
| "Reports are generated by the system overnight."      | "The system generates reports overnight." |
| "Your data will be protected by enterprise security." | "Enterprise security protects your data." |
| "Mistakes were made."                                 | "We made a mistake."                      |
| "The order has been received."                        | "We've got your order."                   |

Active voice is shorter, clearer, and assigns responsibility. Passive hides the actor — which is sometimes useful in politics and almost never useful in marketing.

### 2. Second Person

Write to "you," not about "users" or "customers" or "people." The reader is reading; speak to them.

| Third person (avoid)                                     | Second person (prefer)          |
| -------------------------------------------------------- | ------------------------------- |
| "Customers can save up to 40%."                          | "You save up to 40%."           |
| "Users will benefit from faster load times."             | "Your site loads faster."       |
| "Small businesses need a simple solution."               | "You need something simple."    |
| "Most people don't have time to learn complex software." | "You don't have time for this." |

### 3. Present Tense

"You do" beats "you will do." Present tense puts the reader inside the outcome _now_.

| Future / past (avoid)                               | Present (prefer)                 |
| --------------------------------------------------- | -------------------------------- |
| "You will see results in 30 days."                  | "You see results in 30 days."    |
| "Our customers have saved $2M."                     | "Our customers save $2M a year." |
| "After signup, you'll be able to invite teammates." | "Invite your team in one click." |

Present tense gives copy a sense of inevitability. Future tense gives it a sense of homework.

---

## The "You" Principle (Halbert)

> "People care about themselves; speak to them about them."
> — Gary Halbert

### The Ratio

Count every "you/your" and every "we/our/I" in your copy. **"You" should win at least 3:1.** Most B2B copy fails this by a brutal margin.

### Diagnostic

Highlight every "we/our/I" in red and every "you/your" in blue. Look at the page. If it's mostly red, you've written about yourself. The customer doesn't care about you yet — they care about themselves.

### Before / After

**Before (we-heavy, ratio ~5:1 in the wrong direction):**

> "We're a team of experienced engineers and designers building the next generation of customer support tools. Our platform leverages AI to help us serve our customers better. We've worked with hundreds of companies, and we know what works. We'd love to show you what we can do."

Count: 9 we/our/I, 2 you. **Reads like an autobiography.**

**After (you-heavy, ratio ~3:1):**

> "Your customer support inbox is on fire. You answer the same five questions a hundred times a day. You'd hire help if you could find anyone good. Here's another option: train an AI on your last 10,000 tickets and let it draft replies for you. You stay in control. Your inbox stops winning."

Count: 9 you/your, 1 we (and that "we" is implied, not written). **Reads like a conversation about the reader.**

### When "We" Is OK

- Origin stories ("We started Hearthline because…")
- Founder voice posts (the genre is autobiographical)
- Trust signals ("We're SOC 2 Type II certified")
- Empathy moves ("We've been there too — we built this because we needed it")

Otherwise: cut "we" wherever possible. Recast every "we offer" as "you get." Every "our team" as "your team."

---

## Concrete vs Abstract Diction

Concrete beats abstract every time. The reader's brain caches images, not concepts. If your sentence doesn't paint a picture, rewrite it.

### Worked Pairs

| Abstract (weak)                         | Concrete (strong)                                    |
| --------------------------------------- | ---------------------------------------------------- |
| "Early in the morning"                  | "6:14am"                                             |
| "Late at night"                         | "11:47pm on a Tuesday"                               |
| "The weekend"                           | "Saturday morning"                                   |
| "Thousands of customers"                | "12,847 customers"                                   |
| "Many companies trust us"               | "Notion, Linear, and Vercel use us in production"    |
| "Productive routines"                   | "Wake up at 6am to write"                            |
| "We respond fast"                       | "Average reply time: 3 minutes"                      |
| "We save you time"                      | "We save your team 14 hours a week"                  |
| "Affordable pricing"                    | "$29/month — less than your coffee"                  |
| "Easy to use"                           | "If you can use Gmail, you can use this"             |
| "Built by experts"                      | "Built by two ex-Stripe engineers who shipped Atlas" |
| "Scalable infrastructure"               | "Handled 4.2 million requests during Black Friday"   |
| "World-class security"                  | "SOC 2 Type II, HIPAA, GDPR, no breach in 9 years"   |
| "Help you grow your business"           | "Help you go from $40K MRR to $200K MRR"             |
| "Customers love us"                     | "92 of our first 100 customers are still customers"  |
| "Some users report"                     | "Sara from Brooklyn Bagel reports"                   |
| "A short time later"                    | "11 minutes later"                                   |
| "Wherever you are"                      | "On the train, in line at Starbucks, on the toilet"  |
| "Improved performance"                  | "p99 down from 480ms to 39ms"                        |
| "Reduces friction in the buyer journey" | "Cuts checkout from 7 steps to 1"                    |

### The Test

Read the sentence to a friend. Ask them to draw what they saw. If they can't, the sentence is abstract — rewrite.

---

## Canonical Voice Guides Worth Studying

Every brand voice document worth reading. Study these; steal the structure; don't imitate the voice.

| Guide                             | URL                                                | What to Steal                                                                                    |
| --------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| **Mailchimp Content Style Guide** | styleguide.mailchimp.com                           | The canonical friendly-professional reference. Voice/tone distinction. Word lists. Empathy axis. |
| **Atlassian Voice & Tone**        | atlassian.design/content/voice-and-tone-principles | "Bold, optimistic, practical, with a wink." Sub-principles. Microcopy patterns.                  |
| **Apple Style Guide**             | help.apple.com/applestyleguide                     | Restraint. Capitalization. Specific words to avoid. "Click" vs "tap" discipline.                 |
| **GOV.UK Style Guide**            | gov.uk/guidance/style-guide                        | The clarity exemplar. Grade-7 reading level for nationally critical info. Plain language.        |
| **MailerLite Style Guide**        | mailerlite.com/blog/brand-style-guide              | Voice + visual integration; SMB-friendly.                                                        |
| **Buffer Style Guide**            | buffer.com/resources/buffer-style-guide            | Transparent, calm, deliberately uncool. Anti-hype.                                               |
| **Help Scout Style Guide**        | helpscout.com/style-guide                          | Conversational B2B. Excellent error-state language.                                              |
| **Shopify Polaris Content**       | polaris.shopify.com/content                        | Component-level microcopy. Buttons, forms, empty states.                                         |
| **Microsoft Writing Style Guide** | learn.microsoft.com/style-guide                    | Enterprise voice that doesn't suck. Bias-free language. Accessibility.                           |
| **Intercom's Conversational UI**  | intercom.com/blog/principles-bot-design            | Conversational microcopy patterns — chat, error, success.                                        |

**The single most useful read** for SaaS/B2B writers: Mailchimp's _Voice and Tone_ section. It teaches the voice/tone distinction better than any other free resource.

---

## Voice Consistency Mechanisms

A voice card alone doesn't enforce a voice. You need calibration tools.

### 1. Voice Chart ("We sound like this, not like this")

A two-column table. Left side = on-voice; right side = off-voice but close enough to be tempting.

| We sound like…                                 | We don't sound like…                                    |
| ---------------------------------------------- | ------------------------------------------------------- |
| "Close your books by Friday."                  | "Empower your team to achieve faster financial close."  |
| "Something broke. We're on it."                | "We are currently experiencing technical difficulties." |
| "Welcome back, Sara. Where to?"                | "Welcome to your dashboard."                            |
| "$2,847 in unmatched expenses. Tap to review." | "You have outstanding items requiring your attention."  |

### 2. Exemplar Paragraphs

Five paragraphs that capture the voice perfectly. Writers (human or AI) read these before drafting. The brain pattern-matches faster from examples than from rules.

### 3. Anti-Exemplars

Three paragraphs that are _close but wrong_. The error analysis is more valuable than the success analysis — it teaches the edges of the voice.

Example anti-exemplar (for Hearthline, the SMB accounting voice):

> "Hearthline empowers finance teams to seamlessly automate their month-end close process with cutting-edge AI."

Why it's wrong: "empowers," "seamlessly," "cutting-edge" are all on the never-use list. "Finance teams" is generic. There's no concrete claim. The sentence describes a category, not a product.

### 4. The "Would the Founder Say This?" Test

Read the sentence out loud in the founder's voice. If it sounds like a press release, not a person — rewrite.

### 5. The "Would a Regular Person Say This Aloud?" Test

If you wouldn't say it standing in line for coffee, don't write it on a landing page. "Leverage our solution" — try saying it. You can't, without flinching. So don't.

---

## Voice Failure Modes

Patterns to watch for and kill on sight.

### 1. Corporate-Speak

Words that sound like meaning but aren't:

- "Synergy," "leverage," "robust," "scalable," "solution," "ecosystem"
- "Best-in-class," "world-class," "industry-leading," "cutting-edge"
- "Empower," "unlock," "transform," "revolutionize," "disrupt"
- "Streamline," "optimize," "facilitate," "operationalize"

These words are filler. They mean "good" without specifying _how_ good or _good how_. Replace each with a specific claim or cut.

### 2. Inconsistency Between Channels

The site is formal. The Twitter is irreverent. The email signature is corporate. The product UI sounds like a different company. The reader notices.

**The fix:** every channel ladders up to the same voice card. Modulation (see [Channel Voice Modulation](#channel-voice-modulation)) is fine; identity drift isn't.

### 3. Manufactured Humanness

Rehearsed informality. The sentence that says "we're just like you!" while wearing a suit. Examples:

- "Hey friend, we just wanted to drop you a quick note…" (when the brand is a 500-person enterprise)
- "Real talk:" (when no real talk follows)
- "Let's be honest…" (followed by marketing-speak)

### 4. Try-Hard Irreverence

Liquid Death's tone works because it's _earned_ — the brand is genuinely a metal band that sells water. Imitators (every "irreverent water brand 2.0") fall flat because the voice is a costume, not a personality.

**The test:** if the irreverence were stripped out, would the brand still exist? If yes, the irreverence is decoration. If no, it's identity.

### 5. Vague Intensifiers

- "Incredibly," "truly," "really," "very," "quite," "extremely"
- "Insanely," "blazingly," "ridiculously," "obscenely"

These do nothing. "Insanely fast" means "fast." "Truly remarkable" means "remarkable." If "fast" or "remarkable" isn't enough, the underlying claim is weak — fix the claim, not the modifier.

### 6. The Tonal Mismatch

The infamous "this isn't even fucking marketing" landing page that opens irreverent and pivots into a corporate pricing table without warning. The reader notices the seam. Voice has to hold from hero to footer.

### 7. Adverb Addiction

Hemingway hated them; he was right. "He walked quickly" is weaker than "he sprinted." "She spoke quietly" is weaker than "she whispered." Replace adverb + verb with a stronger verb whenever you can.

### 8. Stacked Adjectives

"A powerful, intuitive, modern, comprehensive platform." Each adjective dilutes the others. Pick one. Pick zero. Replace with a concrete claim.

---

## AI-Era Voice Considerations

In 2026, every brand has access to the same LLMs producing the same default voice. The result: a homogenized "AI voice" that signals "this was generated, not written." Crisp em-dashes, balanced lists, breezy second person, neat transitions. You can spot it.

**The human premium is on idiosyncratic voice** — the specific turns of phrase, the breaks in rhythm, the words a real person uses that an averaging model wouldn't. Voice is the moat.

### Voice-Matching Methodology

The method that works as of 2026:

1. **Build a Claude Project (or equivalent)** with the brand voice card pinned at the top.
2. **Add 5–10 exemplar paragraphs** of "this is our voice."
3. **Add 3–5 anti-exemplars** with annotations explaining why each is _close but wrong_.
4. **Use the "X has these traits, but not Y" technique:** "Our voice is dry, observant, never cute. It can be funny but never trying to be funny. It uses concrete numbers, not adjectives."
5. **Drop in the voice constraint card** for every drafting session.

The single most-essential prompt:

> "Here are 5 samples of [target voice]. Here are 5 samples of writing that is explicitly NOT this voice — close but wrong. Tell me what makes the difference at the sentence level."

The model becomes a voice coach. Use it that way. See [frameworks.md](frameworks.md) and the elite-copywriting [ai-workflow.md](ai-workflow.md) for the full workflow.

---

## Channel Voice Modulation

Same voice, expressed differently per channel. The voice card stays fixed; the surface adapts to the medium's physics.

### The Modulation Matrix

| Channel             | What changes                                                              | What stays the same |
| ------------------- | ------------------------------------------------------------------------- | ------------------- |
| **Landing page**    | Sharpest. Most edited. Sentence rhythm planned to the comma.              | Voice axis position |
| **Twitter / X**     | Loudest. First-line scroll-stopper. Less polish, more nerve.              | Voice axis position |
| **LinkedIn**        | Rounder. Slower setup. More context. Slightly more "we" allowed.          | Voice axis position |
| **Email**           | Closer. Conversational. Reads like a one-to-one note even when 1-to-many. | Voice axis position |
| **Product UI**      | Tighter. Less personality, more clarity. Empty states allowed to play.    | Voice axis position |
| **Cold outreach**   | Quietest. Most personal. The brand's voice still appears in word choices. | Voice axis position |
| **Support replies** | Warmest. Empathy register. Same vocabulary, softer tone.                  | Voice axis position |
| **Pitch deck**      | Most formal. The voice peeks through in headlines and footers, not body.  | Voice axis position |

### Worked Example: Hearthline Across 4 Channels

Same voice (plain-spoken, quietly confident, dryly observant). Same axis position. Four surfaces.

**Landing page hero:**

> "Close your books by Friday.
> Not next Friday. This one."

**Twitter post:**

> "Most accounting software is built for accountants.
>
> We built ours for the founder who closes the books at 11pm on a Sunday because the bookkeeper's behind again.
>
> If that's you — Hearthline."

**LinkedIn post:**

> "Last month a customer messaged us at 9:47pm. Their CFO had quit. They had three days to close the quarter. They'd never used Hearthline for a hard close before.
>
> They closed at 11:14pm on day two.
>
> The software did most of it. The team did the part the software can't — calling the bank, chasing one missing receipt, sanity-checking the AR aging.
>
> We didn't build Hearthline to replace finance people. We built it to give them their nights back.
>
> If you're a finance lead doing the close yourself this month — we should talk."

**Email (welcome sequence, message 1):**

> "Hi Sara,
>
> You signed up 11 minutes ago. Welcome.
>
> Two things, then we'll leave you alone for a day:
>
> 1. Connect your bank account here. Takes 90 seconds.
> 2. Reply to this email if anything's broken or weird. A real person reads it.
>
> Tomorrow morning we'll send the second thing.
>
> — Mark"

Notice: the voice is unmistakably the same. The DNA is "plain-spoken, concrete, low-key confident." But the landing page is two sentences. The LinkedIn post is a vignette. The email is a checklist with a human signature. The medium dictates the surface; the voice card holds the spine.

---

## Cross-References

- **[elite-brand-design/references/brand-tone-voice.md](../../elite-brand-design/references/brand-tone-voice.md)** — brand-strategic voice (the upstream decision)
- **[frameworks.md](frameworks.md)** — copy frameworks the voice gets executed inside
- **[storytelling.md](storytelling.md)** — narrative as a voice carrier
- **[canon.md](canon.md)** — Halbert, Ogilvy, Sugarman, Schwartz on voice
- **[audience-research.md](audience-research.md)** — VoC mining feeds the voice constraint card with real customer language
- **[awareness-sophistication.md](awareness-sophistication.md)** — sophistication stage dictates how loud or quiet the voice should be

---

## The Two-Question Voice Audit

When you don't have time for a full audit, run these two questions over any page:

1. **Would a regular person say this aloud?** If not, rewrite.
2. **Could this sentence appear, unchanged, on a competitor's site?** If yes, the voice isn't doing its job. Rewrite until it couldn't.

Voice is what survives translation between channels and what dies when imitated. Build the card. Hold the line. Sentence by sentence.
