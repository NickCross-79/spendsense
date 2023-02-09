const mongoose = require('mongoose');

const IncomeSchema = new mongoose.Schema({
    incomeName: {
        type: String,
        required: true,
    },
    incomeType: {
        type: String,
        required: true,
    },
    incomeAmount: {
        type: Number,
        required: true,
    },
    incomeFrequency: {
        type: String,
        required: true,
    },
    paymentDate: {
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

module.exports = mongoose.model('Income', IncomeSchema);