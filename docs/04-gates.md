# Gates

Gates turn the rules of the loop into code that runs outside the model.

| Action | Gate | How |
|---|---|---|
| `gh pr ready` | Review gate hook | Blocked unless `~/.claude/reviews/<owner>-<repo>-<pr>/review-<sha>.md` exists for the PR's **current** head commit and its last verdict is APPROVE or COMMENT |
| `git push`, `gh pr create/ready/merge/...` by a developer | Developer guard hook | Attached only to developer agents, blocks any publishing command |
| `gh pr merge`, push to `main`/`master` | Permission `ask` | Claude Code asks you every time |
| `git push --force` | Permission `deny` | Never allowed |

## How a hook blocks

Claude Code runs a `PreToolUse` hook before the tool call and passes the call as JSON on stdin. If the script exits with code `2`, the call is blocked and the text on stderr goes back to the model as the reason. The model then reads "PR #12 has no review for head a1b2c3d. Run the reviewer" and knows what to do.

```js
const hookInput = JSON.parse(readFileSync(0, 'utf8'))
const command = hookInput.tool_input?.command ?? ''

if (/\bgit\s+push\b/.test(command)) {
  process.stderr.write('The developer only commits locally. The tech lead pushes.\n')
  process.exit(2)
}
```

Full examples: `examples/hooks/`.

## Where hooks are attached

- **Global**, in `~/.claude/settings.json`: the review gate. It applies to every session, including the tech lead.
- **Per agent**, in the agent's frontmatter: the developer guard. It applies only while that agent runs, so the tech lead can still push.

## Honest limits

These gates stop mistakes, not a determined bypass. A regex can be dodged, and a review file can be written by hand. That is why the last gate is a person: only you merge.
