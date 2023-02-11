// const express = require('express');
// const Budget = require('../models/budgetModel.js');
// const Income = require('../models/incomeModel.js');
// const Expense = require('../models/expenseModel.js');
import express from 'express';
import Budget from '../models/budgetModel.js';
import Income from '../models/incomeModel.js';
import Expense from '../models/expenseModel.js';

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

    budget.save();

    return res.json(budget);
});

//Create a new income
router.post('/income/newIncome', (req, res) => {
    console.log("Create new income");
    const income = new Income({
        name: req.body.name,
        incomeType: req.body.incomeType,
        amount: req.body.amount,
        paymentDate: req.body.paymentDate,
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

    expense.save();

    return res.json(expense);
});

//module.exports = router;

export default router;