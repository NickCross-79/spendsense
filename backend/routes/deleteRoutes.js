import express from 'express';
import BudgetController from "../controllers/budgetController.js";
import IncomeController from '../controllers/incomeController.js';
import ExpenseController from "../controllers/expenseController.js";
import AuthService from '../services/authService.js';
import ownership from '../middleware/ownership.js';

const router = express.Router();

//Delete Income
router.delete('/income/:id', AuthService.validateRequest, ownership.income, IncomeController.deleteIncomeById);

//Delete Expense
router.delete('/expense/:id', AuthService.validateRequest, ownership.expense, ExpenseController.deleteExpenseById);

//Delete Budget
router.delete('/budget/:id', AuthService.validateRequest, ownership.budget, BudgetController.deleteBudgetById);

export default router;
