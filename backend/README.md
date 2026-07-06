# SpendSense Backend

This is the backend for SpendSense, an online budgeting platform that allows users to monitor their spending day by day, month by month, and year by year.

## Setup

```bash
npm install
cp .env.example .env   # then fill in the values
npm run dev            # development (auto-restart)
npm start              # production
```

Requires Node 20+ and a running MongoDB instance. From the repository root, `docker compose up` starts MongoDB and the backend together.

### Environment variables

| Variable | Description |
|----------|-------------|
| `PORT` | Port to listen on (default `3001`) |
| `CORS_ORIGINS` | Comma-separated allowed origins for the frontend |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_KEY` | Secret used to sign JWT auth tokens |
| `SALTROUNDS` | bcrypt salt rounds (e.g. `10`) |
| `PLAID_CLIENT_ID` / `PLAID_SECRET_KEY` | Plaid API credentials |
| `PLAID_ENV` | `sandbox` or `production` (default `sandbox`) |
| `PLAID_COUNTRY_CODES` | Comma-separated country codes (default `CA`) |
| `PLAID_REDIRECT_URI` | OAuth redirect URI registered with Plaid (optional) |
| `PLAID_WEBHOOK_URL` | Publicly reachable webhook URL (optional) |

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Run the server |
| `npm run dev` | Run with auto-restart (nodemon) |
| `npm test` | Run the API test suite (vitest + supertest + in-memory MongoDB) |
| `npm run lint` | Run ESLint |

## Folder structure

- `app.js` — the Express app: middleware, routes, error handling.
- `server.js` — entry point: connects to MongoDB and starts the app.
- `controllers/` — controller logic for each of the main entities: budget, expense, income, and user.
- `middleware/` — validation rules for incoming requests and resource-ownership checks.
- `models/` — Mongoose data models for each of the main entities.
- `routes/` — route handlers for each of the main HTTP verbs (GET, POST, DELETE).
- `services/` — business logic and external-service integration (Plaid, metrics, auth).
- `tests/` — end-to-end API tests.

## API

Authentication uses a JWT stored in an `httpOnly` cookie, set by `/user/authenticate`. All routes below marked 🔒 require that cookie, and resource routes verify the resource belongs to the authenticated user.

| Method | Path | Description |
|--------|------|-------------|
| POST | `/register` | Register a new user |
| POST | `/user/authenticate` | Log in; sets the auth cookie |
| POST | `/user/logout` | Log out; clears the auth cookie |
| GET | `/user` 🔒 | Get the authenticated user's details |
| GET | `/user/budgets` 🔒 | List the user's budget ids |
| POST | `/budget/newBudget` 🔒 | Create a budget |
| GET | `/budget/:id` 🔒 | Get a budget |
| GET | `/budget/:id/stats` 🔒 | Budget stats: income total, expense percentages by type |
| GET | `/budget/:id/incomes` 🔒 | Income ids attached to a budget |
| GET | `/budget/:id/expenses` 🔒 | Expense ids attached to a budget |
| POST | `/budget/:id/expenses/import` 🔒 | Import Plaid transactions into the budget as expenses |
| DELETE | `/budget/:id` 🔒 | Delete a budget |
| POST | `/income/newIncome` 🔒 | Create an income |
| GET | `/income/:id` 🔒 | Get an income |
| DELETE | `/income/:id` 🔒 | Delete an income (also detaches it from budgets) |
| POST | `/expense/newExpense` 🔒 | Create an expense |
| GET | `/expense/:id` 🔒 | Get an expense |
| DELETE | `/expense/:id` 🔒 | Delete an expense (also detaches it from budgets) |
| POST | `/plaid/create_link_token/:userId` 🔒 | Create a Plaid Link token (user id taken from the JWT) |
| POST | `/plaid/exchange_public_token/:pubtoken` 🔒 | Exchange a Plaid public token for an access token |
| POST | `/user/transactions` 🔒 | Fetch transactions for a linked bank item |
| POST | `/plaid/webhook` | Plaid webhook listener |

## Features

- **RESTful API** for managing budgets, incomes, and expenses, and for interfacing with the Plaid API.
- **Authentication and authorization**: JWT cookie authentication; every resource route checks ownership so users can only access their own data.
- **Data validation** with express-validator on all write endpoints.
- **Data persistence** in MongoDB via Mongoose.
- **Password hashing** with bcrypt.
- **Plaid integration**: link bank accounts, exchange tokens, and sync transactions (`transactionsSync`).
- **Dynamic budgets**: imported bank transactions become budget expenses via `/budget/:id/expenses/import`.
- **Error handling and logging**: central error-handling middleware and request logging with morgan.
