const express = require('express');
const ObjectId = require('mongodb').ObjectId;
const Budget = require('../models/budgetModel.js');
const Income = require('../models/incomeModel.js');
const Expense = require('../models/expenseModel.js');

const router = express.Router();

//Get all budgets
router.get('/budget', (req,res) => {
    Budget.find()
        .then(result => {
            console.log(result);
            res.send(result);
        })
})

//Get a budget
router.get('/budget/:id', (req, res) => {
    Budget.findOne({_id: ObjectId(req.params.id)})
        .then(result => {
            console.log(result);
            res.send(result);
        });
});

//Get all /income
router.get('/income', (req,res) => {
    Income.find()
        .then(result => {
            console.log(result);
            res.send(result);
        })
})

//Get an income
router.get('/income/:id', (req, res) => {
    Income.findOne({_id: ObjectId(req.params.id)})
        .then(result => {
            console.log(result);
            res.send(result);
        });
});

//Get all expenses
router.get('/expense', (req,res) => {
    Expense.find()
        .then(result => {
            console.log(result);
            res.send(result);
        })
})

//Get an expense
router.get('/expense/:id', (req, res) => {
    Expense.findOne({_id: ObjectId(req.params.id)})
        .then(result => {
            console.log(result);
            res.send(result);
        });
});

module.exports = router;