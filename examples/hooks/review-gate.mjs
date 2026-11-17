import { execFileSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'

const PR_READY_PATTERN = /\bgh\s+pr\s+ready\b([^;&|\r\n]*)/
const VERDICT_PATTERN = /\*\*Verdict:(?:\*\*)?\s*(APPROVE|REQUEST CHANGES|COMMENT)/g
const PR_URL_PATTERN = /github\.com\/([^/]+)\/([^/]+)\/pull\/(\d+)/
const PASSING_VERDICTS = new Set(['APPROVE', 'COMMENT'])

const blockWith = (reason) => {
  process.stderr.write(`${reason}\n`)
  process.exit(2)
}

const hookInput = JSON.parse(readFileSync(0, 'utf8'))
const match = (hookInput.tool_input?.command ?? '').match(PR_READY_PATTERN)

if (!match || match[1].includes('--undo')) process.exit(0)

const selector = match[1].trim().split(/\s+/).find((arg) => arg && !arg.startsWith('-'))
const args = ['pr', 'view', ...(selector ? [selector] : []), '--json', 'url,headRefOid']

let pullRequest
try {
  pullRequest = JSON.parse(execFileSync('gh', args, { cwd: hookInput.cwd, encoding: 'utf8' }))
} catch (error) {
  blockWith(`Review gate cannot read the PR, so it stays a draft: ${error.message}`)
}

const [, owner, repo, number] = pullRequest.url.match(PR_URL_PATTERN)
const shortSha = pullRequest.headRefOid.slice(0, 7)
const reviewDir = join(homedir(), '.claude', 'reviews', `${owner}-${repo}-${number}`)
const reviewFile = (existsSync(reviewDir) ? readdirSync(reviewDir) : []).find((name) => {
  const reviewedSha = name.match(/^review-([0-9a-f]{7,40})\.md$/)?.[1]
  return reviewedSha !== undefined && pullRequest.headRefOid.startsWith(reviewedSha)
})

if (!reviewFile) {
  blockWith(`PR #${number} has no review for head ${shortSha}. Run the reviewer for this commit.`)
}

const verdict = [...readFileSync(join(reviewDir, reviewFile), 'utf8').matchAll(VERDICT_PATTERN)].at(-1)?.[1]

if (!PASSING_VERDICTS.has(verdict)) {
  blockWith(`PR #${number} head ${shortSha} is ${verdict ?? 'missing a verdict'}. Fix the findings and re-review.`)
}
