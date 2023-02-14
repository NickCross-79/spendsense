import express from 'express';
import BudgetController from "../controllers/budgetController.js";
import IncomeController from '../controllers/incomeController.js';
import ExpenseController from "../controllers/expenseController.js";

const router = express.Router();

//Delete Income
router.delete('/income/:id', IncomeController.deleteIncomeById);

//Delete Expense
router.delete('/expense/:id', ExpenseController.deleteEpxenseById);

//Delete Budget
router.delete('/budget/:id', BudgetController.deleteBudgetById);

export default router;