import express from 'express';
import IncomeController from '../controllers/incomeController.js';
import ExpenseController from '../controllers/expenseController.js';
import BudgetController from '../controllers/budgetController.js';
import UserController from '../controllers/userController.js';
import AuthService from '../services/authService.js';
import ownership from '../middleware/ownership.js';

const router = express.Router();
router.use(express.json());

// Get user details
router.get('/user', AuthService.validateRequest, UserController.getUserDetails);

// Get user budgets
router.get('/user/budgets', AuthService.validateRequest, UserController.getAllBudgets);

// Get budget details
router.get('/budget/:id/stats', AuthService.validateRequest, ownership.budget, BudgetController.getBudgetStats);

//Get total income
router.get('/budget/:id/incomes', AuthService.validateRequest, ownership.budget, BudgetController.getBudgetIncomes);

//Get total expenses
router.get('/budget/:id/expenses', AuthService.validateRequest, ownership.budget, BudgetController.getBudgetExpenses);

//Get a budget
router.get('/budget/:id', AuthService.validateRequest, ownership.budget, BudgetController.getBudgetById);

//Get an income
router.get('/income/:id', AuthService.validateRequest, ownership.income, IncomeController.getIncomeById);

//Get an expense
router.get('/expense/:id', AuthService.validateRequest, ownership.expense, ExpenseController.getExpenseById);

export default router;
