import { readFileSync } from 'node:fs'

const PUBLISHING_PATTERN = /\b(git\s+push|gh\s+pr\s+(create|ready|merge|edit|comment|review|close))\b/

const hookInput = JSON.parse(readFileSync(0, 'utf8'))

if (PUBLISHING_PATTERN.test(hookInput.tool_input?.command ?? '')) {
  process.stderr.write('The developer only commits locally. The tech lead pushes and handles the PR.\n')
  process.exit(2)
}
