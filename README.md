# Presight User Directory

A fullstack user directory application build with **React**, **Node.js** and **SQLite**. 
The application supports searching, filtering, sorting, pagination, infinite scrolling and URL-synchronised state.

---

## Tech Stack

### Client
- React
- TypeScript
- Vite
- TanStack React Query
- TanStack React Virtual
- Tailwind CSS
- Sass

### Server
- Node.js
- Express
- TypeScript
- SQLite (better-sqlite3)

### Infrastructure
- Docker
- Docker Compose
- Yarn Workspace
- Lerna

---

## Features

### User Directory
- Infinite scrolling with virtualisation
- Search by first name and last name
- Filter by one or more hobbies
- Filter by one or more nationalities
- Sort by:
  - First Name
  - Last Name
  - Age
  - Nationality
- URL-synchronized filters and sorting
- Loading, empty and error states
- Responsive layout

### API
- Paginated User Result
- SQLite as the source truth
- Top 20 hobbies with counts
- Top 20 nationalities with counts
- Deterministic sorting
- Query Validation
- Centralised Error Handling

---

## Project Structure

├── client/
├── server/
├── docker-compose.yml
├── package.json
└── lerna.json

---

## Local Setup

### Prerequisites
- Node.js 22+
- Yarn 4+
- Docker

---

### Install dependencies

`yarn install`

---

### Seed the database
 
 `yarn workspace presight-server seed`

 This creates 'server/database/users.db'

 ---

 ### Run locally

 `yarn dev`

 Application
  - Client ```http://localhost:5173```
  - Server ```http://localhost:3000/api/users```
  
---

## Docker

  - Build and start
    `docker compose up --build`

  - Run in background
    `docker compose up -d --build`

  - Stop
    `docker compose down`

  - Remove containers and SQLite volume
    `docker compose down -v`

---

## API

`GET /api/users`

### Query Parameters
| Parameter     | Description                           |
|---------------|---------------------------------------|
| search        | Search first and last name            |
| hobbies       | Comma separated hobbies               |
| nationalities | Comma separated nationalities         |
| sortField     | firstName, lastName, age, nationality |
| sortDirection | asc, desc                             |
| page          | Page number                           |
| pageSize      | Page size                             |

Example
`GET /api/users?search=john&nationalities=India,Canada&sortField=firstName&sortDirection=asc&page=1&pageSize=30`

---

## Database
- Database is stored at 'server/database/users.db'
- The database is automatically created and seeded on first Docker startup.

----

## Design Decisions
- Respository-Service-Controller architecture
- Dependency injection through a composition container
- React Query for server state management
- React Virtual for efficient rendering of large datasets
- SQLite used as the persistent data source
- Docker Compose for one-command local setup
- URL-synchronized filters for shareable application state

---

## Future Improvements
-  Unit and integration tests
-  Authentication
-  Request validation middleware