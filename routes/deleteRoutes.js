// const express = require('express');
// const ObjectId = require('mongodb').ObjectId;
// const Budget = require('../models/budgetModel.js');
// const Income = require('../models/incomeModel.js');
// const Expense = require('../models/expenseModel.js');
import express from 'express';
import { ObjectId } from 'mongodb';
import Budget from '../models/budgetModel.js';
import Income from '../models/incomeModel.js';
import Expense from '../models/expenseModel.js';

const router = express.Router();

//TODO: Implement logic to also delete income from budget
//Delete Income
router.delete('/income/:id', (req, res) => {
    console.log("Delete income by id");
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
    console.log("Delete expense by id");
    Expense.deleteOne({_id: ObjectId(req.params.id)})
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
    console.log("Delete budget by id");
    Budget.deleteOne({_id: ObjectId(req.params.id)})
        .then(result => {
            console.log(res);
            res.json(result);
        })
        .catch(err => {
            res.status(500).send(err.message);
        });
});

//module.exports = router;
export default router;