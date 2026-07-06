import mongoose from 'mongoose';
import Income from '../models/incomeModel.js';
import Budget from '../models/budgetModel.js';

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

const getIncomeTotals = async (incomeList) => {
    if(!incomeList || incomeList.length === 0) return 0;

    const totalIncome = await Income.aggregate([
        { $match: { _id: { $in: incomeList.map(id => new mongoose.Types.ObjectId(id)) } } },
        { $group: { _id: null, total: { $sum: "$incomeAmount" } } }
    ]);
    return totalIncome.length > 0 ? totalIncome[0].total : 0;
}

const getIncomeById = async (id) => {
    const income = await Income.findById(id);
    return income;
}

const deleteIncomeById = async (id) => {
    await Income.deleteOne({_id: id});
    await Budget.updateMany(
        {"incomes": id},
        {$pull: {"incomes": id}}
    );
}

export default {
    getIncomeTotals,
    newIncome,
    getIncomeById,
    deleteIncomeById
}
