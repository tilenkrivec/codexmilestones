# M01 Roadmap: Shared Codex Workflow Distribution CLI

- [x] **Phase P1: Repo Foundation And Distribution Plan**
  Initialize the repository, define the packaging approach, create milestone planning docs, and lock the asset/manifest model.

- [ ] **Phase P2: CLI And Asset Installation**
  Implement the Node CLI, asset copy logic, AGENTS block management, and manifest writing for install/check/update flows.

- [ ] **Phase P3: Verification, Docs, And Publish Flow**
  Verify the CLI against a scratch target, finish usage docs, perform milestone review, and push the repository to GitHub.

## Phase P1: Repo Foundation And Distribution Plan

Deliverables:

- initialized git repo
- milestone docs and repo ledger files
- package layout decision
- planned asset set and manifest format

## Phase P2: CLI And Asset Installation

Deliverables:

- package metadata and bin entry
- shared skill assets under source control
- shared AGENTS workflow block template
- `install`, `check`, and `update` command implementations

## Phase P3: Verification, Docs, And Publish Flow

Deliverables:

- README with install/update guidance
- local verification notes
- milestone audit
- pushed GitHub repo with `main` tracking `origin/main`

## Sequencing Notes

- P1 must land first because the CLI structure depends on the packaging and manifest decisions.
- P2 should finish before any publish/push step so the initial remote state contains a usable tool.
- P3 should verify against a scratch target rather than relying only on file inspection.
