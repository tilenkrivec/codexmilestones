# Phase Verification: M01 P2 CLI And Asset Installation

## Commands Run

- `node --version`
- `node bin/codexmilestones.js help`
- `node bin/codexmilestones.js install --target .tmp/scratch-target`
- `node bin/codexmilestones.js check --target .tmp/scratch-target`
- `node bin/codexmilestones.js update --target .tmp/scratch-target`

## Artifacts Checked

- `.tmp/scratch-target/.agents/skills/quick/SKILL.md`
- `.tmp/scratch-target/.agents/skills/milestone/SKILL.md`
- `.tmp/scratch-target/.codexmilestones.json`
- `.tmp/scratch-target/AGENTS.md`

## Result

P2 is complete. The CLI can install, inspect, and update the shared workflow asset snapshot in a target repo.
