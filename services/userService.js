import User from '../models/userModel.js';
import Budget from '../models/budgetModel.js';

const getAllBudgets = async (userId) => {
    const budgetList = await Budget.find({ userId: userId }, { _id: 1 });
    return budgetList;
}

export default { getAllBudgets }