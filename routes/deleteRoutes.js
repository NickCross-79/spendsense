const express = require('express');
const ObjectId = require('mongodb').ObjectId;
const Budget = require('../models/budgetModel.js');
const Income = require('../models/incomeModel.js');
const Expense = require('../models/expenseModel.js');

const router = express.Router();

//Delete Income
router.delete('/income', (req, res) => {
    Income.deleteOne({_id: ObjectId(req.body.id)})
        .then(result => {
            console.log(res);
            res.json(result);
        })
        .catch(err => {
            res.status(500).send(err.message);
        });
});

//Delete Expenses
router.delete('/expenses', (req, res) => {
    Expenses.deleteOne({_id: ObjectId(req.body.id)})
        .then(result => {
            console.log(res);
            res.json(result);
        })
        .catch(err => {
            res.status(500).send(err.message);
        });
});

//Delete Budget
router.delete('/budget', (req, res) => {
    Budget.deleteOne({_id: ObjectId(req.body.id)})
        .then(result => {
            console.log(res);
            res.json(result);
        })
        .catch(err => {
            res.status(500).send(err.message);
        });
});