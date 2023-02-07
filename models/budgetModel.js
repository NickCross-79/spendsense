const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
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
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Budget', BudgetSchema);