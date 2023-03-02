import Budget from '../models/budgetModel.js';
import ExpenseService from './expenseService.js';
import { ObjectId } from 'mongodb';

const budgetStats = async (id) => {
    const budget = await Budget.findById(id).populate();
    const budgetAmount = budget.budgetAmount;
    const expenseList = budget.expenses.map(expense => expense._id.toString());
    const expenseTypes = await ExpenseService.getExpenseTypes(expenseList);

    return expenseTypes;
}

const getBudgetAmount = async (id) => {
    const budget = await Budget.findById(id).populate();
    return budget.budgetAmount;
}

const getBudgetExpenses = async (id) => {
    const budget = await Budget.findById(id).populate();
    const expenseList = budget.expenses.map(expense => expense._id.toString());
    return expenseList;
}

const getBudgetIncomes = async (id) => {
    const budget = await Budget.findById(id).populate();
    const incomeList = budget.incomes.map(income => income._id.toString());
    return incomeList;
}

const newBudget = async (req) => {
    const budget = new Budget({
        userId: req.body.userId,
        budgetName: req.body.budgetName,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        expenses: req.body.expenses,
        incomes: req.body.incomes,
        notes: req.body.notes,
    });

    await budget.save();
    console.log("Budget Saved");
}

const getBudgetById = (id) => {
    const budget = Budget.findById(id);
    return budget;
}

const deleteBudgetById = async (id) => {
    await Budget.deleteOne({_id: ObjectId(id)});
}

export default {
    budgetStats,
    getBudgetExpenses,
    getBudgetAmount,
    getBudgetIncomes,
    getBudgetById,
    deleteBudgetById,
    newBudget
}