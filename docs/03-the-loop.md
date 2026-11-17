# The loop

What happens after you type `/harness-build add refunds to the payments API`.

## 1. Triage (tech lead)

Reads the repo's rules and git state, picks the stack and the size:

| Size | Signals | Design |
|---|---|---|
| S | Under ~50 lines, a few files | Tech lead writes acceptance criteria |
| M | A normal feature | Tech lead writes a short design; calls the architect if unclear |
| L | Money, auth, migrations, new module or table, public API change | Always the architect, and a stronger developer model |

The tech lead asks you only for product decisions, never for things the repo can answer. It creates the branch and the state file.

## 2. Design (architect, M/L only)

Read-only. Returns a fixed format: approach, existing patterns it follows (`file:line`), changes, data and API impact, risks, PR split, **acceptance criteria**, open questions. Open questions go to you before any code.

Acceptance criteria are the contract for everyone after this point. They describe behaviour someone can check, not implementation steps.

## 3. Build (developer)

One developer agent, never two writers at once. It gets the task, the criteria and the branch. It reads the repo's conventions, writes code and tests, runs lint and the related tests, commits locally, and reports in a fixed format: status, commits, checks run, what was not verified, how each criterion is met.

## 4. Verify (tech lead)

The tech lead does not trust the report. It reads the diff against the criteria and runs the checks itself. Problems go back to the developer before any PR exists.

## 5. Draft PR (tech lead)

Push the branch and open a **draft** PR: what changed and why, how it was checked, what was not.

## 6. Review (reviewer)

A reviewer agent for the stack gets only the repo, PR number and acceptance criteria. Not the developer's reasoning, not the tech lead's opinion. It reads the code cold and writes `review-<head-sha>.md` with findings and a verdict: APPROVE, COMMENT or REQUEST CHANGES.

## 7. Fix loop

For each finding the tech lead decides:

- **real**: back to the developer, fixed in a new commit;
- **wrong**: the tech lead writes down the code that refutes it and gives that to the reviewer next round. The reviewer decides, not the tech lead;
- **product question**: goes to you.

New push, new head commit, new review of the delta. After 3 rounds still failing, it stops and brings you what is left. The PR stays a draft.

## 8. Ready

`gh pr ready`. A hook checks that the current commit has a passing review file. A new commit after the review means the review is stale and the PR stays a draft.

## 9. Report and merge

The tech lead reports: PR link, what changed, what was verified and how, what was not, verdict and number of rounds, rejected findings and why, what you should look at. **You merge.** The harness never does.

## What it prevents

| Step | Without it |
|---|---|
| Triage by size | Over-engineering small tasks, or no design on a migration |
| Fixed acceptance criteria | "Done" means whatever the agent decided |
| Tech lead verifies | A confident report about tests that never ran |
| Draft first | Half-checked code looks ready to teammates |
| Cold reviewer | A review that just agrees with the author |
| Review tied to a SHA | Approve once, push anything after |
| Round limit | An endless argument between two agents |
