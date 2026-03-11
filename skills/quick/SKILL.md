---
name: quick
description: Create or continue a bounded quick-task workflow with `.docs/quick/` artifacts, assumptions-first prep, atomic chunk commits, summary, and verification. Use only when the user explicitly invokes `$quick` or clearly asks to start, make, continue, or resume a quick task. Do not use for ordinary coding requests unless the user explicitly chooses this lane.
---

# Quick

Run the lightweight workflow lane for bounded but non-trivial work.

Persist the task in `.docs/quick/`, make chunked commits as work completes, and finish with summary plus verification.

## Invocation Rules

- Use this skill only after an explicit user invocation such as:
  - `$quick`
  - `Let's start a quick task`
  - `Make this a quick task`
  - `Continue quick task 133`
  - `Resume the quick task for ...`
- Do not activate this skill for normal coding requests just because the task looks small enough.
- If the task clearly exceeds the quick-task lane, explain why and recommend `$milestone`. Do not silently convert lanes.

## Start Or Resume

### Start a new quick task

1. Read `.docs/STATE.md` if it exists.
2. Scan `.docs/quick/` to find the highest existing numeric quick-task id.
3. Allocate the next id and create a task directory:
   - `.docs/quick/<id>-<slug>/`
4. Create these files:
   - `<id>-PLAN.md`
   - `<id>-SUMMARY.md` later
   - `<id>-VERIFICATION.md` later

Slug rules:

- Use a short hyphenated summary of the task.
- Keep the existing repo style even if the slug truncates.

### Resume an existing quick task

1. Locate the matching task directory in `.docs/quick/`.
2. Read the existing `PLAN`, `SUMMARY`, `VERIFICATION`, and `.docs/STATE.md` as needed.
3. Continue the same task instead of creating a duplicate.

## Workflow

### 1. Gather context and surface assumptions

- Read only the files needed to understand the task.
- Surface the important assumptions with recommended defaults.
- Ask the user only when one of these is true:
  - a wrong assumption would materially change the implementation
  - the requested output format is unclear
  - the task has outgrown the quick-task lane

Keep this stage short. The point is alignment, not ceremony.

### 2. Write the plan

Write `<id>-PLAN.md` before code changes.

The plan should cover:

- task goal
- problem statement
- assumptions
- scope and non-goals
- implementation chunks
- files expected to change
- verification plan

Prefer 1-3 execution chunks. If it naturally requires more, the task is probably a milestone.

### 3. Commit the plan

Commit the plan before implementation begins:

- `docs(quick-<id>): create plan for <task>`

If unrelated uncommitted changes make an atomic docs commit risky, stop and ask instead of bundling unrelated work together.

### 4. Execute in chunks

For each chunk:

1. Implement the chunk completely.
2. Run the relevant local verification for that chunk.
3. Commit the completed chunk atomically.

Preferred commit shapes:

- `feat(quick-<id>): <completed chunk>`
- `fix(quick-<id>): <completed chunk>`
- `refactor(quick-<id>): <completed chunk>`
- `test(quick-<id>): <completed chunk>`

Rules:

- Do not create one giant implementation commit for the whole task.
- Do not commit half-finished chunks.
- Do not mix unrelated changes into the quick-task commit series.

### 5. Write the summary

After implementation is complete:

1. Write `<id>-SUMMARY.md`.
2. Update `.docs/STATE.md`.

The summary should capture:

- what was completed
- task commits
- decisions made
- deviations from the plan
- issues encountered
- any follow-up items worth carrying forward

Commit the documentation closeout:

- `docs(quick-<id>): complete <task>`

### 6. Verify and close

Run the real verification commands or checks for the completed task.

Write `<id>-VERIFICATION.md` with:

- observable truths checked
- artifact existence and wiring checks
- commands actually run
- any remaining gaps
- any human verification still needed

Commit the verification artifact:

- `docs(quick-<id>): add verification for <task>`

## State Updates

When the task completes, update `.docs/STATE.md` so it remains the current ledger.

Include, when relevant:

- the completed quick-task row
- current decisions worth preserving
- blockers or concerns
- current position if the task affects active milestone work

Keep the state file concise and useful for resuming work later.

## Promotion Rule

Recommend `$milestone` instead of continuing in `$quick` when any of these become true:

- the task spans multiple subsystems
- the task will likely take multiple sessions
- the work needs roadmap or phase tracking
- the scope keeps expanding during execution
- there are unresolved product or architecture decisions

If promotion is needed:

1. Explain the reason briefly.
2. Preserve any useful assumptions or notes already gathered.
3. Ask the user whether to continue as `$milestone`.
