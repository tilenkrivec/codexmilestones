# Codex Workflow Routing

This repo uses two explicit workflow lanes:

- `$quick`
- `$milestone`

Default behavior is still normal task execution. Do not enter a workflow lane unless the user explicitly asks for it.

## Hard Routing Rules

Route into `$quick` only when the user explicitly says things like:

- `Use $quick`
- `Let's start a quick task`
- `Make this a quick task`
- `Continue quick task 133`
- `Resume the quick task for ...`

Route into `$milestone` only when the user explicitly says things like:

- `Use $milestone`
- `Let's start a new milestone`
- `Make this a milestone`
- `Continue milestone M03`
- `Resume milestone M03`
- `Resume the current milestone` when exactly one active milestone is listed in `.docs/STATE.md`

Do not infer `$quick` or `$milestone` from task size or complexity alone.

If the user makes a normal coding request without explicitly choosing a workflow lane, handle it directly instead of routing into a skill.

## Persistence Rules

When `$quick` is invoked:

- persist work under `.docs/quick/`
- create a plan before implementation
- commit completed chunks atomically
- finish with summary and verification docs
- update `.docs/STATE.md`

When `$milestone` is invoked:

- persist work under `.docs/milestones/`
- maintain requirements and roadmap
- plan active phases before editing
- commit completed chunks atomically
- finish with phase verification and integrated milestone review
- update `.docs/STATE.md`
- update `.docs/PROJECT.md` when milestone context changes materially
- treat phases as milestone-local (`M03/P2`, not bare `P2`) in shared docs and handoffs

## Commit Discipline

For both workflow lanes:

- commit planning docs before implementation begins
- commit each completed implementation chunk atomically
- prefer the smallest practical commit slices so finished quick-task work can be closed out immediately
- when a quick task is functionally complete, create its closeout commit(s) before starting unrelated follow-up work
- keep follow-up tweaks as separate fix commits instead of folding them into broader in-flight changes
- do not bundle unrelated work into workflow commits
- write verification docs only after running the actual checks

If unrelated uncommitted changes make safe atomic commits impossible, stop and ask instead of guessing.
