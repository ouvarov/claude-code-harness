# Rules for every session and sub-agent

This file goes to `~/.claude/CLAUDE.md`. Sub-agents read it too, so it holds the rules that apply everywhere. Here you describe your own habits; the sections below are the ones a harness needs.

## Code

- The target repo's config and rules come first, then the owner's style guide (`code-style-backend`, `code-style-frontend`), then general practice.
- Here you describe your global code rules that apply in every stack.

## Shell

- One simple command per call, starting with the program name, so permission rules can match it.
- Use `git -C <path>` and absolute paths instead of `cd`.

## Git and PRs

- Here you describe your commit message style and which repos are yours.
- In other repos follow their commit and PR conventions.
- Never merge a PR or push to the default branch without the owner's explicit OK.

## Reviews

- Here you describe what does not count as a blocker for you, for example a CI job that cannot start for reasons outside the PR.

## This machine

- Here you describe the limits of your machine: how many agents may run at once, whether full builds are allowed inside review agents.
