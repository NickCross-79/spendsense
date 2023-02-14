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

const newIncome = (req, res) => {
  console.log("Create new income");
  const income = new Income({
      incomeName: req.body.incomeName,
      incomeType: req.body.incomeType,
      incomeAmount: req.body.incomeAmount,
      incomeFrequency: req.body.incomeFrequency,
      paymentDate: req.body.paymentDate,
      notes: req.body.notes,
  });

  income.save()
    .then(() => {
      return res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      return res.sendStatus(200);
    });
}

export default { 
  totalIncome,
  newIncome
};