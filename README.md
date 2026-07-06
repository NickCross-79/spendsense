# SpendSense

SpendSense is an online budgeting platform that lets users monitor their spending day by day, month by month, and year by year. Users can create budgets, track incomes and expenses, and connect their financial institutions through the Plaid API to monitor transaction data and account balances.

This repository is a monorepo containing both halves of the application:

| Directory | Description |
|-----------|-------------|
| [`backend/`](backend/) | REST API — Node.js, Express, Mongoose (MongoDB), JWT cookie authentication, Plaid integration |
| [`frontend/`](frontend/) | Single-page app — React 18, React Router, Chart.js, react-plaid-link |

## Getting started

### Backend

```bash
cd backend
npm install
npm start        # runs on port 3001
```

The backend requires a `.env` file with the following variables:

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB connection string |
| `JWT_KEY` | Secret used to sign JWT auth tokens |
| `SALTROUNDS` | bcrypt salt rounds (e.g. `10`) |
| `PLAID_CLIENT_ID` | Plaid API client id |
| `PLAID_SECRET_KEY` | Plaid API secret (sandbox) |

See [`backend/README.md`](backend/README.md) for details on the API's folder structure and features.

### Frontend

```bash
cd frontend
npm install
npm start        # runs on port 3000
```

## Repository history

The backend and frontend were originally developed on separate `backend` and `frontend` branches; they were merged into this monorepo (each under its own subdirectory) with both branches' full commit history preserved.
