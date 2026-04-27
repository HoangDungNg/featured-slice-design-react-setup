# Feature-Sliced Design Todo Template

This project is a React + TypeScript demo template for setting up
[Feature-Sliced Design](https://feature-sliced.design/) in a modern frontend application.

The app uses a Todoist-powered todo demo so the architecture is demonstrated with real API calls
instead of mock-only examples. The goal is to provide a small but practical structure that people
can follow when organizing app, page, widget, feature, entity, and shared code.

## What This Demo Shows

- Feature-Sliced Design layer boundaries in a real React app.
- Todo CRUD-style flows against the Todoist API at `https://api.todoist.com`.
- Entity API/model/config separation under `src/entities/todo`.
- Feature-level UI for user actions such as creating and updating todos.
- Widget-level composition for the todo list and toolbar.
- Page-level orchestration in `src/pages`.
- Fast linting/formatting and pre-commit automation using current tooling.

## Tech Stack

- React 19
- TypeScript
- Vite
- AlovaJS for API requests and request hooks
- TanStack Router for routing
- Tailwind CSS
- Radix UI primitives
- lucide-react icons

## Tooling

- Oxlint is the main linter for speed and general code quality.
- dprint is the formatter.
- Lefthook replaces Husky and lint-staged for Git hooks.
- ESLint is intentionally narrow here: it supports the project by enforcing Feature-Sliced Design
  import boundaries through `eslint-plugin-boundaries`.

## Project Structure

```txt
src/
  app/        # app providers, router setup, application entry wiring
  pages/      # route-level page composition
  widgets/    # standalone UI blocks composed from features/entities/shared
  features/   # user actions and business interactions
  entities/   # domain models, API services, config
  shared/     # reusable infrastructure, UI primitives, utilities
```

The intended dependency direction is top-to-bottom:

```txt
app -> pages -> widgets -> features -> entities -> shared
```

Imports that violate these boundaries are reported by ESLint boundary rules.

## Todoist API Setup

The demo uses the Todoist REST API:

```txt
https://api.todoist.com
```

Create a local environment file from the example:

```bash
cp .env.example .env
```

Then set your Todoist token:

```env
VITE_API_BASE_URL='https://api.todoist.com'
VITE_API_TOKEN='your-api-token'
```

You can get a personal Todoist API token from Todoist integrations settings.

Important: this is a frontend demo template. A `VITE_` token is exposed to the browser bundle. Use
this only for local/demo purposes, or put API access behind a backend for production use.

## Available Scripts

```bash
bun install
bun run dev
bun run build
bun run lint
bun run lint:fix
bun run format
bun run format:check
```

The scripts also work with npm if you prefer:

```bash
npm install
npm run dev
npm run build
```

## Git Hooks

Lefthook is installed through the `prepare` script:

```bash
bun run prepare
```

The pre-commit hook formats staged files with dprint and runs oxlint on staged source files.

## Notes For Template Users

- Keep API calls and domain normalization inside `entities/*/api` and `entities/*/model`.
- Put user interactions such as create/update dialogs in `features/*`.
- Keep widgets focused on composition and display.
- Use pages to orchestrate widget state and route-level composition.
- Prefer adding boundary rules before adding conventions by documentation only.
