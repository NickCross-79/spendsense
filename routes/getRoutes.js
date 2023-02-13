import express from 'express';
import { ObjectId } from 'mongodb';
import IncomeController from '../controllers/incomeController.js'
import Budget from '../models/budgetModel.js';
import Income from '../models/incomeModel.js';
import Expense from '../models/expenseModel.js';

const router = express.Router();
router.use(express.json());

//Get all budgets
router.get('/budget', (req,res) => {
    console.log("Get all budgets");
    Budget.find()
        .then(result => {
            console.log(result);
            res.send(result);
        })
})

//Get a budget
router.get('/budget/:id', (req, res) => {
    console.log("Get a budget by id");
    Budget.findOne({_id: ObjectId(req.params.id)})
        .then(result => {
            console.log(result);
            res.send(result);
        });
});

//Get all incomes
router.get('/income', (req,res) => {
    console.log("Get all incomes");
    Income.find()
        .then(result => {
            console.log(result);
            res.send(result);
        })
})

//Get total income
router.get('/income/total', (req, res) => {
    console.log("Get total income");
    console.log(req.body.userId);
    IncomeController.totalIncome(req.body.userId).then(total => {
        console.log(total);
        res.sendStatus(200);
    });
})

//Get an income
router.get('/income/:id', (req, res) => {
    console.log("Get an income by id");
    Income.findOne({_id: ObjectId(req.params.id)})
        .then(result => {
            console.log(result);
            res.sendStatus(200);
        });
});

//Get all expenses
router.get('/expense', (req,res) => {
    console.log("Get all expenses");
    Expense.find()
        .then(result => {
            console.log(result);
            res.send(result);
        })
})

//Get an expense
router.get('/expense/:id', (req, res) => {
    console.log("Get an expense by id");
    Expense.findOne({_id: ObjectId(req.params.id)})
        .then(result => {
            console.log(result);
            res.send(result);
        });
});

export default router;