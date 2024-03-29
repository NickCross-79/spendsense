import Expense from '../models/expenseModel.js';
import Budget from '../models/budgetModel.js'
import { ObjectId } from 'mongodb';

const newExpense = (expenseData, userId) => {
    return new Promise(async (resolve, reject) => {
        console.log("userId:",userId);
        const expense = new Expense({
            userId: userId,
            expenseName: expenseData.expenseName,
            expenseType: expenseData.expenseType,
            expenseAmount: expenseData.expenseAmount,
            expenseDate: expenseData.expenseDate,
        });

        await expense.save();

        resolve(expense._id);
    });    
}

const getExpenseById = async (id) => {
    const expense = await Expense.findById(id);
    return expense;
}

const getExpenseAmountsByType = (expenseIds) => {
    return new Promise(async (resolve, reject) => {
        const expenses = await Expense.find({ _id: { $in: expenseIds } });
        const result = {};

        expenses.forEach(expense => {
            if(result[expense.expenseType]){
                result[expense.expenseAmount] += expense.expenseAmount;
            } else  {
                result[expense.expenseType] = expense.expenseAmount;
            }
        });
        resolve(result)
    });
}

const getExpenseTypes = (expenses) => {
    return new Promise((resolve, reject) => {
        Expense.distinct("expenseType", { _id: { $in: expenses } }, (err, expenseTypes) => {
            if (err) {
                reject(err);
            } else {
                expenseTypes.push('unspentIncome');
                resolve(expenseTypes);
            }
        });
    });
}

const deleteExpenseById = async (id) => {
    await Expense.deleteOne({_id: ObjectId(id)});
    await Budget.updateMany(
        {"expenses": ObjectId(id)},
        {$pull: {"expenses": ObjectId(id)}}
    );
}

export default {
    getExpenseTypes,
    getExpenseAmountsByType,
    getExpenseById,
    deleteExpenseById,
    newExpense
};