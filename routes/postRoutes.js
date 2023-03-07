import express from 'express';
import BudgetController from '../controllers/budgetController.js';
import UserController from '../controllers/userController.js'
import IncomeController from '../controllers/incomeController.js';
import ExpenseController from '../controllers/expenseController.js';

const router = express.Router();
router.use(express.json());

// Register new user
router.post('/register', UserController.registerUser);

// Create a new budget
router.post('/budget/newBudget', BudgetController.newBudget);

// Create a new income
router.post('/income/newIncome', IncomeController.newIncome);

// Create a new expense
router.post('/expense/newExpense', ExpenseController.newExpense);

// Generate Plaid link token
router.post('/plaid/create_link_token/:userId', UserController.generatePLinkToken);

// Exchange public token for access token
router.post('/plaid/exchange_public_token/:pubtoken', UserController.exchangePublicToken);

export default router;