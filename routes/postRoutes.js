const express = require('express');
const Budget = require('../models/budgetModel.js');
const Income = require('../models/incomeModel.js');
const Expense = require('../models/expenseModel.js');

const router = express.Router();
router.use(express.json());

//Create a new budget
router.post('/budget/newBudget', (req, res) => {
    const budget = new Budget({
        name: req.body.name,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        expenses: req.body.expense,
        incomes: req.body.incomes,
    });

    //Error handler
    budget.save((err) => {
        if(err) {
            return res.status(500).json({error: err.message});
        }
    });

    return res.json(budget);
});

//Create a new income
router.post('/income/newIncome', (req, res) => {
    console.log("Create new income");
    const income = new Income({
        name: JSON.stringify(req.body.name),
        incomeType: JSON.stringify(req.body.incomeType),
        amount: JSON.stringify(req.body.amount),
        paymentDate: JSON.stringify(req.body.paymentDate),
    });

    income.save();

    return res.json(income);
});

//Create a new expense
router.post('/expense/newExpense', (req, res) => {
    const expense = new Expense({
        name: req.body.name,
        expenseType: req.body.expenseType,
        amount: req.body.amount,
        expenseDate: req.body.expenseDate,
    });

    //Error handler
    expense.save((err) => {
        if(err) {
            return res.status(500).json({error: err.message});
        }
    });

    return res.json(expense);
});

module.exports = router;