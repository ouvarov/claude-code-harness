# Make your own

The loop and the gates are generic. What makes a harness yours, and what is not shared here, is the knowledge the agents load: how your code should look and what your reviewer checks.

## What you have to write

| Piece | Kind | What goes in it |
|---|---|---|
| Global rules | `~/.claude/CLAUDE.md` | Your shell habits, commit style, which repos are yours, "never merge without me", machine limits |
| Tech lead procedure | Skill `harness-build` | The loop from `03-the-loop.md` in your words: sizes, which agent per stack, where state lives, round limit, report format |
| Developer rules | Skill `developer-core` | Read repo rules first, stay in scope, tests with every change, run checks, fixed report format |
| Your code style | Skill per stack, e.g. `code-style-backend` | The part that makes code look like yours. See below |
| Architect | Agent | Read-only, fixed output format with acceptance criteria |
| Developers | Agent per stack | Model, tools, preloaded `developer-core` + your style skill, developer guard hook |
| Reviewers | Agent per stack, usually backed by several skills | The part that catches bugs. See below |
| Gates | Hooks + permissions | `examples/hooks/`, `examples/settings.json` |

## A code style skill

Write it from your own code, not from general best practice. A useful one has:

- your top rules first (for example: no comments except a non-obvious why);
- naming, file and module layout, how layers talk to each other;
- error handling, config, logging, types;
- tests: what you test and how;
- commit message style;
- short good/bad examples taken from your real repos;
- precedence: the repo's own config and rules win over the guide.

## A reviewer

One prompt that says "review this PR" gives generic comments. A reviewer that finds real bugs is usually:

- **split into units by seat**: correctness, architecture, data and performance, security, tests, style. Each unit is its own skill with its own checklist for your stack;
- **evidence-guarded**: every finding must name the input, call order or data that breaks it. No trigger means no finding, or a downgrade;
- **severity with rules**: BLOCKER / MAJOR / MINOR, and what each one means for the verdict;
- **self-verifying**: the orchestrator re-checks every BLOCKER and MAJOR before reporting;
- **bound to a commit**: it saves `review-<sha>.md` with a `**Verdict:**` line the gate can read;
- **read-only**: it can write only its review file, never the repo.

This is the most work and the biggest payoff. Start with one unit for your main stack and grow it from the bugs it misses.

## Order to build in

1. Global `CLAUDE.md` rules.
2. A reviewer for your main stack. It is useful on its own, even without the rest.
3. Developer agent + `developer-core` + your style skill.
4. `harness-build` tech lead skill.
5. Gates: developer guard, then review gate, then permissions.
6. Architect, when you start doing larger tasks through it.

Run real tasks through it and change the skills each time an agent does something you would not accept from a teammate.
