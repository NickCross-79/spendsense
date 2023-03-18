import { ObjectId } from 'mongodb';
import Budget from '../models/budgetModel.js';
import BudgetService from '../services/budgetService.js';
import IncomeService from '../services/incomeService.js';
import ExpenseService from '../services/expenseService.js';
import MetricService from '../services/metricService.js';

const newBudget = (req, res) => {
    console.log("Create new budget");
    BudgetService.newBudget(req, req.decodedToken.userId)
        .then(() => {
            res.sendStatus(200)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
}

const getBudgetExpenses = (req, res) => {
    console.log("Get budget expenses");
    BudgetService.getBudgetExpenses(req.params.id)
        .then(expenses => {
            res.status(200).json(expenses);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
}

const getBudgetIncomes = (req, res) => {
    console.log("Get total income");
    BudgetService.getBudgetIncomes(req.params.id)
        .then(incomes => {
            res.status(200).json(incomes);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
}

const getBudgetById = (req, res) => {
    console.log("Get a budget by id");
    BudgetService.getBudgetById(req.params.id)
        .then(budget => {
            res.status(200).json(budget);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
}

const deleteBudgetById = async (req, res) => {
    console.log("Delete budget by id", req.params.id);
    await BudgetService.deleteBudgetById(req.params.id);
    res.sendStatus(200);
}

const getBudgetStats = async (req, res) => {
    const expenseList = await BudgetService.getBudgetExpenses(req.params.id);
    const expenseTypes = await ExpenseService.getExpenseTypes(expenseList);
    const incomeList = await BudgetService.getBudgetIncomes(req.params.id);
    const incomeTotal = await IncomeService.getIncomeTotals(incomeList);
    const expenseAmountsByType = await ExpenseService.getExpenseAmountsByType(expenseList);
    const expensePercentages = await MetricService.transformExpenseDataPercentage(expenseAmountsByType, incomeTotal);
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
}

export default {
    newBudget,
    getBudgetById,
    deleteBudgetById,
    getBudgetIncomes,
    getBudgetExpenses,
    getBudgetStats
}