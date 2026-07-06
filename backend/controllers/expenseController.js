import ExpenseService from "../services/expenseService.js";

// Create new expense
const newExpense = async (req, res) => {
    try {
        const response = await ExpenseService.newExpense(req.body, req.decodedToken.userId);
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

// Get expense by id
const getExpenseById = async (req, res) => {
    try {
        const expense = await ExpenseService.getExpenseById(req.params.id);
        if(expense == null) return res.sendStatus(404);
        res.status(200).json(expense);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

// Delete expense by id
const deleteExpenseById = async (req, res) => {
    try {
        await ExpenseService.deleteExpenseById(req.params.id);
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export default {
    newExpense,
    getExpenseById,
    deleteExpenseById
}
