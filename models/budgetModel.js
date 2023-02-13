import mongoose from 'mongoose';

const BudgetSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    budgetName: {
        type: String,
        required: true,
    },
    startDate: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
    },
    expenses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Expense',
        },
    ],
    incomes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Income',
        },
    ],
    notes: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Budget', BudgetSchema);