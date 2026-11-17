---
name: code-style-backend
description: The owner's backend code style, so code written by the developer agents reads like the owner's own. Preloaded by backend-developer and used by the reviewer for style findings.
---

# Backend code style

This is the one file in the harness that is only yours. Here you describe how **you** write code, taken from your own repos, not from general best practice. The developer agent follows it; the reviewer checks against it. Below is what each section is for.

## Top rules

Here you describe the three to five rules you care about most and would reject a PR for. They go first, because the agent weighs the top of the file the most.

## Naming

Here you describe how you name files, classes, functions, variables, booleans, constants and types.

## Project layout

Here you describe where things live: feature folders or layers, what a module contains, what is shared and where.

## Layers

Here you describe who may call whom: controller, service, repository, external clients. What logic belongs in each, and what must never be there.

## Input, output and validation

Here you describe how requests are validated, how responses are shaped and documented, and what never leaves the API.

## Errors

Here you describe how errors are thrown, mapped to responses and logged, and what is never swallowed.

## Config and secrets

Here you describe how config is read and validated, and where secrets come from.

## Types

Here you describe your type rules: what you prefer, what is banned, how you handle unknown data at the boundary.

## Tests

Here you describe what you test, at which level, with which tools, and how a good test looks in your repos.

## Commits

Here you describe your commit message style.

## Examples

Here you put short good and bad pairs copied from your real code. They teach the agent more than any rule above.
