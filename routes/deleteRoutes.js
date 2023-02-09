const express = require('express');
const ObjectId = require('mongodb').ObjectId;
const Budget = require('../models/budgetModel.js');
const Income = require('../models/incomeModel.js');
const Expense = require('../models/expenseModel.js');

const router = express.Router();

//TODO: Implement logic to also delete income from budget
//Delete Income
router.delete('/income/:id', (req, res) => {
    Income.deleteOne({_id: ObjectId(req.params.id)})
        .then(result => {
            console.log(res);
            res.json(result);
        })
        .catch(err => {
            res.status(500).send(err.message);
        });
});

//TODO: Implement logic to also delete expense from budget
//Delete Expense
router.delete('/expense/:id', (req, res) => {
    Expenses.deleteOne({_id: ObjectId(req.params.id)})
        .then(result => {
            console.log(res);
            res.json(result);
        })
        .catch(err => {
            res.status(500).send(err.message);
        });
});

//Delete Budget
router.delete('/budget/:id', (req, res) => {
    Budget.deleteOne({_id: ObjectId(req.params.id)})
        .then(result => {
            console.log(res);
            res.json(result);
        })
        .catch(err => {
            res.status(500).send(err.message);
        });
});

module.exports = router;