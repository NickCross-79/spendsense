import { ObjectId } from 'mongodb';
import Budget from '../models/budgetModel.js';

const newBudget = (req, res) => {
    console.log("Create new budget");
    const budget = new Budget({
        userId: req.body.userId,
        budgetName: req.body.budgetName,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        expenses: req.body.expenses,
        incomes: req.body.incomes,
        notes: req.body.notes,
    });

    budget.save()
        .then(() => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
}

const getAllBudgets = (req, res) => {
    console.log("Get all budgets");
    Budget.find()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.sendStaus(500);
        });
}

const getBudgetById = (req, res) => {
    console.log("Get a budget by id");
    Budget.findOne({_id: ObjectId(req.params.id)})
        .then(result => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
}

const deleteBudgetById = (req, res) => {
    console.log("Delete budget by id");
    Budget.deleteOne({_id: ObjectId(req.params.id)})
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
}

export default {
    newBudget,
    getAllBudgets,
    getBudgetById,
    deleteBudgetById
}