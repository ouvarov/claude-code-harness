# Building blocks

A harness on Claude Code needs no framework. It is made of plain files that Claude Code already understands.

| Block | Where it lives | What it is for in the harness |
|---|---|---|
| `CLAUDE.md` | `~/.claude/CLAUDE.md` (global), `<repo>/CLAUDE.md` (per repo) | Rules every session and sub-agent follows: shell habits, commit style, "never merge" |
| Skill | `~/.claude/skills/<name>/SKILL.md` | A procedure or knowledge pack loaded on demand. The loop itself is a skill (`/harness-build`); so are your style guide and reviewer checklists |
| Sub-agent | `~/.claude/agents/<name>.md` | A role: its own model, tools, preloaded skills and hooks. Architect, developer, reviewer |
| Hook | Script referenced from `settings.json` or an agent's frontmatter | Code that runs before or after a tool call and can block it. This is how rules become enforced instead of requested |
| Permissions | `settings.json` → `permissions.allow/ask/deny` | Hard limits: deny `git push --force`, ask before `gh pr merge` |
| State file | `~/.claude/harness/state/<repo>/<branch>/task.md` | The task's memory: size, design, criteria, decisions, rejected findings. Replaces chat memory |
| Review file | `~/.claude/reviews/<owner>-<repo>-<pr>/review-<sha>.md` | The reviewer's output, tied to one commit. The gate reads it |

## Instructions vs enforcement

A line in a prompt is a request. The model follows it most of the time. A hook or a permission rule is enforcement: it runs as code outside the model.

Rule of thumb: put judgement in prompts and skills, and put the things that must never happen in hooks and permissions.

## How a sub-agent is defined

Frontmatter decides what the role can do. The body is short; the real rules come from preloaded skills.

```markdown
---
name: backend-developer
description: Writes code and tests on the current branch and commits locally.
model: sonnet
tools: Read, Grep, Glob, Edit, Write, Bash
skills:
  - developer-core        # how to work: scope, tests, report format
  - code-style-backend    # how the code should look (yours to write)
hooks:
  PreToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: node "$HOME/.claude/harness/hooks/developer-guard.mjs"
---

You write backend code for the task you are given. You do not push and you do not touch PRs.
```

More in `examples/agents/`.

## Model choice per role

| Role | Model | Why |
|---|---|---|
| Tech lead | The main session's model | Makes the decisions |
| Architect | Strongest | A wrong design is the most expensive mistake |
| Developer | Mid-tier by default, strongest for large or risky tasks | Most code is routine; the reviewer catches the rest |
| Reviewer | Strongest | Has to find what the developer missed |
