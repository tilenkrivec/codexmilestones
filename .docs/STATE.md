---
gsd_state_version: 2.0
active_milestones:
  - id: M01
    name: Shared Codex Workflow Distribution CLI
    status: active
    current_phase: P2
    next_plan: P2-01
last_updated: "2026-03-11T09:25:00Z"
progress:
  active_milestone_count: 1
  completed_milestones: 0
  active_phase_plans: 1
---

# Project State

## Project Reference

See: .docs/PROJECT.md

**Core value:** A central, versioned home for reusable Codex workflow assets so multiple repos can install the same `quick` and `milestone` skill set without copy-paste drift.
**Current focus:** M01/P2 is implementing the first working CLI and shared asset layout for install/check/update flows.

## Active Milestones

### M01 Shared Codex Workflow Distribution CLI -- ACTIVE

Current phase: `M01/P2`
Next plan: `P2-01`

The repo is now past planning. The active work is building the shared asset layout and the first usable CLI around vendored skill installs, a target manifest, and marker-based AGENTS workflow syncing.

## Shared Working Context

### Decisions

- The distribution mechanism should stay lightweight: GitHub repo plus a small Node CLI, no complex service layer.
- Projects should receive vendored copies of the skills under `.agents/skills/` rather than a live runtime dependency.
- Installed projects should keep a local manifest that records the source repo, installed version, and selected assets so `check` and `update` can stay simple.
- Shared AGENTS workflow text should be managed as an inserted block between markers rather than overwriting whole project-specific `AGENTS.md` files.

### Pending Todos

- Create the central package layout and copy in the canonical `quick` and `milestone` skills.
- Implement `install`, `check`, and `update` commands.
- Verify installation and update behavior against a scratch target.
- Push the initialized repo to GitHub.

### Blockers/Concerns

- Existing project-specific AGENTS instructions vary, so the shared workflow block must be additive and marker-based.
- Skill source content is currently living in BlinkAds; the new repo needs a clean ownership boundary so future improvements land centrally first.
