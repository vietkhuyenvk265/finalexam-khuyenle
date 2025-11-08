# PLAYWRIGHT - KHUYEN LE

This repository contains a Playwright framework setup for automated testing. The base URL is: [text](playwright.config.ts)

The framework is structured as follows:

## Project Folder Structure

FINALEXAM_PLAYWRIGHT<br>
├── .github <br>
├── node_modules <br>
├── playwright-report <br>
└── src<br>
&nbsp; &nbsp; &nbsp; &nbsp;├── data<br>
&nbsp; &nbsp; &nbsp; &nbsp;├── fixtures<br>
&nbsp; &nbsp; &nbsp; &nbsp;├── helpers<br>
&nbsp; &nbsp; &nbsp; &nbsp;├── pages<br>
&nbsp; &nbsp; &nbsp; &nbsp;├── tests<br>
├─ test-results<br>
│ .gitignore<br>
│ package-lock.json<br>
│ package.json<br>
│ playwright.config.ts<br>
│ README.md<br>

## Description

- `.github`: Contains GitHub Actions workflow file for continuous integration.
- `.node_modules`: Directory containing Node.js modules installed by npm.
- `playwright-report`: Directory for storing Playwright test reports.
- `.gitignore`: Specifies intentionally untracked files to ignore in Git.
- `package-lock.json` and `package.json`: Node.js package files specifying project dependencies.
- `playwright.config.ts`: Configuration file for Playwright settings.


### `src`

- Source code directory containing project files.

- `src/data`: Contains static test data and input values used across test cases.
- `src/fixtures`: Provide reusable setup and teardown logic.
- `src/helpers`: Contains utility functions and custom helpers that used across multiple tests
- `src/pages`: POM pattern — each file represents a single page of the AUT
- `src/tests`: Contains all Playwright test specifications

### `test-results`

- Directory for storing test execution results.

## Instruction

### Installation
#### Prerequisites
- Node.js (v16 or higher)
- npm (comes with Node.js) or yarn for package management
- Git (if cloning the repo)

#### Steps to Install
- Clone the repository and install dependencies using `npm install`.
- Install Playwright and the necessary browsers: `npx playwright install`

#### Usage
- Run tests in all supported browsers using `npm test`.
- Running in Specific Browser using `npx playwright test --project=chromium`.

## Author and Contact
- Author: Khuyen Le
- Email: vietkhuyenvk265@gmail.com

