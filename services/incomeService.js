import Income from '../models/incomeModel.js';
import { ObjectId } from 'mongodb';

const getIncomeTotals = (incomeList) => {
    return new Promise(async (resolve, reject) => {
        const totalIncome = await Income.aggregate([
            { $match: { $or: incomeList.map(id => ({ _id: ObjectId(id) })) } },
            { $group: { _id: null, total: { $sum: "$incomeAmount" } } }
          ]);
        resolve(totalIncome[0].total);
    })
}

export default {getIncomeTotals}