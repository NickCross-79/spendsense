import Income from '../models/incomeModel.js';
import { ObjectId } from 'mongodb';

const totalIncome = (userId) => {
  return Income.aggregate([
      {
        $match: { userId: ObjectId(userId) }
      },
      {
        $group: { _id: null, total: { $sum: "$incomeAmount" } }
      }
  ]).then(function(items) {
      return items[0].total;
  });
}

export default { totalIncome };