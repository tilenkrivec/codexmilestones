# Phase Plan: M01 P2 CLI And Asset Installation

## Goal

Build the first usable CLI and asset layout so another repo can install, inspect, and update the shared `quick` and `milestone` workflow assets from this central repository.

## Assumptions And Locked Decisions

- The source of truth for shared assets will live in `skills/` and `templates/`.
- The initial CLI surface is `install`, `check`, and `update`.
- The package version in `package.json` is the version displayed to installed projects.
- The install manifest lives at the target repo root as `.codexmilestones.json`.

## Files And Subsystems

Expected files in this phase:

- `package.json`
- `.gitignore`
- `bin/codexmilestones.js`
- `skills/quick/`
- `skills/milestone/`
- `templates/AGENTS.workflow.md`

## Execution Chunks

1. Copy in the canonical shared skill assets and AGENTS workflow template.
2. Implement the CLI with install/check/update behavior and manifest writing.
3. Verify the CLI against a scratch target before committing the implementation chunk.

## Verification

- `node bin/codexmilestones.js help`
- `node bin/codexmilestones.js install --target <scratch>`
- `node bin/codexmilestones.js check --target <scratch>`
- `node bin/codexmilestones.js update --target <scratch>`
- Inspect the scratch target for copied skills, manifest contents, and AGENTS marker block updates.
