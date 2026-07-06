import Budget from '../models/budgetModel.js';

const getBudgetName = async (id) => {
    const budget = await Budget.findById(id);
    return budget.budgetName;
}

const getBudgetExpenses = async (id) => {
    const budget = await Budget.findById(id);
    const expenseList = budget.expenses.map(expense => expense._id.toString());
    return expenseList;
}

const getBudgetIncomes = async (id) => {
    const budget = await Budget.findById(id);
    const incomeList = budget.incomes.map(income => income._id.toString());
    return incomeList;
}

const newBudget = async (req, userId) => {
    const budget = new Budget({
        userId: userId,
        budgetName: req.body.budgetName,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        expenses: req.body.expenses,
        incomes: req.body.incomes,
        notes: req.body.notes,
    });

    await budget.save();
}

const getBudgetById = (id) => {
    const budget = Budget.findById(id);
    return budget;
}

const deleteBudgetById = async (id) => {
    await Budget.deleteOne({_id: id});
}

export default {
    getBudgetExpenses,
    getBudgetIncomes,
    getBudgetById,
    deleteBudgetById,
    getBudgetName,
    newBudget
}
