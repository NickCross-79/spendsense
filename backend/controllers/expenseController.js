import ExpenseService from "../services/expenseService.js";

// Create new expense
const newExpense = async (req, res) => {
    console.log("Create new expense");
    console.log("req: ",req);
    const response = await ExpenseService.newExpense(req.body, req.decodedToken.userId);
    res.status(200).json(response);
}

// Get expense by id
const getExpenseById = async (req, res) => {
    const expense = await ExpenseService.getExpenseById(req.params.id);
    res.status(200).json(expense);
}

// Delete expense by id
const deleteExpenseById = (req, res) => {
    console.log("Delete expense by id");
    ExpenseService.deleteExpenseById(req.params.id);
}

export default {
    newExpense,
    getExpenseById,
    deleteExpenseById
}