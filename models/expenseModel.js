import mongoose from 'mongoose';

const ExpenseSchema = new mongoose.Schema({
    expenseName: {
        type: String,
        required: true,
    },
    expenseType: {
        type: String,
        required: true,
    },
    expenseAmount: {
        type: Number,
        required: true,
    },
    expenseDate: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Expense', ExpenseSchema);