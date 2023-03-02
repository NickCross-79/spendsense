import { ObjectId } from 'mongodb';
import Budget from '../models/budgetModel.js';
import BudgetService from '../services/budgetService.js';
import IncomeService from '../services/incomeService.js';
import ExpenseService from '../services/expenseService.js';
import MetricService from '../services/metricService.js';

const newBudget = (req, res) => {
    console.log("Create new budget");
    const budget = new Budget({
        userId: req.body.userId,
        budgetName: req.body.budgetName,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        expenses: req.body.expenses,
        incomes: req.body.incomes,
        notes: req.body.notes,
    });

    budget.save()
        .then(() => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
}

const getTotalBudgetExpenses = (req, res) => {
    console.log("Get total expenses");

    Budget.aggregate([
        {
            $match: { _id: ObjectId(req.body.budgetId) }
        },
        {
            $lookup: {
                from: 'expenses',
                localField: 'expenses',
                foreignField: '_id',
                as: 'expenseList'
            }
        },
        {
            $unwind: '$expenseList'
        },
        {
            $group: {
                _id: '$expenseList.expenseType',
                totalExpense: { $sum: '$expenseList.expenseAmount' }
            }
        }
    ]).then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
}

const getTotalBudgetIncome = (req, res) => {
    console.log("Get total income");
    Budget.aggregate([
        {
            $match: { _id: ObjectId(req.body.budgetId) }
        },
        {
            $lookup: {
                from: 'incomes',
                localField: 'incomes',
                foreignField: '_id',
                as: 'incomeList'
            }
        },
        {
            $unwind: '$incomeList'
        },
        {
            $group: {
                _id: '$_id',
                total: { $sum: '$incomeList.incomeAmount' }
            }
        }
    ]).then(result => {
        res.status(200).json({ "totalIncome": result[0].total });
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
}

const getAllBudgets = (req, res) => {
    console.log("Get all budgets");
    Budget.find()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.sendStaus(500);
        });
}

const getBudgetById = (req, res) => {
    console.log("Get a budget by id");
    Budget.findOne({_id: ObjectId(req.params.id)})
        .then(result => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
}

const deleteBudgetById = (req, res) => {
    console.log("Delete budget by id");
    Budget.deleteOne({_id: ObjectId(req.params.id)})
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
}

const getBudgetStats = async (req, res) => {
    /*ExpenseService.getExpenseTypes(req.body.id)
        .then(categories => {
            console.log(categories);
            res.status(200).json(categories);
        });*/
    
    // budgetService.budgetStats(req.body.id).then(result => {
    //     res.status(200).json(result);
    // });

    const expenseList = await BudgetService.getBudgetExpenses(req.body.id);
    const expenseTypes = await ExpenseService.getExpenseTypes(expenseList);
    const incomeList = await BudgetService.getBudgetIncomes(req.body.id);
    const incomeTotal = await IncomeService.getIncomeTotals(incomeList);
    const expenseAmountsBytype = await ExpenseService.getExpenseAmountsByType(expenseList);
    const expensePercentages = await MetricService.transformExpenseDataPercentage(expenseAmountsBytype, incomeTotal);
    
    const budgetStats = {
        incomeTotal: incomeTotal,
        expenseList: expenseList,
        expenseTypes: expenseTypes,
        expensePercentages: expensePercentages
    }

    res.status(200).json(budgetStats);

}

export default {
    newBudget,
    getAllBudgets,
    getBudgetById,
    deleteBudgetById,
    getTotalBudgetIncome,
    getTotalBudgetExpenses,
    getBudgetStats
}