import express from 'express';
import IncomeController from '../controllers/incomeController.js';
import ExpenseController from '../controllers/expenseController.js';
import BudgetController from '../controllers/budgetController.js';

const router = express.Router();
router.use(express.json());

//Get all budgets
router.get('/budget', BudgetController.getAllBudgets);

//Get a budget
router.get('/budget/:id', BudgetController.getBudgetById);

//Get all incomes
router.get('/income', IncomeController.getAllIncomes);

//Get total income
router.get('/income/total', IncomeController.totalIncome);

//Get an income
router.get('/income/:id', IncomeController.getIncomeById);

//Get all expenses
router.get('/expense', ExpenseController.getAllExpenses);

//Get an expense
router.get('/expense/:id', ExpenseController.getExpenseById);

export default router;