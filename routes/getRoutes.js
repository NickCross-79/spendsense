import express from 'express';
import IncomeController from '../controllers/incomeController.js';
import ExpenseController from '../controllers/expenseController.js';
import BudgetController from '../controllers/budgetController.js';
import UserController from '../controllers/userController.js';
import AuthService from '../services/authService.js';

const router = express.Router();
router.use(express.json());

// Get all user budgets
router.get('/user/:id/budgets', UserController.getAllBudgets);

// Get user budgets TEST
router.get('/user/budgets', AuthService.validateRequest, UserController.getAllBudgets);

// Get budget details
router.get('/budget/:id/stats', AuthService.validateRequest, BudgetController.getBudgetStats);

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