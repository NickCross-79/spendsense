# SpendSense

SpendSense is an online budgeting platform that lets users monitor their spending day by day, month by month, and year by year. Users can create budgets, track incomes and expenses, and connect their financial institutions through the Plaid API to monitor transaction data and account balances.

This repository is a monorepo containing both halves of the application:

| Directory | Description |
|-----------|-------------|
| [`backend/`](backend/) | REST API — Node.js, Express, Mongoose (MongoDB), JWT cookie authentication, Plaid integration |
| [`frontend/`](frontend/) | Single-page app — React 18, React Router, Chart.js, react-plaid-link |

## Getting started

The quickest way to run the stack locally is Docker Compose, which starts MongoDB and the backend together:

```bash
docker compose up
```

### Backend

```bash
cd backend
npm install
cp .env.example .env   # fill in the values
npm run dev            # development, runs on port 3001
```

See [`backend/README.md`](backend/README.md) for environment variables, the API endpoint reference, and folder structure. `npm test` runs the API test suite; `npm run lint` runs ESLint.

### Frontend

```bash
cd frontend
npm install
npm start        # runs on port 3000
```

## Repository history

The backend and frontend were originally developed on separate `backend` and `frontend` branches; they were merged into this monorepo (each under its own subdirectory) with both branches' full commit history preserved.
