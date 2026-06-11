# Skills

Externally maintained copywriting skills installed for use in this project.

## copy-that-sells

Source: https://github.com/avectats7/copy-that-sells

Focused anti-AI-slop copywriting discipline. Banned-word lists per model era, banned structural patterns (em-dashes, default rule-of-three, weak verb constructions), and a 3-layer self-edit pass (craft / AI-tells / truth check). Grounded in Bly's *Copywriter's Handbook* and D&AD's *Copy Book*.

Use it for: every product description, hero copy, newsletter, email body. Default writing mode whenever copy goes in front of a buyer.

## elite-copywriting

Source: https://github.com/RSHVR/elite-web-design (extracted skill: `skills/elite-copywriting/`)

Broader strategic copywriting framework. 8-phase workflow (position, audience, objection prediction, big idea, outline, draft, edit, audit). References Schwartz's awareness × sophistication matrix, Cialdini, Voss, Dunford positioning, and 40+ headline templates. Industry playbooks including agency-services selling.

Use it for: positioning work, pricing pages, landing-page audits, email sequences, strategic brief work.

## Updating

To pull upstream changes, re-clone from source and overlay:

```bash
cd /tmp
git clone --depth 1 https://github.com/avectats7/copy-that-sells.git cts
git clone --depth 1 https://github.com/RSHVR/elite-web-design.git ecw
cp -R cts/skills/copy-that-sells <repo>/.claude/skills/
cp -R ecw/skills/elite-copywriting <repo>/.claude/skills/
```
