---
gsd_state_version: 2.0
active_milestones:
  - id: M01
    name: Shared Codex Workflow Distribution CLI
    status: complete
    current_phase: P3
    next_plan: none
last_updated: "2026-03-11T09:45:00Z"
progress:
  active_milestone_count: 0
  completed_milestones: 1
  active_phase_plans: 0
---

# Project State

## Project Reference

See: .docs/PROJECT.md

**Core value:** A central, versioned home for reusable Codex workflow assets so multiple repos can install the same `quick` and `milestone` skill set without copy-paste drift.
**Current focus:** M01 is complete. The repo is ready for local use and future GitHub-driven updates.

## Active Milestones

None.

## Recent Completed Milestones

### M01 Shared Codex Workflow Distribution CLI -- COMPLETE

Completed on `2026-03-11`.

Delivered:

- central repo structure for shared workflow assets
- versioned Node CLI with `install`, `check`, and `update`
- marker-based AGENTS workflow syncing
- target-local `.codexmilestones.json` manifest
- pushed `main` branch at `origin`

## Shared Working Context

### Decisions

- The distribution mechanism stays lightweight: GitHub repo plus a small Node CLI.
- Projects receive vendored copies of the skills under `.agents/skills/` rather than a live runtime dependency.
- Installed projects keep a local manifest at `.codexmilestones.json`.
- Shared AGENTS workflow text is managed as an inserted block between markers rather than overwriting whole project-specific `AGENTS.md` files.

### Residual Risks

- `check` currently compares installed version to the running CLI version, not to remote GitHub state.
- `gh` is not installed in this environment, so future GitHub-oriented workflows should install it if that path is preferred.
- `npx github:...` works but may trigger login popups depending on the local environment.
