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
        .then((budget) => {
            return res.sendStatus(200);
        })
        .catch((err) => {
            console.log(err);
            return res.sendStatus(500);
        });
}

export default {
    newBudget
}