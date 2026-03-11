# codexmilestones

A small personal distribution repo for shared Codex workflow assets.

This repo owns the canonical `quick` and `milestone` skills plus a small Node CLI that installs a vendored snapshot of those assets into another project.

## What It Installs

- `.agents/skills/quick/`
- `.agents/skills/milestone/`
- a managed AGENTS workflow block inside `AGENTS.md`
- a version manifest at `.codexmilestones.json`

The target repo keeps its own committed copy of the installed assets so it can pin a known-good version.

## Commands

### Install

Install the shared skills and AGENTS workflow block into the current repo:

```bash
npx github:tilenkrivec/codexmilestones install --target .
```

Install into another local repo while developing this tool locally:

```bash
node bin/codexmilestones.js install --target ../some-project
```

Install only one skill:

```bash
node bin/codexmilestones.js install --target ../some-project --skills quick
```

Skip AGENTS block management:

```bash
node bin/codexmilestones.js install --target ../some-project --no-agents
```

### Check

Compare the installed target manifest version with the currently running CLI version:

```bash
npx github:tilenkrivec/codexmilestones check --target .
```

### Update

Refresh the installed snapshot in place using the currently running CLI version:

```bash
npx github:tilenkrivec/codexmilestones update --target .
```

## Managed Files In The Target Repo

### `.codexmilestones.json`

The manifest records the installed version and asset set, for example:

```json
{
  "tool": "codexmilestones",
  "source": "github:tilenkrivec/codexmilestones",
  "version": "0.1.0",
  "installedSkills": ["quick", "milestone"],
  "agentsBlockInstalled": true,
  "updatedAt": "2026-03-11T09:20:42.502Z"
}
```

### `AGENTS.md`

The CLI inserts or updates a marker-managed workflow block:

```md
<!-- codexmilestones:workflow:start -->
...
<!-- codexmilestones:workflow:end -->
```

Everything outside those markers stays project-owned.

## Repo Layout

```text
bin/
  codexmilestones.js
skills/
  quick/
  milestone/
templates/
  AGENTS.workflow.md
```

## Versioning Model

- The repo version lives in `package.json`.
- Installed repos record the version they received in `.codexmilestones.json`.
- `check` tells you whether the target repo matches the currently running CLI version.
- `update` reapplies the current package contents to the target repo.

For personal use, the intended flow is simple:

1. Make changes here.
2. Commit and push them here.
3. Run `npx github:tilenkrivec/codexmilestones ...` or the local CLI from another repo.
4. Commit the updated vendored snapshot in that target repo.
