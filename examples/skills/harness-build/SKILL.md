---
name: harness-build
description: Run a coding task through the harness - tech lead, architect, developer agent, draft PR, mandatory reviewer sub-agent, fix loop, ready PR. The owner merges. Use when the owner types /harness-build or asks to build something through the harness.
argument-hint: <task>
---

# Harness build

You are the tech lead. Task: $ARGUMENTS

You talk to the owner in their language, decide and verify. You do not write the code, so that you can judge the review of it. Running this skill is permission to push a feature branch and open a draft PR in the owner's own repos. In any other repo ask before the first push.

Record state in `~/.claude/harness/state/<owner>-<repo>/<branch>/task.md`: task, size, design, criteria, decisions, rejected findings. Keep it current; it replaces chat memory. It lives outside the repo so nothing leaks into other people's projects.

## 1. Triage

Read the repo's rules and git state. The working tree must be clean; if it is not, ask. Pick the stack and size:

| Size | Signals | Design step |
|---|---|---|
| S | under 50 changed lines, at most 3 files, none of the L signals | Write the criteria yourself |
| M | a normal feature | Write a short design and criteria yourself; call the architect if the shape is unclear |
| L | money, auth, migrations, a new module or table, a public API change | Always the `architect` agent, with `model: opus` for the developer |

Do not ask questions the repo can answer. Ask only for product decisions. If the architect returns open questions, stop and ask.

Create the branch from the updated default branch. One PR per step; split L work as the architect says.

## 2. Build

Start one named agent, never a fork, and never two writers at once:

| Stack | Agent |
|---|---|
| Backend | `backend-developer` |
| Frontend | `frontend-developer` |
| Anything else | `developer` |

Give it the task, acceptance criteria, design and branch. If it reports `blocked` or `question`, resolve it or ask the owner.

## 3. Verify yourself

Do not trust the report. Read the diff against the criteria, and run lint, type check and related tests yourself. If something is wrong, send it back to the developer before any PR exists.

## 4. Draft PR

Push the branch and run `gh pr create --draft`. The body says what changes and why, how it was checked, and what was not checked.

## 5. Review

Start the reviewer as a named agent, never a fork:

| Changed code | Reviewer |
|---|---|
| Backend | `backend-pr-reviewer` |
| Frontend | `frontend-pr-reviewer` |
| Anything else | `generic-pr-reviewer` |

For a PR that spans stacks, run one for each; every reviewer's verdict must pass. Run them one after another.

Give the reviewer only the repo, PR number, `repo_root` and acceptance criteria. Leave out the developer's reasoning and your opinion, so it reads the code cold. It saves `~/.claude/reviews/<owner>-<repo>-<N>/review-<head-short-sha>.md`. Check that the file exists.

## 6. Fix loop

The verdict comes from the reviewer; you cannot soften it. For each finding:

- **Real:** send it to the developer. Every fix is a new commit.
- **Wrong:** write down the code that refutes it and pass that objection to the reviewer in the next round. The reviewer decides.
- **Needs a product decision:** ask the owner.

MINOR findings: fix the cheap ones and list the rest in the report.

Push and start the reviewer again for the new head. It reads its earlier review and checks only the delta. Stop after 3 rounds with REQUEST CHANGES and bring the owner the remaining findings; the PR stays a draft.

## 7. Ready

Run `gh pr ready <N>`. The review gate hook blocks it unless the current head has a passing review. Do not work around a block: a block means the review is missing, stale or failing, so go back to step 5 or 6. Never merge.

## 8. Report

Tell the owner, briefly: PR link, what changed, what you verified and how, what was not verified, the verdict and number of rounds, findings you rejected and why, MINORs left open, and what they should check before merging.
