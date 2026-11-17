---
name: backend-review
description: Review procedure for backend pull requests. Used by backend-pr-reviewer. Splits the review into units, keeps only findings with evidence, and ends with a verdict the review gate can read.
user-invocable: false
---

# Backend review

## Context first

Before reading the diff, collect: the stack and versions, the repo's rules and lint config, how the app is wired (global guards, pipes, middleware), the layering, and who consumes the changed code. Every unit gets this context.

## Units

Run each unit whose files are touched by the diff, one after another. A strong reviewer usually has each unit as its own skill. Here you describe, for your stack, what each unit hunts for.

| Unit | Seat | Runs when the diff touches |
|---|---|---|
| Correctness | Senior developer | any production code |
| Architecture | Architect | modules, dependencies, layers, public interfaces |
| Data and performance | DB / perf auditor | queries, schema, migrations, jobs, caches, loops over data |
| Security | API auditor | handlers, auth, validation, raw queries, uploads, outbound calls, dependencies |
| Tests | QA | tests, or production code with new branches and error paths |
| Style | Owner | any code, checked against `code-style-backend` |

For each unit, here you describe the bug classes that matter in your stack and the mistakes your team actually makes. Grow the list from bugs the reviewer missed.

## Evidence

Keep a finding only if it names what breaks it: the input, the call order, the data or the attacker path. No trigger means drop it or mark it MINOR.

## Severity

| Severity | Meaning | Effect on verdict |
|---|---|---|
| BLOCKER | Data loss, security hole, broken main flow | REQUEST CHANGES |
| MAJOR | A reachable bug or a missing acceptance criterion | REQUEST CHANGES |
| MINOR | Worth fixing, not breaking | COMMENT at most |

Re-check every BLOCKER and MAJOR yourself before it goes into the review.

## Re-review

If an earlier review for this PR exists, read it. Check that each finding was fixed, rule on each objection the tech lead passed, and review only the new delta.

## Output

Save to `~/.claude/reviews/<owner>-<repo>-<N>/review-<head-short-sha>.md`: summary, findings grouped by severity with `file:line`, evidence and suggested fix, then the last line:

```
**Verdict:** APPROVE | COMMENT | REQUEST CHANGES
```
