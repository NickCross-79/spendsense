const mongoose = require('mongoose');

const IncomeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    incomeType: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    paymentDate: {
        type: Date,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Income', IncomeSchema);