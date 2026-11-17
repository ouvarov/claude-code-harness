# Agent vs harness

## Agent

An agent is one model in a loop: it reads, thinks, calls tools (read file, edit file, run command) and repeats until it decides it is done. Claude Code in your terminal is an agent. A sub-agent is the same thing started by another agent, with its own fresh context, its own instructions and its own set of tools.

An agent is a **worker**. It is smart, but on its own it:

- marks its own homework: the same context that wrote the code says the code is fine;
- forgets: once the conversation is long or restarted, decisions are gone;
- cuts corners when nothing stops it: skips tests, pushes, says "done" on an assumption;
- writes code in its own average style, not yours or the repo's.

## Harness

A harness is the **system around the agents**: who does what, in what order, what each one is allowed to do, what has to be true before the next step, and where decisions are written down.

Think of a team process rather than a person:

| Team | Harness |
|---|---|
| Tech lead | The main Claude session running a skill (`/harness-build`) |
| Architect | A read-only sub-agent |
| Developer | A sub-agent that can edit and commit, but not push |
| Code reviewer | A sub-agent that sees only the PR, not the developer's reasoning |
| "No merge without approval" | A hook that blocks `gh pr ready` without a passing review file |
| Team lead / owner | You. Only you merge |
| Jira ticket, design doc | A state file per task |

The agents are interchangeable parts. The harness is the part that stays the same from task to task, so the result does not depend on how lucky one long chat was.

## The one-line version

The agent writes code. The harness decides who writes it, who checks it, what counts as checked, and makes skipping a step impossible or at least loud.

## Why split roles at all

Each split fixes a specific failure:

| Split | Failure it prevents |
|---|---|
| Tech lead does not write code | The one who wrote it cannot judge the review of it fairly |
| Reviewer gets a clean context | A reviewer who read the developer's reasoning agrees with it |
| Developer cannot push | Unreviewed code never reaches GitHub through the developer |
| Architect cannot edit | Design does not quietly turn into half-written code |
| Verdict belongs to the reviewer | The tech lead cannot "soften" a REQUEST CHANGES to finish faster |
| Human merges | The last boundary is a person, not a regex in a hook |
