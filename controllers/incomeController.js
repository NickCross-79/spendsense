import Income from '../models/incomeModel.js';
import Budget from '../models/budgetModel.js'
import { ObjectId } from 'mongodb';

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

const deleteIncomeById = (req, res) => {
    console.log("Delete income by id");
    Income.deleteOne({_id: ObjectId(req.params.id)})
        .then(() => {
            Budget.updateMany(
                { "incomes": ObjectId(req.params.id) },
                { $pull: { "incomes": ObjectId(req.params.id) } },
                { multi: true }
            )
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(500);
            });
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
}

export default { 
    newIncome,
    getAllIncomes,
    getIncomeById,
    deleteIncomeById
};