import BudgetService from '../services/budgetService.js';
import IncomeService from '../services/incomeService.js';
import ExpenseService from '../services/expenseService.js';
import MetricService from '../services/metricService.js';

// Create new budget
const newBudget = async (req, res) => {
    try {
        await BudgetService.newBudget(req, req.decodedToken.userId);
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

// Get expense _ids by budget id
const getBudgetExpenses = async (req, res) => {
    try {
        const expenses = await BudgetService.getBudgetExpenses(req.params.id);
        res.status(200).json(expenses);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

// Get income _ids by budget id
const getBudgetIncomes = async (req, res) => {
    try {
        const incomes = await BudgetService.getBudgetIncomes(req.params.id);
        res.status(200).json(incomes);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

// Get budget by id
const getBudgetById = async (req, res) => {
    try {
        const budget = await BudgetService.getBudgetById(req.params.id);
        if(budget == null) return res.sendStatus(404);
        res.status(200).json(budget);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

// Delete budget by id
const deleteBudgetById = async (req, res) => {
    try {
        await BudgetService.deleteBudgetById(req.params.id);
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

// Get full details of budget by id
const getBudgetStats = async (req, res) => {
    try {
        const expenseList = await BudgetService.getBudgetExpenses(req.params.id);
        const expenseTypes = await ExpenseService.getExpenseTypes(expenseList);
        const incomeList = await BudgetService.getBudgetIncomes(req.params.id);
        const incomeTotal = await IncomeService.getIncomeTotals(incomeList);
        const expenseAmountsByType = await ExpenseService.getExpenseAmountsByType(expenseList);
        const expensePercentages = MetricService.transformExpenseDataPercentage(expenseAmountsByType, incomeTotal);
        const budgetName = await BudgetService.getBudgetName(req.params.id);

        const budgetStats = {
            budgetName: budgetName,
            incomeTotal: incomeTotal,
            incomeList: incomeList,
            expenseList: expenseList,
            expenseTypes: expenseTypes,
            expensePercentagesByType: expensePercentages
        }

        res.status(200).json(budgetStats);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

// Import Plaid transactions into a budget as expenses
const importTransactions = async (req, res) => {
    try {
        const transactions = req.body.transactions;
        if(!Array.isArray(transactions) || transactions.length === 0) {
            return res.status(400).json({msg: 'transactions must be a non-empty array'});
        }
        const expenseIds = await BudgetService.importTransactions(req.params.id, transactions, req.decodedToken.userId);
        res.status(200).json(expenseIds);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export default {
    newBudget,
    getBudgetById,
    deleteBudgetById,
    getBudgetIncomes,
    getBudgetExpenses,
    getBudgetStats,
    importTransactions
}
