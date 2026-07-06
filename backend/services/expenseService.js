import Expense from '../models/expenseModel.js';
import Budget from '../models/budgetModel.js'

const newExpense = async (expenseData, userId) => {
    const expense = new Expense({
        userId: userId,
        expenseName: expenseData.expenseName,
        expenseType: expenseData.expenseType,
        expenseAmount: expenseData.expenseAmount,
        expenseDate: expenseData.expenseDate,
    });

    await expense.save();

    return expense._id;
}

const getExpenseById = async (id) => {
    const expense = await Expense.findById(id);
    return expense;
}

const getExpenseAmountsByType = async (expenseIds) => {
    const expenses = await Expense.find({ _id: { $in: expenseIds } });
    const result = {};

    expenses.forEach(expense => {
        if(result[expense.expenseType]){
            result[expense.expenseType] += expense.expenseAmount;
        } else  {
            result[expense.expenseType] = expense.expenseAmount;
        }
    });
    return result;
}

const getExpenseTypes = async (expenses) => {
    const expenseTypes = await Expense.distinct("expenseType", { _id: { $in: expenses } });
    expenseTypes.push('unspentIncome');
    return expenseTypes;
}

const deleteExpenseById = async (id) => {
    await Expense.deleteOne({_id: id});
    await Budget.updateMany(
        {"expenses": id},
        {$pull: {"expenses": id}}
    );
}

export default {
    getExpenseTypes,
    getExpenseAmountsByType,
    getExpenseById,
    deleteExpenseById,
    newExpense
};
