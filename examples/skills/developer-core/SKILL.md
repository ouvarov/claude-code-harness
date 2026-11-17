---
name: developer-core
description: Working rules for the harness developer agents - scope, tests, verification, commits and the report back to the tech lead. Preloaded by backend-developer, frontend-developer and developer.
user-invocable: false
---

# Developer rules

## Before the first edit

1. Read the task and its acceptance criteria. If a criterion is ambiguous, or the work needs a decision the task does not make, stop and report the question.
2. Read the repo's `CLAUDE.md` or `AGENTS.md`, its lint and format config, and two or three neighbouring files that do the same kind of thing.
3. Precedence: repo config > repo rules > the preloaded style guide > general practice. A pattern the repo already uses wins over the guide; report the difference.

## While writing

- Stay on the current branch. The tech lead creates it.
- Do only this task. Report unrelated problems instead of fixing them.
- Reuse what the repo has before adding a helper or a dependency. Do not add a dependency unless the task says so.
- Add or change tests with the behaviour. Check that a new test fails when the changed line is broken.
- Commit each coherent step with the repo's commit style.

## Before you report

Run the repo's own lint, type check and the tests for what changed, not the full suite. If a check cannot run, say so. Never call work done on an assumption.

## Report

End with exactly this:

```
Status: done | blocked | question
Commits: <sha> <subject>
Changed: <files, one line each with what changed>
Checks: <command> -> <pass/fail, key output>
Not verified: <what was not run or checked, or "nothing">
Criteria: <each acceptance criterion -> how it is met>
Open questions: <or "none">
```
