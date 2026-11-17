# Examples

A complete harness for one backend stack, laid out the way it sits in `~/.claude`. Everything is real except the parts only you can write: `code-style-backend` and the bug classes in `backend-review` say "here you describe" where your own rules go.

| File | Goes to | Role in the loop |
|---|---|---|
| `CLAUDE.md` | `~/.claude/CLAUDE.md` | Rules every session and sub-agent follows |
| `settings.json` | `~/.claude/settings.json` | Review gate hook, ask/deny for merge and force push |
| `skills/harness-build/SKILL.md` | `~/.claude/skills/harness-build/` | Tech lead: the whole loop |
| `agents/architect.md` | `~/.claude/agents/` | Read-only design and acceptance criteria |
| `agents/backend-developer.md` | `~/.claude/agents/` | Writes code, commits locally, cannot push |
| `skills/developer-core/SKILL.md` | `~/.claude/skills/developer-core/` | How the developer works and reports |
| `skills/code-style-backend/SKILL.md` | `~/.claude/skills/code-style-backend/` | How your code looks. Yours to fill |
| `agents/backend-pr-reviewer.md` | `~/.claude/agents/` | Reviews the PR cold |
| `skills/backend-review/SKILL.md` | `~/.claude/skills/backend-review/` | Review units, evidence, severity, verdict. Bug classes are yours to fill |
| `hooks/review-gate.mjs` | `~/.claude/harness/hooks/` | Blocks `gh pr ready` without a passing review for the current commit |
| `hooks/developer-guard.mjs` | `~/.claude/harness/hooks/` | Blocks push and PR commands inside the developer agent |

For a second stack (frontend, Python) you add one more developer agent, style skill, reviewer agent and review skill of the same shape. The tech lead, architect, `developer-core` and the gates stay the same.
