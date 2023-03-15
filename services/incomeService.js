import Income from '../models/incomeModel.js';
import Budget from '../models/budgetModel.js';
import { ObjectId } from 'mongodb';

const newIncome = async (incomeData, userId) => {
    const income = new Income({
        userId: userId,
        incomeName: incomeData.incomeName,
        incomeType: incomeData.incomeType,
        incomeAmount: incomeData.incomeAmount,
        incomeFrequency: incomeData.incomeFrequency,
        paymentDate: incomeData.paymentDate,
        notes: incomeData.notes,
    });

    await income.save();

    return income._id;
}

const getIncomeTotals = (incomeList) => {
    return new Promise(async (resolve, reject) => {
        const totalIncome = await Income.aggregate([
            { $match: { $or: incomeList.map(id => ({ _id: ObjectId(id) })) } },
            { $group: { _id: null, total: { $sum: "$incomeAmount" } } }
          ]);
        resolve(totalIncome[0].total);
    });
}

const getIncomeById = async (id) => {
    const income = await Income.findById(id);
    return income;
}

const deleteIncomeById = async (id) => {
    await Income.deleteOne({_id: ObjectId(id)});
    await Budget.updateMany(
        {"incomes": ObjectId(id)},
        {$pull: {"incomes": ObjectId(id)}}
    );
}

export default {
    getIncomeTotals,
    newIncome,
    getIncomeById,
    deleteIncomeById
}