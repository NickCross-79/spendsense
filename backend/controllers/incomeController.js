import IncomeService from '../services/incomeService.js';

// Create new income
const newIncome = async (req, res) => {
    try {
        const incomeId = await IncomeService.newIncome(req.body, req.decodedToken.userId);
        res.status(200).json(incomeId);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

// Get income by id
const getIncomeById = async (req, res) => {
    try {
        const income = await IncomeService.getIncomeById(req.params.id);
        if(income == null) return res.sendStatus(404);
        res.status(200).json(income);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

// Delete income by id
const deleteIncomeById = async (req, res) => {
    try {
        await IncomeService.deleteIncomeById(req.params.id);
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export default {
    newIncome,
    getIncomeById,
    deleteIncomeById
};
