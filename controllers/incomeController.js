import IncomeService from '../services/incomeService.js';

const newIncome = async (req, res) => {
    console.log("Create new income");
    const incomeId = await IncomeService.newIncome(req.body, req.decodedToken.userId);
    res.status(200).json(incomeId);
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