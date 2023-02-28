import Budget from '../models/budgetModel.js';
import ExpenseService from './expenseService.js';

const budgetStats = async (id) => {
    const budget = await Budget.findById(id).populate();
    const budgetAmount = budget.budgetAmount;
    const expenseList = budget.expenses.map(expense => expense._id.toString());
    const expenseTypes = await ExpenseService.getExpenseTypes(expenseList);

    console.log(expenseTypes);
    return expenseTypes;
}

export default {budgetStats}