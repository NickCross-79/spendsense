const express = require('express');
const {ObjectId} = require('mongodb');
const Budget = require('../models/budgetModel.js');
const Income = require('../models/incomeModel.js');
const Expense = require('../models/expenseModel.js');

const router = express.Router();

//Get a budget
router.get('/budgets/:id', (req, res) => {
    Budget.findOne({_id: ObjectId(req.params.id)})
        .then(result => {
            console.log(result);
            res.send(result);
        });
});

//Get an income
router.get('/incomes/:id', (req, res) => {
    Income.findOne({_id: ObjectId(req.params.id)})
        .then(result => {
            console.log(result);
            res.send(result);
        });
});

//Get an expense
router.get('/expenses/:id', (req, res) => {
    Expense.findOne({_id: ObjectId(req.params.id)})
        .then(result => {
            console.log(result);
            res.send(result);
        });
});

module.exports = router;