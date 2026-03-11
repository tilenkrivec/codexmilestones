---
name: milestone
description: Start, continue, or coordinate one or more named milestones with requirements, roadmap, phase planning, chunked implementation commits, verification, and integrated milestone review. Use only when the user explicitly invokes `$milestone` or clearly asks to start, create, continue, or resume a milestone. Use this skill when milestone state must stay durable across sessions or when multiple non-overlapping milestones need to run concurrently. Do not use for ordinary coding requests unless the user explicitly chooses this lane.
---

# Milestone

Run the durable workflow lane for larger work that should persist across phases or sessions.

Maintain milestone docs in `.docs/milestones/`, keep `.docs/STATE.md` and `.docs/PROJECT.md` current, commit planning docs before code, commit each completed implementation chunk atomically as the work advances, and finish with milestone review inside the same lane.

## Invocation Rules

- Use this skill only after an explicit user invocation such as:
  - `$milestone`
  - `Let's start a new milestone`
  - `Make this a milestone`
  - `Continue milestone M03`
  - `Resume milestone M03`
  - `Resume the current milestone` only when `.docs/STATE.md` shows exactly one active milestone
- Do not activate this skill for ordinary coding tasks just because they seem large.
- If the user has not explicitly chosen the milestone lane, stay in normal task execution instead of escalating automatically.
- If more than one milestone is active, require an explicit milestone id before resuming work.

## Start Or Resume

### Start a new milestone

1. Determine the milestone name or version from the user request.
2. Create or update the milestone docs under `.docs/milestones/`.
3. Add the milestone to `.docs/PROJECT.md` and `.docs/STATE.md` as an active entry instead of replacing another active milestone by default.
4. Keep milestone ids stable and monotonic (`M01`, `M02`, `M03`, ...), but treat them as independent lanes after creation.

Default milestone docs:

- `<milestone>-REQUIREMENTS.md`
- `<milestone>-ROADMAP.md`
- `<milestone>-MILESTONE-AUDIT.md` later
- phase docs under `.docs/milestones/<milestone>-phases/`

### Resume an existing milestone

1. Read the existing milestone requirements, roadmap, active phase docs, and `.docs/STATE.md`.
2. Continue the named milestone instead of creating duplicate milestone files.
3. Preserve the existing milestone naming and directory layout already used in the repo.
4. If the milestone uses legacy combined phase docs, preserve them while resuming; do not rename historical artifacts unless the user asks.

## Concurrency Model

- Multiple milestones may be active at the same time when their implementation scopes do not conflict.
- `.docs/STATE.md` is a portfolio ledger, not a single-current-milestone pointer.
- `.docs/PROJECT.md` should list all active milestones with a short goal and status.
- In shared docs, commit messages, and handoffs, always qualify phases by milestone, for example `M03/P2` or `M03 P2`. Never rely on a bare `P2` when more than one milestone may be active.
- Do not suspend one active milestone automatically when starting another. Mark status explicitly (`active`, `blocked`, `paused`, `complete`).
- If two milestones touch the same subsystem or would make atomic commits unclear, stop and ask instead of pretending they are independent.

## Phase Numbering

- Phase numbering is milestone-local. Every milestone starts at `P1`.
- Plan numbering is phase-local. If a phase needs multiple plans, use `P2-01`, `P2-02`, and so on.
- New work should keep one closeout set per phase:
  - `P2-PLAN.md` or `P2-01-PLAN.md`
  - `P2-SUMMARY.md`
  - `P2-VERIFICATION.md`
  - optional `P2-HANDOFF.md`
- Do not create new cross-phase closeout files such as `P2-P5-SUMMARY.md`. Legacy files can remain, but new milestone work should keep each phase separately addressable.

## Workflow

### 1. Define or refresh scope

Before implementation:

- capture the milestone goal
- define scope and non-goals
- surface the important assumptions with recommended defaults
- clarify only the decisions that materially affect implementation

Prefer short assumption-setting over long interviews.

### 2. Maintain milestone artifacts

Use milestone docs as the source of truth.

Required docs:

- `REQUIREMENTS.md` for what the milestone must deliver
- `ROADMAP.md` for phases and sequencing

Create additional docs only when they add real value:

- `CONTEXT.md` when implementation decisions need to be locked
- `RESEARCH.md` when external or architectural investigation is required
- phase-level `PLAN.md`, `SUMMARY.md`, `VERIFICATION.md`, and `HANDOFF.md` when needed

Do not create extra ceremony just because the old Claude workflow did.

### 3. Plan phases before editing

Each active phase should have a concrete plan before code changes begin.

A good phase plan should define:

- phase goal
- assumptions and locked decisions
- files or subsystems involved
- execution chunks
- verification expectations

Keep plans concrete enough that implementation can proceed without repeated re-interpretation.

### 4. Commit docs before execution

Commit milestone docs as they become authoritative and before the implementation they govern begins.

Examples:

- `docs: start milestone <name>`
- `docs(<milestone>): define requirements for <goal>`
- `docs(<milestone>): add roadmap for <goal>`
- `docs(<milestone>): create phase plan for <milestone>/<phase>`

If the worktree contains unrelated changes that make the docs commit unsafe, stop and ask instead of mixing unrelated edits.

Do not start code edits for a new phase until its planning docs are committed or safely commit-ready.

### 5. Execute in chunks

Implement milestone work phase by phase and chunk by chunk.

A chunk is the smallest practical finished slice that leaves the repo coherent, verified for that slice, and safe to resume from later.

For each completed chunk:

1. Finish the chunk fully.
2. Run the relevant verification for that chunk.
3. Commit it atomically.

Preferred commit shapes:

- `feat(<milestone>): <completed chunk>`
- `fix(<milestone>): <completed chunk>`
- `refactor(<milestone>): <completed chunk>`
- `test(<milestone>): <completed chunk>`

Rules:

- Do not hold all milestone code until one end-of-phase commit.
- Do not batch multiple completed chunks into one larger "phase implementation" commit.
- Do not commit partially completed chunks.
- Do not move on to the next chunk or unrelated follow-up work while a completed chunk is still uncommitted.
- Do not hide milestone progress in oversized mixed commits.
- If verification reveals a narrow follow-up adjustment after a chunk commit, commit that as a separate `fix(<milestone>): ...` commit instead of folding it into a broader in-flight change.

### 6. Write phase closeout docs

When a phase completes:

1. Write the phase `SUMMARY.md`.
2. Write the phase `VERIFICATION.md`.
3. Update `.docs/STATE.md`.

The summary should capture:

- what the phase delivered
- commits made
- decisions made
- deviations from the phase plan
- follow-up work or unresolved issues

Commit phase closeout docs explicitly:

- `docs(<milestone>): summarize <milestone>/<phase>`
- `docs(<milestone>): verify <milestone>/<phase>`

Write `VERIFICATION.md` only after running the actual checks being recorded.

### 7. Run milestone review inside the same skill

When the milestone reaches a reviewable stopping point or completion:

1. Review the implemented milestone work with a code-review mindset.
2. Focus on bugs, regressions, risk, missing tests, and pattern mismatches.
3. Write the outcome to `<milestone>-MILESTONE-AUDIT.md`.

The integrated review should not be a separate lane. It is part of the milestone closeout workflow.

## State And Project Updates

Keep `.docs/STATE.md` usable as the current portfolio ledger.

Update it with:

- all active milestones and their statuses
- each active milestone's current phase and next executable plan
- important accumulated decisions
- blockers or concerns
- completed quick-task or milestone references when relevant

Update `.docs/PROJECT.md` when milestone-level project context changes materially. Prefer an `Active Milestones` section instead of a single `Current Milestone` section.

## Phase Discipline

Use the lighter Codex approach:

- create only the docs needed for the current phase
- make the active phase addressable without needing the reader to infer which milestone owns it
- avoid automatic research or context docs when the codebase already answers the question
- prefer direct code reading over procedural overhead
- preserve durable decisions once they affect later phases

## Git Discipline

Mirror the repo workflow rules during milestone execution:

- commit planning docs before implementation begins
- commit each completed implementation chunk atomically
- prefer the smallest practical finished chunk size
- keep follow-up tweaks as separate fix commits instead of folding them into broader milestone commits
- do not bundle unrelated work into milestone commits
- write verification docs only after the checks actually ran
- if unrelated uncommitted changes make safe atomic commits impossible, stop and ask instead of guessing

The goal is to keep milestone rigor without recreating the full GSD orchestration stack.
