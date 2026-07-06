# SpendSense Frontend

React single-page app for SpendSense, built with Vite.

## Setup

```bash
npm install
cp .env.example .env   # point VITE_API_URL at the backend
npm run dev            # http://localhost:3000
```

Requires Node 20+ and the backend running (see [`../backend/README.md`](../backend/README.md)).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Vite dev server on port 3000 |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

## Structure

- `src/api/client.js` — the single axios client (cookie auth on every request, 401 → redirect to login).
- `src/context/AuthContext.jsx` — current user state; login, register, logout.
- `src/components/ProtectedLayout.jsx` — auth guard + shared nav for all logged-in pages.
- `src/components/login-page/` — login and signup.
- `src/components/create-budget/` — the five-step budget wizard.
- `src/components/overview/` + `budget-card/` — the budget dashboard (doughnut breakdown, top expenses, carousel).
- `src/components/side-menu/` — Plaid bank linking, balances, recent transactions, and import-into-budget.
- `src/styles/tokens.css` — the design tokens (colors, spacing, radii, type); `base.css` — shared buttons/forms/cards.
- `src/theme/chartColors.js` — the validated categorical palette used by the charts.
