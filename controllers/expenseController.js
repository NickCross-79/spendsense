import ExpenseService from "../services/expenseService.js";

const newExpense = (req, res) => {
    console.log("Create new expense");
    ExpenseService.newExpense(req.body);
}

const getExpenseById = async (req, res) => {
    console.log("Get an expense by id");
    const expense = await ExpenseService.getExpenseById(req.params.id);
    res.status(200).json(expense);
}

const deleteExpenseById = (req, res) => {
    console.log("Delete expense by id");
    ExpenseService.deleteExpenseById(req.params.id);
}

export default {
    newExpense,
    getExpenseById,
    deleteExpenseById
}