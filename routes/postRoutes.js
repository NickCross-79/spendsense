const express = require('express');
const Budget = require('../models/budgetModel.js');
const Income = require('../models/incomeModel.js');
const Expense = require('../models/expenseModel.js');

const router = express.Router();

//Create a new budget
router.post('/budgets', (req, res) => {
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
router.post('/income', (req, res) => {
    const income = new Income({
        name: req.body.name,
        incomeType: req.body.incomeType,
        amount: req.body.amount,
        paymentDate: req.body.paymentDate,
    });

    //Error handler
    income.save((err) => {
        if(err) {
            return res.status(500).json({error: err.message});
        }
    });

    return res.json(income);
});

//Create a new expense
router.post('/expense', (req, res) => {
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