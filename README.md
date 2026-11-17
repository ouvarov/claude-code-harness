# Claude Code harness: how it works

An explanation of a coding harness built on Claude Code: what it is, how it differs from "just an agent", and which parts you have to write yourself.

This repo explains the idea and ships no working setup. The skills the original harness runs on (code style guides, stack reviewers) are personal and not included. To use the idea you write your own.

## Fastest way in

```
git clone https://github.com/ouvarov/claude-code-harness.git
cd claude-code-harness
claude
```

Then ask: "explain what a harness is". Claude reads `CLAUDE.md` and the `docs/` folder and walks you through it.

## Read it yourself

1. [Agent vs harness](docs/01-agent-vs-harness.md): the core difference
2. [Building blocks](docs/02-building-blocks.md): the Claude Code features a harness is made of
3. [The loop](docs/03-the-loop.md): one task from start to merge
4. [Gates](docs/04-gates.md): what stops the agents from cutting corners
5. [Make your own](docs/05-make-your-own.md): what you have to write and in what order

`examples/` has the shape of the files: agent definitions, hooks and settings. These are examples to read, not a package to install.

## In one picture

```
 you ── task ──▶ TECH LEAD (main session, skill /harness-build)
                   │  decides, verifies, never writes code
                   │
                   ├──▶ ARCHITECT agent      read-only design + acceptance criteria   (big tasks only)
                   │
                   ├──▶ DEVELOPER agent      writes code + tests, commits locally, cannot push
                   │
                   ├── pushes, opens a DRAFT PR
                   │
                   ├──▶ REVIEWER agent       reads the PR cold, writes a review file with a verdict
                   │         ▲    │
                   │         └────┘ fix loop: real findings go back to the developer, max 3 rounds
                   │
                   └── gh pr ready  ◀── hook checks: passing review for the current commit?
                                                     no → blocked

 you ── merge  (always a human)
```
