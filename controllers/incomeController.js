import Income from '../models/incomeModel.js';
import { ObjectId } from 'mongodb';

const totalIncome = (req, res) => {
    console.log("Get total income");
    Income.aggregate([
        {
          $match: { userId: ObjectId(req.body.userId) }
        },
        {
          $group: { _id: null, total: { $sum: "$incomeAmount" } }
        }
    ]).then(function(items) {
        res.status(200).json({"total": items[0].total});
    })
    .catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
}

const newIncome = (req, res) => {
    console.log("Create new income");
    const income = new Income({
        userId: req.body.userId,
        incomeName: req.body.incomeName,
        incomeType: req.body.incomeType,
        incomeAmount: req.body.incomeAmount,
        incomeFrequency: req.body.incomeFrequency,
        paymentDate: req.body.paymentDate,
        notes: req.body.notes,
    });

    income.save()
        .then(() => {
        res.sendStatus(200);
    })
    .catch((err) => {
        console.log(err);
        return res.sendStatus(200);
    });
}

const getAllIncomes = (req, res) => {
    console.log("Get all incomes");
    Income.find()
        .then(result => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
}

const getIncomeById = (req, res) => {
    console.log("Get an income by id");
    Income.findOne({_id: ObjectId(req.params.id)})
        .then(result => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
}

export default { 
    totalIncome,
    newIncome,
    getAllIncomes,
    getIncomeById
};