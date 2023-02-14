import Expense from "../models/expenseModel.js";

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

export default {
    newExpense
}