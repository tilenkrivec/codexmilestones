---
gsd_state_version: 2.0
active_milestones:
  - id: M01
    name: Shared Codex Workflow Distribution CLI
    status: active
    current_phase: P3
    next_plan: P3-01
last_updated: "2026-03-11T09:30:00Z"
progress:
  active_milestone_count: 1
  completed_milestones: 0
  active_phase_plans: 1
---

# Project State

## Project Reference

See: .docs/PROJECT.md

**Core value:** A central, versioned home for reusable Codex workflow assets so multiple repos can install the same `quick` and `milestone` skill set without copy-paste drift.
**Current focus:** M01/P3 is finishing docs, publish wiring, and milestone closeout for the first usable CLI release.

## Active Milestones

### M01 Shared Codex Workflow Distribution CLI -- ACTIVE

Current phase: `M01/P3`
Next plan: `P3-01`

The working CLI and asset layout are committed. The remaining work is packaging polish, GitHub remote/push setup, and milestone closeout documentation.

## Shared Working Context

### Decisions

- The distribution mechanism should stay lightweight: GitHub repo plus a small Node CLI, no complex service layer.
- Projects should receive vendored copies of the skills under `.agents/skills/` rather than a live runtime dependency.
- Installed projects should keep a local manifest that records the source repo, installed version, and selected assets so `check` and `update` can stay simple.
- Shared AGENTS workflow text should be managed as an inserted block between markers rather than overwriting whole project-specific `AGENTS.md` files.
- The manifest lives at the target repo root as `.codexmilestones.json`.

### Pending Todos

- Write the README with actual usage examples.
- Configure the GitHub remote and push `main`.
- Write milestone closeout and audit artifacts.

### Blockers/Concerns

- Existing project-specific AGENTS instructions vary, so the shared workflow block must be additive and marker-based.
- The current `check` command compares the installed manifest version to the running CLI version; remote-release awareness can be added later if needed.
