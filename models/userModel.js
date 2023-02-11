//const mongoose = require('mongoose');
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    userIncomes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Income',
        },
    ],
    userExpenses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Expense',
        },
    ],
    userBudgets: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Budget',
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

//module.exports = mongoose.model('User', UserSchema);
export default mongoose.model('User', UserSchema);