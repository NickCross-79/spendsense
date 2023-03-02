import Income from '../models/incomeModel.js';
import Budget from '../models/budgetModel.js';
import IncomeService from '../services/incomeService.js';
import { ObjectId } from 'mongodb';

const newIncome = async (req, res) => {
    console.log("Create new income");
    await IncomeService.newIncome(req.body);
    res.sendStatus(200);
}

const getIncomeById = async (req, res) => {
    console.log("Get an income by id");
    const income = await IncomeService.getIncomeById(req.params.id);
    res.status(200).json(income);
}

const deleteIncomeById = (req, res) => {
    console.log("Delete income by id");
    IncomeService.deleteIncomeById(req.params.id)
    res.sendStatus(200);
}

export default { 
    newIncome,
    getIncomeById,
    deleteIncomeById
};