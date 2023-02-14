import express from 'express';
import Budget from '../models/budgetModel.js';
import Income from '../models/incomeModel.js';
import Expense from '../models/expenseModel.js';
import UserController from '../controllers/userController.js'
import incomeController from '../controllers/incomeController.js';

const router = express.Router();
router.use(express.json());

//Register new user
//TODO: Implement response
router.post('/register', UserController.registerUser);

//Create a new budget
router.post('/budget/newBudget', (req, res) => {
    console.log("Create new budget");
    const budget = new Budget({
        userId: req.body.userId,
        budgetName: req.body.budgetName,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        expenses: req.body.expenses,
        incomes: req.body.incomes,
        notes: req.body.notes,
    });

    budget.save();

    return res.json(budget);
});

//Create a new income
router.post('/income/newIncome', incomeController.newIncome);

//Create a new expense
router.post('/expense/newExpense', (req, res) => {
    console.log("Create new expense");
    const expense = new Expense({
        userId: req.body.userId,
        expenseName: req.body.expenseName,
        expenseType: req.body.expenseType,
        expenseAmount: req.body.expenseAmount,
        expenseDate: req.body.expenseDate,
        notes: req.body.notes,
    });

    expense.save();

    return res.json(expense);
});

export default router;