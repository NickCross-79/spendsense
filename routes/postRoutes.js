import express from 'express';
import Budget from '../models/budgetModel.js';
import Income from '../models/incomeModel.js';
import Expense from '../models/expenseModel.js';
import UserController from '../controllers/userController.js'

const router = express.Router();
router.use(express.json());

//Register new user
//TODO: Implement response
router.post('/register', (req, res) => {
    console.log("Register new user");
    UserController.registerUser(req);
});

//Create a new budget
router.post('/budget/newBudget', (req, res) => {
    console.log("Create new budget");
    const budget = new Budget({
        name: req.body.name,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        expenses: req.body.expense,
        incomes: req.body.incomes,
    });

    budget.save();

    return res.json(budget);
});

//Create a new income
router.post('/income/newIncome', (req, res) => {
    console.log("Create new income");
    const income = new Income({
        incomeName: req.body.incomeName,
        incomeType: req.body.incomeType,
        incomeAmount: req.body.incomeAmount,
        incomeFrequency: req.body.incomeFrequency,
        paymentDate: req.body.paymentDate,
        notes: req.body.notes,
    });

    income.save();

    return res.json(income);
});

//Create a new expense
router.post('/expense/newExpense', (req, res) => {
    console.log("Create new expense");
    const expense = new Expense({
        name: req.body.name,
        expenseType: req.body.expenseType,
        amount: req.body.amount,
        expenseDate: req.body.expenseDate,
    });

    expense.save();

    return res.json(expense);
});

export default router;