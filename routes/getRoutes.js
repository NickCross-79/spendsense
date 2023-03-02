import express from 'express';
import IncomeController from '../controllers/incomeController.js';
import ExpenseController from '../controllers/expenseController.js';
import BudgetController from '../controllers/budgetController.js';
import UserController from '../controllers/userController.js';

const router = express.Router();
router.use(express.json());

router.get('/user/:id/budgets', UserController.getAllBudgets);

router.get('/budget/stats', BudgetController.getBudgetStats);

//Get total income
router.get('/budget/:id/incomes', BudgetController.getBudgetIncomes);

//Get total expenses
router.get('/budget/:id/expenses', BudgetController.getBudgetExpenses);

//Get a budget
router.get('/budget/:id', BudgetController.getBudgetById);

//Get an income
router.get('/income/:id', IncomeController.getIncomeById);

//Get an expense
router.get('/expense/:id', ExpenseController.getExpenseById);

export default router;