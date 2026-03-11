# Phase Plan: M01 P1 Repo Foundation And Distribution Plan

## Goal

Create the repository skeleton and lock the implementation plan for the first usable version of the shared workflow distribution CLI.

## Assumptions And Locked Decisions

- The repo will distribute vendored assets into target projects rather than loading them from a live shared path.
- The CLI will be plain Node ESM JavaScript.
- Shared AGENTS content will be inserted between explicit markers so target repos keep their project-specific instructions.
- Installed version tracking will live in a small manifest file stored inside the target repo.

## Files And Subsystems

Expected files to create in this phase:

- package metadata and CLI entrypoints later in P2
- `skills/quick/`
- `skills/milestone/`
- `templates/AGENTS.workflow.md`
- `.docs/PROJECT.md`
- `.docs/STATE.md`
- `.docs/milestones/M01-REQUIREMENTS.md`
- `.docs/milestones/M01-ROADMAP.md`

## Execution Chunks

1. Initialize the repo and write the milestone planning artifacts.
2. Define the package layout and the install-manifest model.
3. Commit the planning docs before implementation begins.

## Verification

- Confirm the repo initializes cleanly.
- Confirm the milestone docs and ledger files exist in the expected locations.
- Confirm the planning docs describe install/check/update behavior, the AGENTS block strategy, and the vendored asset model.
