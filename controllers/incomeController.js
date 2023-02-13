import Income from '../models/incomeModel.js';
import { ObjectId } from 'mongodb';
import User from '../models/userModel.js';

const totalIncome = (userId) => {
    return User.aggregate([
        {
          $match: { _id: ObjectId(userId) }
        },
        {
          $lookup: {
            from: "incomes",
            localField: "userIncomes",
            foreignField: "_id",
            as: "incomes_data"
          }
        },
        {
          $unwind: "$incomes_data"
        },
        {
          $group: { _id: null, total: { $sum: "$incomes_data.incomeAmount" } }
        }
    ]).then(function(items) {
        return items[0].total;
    });
}

export default { totalIncome };