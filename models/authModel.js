const mongoose = require('mongoose');

const AuthenticationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        unique: true,
    },
    AuthEmail: {
        type: String,
        required: true,
        unique: true,
    },
    AuthPassword: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Authentication', AuthSchema);