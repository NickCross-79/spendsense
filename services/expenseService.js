import Expense from '../models/expenseModel.js';
import Budget from '../models/budgetModel.js'
import { ObjectId } from 'mongodb';

const newExpense = (expenseData) => {
    return new Promise(async (resolve, reject) => {
        const expense = new Expense({
            userId: expenseData.userId,
            expenseName: expenseData.expenseName,
            expenseType: expenseData.expenseType,
            expenseAmount: expenseData.expenseAmount,
            expenseDate: expenseData.expenseDate,
            notes: expenseData.notes,
        });

        await expense.save();
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
        console.log(result);
        resolve(result)
    });
}

const getExpenseTypes = (expenses) => {
    return new Promise((resolve, reject) => {
        Expense.distinct("expenseType", { _id: { $in: expenses } }, (err, expenseTypes) => {
            if (err) {
                reject(err);
            } else {
                resolve(expenseTypes);
            }
        });
    });
}

const deleteExpenseById = async (id) => {
    await Expense.deleteOne({_id: ObjectId(id)});
    await Budget.updateMany(
        {"expenses": ObjectId(id)},
        {$pull: {"expenses": ObjectId(id)}},
        {$multi: true}
    );
}

export default {
    getExpenseTypes,
    getExpenseAmountsByType,
    getExpenseById,
    deleteExpenseById,
    newExpense
};