# teststore.e2e

End-to-end tests for the [PrestaShop demo store](https://teststore.automationtesting.co.uk), built with Playwright and TypeScript.

> **AI-generated:** The tests, page objects and fixtures in this project were generated with [Claude Code](https://claude.com/claude-code). To extend or regenerate them, you need Claude Code and the project skills in `.claude/skills/` (`page-object-creator`, `playwright-fixtures`, `api-controller-creator`, `playwright-cli`). The `.claude/` folder is git-ignored, so get it from the project maintainer.

## Prerequisites

- Node.js latest 22.x, 24.x or 26.x.
- Internet access. The tests run against the live public site, so there is no local app to start.
- Optional: [Claude Code](https://claude.com/claude-code) with the project skills, for writing new tests

## Setup

```bash
npm ci
npx playwright install --with-deps
```

## Running tests

```bash
npx playwright test                          # all tests, all browsers
npx playwright test --project=chromium       # one browser
npx playwright test tests/auth               # one folder or file
npx playwright test --grep @auth             # by tag
npx playwright test -g "E2E-AUTH-01"         # by test ID
npx playwright test --ui                     # interactive UI mode
npx playwright show-report                   # open the last HTML report
```

## Code quality

```bash
npx tsc --noEmit     # type-check
npx eslint .         # lint
```

## Project structure

```
app/pages/        Page Objects (page class + locators per page)
tests/fixtures/   Playwright fixtures (one per page object)
tests/data/       Test data and user factories
tests/            Specs, grouped by feature
```
