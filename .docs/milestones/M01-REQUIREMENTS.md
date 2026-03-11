# M01 Requirements: Shared Codex Workflow Distribution CLI

## Goal

Create a central repository that owns the reusable `quick` and `milestone` Codex workflow assets and distributes them into other projects through a small Node CLI.

## In Scope

- central repo structure for skills, templates, and CLI code
- canonical copies of the `quick` and `milestone` skills with agent metadata
- shared AGENTS workflow block template for insertion into project `AGENTS.md`
- versioned package metadata
- local install manifest format
- `install`, `check`, and `update` commands
- README guidance for personal multi-project usage
- local verification against a scratch target project

## Out Of Scope

- public multi-user SaaS behavior
- plugin marketplace or remote registry
- automatic conflict resolution for arbitrary local edits in installed skill copies
- broad project-template generation beyond the shared workflow assets

## Success Criteria

- A fresh target repo can install the shared assets with one CLI command.
- The install writes the selected skills into `.agents/skills/` and manages a shared AGENTS workflow block without clobbering unrelated project instructions.
- The install writes a manifest that records at least source, version, and installed asset set.
- `check` can report whether the target repo matches the currently installed package version.
- `update` can refresh the vendored assets in place from the newer central package contents.
- The repo itself is ready to be pushed to GitHub and reused from other local repos.

## Assumptions

- Personal use is the primary audience, so ergonomics and maintainability matter more than marketplace-grade extensibility.
- The CLI can ship as plain Node ESM JavaScript without a TypeScript build step.
- Versioning can follow `package.json` semver and a project-local manifest rather than a separate release service.
- Installed projects will commit the vendored skill snapshot so each repo can pin a known-good version.
