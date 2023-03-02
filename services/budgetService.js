import Budget from '../models/budgetModel.js';
import ExpenseService from './expenseService.js';

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

export default {
    budgetStats,
    getBudgetExpenses,
    getBudgetAmount,
    getBudgetIncomes
}