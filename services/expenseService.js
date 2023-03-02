import Expense from '../models/expenseModel.js';
import { ObjectId } from 'mongodb';

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
};

const getExpenseTypeAmounts = (expenses) => {
    return new Promise((resolve, reject) => {

    })
}

export default {
    getExpenseTypes,
    getExpenseAmountsByType
};