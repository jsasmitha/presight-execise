# Presight Frontend Exercise

Build a small full-stack user directory application. The goal is to evaluate how you design a searchable, filterable, paginated UI backed by persisted data and clear API boundaries.

The application should include:

- A React client.
- A Node.js API server.
- A SQLite database used as the source of truth for user data.
- Docker configuration for running the application locally.

## Scenario

Users need to browse a large directory of people, search by name, and narrow results by nationality and hobbies. The filter sidebar should help users discover useful filters based on the result set they are currently viewing.

## Requirements

### Data Model

Seed a SQLite database with enough records to make pagination, infinite scroll, search, and filter counts meaningful.

Each user should have:

- `avatar`
- `first_name`
- `last_name`
- `age`
- `nationality`
- `hobbies`, from 0 to 10 hobbies per user

Choose a data model that supports the required behavior.

SQLite must be the persisted source of user data.

### API

Expose an API that supports:

- Paginated user results.
- Text filtering from user input across `first_name` and `last_name`.
- Filtering by one or more nationalities.
- Filtering by one or more hobbies.
- Sorting by `first_name`, `last_name`, `age`, and `nationality`.
- Pagination metadata so the client can determine whether more results are available.
- Top 20 hobbies for the active text filter and filter state, including `{ value, count }`.
- Top 20 nationalities for the active text filter and filter state, including `{ value, count }`.

The top 20 values and counts must reflect the currently applied text filter and selected filters, not the global dataset.

Filter semantics:

- Multiple selected hobbies should match users who have all selected hobbies.
- Multiple selected nationalities should match users from any selected nationality.
- Text, hobby, and nationality filters should apply together.

Sorting semantics:

- Sorted results must be deterministic. Use `id` as a final tie-breaker when values are equal.
- Pagination must respect the active sort without duplicate or missing users.

### Client

Build a React interface that includes:

- A text filter input for `first_name` and `last_name`.
- A virtualized, infinitely scrolling list of user cards.
- A sidebar containing the top 20 hobbies and top 20 nationalities for the current result set, including counts.
- Controls for applying and removing hobby and nationality filters.
- Controls for choosing sort field and sort direction.
- Loading, empty, and error states.
- A responsive layout that remains usable on desktop and mobile.

User cards should follow this structure:

```text
|----------------------------------|
| avatar      first_name+last_name |
|             nationality      age |
|                                  |
|             (2 hobbies) (+n)     |
|----------------------------------|
```

Show up to 2 hobbies on the card. If the user has more hobbies, display the remaining count as `+n`.

Use a virtual scroll implementation for the list.

When the text filter or selected filters change, the client must refresh both:

- The paginated user list.
- The top 20 hobbies and nationalities in the sidebar.

The text filter value, selected hobbies, selected nationalities, sort field, and sort direction must be reflected in the URL query string. Reloading or sharing the URL should restore the same view state.

## Implementation Notes

- Keep the database setup easy to run locally.
- Include seed logic or a documented command that creates the SQLite database.
- Include a `Dockerfile` and `docker-compose.yml` that can run the application locally.

## Evaluation Focus

We will pay particular attention to:

- Correct data persistence and API behavior.
- Correct filtering, sorting, pagination, and top 20 counts.
- Smooth infinite scrolling with virtualization.
- URL-synced state.
- Clear loading, empty, and error states.
- Easy local and Docker-based setup.

## Deliverables

Please provide:

- Source code for the React client and Node.js server.
- A `Dockerfile` and `docker-compose.yml`.
- Instructions for setup, database seeding, and running locally.
- Instructions for running with Docker Compose.

## Scaffold the project structure

- Creted components, pages, hooks, services, types, utils inside src folder and public public folder for react project
- Created routes, controllers, services, db, models, utils, seed inside src and database folder on node project
- create the important files
  - client side
    src/main.tsx, src/App.tsx, index.html, vite.config.ts, tsconfig.json
  - server side
    src/index.ts, src/routes/user.routes.ts, src/controllers/user.controller.ts, src/services/user.service.ts, src/db/database.ts, src/db/schema.sql, src/seed/seed.ts, tsconfig.json

## Root setup

- Added script for running the client and server parallally and also build it using lerna
- Set the config to node-modules as vite recommends it `yarn config set nodeLinker node-modules`
- Install using `yarn install`

## Client Setup

- Added scripts to dev, build and start using vite
- Installed vite to workspace using `yarn workspace presight-client add -D vite`
- Installed typescript react usning `yarn workspace presight-client add -D typescript @vitejs/plugin-react`
- Installed Sass using `yarn workspace presight-client add -D sass`

## Server setup

- Added scripts to dev, build, start and seed db
- Installed tsx and @types/node plugin using `yarn workspace presight-server add -D typescript tsx @types/node`

## Run the project

- Run both using `yarn dev`

## Installing SQLite for the project

- Will be using better-sqlite3 as its significantly faster and excecutes quesries synchronously
- Sqlite installed using `yarn workspace presight-server add better-sqlite3`
- installing typescript support for sqlite using `yarn workspace presight-server add -D @types/better-sqlite3`

## Creating the schema

- Users table with id, avatar, first_name, last_name, age and nationality
- Hobbies Reference table with id and name
- Many to many table for user hobbies with user_id and hobby_id and both are foriegn key from users and hobbies table
- Added indexes for performance optimisation

## Create a database Connection

- Create a database connection by write script at server/src/database/database.ts

## Create the seed script

- Create a seed script at server/src/seed/seed.ts
- Add the seed command in server's package.json `tsx src/seed/seed.ts`
- Run the seed command `yarn workspace presight-server seed`

## Client Side plugins

- Installed react-query using `yarn add @tanstack/react-query`
- Installed react-virtual using `yarn workspace presight-client add @tanstack/react-virtual`
