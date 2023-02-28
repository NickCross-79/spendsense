import Expense from '../models/expenseModel.js';
import { ObjectId } from 'mongodb';

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

export default {getExpenseTypes};