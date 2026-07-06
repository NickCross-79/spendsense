import Budget from '../models/budgetModel.js';
import Expense from '../models/expenseModel.js';

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

// Turns Plaid-shaped transactions into expenses owned by the user and
// attaches them to the budget. Returns the new expense ids.
const importTransactions = async (budgetId, transactions, userId) => {
    const expenses = await Expense.insertMany(transactions.map(transaction => ({
        userId: userId,
        expenseName: transaction.merchant_name || transaction.name,
        expenseType: transaction.personal_finance_category?.primary
            || (Array.isArray(transaction.category) ? transaction.category[0] : 'imported'),
        expenseAmount: transaction.amount,
        expenseDate: transaction.date,
    })));

    const expenseIds = expenses.map(expense => expense._id);
    await Budget.updateOne({_id: budgetId}, {$push: {expenses: {$each: expenseIds}}});
    return expenseIds;
}

export default {
    getBudgetExpenses,
    getBudgetIncomes,
    getBudgetById,
    deleteBudgetById,
    getBudgetName,
    newBudget,
    importTransactions
}
