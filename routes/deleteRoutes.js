import express from 'express';
import { ObjectId } from 'mongodb';
import Budget from '../models/budgetModel.js';
import BudgetController from "../controllers/budgetController.js";
import Income from '../models/incomeModel.js';
import IncomeController from '../controllers/incomeController.js';
import Expense from '../models/expenseModel.js';
import ExpenseController from "../controllers/expenseController.js";

const router = express.Router();

//Delete Income
router.delete('/income/:id', IncomeController.deleteIncomeById);

//Delete Expense
router.delete('/expense/:id', ExpenseController.deleteEpxenseById);

//Delete Budget
router.delete('/budget/:id', BudgetController.deleteBudgetById);

export default router;