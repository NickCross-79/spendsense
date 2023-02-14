import Expense from "../models/expenseModel.js";
import { ObjectId } from "mongodb";

const newExpense = (req, res) => {
    console.log("Create new expense");
    const expense = new Expense({
        userId: req.body.userId,
        expenseName: req.body.expenseName,
        expenseType: req.body.expenseType,
        expenseAmount: req.body.expenseAmount,
        expenseDate: req.body.expenseDate,
        notes: req.body.notes,
    });

    expense.save()
        .then(() => {
            return res.sendStatus(200);
        })
        .catch((err) => {
            console.log(err);
            return res.sendStatus(500);
        })
}

const getAllExpenses = (req, res) => {
    console.log("Get all expenses");
    Expense.find()
        .then(result => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
}

const getExpenseById = (req, res) => {
    console.log("Get an expense by id");
    Expense.findOne({_id: ObjectId(req.params.id)})
        .then(result => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
}

export default {
    newExpense,
    getAllExpenses,
    getExpenseById
}