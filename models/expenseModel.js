const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    expenseType: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    expenseDate: {
        type: Date,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Expense', ExpenseSchema);